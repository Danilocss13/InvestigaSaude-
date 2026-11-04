import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/common/Icon";

/** Container padrão de 1280px do design. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-6", className)}>{children}</div>;
}

interface SectionTagProps {
  icon: string;
  label: string;
  className?: string;
  iconFilled?: boolean;
  testid?: string;
}

/** Etiqueta em pílula usada no topo das seções (ex.: "Casos Abertos"). */
export function SectionTag({ icon, label, className, iconFilled, testid }: SectionTagProps) {
  return (
    <div
      data-testid={testid}
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full bg-surface-container px-3 py-1 text-primary",
        className,
      )}
    >
      <Icon name={icon} size={16} filled={iconFilled} />
      <span className="font-heading text-label-sm uppercase tracking-wider">{label}</span>
    </div>
  );
}

interface SectionHeadingProps {
  tag: SectionTagProps;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleTestid?: string;
}

export function SectionHeading({ tag, title, description, align = "left", className, titleTestid }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-2", align === "center" && "mx-auto items-center text-center", className)}>
      <SectionTag {...tag} />
      <h2
        data-testid={titleTestid}
        className="font-heading text-headline-lg-mobile tracking-tight text-on-surface sm:text-headline-lg"
      >
        {title}
      </h2>
      {description && <p className="text-body-md text-on-surface-variant">{description}</p>}
    </div>
  );
}

/** Selo "Conteúdo demonstrativo" — estilo carimbo tracejado. */
export function DemoBadge({ className, label = "Conteúdo demonstrativo", testid }: { className?: string; label?: string; testid?: string }) {
  return (
    <span
      data-testid={testid}
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-md border border-dashed border-tertiary/50 bg-tertiary-fixed/60 px-2 py-0.5 font-heading text-label-sm uppercase tracking-wider text-tertiary",
        className,
      )}
    >
      <Icon name="science" size={14} />
      {label}
    </span>
  );
}

interface InDevelopmentProps {
  title: string;
  description: string;
  items?: string[];
  icon?: string;
  testid: string;
  className?: string;
}

/** Bloco padronizado para áreas ainda em desenvolvimento. */
export function InDevelopment({ title, description, items, icon = "construction", testid, className }: InDevelopmentProps) {
  return (
    <div
      data-testid={testid}
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-lowest/70 p-6 md:p-8",
        className,
      )}
    >
      <div className="clue-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-verdict-container text-amber-verdict">
          <Icon name={icon} size={26} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-amber-verdict-container px-2.5 py-0.5 font-heading text-label-sm uppercase tracking-wider text-amber-verdict">
            <Icon name="pending" size={14} />
            Em desenvolvimento
          </span>
          <h3 className="font-heading text-headline-sm text-on-surface">{title}</h3>
          <p className="text-body-sm text-on-surface-variant">{description}</p>
          {items && items.length > 0 && (
            <ul className="mt-1 grid gap-2 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-body-sm text-on-surface">
                  <Icon name="radio_button_unchecked" size={16} className="mt-0.5 text-outline" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
