import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/" as const, label: "About", params: undefined },
  { to: "/tours" as const, label: "Accommodation & Tours", params: undefined },
  { to: "/booking" as const, label: "My booking", params: undefined },
  { to: "/login" as const, label: "Event login", params: undefined },
];


export function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md transition-all duration-500",
        condensed ? "py-2" : "py-4",
      )}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          aria-label="AAK home"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-crimson shadow-sm ring-1 ring-crimson/60 transition-transform duration-300 hover:scale-[1.02]"
        >
          <span className="flex h-full w-full items-center justify-center rounded-full font-display text-[11px] font-black tracking-[0.18em] text-white">
            AAK
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.slice(0, 3).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              params={item.params as never}
              className="rule-link text-sm font-semibold text-navy transition-colors hover:text-crimson"
              activeProps={{ "data-active": "true", className: "text-crimson font-black" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="bg-crimson px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-background transition-all hover:bg-navy"
          >
            Event login
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-navy md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden px-6 transition-all duration-500 md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <nav className="flex min-h-0 flex-col gap-4 pt-5 pb-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              params={item.params as never}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-navy"
              activeProps={{ className: "text-crimson font-black" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

    </header>
  );
}
