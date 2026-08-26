"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

export function CartButton() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Link
      href="/cart"
      aria-label={`Cart${mounted && count > 0 ? `, ${count} items` : ", empty"}`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
    >
      <ShoppingCart size={20} strokeWidth={1.75} />
      {mounted && count > 0 && (
        <span className="absolute right-1 top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-text-on-accent">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
