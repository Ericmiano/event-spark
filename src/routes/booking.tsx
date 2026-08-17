import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { CONVENTION, KES } from "@/lib/aak-data";
import { Reveal } from "@/components/aak/Reveal";
import Iridescence from "@/components/aak/Iridescence";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "View Your Booking — AAK Events" },
      {
        name: "description",
        content:
          "Look up an existing AAK event registration with your booking reference or email to review tickets, attendees and payment status.",
      },
      { property: "og:title", content: "View Your Booking — AAK Events" },
      {
        property: "og:description",
        content: "Look up an existing AAK event registration and review your tickets.",
      },
    ],
  }),
  component: ViewBooking,
});

function ViewBooking() {
  const [ref, setRef] = useState("");
  const [found, setFound] = useState(false);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20">
      <section className="relative overflow-hidden rounded-3xl py-12 sm:py-16">
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
        <div className="relative z-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white font-black">Registered already?</p>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="mt-6 font-display text-3xl font-black text-white sm:text-5xl">
              View your booking
            </h1>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-5 text-sm leading-relaxed text-white italic font-semibold">
              Enter the booking reference from your confirmation email, or the email address used at
              registration.
            </p>
          </Reveal>
        </div>
      </section>

      <Reveal delay={190}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFound(ref.trim().length > 2);
          }}
          className="mt-10 flex items-end gap-4 border-b border-border pb-3 focus-within:border-blue-700"
        >
          <label className="flex-1">
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Booking reference or email
            </span>
            <input
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              placeholder="AAK-2026-4821"
              className="mt-2 w-full bg-transparent py-1 text-base text-navy outline-none placeholder:text-muted-foreground/60"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 pb-1 text-xs uppercase tracking-[0.18em] text-blue-900 font-black transition-transform duration-300 hover:translate-x-1"
          >
            <Search className="size-4" /> Find
          </button>
        </form>
      </Reveal>

      <div
        className="grid overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: found ? "1fr" : "0fr", opacity: found ? 1 : 0 }}
      >
        <div className="min-h-0">
          <div className="mt-12 rounded-2xl border-2 border-crimson/20 p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-display text-xl font-semibold text-navy">{CONVENTION.title}</h2>
              <span className="bg-success/12 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-success">
                Confirmed
              </span>
            </div>
            <dl className="mt-8 divide-y divide-border rounded-lg border-y border-border text-sm">
              {[
                ["Reference", "AAK-2026-4821"],
                ["Ticket", "AAK Member × 1"],
                ["Amount", KES(35000)],
                ["Dates", CONVENTION.dateLabel],
                ["Venue", `${CONVENTION.venue}, ${CONVENTION.city}`],
                ["CPD points", `${CONVENTION.cpdPoints}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-4">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right text-navy">{v}</dd>
                </div>
              ))}
            </dl>
            <Link
              to="/events/$slug"
              params={{ slug: CONVENTION.slug }}
              className="group mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-blue-900 font-black"
            >
              Event details
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
