"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Sliding strip directly beneath the hero (JMPotters marquee style).
 *
 * A dark navy ribbon that scrolls the store's key links as pills — Pay Small
 * Small, eligible products, selling, reselling, delivery — so the important
 * CTAs live here instead of cluttering the hero image. Pauses on hover and
 * respects reduced motion.
 */

const LINKS = [
  { label: "How Pay Small Small works", href: "/pay-small-small" },
  { label: "Eligible products", href: "/products?payment=pay-small-small" },
  { label: "Sell on Tornaz", href: "/sell-on-tornaz" },
  { label: "Become a reseller", href: "/resell-with-tornaz" },
  { label: "Free delivery on orders over ₦150,000", href: "/products" },
  { label: "Shop all products", href: "/products" },
];

export function HeroLinksStrip() {
  return (
    <div className="relative overflow-hidden border-b border-accent-300/20 bg-brand-950 py-3">
      {/* Edge fades so items appear to slide in/out */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-950 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-950 to-transparent"
      />

      <div className="group flex w-max motion-safe:animate-[marquee_36s_linear_infinite] motion-safe:hover:[animation-play-state:paused]">
        {[0, 1].map((dup) => (
          <ul key={dup} aria-hidden={dup === 1} className="flex items-center">
            {LINKS.map((link, i) => (
              <li key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className="mx-2 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-neutral-200 transition-colors hover:border-accent-300/50 hover:text-accent-300 md:text-[13px]"
                >
                  {link.label}
                  <ArrowRight size={12} strokeWidth={2.25} className="text-accent-400" />
                </Link>
                {i < LINKS.length - 1 && (
                  <span aria-hidden className="h-1 w-1 rounded-full bg-accent-400/70" />
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}