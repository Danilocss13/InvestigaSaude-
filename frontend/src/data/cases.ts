import type { VerdictId } from "@/data/verdicts";

/* =====================================================================
 * Casos da Central de Investigações
 * ---------------------------------------------------------------------
 * Para adicionar um caso: acrescente um objeto ao array CASES.
 * Todos os casos desta etapa são DEMONSTRATIVOS (isDemo: true).
 * Regra editorial: toda afirmação factual deve apontar para uma fonte
 * identificável em `sources`. Fontes com reviewStatus "a-revisar"
 * ainda precisam de conferência pela equipe pedagógica.
 * ===================================================================== */

export type CaseStatus = "disponivel" | "em-investigacao" | "em-elaboracao";
export type Difficulty = 1 | 2 | 3;
export type MessageFormat = "whatsapp" | "audio" | "post" | "anuncio";

export interface CatalogedClue {
  icon: string;
  label: string;
}

export interface Clue {
  id: string;
  icon: string;
  title: string;
  summary: string;
  analysis: string;
  alert?: boolean;
}

export interface CaseSource {
  title: string;
  publisher: string;
  type: string;
  url: string;
  citation?: string;
  reviewStatus: "a-revisar" | "revisada";
}

export interface ViralMessage {
  format: MessageFormat;
  label: string;
  text: string;
}

export interface Dossier {
  briefing: string;
  scenarioNote: string;
  message: ViralMessage;
  clues: Clue[];
  verdict: VerdictId;
  /** veredito alternativo também defensável, com comentário */
  alternative?: { verdict: VerdictId; comment: string };
  explanation: string;
  learnings: string[];
  sources: CaseSource[];
}

export interface InvestigationCase {
  slug: string;
  code: string;
  title: string;
  theme: string;
  status: CaseStatus;
  difficulty: Difficulty;
  minutes: number;
  image?: string;
  imageAlt: string;
  synopsis: string;
  catalogedClues: CatalogedClue[];
  featured?: boolean;
  isDemo: true;
  dossier?: Dossier;
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  1: "Iniciante",
  2: "Intermediário",
  3: "Avançado",
};

export const STATUS_META: Record<CaseStatus, { label: string; icon: string; tone: string; cta: string; ctaTone: string }> = {
  disponivel: {
    label: "Disponível",
    icon: "lock_open",
    tone: "bg-secondary-container/70 text-on-secondary-container",
    cta: "Assumir Caso",
    ctaTone: "bg-primary-container text-on-primary hover:bg-primary",
  },
  "em-investigacao": {
    label: "Em Investigação",
    icon: "autorenew",
    tone: "bg-tertiary-fixed text-on-tertiary-fixed",
    cta: "Continuar Análise",
    ctaTone: "bg-tertiary text-on-tertiary hover:bg-tertiary-container",
  },
  "em-elaboracao": {
    label: "Em elaboração",
    icon: "edit_note",
    tone: "bg-surface-container-highest text-on-surface-variant",
    cta: "Ver andamento",
    ctaTone: "bg-surface-container text-primary hover:bg-surface-container-highest",
  },
};

const SRC_ANVISA_CONSULTAS: CaseSource = {
  title: "Consultas — produtos regularizados",
  publisher: "Agência Nacional de Vigilância Sanitária (Anvisa)",
  type: "Base de dados oficial",
  url: "https://consultas.anvisa.gov.br/",
  reviewStatus: "a-revisar",
};

