"use client";

import Link from "next/link";
import { Minus, Plus, ShieldCheck, ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { deliveryFee } from "@/lib/payment";
import { formatNaira } from "@/lib/format";
import { ProductImage } from "@/components/product-image";
import { LinkButton } from "@/components/button";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  const fee = deliveryFee(items);
  const total = subtotal + fee;

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-bg-muted">
          <ShoppingCart size={28} strokeWidth={1.75} className="text-text-tertiary" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-text-heading">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-text-tertiary">
          Browse the marketplace and add something you need.
        </p>
        <LinkButton href="/products" variant="accent" size="lg" className="mt-6">
          Shop products
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-text-heading">
        Your cart
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.productId}
              className="flex gap-4 rounded-xl border border-border bg-surface p-3 sm:p-4"
            >
              <Link
                href={`/products/${item.slug}`}
                className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-bg-muted sm:h-24 sm:w-24"
              >
                <ProductImage src={item.image} alt={item.name} />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="line-clamp-2 text-sm font-medium text-text-primary hover:text-text-heading"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-text-tertiary">
                      {item.productType === "digital" ? "Digital" : "Physical"}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold tabular-nums text-text-heading">
                    {formatNaira(item.price * item.quantity)}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-md border border-border">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => setQuantity(item.productId, item.quantity - 1)}
                      className="inline-flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
                    >
                      <Minus size={14} strokeWidth={1.75} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold tabular-nums text-text-primary">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => setQuantity(item.productId, item.quantity + 1)}
                      className="inline-flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
                    >
                      <Plus size={14} strokeWidth={1.75} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-state-danger transition-colors hover:bg-state-danger/10"
                  >
                    <Trash2 size={14} strokeWidth={1.75} />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold text-text-heading">Order summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-text-secondary">Subtotal</dt>
              <dd className="font-medium tabular-nums text-text-primary">
                {formatNaira(subtotal)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">Delivery</dt>
              <dd className="font-medium tabular-nums text-text-primary">
                {fee === 0 ? "Free" : formatNaira(fee)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <dt className="font-semibold text-text-heading">Total</dt>
              <dd className="font-semibold tabular-nums text-text-heading">
                {formatNaira(total)}
              </dd>
            </div>
          </dl>
          <LinkButton href="/checkout" variant="accent" size="lg" className="mt-6 w-full">
            Proceed to checkout
          </LinkButton>
          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-text-tertiary">
            <ShieldCheck size={14} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary" />
            Pay in full or spread it with Pay Small Small. Your payment is held
            by Tornaz until your order is delivered.
          </p>
        </aside>
      </div>
    </div>
  );
}
