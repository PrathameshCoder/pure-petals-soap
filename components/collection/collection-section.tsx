"use client";

import { useState, type MouseEvent } from "react";
import { ChevronDown, Droplets, Leaf, ShoppingBag, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SoapBar } from "@/components/shared/soap-bar";
import { products, type Product } from "@/lib/products";

export function CollectionSection({ onAdd }: { onAdd: (product: Product) => void }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ product: Product; x: number; y: number } | null>(null);

  function movePreview(event: MouseEvent, product: Product) {
    setPreview({ product, x: Math.min(event.clientX + 32, window.innerWidth - 260), y: Math.max(72, Math.min(event.clientY - 110, window.innerHeight - 210)) });
  }

  return (
    <section id="collection" className="bg-paper-deep py-[clamp(5rem,9vw,8.5rem)]">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div><Reveal><p className="section-index">02 — The collection</p></Reveal><h2 className="display mt-5 text-[clamp(2.4rem,5vw,4.2rem)] font-normal leading-[1.04]">Six bars,<br /><em>six temperaments.</em></h2></div>
          <Reveal delay={200} className="hidden text-right text-sm leading-6 text-ink/50 md:block">Hover a bar to preview it<br />click to read its story</Reveal>
        </div>
        <div className="border-t border-ink/20">
          {products.map((product, index) => {
            const open = openId === product.id;
            return (
              <Reveal key={product.id} delay={index * 60}>
                <article className="border-b border-ink/20">
                  <button className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[4rem_1.1fr_1fr_4rem_auto] md:py-8" onClick={() => { setOpenId(open ? null : product.id); setPreview(null); }} onMouseEnter={(event) => { if (!open) movePreview(event, product); }} onMouseMove={(event) => { if (!open) movePreview(event, product); }} onMouseLeave={() => setPreview(null)} aria-expanded={open}>
                    <span className="text-[.66rem] font-bold tracking-[.2em] text-gold">{String(index + 1).padStart(2, "0")}</span>
                    <span className="display text-[clamp(1.8rem,4vw,3.4rem)] leading-none">{product.name}</span>
                    <span className="hidden text-[.7rem] font-bold uppercase tracking-[.15em] text-ink/45 md:block">{product.words}</span>
                    <span className="hidden text-[.7rem] font-bold uppercase tracking-[.12em] text-ink/45 md:block">45 g</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-ink/20"><ChevronDown className={`h-4 w-4 transition duration-500 ${open ? "rotate-180" : ""}`} /></span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-700 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="grid gap-10 pb-12 pl-0 md:grid-cols-[1.15fr_.85fr] md:pl-16">
                        <div>
                          <p className="max-w-[58ch] text-base leading-8 text-ink/65">{product.description}</p>
                          <ul className="mt-7 grid gap-4 sm:grid-cols-3">
                            {product.benefits.map((benefit, benefitIndex) => {
                              const Icon = [Droplets, Sparkles, Leaf][benefitIndex];
                              return <li key={benefit.title} className="border-t border-ink/15 pt-4"><Icon className="mb-3 h-5 w-5 text-gold" strokeWidth={1.4} /><strong className="display text-xl font-medium">{benefit.title}</strong><p className="mt-1 text-xs leading-5 text-ink/55">{benefit.description}</p></li>;
                            })}
                          </ul>
                          <div className="mt-7"><span className="text-[.65rem] font-bold uppercase tracking-[.18em] text-ink/45">Key ingredients</span><div className="mt-3 flex flex-wrap gap-2">{product.ingredients.map((ingredient) => <span key={ingredient} className="rounded-full border border-ink/15 px-3 py-2 text-[.65rem] font-bold uppercase tracking-[.1em]">{ingredient}</span>)}</div></div>
                          <div className="mt-8 flex items-center gap-6"><span className="display text-3xl">₹{product.price}</span><button onClick={() => onAdd(product)} className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-6 text-[.7rem] font-bold uppercase tracking-[.15em] text-paper transition hover:bg-[#1a2315]">Add to bag <ShoppingBag className="h-4 w-4" /></button></div>
                        </div>
                        <div className="relative mx-auto flex w-full max-w-[390px] items-center"><div className="absolute inset-[7%] rounded-full border border-ink/15" /><div className="soap-float relative"><SoapBar product={product} /></div></div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
      {preview && <div className="pointer-events-none fixed left-0 top-0 z-40 hidden w-56 transition-transform duration-100 lg:block" style={{ transform: `translate3d(${preview.x}px,${preview.y}px,0)` }}><SoapBar product={preview.product} /></div>}
    </section>
  );
}
