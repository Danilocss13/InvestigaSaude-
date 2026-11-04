import { Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollManager } from "@/components/layout/ScrollManager";

/** Layout comum a todas as páginas: header fixo + conteúdo + rodapé. */
export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <ScrollManager />
      <SiteHeader />
      <main className="w-full flex-1 pt-20" data-testid="main-content">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
