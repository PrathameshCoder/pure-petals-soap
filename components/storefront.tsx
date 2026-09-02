"use client";

import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CollectionSection } from "@/components/collection/collection-section";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/header/site-header";
import { Hero } from "@/components/hero/hero";
import { LettersSection } from "@/components/newsletter/letters-section";
import { SoapFinderSection } from "@/components/quiz/soap-finder-section";
import { ProductMarquee } from "@/components/shared/product-marquee";
import { QuoteSection } from "@/components/testimonial/quote-section";
import { RitualSection } from "@/components/ritual/ritual-section";
import type { Product } from "@/lib/products";

export function Storefront() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [message, setMessage] = useState("");
  const count = useMemo(() => Object.values(cart).reduce((sum, quantity) => sum + quantity, 0), [cart]);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  function notify(nextMessage: string) {
    setMessage(nextMessage);
    window.setTimeout(() => setMessage(""), 2800);
  }

  function add(product: Product) {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
    notify(`${product.name} — added to your bag`);
  }

  function change(id: string, amount: number) {
    setCart((current) => {
      const next = { ...current, [id]: (current[id] ?? 0) + amount };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }

  function checkout() {
    if (!count) { notify("Your bag is still empty"); return; }
    setCart({}); setCartOpen(false); notify("Order placed — thank you for choosing pure.");
  }

  return (
    <main className="overflow-x-clip">
      <SiteHeader cartCount={count} onOpenCart={() => setCartOpen(true)} />
      <Hero />
      <ProductMarquee />
      <CollectionSection onAdd={add} />
      <SoapFinderSection onAdd={add} />
      <RitualSection />
      <QuoteSection />
      <LettersSection onMessage={notify} />
      <SiteFooter />
      <CartDrawer open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} onChange={change} onCheckout={checkout} />
      {message && <div role="status" aria-live="polite" className="fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-5 py-3 text-xs font-semibold text-paper shadow-xl"><Check className="h-4 w-4 text-[#d9a94e]" />{message}</div>}
    </main>
  );
}
