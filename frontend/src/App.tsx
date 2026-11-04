import { Routes, Route } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import Home from "@/pages/Home";
import CentralInvestigacoes from "@/pages/CentralInvestigacoes";
import CaseDetail from "@/pages/CaseDetail";
import CentralEducativa from "@/pages/CentralEducativa";
import GuiaVerificacao from "@/pages/GuiaVerificacao";
import LaboratorioInterativo from "@/pages/LaboratorioInterativo";
import MetodologiaFontes from "@/pages/MetodologiaFontes";
import Sobre from "@/pages/Sobre";
import NotFound from "@/pages/NotFound";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="central-de-investigacoes" element={<CentralInvestigacoes />} />
        <Route path="central-de-investigacoes/:slug" element={<CaseDetail />} />
        <Route path="central-educativa" element={<CentralEducativa />} />
        <Route path="guia-de-verificacao" element={<GuiaVerificacao />} />
        <Route path="laboratorio-interativo" element={<LaboratorioInterativo />} />
        <Route path="metodologia-e-fontes" element={<MetodologiaFontes />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
