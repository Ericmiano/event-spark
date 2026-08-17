import { PARTNERS } from "@/lib/site-content";
import { Reveal } from "@/components/aak/Reveal";

export function PartnerRow() {
  return (
    <section className="border-t border-border py-16">
      <Reveal>
        <p className="text-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Partners &amp; collaborators
        </p>
      </Reveal>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {PARTNERS.map((partner, i) => (
          <Reveal as="li" key={partner.name} delay={i * 70}>
            <div className="flex h-full flex-col items-center justify-center rounded-xl border border-border bg-secondary/40 px-6 py-8 text-center">
              <p className="font-display text-sm font-semibold text-navy">{partner.name}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {partner.label}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
