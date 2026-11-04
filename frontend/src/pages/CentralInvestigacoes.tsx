import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { Container, DemoBadge, SectionHeading } from "@/components/common/Primitives";
import { CaseCard } from "@/components/cases/CaseCard";
import { DifficultyMeter, StatusBadge, VerdictBadge } from "@/components/cases/CaseMeta";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  CASES,
  DIFFICULTY_LABEL,
  STATUS_META,
  THEMES,
  countByStatus,
  type CaseStatus,
  type Difficulty,
} from "@/data/cases";
import { ROUTES } from "@/data/navigation";
import { VERDICTS } from "@/data/verdicts";
import { cn } from "@/lib/utils";

type StatusFilter = "todos" | CaseStatus;
type LevelFilter = "todos" | `${Difficulty}`;

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "todos", label: "Todos" },
  ...(Object.keys(STATUS_META) as CaseStatus[]).map((s) => ({ value: s, label: STATUS_META[s].label })),
];
const LEVEL_OPTIONS: { value: LevelFilter; label: string }[] = [
  { value: "todos", label: "Todos os níveis" },
  { value: "1", label: DIFFICULTY_LABEL[1] },
  { value: "2", label: DIFFICULTY_LABEL[2] },
  { value: "3", label: DIFFICULTY_LABEL[3] },
];
const ALL_THEMES = "todos";

function FilterPill({ active, onClick, children, testid }: { active: boolean; onClick: () => void; children: ReactNode; testid: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      data-testid={testid}
      className={cn(
        "rounded-full px-3.5 py-1.5 font-heading text-label-md transition-[background-color,color] duration-150",
        active ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container",
      )}
    >
      {children}
    </button>
  );
}

