export type VerdictId = "falso" | "sem-evidencia" | "fora-de-contexto" | "confiavel";

export interface VerdictMeta {
  id: VerdictId;
  label: string;
  icon: string;
  definition: string;
  /** classes de cor (fundo + texto) */
  tone: string;
}

/** Critérios de classificação usados em todos os casos. */
export const VERDICTS: VerdictMeta[] = [
  {
    id: "falso",
    label: "Falso",
    icon: "cancel",
    definition:
      "A afirmação contradiz dados verificáveis ou evidências identificáveis. Usado apenas quando há como demonstrar o erro.",
    tone: "bg-error-container text-on-error-container",
  },
  {
    id: "sem-evidencia",
    label: "Sem evidência suficiente",
    icon: "help",
    definition:
      "Não há estudos ou dados identificáveis que sustentem a afirmação, ou as evidências disponíveis são fracas demais para a conclusão apresentada.",
    tone: "bg-amber-verdict-container text-amber-verdict",
  },
  {
    id: "fora-de-contexto",
    label: "Fora de contexto",
    icon: "content_cut",
    definition:
      "Contém elementos reais (um estudo, uma imagem, um dado), mas apresentados de forma que altera seu sentido original.",
    tone: "bg-orange-verdict-container text-orange-verdict",
  },
  {
    id: "confiavel",
    label: "Confiável",
    icon: "verified",
    definition:
      "A informação é consistente com fontes identificáveis e com o consenso científico disponível no momento.",
    tone: "bg-secondary-container text-on-secondary-container",
  },
];

export const getVerdict = (id: VerdictId): VerdictMeta =>
  VERDICTS.find((v) => v.id === id) ?? VERDICTS[0];
