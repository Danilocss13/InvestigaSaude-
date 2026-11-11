export type DoiCheckStatus = "verified" | "mismatch" | "not-found" | "unavailable" | "no-doi";

export interface ScientificPublication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  publishedAt: string;
  doi?: string;
  pmid?: string;
  abstract?: string;
  abstractLanguage?: string;
  publicationTypes: string[];
  sourceUrl: string;
  doiCheck: DoiCheckStatus;
}

interface EuropePmcEntry {
  id?: string;
  source?: string;
  title?: string;
  authorString?: string;
  journalTitle?: string;
  pubYear?: string;
  firstPublicationDate?: string;
  doi?: string;
  pmid?: string;
  abstractText?: string;
  journalInfo?: {
    dateOfPublication?: string;
    yearOfPublication?: number;
    journal?: {
      title?: string;
      medlineAbbreviation?: string;
    };
  };
  language?: string;
  pubType?: string;
  pubTypeList?: { pubType?: string[] } | { pubType?: string };
}

interface EuropePmcResponse {
  resultList?: { result?: EuropePmcEntry[] };
}

interface CrossrefWorkResponse {
  message?: {
    DOI?: string;
    title?: string[];
  };
}

function stripMarkup(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const withSpacing = value
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, " $1. ")
    .replace(/<\/(p|div|li|section)>/gi, ". ")
    .replace(/<br\s*\/?>/gi, " ");
  const parsed = new DOMParser().parseFromString(withSpacing, "text/html");
  return parsed.body.textContent?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() || undefined;
}

function inferAbstractLanguage(abstract: string | undefined, declaredLanguage: string | undefined): string | undefined {
  if (!abstract) return declaredLanguage?.toLowerCase();

  const words = abstract
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .match(/[a-z]+/g) ?? [];
  const englishWords = new Set([
    "the", "and", "of", "in", "to", "was", "with", "this", "are", "has", "have",
    "from", "by", "as", "an", "that", "were", "which", "who", "study", "patients",
    "results", "trial", "data", "conclusion", "background", "objective", "methods",
    "treatment", "risk", "death", "hospitalized",
  ]);
  const portugueseWords = new Set([
    "que", "de", "do", "da", "em", "para", "com", "nao", "uma", "estudo", "pacientes",
    "foram", "este", "esta", "essa", "esses", "resultados", "ensaio", "dados", "conclusao",
    "objetivo", "metodos", "tratamento", "risco", "morte", "hospitalizados", "sobre",
    "como", "mais", "tambem", "foi", "sao", "nos", "nas", "dos", "das", "pela", "pelo",
    "artigo", "saude", "brasil", "entre", "seu", "sua", "ao", "aos",
  ]);
  const englishScore = words.reduce((score, word) => score + Number(englishWords.has(word)), 0);
  const portugueseScore = words.reduce((score, word) => score + Number(portugueseWords.has(word)), 0);

  if (englishScore >= 3 && englishScore >= portugueseScore * 1.5) return "eng";
  if (portugueseScore >= 3 && portugueseScore >= englishScore * 1.5) return "por";
  return declaredLanguage?.toLowerCase();
}

function getPublicationTypes(entry: EuropePmcEntry): string[] {
  const types = entry.pubTypeList?.pubType;
  if (Array.isArray(types)) return types;
  if (typeof types === "string") return [types];
  return entry.pubType?.split(";").map((type) => type.trim()).filter(Boolean) ?? [];
}

function normalizeDoi(value: string | undefined): string {
  return (value ?? "").replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").trim().toLowerCase();
}

function normalizeTitle(value: string | undefined): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

async function checkCrossrefDoi(
  doi: string | undefined,
  europePmcTitle: string,
  signal: AbortSignal,
): Promise<DoiCheckStatus> {
  if (!doi) return "no-doi";

  try {
    const response = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, { signal });
    if (response.status === 404) return "not-found";
    if (!response.ok) return "unavailable";

    const work = (await response.json()) as CrossrefWorkResponse;
    const crossrefDoi = normalizeDoi(work.message?.DOI);
    const crossrefTitle = work.message?.title?.[0];
    if (!crossrefDoi || !crossrefTitle) return "unavailable";

    return crossrefDoi === normalizeDoi(doi) && normalizeTitle(crossrefTitle) === normalizeTitle(europePmcTitle)
      ? "verified"
      : "mismatch";
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    return "unavailable";
  }
}

export async function searchEuropePmc(query: string, signal: AbortSignal): Promise<ScientificPublication[]> {
  const url = new URL("https://www.ebi.ac.uk/europepmc/webservices/rest/search");
  url.searchParams.set("query", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("resultType", "core");
  url.searchParams.set("pageSize", "10");

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Europe PMC retornou erro HTTP ${response.status}.`);
  }

  const data = (await response.json()) as EuropePmcResponse;
  const entries = data.resultList?.result ?? [];
  const publications = entries.map((entry, index) => {
    const abstract = stripMarkup(entry.abstractText);
    const sourceUrl = entry.doi
      ? `https://doi.org/${encodeURIComponent(entry.doi)}`
      : entry.pmid
        ? `https://pubmed.ncbi.nlm.nih.gov/${encodeURIComponent(entry.pmid)}/`
        : `https://europepmc.org/search?query=${encodeURIComponent(query)}`;
    return {
      id: `${entry.source ?? "PMC"}-${entry.id ?? entry.doi ?? index}`,
      title: stripMarkup(entry.title) || "Título não informado pelo indexador",
      authors: stripMarkup(entry.authorString) || "Autores não informados pelo indexador",
      journal: stripMarkup(entry.journalTitle || entry.journalInfo?.journal?.title || entry.journalInfo?.journal?.medlineAbbreviation) || "Periódico não informado pelo indexador",
      year: entry.pubYear?.trim() || String(entry.journalInfo?.yearOfPublication ?? ""),
      publishedAt: entry.firstPublicationDate?.trim() || entry.journalInfo?.dateOfPublication?.trim() || "",
      doi: entry.doi?.trim() || undefined,
      pmid: entry.pmid?.trim() || undefined,
      abstract,
      abstractLanguage: inferAbstractLanguage(abstract, entry.language),
      publicationTypes: getPublicationTypes(entry),
      sourceUrl,
      doiCheck: "unavailable" as const,
    };
  });

  return Promise.all(
    publications.map(async (publication) => ({
      ...publication,
      doiCheck: await checkCrossrefDoi(publication.doi, publication.title, signal),
    })),
  );
}
