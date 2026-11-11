import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Container, SectionHeading } from "@/components/common/Primitives";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { ApiError, apiPost } from "@/lib/api";
import { EDU_MODULES } from "@/data/content";
import {
  INSTITUTIONAL_RESOURCES,
  TOPIC_GUIDES,
  VITAMIN_C_REVIEW,
  type EducationalResource,
} from "@/data/educationalLibrary";
import { searchEuropePmc, type DoiCheckStatus, type ScientificPublication } from "@/lib/europePmc";

const CATEGORY_OPTIONS = [
  { value: "all", label: "Todos os tipos" },
  { value: "review", label: "Revisões sistemáticas" },
  { value: "trial", label: "Ensaios clínicos" },
  { value: "observational", label: "Estudos observacionais" },
] as const;

const PAGE_SIZE = 5;

function ResourceLink({ resource }: { resource: EducationalResource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col gap-3 rounded-2xl bg-surface-container-lowest p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-surface-container px-2.5 py-1 font-heading text-label-sm text-primary">
          {resource.kind}
        </span>
        <Icon name="open_in_new" size={18} className="text-outline transition-colors group-hover:text-primary" />
      </div>
      <div>
        <h3 className="font-heading text-title-md text-on-surface">{resource.title}</h3>
        <p className="mt-1 text-label-md text-on-surface-variant">{resource.institution}</p>
      </div>
      <p className="text-body-sm leading-relaxed text-on-surface-variant">{resource.description}</p>
      <span className="mt-auto inline-flex items-center gap-1 font-heading text-label-md text-primary">
        Acessar fonte original <Icon name="arrow_outward" size={16} />
      </span>
    </a>
  );
}

