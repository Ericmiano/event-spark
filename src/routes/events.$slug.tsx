import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Clock,
  Download,
  MapPin,
  Minus,
  Plus,
  Ticket,
} from "lucide-react";
import { findEvent, KES, type TicketTier } from "@/lib/aak-data";
import { Reveal } from "@/components/aak/Reveal";
import { Countdown } from "@/components/aak/Countdown";
import { ScrollProgress } from "@/components/aak/ScrollProgress";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "tickets", label: "Tickets" },
  { id: "tours", label: "Accommodation & Tours" },
  { id: "programme", label: "Programme" },
  { id: "speakers", label: "Speakers" },
];

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = findEvent(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Event unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { event } = loaderData;
    const title = `${event.title} — ${event.city}`;
    const description = `${event.tagline}. ${event.dateLabel} at ${event.venue}, ${event.city}. Tickets from ${KES(event.priceFrom)}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: event.poster },
        { name: "twitter:image", content: event.poster },
      ],
    };
  },
  component: EventDetail,
});

function EventDetail() {
  const { event } = Route.useLoaderData();
  const [active, setActive] = useState("about");
  const [openTicket, setOpenTicket] = useState<string | null>(null);
  const posterRef = useRef<HTMLImageElement | null>(null);

  const openTiers = useMemo(
    () => event.tickets.filter((t) => t.daysLeft !== null),
    [event.tickets],
  );
  const closedTiers = useMemo(
    () => event.tickets.filter((t) => t.daysLeft === null),
    [event.tickets],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = posterRef.current;
      if (!node) return;
      const offset = Math.min(60, window.scrollY * 0.08);
      node.style.transform = `translate3d(0, ${offset}px, 0) scale(1.03)`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <ScrollProgress />

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Hero */}
        <section className="grid gap-12 border-b border-border py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.28em] text-crimson">
                {event.category}
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold text-navy sm:text-6xl">
                {event.title}
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink italic">
                {event.tagline}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <dl className="mt-10 space-y-3 text-sm text-ink">
                <div className="flex items-center gap-3">
                  <Clock className="size-4 text-crimson" />
                  <dd>
                    {event.dateLabel} · {event.timeLabel}
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="size-4 text-crimson" />
                  <dd>
                    {event.venue}, {event.city}
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <Ticket className="size-4 text-crimson" />
                  <dd>Tickets from {KES(event.priceFrom)}</dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  to="/events/$slug/book"
                  params={{ slug: event.slug }}
                  className="group inline-flex items-center gap-3 bg-crimson px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-navy"
                >
                  Book now
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
                <Link to="/booking" className="rule-link text-sm text-ink hover:text-crimson">
                  Already registered? View booking
                </Link>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-12">
                <Countdown startISO={event.startISO} />
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden bg-secondary">
              <img
                ref={posterRef}
                src={event.poster}
                alt={`${event.title} poster`}
                width={900}
                height={1200}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover will-change-transform"
              />
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>{event.cpdPoints} CPD points</span>
              <span>{event.type}</span>
            </div>
          </Reveal>
        </section>

        {/* Section rail */}
        <nav className="sticky top-[57px] z-40 -mx-6 border-b border-border bg-background/90 px-6 backdrop-blur-md">
          <ul className="flex gap-7 overflow-x-auto py-4 text-sm whitespace-nowrap">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  data-active={active === s.id}
                  className={cn(
                    "rule-link transition-colors",
                    active === s.id ? "text-crimson" : "text-muted-foreground hover:text-ink",
                  )}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* About */}
        <section id="about" className="scroll-mt-32 border-b border-border py-20">
          <SectionHeading index="01" title="About this event" />
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-6">
              {event.about.map((p, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className="text-base leading-relaxed text-ink">{p}</p>
                </Reveal>
              ))}
              <Reveal delay={200}>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Organised by {event.organizer}
                </p>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <h3 className="font-display text-2xl font-semibold text-navy">
                  {event.theme.title}
                  <span className="block text-crimson italic">{event.theme.subtitle}</span>
                </h3>
              </Reveal>
              <div className="mt-6 space-y-5">
                {event.theme.body.map((p, i) => (
                  <Reveal key={i} delay={60 + i * 70}>
                    <p className="text-sm leading-relaxed text-muted-foreground">{p}</p>
                  </Reveal>
                ))}
              </div>
              <ul className="mt-10 divide-y divide-border border-y border-border">
                {event.topics.map((t, i) => (
                  <Reveal as="li" key={t} delay={i * 70}>
                    <div className="group flex items-baseline gap-5 py-4">
                      <span className="font-display text-xs text-crimson tabular-nums">
                        0{i + 1}
                      </span>
                      <span className="text-sm text-ink transition-transform duration-300 group-hover:translate-x-1">
                        {t}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Tickets */}
        <section id="tickets" className="scroll-mt-32 border-b border-border py-20">
          <SectionHeading index="02" title="Tickets" />
          <ul className="divide-y divide-border border-y border-border">
            {openTiers.map((tier, i) => (
              <Reveal as="li" key={tier.id} delay={i * 60}>
                <TicketRow
                  tier={tier}
                  slug={event.slug}
                  open={openTicket === tier.id}
                  onToggle={() => setOpenTicket(openTicket === tier.id ? null : tier.id)}
                />
              </Reveal>
            ))}
          </ul>
          <Reveal delay={120}>
            <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Closed tiers
            </p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {closedTiers.map((tier) => (
                <li
                  key={tier.id}
                  className="border border-border px-3 py-1.5 text-xs text-muted-foreground line-through"
                >
                  {tier.name} · {KES(tier.amount)}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Tours */}
        <section id="tours" className="scroll-mt-32 border-b border-border py-20">
          <SectionHeading index="03" title="Accommodation & tours" />
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <p className="text-base leading-relaxed text-ink">{event.tours.intro}</p>
              </Reveal>
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {event.tours.items.map((item, i) => (
                  <Reveal as="li" key={item} delay={i * 70}>
                    <div className="py-4 text-sm text-ink">{item}</div>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={200}>
                <a
                  href={event.tours.signupUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 border border-navy px-6 py-3 text-xs uppercase tracking-[0.18em] text-navy transition-colors hover:bg-navy hover:text-background"
                >
                  Sign up for tours
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <a href={event.tours.signupUrl} target="_blank" rel="noreferrer" className="block overflow-hidden bg-secondary">
                <img
                  src={event.tours.image}
                  alt="Pre-convention technical tours"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </a>
            </Reveal>
          </div>
        </section>

        {/* Programme */}
        <section id="programme" className="scroll-mt-32 border-b border-border py-20">
          <SectionHeading index="04" title="Programme" />
          <Reveal>
            <a
              href={event.programme.url}
              target="_blank"
              rel="noreferrer"
              className="lift group flex items-center justify-between gap-6 border border-border p-6"
            >
              <span>
                <span className="block font-display text-lg font-semibold text-navy">
                  Convention programme
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {event.programme.name}
                </span>
              </span>
              <Download className="size-5 shrink-0 text-crimson transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </Reveal>
        </section>

        {/* Speakers */}
        <section id="speakers" className="scroll-mt-32 py-20">
          <SectionHeading index="05" title="Speakers" />
          {event.speakers.length === 0 ? (
            <Reveal>
              <p className="border border-dashed border-border px-6 py-14 text-center text-sm text-muted-foreground">
                Speakers for this convention will be announced shortly.
              </p>
            </Reveal>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-3">
              {event.speakers.map((sp, i) => (
                <Reveal as="li" key={sp.name} delay={i * 70}>
                  <div className="border border-border p-6">
                    <p className="font-display text-lg text-navy">{sp.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{sp.role}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <Reveal>
      <div className="mb-10 flex items-baseline gap-5">
        <span className="font-display text-xs text-crimson tabular-nums">{index}</span>
        <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">{title}</h2>
      </div>
    </Reveal>
  );
}

function TicketRow({
  tier,
  slug,
  open,
  onToggle,
}: {
  tier: TicketTier;
  slug: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="group">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="min-w-0">
          <span className="block text-base text-navy">{tier.name}</span>
          <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {tier.audience}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-6">
          <span className="font-display text-base font-semibold tabular-nums text-navy">
            {KES(tier.amount)}
          </span>
          <span className="hidden text-xs text-success sm:inline">{tier.daysLeft} days left</span>
          {open ? (
            <Minus className="size-4 text-crimson" />
          ) : (
            <Plus className="size-4 text-muted-foreground transition-colors group-hover:text-crimson" />
          )}
        </span>
      </button>
      <div
        className={cn(
          "grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Includes full access to all convention sessions, exhibition and meals for the dates
              indicated. {tier.audience === "Members only" ? "Valid AAK membership required." : ""}
            </p>
            <Link
              to="/events/$slug/book"
              params={{ slug }}
              search={{ tier: tier.id }}
              className="border border-crimson px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-crimson transition-colors hover:bg-crimson hover:text-primary-foreground"
            >
              Select ticket
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