export const CASES: InvestigationCase[] = [
  {
    slug: "vitamina-c-em-megadoses",
    code: "#101",
    title: "O Mistério da Vitamina C em Megadoses",
    theme: "Imunidade e Doenças Respiratórias",
    status: "disponivel",
    difficulty: 1,
    minutes: 5,
    image: "/images/casos/vitamina-c.jpg",
    imageAlt: "Comprimidos efervescentes de vitamina C dissolvendo em água, em tons de verde-água",
    synopsis:
      "Mensagens afirmam que doses maciças curam gripes e infecções instantaneamente. O que as revisões de estudos clínicos dizem sobre o excesso de vitamina C?",
    catalogedClues: [
      { icon: "pin_drop", label: "Origem do boato sem autoria" },
      { icon: "biotech", label: "Absorção e eliminação do excesso" },
      { icon: "fact_check", label: "O que as revisões sistemáticas analisaram" },
    ],
    featured: true,
    isDemo: true,
    dossier: {
      briefing:
        "Uma corrente circula em grupos de família afirmando que megadoses de vitamina C curam gripes e qualquer infecção em 24 horas. Sua missão: examinar as pistas e decidir como classificar essa afirmação.",
      scenarioNote: "Mensagem fictícia, criada para fins didáticos.",
      message: {
        format: "whatsapp",
        label: "Corrente de WhatsApp",
        text: "URGENTE! Médicos escondem isso: tomar 10 gramas de vitamina C por dia cura gripe e qualquer infecção em 24 horas. É natural, não faz mal nenhum. Compartilhe com quem você ama!",
      },
      clues: [
        {
          id: "origem",
          icon: "pin_drop",
          title: "Origem do boato",
          summary: "A mensagem não cita autor, estudo ou instituição.",
          analysis:
            "Expressões como \"médicos escondem isso\" apelam para a ideia de conspiração, mas não dizem quem fez a afirmação nem onde ela foi publicada. Sem uma origem identificável, não há como conferir o que está sendo dito.",
          alert: true,
        },
        {
          id: "biologia",
          icon: "biotech",
          title: "Absorção e excesso",
          summary: "O corpo não aproveita quantidades ilimitadas.",
          analysis:
            "A ficha técnica sobre vitamina C do Office of Dietary Supplements (NIH, EUA) descreve que a absorção diminui à medida que a dose aumenta e que o excesso não absorvido tende a ser eliminado. A mesma fonte apresenta um limite superior de ingestão para adultos e possíveis efeitos gastrointestinais em doses altas. \"Natural\" não significa \"sem risco\".",
        },
        {
          id: "revisoes",
          icon: "fact_check",
          title: "O que as revisões analisaram",
          summary: "Atenção: resfriado comum não é o mesmo que gripe.",
          analysis:
            "Uma revisão sistemática Cochrane sobre vitamina C e resfriado comum (Hemilä & Chalker, 2013) não encontrou redução na frequência de resfriados com suplementação regular na população geral e relatou redução modesta na duração dos sintomas. Doses altas iniciadas após o começo dos sintomas não mostraram efeito consistente. Além disso, a revisão trata do resfriado comum — e não da gripe (influenza) nem de \"qualquer infecção\".",
        },
      ],
      verdict: "sem-evidencia",
      alternative: {
        verdict: "falso",
        comment:
          "Classificar como \"Falso\" também é uma leitura defensável para a promessa de cura em 24 horas. Preferimos \"Sem evidência suficiente\" porque as fontes avaliam efeitos sobre o resfriado, e não testaram exatamente a promessa feita na mensagem.",
      },
      explanation:
        "Não foi encontrada evidência que sustente a promessa de curar gripes e infecções em 24 horas com megadoses de vitamina C. A revisão disponível indica, no máximo, efeitos modestos sobre a duração do resfriado comum com uso regular — o que é muito diferente de uma cura.",
      learnings: [
        "Desconfie de promessas de cura rápida e universal.",
        "Confira se o estudo citado trata da mesma condição (resfriado ≠ gripe).",
        "Natural não é sinônimo de seguro: doses altas também têm limites.",
      ],
      sources: [
        {
          title: "Vitamin C for preventing and treating the common cold",
          publisher: "Cochrane Database of Systematic Reviews",
          type: "Revisão sistemática",
          citation: "Hemilä H, Chalker E. 2013, CD000980. DOI: 10.1002/14651858.CD000980.pub4",
          url: "https://doi.org/10.1002/14651858.CD000980.pub4",
          reviewStatus: "a-revisar",
        },
        {
          title: "Vitamin C — Health Professional Fact Sheet",
          publisher: "Office of Dietary Supplements, National Institutes of Health (EUA)",
          type: "Ficha técnica institucional",
          url: "https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/",
          reviewStatus: "a-revisar",
        },
      ],
    },
  },
  {
    slug: "cha-milagroso-em-jejum",
    code: "#102",
    title: "A Promessa do Chá Milagroso em Jejum",
    theme: "Metabolismo e Fitoterapia",
    status: "em-investigacao",
    difficulty: 2,
    minutes: 6,
    image: "/images/casos/cha-milagroso.jpg",
    imageAlt: "Xícara de infusão de ervas e folhas medicinais sobre mesa de pesquisa",
    synopsis:
      "Um suposto chá promete derreter gordura no fígado e substituir remédios de uso contínuo. Como confrontar o marketing milagroso com informações baseadas em evidências?",
    catalogedClues: [
      { icon: "vital_signs", label: "Fígado e toxicidade de produtos vegetais" },
      { icon: "warning", label: "Riscos de abandono do tratamento" },
      { icon: "app_registration", label: "Consulta ao registro de fitoterápicos" },
    ],
    featured: true,
    isDemo: true,
    dossier: {
      briefing:
        "Um áudio encaminhado diz que um chá tomado em jejum \"derrete\" a gordura do fígado e permite abandonar remédios de pressão e diabetes. Investigue antes de compartilhar.",
      scenarioNote: "Transcrição fictícia, criada para fins didáticos.",
      message: {
        format: "audio",
        label: "Áudio encaminhado (transcrição)",
        text: "Gente, descobri um chá que, tomado em jejum, derrete a gordura do fígado em uma semana. Minha tia parou o remédio da pressão e do diabetes e está ótima. Os laboratórios não querem que você saiba!",
      },
      clues: [
        {
          id: "figado",
          icon: "vital_signs",
          title: "Fígado e produtos vegetais",
          summary: "Plantas também podem afetar o fígado.",
          analysis:
            "A base LiverTox, mantida pelos Institutos Nacionais de Saúde dos EUA (NIH), reúne informações sobre lesão hepática associada a medicamentos, ervas e suplementos. Ou seja: produtos de origem vegetal não são automaticamente inofensivos. O áudio não informa qual planta, qual dose nem qual estudo sustentaria o efeito prometido.",
        },
        {
          id: "abandono",
          icon: "warning",
          title: "Abandono do tratamento",
          summary: "A mensagem incentiva parar remédios de uso contínuo.",
          analysis:
            "Um relato pessoal (\"minha tia parou o remédio\") não é evidência de eficácia nem de segurança. Interromper medicamentos de uso contínuo sem orientação pode trazer riscos. Qualquer mudança de tratamento deve ser conversada com a equipe de saúde que acompanha a pessoa.",
          alert: true,
        },
        {
          id: "registro",
          icon: "app_registration",
          title: "Registro do produto",
          summary: "Nenhum nome comercial ou registro foi informado.",
          analysis:
            "No Brasil, a Anvisa é responsável pela regularização de medicamentos, incluindo fitoterápicos. Uma etapa da investigação é consultar a base pública da Anvisa para saber se o produto existe e para quais indicações foi aprovado. Como o áudio não informa nome nem registro, não há o que conferir.",
        },
      ],
      verdict: "sem-evidencia",
      explanation:
        "A afirmação de que o chá \"derrete\" a gordura do fígado e substitui medicamentos não apresenta nenhuma evidência identificável: não há nome da planta, estudo ou registro. A classificação é \"Sem evidência suficiente\" — e, por estimular o abandono de tratamento, trata-se de um conteúdo potencialmente perigoso.",
      learnings: [
        "Relato pessoal não substitui estudo.",
        "Nunca interrompa um tratamento sem orientação profissional.",
        "Produtos com alegação terapêutica podem ser consultados na Anvisa.",
      ],
      sources: [
        {
          title: "LiverTox: Clinical and Research Information on Drug-Induced Liver Injury",
          publisher: "National Institute of Diabetes and Digestive and Kidney Diseases (NIH, EUA)",
          type: "Base de dados de referência",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK547852/",
          reviewStatus: "a-revisar",
        },
        SRC_ANVISA_CONSULTAS,
      ],
    },
  },
  {
    slug: "noticia-fora-de-contexto",
    code: "#103",
    title: "O Caso da Notícia Fora de Contexto",
    theme: "Vacinação e Saúde Pública",
    status: "disponivel",
    difficulty: 3,
    minutes: 7,
    image: "/images/casos/noticia-fora-de-contexto.jpg",
    imageAlt: "Documentos sendo analisados com lupa sobre uma mesa de arquivo",
    synopsis:
      "Um trecho de um estudo antigo foi recortado nas redes sociais para simular um perigo em vacinas atuais. Aprenda a rastrear a fonte original e a data da publicação.",
    catalogedClues: [
      { icon: "calendar_month", label: "Anacronismo e data de publicação" },
      { icon: "science", label: "Metodologia original descontextualizada" },
      { icon: "travel_explore", label: "Checagem reversa de imagem" },
    ],
    featured: true,
    isDemo: true,
    dossier: {
      briefing:
        "Uma postagem mostra a captura de tela do título de um artigo científico com a frase \"efeito adverso observado\" e afirma que \"a ciência acaba de provar\" que uma vacina atual é perigosa. Descubra o que foi omitido.",
      scenarioNote:
        "Cenário fictício: o artigo citado na postagem não corresponde a nenhuma publicação real.",
      message: {
        format: "post",
        label: "Postagem em rede social",
        text: "A CIÊNCIA ACABA DE PROVAR! Estudo mostra \"efeito adverso observado\" na vacina que estão aplicando agora. Por que a TV não fala disso? [captura de tela do título de um artigo]",
      },
      clues: [
        {
          id: "data",
          icon: "calendar_month",
          title: "Data de publicação",
          summary: "A captura de tela esconde a data do artigo.",
          analysis:
            "Ao buscar o título, o investigador descobre (no cenário) que o artigo foi publicado anos antes de a vacina citada na postagem existir. Um estudo não pode ter avaliado um produto que ainda não havia sido desenvolvido.",
          alert: true,
        },
        {
          id: "metodo",
          icon: "science",
          title: "O que o estudo avaliou",
          summary: "O recorte omite o objeto e as limitações do estudo.",
          analysis:
            "No cenário, o estudo original analisava outra formulação, em um grupo pequeno de participantes, e os próprios autores apontavam limitações. Recortar uma frase isolada muda completamente o sentido da conclusão.",
        },
        {
          id: "imagem",
          icon: "travel_explore",
          title: "Busca reversa de imagem",
          summary: "A mesma imagem já havia circulado antes.",
          analysis:
            "Ferramentas de busca reversa de imagem permitem encontrar versões anteriores de uma mesma imagem. No cenário, a captura já tinha circulado com outra legenda — um sinal de reaproveitamento de conteúdo.",
        },
      ],
      verdict: "fora-de-contexto",
      explanation:
        "A postagem usa um elemento que existe (um artigo científico), mas o apresenta como se fosse recente e como se tratasse da vacina atual. O problema não é o estudo, e sim o recorte: por isso a classificação é \"Fora de contexto\".",
      learnings: [
        "Sempre procure a data e a fonte original de um estudo.",
        "Uma frase isolada não resume a conclusão de uma pesquisa.",
        "Busca reversa de imagem ajuda a identificar conteúdo reaproveitado.",
      ],
      sources: [
        {
          title: "Infodemic — tópico de saúde",
          publisher: "Organização Mundial da Saúde (OMS)",
          type: "Portal institucional",
          url: "https://www.who.int/health-topics/infodemic",
          reviewStatus: "a-revisar",
        },
        {
          title: "Saúde com Ciência",
          publisher: "Ministério da Saúde (Brasil)",
          type: "Portal institucional",
          url: "https://www.gov.br/saude/pt-br/assuntos/saude-com-ciencia",
          reviewStatus: "a-revisar",
        },
      ],
    },
  },
  {
    slug: "formula-milagrosa",
    code: "#104",
    title: "O Enigma da Fórmula Milagrosa",
    theme: "Doenças Crônicas e Automedicação",
    status: "disponivel",
    difficulty: 1,
    minutes: 5,
    imageAlt: "Ficha de investigação do caso da fórmula milagrosa",
    synopsis:
      "Uma mensagem em massa promete reversão total de distúrbios crônicos com gotas orgânicas secretas.",
    catalogedClues: [
      { icon: "priority_high", label: "Promessa absoluta de cura" },
      { icon: "record_voice_over", label: "Especialista sem identificação" },
      { icon: "cancel_presentation", label: "Registro que não se confirma" },
    ],
    isDemo: true,
    dossier: {
      briefing:
        "Uma mensagem com link de venda promete que gotas \"orgânicas e secretas\" revertem diabetes, pressão alta e artrite em 48 horas, e diz que o produto é aprovado pela Anvisa. Verifique cada afirmação.",
      scenarioNote: "Produto e mensagem fictícios, criados para fins didáticos.",
      message: {
        format: "anuncio",
        label: "Mensagem em massa com link de venda",
        text: "Gotas Elixir Total: reverte diabetes, pressão alta e artrite em 48 horas! Aprovado pela Anvisa. Fórmula secreta revelada por especialista famoso. Não precisa de receita. Últimas unidades!",
      },
      clues: [
        {
          id: "promessa",
          icon: "priority_high",
          title: "Pista 01: Promessa Absoluta",
          summary: "Promessa de cura em 48h, sem receita médica.",
          analysis:
            "A mensagem promete \"reverter\" várias doenças crônicas diferentes ao mesmo tempo, em prazo curtíssimo. Promessas absolutas, universais e com urgência de compra (\"últimas unidades\") são sinais clássicos de propaganda enganosa.",
          alert: true,
        },
        {
          id: "fonte",
          icon: "record_voice_over",
          title: "Pista 02: Fonte Apócrifa",
          summary: "Atribuída a \"especialista famoso\", sem registro ou afiliação.",
          analysis:
            "O suposto especialista não tem nome, registro profissional nem vínculo institucional informado. O registro de médicos pode ser consultado publicamente no portal do Conselho Federal de Medicina (CFM).",
        },
        {
          id: "registro",
          icon: "cancel_presentation",
          title: "Pista 03: Vácuo Regulatório",
          summary: "\"Aprovado pela Anvisa\", mas sem número de registro.",
          analysis:
            "A mensagem afirma aprovação da Anvisa, mas não informa número de registro. No cenário do caso, a busca na base pública de consultas da Anvisa não encontra o produto — uma afirmação verificável que não se confirma.",
        },
      ],
      verdict: "falso",
      alternative: {
        verdict: "sem-evidencia",
        comment:
          "A promessa de cura também não tem evidência. Mas, como a mensagem faz uma afirmação verificável que se mostrou incorreta (a aprovação da Anvisa), \"Falso\" é a classificação mais precisa.",
      },
      explanation:
        "No cenário, a mensagem faz uma afirmação verificável — \"aprovado pela Anvisa\" — que não se confirma na consulta, além de prometer a reversão de doenças crônicas sem nenhuma evidência identificável. Por conter informação comprovadamente incorreta, a classificação é \"Falso\".",
      learnings: [
        "\"Aprovado pela Anvisa\" é uma afirmação que pode (e deve) ser conferida.",
        "Especialista sem nome e sem registro não é fonte.",
        "Urgência de compra é um gatilho emocional, não uma evidência.",
      ],
      sources: [
        SRC_ANVISA_CONSULTAS,
        {
          title: "Busca por médicos",
          publisher: "Conselho Federal de Medicina (CFM)",
          type: "Base de dados oficial",
          url: "https://portal.cfm.org.br/busca-medicos/",
          reviewStatus: "a-revisar",
        },
      ],
    },
  },
  {
    slug: "audio-do-especialista-anonimo",
    code: "#105",
    title: "O Áudio do \"Especialista\" Anônimo",
    theme: "Fontes e Credibilidade",
    status: "em-elaboracao",
    difficulty: 2,
    minutes: 6,
    imageAlt: "Dossiê em elaboração",
    synopsis:
      "Dossiê em elaboração. Este caso abordará como avaliar áudios atribuídos a profissionais de saúde sem identificação.",
    catalogedClues: [
      { icon: "record_voice_over", label: "Pistas em elaboração" },
      { icon: "badge", label: "Pistas em elaboração" },
      { icon: "more_horiz", label: "Pistas em elaboração" },
    ],
    isDemo: true,
  },
  {
    slug: "dieta-detox-viral",
    code: "#106",
    title: "A Dieta \"Detox\" Viral",
    theme: "Nutrição e Bem-estar",
    status: "em-elaboracao",
    difficulty: 3,
    minutes: 7,
    imageAlt: "Dossiê em elaboração",
    synopsis:
      "Dossiê em elaboração. Este caso abordará promessas de \"desintoxicação\" do corpo divulgadas em redes sociais.",
    catalogedClues: [
      { icon: "restaurant", label: "Pistas em elaboração" },
      { icon: "trending_up", label: "Pistas em elaboração" },
      { icon: "more_horiz", label: "Pistas em elaboração" },
    ],
    isDemo: true,
  },
];

export const FEATURED_CASES = CASES.filter((c) => c.featured);
export const HERO_CASE = CASES.find((c) => c.slug === "formula-milagrosa") ?? CASES[0];
export const FIRST_CASE = CASES[0];
export const THEMES = Array.from(new Set(CASES.map((c) => c.theme)));

export const getCaseBySlug = (slug: string | undefined) => CASES.find((c) => c.slug === slug);

export const getNextCase = (slug: string) => {
  const playable = CASES.filter((c) => c.dossier);
  const idx = playable.findIndex((c) => c.slug === slug);
  return playable[(idx + 1) % playable.length];
};

export const countByStatus = (status: CaseStatus) => CASES.filter((c) => c.status === status).length;
