"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, PaymentMode } from "@/lib/types";

interface CartState {
  items: CartItem[];
  paymentMode: PaymentMode;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  setPaymentMode: (mode: PaymentMode) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      paymentMode: "full",
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.max(1, quantity) }
              : i,
          ),
        })),
      setPaymentMode: (mode) => set({ paymentMode: mode }),
      clear: () => set({ items: [], paymentMode: "full" }),
    }),
    { name: "tornaz-cart" },
  ),
);

