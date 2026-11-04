import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { Container, DemoBadge, InDevelopment } from "@/components/common/Primitives";
import { ClueBoard } from "@/components/cases/ClueBoard";
import { DifficultyMeter, StatusBadge } from "@/components/cases/CaseMeta";
import { SourceList } from "@/components/cases/SourceList";
import { VerdictPanel } from "@/components/cases/VerdictPanel";
import { ViralMessageCard } from "@/components/cases/ViralMessageCard";
import { getCaseBySlug, getNextCase, type Dossier, type InvestigationCase } from "@/data/cases";
import { ROUTES } from "@/data/navigation";
import NotFound from "@/pages/NotFound";

function StepHeading({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary font-mono text-[13px] font-semibold text-on-primary">{n}</span>
      <div className="flex flex-col">
        <h2 className="font-heading text-headline-md text-on-surface">{title}</h2>
        {subtitle && <p className="text-body-sm text-on-surface-variant">{subtitle}</p>}
      </div>
    </div>
  );
}

function CaseInvestigation({ item, dossier }: { item: InvestigationCase; dossier: Dossier }) {
  const [examined, setExamined] = useState<Set<string>>(new Set());
  const examine = (id: string) => setExamined((prev) => new Set(prev).add(id));

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-5" data-testid="case-step-message">
        <StepHeading n="01" title="A mensagem suspeita" subtitle={dossier.briefing} />
        <ViralMessageCard message={dossier.message} note={dossier.scenarioNote} />
      </section>

      <section className="flex flex-col gap-5" data-testid="case-step-clues">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <StepHeading n="02" title="Examine as pistas" subtitle="Abra cada pista para ver a análise e as fontes envolvidas." />
          <span className="rounded-full bg-surface-container px-3 py-1 font-heading text-label-md text-primary" data-testid="clues-progress">
            {examined.size}/{dossier.clues.length} pistas examinadas
          </span>
        </div>
        <ClueBoard clues={dossier.clues} examined={examined} onExamine={examine} />
      </section>

      <section className="flex flex-col gap-5" data-testid="case-step-verdict">
        <StepHeading n="03" title="Registre seu veredito" subtitle="Como você classifica a afirmação principal da mensagem?" />
        <VerdictPanel key={item.slug} dossier={dossier} examinedCount={examined.size} onReset={() => setExamined(new Set())} />
      </section>
    </div>
  );
}

export default function CaseDetail() {
  const { slug } = useParams();
  const item = getCaseBySlug(slug);
  if (!item) return <NotFound />;

  const next = getNextCase(item.slug);
  const facts = [
    { label: "Dossiê", value: item.code, icon: "tag" },
    { label: "Tema", value: item.theme, icon: "category" },
    { label: "Tempo estimado", value: `~${item.minutes} minutos`, icon: "timer" },
  ];

  return (
    <div data-testid="case-detail-page">
      <PageHero
        testid="case-hero"
        tag={{ icon: "inventory_2", label: `Dossiê ${item.code} • ${item.theme}` }}
        title={item.title}
        description={item.synopsis}
        crumbs={[{ label: "Central de Investigações", to: ROUTES.central }, { label: `Caso ${item.code}` }]}
      >
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <StatusBadge status={item.status} testid="case-status-badge" />
          <DifficultyMeter level={item.difficulty} testid="case-difficulty" />
          <DemoBadge testid="case-demo-badge" />
        </div>
      </PageHero>

      <Container className="grid gap-10 py-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {item.dossier ? (
            <CaseInvestigation key={item.slug} item={item} dossier={item.dossier} />
          ) : (
            <InDevelopment
              testid="case-in-development"
              icon="edit_document"
              title="Dossiê em elaboração"
              description="Este caso ainda está sendo preparado pela equipe. A mensagem, as pistas e as fontes serão publicadas somente após a verificação das referências."
              items={["Mensagem suspeita de exemplo", "Três pistas com análise", "Veredito e explicação", "Fontes identificáveis revisadas"]}
            />
          )}
        </div>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:col-span-4 lg:self-start" data-testid="case-sidebar">
          <div className="flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-5 shadow-sm">
            <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Ficha do caso</span>
            {facts.map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <Icon name={f.icon} size={18} className="mt-0.5 text-tertiary" />
                <div className="flex flex-col">
                  <span className="text-[12px] text-on-surface-variant">{f.label}</span>
                  <span className="font-heading text-label-lg text-on-surface">{f.value}</span>
                </div>
              </div>
            ))}
          </div>

          {item.dossier && (
            <div className="flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-5 shadow-sm" data-testid="case-sources">
              <div className="flex items-center gap-2 text-primary">
                <Icon name="menu_book" size={20} />
                <span className="font-heading text-label-sm uppercase tracking-wider">Fontes de referência</span>
              </div>
              <SourceList sources={item.dossier.sources} />
            </div>
          )}

          <div className="flex flex-col gap-2 rounded-2xl bg-surface-container p-5" data-testid="case-ethics-notice">
            <div className="flex items-center gap-1.5 text-tertiary">
              <Icon name="info" size={18} />
              <span className="font-heading text-label-sm">Conteúdo demonstrativo e educativo</span>
            </div>
            <p className="text-body-sm text-on-surface">
              Os cenários são fictícios e servem para treinar a checagem de informações. Não substituem orientação de profissional de saúde.
            </p>
          </div>

          {next && next.slug !== item.slug && (
            <Link
              to={ROUTES.caseDetail(next.slug)}
              data-testid="case-next-link"
              className="group flex items-center justify-between gap-3 rounded-2xl bg-primary-container p-5 text-on-primary shadow-md transition-colors hover:bg-primary"
            >
              <div className="flex flex-col">
                <span className="font-heading text-label-sm uppercase tracking-wider text-on-primary-container">Próximo caso {next.code}</span>
                <span className="font-heading text-title-md">{next.title}</span>
              </div>
              <Icon name="arrow_forward" size={22} className="transition-transform group-hover:translate-x-1" />
            </Link>
          )}
          <Link
            to={ROUTES.central}
            data-testid="case-back-link"
            className="inline-flex items-center gap-1 font-heading text-label-md text-primary hover:text-primary-container"
          >
            <Icon name="arrow_back" size={16} /> Voltar à Central de Investigações
          </Link>
        </aside>
      </Container>
    </div>
  );
}
