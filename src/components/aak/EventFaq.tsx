import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/site-content";
import { Reveal } from "@/components/aak/Reveal";

export function EventFaq() {
  return (
    <section className="py-20">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">FAQ</p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-navy sm:text-3xl">
          Common questions
        </h2>
      </Reveal>
      <Reveal delay={80}>
        <Accordion type="single" collapsible className="mt-8 divide-y divide-border rounded-2xl border-2 border-crimson/15">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={item.question} value={`faq-${i}`} className="border-0 px-6">
              <AccordionTrigger className="py-5 text-left text-base font-semibold text-navy hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-ink/80">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
