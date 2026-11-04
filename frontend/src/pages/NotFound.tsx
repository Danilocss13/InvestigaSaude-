import { Link } from "react-router-dom";
import { Icon } from "@/components/common/Icon";
import { Container } from "@/components/common/Primitives";
import { ROUTES } from "@/data/navigation";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-20" data-testid="not-found-page">
      <div className="clue-grid pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative flex flex-col items-center gap-5 text-center">
        <div className="flex h-20 w-20 rotate-[-4deg] items-center justify-center rounded-2xl bg-surface-container-lowest text-primary shadow-lg">
          <Icon name="search_off" size={44} />
        </div>
        <span className="font-mono text-label-md uppercase tracking-widest text-tertiary">Erro 404 • Pista perdida</span>
        <h1 className="font-heading text-display-lg-mobile text-on-surface sm:text-display-lg">Esta página não está no arquivo.</h1>
        <p className="max-w-lg text-body-lg text-on-surface-variant">
          O endereço pode ter mudado ou o dossiê não existe. Volte à Central para continuar a investigação.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to={ROUTES.central} data-testid="not-found-central-link" className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary-container px-6 font-heading text-label-lg text-on-primary hover:bg-primary">
            <Icon name="folder_special" size={20} /> Ir para a Central
          </Link>
          <Link to={ROUTES.home} data-testid="not-found-home-link" className="inline-flex h-12 items-center gap-2 rounded-lg bg-surface-container px-6 font-heading text-label-lg text-primary hover:bg-surface-container-highest">
            <Icon name="home" size={20} /> Página inicial
          </Link>
        </div>
      </Container>
    </section>
  );
}
