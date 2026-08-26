import type { Metadata } from "next";
import { Link2, Percent, Share2 } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { LinkButton } from "@/components/button";

export const metadata: Metadata = { title: "Become a reseller" };

export default function ResellWithTornazPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumb items={[{ label: "Become a reseller" }]} />
      <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-heading md:text-4xl">
        Become a reseller
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
        Share products you rate, earn commission on completed orders, and never
        hold stock yourself.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Share2, title: "Share your links", note: "Recommend products you trust with your own referral link." },
          { icon: Percent, title: "Earn commission", note: "Get paid on completed orders — no stock, no shipping." },
          { icon: Link2, title: "Grow at your pace", note: "Your audience, your niche. Tornaz handles the rest." },
        ].map((b) => (
          <div key={b.title} className="rounded-2xl border border-border bg-surface p-6">
            <b.icon size={24} strokeWidth={1.75} className="text-primary" />
            <h2 className="mt-4 font-display text-lg font-bold text-text-heading">{b.title}</h2>
            <p className="mt-1 text-sm text-text-secondary">{b.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <LinkButton href="/signup?next=/account" variant="accent" size="lg">
          Join the reseller programme
        </LinkButton>
        <p className="mt-3 text-xs text-text-tertiary">
          The reseller programme opens soon. Create an account and we&apos;ll let you know.
        </p>
      </div>
    </div>
  );
}
