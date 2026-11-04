import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Ensina o tailwind-merge que estes são TAMANHOS de fonte (tokens do design),
// para que não sejam descartados ao combinar com classes de cor (text-primary etc.).
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-lg",
        "display-lg-mobile",
        "headline-lg",
        "headline-lg-mobile",
        "headline-md",
        "headline-sm",
        "title-md",
        "body-lg",
        "body-md",
        "body-sm",
        "label-lg",
        "label-md",
        "label-sm",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
