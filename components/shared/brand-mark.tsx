import type { SVGProps } from "react";

export function BrandMark({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 40" fill="none" aria-hidden="true" className={className} {...props}>
      <path d="M24 22C16.5 17.5 15.2 9.5 17.1 3.4C23.9 6.2 27 12.9 24 22Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23.7 27.1C15.6 28.3 9 23.7 6.2 17.1C13.3 14.9 20.6 18.6 23.7 27.1Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.5 25.7C27.2 17.5 34.1 13.3 41.4 14.5C39.5 21.5 33 26.9 24.5 25.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 21.5V36.2M17.2 22.2L24 27.3M31.8 20.3L24 27.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
