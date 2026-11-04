import { Icon } from "@/components/common/Icon";
import { DIFFICULTY_LABEL, STATUS_META, type CaseStatus, type Difficulty } from "@/data/cases";
import { getVerdict, type VerdictId } from "@/data/verdicts";
import { cn } from "@/lib/utils";

/** Nível do caso em lupas (1 a 3). */
export function DifficultyMeter({ level, showLabel = true, testid }: { level: Difficulty; showLabel?: boolean; testid?: string }) {
  const label = DIFFICULTY_LABEL[level];
  return (
    <div className="flex items-center gap-0.5 text-primary" title={`Nível ${label}: ${level} lupa(s)`} data-testid={testid}>
      {[1, 2, 3].map((i) => (
        <Icon key={i} name="search" size={18} filled={i <= level} className={i <= level ? "" : "text-surface-container-highest"} />
      ))}
      {showLabel && <span className="ml-1 font-heading text-label-sm font-medium text-on-surface-variant">{label}</span>}
    </div>
  );
}

export function StatusBadge({ status, testid }: { status: CaseStatus; testid?: string }) {
  const meta = STATUS_META[status];
  return (
    <span
      data-testid={testid}
      className={cn("flex w-fit items-center gap-1 rounded-full px-2.5 py-1 font-heading text-label-sm", meta.tone)}
    >
      <Icon name={meta.icon} size={14} /> {meta.label}
    </span>
  );
}

export function VerdictBadge({ verdict, size = "md", testid }: { verdict: VerdictId; size?: "md" | "lg"; testid?: string }) {
  const v = getVerdict(verdict);
  return (
    <span
      data-testid={testid}
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full font-heading",
        v.tone,
        size === "lg" ? "px-4 py-2 text-label-lg" : "px-2.5 py-1 text-label-sm",
      )}
    >
      <Icon name={v.icon} size={size === "lg" ? 20 : 14} filled />
      {v.label}
    </span>
  );
}
