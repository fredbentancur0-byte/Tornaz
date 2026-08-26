import type { Metadata } from "next";
import { BadgeCheck, Package, ShieldCheck, Wallet } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { LinkButton } from "@/components/button";

export const metadata: Metadata = { title: "Sell on Tornaz" };

export default function SellOnTornazPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumb items={[{ label: "Sell on Tornaz" }]} />
      <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-heading md:text-4xl">
        Sell on Tornaz
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
        Open a storefront, list your products, and let Tornaz support the
        payment and fulfilment journey — including escrow-backed Pay Small Small
        plans for bigger-ticket items.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Package, title: "List in minutes", note: "A storefront of your own, with products live fast." },
          { icon: Wallet, title: "Get paid on time", note: "Escrow releases funds as orders progress — no chasing." },
          { icon: BadgeCheck, title: "Verified seller", note: "Earn buyer trust with the verified badge on your store." },
        ].map((b) => (
          <div key={b.title} className="rounded-2xl border border-border bg-surface p-6">
            <b.icon size={24} strokeWidth={1.75} className="text-primary" />
            <h2 className="mt-4 font-display text-lg font-bold text-text-heading">{b.title}</h2>
            <p className="mt-1 text-sm text-text-secondary">{b.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-accent-bg p-6 md:p-8">
        <ShieldCheck size={26} strokeWidth={1.75} className="text-accent-fg" />
        <h2 className="mt-4 font-display text-xl font-bold text-text-heading">
          Buyers pay with confidence
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
          Because Tornaz holds buyer payments in escrow, customers can commit to
          larger purchases — which means bigger baskets for you.
        </p>
      </div>

      <div className="mt-10">
        <LinkButton href="/signup?next=/account" variant="accent" size="lg">
          Start selling
        </LinkButton>
        <p className="mt-3 text-xs text-text-tertiary">
          Onboarding to open a storefront is coming soon. Create an account to get started.
        </p>
      </div>
    </div>
  );
}
