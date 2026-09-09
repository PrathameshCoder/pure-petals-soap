"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw, ShoppingBag, Sparkles } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SoapBar } from "@/components/shared/soap-bar";
import { products, type Product, type SoapSize } from "@/lib/products";

type Scores = Record<string, number>;

type QuizOption = {
  label: string;
  note: string;
  scores: Scores;
};

type QuizQuestion = {
  eyebrow: string;
  title: string;
  options: QuizOption[];
};

const questions: QuizQuestion[] = [
  {
    eyebrow: "Your skin goal",
    title: "What would you like your soap to do most?",
    options: [
      { label: "Deeply hydrate", note: "For skin that feels dry or tight", scores: { honey: 4, avocado: 3, goat: 2, crimson: 1 } },
      { label: "Soothe & comfort", note: "A gentle wash for sensitive days", scores: { goat: 5, honey: 2, avocado: 1 } },
      { label: "Purify & balance", note: "For oily or congested-feeling skin", scores: { neem: 5, citrus: 2 } },
      { label: "Brighten my glow", note: "For dull or tired-looking skin", scores: { saffron: 5, crimson: 3 } },
      { label: "Feel fresh & awake", note: "A clean, energising morning reset", scores: { citrus: 5, neem: 2 } },
      { label: "Make it indulgent", note: "A rich ritual with a lingering scent", scores: { crimson: 5, saffron: 3, honey: 1 } },
    ],
  },
  {
    eyebrow: "How skin feels today",
    title: "Which description sounds most familiar?",
    options: [
      { label: "Dry or tight", note: "It asks for moisture after washing", scores: { avocado: 4, honey: 4, goat: 2 } },
      { label: "Sensitive or easily bothered", note: "Gentleness comes first", scores: { goat: 5, honey: 2 } },
      { label: "Oily or combination", note: "Some areas need more balance", scores: { neem: 5, citrus: 2 } },
      { label: "Dull or tired", note: "I want a brighter-looking ritual", scores: { saffron: 5, crimson: 3, citrus: 1 } },
      { label: "Balanced", note: "I am choosing mostly by experience", scores: { crimson: 2, citrus: 2, saffron: 1, avocado: 1 } },
    ],
  },
  {
    eyebrow: "Your kind of ritual",
    title: "What should the moment feel like?",
    options: [
      { label: "Soft & barely scented", note: "Quiet, gentle and uncomplicated", scores: { goat: 5, avocado: 2 } },
      { label: "Creamy & comforting", note: "Warm, familiar and cocooning", scores: { honey: 5, goat: 2 } },
      { label: "Green & herbal", note: "Earthy leaves and a clean finish", scores: { neem: 5, avocado: 2 } },
      { label: "Bright & citrusy", note: "Juicy, sparkling and energetic", scores: { citrus: 6 } },
      { label: "Warm & seductive", note: "Deep, plush and lingering", scores: { crimson: 6, saffron: 2 } },
      { label: "Golden & luxurious", note: "Precious spice and a creamy lather", scores: { saffron: 6, crimson: 2 } },
    ],
  },
];

const soapSizes: SoapSize[] = [45, 85];

function getRecommendation(answers: QuizOption[]) {
  const totals: Scores = {};
  for (const answer of answers) {
    for (const [productId, score] of Object.entries(answer.scores)) {
      totals[productId] = (totals[productId] ?? 0) + score;
    }
  }
  return products.reduce((best, product) => (totals[product.id] ?? 0) > (totals[best.id] ?? 0) ? product : best, products[0]);
}

