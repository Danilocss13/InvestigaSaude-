export interface EducationalResource {
  id: string;
  title: string;
  institution: string;
  kind: string;
  description: string;
  url: string;
}

export const INSTITUTIONAL_RESOURCES: EducationalResource[] = [
  {
    id: "ministerio-saude-ciencia",
    title: "Saúde com Ciência",
    institution: "Ministério da Saúde (Brasil)",
    kind: "Portal institucional",
    description: "Acompanhe ações e materiais oficiais sobre desinformação em saúde.",
    url: "https://www.gov.br/saude/pt-br/assuntos/saude-com-ciencia",
  },
  {
    id: "fiocruz",
    title: "Portal Fiocruz",
    institution: "Fundação Oswaldo Cruz",
    kind: "Portal institucional",
    description: "Consulte notícias, publicações e materiais produzidos pela instituição.",
    url: "https://portal.fiocruz.br/",
  },
  {
    id: "oms-infodemia",
    title: "Infodemia",
    institution: "Organização Mundial da Saúde",
    kind: "Tema de saúde pública",
    description: "Informações da OMS sobre infodemia e gestão de informações em saúde.",
    url: "https://www.who.int/health-topics/infodemic",
  },
  {
    id: "opas",
    title: "OPAS — temas de saúde",
    institution: "Organização Pan-Americana da Saúde",
    kind: "Portal institucional",
    description: "Acesse publicações e atualizações regionais de saúde.",
    url: "https://www.paho.org/pt",
  },
  {
    id: "anvisa",
    title: "Anvisa",
    institution: "Agência Nacional de Vigilância Sanitária",
    kind: "Portal institucional",
    description: "Consulte informações regulatórias, alertas e serviços oficiais.",
    url: "https://www.gov.br/anvisa/pt-br",
  },
  {
    id: "cochrane",
    title: "Cochrane Library",
    institution: "Cochrane",
    kind: "Revisões sistemáticas",
    description: "Pesquise revisões sistemáticas; a indexação, por si só, não substitui a leitura crítica.",
    url: "https://www.cochranelibrary.com/",
  },
  {
    id: "pubmed",
    title: "PubMed",
    institution: "National Library of Medicine (EUA)",
    kind: "Base bibliográfica",
    description: "Localize referências biomédicas e siga o link para a publicação original.",
    url: "https://pubmed.ncbi.nlm.nih.gov/",
  },
];

export interface TopicGuide {
  id: string;
  title: string;
  introduction: string;
  keyPoints: string[];
  source: EducationalResource;
}

