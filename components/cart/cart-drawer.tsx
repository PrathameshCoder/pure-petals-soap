"use client";

import { Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { SoapBar } from "@/components/shared/soap-bar";
import type { Cart } from "@/lib/cart";
import { products } from "@/lib/products";

export function CartDrawer({ open, cart, onClose, onChange, onCheckout }: { open: boolean; cart: Cart; onClose: () => void; onChange: (key: string, amount: number) => void; onCheckout: () => void }) {
  const items = Object.entries(cart).flatMap(([key, line]) => {
    const product = products.find((candidate) => candidate.id === line.productId);
    return product ? [{ key, line, product }] : [];
  });
  const total = items.reduce((sum, { line, product }) => sum + product.prices[line.size] * line.quantity, 0);

  return (
    <div className={`fixed inset-0 z-[70] transition ${open ? "visible" : "invisible delay-500"}`}>
      <button className={`absolute inset-0 bg-ink/45 backdrop-blur-sm transition duration-500 ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} aria-label="Close shopping bag" />
      <aside role="dialog" aria-modal="true" aria-label="Shopping bag" className={`absolute bottom-0 right-0 top-0 flex w-full max-w-[440px] flex-col bg-paper shadow-2xl transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-ink/15 px-6 py-6"><h2 className="display text-4xl font-normal">Your bag</h2><button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-ink/15" aria-label="Close bag"><X className="h-4 w-4" /></button></div>
        <div className="flex-1 overflow-y-auto px-6">
          {!items.length ? <div className="grid h-full place-items-center text-center"><div><ShoppingBag className="mx-auto h-8 w-8 text-gold" strokeWidth={1.3} /><p className="display mt-5 text-3xl">Every petal awaits.</p><button onClick={onClose} className="mt-3 text-xs font-bold uppercase tracking-[.16em] underline">Browse the collection</button></div></div> : items.map(({ key, line, product }) => <div key={key} className="flex gap-4 border-b border-ink/15 py-5"><div className="grid h-20 w-24 place-items-center overflow-hidden"><SoapBar product={product} /></div><div className="flex-1"><h3 className="display text-2xl">{product.name}</h3><p className="mt-1 text-xs text-ink/50">₹{product.prices[line.size]} · {line.size} g</p><div className="mt-3 flex w-fit items-center rounded-full border border-ink/15"><button onClick={() => onChange(key, -1)} className="p-2" aria-label={`Decrease ${product.name}, ${line.size} grams`}><Minus className="h-3 w-3" /></button><span className="min-w-7 text-center text-xs font-bold">{line.quantity}</span><button onClick={() => onChange(key, 1)} className="p-2" aria-label={`Increase ${product.name}, ${line.size} grams`}><Plus className="h-3 w-3" /></button></div></div><span className="text-sm font-bold">₹{product.prices[line.size] * line.quantity}</span></div>)}
        </div>
        <div className="border-t border-ink/15 p-6"><div className="flex items-end justify-between"><span className="text-sm">Subtotal</span><strong className="display text-3xl font-normal">₹{total}</strong></div><p className="mt-2 text-xs leading-5 text-ink/50">{total >= 499 ? "Free courier unlocked — wrapped in seed paper." : `₹${499 - total} away from free courier — wrapped in seed paper.`}</p><button onClick={onCheckout} className="mt-5 flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-ink text-[.7rem] font-bold uppercase tracking-[.16em] text-paper">Checkout <Check className="h-4 w-4" /></button></div>
      </aside>
    </div>
  );
}
