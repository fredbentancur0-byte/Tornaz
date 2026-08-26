import type { Metadata } from "next";
import { CalendarClock, ShieldCheck, Wallet } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { LinkButton } from "@/components/button";
import { formatNaira } from "@/lib/format";
import { PAY_SMALL_SMALL } from "@/lib/constants";

export const metadata: Metadata = { title: "How Pay Small Small works" };

export default function PaySmallSmallPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumb items={[{ label: "Pay Small Small" }]} />
      <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-heading md:text-4xl">
        How Pay Small Small works
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
        Bring home the bigger things — phones, generators, appliances — without
        paying all at once. Spread the cost over three parts and 60 days.
      </p>

      {/* The plan */}
      <section aria-labelledby="plan-h2" className="mt-10">
        <h2 id="plan-h2" className="font-display text-xl font-bold text-text-heading">
          Your payment plan
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Wallet, step: "Part 1 · Today", amount: "60%", note: "Paid at checkout" },
            { icon: CalendarClock, step: "Part 2 · Day 30", amount: "20%", note: "Paid 30 days later" },
            { icon: CalendarClock, step: "Part 3 · Day 60", amount: "20%", note: "Final payment" },
          ].map((p) => (
            <div key={p.step} className="rounded-2xl border border-border bg-surface p-6">
              <p.icon size={24} strokeWidth={1.75} className="text-primary" />
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-text-tertiary">
                {p.step}
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold text-text-heading">
                {p.amount}
              </p>
              <p className="mt-1 text-sm text-text-secondary">{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility */}
      <section aria-labelledby="eligibility-h2" className="mt-10">
        <h2 id="eligibility-h2" className="font-display text-xl font-bold text-text-heading">
          What&apos;s eligible?
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary">
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Physical products priced from {formatNaira(PAY_SMALL_SMALL.minEligiblePrice)}.
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Digital products and guides are paid in full at checkout.
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Items marked &quot;Pay Small Small available&quot; on the product page qualify.
          </li>
        </ul>
      </section>

      {/* Escrow */}
      <section aria-labelledby="escrow-h2" className="mt-10">
        <div className="rounded-2xl border border-border bg-accent-bg p-6 md:p-8">
          <ShieldCheck size={26} strokeWidth={1.75} className="text-accent-fg" />
          <h2 id="escrow-h2" className="mt-4 font-display text-xl font-bold text-text-heading">
            Your money is held in escrow
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
            Your payment is held by Tornaz — not the seller — until your order is
            ready for delivery. Goods are delivered after the final payment
            clears, and the seller is only paid as your order progresses.
          </p>
        </div>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/products?payment=pay-small-small" variant="accent" size="lg">
          Shop eligible products
        </LinkButton>
        <LinkButton href="/products" variant="outline" size="lg">
          Browse all products
        </LinkButton>
      </div>
    </div>
  );
}
