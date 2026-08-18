import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Minus, Plus } from "lucide-react";
import { z } from "zod";
import { findEvent, KES } from "@/lib/aak-data";
import { Reveal } from "@/components/aak/Reveal";
import { cn } from "@/lib/utils";

const searchSchema = z.object({ tier: z.string().optional() });

export const Route = createFileRoute("/events/$slug/book")({
  validateSearch: searchSchema,
  loader: ({ params }) => {
    const event = findEvent(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Booking unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `Book — ${loaderData.event.title}`;
    const description = `Select your ticket, add attendee details and confirm your place at ${loaderData.event.title}, ${loaderData.event.city}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: BookEvent,
});

const STEPS = ["Ticket", "Attendee", "Review"];

function BookEvent() {
  const { event } = Route.useLoaderData();
  const { tier: presetTier } = Route.useSearch();
  const router = useRouter();

  const openTiers = useMemo(
    () => event.tickets.filter((t) => t.daysLeft !== null),
    [event.tickets],
  );

  const [step, setStep] = useState(0);
  const [tierId, setTierId] = useState(presetTier ?? openTiers[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", membership: "" });
  const [done, setDone] = useState(false);

  const tier = openTiers.find((t) => t.id === tierId) ?? openTiers[0];
  const total = (tier?.amount ?? 0) * qty;

  const attendeeValid =
    form.name.trim().length > 1 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email);

  if (done) {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-28 text-center">
        <Reveal>
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-success/12 text-success">
            <Check className="size-6" />
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-8 font-display text-3xl font-semibold text-navy">
            Your place is reserved
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We have emailed a confirmation and payment instructions to {form.email}. Your booking
            reference is <span className="text-navy">AAK-2026-4821</span>.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="bg-crimson px-6 py-3 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-navy"
            >
              View booking
            </Link>
            <Link
              to="/"
              className="border border-navy px-6 py-3 text-xs uppercase tracking-[0.18em] text-navy transition-colors hover:bg-navy hover:text-background"
            >
              Back to event
            </Link>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <Reveal>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-crimson"
        >
          <ArrowLeft className="size-3.5" /> {event.title}
        </Link>
      </Reveal>

      <Reveal delay={70}>
        <h1 className="mt-6 font-display text-3xl font-semibold text-navy sm:text-4xl">
          Complete your registration
        </h1>
      </Reveal>

      {/* Stepper */}
      <Reveal delay={130}>
        <ol className="mt-10 flex items-center gap-4">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-4">
              <div className="flex w-full flex-col gap-2">
                <span
                  className={cn(
                    "text-[11px] uppercase tracking-[0.2em] transition-colors",
                    i <= step ? "text-crimson" : "text-muted-foreground",
                  )}
                >
                  {String(i + 1).padStart(2, "0")} {label}
                </span>
                <span className="h-[2px] w-full bg-border">
                  <span
                    className="block h-full origin-left bg-crimson transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transform: `scaleX(${i <= step ? 1 : 0})` }}
                  />
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          {step === 0 && (
            <ul className="divide-y divide-border border-y border-border">
              {openTiers.map((t, i) => (
                <Reveal as="li" key={t.id} delay={i * 60}>
                  <label className="flex cursor-pointer items-center justify-between gap-6 py-5">
                    <span className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="tier"
                        checked={tierId === t.id}
                        onChange={() => setTierId(t.id)}
                        className="size-4 accent-crimson"
                      />
                      <span>
                        <span className="block text-base text-navy">{t.name}</span>
                        <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {t.audience} · {t.daysLeft} days left
                        </span>
                      </span>
                    </span>
                    <span className="font-display text-base font-semibold tabular-nums text-navy">
                      {KES(t.amount)}
                    </span>
                  </label>
                </Reveal>
              ))}
            </ul>
          )}

          {step === 1 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {(
                [
                  { key: "name", label: "Full name", type: "text", span: true },
                  { key: "email", label: "Email address", type: "email", span: true },
                  { key: "phone", label: "Phone number", type: "tel", span: false },
                  { key: "membership", label: "AAK membership no. (optional)", type: "text", span: false },
                ] as const
              ).map((field, i) => (
                <Reveal key={field.key} delay={i * 60} className={field.span ? "sm:col-span-2" : ""}>
                  <label className="block">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {field.label}
                    </span>
                    <input
                      type={field.type}
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="mt-2 w-full border-b border-border bg-transparent py-3 text-base text-navy outline-none transition-colors focus:border-crimson"
                    />
                  </label>
                </Reveal>
              ))}
              {!attendeeValid && (
                <p className="text-xs text-muted-foreground sm:col-span-2">
                  Name and a valid email address are required to continue.
                </p>
              )}
            </div>
          )}

          {step === 2 && (
            <dl className="divide-y divide-border border-y border-border text-sm">
              {[
                ["Event", event.title],
                ["Dates", event.dateLabel],
                ["Venue", `${event.venue}, ${event.city}`],
                ["Ticket", `${tier?.name} × ${qty}`],
                ["Attendee", form.name],
                ["Email", form.email],
                ["Phone", form.phone || "—"],
                ["Membership no.", form.membership || "—"],
              ].map(([k, v], i) => (
                <Reveal as="div" key={k} delay={i * 50}>
                  <div className="flex justify-between gap-6 py-4">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right text-navy">{v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          )}

          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => (step === 0 ? router.history.back() : setStep((s) => s - 1))}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-crimson"
            >
              <ArrowLeft className="size-3.5" /> Back
            </button>
            <button
              type="button"
              onClick={() => (step === 2 ? setDone(true) : setStep((s) => s + 1))}
              disabled={step === 1 && !attendeeValid}
              className="group inline-flex items-center gap-3 bg-crimson px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-navy disabled:opacity-40 disabled:hover:bg-crimson"
            >
              {step === 2 ? "Confirm booking" : "Continue"}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Summary */}
        <Reveal delay={100} className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-border p-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Order summary
            </p>
            <p className="mt-4 font-display text-lg font-semibold text-navy">{tier?.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{event.dateLabel}</p>

            <div className="mt-6 flex items-center justify-between border-y border-border py-4">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Quantity
              </span>
              <span className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="text-muted-foreground transition-colors hover:text-crimson"
                >
                  <Minus className="size-4" />
                </button>
                <span className="font-display text-base tabular-nums text-navy">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="text-muted-foreground transition-colors hover:text-crimson"
                >
                  <Plus className="size-4" />
                </button>
              </span>
            </div>

            <div className="mt-6 flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Total
              </span>
              <span className="font-display text-2xl font-semibold tabular-nums text-navy">
                {KES(total)}
              </span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Payment instructions are issued on confirmation. {event.cpdPoints} CPD points are
              awarded on attendance.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
