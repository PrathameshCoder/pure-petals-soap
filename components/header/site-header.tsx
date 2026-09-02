"use client";

import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { BrandMark } from "@/components/shared/brand-mark";

const links = [["Collection", "#collection"], ["Soap finder", "#soap-finder"], ["Ritual", "#ritual"], ["Letters", "#letters"]];

export function SiteHeader({ cartCount, onOpenCart }: { cartCount: number; onOpenCart: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-ink/15 bg-paper/85 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex h-[78px] w-[min(1320px,94vw)] items-center justify-between">
          <a href="#top" className="display flex items-center gap-2.5 text-[clamp(1.15rem,2.2vw,1.35rem)] font-medium"><BrandMark className="h-7 w-8 text-gold" /><span>Pure <em>Petals</em></span></a>
          <div className="hidden gap-10 md:flex">
            {links.map(([label, href]) => <a key={href} href={href} className="border-b border-transparent pb-1 text-[.7rem] font-bold uppercase tracking-[.2em] text-ink/60 transition hover:border-ink hover:text-ink">{label}</a>)}
          </div>
          <div className="flex items-center">
            <button onClick={onOpenCart} className="relative grid h-11 w-11 place-items-center rounded-full transition hover:bg-ink/5" aria-label="Open your bag">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && <span className="absolute right-0 top-0 grid min-h-[17px] min-w-[17px] place-items-center rounded-full bg-ink px-1 text-[.62rem] font-bold text-paper">{cartCount}</span>}
            </button>
            <button onClick={() => setMenuOpen((open) => !open)} className="grid h-11 w-11 place-items-center md:hidden" aria-label="Open menu" aria-expanded={menuOpen}>{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
      </nav>
      <div className={`fixed inset-0 z-40 flex min-h-dvh flex-col bg-paper px-8 pb-8 pt-28 transition duration-500 md:hidden ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        {links.map(([label, href], index) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="display flex items-baseline gap-5 border-b border-ink/15 py-4 text-4xl"><i className="font-sans text-[.7rem] font-bold not-italic tracking-[.2em] text-gold">0{index + 1}</i>{label}</a>)}
        <p className="mt-auto text-sm text-ink/60">hello@purepetals.in · Pune, India</p>
      </div>
    </>
  );
}
