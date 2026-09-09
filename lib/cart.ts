import type { SoapSize } from "@/lib/products";

export type CartLine = {
  productId: string;
  size: SoapSize;
  quantity: number;
};

export type Cart = Record<string, CartLine>;

export function getCartKey(productId: string, size: SoapSize) {
  return `${productId}:${size}`;
}
