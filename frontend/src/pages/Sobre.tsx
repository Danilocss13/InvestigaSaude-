import { Link } from "react-router-dom";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { Container, InDevelopment, SectionHeading } from "@/components/common/Primitives";
import {
  ABOUT_AUDIENCE,
  ABOUT_AUDIENCE_INTRO,
  ABOUT_AUDIENCE_NOTE,
  ABOUT_DISCLAIMER,
  ABOUT_EXPECTED_RESULTS,
  ABOUT_GENERAL_OBJECTIVE,
  ABOUT_INSTITUTION,
  ABOUT_PROBLEM,
  ABOUT_PROPOSAL,
  ABOUT_RISKS,
  ABOUT_SDGS,
  ABOUT_TEAM,
} from "@/data/about";
import { ROUTES } from "@/data/navigation";
import { cn } from "@/lib/utils";

const WORKING = [
  "Página inicial com o design aprovado",
  "Navegação entre todas as áreas (desktop e celular)",
  "Central de Investigações com filtros e busca",
  "Páginas de detalhe com pistas e veredito interativos",
  "Arquivo de Investigações",
  "Guia de Verificação com checklist interativo",
];

const PENDING = [
  "Revisão das referências pela equipe",
  "Novos casos e dossiês em elaboração",
  "Conteúdos da Central Educativa",
  "Ferramentas completas do Laboratório",
  "Salvamento de progresso, medalhas e níveis reais",
];

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

