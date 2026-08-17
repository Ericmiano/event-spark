import { Car, MapPin, Shirt } from "lucide-react";
import { TRAVEL_INFO } from "@/lib/site-content";
import { Reveal } from "@/components/aak/Reveal";

export function TravelInfo() {
  return (
    <section className="scroll-mt-32 border-t border-border py-20">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Travel &amp; venue</p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-navy sm:text-3xl">
          Getting to Diani
        </h2>
      </Reveal>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: MapPin, title: "Airports", body: TRAVEL_INFO.airport },
          { icon: Car, title: "Transfers", body: TRAVEL_INFO.gettingThere },
          { icon: Shirt, title: "Dress code", body: TRAVEL_INFO.dressCode },
        ].map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 70}>
            <div className="h-full rounded-2xl border border-crimson/15 bg-card p-6">
              <item.icon className="size-4 text-crimson" />
              <h3 className="mt-4 font-display text-base font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink/80">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={200}>
        <a
          href={TRAVEL_INFO.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="rule-link mt-8 inline-flex text-sm font-semibold text-crimson"
        >
          Open venue in Google Maps
        </a>
      </Reveal>
    </section>
  );
}
