import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { EVENTS } from "@/lib/aak-data";
import { Reveal } from "@/components/aak/Reveal";
import { MediaGallery } from "@/components/aak/MediaGallery";
import Iridescence from "@/components/aak/Iridescence";

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: "Accommodation & Tours — AAK Events" },
      {
        name: "description",
        content:
          "Explore accommodation and pre-convention technical tours for AAK events — photos and video from the resorts, projects and places on the itinerary.",
      },
      { property: "og:title", content: "Accommodation & Tours — AAK Events" },
      {
        property: "og:description",
        content: "Photos and video of accommodation and technical tour destinations for AAK events.",
      },
    ],
  }),
  component: ToursPage,
});

function ToursPage() {
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
          <p className="text-[11px] uppercase tracking-[0.28em] text-white font-black">
            Beyond the conference room
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-black text-white sm:text-6xl">
            Accommodation &amp; tours
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white italic font-semibold">
            Where to stay and where we're taking you — a look at the venues and technical tour
            destinations for every AAK event, in photos and video.
          </p>
        </Reveal>
        </div>
      </section>

      {EVENTS.map((event, eventIndex) => (
        <div key={event.slug}>
          {/* Accommodation */}
          <section className="border-b border-border py-20">
            <SectionHeading index="01" eyebrow={event.title} title="Accommodation" />
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <Reveal>
                  <p className="text-base leading-relaxed text-ink">{event.accommodation.intro}</p>
                </Reveal>
                <Reveal delay={80}>
                  <div className="mt-6 flex items-center gap-3 text-sm text-ink">
                    <MapPin className="size-4 shrink-0 text-crimson" />
                    <span>
                      {event.accommodation.venue}, {event.accommodation.city}
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={140}>
                  <Link
                    to="/"
                    className="group mt-8 inline-flex items-center gap-3 bg-crimson px-6 py-3 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-navy"
                  >
                    View {event.title}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </Reveal>
              </div>
              <Reveal delay={100}>
                {event.accommodation.media[0]?.kind === "video" ? (
                  <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-secondary sm:mx-0">
                    <video
                      src={event.accommodation.media[0].src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      className="aspect-[9/16] w-full object-cover"
                    />
                  </div>
                ) : (
                  <MediaGallery media={event.accommodation.media} className="sm:grid-cols-2" />
                )}
              </Reveal>
            </div>
          </section>

          {/* Tours */}
          <section className="py-20">
            <SectionHeading index="02" eyebrow={event.title} title="Technical tours" />
            <Reveal>
              <p className="max-w-2xl text-base leading-relaxed text-ink">{event.tours.intro}</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-10">
                <MediaGallery media={event.tours.heroMedia} className="sm:grid-cols-4" />
              </div>
            </Reveal>

            <ul className="mt-14 space-y-14">
              {event.tours.destinations.map((dest, i) => (
                <Reveal as="li" key={dest.name} delay={i * 90}>
                  <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                    <div>
                      <span className="font-display text-xs text-blue-900 tabular-nums">
                        0{i + 1}
                      </span>
                      <h3 className="mt-3 font-display text-xl font-semibold text-navy sm:text-2xl">
                        {dest.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {dest.description}
                      </p>
                    </div>
                    <MediaGallery media={dest.media} />
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200}>
              <a
                href={event.tours.signupUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-12 inline-flex items-center gap-3 bg-crimson px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-navy"
              >
                Sign up for tours
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </Reveal>
          </section>

          {eventIndex < EVENTS.length - 1 && <div className="h-px bg-border" />}
        </div>
      ))}
    </div>
  );
}

function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal>
      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{eyebrow}</p>
        <div className="mt-3 flex items-baseline gap-5">
          <span className="font-display text-xs text-blue-700 tabular-nums">{index}</span>
          <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">{title}</h2>
        </div>
      </div>
    </Reveal>
  );
}
