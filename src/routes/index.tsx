import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { EVENTS, KES } from "@/lib/aak-data";
import { Reveal } from "@/components/aak/Reveal";
import Iridescence from "@/components/aak/Iridescence";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AAK Events — Conventions, Summits & CPD Sessions" },
      {
        name: "description",
        content:
          "Browse and book upcoming Architectural Association of Kenya events, including the AAK Annual Convention 2026 in Diani.",
      },
      { property: "og:title", content: "AAK Events — Conventions, Summits & CPD Sessions" },
      {
        property: "og:description",
        content: "Browse and book upcoming Architectural Association of Kenya events.",
      },
    ],
  }),
  component: EventsIndex,
});

function EventsIndex() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <section className="relative overflow-hidden rounded-3xl py-20 sm:py-32">
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
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-3 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-crimson font-display text-[10px] font-black tracking-[0.18em] text-white">
                AAK
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-white font-black">
                Architectural Association of Kenya
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-black text-white sm:text-6xl">
              Events for the people who shape the built environment.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white italic font-semibold">
              Conventions, chapter sessions and CPD-accredited gatherings for architects, engineers,
              planners, surveyors and construction managers.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <Reveal>
          <h2 className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            Upcoming
          </h2>
        </Reveal>

        <ul className="mt-8 space-y-6">
          {EVENTS.map((event, i) => (
            <Reveal as="li" key={event.slug} delay={i * 90}>
              <Link
                to="/events/$slug"
                params={{ slug: event.slug }}
                className="lift group grid gap-8 rounded-2xl border-2 border-crimson/20 bg-card p-6 transition-all hover:border-crimson/50 sm:grid-cols-[220px_1fr_auto] sm:p-8"
              >
                <div className="overflow-hidden rounded-xl bg-secondary">
                  <img
                    src={event.poster}
                    alt={`${event.title} poster`}
                    width={440}
                    height={560}
                    loading="lazy"
                    decoding="async"
                    className="h-48 w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] sm:h-full"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em]">
                    <span className="bg-accent px-2 py-1 text-accent-foreground">
                      {event.category}
                    </span>
                    <span className="text-muted-foreground">{event.cpdPoints} CPD points</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-navy sm:text-3xl">
                    {event.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {event.tagline}
                  </p>
                  <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-crimson" />
                      <dd>{event.dateLabel}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-crimson" />
                      <dd>
                        {event.venue}, {event.city}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-col justify-between gap-6 sm:items-end">
                  <div className="sm:text-right">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      From
                    </p>
                    <p className="mt-1 font-display text-xl font-semibold text-navy">
                      {KES(event.priceFrom)}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm text-crimson">
                    View event
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
