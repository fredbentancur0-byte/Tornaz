"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { buildPaymentSchedule, deliveryFee } from "@/lib/payment";
import { PAY_SMALL_SMALL } from "@/lib/constants";
import { formatNaira } from "@/lib/format";
import { getProductBySlug } from "@/lib/data/products";
import type { PaymentMode } from "@/lib/types";
import { ProductImage } from "@/components/product-image";
import { Button, LinkButton } from "@/components/button";
import { cn } from "@/lib/utils";

interface OrderResult {
  ok: boolean;
  id: string;
  email: string;
  total: number;
  payment_mode: PaymentMode;
  schedule: { label: string; dueInDays: number; amount: number }[];
}

const NIGERIAN_STATES = [
  "Lagos", "Abuja (FCT)", "Ogun", "Oyo", "Rivers", "Kano", "Kaduna",
  "Anambra", "Enugu", "Imo", "Delta", "Edo", "Akwa Ibom", "Cross River",
  "Benue", "Plateau", "Niger", "Kwara", "Osun", "Ondo", "Ekiti", "Bayelsa",
  "Ebonyi", "Abia", "Gombe", "Bauchi", "Adamawa", "Taraba", "Yobe", "Borno",
  "Katsina", "Jigawa", "Sokoto", "Zamfara", "Kebbi", "Nasarawa", "Kogi",
];

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const cartMode = useCartStore((s) => s.paymentMode);

  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  const fee = deliveryFee(items);
  const total = subtotal + fee;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
  });
  const [mode, setMode] = useState<PaymentMode>("full");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResult | null>(null);

  // Eligibility: all items are physical, Pay Small Small capable, and ≥ min price.
  const pssEligible = useMemo(() => {
    if (items.length === 0) return false;
    return items.every((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return false;
      return (
        product.productType === "physical" &&
        product.paySmallSmall &&
        product.price >= PAY_SMALL_SMALL.minEligiblePrice
      );
    });
  }, [items]);

  useEffect(() => {
    setMode(cartMode === "pay_small_small" && pssEligible ? "pay_small_small" : "full");
  }, [cartMode, pssEligible]);

  if (items.length === 0 && !order) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-text-heading">
          Nothing to check out
        </h1>
        <p className="mt-2 text-sm text-text-tertiary">Your cart is empty.</p>
        <LinkButton href="/products" variant="accent" size="lg" className="mt-6">
          Shop products
        </LinkButton>
      </div>
    );
  }

  // ---- Success screen -----------------------------------------------------
  if (order) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-14 md:py-20">
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <CheckCircle2 size={44} strokeWidth={1.75} className="mx-auto text-state-success" />
          <h1 className="mt-4 font-display text-2xl font-extrabold text-text-heading">
            Order placed
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Your payment is now held safely by Tornaz in escrow. A confirmation
            has been sent to{" "}
            <span className="font-medium text-text-primary">{order.email}</span>.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-bg-muted px-3 py-1.5 text-xs text-text-secondary">
            Order reference
            <span className="font-mono font-semibold text-text-primary">
              {order.id.slice(0, 8).toUpperCase()}
            </span>
          </p>

          <div className="mt-6 rounded-xl border border-border bg-bg-sunken p-4 text-left">
            <p className="text-sm font-semibold text-text-heading">Payment schedule</p>
            <ul className="mt-3 space-y-2">
              {order.schedule.map((entry, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{entry.label}</span>
                  <span className="font-semibold tabular-nums text-text-heading">
                    {formatNaira(entry.amount)}
                  </span>
                </li>
              ))}
              <li className="flex items-center justify-between border-t border-border pt-2 text-sm">
                <span className="font-semibold text-text-heading">Total</span>
                <span className="font-semibold tabular-nums text-text-heading">
                  {formatNaira(order.total)}
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/products" variant="primary" size="lg" className="flex-1">
              Continue shopping
            </LinkButton>
            <LinkButton href="/orders" variant="outline" size="lg" className="flex-1">
              View your orders
            </LinkButton>
          </div>
        </div>
      </div>
    );
  }

  // ---- Checkout form ------------------------------------------------------
  const schedule = buildPaymentSchedule(total, mode);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.fullName) {
      setError("Please enter your full name and email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          items: items.map((i) => ({
            productId: i.productId,
            slug: i.slug,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
          subtotal,
          delivery_fee: fee,
          total,
          payment_mode: mode,
          schedule,
        }),
      });
      const data = (await res.json()) as OrderResult & { error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not place order");
      clear();
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-border-brand focus:ring-2 focus:ring-focus-ring";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Link
        href="/cart"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        <ChevronLeft size={16} strokeWidth={1.75} />
        Back to cart
      </Link>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-text-heading">
        Checkout
      </h1>

      <form onSubmit={placeOrder} className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          {/* Delivery details */}
          <section aria-labelledby="delivery-h2">
            <h2 id="delivery-h2" className="font-display text-lg font-bold text-text-heading">
              Delivery details
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-text-heading">
                  Full name
                </label>
                <input
                  id="fullName"
                  required
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="e.g. Ada Obi"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-text-heading">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="e.g. 0801 234 5678"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-heading">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-text-heading">
                  Delivery address
                </label>
                <input
                  id="address"
                  required
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="House number, street, area"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-text-heading">
                  City
                </label>
                <input
                  id="city"
                  required
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="e.g. Surulere"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="state" className="mb-1.5 block text-sm font-medium text-text-heading">
                  State
                </label>
                <select
                  id="state"
                  required
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select state
                  </option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Payment mode */}
          <section aria-labelledby="payment-h2">
            <h2 id="payment-h2" className="font-display text-lg font-bold text-text-heading">
              How would you like to pay?
            </h2>
            <div className="mt-4 space-y-3">
              <PayOption
                selected={mode === "full"}
                title="Pay in full"
                sub="Delivered after payment confirmed"
                amount={formatNaira(total)}
                onSelect={() => setMode("full")}
              />
              {pssEligible && (
                <PayOption
                  selected={mode === "pay_small_small"}
                  title="Pay small small"
                  sub="60% today · 20% in 30 days · 20% in 60 days"
                  amount={`${formatNaira(schedule[0]?.amount ?? 0)} today`}
                  onSelect={() => setMode("pay_small_small")}
                />
              )}
            </div>

            {mode === "pay_small_small" && (
              <div className="mt-4 rounded-xl border border-border bg-bg-sunken p-4">
                <p className="text-sm font-semibold text-text-heading">Payment plan</p>
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
                <p className="mt-3 text-xs leading-relaxed text-text-tertiary">
                  Goods are delivered after the final payment clears. Your money
                  stays with Tornaz, not the seller, until then.
                </p>
              </div>
            )}
          </section>

          {error && (
            <p role="alert" className="rounded-lg bg-state-danger-bg px-3 py-2.5 text-sm text-state-danger-fg">
              {error}
            </p>
          )}
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold text-text-heading">Order summary</h2>
          <ul className="mt-4 space-y-4">
            {items.map((item) => (
              <li key={item.productId} className="flex items-center gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-bg-muted">
                  <ProductImage src={item.image} alt={item.name} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium text-text-primary">{item.name}</p>
                  <p className="text-xs text-text-tertiary">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold tabular-nums text-text-heading">
                  {formatNaira(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-text-secondary">Subtotal</dt>
              <dd className="font-medium tabular-nums text-text-primary">{formatNaira(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">Delivery</dt>
              <dd className="font-medium tabular-nums text-text-primary">
                {fee === 0 ? "Free" : formatNaira(fee)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-semibold text-text-heading">Total</dt>
              <dd className="font-semibold tabular-nums text-text-heading">{formatNaira(total)}</dd>
            </div>
          </dl>
          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="mt-6 w-full"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 size={20} strokeWidth={1.75} className="animate-spin" />
                Placing order…
              </>
            ) : (
              <>
                <Lock size={18} strokeWidth={1.75} />
                Place order — {formatNaira(schedule[0]?.amount ?? total)}
              </>
            )}
          </Button>
          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-text-tertiary">
            <ShieldCheck size={14} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary" />
            Simulated payment. Your payment is held by Tornaz in escrow and only
            released to the seller as your order progresses.
          </p>
        </aside>
      </form>
    </div>
  );
}

function PayOption({
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