export function SoapFinderSection({ onAdd }: { onAdd: (product: Product, size: SoapSize) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [selectedSize, setSelectedSize] = useState<SoapSize>(45);
  const finished = step === questions.length;
  const recommendation = useMemo(() => finished ? getRecommendation(answers) : null, [answers, finished]);
  const question = questions[step];

  function choose(option: QuizOption) {
    setAnswers((current) => [...current.slice(0, step), option]);
    setStep((current) => current + 1);
  }

  function back() {
    setStep((current) => Math.max(0, current - 1));
  }

  function restart() {
    setAnswers([]);
    setSelectedSize(45);
    setStep(0);
  }

  return (
    <section id="soap-finder" className="relative overflow-hidden py-[clamp(5rem,9vw,8.5rem)]">
      <div className="pointer-events-none absolute -right-36 top-16 h-80 w-80 rounded-full border border-ink/10" />
      <div className="pointer-events-none absolute -right-20 top-32 h-52 w-52 rounded-full border border-gold/20" />
      <div className="mx-auto w-[min(1200px,92vw)]">
        <div className="grid gap-10 lg:grid-cols-[.38fr_1fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="section-index">02 — Soap finder</p>
              <h2 className="display mt-5 text-[clamp(2.5rem,5vw,4.2rem)] font-normal leading-[1.04]">Meet your<br /><em>kind of bar.</em></h2>
              <p className="mt-6 max-w-[34ch] text-sm leading-7 text-ink/55">Three quick choices. One thoughtful match. About 15 seconds from start to soap.</p>
              <div className="mt-8 flex items-center gap-3 text-[.65rem] font-bold uppercase tracking-[.16em] text-gold"><Sparkles className="h-4 w-4" />No sign-up needed</div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="min-h-[480px] overflow-hidden rounded-[2rem] border border-ink/15 bg-paper-deep/55 shadow-[0_28px_80px_rgba(38,48,31,.08)]">
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 sm:px-9">
                <span className="text-[.65rem] font-bold uppercase tracking-[.18em] text-ink/45">{finished ? "Your match" : `Question ${step + 1} of ${questions.length}`}</span>
                <div className="flex gap-1.5" aria-label={`${Math.min(step + 1, questions.length)} of ${questions.length} steps`}>
                  {questions.map((_, index) => <span key={index} className={`h-1.5 w-8 rounded-full transition-colors duration-500 ${index <= step ? "bg-gold" : "bg-ink/12"}`} />)}
                </div>
              </div>

              {!finished && question && (
                <div key={step} className="quiz-enter p-6 sm:p-9">
                  <p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-gold">{question.eyebrow}</p>
                  <h3 className="display mt-3 max-w-[18ch] text-[clamp(2rem,4vw,3rem)] font-normal leading-tight">{question.title}</h3>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {question.options.map((option) => (
                      <button key={option.label} type="button" onClick={() => choose(option)} className="group flex min-h-24 items-center justify-between gap-5 rounded-2xl border border-ink/15 bg-paper/60 px-5 py-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-paper hover:shadow-[0_12px_30px_rgba(38,48,31,.08)] focus-visible:border-gold">
                        <span><strong className="display block text-xl font-medium">{option.label}</strong><span className="mt-1 block text-xs leading-5 text-ink/50">{option.note}</span></span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-7 min-h-9">
                    {step > 0 && <button type="button" onClick={back} className="inline-flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.16em] text-ink/45 transition hover:text-ink"><ArrowLeft className="h-4 w-4" />Previous answer</button>}
                  </div>
                </div>
              )}

              {finished && recommendation && (
                <div className="quiz-enter grid items-center gap-6 p-6 sm:p-9 md:grid-cols-[.85fr_1.15fr]">
                  <div className="relative mx-auto w-full max-w-[330px]">
                    <div className="absolute inset-[5%] rounded-full border border-ink/15" />
                    <div className="soap-float relative"><SoapBar product={recommendation} /></div>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.2em] text-gold"><Check className="h-4 w-4" />Your Pure Petals match</p>
                    <h3 className="display mt-3 text-[clamp(2.5rem,5vw,4rem)] font-normal leading-none">{recommendation.name}</h3>
                    <p className="mt-3 text-[.68rem] font-bold uppercase tracking-[.16em] text-ink/45">{recommendation.words}</p>
                    <p className="mt-5 max-w-[48ch] text-sm leading-7 text-ink/60">Based on what your skin needs and the ritual you enjoy, this bar is your strongest match. {recommendation.benefits[0]?.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2" aria-label="Choose soap size">
                      {soapSizes.map((size) => <button key={size} type="button" aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)} className={`rounded-full border px-4 py-2 text-xs font-bold tracking-[.08em] transition ${selectedSize === size ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink/60 hover:border-ink/45 hover:text-ink"}`}>{size} g · ₹{recommendation.prices[size]}</button>)}
                    </div>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <button type="button" onClick={() => onAdd(recommendation, selectedSize)} className="inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-6 text-[.68rem] font-bold uppercase tracking-[.15em] text-paper transition hover:bg-[#1a2315]">Add to bag · ₹{recommendation.prices[selectedSize]}<ShoppingBag className="h-4 w-4" /></button>
                      <a href={`#product-${recommendation.id}`} className="inline-flex min-h-12 items-center border-b border-ink/45 px-2 text-[.68rem] font-bold uppercase tracking-[.15em] text-ink/55 transition hover:text-ink">See its story</a>
                    </div>
                    <button type="button" onClick={restart} className="mt-7 inline-flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.16em] text-ink/40 transition hover:text-ink"><RotateCcw className="h-3.5 w-3.5" />Retake the quiz</button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
