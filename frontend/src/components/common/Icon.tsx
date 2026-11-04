import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface IconProps {
  /** nome do ícone Material Symbols (ex.: "search", "folder_special") */
  name: string;
  size?: number;
  filled?: boolean;
  className?: string;
}

/** Ícone Material Symbols Outlined servido localmente (pacote material-symbols). */
export function Icon({ name, size = 24, filled = false, className }: IconProps) {
  const style: CSSProperties = {
    fontSize: size,
    width: size,
    height: size,
    fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
  };
  return (
    <span aria-hidden="true" className={cn("material-symbols-outlined select-none", className)} style={style}>
      {name}
    </span>
  );
}
