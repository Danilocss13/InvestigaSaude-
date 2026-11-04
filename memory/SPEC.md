# InvestigaSaúde — SPEC (etapa 1)

Aplicação web educativa (pt-BR) de combate à desinformação em saúde via investigação interativa e gamificação acolhedora.
Design base: HTML exportado do Google Stitch (página inicial) — tokens de cor/tipografia replicados em `frontend/src/index.css`.

## Escopo desta etapa
- Frontend-only. **Sem login, sem banco, sem progresso persistente, sem IA/APIs externas.** Backend FastAPI permanece o esqueleto do template (apenas `GET /api/`).
- Medalhas, níveis, progresso e status "Em Investigação" são DEMONSTRATIVOS.
- Todos os casos são demonstrativos (`isDemo: true`); cenários fictícios são sinalizados; fontes têm `reviewStatus: "a-revisar"`.

## Rotas (react-router, `frontend/src/App.tsx`, layout comum `SiteLayout`)
| Rota | Página |
|---|---|
| `/` | Home (reprodução do Stitch) |
| `/central-de-investigacoes` | Central (busca, filtros nível/tema/situação, grade, `#arquivo` = Arquivo de Investigações, legenda de vereditos) |
| `/central-de-investigacoes/:slug` | Detalhe do caso (mensagem → examinar pistas → veredito com feedback → reset). Slug inválido → 404 |
| `/central-educativa` (`#trilhas`) | Estrutura + "em desenvolvimento" |
| `/guia-de-verificacao` | Checklist 4 etapas (estado local) |
| `/laboratorio-interativo` | Prévia "Fato ou Ruído?" (toggle destaque) + em desenvolvimento |
| `/metodologia-e-fontes` (`#termos`) | Princípios, critérios, níveis de evidência, instituições |
| `/sobre` (`#privacidade`) | Conteúdo de `data/about.ts` (documento "InvestigaSaúde Resumo"): problema, proposta + aviso, objetivo geral, resultado esperado, público-alvo (6), ODS 3/4/10, instituição (Afya Montes Claros, Eng. Computação 4º período, Projeto de Extensão III, Prof. Herbert Souza; contato [a preencher]), equipe (5 nomes), o que funciona / pendente, privacidade |
| `*` | NotFound |

## Dados estruturados (`frontend/src/data/`)
- `cases.ts` — `CASES` (6): #101 vitamina-c-em-megadoses (disponível, verdict sem-evidencia, alt falso), #102 cha-milagroso-em-jejum (em-investigacao, sem-evidencia), #103 noticia-fora-de-contexto (disponível, fora-de-contexto), #104 formula-milagrosa (disponível, falso, alt sem-evidencia; usado no hero), #105 audio-do-especialista-anonimo e #106 dieta-detox-viral (em-elaboracao, sem dossiê → bloco "Dossiê em elaboração"). Featured na home: 101–103.
- `verdicts.ts` (4 vereditos), `navigation.ts` (ROUTES + NAV_ITEMS), `content.ts` (skills, passaporte demo, ferramentas, instituições, módulos/trilhas), `guide.ts`.
- Adicionar caso = acrescentar objeto em `CASES`.

## Componentes
- `components/layout/` SiteLayout, SiteHeader (nav desktop xl+, Sheet mobile, popover passaporte), SiteFooter, BrandMark, ScrollManager (topo/hash).
- `components/common/` Icon (Material Symbols local via pacote `material-symbols`), Primitives (Container, SectionTag, SectionHeading, DemoBadge, InDevelopment), PageHero.
- `components/cases/` CaseCard, CaseMeta (DifficultyMeter, StatusBadge, VerdictBadge), ViralMessageCard, ClueBoard, VerdictPanel, SourceList.

## Auth
Nenhuma.
