"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

export function LettersSection({ onMessage }: { onMessage: (message: string) => void }) {
  const [done, setDone] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDone(true);
    onMessage("Welcome to the garden.");
  }

  return (
    <section id="letters" className="border-t border-ink/15 py-[clamp(5rem,9vw,8.5rem)]">
      <div className="mx-auto grid w-[min(1200px,92vw)] gap-12 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="section-index">04 — Letters</p>
          <h2 className="display mt-5 text-[clamp(2.5rem,5vw,4.2rem)] font-normal leading-[1.04]">Letters from<br /><em>the workshop.</em></h2>
          <Reveal delay={200}>
            <p className="mt-7 max-w-[55ch] text-base leading-8 text-ink/60">Batch announcements, skincare notes and first dibs on limited pours — like this month's crimson seduction. One letter a month, written by hand first. No noise, ever.</p>
          </Reveal>
        </div>
        <Reveal delay={300}>
          {done ? (
            <div className="flex items-center gap-3 border-b border-ink pb-5 text-sm font-semibold"><Check className="h-5 w-5 text-gold" />Welcome to the garden — your first letter arrives soon.</div>
          ) : (
            <form onSubmit={submit} className="flex border-b border-ink">
              <input required type="email" autoComplete="email" placeholder="you@example.com" aria-label="Your email address" className="min-w-0 flex-1 bg-transparent py-5 text-base outline-none placeholder:text-ink/35" />
              <button className="group flex items-center gap-3 px-2 text-[.7rem] font-bold uppercase tracking-[.16em]">Subscribe <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></button>
            </form>
          )}
          <p className="mt-3 text-[.68rem] text-ink/40">Unsubscribe anytime · we'd never sell your address</p>
        </Reveal>
      </div>
    </section>
  );
}
