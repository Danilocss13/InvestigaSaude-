import { Icon } from "@/components/common/Icon";
import type { MessageFormat, ViralMessage } from "@/data/cases";

const FORMAT_ICON: Record<MessageFormat, string> = {
  whatsapp: "chat",
  audio: "mic",
  post: "share",
  anuncio: "campaign",
};

/** A "prova" do caso: a mensagem suspeita, apresentada como documento arquivado. */
export function ViralMessageCard({ message, note }: { message: ViralMessage; note: string }) {
  return (
    <div
      data-testid="viral-message-card"
      className="relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-md"
    >
      <div className="flex items-center justify-between gap-2 bg-surface-container-low px-5 py-3">
        <div className="flex items-center gap-2 text-primary">
          <Icon name={FORMAT_ICON[message.format]} size={20} />
          <span className="font-heading text-label-sm uppercase tracking-wider">{message.label}</span>
        </div>
        <span className="rounded bg-error-container px-2 py-0.5 font-heading text-label-sm uppercase tracking-wider text-on-error-container">
          Prova sob análise
        </span>
      </div>
      <div className="paper-grain ruled-paper relative px-5 pb-5 pt-6 sm:px-8">
        <Icon name="format_quote" size={40} filled className="absolute left-3 top-2 text-primary/10" />
        <p data-testid="viral-message-text" className="relative font-mono text-[15px] leading-7 text-on-surface">
          {message.text}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-on-surface-variant">
          <span className="flex items-center gap-1 text-body-sm">
            <Icon name="forward" size={16} /> Encaminhada com frequência
          </span>
          <span className="flex items-center gap-1 font-heading text-label-sm uppercase tracking-wider text-tertiary">
            <Icon name="info" size={14} /> {note}
          </span>
        </div>
        <div className="pointer-events-none absolute -right-2 bottom-6 hidden rotate-[-8deg] rounded-md border-2 border-error/40 px-3 py-1 font-heading text-label-md uppercase tracking-widest text-error/50 sm:block">
          Suspeito
        </div>
      </div>
    </div>
  );
}
