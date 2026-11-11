import asyncio
from collections import deque
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import time
from pathlib import Path
import httpx
from pydantic import BaseModel, Field, field_validator
from typing import List
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
from lib.db import client, db, ensure_indexes


# Startup runs before the yield, shutdown after it. Add your own setup/teardown here.
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.index_task = asyncio.create_task(ensure_indexes())  # background: a big index build must not block boot
    yield
    client.close()


# Create the main app without a prefix
app = FastAPI(lifespan=lifespan)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.model_dump())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class TranslationRequest(BaseModel):
    texts: list[str] = Field(min_length=1, max_length=10)

    @field_validator("texts")
    @classmethod
    def validate_texts(cls, texts: list[str]) -> list[str]:
        if any(not text.strip() or len(text) > 15000 for text in texts):
            raise ValueError("Cada resumo deve ter entre 1 e 15.000 caracteres.")
        if sum(len(text.encode("utf-8")) for text in texts) > 100000:
            raise ValueError("O lote excede o limite de tamanho.")
        return texts


class TranslationResponse(BaseModel):
    translations: list[str]


_translation_requests: dict[str, deque[float]] = {}
_TRANSLATION_RATE_WINDOW_SECONDS = 60
_TRANSLATION_RATE_LIMIT = 10


@api_router.post("/translate-abstract", response_model=TranslationResponse)
async def translate_abstract(input: TranslationRequest, request: Request):
    api_key = os.environ.get("DEEPL_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="Tradução automática indisponível: o serviço ainda não foi configurado.",
        )

    client_ip = request.client.host if request.client else "unknown"
    now = time.monotonic()
    request_times = _translation_requests.setdefault(client_ip, deque())
    while request_times and now - request_times[0] >= _TRANSLATION_RATE_WINDOW_SECONDS:
        request_times.popleft()
    if len(request_times) >= _TRANSLATION_RATE_LIMIT:
        raise HTTPException(
            status_code=429,
            detail="Limite temporário de traduções atingido. Tente novamente em um minuto.",
        )
    request_times.append(now)

    if len(_translation_requests) > 4096:
        for ip in list(_translation_requests):
            timestamps = _translation_requests[ip]
            while timestamps and now - timestamps[0] >= _TRANSLATION_RATE_WINDOW_SECONDS:
                timestamps.popleft()
            if not timestamps:
                del _translation_requests[ip]
        while len(_translation_requests) > 4096:
            _translation_requests.pop(next(iter(_translation_requests)))

    api_url = os.environ.get("DEEPL_API_URL", "https://api-free.deepl.com/v2/translate")
    try:
        async with httpx.AsyncClient(timeout=20.0) as client:
            response = await client.post(
                api_url,
                headers={"Authorization": f"DeepL-Auth-Key {api_key}"},
                json={
                    "text": input.texts,
                    "target_lang": "PT-BR",
                },
            )
            response.raise_for_status()
            payload = response.json()
            translations = payload.get("translations") if isinstance(payload, dict) else None
            translated_texts = [
                item.get("text") if isinstance(item, dict) else None
                for item in translations
            ] if isinstance(translations, list) else []
            if (
                len(translated_texts) != len(input.texts)
                or any(not isinstance(text, str) or not text.strip() for text in translated_texts)
            ):
                raise HTTPException(
                    status_code=502,
                    detail="O serviço de tradução retornou uma resposta incompleta.",
                )
            return TranslationResponse(translations=translated_texts)
    except httpx.HTTPStatusError as error:
        trace_id = error.response.headers.get("X-Trace-ID", "unavailable")
        logger.warning(
            "DeepL translation failed with status %s (trace %s)",
            error.response.status_code,
            trace_id,
        )
        if error.response.status_code == 456:
            raise HTTPException(
                status_code=503,
                detail="A cota do serviço de tradução foi atingida.",
            ) from error
        if error.response.status_code in (401, 403):
            raise HTTPException(
                status_code=503,
                detail="O DeepL recusou a chave. Confira DEEPL_API_KEY e se a URL configurada corresponde ao tipo da chave (Free ou Pro).",
            ) from error
        if error.response.status_code == 429:
            raise HTTPException(
                status_code=503,
                detail="O DeepL limitou temporariamente as traduções. Aguarde um pouco e tente novamente.",
            ) from error
        raise HTTPException(
            status_code=502,
            detail="O serviço de tradução está indisponível no momento.",
        ) from error
    except httpx.RequestError as error:
        logger.warning("DeepL translation request failed: %s", error.__class__.__name__)
        raise HTTPException(
            status_code=502,
            detail="Não foi possível conectar ao serviço de tradução.",
        ) from error
    except ValueError as error:
        logger.warning("DeepL translation returned an invalid response.")
        raise HTTPException(
            status_code=502,
            detail="O serviço de tradução retornou uma resposta inválida.",
        ) from error


app.include_router(api_router)
