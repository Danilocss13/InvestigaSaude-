/** Rotas centralizadas — use estas constantes em vez de strings soltas. */
export const ROUTES = {
  home: "/",
  central: "/central-de-investigacoes",
  archive: "/central-de-investigacoes#arquivo",
  caseDetail: (slug: string) => `/central-de-investigacoes/${slug}`,
  educativa: "/central-educativa",
  trilhas: "/central-educativa#trilhas",
  guia: "/guia-de-verificacao",
  laboratorio: "/laboratorio-interativo",
  metodologia: "/metodologia-e-fontes",
  termos: "/metodologia-e-fontes#termos",
  sobre: "/sobre",
  privacidade: "/sobre#privacidade",
} as const;

export interface NavItem {
  id: string;
  label: string;
  to: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "inicio", label: "Início", to: ROUTES.home, icon: "home" },
  { id: "central-de-investigacoes", label: "Central de Investigações", to: ROUTES.central, icon: "folder_special" },
  { id: "central-educativa", label: "Central Educativa", to: ROUTES.educativa, icon: "local_library" },
  { id: "guia-de-verificacao", label: "Guia de Verificação", to: ROUTES.guia, icon: "checklist_rtl" },
  { id: "laboratorio-interativo", label: "Laboratório Interativo", to: ROUTES.laboratorio, icon: "experiment" },
  { id: "metodologia-e-fontes", label: "Metodologia e Fontes", to: ROUTES.metodologia, icon: "menu_book" },
  { id: "sobre", label: "Sobre", to: ROUTES.sobre, icon: "info" },
];
