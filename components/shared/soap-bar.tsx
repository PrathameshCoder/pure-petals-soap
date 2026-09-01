import { useId } from "react";
import { BrandMark } from "@/components/shared/brand-mark";
import type { Product } from "@/lib/products";

const barPath = "M43 15 C111 8, 208 8, 277 16 C296 18, 307 30, 309 50 C313 88, 312 151, 307 181 C303 201, 287 209, 264 210 C194 214, 116 213, 57 208 C31 206, 16 196, 13 174 C9 137, 9 82, 13 49 C15 30, 25 18, 43 15 Z";

export function SoapBar({ product, className = "" }: { product: Product; className?: string }) {
  const rawId = useId();
  const id = rawId.replaceAll(":", "");

  return (
    <svg className={`h-auto w-full drop-shadow-[0_30px_35px_rgba(38,48,31,.18)] ${className}`} viewBox="0 0 320 220" role="img" aria-label={`${product.name} soap bar`}>
      <defs>
        <clipPath id={`${id}-clip`}><path d={barPath} /></clipPath>
        <filter id={`${id}-grain`}><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" /></filter>
      </defs>
      <path d={barPath} fill={product.base} />
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="320" height="220" filter={`url(#${id}-grain)`} opacity=".045" />
        <ellipse cx="115" cy="42" rx="125" ry="54" fill="#fff" opacity=".2" />
        <path d="M48 19 C116 12, 207 12, 274 20" fill="none" stroke="#fff" strokeOpacity=".42" strokeWidth="3" strokeLinecap="round" />
      </g>
      <path d={barPath} fill="none" stroke={product.dark} strokeOpacity=".18" strokeWidth="1.25" />
      <foreignObject x="139" y="57" width="42" height="36"><BrandMark className="h-full w-full text-[#b1882c]" /></foreignObject>
      <text x="160" y="122" textAnchor="middle" fontFamily="Karla,Arial,sans-serif" fontSize="18" fontWeight="500" letterSpacing="4.2" fill="#b1882c">PURE</text>
      <text x="160" y="145" textAnchor="middle" fontFamily="Karla,Arial,sans-serif" fontSize="18" fontWeight="500" letterSpacing="4.2" fill="#b1882c">PETALS</text>
    </svg>
  );
}
