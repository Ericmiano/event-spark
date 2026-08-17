import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/" as const, label: "Events", params: undefined },
  {
    to: "/events/$slug" as const,
    label: "Convention 2026",
    params: { slug: "annual-convention-2026" },
  },
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
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="group flex items-baseline gap-3">
          <span className="font-display text-lg font-semibold tracking-tight text-navy">AAK</span>
          <span
            className={cn(
              "hidden text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-opacity duration-500 sm:block",
              condensed ? "opacity-0" : "opacity-100",
            )}
          >
            Architectural Association of Kenya
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rule-link text-sm text-ink transition-colors hover:text-crimson"
              activeProps={{ "data-active": "true", className: "text-crimson" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="border border-navy px-4 py-2 text-xs uppercase tracking-[0.18em] text-navy transition-colors hover:bg-navy hover:text-background"
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
          {[...NAV, { to: "/login", label: "Event login" }].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="text-sm text-ink"
              activeProps={{ className: "text-crimson" }}
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
