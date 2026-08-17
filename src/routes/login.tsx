import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CONVENTION } from "@/lib/aak-data";
import { Reveal } from "@/components/aak/Reveal";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Event Login — AAK Events" },
      {
        name: "description",
        content:
          "Sign in to manage your AAK event registration, download your ticket and track CPD points earned.",
      },
      { property: "og:title", content: "Event Login — AAK Events" },
      {
        property: "og:description",
        content: "Sign in to manage your AAK event registration and tickets.",
      },
    ],
  }),
  component: EventLogin,
});

function EventLogin() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="grid min-h-[calc(100vh-8rem)] lg:grid-cols-2">
      <div className="flex items-center px-6 py-20 sm:px-12">
        <div className="w-full max-w-sm">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-crimson">Event login</p>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="mt-6 font-display text-3xl font-semibold text-navy sm:text-4xl">
              Sign in to your registration
            </h1>
          </Reveal>

          {sent ? (
            <Reveal delay={120}>
              <p className="mt-8 border border-border p-6 text-sm leading-relaxed text-muted-foreground">
                A secure sign-in link is on its way to{" "}
                <span className="text-navy">{email}</span>. It expires in 15 minutes.
              </p>
            </Reveal>
          ) : (
            <Reveal delay={120}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) setSent(true);
                }}
                className="mt-10 space-y-8"
              >
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Email address
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-base text-navy outline-none transition-colors focus:border-crimson"
                  />
                </label>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-3 bg-crimson px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-navy"
                >
                  Send sign-in link
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            </Reveal>
          )}

          <Reveal delay={180}>
            <p className="mt-8 text-xs text-muted-foreground">
              Have a booking reference instead?{" "}
              <Link to="/booking" className="rule-link text-crimson">
                Look up your booking
              </Link>
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-secondary lg:block">
        <img
          src={CONVENTION.poster}
          alt={`${CONVENTION.title} poster`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-background/90 px-10 py-8 backdrop-blur-sm">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {CONVENTION.dateLabel}
          </p>
          <p className="mt-2 font-display text-xl font-semibold text-navy">{CONVENTION.title}</p>
        </div>
      </div>
    </div>
  );
}