function FeaturedModule({
  icon,
  label,
  title,
  description,
  href,
  className = "",
}: {
  icon: string;
  label: string;
  title: string;
  description: string;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group flex h-full flex-col gap-4 rounded-3xl border border-primary/10 bg-surface-container-lowest p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:p-8 ${className}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-container text-on-primary">
        <Icon name={icon} size={26} />
      </span>
      <span className="w-fit rounded-full bg-surface-container px-3 py-1 font-heading text-label-sm uppercase tracking-wider text-primary">
        {label}
      </span>
      <div>
        <h3 className="font-heading text-headline-sm text-on-surface">{title}</h3>
        <p className="mt-2 text-body-sm leading-relaxed text-on-surface-variant">{description}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-2 font-heading text-label-md text-primary">
        Explorar módulo <Icon name="arrow_forward" size={18} className="transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  );
}

function LearningPoint({ title, children }: { title: string; children: string }) {
  return (
    <article className="rounded-xl bg-surface-container-lowest p-4">
      <h3 className="font-heading text-label-lg text-on-surface">{title}</h3>
      <p className="mt-1 text-body-sm leading-relaxed text-on-surface-variant">{children}</p>
    </article>
  );
}

function TopicModule({ id, title, introduction, keyPoints, source }: (typeof TOPIC_GUIDES)[number]) {
  return (
    <details id={id} className="group scroll-mt-24 rounded-2xl bg-surface-container-lowest shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden sm:p-6">
        <span>
          <span className="block font-heading text-title-md text-on-surface">{title}</span>
          <span className="mt-1 block text-body-sm text-on-surface-variant">Resumo educativo e fonte para aprofundar</span>
        </span>
        <Icon name="expand_more" size={24} className="shrink-0 text-primary transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-outline-variant/50 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <p className="text-body-md leading-relaxed text-on-surface-variant">{introduction}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {keyPoints.map((point) => (
            <li key={point} className="flex items-start gap-2 text-body-sm leading-relaxed text-on-surface">
              <Icon name="check_circle" size={18} className="mt-0.5 shrink-0 text-primary" />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-xl bg-surface-container-low p-4">
          <p className="font-heading text-label-sm uppercase tracking-wider text-primary">{source.kind}</p>
          <p className="mt-1 font-heading text-label-lg text-on-surface">{source.title}</p>
          <p className="mt-1 text-label-md text-on-surface-variant">{source.institution}</p>
          <a href={source.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 font-heading text-label-md text-primary underline underline-offset-4">
            Consultar referência original <Icon name="open_in_new" size={16} />
          </a>
        </div>
      </div>
    </details>
  );
}

function formatPublicationDate(value: string, year: string): string {
  if (!value) return year || "Data não informada pelo indexador";
  const parsed = new Date(`${value.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeZone: "UTC" }).format(parsed);
}

function hasType(publication: ScientificPublication, term: string): boolean {
  return publication.publicationTypes.some((type) => type.toLowerCase().includes(term));
}

function publicationTypeLabel(publication: ScientificPublication): string {
  const relevantTypes = publication.publicationTypes
    .filter((type) => !type.toLowerCase().includes("journal article") && !type.toLowerCase().includes("research support"))
    .filter((type, index, types) => types.findIndex((candidate) =>
      candidate.toLowerCase().replace(/[-\s]/g, "") === type.toLowerCase().replace(/[-\s]/g, ""),
    ) === index);
  return relevantTypes.join(" · ") || "Tipo não informado";
}

function doiStatus(status: DoiCheckStatus): { label: string; className: string } {
  switch (status) {
    case "verified":
      return { label: "DOI e título conferem com Crossref", className: "bg-secondary-container/60 text-on-secondary-container" };
    case "mismatch":
      return { label: "Divergência de metadados; confira a fonte original", className: "bg-error-container text-on-error-container" };
    case "not-found":
      return { label: "DOI não localizado no Crossref", className: "bg-amber-verdict-container text-amber-verdict" };
    case "unavailable":
      return { label: "Crossref indisponível; metadados não checados", className: "bg-surface-container text-on-surface-variant" };
    case "no-doi":
      return { label: "Sem DOI informado", className: "bg-surface-container text-on-surface-variant" };
  }
}

function translationErrorMessage(error: unknown): string {
  if (error instanceof ApiError && typeof error.body === "object" && error.body !== null && "detail" in error.body) {
    const detail = error.body.detail;
    if (typeof detail === "string") return detail;
  }
  if (error instanceof ApiError) {
    return `O serviço de tradução retornou HTTP ${error.status}. Verifique a configuração do backend.`;
  }
  if (error instanceof TypeError) {
    return "Não foi possível conectar à API de tradução. Verifique se o backend está ativo e se DEEPL_API_KEY está configurada no ambiente do backend.";
  }
  return "A tradução falhou. Verifique a conexão e a configuração do serviço; o resumo original continua disponível.";
}

function isPortugueseAbstract(publication: ScientificPublication): boolean {
  const language = publication.abstractLanguage?.trim().toLowerCase().replace(/_/g, "-");
  return Boolean(language && (
    language === "pt" ||
    language === "por" ||
    language === "portuguese" ||
    language === "português" ||
    language.startsWith("pt-")
  ));
}

function PublicationCard({
  publication,
  translation,
}: {
  publication: ScientificPublication;
  translation?: string;
}) {
  const status = doiStatus(publication.doiCheck);
  const abstractLabel = publication.abstractLanguage === "eng" || publication.abstractLanguage === "en"
    ? "Abstract original em inglês — não traduzido"
    : publication.abstractLanguage
      ? `Resumo original (${publication.abstractLanguage}) — não traduzido`
      : "Resumo original do indexador — idioma não informado; não traduzido";

  return (
    <article className="rounded-2xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-tertiary-fixed px-2.5 py-1 font-heading text-label-sm text-on-tertiary-fixed">
          {publicationTypeLabel(publication)}
        </span>
        <span className={`rounded-full px-2.5 py-1 font-heading text-label-sm ${status.className}`}>{status.label}</span>
      </div>
      <h3 className="mt-3 font-heading text-title-md leading-snug text-on-surface">{publication.title}</h3>
      <dl className="mt-3 grid gap-x-6 gap-y-2 text-body-sm sm:grid-cols-2">
        <div><dt className="inline font-heading text-label-md text-on-surface">Autores: </dt><dd className="inline text-on-surface-variant">{publication.authors}</dd></div>
        <div><dt className="inline font-heading text-label-md text-on-surface">Periódico: </dt><dd className="inline text-on-surface-variant">{publication.journal}</dd></div>
        <div><dt className="inline font-heading text-label-md text-on-surface">Publicado: </dt><dd className="inline text-on-surface-variant">{formatPublicationDate(publication.publishedAt, publication.year)}</dd></div>
        {publication.doi && <div><dt className="inline font-heading text-label-md text-on-surface">DOI: </dt><dd className="inline break-all text-on-surface-variant">{publication.doi}</dd></div>}
        {publication.pmid && <div><dt className="inline font-heading text-label-md text-on-surface">PMID: </dt><dd className="inline text-on-surface-variant">{publication.pmid}</dd></div>}
      </dl>
      {publication.abstract ? (
        <div className="mt-4 border-t border-outline-variant/50 pt-4">
          <p className="font-heading text-label-sm uppercase tracking-wider text-primary">{abstractLabel}</p>
          <p className="mt-2 text-body-sm leading-relaxed text-on-surface-variant">{publication.abstract}</p>
          {translation && (
            <div className="mt-4 rounded-xl bg-surface-container-low p-4">
              <p className="font-heading text-label-sm uppercase tracking-wider text-primary">Tradução automática para português (DeepL) — não revisada</p>
              <p className="mt-2 text-body-sm leading-relaxed text-on-surface-variant">{translation}</p>
              <p className="mt-3 text-label-sm leading-relaxed text-on-surface-variant">A tradução pode conter imprecisões e não substitui o abstract original. Para citações ou interpretação científica, consulte a publicação original.</p>
            </div>
          )}
        </div>
      ) : (
        <p className="mt-4 text-body-sm italic text-on-surface-variant">O indexador não disponibiliza resumo para este registro.</p>
      )}
      <div className="mt-5 flex flex-wrap gap-4">
        <a href={publication.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-heading text-label-md text-primary underline underline-offset-4">
          Ver registro / publicação original <Icon name="open_in_new" size={16} />
        </a>
        <a href={`https://europepmc.org/search?query=${encodeURIComponent(publication.pmid ? `EXT_ID:${publication.pmid}` : publication.doi ? `DOI:${publication.doi}` : publication.title)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-heading text-label-md text-primary underline underline-offset-4">
          Registro no Europe PMC <Icon name="open_in_new" size={16} />
        </a>
      </div>
    </article>
  );
}

function ScientificLibrary() {
  const [query, setQuery] = useState("DOI:10.1002/14651858.CD000980.pub4");
  const [submittedQuery, setSubmittedQuery] = useState("DOI:10.1002/14651858.CD000980.pub4");
  const [publications, setPublications] = useState<ScientificPublication[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]["value"]>("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | "crossref-verified">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(0);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isTranslatingAll, setIsTranslatingAll] = useState(false);
  const [translationBatchMessage, setTranslationBatchMessage] = useState("");
  const [translationBatchError, setTranslationBatchError] = useState("");

  useEffect(() => {
    if (!submittedQuery) {
      setPublications([]);
      setStatus("ready");
      return;
    }

    const controller = new AbortController();
    setStatus("loading");
    setErrorMessage("");
    searchEuropePmc(submittedQuery, controller.signal)
      .then((results) => {
        setPublications(results);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setPublications([]);
        setErrorMessage(error instanceof Error ? error.message : "Erro inesperado ao consultar Europe PMC.");
        setStatus("error");
      });

    return () => controller.abort();
  }, [submittedQuery]);

  const filtered = useMemo(() => {
    const selected = publications.filter((publication) => {
      const matchesCategory =
        category === "all" ||
        (category === "review" && (hasType(publication, "systematic review") || hasType(publication, "meta-analysis"))) ||
        (category === "trial" && (hasType(publication, "clinical trial") || hasType(publication, "randomized controlled trial"))) ||
        (category === "observational" && (hasType(publication, "observational") || hasType(publication, "cohort") || hasType(publication, "case-control")));
      const matchesSource = sourceFilter === "all" || publication.doiCheck === "verified";
      return matchesCategory && matchesSource;
    });

    return selected.sort((first, second) => {
      const firstDate = first.publishedAt || first.year || "";
      const secondDate = second.publishedAt || second.year || "";
      return sortOrder === "newest" ? secondDate.localeCompare(firstDate) : firstDate.localeCompare(secondDate);
    });
  }, [publications, category, sourceFilter, sortOrder]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const untranslatedCount = filtered.filter((publication) =>
    publication.abstract && !isPortugueseAbstract(publication) && !translations[publication.id],
  ).length;

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(0);
    setTranslations({});
    setTranslationBatchMessage("");
    setTranslationBatchError("");
    setSubmittedQuery(query.trim());
  }

  async function translateAllAbstracts() {
    if (isTranslatingAll) return;

    const targets = filtered.filter((publication) =>
      publication.abstract && !isPortugueseAbstract(publication) && !translations[publication.id],
    );
    if (targets.length === 0) {
      setTranslationBatchError("");
      setTranslationBatchMessage("Não há novos resumos para traduzir. Resumos em português foram mantidos sem alteração.");
      return;
    }

    setIsTranslatingAll(true);
    setTranslationBatchMessage("");
    setTranslationBatchError("");

    const tooLong = targets.filter((publication) => (publication.abstract?.length ?? 0) > 15000);
    const translatable = targets.filter((publication) => (publication.abstract?.length ?? 0) <= 15000);
    const batches: ScientificPublication[][] = [];
    let batch: ScientificPublication[] = [];
    let batchBytes = 0;
    for (const publication of translatable) {
      const text = publication.abstract ?? "";
      const textBytes = new TextEncoder().encode(text).length;
      if (batch.length > 0 && (batch.length >= 10 || batchBytes + textBytes > 100000)) {
        batches.push(batch);
        batch = [];
        batchBytes = 0;
      }
      batch.push(publication);
      batchBytes += textBytes;
    }
    if (batch.length > 0) batches.push(batch);

    const successful: { id: string; text: string }[] = [];
    const requestErrors: string[] = [];
    let failedCount = tooLong.length;
    for (const currentBatch of batches) {
      try {
        const result = await apiPost<{ translations: string[] }>("/translate-abstract", {
          texts: currentBatch.map((publication) => publication.abstract ?? ""),
        });
        successful.push(...currentBatch.map((publication, index) => ({
          id: publication.id,
          text: result.translations[index],
        })));
      } catch (error) {
        failedCount += currentBatch.length;
        requestErrors.push(translationErrorMessage(error));
      }
    }

    if (successful.length > 0) {
      setTranslations((current) => ({
        ...current,
        ...Object.fromEntries(successful.map(({ id, text }) => [id, text])),
      }));
    }

    if (failedCount > 0) {
      const uniqueErrors = [...new Set(requestErrors)];
      setTranslationBatchError(
        `${successful.length} resumo(s) traduzido(s). ${failedCount} não puderam ser traduzidos${tooLong.length > 0 ? `; ${tooLong.length} excedem o limite de 15.000 caracteres` : ""}.${uniqueErrors.length > 0 ? ` ${uniqueErrors[0]}` : ""}`,
      );
    } else {
      setTranslationBatchMessage(`${successful.length} resumo(s) traduzido(s). Os resumos em português não foram alterados.`);
    }

    setIsTranslatingAll(false);
  }

  return (
    <section id="pesquisa-cientifica" className="scroll-mt-24 bg-surface-container-low/70 py-14 sm:py-16">
      <Container className="flex flex-col gap-6">
        <SectionHeading
          tag={{ icon: "manage_search", label: "Busca científica ao vivo" }}
          title="Pesquise publicações no Europe PMC"
          description="Consulte metadados e resumos disponibilizados pelo indexador, filtre os tipos de estudo e ordene os resultados por data de publicação."
        />
        <form onSubmit={submitSearch} className="grid gap-3 rounded-2xl bg-surface-container-lowest p-4 shadow-sm sm:grid-cols-[1fr_auto] sm:p-5">
          <label className="flex min-w-0 items-center gap-3 rounded-xl border border-outline-variant bg-surface px-3">
            <Icon name="search" size={20} className="shrink-0 text-outline" />
            <span className="sr-only">Palavras-chave para buscar publicações científicas</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ex.: vacinas, imunidade, DOI:10..."
              className="min-w-0 flex-1 bg-transparent py-3 text-body-md text-on-surface outline-none placeholder:text-outline"
            />
          </label>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-container px-5 py-3 font-heading text-label-lg text-on-primary transition-colors hover:bg-primary">
            <Icon name="search" size={18} /> Buscar publicações
          </button>
          <div className="grid gap-3 sm:col-span-2 sm:grid-cols-3">
            <label className="flex flex-col gap-1 font-heading text-label-sm text-on-surface-variant">
              Tipo de estudo
              <select value={category} onChange={(event) => { setCategory(event.target.value as typeof category); setPage(0); }} className="rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-body-sm text-on-surface">
                {CATEGORY_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1 font-heading text-label-sm text-on-surface-variant">
              Fonte dos metadados
              <select value={sourceFilter} onChange={(event) => { setSourceFilter(event.target.value as typeof sourceFilter); setPage(0); }} className="rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-body-sm text-on-surface">
                <option value="all">Europe PMC (todos os resultados)</option>
                <option value="crossref-verified">DOI conferido no Crossref</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 font-heading text-label-sm text-on-surface-variant">
              Ordenar por data
              <select value={sortOrder} onChange={(event) => { setSortOrder(event.target.value as typeof sortOrder); setPage(0); }} className="rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-body-sm text-on-surface">
                <option value="newest">Mais recentes primeiro</option>
                <option value="oldest">Mais antigos primeiro</option>
              </select>
            </label>
          </div>
        </form>

        <p className="flex items-start gap-2 rounded-xl border border-primary/15 bg-surface-container-lowest/80 p-4 text-body-sm leading-relaxed text-on-surface-variant">
          <Icon name="info" size={19} className="mt-0.5 shrink-0 text-primary" />
          Europe PMC fornece até 10 registros por consulta; a ordenação por data é aplicada a esses resultados. O Crossref apenas confere correspondência de DOI e título. Essa conferência não certifica método, qualidade, revisão por pares nem confiabilidade científica.
        </p>

        {status === "loading" && (
          <div role="status" className="flex items-center gap-3 rounded-2xl bg-surface-container-lowest p-6 text-body-md text-on-surface-variant">
            <Icon name="progress_activity" size={22} className="animate-spin text-primary" /> Buscando metadados e conferindo DOIs…
          </div>
        )}
        {status === "error" && (
          <div role="alert" className="rounded-2xl border border-error/30 bg-error-container p-5 text-on-error-container">
            <p className="font-heading text-label-lg">Não foi possível carregar as publicações agora.</p>
            <p className="mt-1 text-body-sm">{errorMessage} Tente novamente mais tarde.</p>
          </div>
        )}
        {status === "ready" && filtered.length === 0 && (
          <div className="rounded-2xl bg-surface-container-lowest p-6 text-body-md text-on-surface-variant">
            {publications.length === 0
              ? "Nenhuma publicação foi encontrada para essa consulta. Tente outras palavras-chave."
              : "Nenhum resultado corresponde aos filtros selecionados. Altere o tipo de estudo ou a conferência DOI."}
          </div>
        )}
        {status === "ready" && pageItems.length > 0 && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 text-label-md text-on-surface-variant">
              <span>{filtered.length} publicação(ões) após os filtros</span>
              <span>Consulta: <strong className="font-heading text-on-surface">{submittedQuery}</strong></span>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <h3 className="font-heading text-title-md text-on-surface">Tradução dos resumos</h3>
                <p className="mt-1 text-body-sm text-on-surface-variant">
                  Traduz todos os resumos disponíveis nesta busca. Os identificados como português serão ignorados.
                </p>
                <p className="mt-1 text-label-sm text-on-surface-variant">Ao traduzir, os resumos não identificados como português são enviados à DeepL.</p>
              </div>
              <button
                type="button"
                disabled={isTranslatingAll || untranslatedCount === 0}
                onClick={translateAllAbstracts}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-container px-4 py-3 font-heading text-label-md text-on-primary transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon name={isTranslatingAll ? "progress_activity" : "translate"} size={18} className={isTranslatingAll ? "animate-spin" : ""} />
                {isTranslatingAll
                  ? "Traduzindo resumos…"
                  : untranslatedCount > 0
                    ? `Traduzir todos (${untranslatedCount})`
                    : "Resumos já traduzidos ou em português"}
              </button>
            </div>
            {translationBatchMessage && <p role="status" className="rounded-xl bg-surface-container p-3 text-body-sm text-on-surface">{translationBatchMessage}</p>}
            {translationBatchError && <p role="alert" className="rounded-xl bg-amber-verdict-container p-3 text-body-sm text-amber-verdict">{translationBatchError}</p>}
            <div className="grid gap-4">
              {pageItems.map((publication) => (
                <PublicationCard key={publication.id} publication={publication} translation={translations[publication.id]} />
              ))}
            </div>
            {pageCount > 1 && (
              <nav aria-label="Paginação dos resultados científicos" className="flex items-center justify-center gap-3">
                <button type="button" disabled={page === 0} onClick={() => setPage((current) => current - 1)} className="rounded-lg border border-outline-variant px-4 py-2 font-heading text-label-md text-primary disabled:cursor-not-allowed disabled:opacity-40">Anterior</button>
                <span aria-live="polite" className="text-label-md text-on-surface-variant">Página {page + 1} de {pageCount}</span>
                <button type="button" disabled={page + 1 >= pageCount} onClick={() => setPage((current) => current + 1)} className="rounded-lg border border-outline-variant px-4 py-2 font-heading text-label-md text-primary disabled:cursor-not-allowed disabled:opacity-40">Próxima</button>
              </nav>
            )}
          </>
        )}
        <p className="text-label-md leading-relaxed text-on-surface-variant">
          A base pode não cobrir toda a literatura e alguns registros não incluem resumo. Para completar a busca, consulte também{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">PubMed</a>,{" "}
          <a href="https://www.cochranelibrary.com/" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">Cochrane Library</a> e a publicação original.
        </p>
      </Container>
    </section>
  );
}

function StudyReadingModule() {
  const [showExercise, setShowExercise] = useState(false);
  const points = [
    { title: "1. Pergunta, hipótese e conclusão", body: "A hipótese é uma explicação testável; evidência são os dados obtidos; conclusão é a interpretação dos autores. Confira se a conclusão responde à pergunta realmente pesquisada." },
    { title: "2. Observacional ou ensaio clínico?", body: "Em estudos observacionais, pesquisadores acompanham exposições sem distribuí-las. Em ensaios, uma intervenção é atribuída conforme um protocolo. Ambos podem ser úteis, mas respondem a perguntas distintas." },
    { title: "3. Grupo de controle e tamanho da amostra", body: "Um grupo de comparação ajuda a estimar o que teria ocorrido sem a intervenção. Uma amostra maior pode melhorar a precisão, mas não corrige vieses, medidas ruins ou participantes pouco representativos." },
    { title: "4. Correlação não prova causalidade", body: "Duas variáveis podem mudar juntas por acaso, por uma causa comum ou por outros fatores. Avalie desenho do estudo, temporalidade, confundidores e consistência antes de falar em causa." },
    { title: "5. Viés e limitações", body: "Viés é um erro sistemático que pode distorcer resultados. Perdas de acompanhamento, seleção de participantes, medidas imprecisas e financiamento são aspectos a verificar; limitações não anulam automaticamente um estudo." },
    { title: "6. Risco relativo e risco absoluto", body: "Exemplo didático hipotético: se um evento passa de 2 em cada 100 pessoas para 1 em cada 100, a redução relativa é 50%, mas a redução absoluta é 1 ponto percentual. Procure os números absolutos e o período observado." },
    { title: "7. Significância estatística", body: "Um resultado estatisticamente significativo não mede, sozinho, a importância clínica, a probabilidade de a hipótese ser verdadeira ou a ausência de viés. Observe estimativas, intervalos de confiança e relevância prática." },
    { title: "8. Revisão sistemática e metanálise", body: "A revisão sistemática usa métodos explícitos para localizar e avaliar estudos sobre uma pergunta. A metanálise é uma técnica estatística que pode combinar resultados comparáveis; uma revisão pode existir sem metanálise." },
    { title: "9. Conflitos de interesse", body: "Leia declarações de financiamento e relações dos autores com empresas ou organizações. Conflito declarado não prova que o resultado é falso, mas ajuda a contextualizar a pesquisa." },
    { title: "10. Não extrapole os dados", body: "Confira população, intervenção, comparação, desfecho e duração. Um resultado em grupo específico ou em laboratório não sustenta automaticamente uma promessa para todas as pessoas." },
  ];

  return (
    <section id="como-ler-estudo" className="scroll-mt-24 py-14 sm:py-16">
      <Container className="flex flex-col gap-6">
        <SectionHeading
          tag={{ icon: "lab_research", label: "Módulo em destaque" }}
          title="Como ler um estudo"
          description="Um roteiro progressivo para interpretar pesquisas sem transformar resultados preliminares em certezas."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {points.map((point) => <LearningPoint key={point.title} title={point.title}>{point.body}</LearningPoint>)}
        </div>
        <div className="rounded-2xl border border-primary/15 bg-surface-container-lowest p-5 sm:p-6">
          <h3 className="font-heading text-title-md text-on-surface">Exercício de interpretação</h3>
          <p className="mt-2 text-body-sm leading-relaxed text-on-surface-variant">
            Situação hipotética: um estudo observacional encontra associação entre o consumo de um suplemento e menos resfriados. Qual conclusão é mais cuidadosa?
          </p>
          <button type="button" aria-expanded={showExercise} onClick={() => setShowExercise((visible) => !visible)} className="mt-4 rounded-lg bg-primary-container px-4 py-2.5 font-heading text-label-md text-on-primary hover:bg-primary">
            {showExercise ? "Ocultar comentário" : "Ver comentário"}
          </button>
          {showExercise && (
            <p className="mt-4 rounded-xl bg-surface-container-low p-4 text-body-sm leading-relaxed text-on-surface">
              O estudo encontrou uma associação, mas, por ser observacional, não prova que o suplemento causou a diferença. Hábitos, condições de saúde ou outros fatores podem explicar parte do resultado. Procure ensaios e revisões e confira a população estudada.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 rounded-2xl bg-tertiary-fixed/60 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-label-sm uppercase tracking-wider text-tertiary">Exemplo com publicação identificável</p>
            <h3 className="mt-1 font-heading text-title-md text-on-surface">{VITAMIN_C_REVIEW.title}</h3>
            <p className="mt-1 text-body-sm text-on-surface-variant">{VITAMIN_C_REVIEW.institution} · Hemilä H, Chalker E. · 2013 · PMID 23440782</p>
          </div>
          <a href={VITAMIN_C_REVIEW.url} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 font-heading text-label-md text-primary underline underline-offset-4">
            Abrir referência original <Icon name="open_in_new" size={16} />
          </a>
        </div>
        <Link to="/central-de-investigacoes/vitamina-c-em-megadoses" className="inline-flex w-fit items-center gap-2 rounded-xl border border-primary/20 px-4 py-3 font-heading text-label-md text-primary hover:bg-surface-container-low">
          Relacionado: investigação sobre megadoses de vitamina C <Icon name="arrow_forward" size={18} />
        </Link>
      </Container>
    </section>
  );
}

function AiHealthModule() {
  const [checked, setChecked] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const options = [
    { id: "source", label: "A publicação não apresenta link para a fonte original." },
    { id: "urgent", label: "Pede a suspensão urgente de medicamento sem apontar orientação oficial." },
    { id: "origin", label: "Não informa quem produziu a imagem nem sua data ou contexto." },
    { id: "perfect", label: "A imagem parece muito nítida; isso, por si só, provaria que foi gerada por IA." },
  ];

  function toggleOption(id: string) {
    setSubmitted(false);
    setChecked((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  }

  return (
    <section id="inteligencia-artificial" className="scroll-mt-24 bg-surface-container-low/70 py-14 sm:py-16">
      <Container className="flex flex-col gap-6">
        <SectionHeading
          tag={{ icon: "smart_toy", label: "Módulo novo" }}
          title="Inteligência Artificial e Saúde"
          description="Aprenda a investigar a origem e o contexto de conteúdos sintéticos ou manipulados, sem tratar sinais ou detectores como veredito."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <LearningPoint title="A. Imagens geradas por IA">Observe detalhes que não combinam com o contexto, mas não conclua pela aparência. Imagens médicas podem ser ilustrativas, editadas ou retiradas de outro caso; procure legenda, autoria, data e publicação original.</LearningPoint>
          <LearningPoint title="B. Vídeos manipulados">Busque a publicação mais antiga, confira o canal oficial citado e compare a declaração com a íntegra. Inconsistências audiovisuais podem justificar checagem, mas compressão e edição também alteram a qualidade do vídeo.</LearningPoint>
          <LearningPoint title="C. Áudios e vozes sintéticas">Vozes podem ser imitadas. Não encaminhe áudio sem origem confirmável; procure a declaração em canais oficiais e contate a instituição por um meio independente.</LearningPoint>
          <LearningPoint title="D. Textos produzidos por IA">Textos podem soar seguros e ainda conter erros ou referências inexistentes. Abra DOI, PMID e links, confirme autores, periódico, instituição e se a fonte sustenta exatamente a afirmação.</LearningPoint>
          <LearningPoint title="E. Ferramentas e limites">Detectores podem errar e seus resultados dependem do material e da ferramenta. Use-os apenas como indício junto com rastreamento de origem, busca reversa e confirmação por fontes independentes.</LearningPoint>
          <LearningPoint title="Não é diagnóstico de autenticidade">Ausência de sinais visuais não prova que o conteúdo é genuíno; um resultado positivo de detector também não prova manipulação. A conclusão responsável pode ser “não foi possível verificar”.</LearningPoint>
        </div>
        <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-sm sm:p-6">
          <h3 className="font-heading text-title-md text-on-surface">Ferramentas auxiliares (não são prova definitiva)</h3>
          <div className="mt-3 flex flex-wrap gap-4">
            <a href="https://lens.google.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-heading text-label-md text-primary underline underline-offset-4">Google Lens — busca visual <Icon name="open_in_new" size={16} /></a>
            <a href="https://contentcredentials.org/verify" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-heading text-label-md text-primary underline underline-offset-4">Content Credentials — conferir credenciais disponíveis <Icon name="open_in_new" size={16} /></a>
          </div>
          <p className="mt-3 text-label-md leading-relaxed text-on-surface-variant">Uma busca reversa pode não encontrar a origem; ausência de credenciais não demonstra manipulação. Confira também com a fonte que teria publicado o conteúdo.</p>
        </div>
        <div className="rounded-2xl border border-primary/15 bg-surface-container-lowest p-5 sm:p-6">
          <span className="rounded-full bg-tertiary-fixed px-2.5 py-1 font-heading text-label-sm text-on-tertiary-fixed">Atividade demonstrativa — situação hipotética, não é uma notícia real</span>
          <h3 className="mt-4 font-heading text-title-md text-on-surface">O que merece investigação?</h3>
          <p className="mt-2 text-body-sm leading-relaxed text-on-surface-variant">Uma postagem hipotética exibe uma imagem de exame sem indicar serviço de saúde ou data, recomenda parar um medicamento “imediatamente” e não inclui links ou identificação de especialistas. Marque os sinais que justificam checagem:</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {options.map((option) => (
              <label key={option.id} className="flex cursor-pointer items-start gap-3 rounded-xl bg-surface-container-low p-3 text-body-sm text-on-surface">
                <input type="checkbox" checked={checked.includes(option.id)} onChange={() => toggleOption(option.id)} className="mt-0.5 accent-primary" />
                {option.label}
              </label>
            ))}
          </div>
          <button type="button" onClick={() => setSubmitted(true)} className="mt-4 rounded-lg bg-primary-container px-4 py-2.5 font-heading text-label-md text-on-primary hover:bg-primary">Conferir análise</button>
          {submitted && (
            <p role="status" className="mt-4 rounded-xl bg-surface-container p-4 text-body-sm leading-relaxed text-on-surface">
              {`Você marcou ${checked.filter((id) => ["source", "urgent", "origin"].includes(id)).length} dos 3 sinais de verificação relevantes${checked.includes("perfect") ? " e selecionou a aparência perfeita, que não é um indicador confiável" : ""}. Falta de fonte original, recomendação urgente sem respaldo verificável e ausência de contexto da imagem pedem checagem. Mesmo identificando esses sinais, não é possível determinar a origem da imagem apenas com essa descrição.`}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

export default function CentralEducativa() {
  const featuredModules = EDU_MODULES.filter((module) => module.id === "estudos" || module.id === "inteligencia-artificial");
  const thematicModules = EDU_MODULES.filter((module) => module.id !== "estudos" && module.id !== "inteligencia-artificial");

  return (
    <div data-testid="educativa-page">
      <PageHero
        testid="educativa-hero"
        tag={{ icon: "local_library", label: "Central Educativa" }}
        title="Biblioteca para entender antes de decidir."
        description="Materiais educativos, referências institucionais e publicações científicas para aprender a avaliar informação sobre saúde."
        crumbs={[{ label: "Central Educativa" }]}
      >
        <p className="max-w-[640px] text-body-sm leading-relaxed text-on-surface-variant">
          Conteúdo informativo, não substitui avaliação profissional nem orientação médica individual. Os links levam às fontes originais; a consulta bibliográfica não representa endosso institucional ao InvestigaSaúde.
        </p>
        <a href="#pesquisa-cientifica" className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary-container px-4 py-3 font-heading text-label-md text-on-primary hover:bg-primary">
          Pesquisar publicações científicas <Icon name="arrow_downward" size={18} />
        </a>
      </PageHero>

      <section className="py-12 sm:py-14">
        <Container className="flex flex-col gap-6">
          <SectionHeading
            tag={{ icon: "auto_stories", label: "Aprendizagem em destaque" }}
            title="Aprenda a avaliar evidências e conteúdos"
            description="Comece pelos dois módulos centrais para leitura crítica e verificação de informações digitais em saúde."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {featuredModules.map((module) => (
              <FeaturedModule
                key={module.id}
                icon={module.icon}
                label={module.id === "estudos" ? "Guia de leitura científica" : "Verificação de conteúdo"}
                title={module.title}
                description={module.description}
                href={module.id === "estudos" ? "#como-ler-estudo" : "#inteligencia-artificial"}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-container-low/70 py-12 sm:py-14">
        <Container className="flex flex-col gap-6">
          <SectionHeading
            tag={{ icon: "category", label: "Biblioteca temática" }}
            title="Explore por assunto"
            description="Guias introdutórios com links para materiais de instituições e bases reconhecidas. Consulte a publicação original para detalhes e atualizações."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {thematicModules.map((module) => (
              <a key={module.id} href={`#${module.id}`} className="group flex min-h-48 flex-col gap-3 rounded-2xl bg-surface-container-lowest p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-container-high text-primary"><Icon name={module.icon} size={24} /></div>
                <h3 className="font-heading text-title-md text-on-surface">{module.title}</h3>
                <p className="text-body-sm leading-relaxed text-on-surface-variant">{module.description}</p>
                <span className="mt-auto inline-flex items-center gap-1 font-heading text-label-md text-primary">Abrir guia <Icon name="arrow_forward" size={16} className="transition-transform group-hover:translate-x-1" /></span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <StudyReadingModule />
      <AiHealthModule />

      <section className="py-12 sm:py-14">
        <Container className="flex flex-col gap-4">
          <SectionHeading
            tag={{ icon: "menu_book", label: "Guias temáticos" }}
            title="Aprofunde outros temas"
            description="Abra um módulo para ler o resumo educativo e acessar a referência indicada."
          />
          <div className="grid items-start gap-3 md:grid-cols-2">
            {TOPIC_GUIDES.map((guide) => <TopicModule key={guide.id} {...guide} />)}
          </div>
        </Container>
      </section>

      <ScientificLibrary />

      <section className="bg-surface-container-low/70 py-12 sm:py-14">
        <Container className="flex flex-col gap-6">
          <SectionHeading
            tag={{ icon: "verified", label: "Fontes institucionais e científicas" }}
            title="Acompanhe e consulte as fontes"
            description="São portais e bases de consulta, não uma lista de notícias selecionadas. Datas, autores e contexto pertencem a cada publicação original."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INSTITUTIONAL_RESOURCES.map((resource) => <ResourceLink key={resource.id} resource={resource} />)}
          </div>
          <p className="text-label-md leading-relaxed text-on-surface-variant">
            Notícias de instituições são acessadas diretamente em seus portais oficiais; não há feed automatizado integrado nesta versão. Para conteúdos científicos, a busca ao vivo consulta Europe PMC e tenta conferir o DOI no Crossref quando informado.
          </p>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="rounded-2xl border border-primary/15 bg-surface-container-lowest p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
            <div>
              <p className="font-heading text-label-sm uppercase tracking-wider text-primary">Da investigação ao aprendizado</p>
              <h2 className="mt-1 font-heading text-title-md text-on-surface">Investigue uma alegação e aprofunde o tema</h2>
              <p className="mt-2 text-body-sm text-on-surface-variant">O caso sobre vitamina C está conectado à revisão sistemática referenciada nesta biblioteca.</p>
            </div>
            <Link to="/central-de-investigacoes/vitamina-c-em-megadoses" className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary-container px-4 py-3 font-heading text-label-md text-on-primary hover:bg-primary sm:mt-0">
              Abrir investigação <Icon name="arrow_forward" size={18} />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
