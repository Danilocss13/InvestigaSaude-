import { ROUTES } from "@/data/navigation";

export interface Skill {
  icon: string;
  iconTone: string;
  badge: string;
  title: string;
  description: string;
}

export const SKILLS: Skill[] = [
  {
    icon: "person_search",
    iconTone: "text-primary",
    badge: "Lupa de Prata",
    title: "Rastreamento de Fontes",
    description:
      "Aprenda a identificar quem produziu o conteúdo e a checar o registro profissional (CRM/Lattes) junto às bases oficiais.",
  },
  {
    icon: "format_image_left",
    iconTone: "text-secondary",
    badge: "Escudo Científico",
    title: "Verificação de Evidências",
    description:
      "Entenda a diferença crucial entre um relato anedótico de rede social e um estudo com revisão sistemática por pares.",
  },
  {
    icon: "radar",
    iconTone: "text-tertiary",
    badge: "Radar Atento",
    title: "Detecção de Gatilhos Emocionais",
    description:
      "Reconheça mensagens alarmistas que utilizam palavras de pânico, urgência artificial e teorias conspiratórias para forçar compartilhamento.",
  },
  {
    icon: "explore",
    iconTone: "text-primary",
    badge: "Bússola Crítica",
    title: "Contexto Temporal e Científico",
    description:
      "Descubra como pesquisar datas e verificar se conclusões preliminares não foram superadas por novos consensos.",
  },
];

/** Passaporte do Investigador — 100% DEMONSTRATIVO (nada é salvo). */
export const DEMO_PASSPORT = {
  badge: "Detetive Aprendiz",
  level: "Nível 1 Concluído",
  nextBadge: "Verificador de Fontes",
  progress: 60,
  remainingClues: 2,
};

export interface Tool {
  id: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  to: string;
}

export const TOOLS: Tool[] = [
  {
    id: "central-educativa",
    icon: "local_library",
    title: "Central Educativa",
    description:
      "Biblioteca temática descomplicada sobre imunidade, vacinas, medicamentos e mecanismos biológicos fundamentais.",
    cta: "Acessar biblioteca",
    to: ROUTES.educativa,
  },
  {
    id: "guia-de-verificacao",
    icon: "checklist_rtl",
    title: "Guia em 4 Etapas",
    description:
      "Checklist rápido de bolso para checar áudios, correntes de WhatsApp e postagens virais de forma metodológica.",
    cta: "Abrir checklist",
    to: ROUTES.guia,
  },
  {
    id: "laboratorio-interativo",
    icon: "experiment",
    title: "Laboratório Interativo",
    description:
      "Ambiente simulado de bancada \"Fato ou Ruído?\" para testar hipóteses, confrontar argumentos e dissecar mensagens suspeitas.",
    cta: "Iniciar bancada",
    to: ROUTES.laboratorio,
  },
  {
    id: "trilhas",
    icon: "route",
    title: "Trilhas de Autonomia",
    description:
      "Módulos didáticos curtos com linguagem acolhedora para cidadãos, cuidadores familiares e estudantes.",
    cta: "Ver trilhas",
    to: ROUTES.trilhas,
  },
];

export interface Institution {
  id: string;
  icon: string;
  name: string;
  fullName: string;
  tag: string;
  description: string;
  url: string;
}

/** Instituições de referência para consulta. Não há vínculo institucional com o projeto. */
export const INSTITUTIONS: Institution[] = [
  {
    id: "ministerio-da-saude",
    icon: "health_and_safety",
    name: "Ministério da Saúde",
    fullName: "Ministério da Saúde (SUS)",
    tag: "SUS • Brasil",
    description:
      "Protocolos Clínicos e Diretrizes Terapêuticas (PCDT) oficiais e informações do Programa Nacional de Imunizações.",
    url: "https://www.gov.br/saude/pt-br",
  },
  {
    id: "fiocruz",
    icon: "science",
    name: "Fiocruz",
    fullName: "Fundação Oswaldo Cruz (Fiocruz)",
    tag: "Pesquisa Biomédica",
    description:
      "Instituição pública de pesquisa em saúde, com atuação em vigilância, biotecnologia e comunicação científica.",
    url: "https://portal.fiocruz.br/",
  },
  {
    id: "oms",
    icon: "public",
    name: "OMS (WHO)",
    fullName: "Organização Mundial da Saúde (OMS)",
    tag: "Infodemiologia Global",
    description:
      "Orientações globais sobre gestão de infodemias, alertas sanitários e saúde pública internacional.",
    url: "https://www.who.int/",
  },
  {
    id: "cochrane",
    icon: "auto_stories",
    name: "Cochrane Library",
    fullName: "Biblioteca Cochrane (Revisões Sistemáticas)",
    tag: "Medicina Baseada em Evidências",
    description:
      "Referência em revisões sistemáticas independentes e meta-análises de estudos clínicos.",
    url: "https://www.cochranelibrary.com/",
  },
];

export interface LearningModule {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const EDU_MODULES: LearningModule[] = [
  { id: "imunidade", icon: "shield_with_heart", title: "Imunidade", description: "Como o sistema imunológico funciona e por que não existe \"turbinar\" a imunidade da noite para o dia." },
  { id: "vacinas", icon: "vaccines", title: "Vacinas", description: "Como vacinas são desenvolvidas, testadas e monitoradas após a aprovação." },
  { id: "medicamentos", icon: "medication", title: "Medicamentos", description: "Registro, bula, automedicação e a importância de seguir o tratamento prescrito." },
  { id: "fitoterapicos", icon: "eco", title: "Plantas e Fitoterápicos", description: "O que diferencia um chá caseiro de um fitoterápico regularizado." },
  { id: "estudos", icon: "lab_research", title: "Como ler um estudo", description: "Aprenda a interpretar métodos, resultados, limitações e conclusões sem ir além do que os dados permitem." },
  { id: "inteligencia-artificial", icon: "smart_toy", title: "Inteligência Artificial e Saúde", description: "Verifique imagens, vídeos, áudios e textos de saúde, sem depender de detectores como prova definitiva." },
  { id: "mecanismos", icon: "genetics", title: "Mecanismos Biológicos", description: "Conceitos fundamentais de biologia que ajudam a avaliar promessas de saúde." },
];

export const LEARNING_TRAILS: LearningModule[] = [
  { id: "cidadaos", icon: "groups", title: "Trilha Cidadãos", description: "Para quem recebe mensagens de saúde no dia a dia e quer checar antes de compartilhar." },
  { id: "cuidadores", icon: "family_restroom", title: "Trilha Cuidadores Familiares", description: "Para quem cuida de familiares e precisa avaliar orientações sobre tratamentos." },
  { id: "estudantes", icon: "school", title: "Trilha Estudantes", description: "Para estudantes que desejam praticar letramento científico e checagem de fontes." },
];
