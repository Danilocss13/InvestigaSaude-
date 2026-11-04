import { Link } from "react-router-dom";
import { Icon } from "@/components/common/Icon";
import { Container, DemoBadge, SectionHeading, SectionTag } from "@/components/common/Primitives";
import { CaseCard } from "@/components/cases/CaseCard";
import { CASES, FEATURED_CASES, HERO_CASE } from "@/data/cases";
import { DEMO_PASSPORT, INSTITUTIONS, SKILLS, TOOLS } from "@/data/content";
import { ROUTES } from "@/data/navigation";
import { cn } from "@/lib/utils";

const UBS_URL = "https://cnes.datasus.gov.br/";

function HeroDossier() {
  const clues = HERO_CASE.dossier?.clues ?? [];
  return (
    <div className="relative" data-testid="hero-dossier-card">
      <div className="absolute -right-2 -top-3 z-20 rotate-2 rounded bg-secondary-container px-3 py-1 font-heading text-label-sm text-on-secondary-container shadow-sm">
        PROVA DIDÁTICA
      </div>
      <div className="relative flex flex-col gap-5 overflow-hidden rounded-2xl bg-surface-container-lowest p-6 shadow-xl md:p-8">
        <div className="-mx-6 -mt-6 mb-1 flex items-center justify-between gap-2 bg-surface-container-low px-6 pb-3 pt-5 md:-mx-8 md:-mt-8 md:px-8">
          <div className="flex items-center gap-2">
            <Icon name="inventory_2" size={20} className="text-primary" />
            <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Caso disponível • Mistério ativo</span>
          </div>
          <span className="rounded bg-surface px-2.5 py-1 font-mono text-label-sm text-on-surface-variant">DOSSIÊ {HERO_CASE.code}</span>
        </div>
        <div>
          <span className="font-heading text-label-sm uppercase tracking-wider text-tertiary">Investigação Preliminar</span>
          <h3 className="mt-0.5 font-heading text-headline-sm text-on-surface">{HERO_CASE.title}</h3>
          <p className="mt-1 text-body-sm text-on-surface-variant">{HERO_CASE.synopsis}</p>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="font-heading text-label-sm uppercase tracking-wider text-on-surface-variant">Evidências &amp; Anomalias:</span>
          {clues.map((clue) => (
            <div key={clue.id} className="flex items-start gap-3 rounded-xl bg-surface-container-low p-3 transition-colors duration-150 hover:bg-surface-container">
              <div
                className={cn(
                  "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                  clue.alert ? "bg-error-container text-on-error-container" : "bg-surface-container-highest text-on-surface",
                )}
              >
                <Icon name={clue.icon} size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-label-sm text-on-surface">{clue.title}</span>
                <span className="text-body-sm text-on-surface-variant">{clue.summary}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
          <div className="flex w-full items-center gap-2 rounded-lg bg-secondary-fixed/50 px-3 py-1.5 sm:w-auto">
            <Icon name="workspace_premium" size={20} filled className="text-secondary" />
            <div className="flex flex-col">
              <span className="font-heading text-label-sm leading-tight text-on-surface">Detetive Nível 1</span>
              <span className="font-heading text-label-sm font-medium leading-none text-on-surface-variant">Em preparação · demo</span>
            </div>
          </div>
          <Link
            to={ROUTES.caseDetail(HERO_CASE.slug)}
            data-testid="hero-open-dossier-button"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 font-heading text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary-container sm:w-auto"
          >
            <span>Abrir Ficha</span>
            <Icon name="arrow_forward" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex w-full flex-col overflow-x-clip" data-testid="home-page">
      {/* HERO */}
      <section className="relative mx-auto w-full max-w-[1280px] px-5 py-12 sm:px-6 md:py-20">
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-secondary-fixed/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-1/2 h-[32rem] w-[32rem] rounded-full bg-tertiary-fixed/30 blur-3xl" />
        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="flex animate-fade-up flex-col gap-4 lg:col-span-7">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-surface-container-high px-3 py-1.5 shadow-sm">
              <Icon name="verified" size={18} filled className="text-primary" />
              <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Investigação em Saúde • Letramento Científico</span>
            </div>
            <h1 data-testid="hero-title" className="font-heading text-display-lg-mobile leading-tight tracking-tight text-on-surface sm:text-display-lg">
              Informação suspeita? <br className="hidden sm:inline" />
              Vamos{" "}
              <span className="relative inline-block text-primary-container underline decoration-secondary-fixed-dim decoration-4 underline-offset-8">
                investigar
              </span>
              .
            </h1>
            <p className="max-w-[620px] text-body-lg leading-relaxed text-on-surface-variant">
              Entre na Central de Investigações, analise pistas e descubra como diferenciar informações confiáveis de mitos sobre saúde.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to={ROUTES.central}
                data-testid="hero-primary-cta"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-primary-container px-6 font-heading text-label-lg text-on-primary shadow-md transition-[background-color,box-shadow] duration-200 hover:bg-primary hover:shadow-lg focus-visible:ring-2 focus-visible:ring-secondary-fixed"
              >
                <Icon name="folder_special" size={22} />
                <span>Investigar meu primeiro caso</span>
              </Link>
              <Link
                to="/#ferramentas"
                data-testid="hero-secondary-cta"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-surface-container px-6 font-heading text-label-lg text-primary transition-colors hover:bg-surface-container-highest"
              >
                <Icon name="explore" size={20} />
                <span>Conhecer as ferramentas</span>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-on-surface-variant">
              <div className="flex items-center gap-1.5 font-heading text-label-sm">
                <Icon name="verified_user" size={16} className="text-secondary" />
                <span>Fontes identificáveis em cada caso</span>
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-1.5 font-heading text-label-sm">
                <Icon name="no_accounts" size={16} className="text-tertiary" />
                <span>Sem necessidade de cadastro</span>
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-1.5 font-heading text-label-sm">
                <Icon name="lock_open_right" size={16} className="text-primary" />
                <span>Livre e Aberto</span>
              </div>
            </div>
          </div>
          <div className="animate-fade-up [animation-delay:120ms] lg:col-span-5">
            <HeroDossier />
          </div>
        </div>
      </section>

      {/* CENTRAL DE INVESTIGAÇÕES */}
      <section className="w-full bg-surface-container-low/70 py-16" data-testid="home-cases-section">
        <Container className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading
              className="max-w-[760px]"
              tag={{ icon: "manage_search", label: "Casos Abertos", className: "bg-secondary-fixed/50 text-secondary" }}
              title="Central de Investigações: Escolha seu Próximo Caso"
              description="Cada boato ou dúvida é um mistério aguardando análise. Examine as evidências e chegue ao seu veredito."
            />
            <Link
              to={ROUTES.archive}
              data-testid="home-archive-link"
              className="group inline-flex shrink-0 items-center gap-1 font-heading text-label-lg text-primary hover:text-primary-container"
            >
              <span>Ver Arquivo Completo de Investigações ({CASES.length} casos)</span>
              <Icon name="arrow_forward" size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_CASES.map((c) => (
              <CaseCard key={c.slug} item={c} />
            ))}
          </div>
        </Container>
      </section>

      {/* JORNADA DO DETETIVE */}
      <section id="jornada" className="mx-auto w-full max-w-[1280px] scroll-mt-24 px-5 py-16 sm:px-6" data-testid="home-journey-section">
        <div className="flex flex-col gap-6">
          <SectionHeading
            tag={{ icon: "psychology", label: "Desenvolvimento Crítico" }}
            title="Sua Jornada de Detetive da Informação"
            description="Desenvolva competências práticas de pensamento crítico para proteger você e sua família de armadilhas virtuais."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-8">
              {SKILLS.map((s) => (
                <div key={s.badge} className="flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-high", s.iconTone)}>
                    <Icon name={s.icon} size={28} />
                  </div>
                  <div>
                    <span className="font-heading text-label-sm uppercase tracking-wider text-secondary">{s.badge}</span>
                    <h3 className="mt-1 font-heading text-headline-sm text-on-surface">{s.title}</h3>
                  </div>
                  <p className="text-body-sm leading-relaxed text-on-surface-variant">{s.description}</p>
                </div>
              ))}
            </div>
            <div
              className="relative flex flex-col justify-between rounded-2xl bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-lowest p-6 shadow-sm md:p-8 lg:col-span-4"
              data-testid="demo-passport-card"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Passaporte do Investigador</span>
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-secondary-container" />
                </div>
                <DemoBadge label="Exemplo demonstrativo" testid="demo-passport-badge" />
                <div className="flex items-center gap-4 rounded-xl bg-surface-container-lowest/80 p-4 shadow-xs">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary-fixed text-on-secondary-fixed">
                    <Icon name="military_tech" size={32} filled />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-label-sm font-medium text-on-surface-variant">Distintivo Atual:</span>
                    <span className="font-heading text-title-md font-bold text-on-surface">{DEMO_PASSPORT.badge}</span>
                    <span className="font-heading text-label-sm text-secondary">{DEMO_PASSPORT.level}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex items-center justify-between gap-2 font-heading text-label-sm">
                    <span className="font-medium text-on-surface">
                      Próxima Conquista: <strong>{DEMO_PASSPORT.nextBadge}</strong>
                    </span>
                    <span className="text-primary">{DEMO_PASSPORT.progress}%</span>
                  </div>
                  <div
                    className="h-3.5 w-full overflow-hidden rounded-full bg-surface-container-highest"
                    role="progressbar"
                    aria-valuenow={DEMO_PASSPORT.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Progresso demonstrativo"
                  >
                    <div className="h-full rounded-full bg-primary-container" style={{ width: `${DEMO_PASSPORT.progress}%` }} />
                  </div>
                  <span className="text-body-sm text-on-surface-variant">
                    Faltam apenas <strong>{DEMO_PASSPORT.remainingClues} pistas</strong> para desbloquear a insígnia.
                  </span>
                </div>
              </div>
              <div className="-mx-6 -mb-6 mt-6 flex items-start gap-3 rounded-b-2xl bg-surface-container-highest/30 p-6 md:-mx-8 md:-mb-8 md:px-8">
                <Icon name="spa" size={20} className="text-secondary" />
                <p className="text-body-sm leading-relaxed text-on-surface-variant">
                  A progressão no InvestigaSaúde é pedagógica e aberta, sem cobrança de prazos ou testes estressantes. Nesta versão, nada é salvo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KIT DE FERRAMENTAS */}
      <section id="ferramentas" className="w-full scroll-mt-20 bg-surface-container/40 py-16" data-testid="home-tools-section">
        <Container className="flex flex-col gap-6">
          <SectionHeading
            align="center"
            className="max-w-[780px]"
            tag={{ icon: "handyman", label: "Instrumentos Práticos", className: "bg-surface-container-lowest text-tertiary shadow-xs" }}
            title="Kit de Ferramentas do Investigador"
            description="Instrumentos práticos para apoiar sua análise antes de tomar decisões ou compartilhar informações de saúde."
          />
          <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((tool) => (
              <Link
                key={tool.id}
                to={tool.to}
                data-testid={`tool-card-${tool.id}`}
                className="group flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-6 shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-high text-primary transition-colors group-hover:bg-primary-container group-hover:text-on-primary">
                    <Icon name={tool.icon} size={26} />
                  </div>
                  <h3 className="font-heading text-title-md font-bold text-on-surface transition-colors group-hover:text-primary">{tool.title}</h3>
                  <p className="text-body-sm leading-relaxed text-on-surface-variant">{tool.description}</p>
                </div>
                <div className="flex items-center gap-1 pt-4 font-heading text-label-md text-primary">
                  <span>{tool.cta}</span>
                  <Icon name="arrow_forward" size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* METODOLOGIA */}
      <section className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-6" data-testid="home-methodology-section">
        <div className="flex flex-col gap-6 rounded-3xl bg-surface-container-lowest p-8 shadow-sm md:p-12">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div className="flex max-w-[700px] flex-col gap-2">
              <SectionTag icon="menu_book" label="Transparência Acadêmica" />
              <h2 className="font-heading text-headline-lg-mobile tracking-tight text-on-surface sm:text-headline-lg">
                Metodologia e Rigor das Investigações
              </h2>
              <p className="text-body-md leading-relaxed text-on-surface-variant">
                No InvestigaSaúde, cada conclusão deve apontar para fontes identificáveis. Os casos pedagógicos são construídos a partir de
                diretrizes clínicas, literatura científica e orientações de instituições de referência — e as referências desta versão
                demonstrativa ainda passam por revisão da equipe.
              </p>
            </div>
            <Link
              to={ROUTES.metodologia}
              data-testid="home-methodology-link"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-surface-container px-5 py-2.5 font-heading text-label-md text-primary transition-colors hover:bg-surface-container-high"
            >
              <span>Conhecer os Critérios Metodológicos Completos</span>
              <Icon name="arrow_forward" size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-4">
            {INSTITUTIONS.map((inst) => (
              <a
                key={inst.id}
                href={inst.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`home-institution-${inst.id}`}
                className="group flex flex-col gap-2 rounded-xl bg-surface-container-low p-5 transition-colors hover:bg-surface-container"
              >
                <div className="flex items-center gap-2 text-primary">
                  <Icon name={inst.icon} size={22} />
                  <span className="font-heading text-label-lg font-bold">{inst.name}</span>
                  <Icon name="open_in_new" size={14} className="ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <span className="font-heading text-label-sm uppercase text-tertiary">{inst.tag}</span>
                <p className="text-body-sm text-on-surface-variant">{inst.description}</p>
              </a>
            ))}
          </div>
          <p className="text-body-sm text-on-surface-variant">
            Instituições listadas como referências de consulta. O InvestigaSaúde não possui vínculo, parceria ou endosso dessas instituições.
          </p>
        </div>
      </section>

      {/* ACOLHIMENTO */}
      <section className="mx-auto w-full max-w-[1280px] px-5 pb-16 pt-12 sm:px-6" data-testid="home-care-section">
        <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-primary-container p-8 text-on-primary shadow-xl md:p-12 lg:flex-row">
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-on-primary-container/10 blur-2xl" />
          <div className="relative z-10 flex max-w-[760px] items-start gap-5">
            <div className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-on-primary text-primary-container shadow-sm">
              <Icon name="volunteer_activism" size={32} filled />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-heading text-label-sm uppercase tracking-wider text-on-primary-container">Cuidado Centrado na Vida</span>
              <h2 className="font-heading text-headline-lg-mobile tracking-tight text-on-primary sm:text-headline-lg">
                Informação confiável também é cuidado.
              </h2>
              <p className="text-body-md leading-relaxed text-on-primary/90">
                A internet ajuda a investigar e esclarecer dúvidas, mas nunca substitui o olhar clínico, o exame presencial e a escuta de um
                profissional de saúde qualificado. Diante de sintomas ou dúvidas sobre tratamentos, procure sempre a sua Unidade Básica de
                Saúde (UBS).
              </p>
            </div>
          </div>
          <div className="relative z-10 w-full shrink-0 lg:w-auto">
            <a
              href={UBS_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="home-ubs-link"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-on-primary px-6 py-3.5 font-heading text-label-lg text-primary shadow-md transition-colors hover:bg-surface-container lg:w-auto"
            >
              <Icon name="location_on" size={22} />
              <span>Consultar unidades de saúde (CNES/SUS)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
