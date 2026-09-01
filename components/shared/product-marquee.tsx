import { Leaf } from "lucide-react";
import { products } from "@/lib/products";

export function ProductMarquee() {
  return (
    <div className="overflow-hidden border-y border-ink/15 bg-paper py-5">
      <div className="marquee-track flex w-max">
        {[0, 1].map((group) => (
          <div key={group} className="flex items-center gap-12 pr-12">
            {products.map((product) => (
              <span key={`${group}-${product.id}`} className="display flex items-center gap-12 whitespace-nowrap text-[clamp(1.3rem,2.4vw,1.9rem)] italic">
                <Leaf className="h-4 w-4 text-gold" />
                {product.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
