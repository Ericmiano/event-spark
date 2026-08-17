import { CalendarDays, GraduationCap, MapPin, Ticket } from "lucide-react";
import type { AakEvent } from "@/lib/aak-data";
import { KES } from "@/lib/aak-data";
import { Reveal } from "@/components/aak/Reveal";

export function QuickFacts({ event }: { event: AakEvent }) {
  const facts = [
    { icon: CalendarDays, label: "Dates", value: event.dateLabel },
    { icon: MapPin, label: "Venue", value: `${event.venue}, ${event.city}` },
    { icon: GraduationCap, label: "CPD", value: `${event.cpdPoints} points` },
    { icon: Ticket, label: "From", value: KES(event.priceFrom) },
  ];

  return (
    <section className="py-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact, i) => (
          <Reveal key={fact.label} delay={i * 60}>
            <div className="flex items-start gap-4 rounded-2xl border border-crimson/15 bg-card p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-crimson-soft text-crimson">
                <fact.icon className="size-4" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{fact.label}</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-navy">{fact.value}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
