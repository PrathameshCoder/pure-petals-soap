import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pure Petals — Handcrafted Botanical Soap",
  description: "Six botanical soaps, poured, cut and cured by hand. Pure ingredients, pure care.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
