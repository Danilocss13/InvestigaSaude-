import { useState } from "react";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { Container, DemoBadge, InDevelopment } from "@/components/common/Primitives";
import { Checkbox } from "@/components/ui/checkbox";
import { GUIDE_STEPS } from "@/data/guide";

const TOTAL = GUIDE_STEPS.reduce((n, s) => n + s.checks.length, 0);

export default function GuiaVerificacao() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggle = (id: string, on: boolean) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  const pct = Math.round((checked.size / TOTAL) * 100);

  return (
    <div data-testid="guia-page">
      <PageHero
        testid="guia-hero"
        tag={{ icon: "checklist_rtl", label: "Guia de Verificação" }}
        title="Quatro etapas antes de compartilhar."
        description="Um checklist de bolso para avaliar áudios, correntes de WhatsApp e postagens virais com método. Marque os itens enquanto analisa uma mensagem."
        crumbs={[{ label: "Guia de Verificação" }]}
        aside={
          <div className="flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-5 shadow-md" data-testid="guia-progress-card">
            <div className="flex items-center justify-between font-heading text-label-md">
              <span className="text-on-surface">Itens verificados</span>
              <span className="text-primary" data-testid="guia-progress-value">{checked.size}/{TOTAL}</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container-highest" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Itens verificados">
              <div className="h-full rounded-full bg-primary-container transition-[width] duration-300" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-body-sm text-on-surface-variant">Marcações ficam apenas nesta tela e não são salvas.</p>
            {checked.size > 0 && (
              <button type="button" onClick={() => setChecked(new Set())} data-testid="guia-reset-button" className="inline-flex w-fit items-center gap-1 font-heading text-label-md text-primary hover:text-primary-container">
                <Icon name="restart_alt" size={16} /> Limpar marcações
              </button>
            )}
          </div>
        }
      >
        <DemoBadge label="Versão inicial em revisão pedagógica" className="mt-1" />
      </PageHero>

      <section className="py-14">
        <Container className="flex flex-col gap-6">
          <div className="relative grid gap-5 md:grid-cols-2">
            {GUIDE_STEPS.map((step) => (
              <div key={step.id} className="flex flex-col gap-4 rounded-2xl bg-surface-container-lowest p-6 shadow-sm" data-testid={`guide-step-${step.id}`}>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-container text-on-primary">
                    <Icon name={step.icon} size={26} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[12px] font-semibold uppercase tracking-wider text-tertiary">Etapa {step.number}</span>
                    <h2 className="font-heading text-headline-sm text-on-surface">{step.title}</h2>
                    <p className="text-body-sm text-on-surface-variant">{step.description}</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  {step.checks.map((c) => (
                    <li key={c.id}>
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-surface-container-low p-3 transition-colors hover:bg-surface-container">
                        <Checkbox
                          checked={checked.has(c.id)}
                          onCheckedChange={(on: boolean) => toggle(c.id, on)}
                          data-testid={`guide-check-${c.id}`}
                          className="mt-0.5"
                        />
                        <span className="text-body-sm text-on-surface">{c.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                {step.tools && (
                  <div className="flex flex-wrap gap-2">
                    {step.tools.map((t) => (
                      <a key={t.url} href={t.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-surface-container px-3 py-1 font-heading text-label-md text-primary hover:bg-surface-container-highest" data-testid={`guide-tool-${step.id}`}>
                        <Icon name="open_in_new" size={14} /> {t.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <InDevelopment
            testid="guia-in-development"
            title="Próximas versões do guia"
            description="O guia será ampliado com exemplos práticos e versões para impressão e compartilhamento."
            items={["Versão de bolso para impressão", "Exemplos comentados de áudios e correntes", "Ligação com os casos da Central", "Modo de leitura simplificada"]}
          />
        </Container>
      </section>
    </div>
  );
}
