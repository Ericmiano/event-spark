import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CONVENTION } from "@/lib/aak-data";
import { Reveal } from "@/components/aak/Reveal";
import Iridescence from "@/components/aak/Iridescence";

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
      <div className="relative flex items-center rounded-r-3xl px-6 py-20 sm:px-12">
        <div className="pointer-events-none absolute inset-0 opacity-65">
          <Iridescence
            color={[0.62, 0.16, 0.16]}
            mouseReact={false}
            amplitude={0.08}
            speed={0.2}
            className="h-full w-full"
            style={{ filter: "saturate(1.1) brightness(0.92)" }}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#2c090d]/65 via-[#4a1015]/45 to-[#22070b]/55" />
        <div className="relative z-10 w-full max-w-sm">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white font-black">Event login</p>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="mt-6 font-display text-3xl font-black text-white sm:text-4xl">
              Sign in to your registration
            </h1>
          </Reveal>

          {sent ? (
            <Reveal delay={120}>
              <p className="mt-8 rounded-xl border border-border p-6 text-sm leading-relaxed text-white italic font-semibold">
                A secure sign-in link is on its way to{" "}
                <span className="text-white">{email}</span>. It expires in 15 minutes.
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
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white font-black">
                    Email address
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full border-b border-white/30 bg-transparent py-3 text-base text-white outline-none transition-colors focus:border-white placeholder-white/50"
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
              <Link to="/booking" className="rule-link text-blue-900 font-black">
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
