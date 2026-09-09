"use client";

import { useState, type PointerEvent } from "react";
import { ArrowRight, Leaf } from "lucide-react";
import { SoapBar } from "@/components/shared/soap-bar";
import { products } from "@/lib/products";

const petals = [
  [4, 16, -2, 22], [13, 21, -8, 16], [22, 15, -4, 11], [34, 24, -11, 20], [45, 18, -7, 14], [56, 23, -16, 18],
  [67, 17, -12, 12], [75, 20, -5, 17], [83, 14, -13, 13], [91, 22, -9, 19], [29, 19, -19, 15], [61, 16, -3, 10],
];

export function Hero() {
  const crimson = products.find((product) => product.id === "crimson") ?? products[0];
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 2 - 1;
    const y = (event.clientY - rect.top) / rect.height * 2 - 1;
    setTilt({ x: y * -6, y: x * 8 });
  }

  return (
    <header id="top" onPointerMove={onMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })} className="relative flex min-h-svh items-center overflow-hidden px-[4vw] pb-16 pt-32">
      <div className="pointer-events-none absolute inset-0">
        {petals.map(([left, duration, delay, size], index) => <span key={index} className="petal absolute -top-8 block rounded-[75%_25%_70%_30%] bg-gold/25" style={{ left: `${left}%`, width: size, height: size * 1.4, animationDuration: `${duration}s`, animationDelay: `${delay}s` }} />)}
      </div>
      <div className="relative z-10 mx-auto grid w-[min(1200px,92vw)] items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <div className="hero-enter">
          <p className="flex items-center gap-3 text-[.7rem] font-bold uppercase tracking-[.24em] text-ink/60"><Leaf className="h-4 w-4 text-gold" />Handcrafted botanical soap · small batch</p>
          <h1 className="display my-7 text-[clamp(3.3rem,7vw,6.2rem)] font-normal leading-[.98] tracking-[-.025em]">Every skin<br />is <em className="text-gold">unique.</em></h1>
          <p className="max-w-[44ch] text-[clamp(1rem,1.4vw,1.1rem)] leading-8 text-ink/60">Seven botanical soaps, poured, cut and cured by hand in our Pune workshop. Pure ingredients, pure care — pressed into every 45-gram bar.</p>
          <div className="my-9 flex flex-wrap items-center gap-7">
            <a href="#collection" className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-7 text-[.72rem] font-bold uppercase tracking-[.16em] text-paper transition hover:bg-[#1a2315]">Explore the collection <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
            <a href="#ritual" className="border-b border-ink/60 py-2 text-[.72rem] font-bold uppercase tracking-[.16em] text-ink/60 hover:text-ink">Our ritual</a>
          </div>
          <ul className="flex list-none flex-wrap gap-x-6 gap-y-3 text-[.68rem] font-bold uppercase tracking-[.16em] text-ink/60">
            {["7 botanical blends", "45 g & 85 g bars", "4-week cure", "Zero synthetics"].map((item, index) => <li key={item} className={index ? "border-l border-ink/15 pl-6" : ""}>{item}</li>)}
          </ul>
        </div>
        <div className="relative mx-auto flex w-full max-w-[560px] flex-col items-center [perspective:1100px]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(32rem,96%)] -translate-x-1/2 -translate-y-[56%] rounded-full border border-ink/20" />
          <div className="w-[min(27rem,92%)] transition-transform duration-300 ease-out [transform-style:preserve-3d]" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}><div className="soap-float"><SoapBar product={crimson} /></div></div>
          <div className="badge-spin absolute bottom-[8%] left-0 grid aspect-square w-[clamp(92px,13vw,150px)] place-items-center rounded-full border border-ink/20 text-center text-[.57rem] font-bold uppercase tracking-[.2em] text-ink/55"><span>Handmade<br />· cold process ·<br />small batch</span><Leaf className="absolute h-5 w-5 text-gold" /></div>
          <p className="mt-6 flex items-center gap-4 text-[.66rem] font-bold uppercase tracking-[.2em] text-ink/40 before:h-px before:w-9 before:bg-ink/15">New Pour· Crimson Seduction — newly launched</p>
        </div>
      </div>
    </header>
  );
}
