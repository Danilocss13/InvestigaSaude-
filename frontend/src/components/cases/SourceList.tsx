import { Icon } from "@/components/common/Icon";
import type { CaseSource } from "@/data/cases";

/** Lista de fontes identificáveis do caso, com status de revisão. */
export function SourceList({ sources }: { sources: CaseSource[] }) {
  return (
    <ul className="flex flex-col gap-3" data-testid="source-list">
      {sources.map((s, i) => (
        <li key={s.url} className="flex flex-col gap-1.5 rounded-xl bg-surface-container-low p-4" data-testid={`source-item-${i}`}>
          <span className="font-heading text-label-sm uppercase tracking-wider text-tertiary">{s.type}</span>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`source-link-${i}`}
            className="group inline-flex items-start gap-1 font-heading text-label-lg text-on-surface transition-colors hover:text-primary"
          >
            {s.title}
            <Icon name="open_in_new" size={16} className="mt-0.5 text-primary transition-transform duration-150 group-hover:translate-x-0.5" />
          </a>
          <span className="text-body-sm text-on-surface-variant">{s.publisher}</span>
          {s.citation && <span className="font-mono text-[12px] leading-5 text-on-surface-variant">{s.citation}</span>}
          {s.reviewStatus === "a-revisar" && (
            <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-amber-verdict-container px-2 py-0.5 font-heading text-label-sm text-amber-verdict">
              <Icon name="rate_review" size={14} /> Referência a revisar pela equipe
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
