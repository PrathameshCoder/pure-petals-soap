import { Ban, Droplets, Leaf, Sprout } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";
import { Reveal } from "@/components/shared/reveal";

const facts = [
  [Leaf, "100% botanical", "Cold-pressed oils, clays, milks and herbs. Nothing you can't pronounce."],
  [Ban, "No synthetics, ever", "No SLS, no parabens, no palm oil, no synthetic dye."],
  [Droplets, "Cold process, 4-week cure", "A slower method that keeps every nutrient intact."],
  [Sprout, "Wrapped in seed paper", "Plant the wrapper when you're done — it grows basil."],
] as const;

export function PromiseSection() {
  return (
    <section id="promise" className="py-[clamp(5rem,9vw,8.5rem)]">
      <div className="mx-auto grid w-[min(1200px,92vw)] gap-14 lg:grid-cols-[.32fr_1fr]">
        <aside>
          <Reveal>
            <p className="section-index">01 — Our promise</p>
            <BrandMark className="mt-16 hidden h-36 w-36 text-ink/25 lg:block" />
          </Reveal>
        </aside>
        <div>
          <h2 className="display text-[clamp(2.5rem,5vw,4.2rem)] font-normal leading-[1.04]">Pure ingredients,<br /><em>pure care.</em></h2>
          <Reveal delay={180}>
            <p className="mt-6 inline-flex rounded-full border border-gold/35 bg-gold/10 px-4 py-2 text-[.65rem] font-bold uppercase tracking-[.14em] text-gold">Batch № 047 — saffron — curing on the racks this week</p>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-7 max-w-[66ch] text-[clamp(1rem,1.4vw,1.12rem)] leading-8 text-ink/60">We make soap the slow way. Botanical oils and butters, poured in small batches, cut by hand and left to cure for four full weeks before it ever touches your shelf. No palm oil, no synthetic fragrance, no shortcuts — just an honest bar your skin can read like a short letter.</p>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {facts.map(([Icon, title, copy], index) => (
              <Reveal key={title} delay={index * 70}>
                <article className="border-t border-ink/15 pt-5">
                  <Icon className="mb-4 h-5 w-5 text-gold" strokeWidth={1.4} />
                  <h3 className="display text-2xl font-medium">{title}</h3>
                  <p className="mt-2 max-w-[35ch] text-sm leading-6 text-ink/55">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
