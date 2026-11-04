import { Link } from "react-router-dom";
import { Icon } from "@/components/common/Icon";
import { DifficultyMeter, StatusBadge } from "@/components/cases/CaseMeta";
import { STATUS_META, type InvestigationCase } from "@/data/cases";
import { ROUTES } from "@/data/navigation";
import { cn } from "@/lib/utils";

/** Cartão de caso — fiel ao cartão "dossiê" do design aprovado. */
export function CaseCard({ item, className }: { item: InvestigationCase; className?: string }) {
  const meta = STATUS_META[item.status];
  const href = ROUTES.caseDetail(item.slug);
  const t = `case-card-${item.slug}`;

  return (
    <article
      data-testid={t}
      className={cn(
        "group flex min-w-0 flex-col justify-between rounded-2xl bg-surface-container-lowest p-6 shadow-md transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-8px_rgba(0,90,86,0.18)]",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <StatusBadge status={item.status} testid={`${t}-status`} />
          <DifficultyMeter level={item.difficulty} testid={`${t}-difficulty`} />
        </div>

        <Link to={href} tabIndex={-1} className="relative block h-36 overflow-hidden rounded-xl bg-surface-container" aria-hidden="true">
          {item.image ? (
            <img
              src={item.image}
              alt={item.imageAlt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="clue-grid flex h-full w-full items-center justify-center text-primary/40">
              <Icon name={item.status === "em-elaboracao" ? "edit_document" : "folder_open"} size={48} />
            </div>
          )}
          <span className="absolute bottom-2 left-2 rounded bg-surface/90 px-2.5 py-0.5 font-heading text-label-sm font-medium text-tertiary backdrop-blur-sm">
            {item.theme}
          </span>
          <span className="absolute right-2 top-2 rounded bg-surface/90 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant backdrop-blur-sm">
            {item.code} · Demo
          </span>
        </Link>

        <div>
          <h3 className="font-heading text-headline-sm font-bold text-on-surface transition-colors group-hover:text-primary">
            <Link to={href} data-testid={`${t}-title-link`}>{item.title}</Link>
          </h3>
          <p className="mt-2 text-body-sm leading-relaxed text-on-surface-variant">{item.synopsis}</p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl bg-surface-container-low p-3.5">
          <span className="font-heading text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">
            Pistas Catalogadas:
          </span>
          {item.catalogedClues.map((clue, i) => (
            <div key={`${clue.label}-${i}`} className="flex items-center gap-2 text-body-sm text-on-surface">
              <Icon name={clue.icon} size={16} className="text-primary" />
              <span className="truncate">{clue.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between pt-5">
        <span className="flex items-center gap-1 font-heading text-label-sm text-on-surface-variant">
          <Icon name="timer" size={16} /> ~{item.minutes} minutos
        </span>
        <Link
          to={href}
          data-testid={`${t}-cta`}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-heading text-label-md shadow-sm transition-colors",
            meta.ctaTone,
          )}
        >
          <span>{meta.cta}</span>
          <Icon name="arrow_forward" size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