export const TOPIC_GUIDES: TopicGuide[] = [
  {
    id: "imunidade",
    title: "Imunidade",
    introduction: "Uma introdução ao sistema imune ajuda a colocar alegações sobre suplementos e \"reforço\" da imunidade em contexto. O material de referência explica componentes e funcionamento; não oferece avaliação individual.",
    keyPoints: [
      "Desconfie de promessas de fortalecer todo o sistema imune com um produto ou hábito isolado.",
      "Diferencie mecanismos biológicos plausíveis de resultados demonstrados em pessoas.",
      "Considere condição de saúde, dose e contexto antes de interpretar estudos sobre suplementos.",
    ],
    source: {
      id: "niaid-immune-system",
      title: "Immune System",
      institution: "MedlinePlus — National Library of Medicine (EUA)",
      kind: "Índice educativo institucional (em inglês)",
      description: "Índice de materiais sobre sistema imune e condições relacionadas.",
      url: "https://medlineplus.gov/immunesystem.html",
    },
  },
  {
    id: "vacinas",
    title: "Vacinas",
    introduction: "A segurança de vacinas é acompanhada em diferentes etapas. Ao avaliar uma alegação, confira qual vacina, população, desfecho e período foram de fato estudados.",
    keyPoints: [
      "Um evento ocorrido após a vacinação não demonstra, sozinho, que a vacina o causou.",
      "Estudos e sistemas de vigilância respondem a perguntas diferentes e têm limitações próprias.",
      "Recomendações podem variar conforme idade, condição clínica e situação epidemiológica.",
    ],
    source: {
      id: "who-vaccine-safety",
      title: "Vaccines and immunization: Vaccine safety",
      institution: "Organização Mundial da Saúde",
      kind: "Perguntas e respostas oficial (em inglês)",
      description: "Informações da OMS sobre segurança e monitoramento de vacinas.",
      url: "https://www.who.int/news-room/questions-and-answers/item/vaccines-and-immunization-vaccine-safety",
    },
  },
  {
    id: "medicamentos",
    title: "Medicamentos",
    introduction: "Registro, indicação, dose, contraindicações e interações são informações diferentes. A bula e as bases regulatórias ajudam a conferir o que foi autorizado para cada produto.",
    keyPoints: [
      "Confira o nome exato, a apresentação e a indicação aprovada do medicamento.",
      "Não interrompa nem altere um tratamento com base em uma postagem ou conteúdo automatizado.",
      "Procure um profissional de saúde para orientação individual.",
    ],
    source: {
      id: "anvisa-medicamentos",
      title: "Medicamentos",
      institution: "Agência Nacional de Vigilância Sanitária",
      kind: "Portal regulatório oficial",
      description: "Portal da Anvisa para temas e serviços relacionados a medicamentos.",
      url: "https://www.gov.br/anvisa/pt-br/assuntos/medicamentos",
    },
  },
  {
    id: "fitoterapicos",
    title: "Plantas e Fitoterápicos",
    introduction: "Origem vegetal não é sinônimo de ausência de risco. Produto, espécie, preparo, dose, interação e regularização importam; um chá e um medicamento fitoterápico não são categorias equivalentes.",
    keyPoints: [
      "Peça o nome da planta e do produto; nomes populares podem ser ambíguos.",
      "Verifique regularização e indicação em fontes oficiais.",
      "Não substitua medicamentos prescritos por plantas ou suplementos sem conversar com a equipe de saúde.",
    ],
    source: {
      id: "anvisa-fitoterapicos",
      title: "Medicamentos — informações regulatórias",
      institution: "Agência Nacional de Vigilância Sanitária",
      kind: "Portal regulatório oficial",
      description: "Consulte o portal oficial da Anvisa e localize informações regulatórias sobre medicamentos.",
      url: "https://www.gov.br/anvisa/pt-br/assuntos/medicamentos",
    },
  },
  {
    id: "mecanismos",
    title: "Mecanismos Biológicos",
    introduction: "Uma explicação de como algo poderia funcionar não basta para concluir que previne ou trata uma doença. É preciso verificar se o efeito foi observado em estudos adequados e em pessoas.",
    keyPoints: [
      "Mecanismo plausível gera uma hipótese; não substitui ensaios e desfechos clínicos.",
      "Resultados em células ou animais não se transferem automaticamente para seres humanos.",
      "A evidência deve corresponder à alegação, à população e ao desfecho anunciado.",
    ],
    source: {
      id: "medlineplus-genetics",
      title: "MedlinePlus Genetics",
      institution: "National Library of Medicine (EUA)",
      kind: "Referência educativa institucional (em inglês)",
      description: "Materiais introdutórios sobre genética, biologia e saúde.",
      url: "https://medlineplus.gov/genetics/",
    },
  },
];

export const VITAMIN_C_REVIEW: EducationalResource = {
  id: "vitamin-c-review",
  title: "Vitamin C for preventing and treating the common cold",
  institution: "Cochrane Database of Systematic Reviews",
  kind: "Revisão sistemática",
  description: "Hemilä H, Chalker E. 2013. DOI: 10.1002/14651858.CD000980.pub4. A revisão aborda resfriado comum; não demonstra cura de gripe ou de qualquer infecção.",
  url: "https://doi.org/10.1002/14651858.CD000980.pub4",
};
