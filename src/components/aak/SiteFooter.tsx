import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Architectural Association of Kenya
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <Link to="/" className="rule-link hover:text-crimson">
            About
          </Link>
          <Link to="/booking" className="rule-link hover:text-crimson">
            My booking
          </Link>
          <a
            href="https://aak.or.ke"
            className="rule-link hover:text-crimson"
            target="_blank"
            rel="noreferrer"
          >
            aak.or.ke
          </a>
        </div>
      </div>
    </footer>
  );
}
