import { Mic2 } from "lucide-react";
import { SPEAKERS_COMING_SOON } from "@/lib/site-content";
import { Reveal } from "@/components/aak/Reveal";

export function SpeakersComingSoon() {
  return (
    <div className="rounded-2xl border-2 border-crimson/15 bg-secondary/30 p-8 sm:p-10">
      <Reveal>
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-crimson-soft text-crimson">
            <Mic2 className="size-5" />
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold text-navy sm:text-2xl">
              {SPEAKERS_COMING_SOON.headline}
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/80">
              {SPEAKERS_COMING_SOON.description}
            </p>
            <p className="mt-4 text-sm font-semibold text-crimson">
              Expected announcement: {SPEAKERS_COMING_SOON.expectedBy}
            </p>
          </div>
        </div>
      </Reveal>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {SPEAKERS_COMING_SOON.previewTopics.map((topic, i) => (
          <Reveal as="li" key={topic} delay={80 + i * 50}>
            <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-ink">
              {topic}
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