export default function Sobre() {
  return (
    <div data-testid="sobre-page">
      <PageHero
        testid="sobre-hero"
        tag={{ icon: "info", label: "Sobre o projeto" }}
        title="Investigar para cuidar melhor."
        description="O InvestigaSaúde é uma plataforma web educativa e interativa que ensina a verificar informações de saúde antes de acreditar, utilizar ou compartilhar um conteúdo."
        crumbs={[{ label: "Sobre" }]}
        aside={
          <div className="flex flex-col gap-2 rounded-2xl bg-surface-container-lowest p-5 shadow-md" data-testid="sobre-hero-project-card">
            <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Projeto de Extensão III</span>
            <span className="font-heading text-title-md text-on-surface">Engenharia de Computação — 4º período</span>
            <span className="flex items-center gap-1.5 text-body-sm text-on-surface-variant">
              <Icon name="account_balance" size={18} className="text-tertiary" /> Afya Montes Claros
            </span>
          </div>
        }
      />

      {/* PROBLEMA + PROPOSTA */}
      <section className="py-14" data-testid="sobre-problem-proposal">
        <Container className="grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-6" data-testid="sobre-problem">
            <SectionHeading tag={{ icon: "report", label: "O problema", className: "bg-error-container/70 text-on-error-container" }} title="Desinformação em saúde tem consequências" />
            {ABOUT_PROBLEM.map((p) => (
              <p key={p} className="text-body-md leading-relaxed text-on-surface-variant">{p}</p>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {ABOUT_RISKS.map((r) => (
                <span key={r} className="inline-flex items-center gap-1 rounded-full bg-error-container/60 px-3 py-1 font-heading text-label-md text-on-error-container">
                  <Icon name="warning" size={14} /> {r}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl bg-surface-container-lowest p-6 shadow-sm md:p-8 lg:col-span-6" data-testid="sobre-proposal">
            <SectionHeading tag={{ icon: "lightbulb", label: "A proposta", className: "bg-secondary-fixed/50 text-secondary" }} title="Ensinar a investigar antes de compartilhar" />
            {ABOUT_PROPOSAL.map((p) => (
              <p key={p} className="text-body-md leading-relaxed text-on-surface-variant">{p}</p>
            ))}
            <div className="flex items-start gap-3 rounded-xl bg-surface-container p-4" data-testid="sobre-disclaimer">
              <Icon name="health_and_safety" size={22} className="text-tertiary" />
              <p className="text-body-sm text-on-surface">{ABOUT_DISCLAIMER}</p>
            </div>
            <Link to={ROUTES.central} data-testid="sobre-central-link" className="inline-flex h-12 w-fit items-center gap-2 rounded-lg bg-primary-container px-6 font-heading text-label-lg text-on-primary transition-colors hover:bg-primary">
              <Icon name="folder_special" size={20} /> Ir para a Central de Investigações
            </Link>
          </div>
        </Container>
      </section>

      {/* OBJETIVO + RESULTADO ESPERADO */}
      <section className="bg-surface-container-low/70 py-14" data-testid="sobre-objectives">
        <Container className="grid gap-6 lg:grid-cols-12">
          <div className="relative flex flex-col gap-3 overflow-hidden rounded-3xl bg-primary-container p-8 text-on-primary shadow-xl lg:col-span-5" data-testid="sobre-general-objective">
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-on-primary-container/10 blur-2xl" />
            <span className="relative flex items-center gap-2 font-heading text-label-sm uppercase tracking-wider text-on-primary-container">
              <Icon name="target" size={18} /> Objetivo geral
            </span>
            <p className="relative text-body-lg leading-relaxed text-on-primary">{ABOUT_GENERAL_OBJECTIVE}</p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-7" data-testid="sobre-expected-results">
            <SectionHeading tag={{ icon: "trending_up", label: "Resultado esperado" }} title="Depois de usar a plataforma, o usuário será mais capaz de:" />
            <div className="grid gap-3 sm:grid-cols-2">
              {ABOUT_EXPECTED_RESULTS.map((r, i) => (
                <div key={r.text} className="flex items-start gap-3 rounded-2xl bg-surface-container-lowest p-4 shadow-sm" data-testid={`sobre-result-${i}`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-high text-primary">
                    <Icon name={r.icon} size={22} />
                  </div>
                  <span className="pt-2 text-body-sm font-medium text-on-surface">{r.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* PÚBLICO-ALVO */}
      <section className="py-14" data-testid="sobre-audience">
        <Container className="flex flex-col gap-6">
          <SectionHeading tag={{ icon: "groups", label: "Público-alvo" }} title="Para quem é o InvestigaSaúde" description={ABOUT_AUDIENCE_INTRO} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ABOUT_AUDIENCE.map((a, i) => (
              <div key={a.text} className="flex items-start gap-3 rounded-2xl bg-surface-container-lowest p-5 shadow-sm transition-shadow duration-200 hover:shadow-md" data-testid={`sobre-audience-${i}`}>
                <span className="font-mono text-[12px] font-semibold text-tertiary">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-2">
                  <Icon name={a.icon} size={24} className="text-primary" />
                  <span className="text-body-sm text-on-surface">{a.text}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="flex items-start gap-2 text-body-sm text-on-surface-variant">
            <Icon name="diversity_3" size={18} className="mt-px text-secondary" /> {ABOUT_AUDIENCE_NOTE}
          </p>
        </Container>
      </section>

      {/* ODS */}
      <section className="bg-surface-container/40 py-14" data-testid="sobre-sdgs">
        <Container className="flex flex-col gap-6">
          <SectionHeading
            tag={{ icon: "public", label: "Objetivos de Desenvolvimento Sustentável" }}
            title="Relação com os ODS da ONU"
            description="O projeto se conecta a três Objetivos de Desenvolvimento Sustentável da Agenda 2030."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {ABOUT_SDGS.map((s) => (
              <div key={s.number} className="relative flex flex-col gap-3 overflow-hidden rounded-2xl bg-surface-container-lowest p-6 shadow-sm" data-testid={`sobre-sdg-${s.number}`}>
                <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: s.color }} />
                <div className="flex items-center gap-3">
                  <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl text-white shadow-sm" style={{ backgroundColor: s.color }}>
                    <span className="font-heading text-[10px] font-bold uppercase leading-none tracking-wider">ODS</span>
                    <span className="font-heading text-headline-md leading-none">{s.number}</span>
                  </span>
                  <div className="flex flex-col">
                    <span className="font-heading text-title-md text-on-surface">{s.title}</span>
                    {s.main && <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Relação principal</span>}
                  </div>
                </div>
                <p className="text-body-sm leading-relaxed text-on-surface-variant">{s.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* EQUIPE E INSTITUIÇÃO */}
      <section className="py-14" data-testid="sobre-team-section">
        <Container className="grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-6 shadow-sm lg:col-span-5" data-testid="sobre-team">
            <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Instituição e disciplina</span>
            {ABOUT_INSTITUTION.map((f) => (
              <div
                key={f.id}
                data-testid={`sobre-team-field-${f.id}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5",
                  f.value ? "bg-surface-container-low" : "border border-dashed border-outline-variant",
                )}
              >
                <Icon name={f.icon} size={20} className="text-tertiary" />
                <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="shrink-0 font-heading text-label-md text-on-surface-variant">{f.label}</span>
                  {f.value ? (
                    <span className="text-body-sm font-medium text-on-surface sm:text-right">{f.value}</span>
                  ) : (
                    <span className="font-mono text-[12px] text-outline">[a preencher]</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 lg:col-span-7" data-testid="sobre-team-members">
            <SectionHeading tag={{ icon: "badge", label: "Equipe responsável" }} title="Quem desenvolve o InvestigaSaúde" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ABOUT_TEAM.map((name, i) => (
                <div key={name} className="flex items-center gap-3 rounded-2xl bg-surface-container-lowest p-4 shadow-sm" data-testid={`sobre-team-member-${i}`}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-container font-heading text-label-lg text-on-primary">
                    {initials(name)}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-heading text-label-lg text-on-surface">{name}</span>
                    <span className="text-[12px] text-on-surface-variant">Engenharia de Computação</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3 rounded-2xl bg-secondary-fixed/40 p-4" data-testid="sobre-team-professor">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-on-primary">
                  <Icon name="co_present" size={22} />
                </span>
                <div className="flex flex-col">
                  <span className="font-heading text-label-lg text-on-surface">Herbert Souza</span>
                  <span className="text-[12px] text-on-surface-variant">Professor · Projeto de Extensão III</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STATUS DA ETAPA */}
      <section className="bg-surface-container-low/70 py-14" data-testid="sobre-status">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-6 shadow-sm" data-testid="sobre-working">
            <span className="flex items-center gap-2 font-heading text-label-sm uppercase tracking-wider text-secondary">
              <Icon name="task_alt" size={18} /> Já funciona nesta etapa
            </span>
            <ul className="flex flex-col gap-2">
              {WORKING.map((w) => (
                <li key={w} className="flex items-start gap-2 text-body-sm text-on-surface"><Icon name="check" size={18} className="text-secondary" /> {w}</li>
              ))}
            </ul>
          </div>
          <InDevelopment testid="sobre-pending" title="Próximas etapas" description="Funcionalidades previstas, ainda não implementadas." items={PENDING} />
        </Container>
      </section>

      <section id="privacidade" className="scroll-mt-24 py-14" data-testid="privacidade-section">
        <Container>
          <div className="flex flex-col gap-3 rounded-3xl bg-surface-container-lowest p-8 shadow-sm md:p-10">
            <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Privacidade &amp; Ética Científica</span>
            <h2 className="font-heading text-headline-md text-on-surface">Nenhum dado pessoal é coletado</h2>
            <p className="text-body-md text-on-surface-variant">
              Esta versão não possui cadastro, login nem salvamento de progresso. As respostas dadas nos casos e no guia ficam apenas na
              tela e desaparecem ao sair da página. Links para sites externos (como órgãos oficiais) abrem em nova aba e seguem as
              políticas desses sites.
            </p>
            <p className="text-body-sm text-on-surface-variant">Texto provisório — a política definitiva será elaborada pela equipe do projeto.</p>
          </div>
        </Container>
      </section>
    </div>
  );
}
