"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Zempaa-style animated advertisement banner shown above the header.
 *
 * Mirrors Zempaa's top ad strip exactly: a slim full-width bar filled with a
 * continuously looping animated image (a real GIF asset), no rotating text.
 * The whole strip is clickable — a "Shop now" pill links through to the
 * store's products. Height matches Zempaa (h-10 mobile, h-16 desktop).
 */
export function PromoBanner() {
  return (
    <div className="relative z-40 overflow-hidden border-b border-accent-300/20">
      <Link
        href="/products"
        aria-label="Shop the best of electronics on Tornaz"
        className="group relative block h-10 w-full bg-brand-950 md:h-16"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/banners/zempaa-banner.gif"
          alt="Buy the best of electronics here on Tornaz"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />

        {/* Shop now pill (subtle, bottom-right like a watermark; not a hard CTA) */}
        <span className="absolute bottom-1.5 right-3 inline-flex items-center gap-1.5 rounded-full bg-brand-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-300 opacity-70 ring-1 ring-inset ring-white/15 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100 md:bottom-2 md:right-6 md:text-xs md:group-hover:opacity-100">
          Shop now
          <ArrowRight size={12} strokeWidth={2.5} />
        </span>
      </Link>
    </div>
  );
}