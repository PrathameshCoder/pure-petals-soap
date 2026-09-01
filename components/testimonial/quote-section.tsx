"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/shared/reveal";

const quote = " It lathers easily and isn't harsh on the skin. I feel fresh after using it. Great product! Please stock up. I will be back for repeat orders.";
const words = quote.split(" ");

export function QuoteSection() {
  const ref = useRef<HTMLQuoteElement>(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.88 - rect.top) / (rect.height + window.innerHeight * 0.45)));
      setLit(Math.round(progress * words.length));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="py-[clamp(6rem,12vw,11rem)]">
      <div className="relative mx-auto w-[min(1000px,88vw)]">
        <span className="display absolute -left-4 -top-20 text-[10rem] leading-none text-gold/30">“</span>
        <blockquote ref={ref} className="display relative text-[clamp(2rem,5vw,4.2rem)] leading-[1.16]">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className={`transition-colors duration-500 ${index < lit ? "text-ink" : "text-ink/18"}`}>{word}{" "}</span>
          ))}
        </blockquote>
        <Reveal><p className="mt-10 text-[.68rem] font-bold uppercase tracking-[.18em] text-ink/45">— Swati Narasimhan · Pune · Avocado</p></Reveal>
      </div>
    </section>
  );
}
