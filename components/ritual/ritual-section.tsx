import { Droplets, Waves, Wind } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const steps = [
  [Waves, "Warm", "Hold the bar under warm water for a breath. Let the surface soften and wake."],
  [Droplets, "Lather", "Work it between your palms until the lather turns creamy. Thirty seconds — no rushing."],
  [Wind, "Breathe", "Cup your hands to your face and inhale. This part is not optional."],
  [Droplets, "Rinse & pat", "Rinse with cool water and pat — never rub — leaving a whisper of moisture behind."],
] as const;

export function RitualSection() {
  return (
    <section id="ritual" className="bg-ink py-[clamp(5rem,9vw,8.5rem)] text-paper">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="section-index !text-[#d9a94e] after:!bg-paper/20">03 — The ritual</p>
            <h2 className="display mt-5 text-[clamp(2.5rem,5vw,4.2rem)] font-normal leading-[1.04]">A four-minute<br /><em>ritual.</em></h2>
          </div>
          <Reveal delay={200} className="flex items-end">
            <p className="max-w-[40ch] text-sm leading-7 text-paper/55">Good soap asks for almost nothing. Give it these four minutes and it gives back the whole day.</p>
          </Reveal>
        </div>
        <div className="mt-16 grid border-y border-paper/15 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([Icon, title, copy], index) => (
            <Reveal key={title} delay={index * 100}>
              <article className="min-h-full border-b border-paper/15 px-6 py-9 sm:border-b-0 sm:border-r">
                <Icon className="h-7 w-7 text-[#d9a94e]" strokeWidth={1.3} />
                <span className="mt-12 block text-[.65rem] font-bold tracking-[.2em] text-paper/35">0{index + 1}</span>
                <h3 className="display mt-3 text-3xl font-normal">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-paper/50">{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
