import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container, SectionTag } from "@/components/common/Primitives";
import { Icon } from "@/components/common/Icon";
import { ROUTES } from "@/data/navigation";

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  tag: { icon: string; label: string };
  title: ReactNode;
  description: ReactNode;
  crumbs?: Crumb[];
  aside?: ReactNode;
  children?: ReactNode;
  testid: string;
}

/** Cabeçalho padrão das páginas internas, com brilho ambiente e grade de pistas. */
export function PageHero({ tag, title, description, crumbs = [], aside, children, testid }: PageHeroProps) {
  return (
    <section data-testid={testid} className="relative overflow-hidden border-b border-surface-container-highest/70">
      <div className="clue-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-secondary-fixed/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-tertiary-fixed/30 blur-3xl" />
      <Container className="relative z-10 py-10 md:py-14">
        <nav aria-label="Trilha de navegação" className="mb-5" data-testid="breadcrumbs">
          <ol className="flex flex-wrap items-center gap-1 text-body-sm text-on-surface-variant">
            <li>
              <Link to={ROUTES.home} className="transition-colors hover:text-primary" data-testid="breadcrumb-home">
                Início
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1">
                <Icon name="chevron_right" size={16} className="text-outline" />
                {c.to ? (
                  <Link to={c.to} className="transition-colors hover:text-primary">
                    {c.label}
                  </Link>
                ) : (
                  <span className="font-medium text-on-surface">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="flex animate-fade-up flex-col gap-3 lg:col-span-7">
            <SectionTag icon={tag.icon} label={tag.label} className="bg-surface-container-high" />
            <h1
              data-testid={`${testid}-title`}
              className="font-heading text-display-lg-mobile tracking-tight text-on-surface md:text-display-lg"
            >
              {title}
            </h1>
            <p className="max-w-[640px] text-body-lg text-on-surface-variant">{description}</p>
            {children}
          </div>
          {aside && <div className="animate-fade-up [animation-delay:120ms] lg:col-span-5">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
