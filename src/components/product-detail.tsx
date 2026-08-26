"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BadgeCheck, Check, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import type { Product, PaymentMode } from "@/lib/types";
import { useCartStore } from "@/lib/cart-store";
import { formatNaira } from "@/lib/format";
import { buildPaymentSchedule } from "@/lib/payment";
import { ProductImage } from "@/components/product-image";
import { Price } from "@/components/price";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const setPaymentMode = useCartStore((s) => s.setPaymentMode);

  const eligible = product.paySmallSmall && product.productType === "physical";
  const [mode, setMode] = useState<PaymentMode>(eligible ? "full" : "full");
  const [added, setAdded] = useState(false);

  const schedule = buildPaymentSchedule(product.price, mode);

  function handleAdd(goToCheckout: boolean) {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        productType: product.productType,
      },
      1,
    );
    setPaymentMode(mode);
    if (goToCheckout) {
      router.push("/checkout");
    } else {
      setAdded(true);
      window.setTimeout(() => setAdded(false), 2000);
    }
  }

  const firstInstallment = schedule[0]?.amount ?? product.price;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Image */}
      <div>
        <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-bg-muted">
          <ProductImage src={product.image} alt={product.name} priority />
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="text-sm text-text-tertiary">
          Sold by{" "}
          <span className="font-medium text-text-primary">{product.seller}</span>
          {product.sellerVerified && (
            <BadgeCheck
              size={16}
              strokeWidth={1.75}
              className="ml-1 inline text-primary"
              aria-label="Verified seller"
            />
          )}
        </p>
        <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-text-heading md:text-3xl">
          {product.name}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {product.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Price value={product.price} originalPrice={product.originalPrice} className="text-2xl" />
          <span className="text-xs text-text-tertiary">Price includes VAT</span>
          {product.stock === "low_stock" && <Badge variant="danger">Low stock</Badge>}
          {product.productType === "digital" && <Badge variant="accent">Digital</Badge>}
        </div>

        {/* Payment mode */}
        {eligible && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-text-heading">
              How would you like to pay?
            </p>
            <div className="mt-3 space-y-3">
              <PaymentOption
                selected={mode === "full"}
                title="Pay in full"
                sub={`·  Delivered after payment confirmed`}
                amount={`${formatNaira(product.price)} once`}
                onSelect={() => setMode("full")}
              />
              <PaymentOption
                selected={mode === "pay_small_small"}
                title="Pay small small"
                sub="·  Spread across 60 days"
                amount={`3 payments from ${formatNaira(firstInstallment)}`}
                onSelect={() => setMode("pay_small_small")}
              />
            </div>
          </div>
        )}

        {!eligible && product.productType === "digital" && (
          <div className="mt-6 rounded-xl border border-border bg-bg-sunken px-4 py-3 text-sm text-text-secondary">
            Digital — opens in your library right after payment.
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={() => handleAdd(false)}
            aria-live="polite"
          >
            {added ? (
              <>
                <Check size={20} strokeWidth={2} /> Added to cart
              </>
            ) : (
              <>
                <ShoppingCart size={20} strokeWidth={1.75} /> Add to cart
              </>
            )}
          </Button>
          <Button variant="accent" size="lg" className="flex-1" onClick={() => handleAdd(true)}>
            Buy now
          </Button>
        </div>

        <p className="mt-4 flex items-center gap-1.5 text-xs text-text-tertiary">
          <Truck size={14} strokeWidth={1.75} />
          Delivered nationwide. {eligible ? "Pay small small available." : ""}
        </p>

        {/* Schedule summary */}
        {mode === "pay_small_small" && (
          <div className="mt-6 rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-text-heading">Your payment plan</p>
            <ul className="mt-3 space-y-2">
              {schedule.map((entry, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{entry.label}</span>
                  <span className="font-semibold tabular-nums text-text-heading">
                    {formatNaira(entry.amount)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-text-tertiary">
              <ShieldCheck size={14} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary" />
              Your payment is held by Tornaz in escrow and released to the seller
              as your order progresses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentOption({
  selected,
  title,
  sub,
  amount,
  onSelect,
}: {
  selected: boolean;
  title: string;
  sub: string;
  amount: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border bg-surface p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
        selected ? "border-primary ring-1 ring-primary" : "border-border hover:border-border-strong",
      )}
    >
      <span
        className={cn(
          "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-primary" : "border-border-strong",
        )}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-primary" />}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-semibold text-text-heading">{title}</span>
        <span className="mt-0.5 block text-xs text-text-tertiary">{sub}</span>
      </span>
      <span className="text-sm font-semibold tabular-nums text-text-primary">{amount}</span>
    </button>
  );
}
