import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Icon } from "@/components/common/Icon";
import { VerdictBadge } from "@/components/cases/CaseMeta";
import type { Dossier } from "@/data/cases";
import { ROUTES } from "@/data/navigation";
import { VERDICTS, type VerdictId } from "@/data/verdicts";
import { cn } from "@/lib/utils";

interface VerdictPanelProps {
  dossier: Dossier;
  examinedCount: number;
  onReset: () => void;
}

type Outcome = "correct" | "alternative" | "incorrect";

/** Seleção do veredito com feedback pedagógico imediato (estado apenas local). */
export function VerdictPanel({ dossier, examinedCount, onReset }: VerdictPanelProps) {
  const [selected, setSelected] = useState<VerdictId | null>(null);
  const [submitted, setSubmitted] = useState<VerdictId | null>(null);
  const total = dossier.clues.length;
  const allExamined = examinedCount >= total;

  const outcome: Outcome | null = submitted
    ? submitted === dossier.verdict
      ? "correct"
      : dossier.alternative?.verdict === submitted
        ? "alternative"
        : "incorrect"
    : null;

  const reset = () => {
    setSelected(null);
    setSubmitted(null);
    onReset();
  };

  return (
    <div className="flex flex-col gap-5" data-testid="verdict-panel">
      {!submitted && (
        <>
          <p
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-3 text-body-sm",
              allExamined ? "bg-secondary-container/50 text-on-secondary-container" : "bg-surface-container-low text-on-surface-variant",
            )}
            data-testid="verdict-hint"
          >
            <Icon name={allExamined ? "task_alt" : "manage_search"} size={18} />
            {allExamined
              ? "Todas as pistas foram examinadas. Hora de registrar seu veredito."
              : `Dica: examine as pistas antes de decidir (${examinedCount}/${total} examinadas).`}
          </p>
          <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Escolha o veredito">
            {VERDICTS.map((v) => {
              const isSel = selected === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={isSel}
                  onClick={() => setSelected(v.id)}
                  data-testid={`verdict-option-${v.id}`}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-[border-color,background-color,transform] duration-150 active:scale-[0.98]",
                    isSel
                      ? "border-primary bg-surface-container-lowest shadow-md"
                      : "border-transparent bg-surface-container-low hover:border-outline-variant",
                  )}
                >
                  <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", v.tone)}>
                    <Icon name={v.icon} size={20} filled={isSel} />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="font-heading text-label-lg text-on-surface">{v.label}</span>
                    <span className="text-body-sm text-on-surface-variant">{v.definition}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            disabled={!selected}
            onClick={() => selected && setSubmitted(selected)}
            data-testid="verdict-submit-button"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-6 font-heading text-label-lg text-on-primary shadow-md transition-[background-color,opacity] duration-150 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
          >
            <Icon name="gavel" size={20} /> Registrar veredito
          </button>
        </>
      )}

      {submitted && outcome && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-5"
          data-testid="verdict-result"
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl p-5 sm:p-6",
              outcome === "incorrect" ? "bg-amber-verdict-container/60" : "bg-secondary-container/40",
            )}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Icon
                  name={outcome === "incorrect" ? "replay" : "workspace_premium"}
                  size={28}
                  filled
                  className={outcome === "incorrect" ? "text-amber-verdict" : "text-secondary"}
                />
                <span data-testid="verdict-outcome-title" className="font-heading text-headline-sm text-on-surface">
                  {outcome === "correct" && "Veredito certeiro!"}
                  {outcome === "alternative" && "Leitura defensável!"}
                  {outcome === "incorrect" && "Vale revisar as pistas"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-body-sm text-on-surface-variant">
                Seu veredito: <VerdictBadge verdict={submitted} testid="verdict-user-choice" />
                <span className="mx-1 text-outline-variant">•</span>
                Classificação do caso: <VerdictBadge verdict={dossier.verdict} testid="verdict-correct-answer" />
              </div>
              {outcome === "alternative" && dossier.alternative && (
                <p className="text-body-sm text-on-surface">{dossier.alternative.comment}</p>
              )}
            </div>
            <div className="pointer-events-none absolute right-4 top-4 hidden animate-stamp-in rounded-md border-2 border-dashed border-primary/50 px-3 py-1 font-heading text-label-md uppercase tracking-widest text-primary/70 sm:block">
              Caso analisado
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Conclusão da investigação</span>
            <p className="text-body-md leading-relaxed text-on-surface" data-testid="verdict-explanation">{dossier.explanation}</p>
          </div>

          <div className="flex flex-col gap-2 rounded-xl bg-surface-container-low p-4">
            <span className="font-heading text-label-sm uppercase tracking-wider text-on-surface-variant">O que levar deste caso</span>
            <ul className="flex flex-col gap-2">
              {dossier.learnings.map((l) => (
                <li key={l} className="flex items-start gap-2 text-body-sm text-on-surface">
                  <Icon name="lightbulb" size={18} className="mt-px text-secondary" /> {l}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={reset}
              data-testid="verdict-reset-button"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-surface-container px-5 font-heading text-label-lg text-primary transition-colors hover:bg-surface-container-highest"
            >
              <Icon name="restart_alt" size={20} /> Refazer investigação
            </button>
            <Link
              to={ROUTES.metodologia}
              className="inline-flex items-center gap-1 font-heading text-label-md text-primary hover:text-primary-container"
              data-testid="verdict-methodology-link"
            >
              Entenda os critérios de classificação <Icon name="arrow_forward" size={16} />
            </Link>
          </div>
          <p className="text-body-sm text-on-surface-variant">
            Progresso demonstrativo: seu resultado não é salvo e some ao sair da página.
          </p>
        </motion.div>
      )}
    </div>
  );
}
