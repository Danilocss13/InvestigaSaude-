import { Link } from "react-router-dom";
import { Icon } from "@/components/common/Icon";
import { ROUTES } from "@/data/navigation";

export function BrandMark({ onNavigate, testid = "brand-home-link" }: { onNavigate?: () => void; testid?: string }) {
  return (
    <Link to={ROUTES.home} onClick={onNavigate} className="group flex items-center gap-2" data-testid={testid}>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-container text-on-primary shadow-[0_2px_8px_-2px_rgba(13,116,111,0.25)] transition-transform duration-200 group-hover:-rotate-6">
        <Icon name="health_and_safety" size={26} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-heading text-title-md tracking-tight text-primary">InvestigaSaúde</span>
          <Icon name="search_check" size={18} className="text-primary" />
        </div>
        <span className="font-heading text-[10px] uppercase tracking-normal text-on-surface-variant sm:text-label-sm sm:tracking-wider xl:text-[10px] xl:tracking-normal 2xl:text-label-sm 2xl:tracking-wider">
          Combate à desinformação em saúde
        </span>
      </div>
    </Link>
  );
}
