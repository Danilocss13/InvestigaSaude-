import { useState } from "react";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { Container, DemoBadge, InDevelopment, SectionHeading } from "@/components/common/Primitives";
import { cn } from "@/lib/utils";

type FlagType = "urgencia" | "promessa" | "autoridade" | "conspiracao";

const FLAGS: Record<FlagType, { label: string; tone: string }> = {
  urgencia: { label: "Urgência artificial", tone: "bg-error-container text-on-error-container" },
  promessa: { label: "Promessa absoluta", tone: "bg-amber-verdict-container text-amber-verdict" },
  autoridade: { label: "Autoridade vaga", tone: "bg-tertiary-fixed text-on-tertiary-fixed" },
  conspiracao: { label: "Apelo conspiratório", tone: "bg-orange-verdict-container text-orange-verdict" },
};

/** Mensagem fictícia para a prévia da bancada. */
const SAMPLE: { text: string; flag?: FlagType }[] = [
  { text: "ATENÇÃO, compartilhe antes que apaguem!", flag: "urgencia" },
  { text: " Um " },
  { text: "médico renomado", flag: "autoridade" },
  { text: " revelou que este suco " },
  { text: "cura 100% das inflamações em 3 dias", flag: "promessa" },
  { text: ". " },
  { text: "A indústria não quer que você saiba", flag: "conspiracao" },
  { text: "." },
];

export default function LaboratorioInterativo() {
  const [highlight, setHighlight] = useState(false);

  return (
    <div data-testid="laboratorio-page">
      <PageHero
        testid="laboratorio-hero"
        tag={{ icon: "experiment", label: "Laboratório Interativo" }}
        title={<>Bancada &ldquo;Fato ou Ruído?&rdquo;</>}
        description="Ambiente simulado para testar hipóteses, confrontar argumentos e dissecar mensagens suspeitas. Abaixo, uma prévia da primeira ferramenta."
        crumbs={[{ label: "Laboratório Interativo" }]}
      >
        <DemoBadge label="Prévia em desenvolvimento" className="mt-1" />
      </PageHero>

      <section className="py-14">
        <Container className="flex flex-col gap-6">
          <SectionHeading tag={{ icon: "biotech", label: "Prévia da bancada" }} title="Dissecar uma mensagem" description="Ative a lupa para destacar sinais de alerta em uma mensagem fictícia." />
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-md lg:col-span-8" data-testid="lab-bench">
              <div className="flex items-center justify-between gap-2 bg-surface-container-low px-5 py-3">
                <span className="flex items-center gap-2 font-heading text-label-sm uppercase tracking-wider text-primary">
                  <Icon name="chat" size={18} /> Amostra #L-01 · mensagem fictícia
                </span>
                <button
                  type="button"
                  onClick={() => setHighlight((h) => !h)}
                  aria-pressed={highlight}
                  data-testid="lab-highlight-toggle"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 font-heading text-label-md transition-colors duration-150",
                    highlight ? "bg-primary text-on-primary" : "bg-surface-container-lowest text-primary hover:bg-surface-container",
                  )}
                >
                  <Icon name={highlight ? "visibility_off" : "search"} size={16} />
                  {highlight ? "Ocultar destaques" : "Destacar sinais de alerta"}
                </button>
              </div>
              <div className="paper-grain ruled-paper p-6 sm:p-8">
                <p className="font-mono text-[16px] leading-8 text-on-surface" data-testid="lab-sample-text">
                  {SAMPLE.map((seg, i) =>
                    seg.flag && highlight ? (
                      <mark key={i} className={cn("rounded px-1 py-0.5 transition-colors", FLAGS[seg.flag].tone)} title={FLAGS[seg.flag].label}>
                        {seg.text}
                      </mark>
                    ) : (
                      <span key={i}>{seg.text}</span>
                    ),
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl bg-surface-container-low p-5 lg:col-span-4" data-testid="lab-legend">
              <span className="font-heading text-label-sm uppercase tracking-wider text-on-surface-variant">Legenda dos sinais</span>
              {(Object.keys(FLAGS) as FlagType[]).map((k) => (
                <div key={k} className="flex items-center gap-2">
                  <span className={cn("h-4 w-4 rounded", FLAGS[k].tone)} />
                  <span className="text-body-sm text-on-surface">{FLAGS[k].label}</span>
                </div>
              ))}
              <p className="mt-2 text-body-sm text-on-surface-variant">
                Sinais de alerta não provam que algo é falso — indicam que a mensagem precisa ser verificada com mais cuidado.
              </p>
            </div>
          </div>
          <InDevelopment
            testid="laboratorio-in-development"
            title="Experimentos previstos para a bancada"
            description="Novas ferramentas interativas serão adicionadas gradualmente ao Laboratório."
            items={["Comparador de fontes lado a lado", "Linha do tempo de um boato", "Simulador de busca reversa de imagem", "Desafios rápidos \"Fato ou Ruído?\""]}
          />
        </Container>
      </section>
    </div>
  );
}
