export interface GuideStep {
  id: string;
  number: string;
  icon: string;
  title: string;
  description: string;
  checks: { id: string; label: string }[];
  tools?: { label: string; url: string }[];
}

/** Guia de Verificação em 4 etapas — conteúdo metodológico em revisão pedagógica. */
export const GUIDE_STEPS: GuideStep[] = [
  {
    id: "pare",
    number: "01",
    icon: "front_hand",
    title: "Pare antes de compartilhar",
    description: "Mensagens desenhadas para viralizar costumam provocar emoção forte antes de qualquer reflexão.",
    checks: [
      { id: "pare-1", label: "A mensagem usa palavras de pânico, urgência ou \"compartilhe antes que apaguem\"?" },
      { id: "pare-2", label: "Ela promete algo absoluto, como cura total, rápida e para todos?" },
      { id: "pare-3", label: "Sugere que \"escondem a verdade\" de você?" },
    ],
  },
  {
    id: "fonte",
    number: "02",
    icon: "person_search",
    title: "Quem está falando?",
    description: "Uma informação de saúde precisa ter autoria identificável e, idealmente, vínculo com uma instituição.",
    checks: [
      { id: "fonte-1", label: "O autor tem nome completo e é identificável?" },
      { id: "fonte-2", label: "O registro profissional ou currículo pode ser consultado?" },
      { id: "fonte-3", label: "Há instituição, veículo ou órgão oficial associado?" },
    ],
    tools: [
      { label: "Busca de médicos — CFM", url: "https://portal.cfm.org.br/busca-medicos/" },
      { label: "Plataforma Lattes — CNPq", url: "https://lattes.cnpq.br/" },
    ],
  },
  {
    id: "evidencia",
    number: "03",
    icon: "fact_check",
    title: "Onde está a evidência?",
    description: "Afirmações factuais precisam apontar para estudos, dados ou documentos que possam ser conferidos.",
    checks: [
      { id: "evidencia-1", label: "A mensagem cita um estudo, dado ou documento específico?" },
      { id: "evidencia-2", label: "Consegui encontrar a fonte original, e não apenas outra postagem?" },
      { id: "evidencia-3", label: "Órgãos oficiais de saúde dizem algo sobre o tema?" },
    ],
    tools: [
      { label: "Saúde com Ciência — Ministério da Saúde", url: "https://www.gov.br/saude/pt-br/assuntos/saude-com-ciencia" },
    ],
  },
  {
    id: "contexto",
    number: "04",
    icon: "calendar_month",
    title: "Qual é o contexto?",
    description: "Conteúdo real pode enganar quando aparece com data, local ou sentido diferentes do original.",
    checks: [
      { id: "contexto-1", label: "A data da informação é recente ou foi reaproveitada?" },
      { id: "contexto-2", label: "A imagem ou o vídeo já circulou antes com outra legenda?" },
      { id: "contexto-3", label: "A conclusão apresentada é a mesma da fonte original?" },
    ],
  },
];