export default function CentralInvestigacoes() {
  const [status, setStatus] = useState<StatusFilter>("todos");
  const [level, setLevel] = useState<LevelFilter>("todos");
  const [theme, setTheme] = useState<string>(ALL_THEMES);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CASES.filter(
      (c) =>
        (status === "todos" || c.status === status) &&
        (level === "todos" || String(c.difficulty) === level) &&
        (theme === ALL_THEMES || c.theme === theme) &&
        (!q || `${c.title} ${c.synopsis} ${c.theme} ${c.code}`.toLowerCase().includes(q)),
    );
  }, [status, level, theme, query]);

  const hasFilters = status !== "todos" || level !== "todos" || theme !== ALL_THEMES || query !== "";
  const clear = () => {
    setStatus("todos");
    setLevel("todos");
    setTheme(ALL_THEMES);
    setQuery("");
  };

  const stats = [
    { label: "Casos disponíveis", value: countByStatus("disponivel"), icon: "lock_open" },
    { label: "Em investigação (demo)", value: countByStatus("em-investigacao"), icon: "autorenew" },
    { label: "Dossiês em elaboração", value: countByStatus("em-elaboracao"), icon: "edit_note" },
  ];

  return (
    <div data-testid="central-page">
      <PageHero
        testid="central-hero"
        tag={{ icon: "folder_special", label: "Central de Investigações" }}
        title={<>Escolha um caso e <span className="text-primary-container underline decoration-secondary-fixed-dim decoration-4 underline-offset-8">investigue</span>.</>}
        description="Cada dossiê traz uma mensagem suspeita, pistas para examinar e um veredito a registrar. Todos os casos desta versão são demonstrativos."
        crumbs={[{ label: "Central de Investigações" }]}
        aside={
          <div className="grid grid-cols-3 gap-3 rounded-2xl bg-surface-container-lowest p-4 shadow-md" data-testid="central-stats">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 rounded-xl bg-surface-container-low p-3">
                <Icon name={s.icon} size={20} className="text-primary" />
                <span className="font-heading text-headline-md text-on-surface">{s.value}</span>
                <span className="text-[12px] leading-4 text-on-surface-variant">{s.label}</span>
              </div>
            ))}
          </div>
        }
      >
        <DemoBadge className="mt-1" testid="central-demo-badge" />
      </PageHero>

      {/* FILTROS + GRADE */}
      <section className="bg-surface-container-low/70 py-12" data-testid="central-cases-section">
        <Container className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-2xl bg-surface-container/60 p-4 sm:p-5" data-testid="case-filters">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-sm">
                <Icon name="search" size={20} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por título, tema ou código"
                  aria-label="Buscar casos"
                  data-testid="case-search-input"
                  className="h-11 bg-surface-container-lowest pl-10"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Select value={level} onValueChange={(v: string) => setLevel(v as LevelFilter)}>
                  <SelectTrigger className="h-11 min-w-44 bg-surface-container-lowest" data-testid="case-level-select">
                    <SelectValue>{(v) => LEVEL_OPTIONS.find((o) => o.value === v)?.label ?? "Nível"}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {LEVEL_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value} data-testid={`case-level-option-${o.value}`}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={theme} onValueChange={(v: string) => setTheme(v)}>
                  <SelectTrigger className="h-11 min-w-56 bg-surface-container-lowest" data-testid="case-theme-select">
                    <SelectValue>{(v) => (v === ALL_THEMES ? "Todos os temas" : (v as string))}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_THEMES} data-testid="case-theme-option-todos">Todos os temas</SelectItem>
                    {THEMES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-heading text-label-sm uppercase tracking-wider text-on-surface-variant">Situação:</span>
              {STATUS_OPTIONS.map((o) => (
                <FilterPill key={o.value} active={status === o.value} onClick={() => setStatus(o.value)} testid={`case-status-filter-${o.value}`}>
                  {o.label}
                </FilterPill>
              ))}
              {hasFilters && (
                <button
                  type="button"
                  onClick={clear}
                  data-testid="case-filters-clear"
                  className="ml-auto inline-flex items-center gap-1 font-heading text-label-md text-primary hover:text-primary-container"
                >
                  <Icon name="filter_alt_off" size={16} /> Limpar filtros
                </button>
              )}
            </div>
          </div>

          <p className="font-heading text-label-md text-on-surface-variant" data-testid="case-results-count">
            {filtered.length} {filtered.length === 1 ? "caso encontrado" : "casos encontrados"}
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="case-grid">
              {filtered.map((c) => (
                <CaseCard key={c.slug} item={c} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface-container-lowest p-10 text-center" data-testid="case-empty-state">
              <Icon name="search_off" size={40} className="text-outline" />
              <span className="font-heading text-headline-sm text-on-surface">Nenhuma pista por aqui</span>
              <p className="max-w-md text-body-sm text-on-surface-variant">Nenhum caso corresponde aos filtros escolhidos. Tente outra combinação.</p>
              <button
                type="button"
                onClick={clear}
                className="rounded-lg bg-primary-container px-4 py-2 font-heading text-label-md text-on-primary hover:bg-primary"
                data-testid="case-empty-clear"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ARQUIVO DE INVESTIGAÇÕES */}
      <section id="arquivo" className="scroll-mt-24 py-16" data-testid="archive-section">
        <Container className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading
              className="max-w-[720px]"
              tag={{ icon: "inventory_2", label: "Arquivo de Investigações" }}
              title="Arquivo de Investigações"
              description="Índice de todos os dossiês da plataforma. O registro de casos concluídos por você depende do salvamento de progresso, previsto para uma etapa futura."
            />
            <DemoBadge label="Situações demonstrativas" />
          </div>
          <div className="overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm">
            <Table data-testid="archive-table">
              <TableHeader>
                <TableRow className="bg-surface-container-low hover:bg-surface-container-low">
                  <TableHead className="font-heading text-label-sm uppercase tracking-wider">Dossiê</TableHead>
                  <TableHead className="font-heading text-label-sm uppercase tracking-wider">Caso</TableHead>
                  <TableHead className="font-heading text-label-sm uppercase tracking-wider">Tema</TableHead>
                  <TableHead className="font-heading text-label-sm uppercase tracking-wider">Nível</TableHead>
                  <TableHead className="font-heading text-label-sm uppercase tracking-wider">Situação</TableHead>
                  <TableHead className="text-right font-heading text-label-sm uppercase tracking-wider">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CASES.map((c) => (
                  <TableRow key={c.slug} data-testid={`archive-row-${c.slug}`}>
                    <TableCell className="font-mono text-body-sm text-on-surface-variant">{c.code}</TableCell>
                    <TableCell className="min-w-56 font-heading text-label-lg text-on-surface">{c.title}</TableCell>
                    <TableCell className="min-w-44 text-body-sm text-tertiary">{c.theme}</TableCell>
                    <TableCell><DifficultyMeter level={c.difficulty} /></TableCell>
                    <TableCell><StatusBadge status={c.status} /></TableCell>
                    <TableCell className="text-right">
                      <Link
                        to={ROUTES.caseDetail(c.slug)}
                        data-testid={`archive-open-${c.slug}`}
                        className="inline-flex items-center gap-1 font-heading text-label-md text-primary hover:text-primary-container"
                      >
                        Abrir dossiê <Icon name="arrow_forward" size={16} />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid gap-4 rounded-2xl bg-surface-container-low p-5 md:grid-cols-[220px_1fr] md:p-6" data-testid="verdict-legend">
            <div className="flex flex-col gap-1">
              <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Como classificamos</span>
              <p className="text-body-sm text-on-surface-variant">Os quatro vereditos possíveis em cada investigação.</p>
              <Link to={ROUTES.metodologia} className="mt-1 inline-flex items-center gap-1 font-heading text-label-md text-primary hover:text-primary-container" data-testid="legend-methodology-link">
                Ver critérios <Icon name="arrow_forward" size={16} />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {VERDICTS.map((v) => (
                <div key={v.id} className="flex flex-col gap-1.5">
                  <VerdictBadge verdict={v.id} />
                  <p className="text-body-sm text-on-surface-variant">{v.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
