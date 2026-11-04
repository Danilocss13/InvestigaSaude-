import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "@/components/common/Icon";
import { BrandMark } from "@/components/layout/BrandMark";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NAV_ITEMS, ROUTES } from "@/data/navigation";
import { FIRST_CASE } from "@/data/cases";
import { cn } from "@/lib/utils";

const linkBase =
  "whitespace-nowrap rounded-lg px-2 py-2 font-heading text-label-md transition-colors duration-150 2xl:px-3";
const linkIdle = "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface";
const linkActive = "bg-surface-container font-bold text-primary";

function PassportButton() {
  return (
    <Popover>
      <PopoverTrigger
        data-testid="header-passport-button"
        aria-label="Passaporte do investigador (demonstrativo)"
        className="hidden h-8 w-8 items-center justify-center rounded-full bg-primary sm:flex text-on-primary transition-transform duration-150 hover:scale-110 focus-visible:ring-2 focus-visible:ring-secondary-fixed"
      >
        <Icon name="person" size={18} />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72" data-testid="header-passport-popover">
        <div className="flex flex-col gap-2">
          <span className="font-heading text-label-sm uppercase tracking-wider text-primary">Passaporte do Investigador</span>
          <p className="text-body-sm text-on-surface-variant">
            Nesta etapa não há login nem progresso salvo. Medalhas, níveis e progresso exibidos são apenas demonstrativos.
          </p>
          <Link
            to="/#jornada"
            className="inline-flex items-center gap-1 font-heading text-label-md text-primary hover:text-primary-container"
            data-testid="header-passport-journey-link"
          >
            Ver jornada demonstrativa <Icon name="arrow_forward" size={16} />
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header
      data-testid="site-header"
      className="fixed inset-x-0 top-0 z-50 bg-surface/85 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-3 px-5 sm:px-6">
        <div className="shrink-0">
          <BrandMark />
        </div>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.to === ROUTES.home}
              data-testid={`nav-link-${item.id}`}
              className={({ isActive }) => cn(linkBase, isActive ? linkActive : linkIdle)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to={ROUTES.caseDetail(FIRST_CASE.slug)}
            data-testid="header-cta-first-case"
            className="hidden h-11 items-center justify-center gap-2 rounded-lg bg-primary-container px-4 font-heading text-label-lg text-on-primary shadow-[0_2px_8px_-2px_rgba(13,116,111,0.2)] transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-secondary-fixed sm:inline-flex xl:hidden"
          >
            <Icon name="mystery" size={20} />
            <span>Investigar meu primeiro caso</span>
          </Link>
          <PassportButton />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              data-testid="mobile-menu-button"
              aria-label="Abrir menu de navegação"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-primary transition-colors hover:bg-surface-container xl:hidden"
            >
              <Icon name="menu" size={26} />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm bg-surface p-0" data-testid="mobile-menu">
              <SheetHeader className="border-b border-surface-container-highest p-5">
                <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
                <BrandMark onNavigate={close} testid="mobile-brand-link" />
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-4" aria-label="Navegação móvel">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.to}
                    end={item.to === ROUTES.home}
                    onClick={close}
                    data-testid={`mobile-nav-link-${item.id}`}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 font-heading text-label-lg transition-colors",
                        isActive ? "bg-surface-container text-primary" : "text-on-surface-variant hover:bg-surface-container-low",
                      )
                    }
                  >
                    <Icon name={item.icon} size={22} />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Link
                  to={ROUTES.caseDetail(FIRST_CASE.slug)}
                  onClick={close}
                  data-testid="mobile-cta-first-case"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-container font-heading text-label-lg text-on-primary transition-colors hover:bg-primary"
                >
                  <Icon name="mystery" size={20} />
                  Investigar meu primeiro caso
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
