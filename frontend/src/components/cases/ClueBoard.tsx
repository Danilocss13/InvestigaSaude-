import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@/components/common/Icon";
import type { Clue } from "@/data/cases";
import { cn } from "@/lib/utils";

interface ClueBoardProps {
  clues: Clue[];
  examined: Set<string>;
  onExamine: (id: string) => void;
}

/** Quadro de pistas conectadas: cada pista revela sua análise ao ser examinada. */
export function ClueBoard({ clues, examined, onExamine }: ClueBoardProps) {
  return (
    <div className="relative flex flex-col gap-4" data-testid="clue-board">
      <div className="pointer-events-none absolute bottom-8 left-[27px] top-8 border-l-2 border-dashed border-primary/25" />
      {clues.map((clue, i) => {
        const isOpen = examined.has(clue.id);
        return (
          <div key={clue.id} className="relative flex gap-4" data-testid={`clue-${clue.id}`}>
            <div
              className={cn(
                "relative z-10 mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-colors duration-300",
                isOpen
                  ? "bg-primary-container text-on-primary"
                  : clue.alert
                    ? "bg-error-container text-on-error-container"
                    : "bg-surface-container-highest text-on-surface",
              )}
            >
              <Icon name={isOpen ? "check" : clue.icon} size={24} />
            </div>
            <div
              className={cn(
                "flex-1 rounded-2xl p-4 transition-[background-color,box-shadow] duration-300 sm:p-5",
                isOpen ? "bg-surface-container-lowest shadow-md" : "bg-surface-container-low hover:bg-surface-container",
              )}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-tertiary">
                    Pista {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-title-md text-on-surface">{clue.title}</span>
                  <span className="text-body-sm text-on-surface-variant">{clue.summary}</span>
                </div>
                {!isOpen && (
                  <button
                    type="button"
                    onClick={() => onExamine(clue.id)}
                    data-testid={`clue-examine-${clue.id}`}
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 font-heading text-label-md text-on-primary shadow-sm transition-[background-color,transform] duration-150 hover:bg-primary-container active:scale-95"
                  >
                    <Icon name="search" size={16} /> Examinar pista
                  </button>
                )}
                {isOpen && (
                  <span className="inline-flex w-fit shrink-0 items-center gap-1 rounded-full bg-secondary-container/70 px-2.5 py-1 font-heading text-label-sm text-on-secondary-container">
                    <Icon name="task_alt" size={14} /> Examinada
                  </span>
                )}
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p
                      data-testid={`clue-analysis-${clue.id}`}
                      className="mt-3 border-t border-dashed border-outline-variant pt-3 text-body-sm leading-relaxed text-on-surface"
                    >
                      {clue.analysis}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
