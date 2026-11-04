import { Link } from "react-router-dom";
import { Icon } from "@/components/common/Icon";
import { ROUTES } from "@/data/navigation";
import { INSTITUTIONS } from "@/data/content";

const sectionLinks = [
  { id: "central", label: "Central de Investigações", to: ROUTES.central },
  { id: "arquivo", label: "Arquivo de Investigações", to: ROUTES.archive },
  { id: "educativa", label: "Central Educativa", to: ROUTES.educativa },
  { id: "guia", label: "Guia de Verificação", to: ROUTES.guia },
  { id: "laboratorio", label: "Laboratório Interativo", to: ROUTES.laboratorio },
  { id: "metodologia", label: "Metodologia e Fontes", to: ROUTES.metodologia },
  { id: "sobre", label: "Sobre o projeto", to: ROUTES.sobre },
];

export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="w-full bg-surface-container-low pb-6 pt-10 text-on-surface-variant shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-container text-on-primary">
                <Icon name="health_and_safety" size={18} />
              </div>
              <span className="font-heading text-title-md font-bold text-primary">InvestigaSaúde</span>
            </div>
            <p className="text-body-sm leading-relaxed">
              Projeto educativo voltado ao letramento em saúde, ao estímulo do pensamento crítico e ao combate à
              desinformação por meio de investigação gamificada.
            </p>
            <div className="mt-1 flex items-center gap-2 text-secondary">
              <Icon name="verified" size={20} />
              <span className="font-heading text-label-sm">Iniciativa educativa aberta</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-heading text-label-lg text-on-surface">Seções da Plataforma</span>
            <div className="flex flex-col gap-2 text-body-sm">
              {sectionLinks.map((l) => (
                <Link key={l.id} to={l.to} className="w-fit transition-colors hover:text-primary" data-testid={`footer-link-${l.id}`}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-heading text-label-lg text-on-surface">Fontes Oficiais de Consulta</span>
            <div className="flex flex-col gap-2 text-body-sm">
              {INSTITUTIONS.map((inst) => (
                <a
                  key={inst.id}
                  href={inst.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-1.5 transition-colors hover:text-primary"
                  data-testid={`footer-source-${inst.id}`}
                >
                  <Icon name="open_in_new" size={16} />
                  {inst.fullName}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-heading text-label-lg text-on-surface">Aviso Ético</span>
            <div className="flex flex-col gap-1.5 rounded-lg bg-surface-container p-3" data-testid="footer-ethics-notice">
              <div className="flex items-center gap-1.5 text-tertiary">
                <Icon name="info" size={18} />
                <span className="font-heading text-label-sm">Caráter Educacional</span>
              </div>
              <p className="text-body-sm leading-normal text-on-surface">
                Esta plataforma possui finalidade exclusivamente didática e de combate à desinformação. O conteúdo não
                substitui, em hipótese alguma, diagnóstico, orientação ou avaliação de profissional de saúde.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-5 flex flex-col items-center justify-between gap-2 rounded-xl bg-surface-container-highest/40 px-5 py-4 text-center sm:-mx-6 sm:flex-row sm:px-6 sm:text-left">
          <p className="text-body-sm">
            © {new Date().getFullYear()} InvestigaSaúde. Versão inicial com conteúdo demonstrativo, para fins educacionais.
          </p>
          <div className="flex items-center gap-4 font-heading text-label-sm">
            <Link to={ROUTES.termos} className="transition-colors hover:text-primary" data-testid="footer-link-termos">
              Termos de Uso Educacional
            </Link>
            <Link to={ROUTES.privacidade} className="transition-colors hover:text-primary" data-testid="footer-link-privacidade">
              Privacidade &amp; Ética Científica
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
