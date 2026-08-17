import { Award, Network, Sparkles } from "lucide-react";
import { WHY_ATTEND } from "@/lib/site-content";
import { Reveal } from "@/components/aak/Reveal";

const ICONS = [Award, Network, Sparkles] as const;

export function WhyAttend() {
  return (
    <section className="border-y border-border py-20">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Why attend</p>
        <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold text-navy sm:text-3xl">
          Built for professionals who shape places
        </h2>
      </Reveal>
      <ul className="mt-10 grid gap-6 sm:grid-cols-3">
        {WHY_ATTEND.map((item, i) => {
          const Icon = ICONS[i] ?? Sparkles;
          return (
            <Reveal as="li" key={item.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-crimson/15 bg-card p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-crimson-soft text-crimson">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink/80">{item.description}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
