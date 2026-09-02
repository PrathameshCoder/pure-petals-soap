"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, ChevronDown, LoaderCircle, Mail } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

type Intent = "" | "newsletter" | "query";
type SubmitState = "idle" | "sending" | "success" | "error";

export function ContactSection({ onMessage }: { onMessage: (message: string) => void }) {
  const [intent, setIntent] = useState<Intent>("");
  const [intentOpen, setIntentOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const intentMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeIntentMenu(event: PointerEvent) {
      if (!intentMenuRef.current?.contains(event.target as Node)) setIntentOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIntentOpen(false);
    }

    document.addEventListener("pointerdown", closeIntentMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeIntentMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const selectedIntent = intent;

    if (!selectedIntent) {
      setSubmitState("error");
      setFeedback("Please choose newsletter or query.");
      setIntentOpen(true);
      return;
    }

    setSubmitState("sending");
    setFeedback("");

    try {
      const formData = new FormData(form);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json() as { message?: string };

      if (!response.ok) throw new Error(result.message || "Something went wrong. Please try again.");

      const successMessage = selectedIntent === "newsletter"
        ? "You’re on the Pure Petals list. Welcome to the garden."
        : "Your note has reached the workshop. We’ll reply soon.";

      form.reset();
      setIntent("");
      setSubmitState("success");
      setFeedback(successMessage);
      onMessage(successMessage);
    } catch (error) {
      setSubmitState("error");
      setFeedback(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  const fieldClass = "contact-field w-full border-b border-ink/20 bg-transparent px-0 py-4 text-sm text-ink outline-none placeholder:text-ink/35";
  const intentLabel = intent === "newsletter" ? "I want to join the newsletter" : intent === "query" ? "I have a query" : "Select one";

  return (
    <section id="contact" className="border-t border-ink/15 py-[clamp(5rem,9vw,8.5rem)]">
      <div className="mx-auto grid w-[min(1200px,92vw)] gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="section-index">04 — Contact</p>
          <h2 className="display mt-5 text-[clamp(2.5rem,5vw,4.2rem)] font-normal leading-[1.04]">A note to<br /><em>the workshop.</em></h2>
          <Reveal delay={160}>
            <p className="mt-7 max-w-[42ch] text-base leading-8 text-ink/60">Ask us about a bar, an order, or simply join our monthly letters for batch announcements and skincare notes.</p>
            <a href="mailto:purepetalsindia@gmail.com" className="mt-8 inline-flex items-center gap-3 text-sm text-ink/55 transition hover:text-ink"><Mail className="h-4 w-4 text-gold" />purepetalsindia@gmail.com</a>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <form onSubmit={submit} className="rounded-[2rem] border border-ink/15 bg-paper-deep/55 p-6 shadow-[0_24px_70px_rgba(38,48,31,.07)] sm:p-9">
            <div className="grid gap-x-8 sm:grid-cols-2">
              <label className="block">
                <span className="text-[.63rem] font-bold uppercase tracking-[.18em] text-ink/45">Your name</span>
                <input className={fieldClass} required name="name" type="text" autoComplete="name" maxLength={80} placeholder="How should we address you?" />
              </label>
              <label className="mt-7 block sm:mt-0">
                <span className="text-[.63rem] font-bold uppercase tracking-[.18em] text-ink/45">Email address</span>
                <input className={fieldClass} required name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" />
              </label>
            </div>

            <div className="relative mt-7" ref={intentMenuRef}>
              <span id="intent-label" className="text-[.63rem] font-bold uppercase tracking-[.18em] text-ink/45">What brings you here?</span>
              <input type="hidden" name="intent" value={intent} />
              <button
                type="button"
                className={`${fieldClass} flex cursor-pointer items-center justify-between text-left ${intent ? "text-ink" : "text-ink/35"}`}
                aria-labelledby="intent-label intent-value"
                aria-haspopup="listbox"
                aria-expanded={intentOpen}
                data-open={intentOpen}
                onClick={() => setIntentOpen((open) => !open)}
              >
                <span id="intent-value">{intentLabel}</span>
                <ChevronDown className={`h-4 w-4 text-ink/45 transition-transform duration-300 ${intentOpen ? "rotate-180" : ""}`} />
              </button>
              {intentOpen && (
                <div role="listbox" aria-labelledby="intent-label" className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-ink/12 bg-paper py-2 shadow-[0_18px_45px_rgba(38,48,31,.13)]">
                  {([
                    ["newsletter", "Join the newsletter", "Monthly batch notes and first pours"],
                    ["query", "I have a query", "Products, orders or anything else"],
                  ] as const).map(([value, label, note]) => (
                    <button
                      key={value}
                      type="button"
                      role="option"
                      aria-selected={intent === value}
                      onClick={() => { setIntent(value); setIntentOpen(false); setFeedback(""); setSubmitState("idle"); }}
                      className="flex w-full items-center justify-between gap-5 px-5 py-3.5 text-left transition hover:bg-ink/[.045] focus-visible:bg-ink/[.045] focus-visible:outline-none"
                    >
                      <span><strong className="display block text-lg font-medium">{label}</strong><span className="mt-0.5 block text-xs text-ink/45">{note}</span></span>
                      {intent === value && <Check className="h-4 w-4 shrink-0 text-gold" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <label className="mt-7 block">
              <span className="text-[.63rem] font-bold uppercase tracking-[.18em] text-ink/45">Your note {intent !== "query" && <span className="font-normal normal-case tracking-normal">(optional)</span>}</span>
              <textarea className={`${fieldClass} min-h-28 resize-y leading-6`} required={intent === "query"} name="message" maxLength={2000} placeholder={intent === "newsletter" ? "Anything you’d like us to know?" : "Tell us what’s on your mind..."} />
            </label>

            <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>

            <div className="mt-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <p className={`min-h-5 text-xs leading-5 ${submitState === "error" ? "text-[#8d332d]" : "text-ink/50"}`} role="status" aria-live="polite">
                {submitState === "success" && <Check className="mr-2 inline h-4 w-4 text-gold" />}{feedback || "Your details stay private. No noise, ever."}
              </p>
              <button disabled={submitState === "sending"} type="submit" className="group inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full bg-ink px-6 text-[.68rem] font-bold uppercase tracking-[.15em] text-paper transition hover:bg-[#1a2315] disabled:cursor-wait disabled:opacity-60">
                {submitState === "sending" ? <><LoaderCircle className="h-4 w-4 animate-spin" />Sending</> : <>{intent === "newsletter" ? "Join the list" : "Send note"}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
