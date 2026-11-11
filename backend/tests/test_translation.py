from types import SimpleNamespace

import httpx
import pytest
from fastapi import HTTPException

import server


class FakeDeepLResponse:
    def __init__(self, texts, status_code=200):
        self.texts = texts
        self.status_code = status_code

    def raise_for_status(self):
        if self.status_code >= 400:
            request = httpx.Request("POST", "https://api-free.deepl.com/v2/translate")
            response = httpx.Response(self.status_code, request=request)
            raise httpx.HTTPStatusError("DeepL error", request=request, response=response)

    def json(self):
        return {"translations": [{"text": f"Tradução de: {text}"} for text in self.texts]}


class FakeDeepLClient:
    status_code = 200

    def __init__(self, timeout):
        self.timeout = timeout

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, traceback):
        return None

    async def post(self, url, headers, json):
        assert url == "https://api-free.deepl.com/v2/translate"
        assert headers["Authorization"] == "DeepL-Auth-Key test-key"
        assert json["target_lang"] == "PT-BR"
        assert "source_lang" not in json
        return FakeDeepLResponse(json["text"], self.status_code)


def translation_request(client_ip="test-client"):
    return SimpleNamespace(client=SimpleNamespace(host=client_ip))


@pytest.mark.asyncio
async def test_translate_abstract_sends_batch_to_deepl_and_returns_portuguese(monkeypatch):
    monkeypatch.setenv("DEEPL_API_KEY", "test-key")
    monkeypatch.delenv("DEEPL_API_URL", raising=False)
    monkeypatch.setattr(server.httpx, "AsyncClient", FakeDeepLClient)
    server._translation_requests.clear()

    result = await server.translate_abstract(
        server.TranslationRequest(texts=["An English abstract.", "Another English abstract."]),
        translation_request(),
    )

    assert result.translations == [
        "Tradução de: An English abstract.",
        "Tradução de: Another English abstract.",
    ]


@pytest.mark.asyncio
async def test_translate_abstract_reports_missing_configuration(monkeypatch):
    monkeypatch.delenv("DEEPL_API_KEY", raising=False)
    server._translation_requests.clear()

    with pytest.raises(HTTPException) as error:
        await server.translate_abstract(
            server.TranslationRequest(texts=["An English abstract."]),
            translation_request(),
        )

    assert error.value.status_code == 503


@pytest.mark.asyncio
async def test_translate_abstract_explains_rejected_deepl_key(monkeypatch):
    monkeypatch.setenv("DEEPL_API_KEY", "test-key")
    monkeypatch.setattr(FakeDeepLClient, "status_code", 403)
    monkeypatch.setattr(server.httpx, "AsyncClient", FakeDeepLClient)
    server._translation_requests.clear()

    with pytest.raises(HTTPException) as error:
        await server.translate_abstract(
            server.TranslationRequest(texts=["An English abstract."]),
            translation_request(),
        )

    assert error.value.status_code == 503
    assert "DEEPL_API_KEY" in error.value.detail


@pytest.mark.asyncio
async def test_translate_abstract_limits_requests_per_client(monkeypatch):
    monkeypatch.setenv("DEEPL_API_KEY", "test-key")
    monkeypatch.delenv("DEEPL_API_URL", raising=False)
    monkeypatch.setattr(FakeDeepLClient, "status_code", 200)
    monkeypatch.setattr(server.httpx, "AsyncClient", FakeDeepLClient)
    server._translation_requests.clear()

    for _ in range(server._TRANSLATION_RATE_LIMIT):
        await server.translate_abstract(
            server.TranslationRequest(texts=["An English abstract."]),
            translation_request(),
        )

    with pytest.raises(HTTPException) as error:
        await server.translate_abstract(
            server.TranslationRequest(texts=["An English abstract."]),
            translation_request(),
        )

    assert error.value.status_code == 429
