"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Zempaa-style animated promotional banner shown above the header.
 *
 * A slim "billboard" ribbon that crossfades through electronics scenes built
 * from the store's real product imagery. Each slide does a slow Ken-Burns
 * pan/zoom so it reads as "animated and exciting" (not a flat banner), while
 * a gold sheen sweeps across and a category marquee ticks underneath the
 * headline. Pauses on hover and respects reduced-motion.
 */

const SLIDES = [
  {
    image: "/media/products/bright-3-5kva-petrol-generator/1.png",
    headline: "Buy the best of electronics here on Tornaz",
    accent: "Generators · Inverters · Solar",
    href: "/products?category=generators-power",
  },
  {
    image: "/media/products/tecno-spark-smartphone/1.png",
    headline: "Phones worth upgrading to — pay small small",
    accent: "Smartphones · Tablets",
    href: "/products?category=phones-tablets",
  },
  {
    image: "/media/products/binatone-standing-fan/1.png",
    headline: "Home appliances that make life easier",
    accent: "Fans · Appliances · Home",
    href: "/products?category=home-appliances",
  },
];

const ROTATE_MS = 6000;

export function PromoBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = SLIDES[index];

  return (
    <div
      className="relative z-50 overflow-hidden bg-brand-950 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Ken-Burns background — crossfading product scene */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {SLIDES.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.href}
            src={s.image}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-[cubic-bezier(0.2,0,0.2,1)] ${
              i === index ? "animate-[kenburns_18s_ease-in-out_infinite] opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Navy scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-950/30" />
      </div>

      {/* Animated gold sheen sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent motion-safe:animate-[sheen_5s_ease-in-out_infinite]"
      />

      <div className="relative mx-auto flex h-12 w-full max-w-7xl items-center gap-4 px-4 md:h-14 md:px-6">
        {/* Main promo copy */}
        <Link
          href={slide.href}
          className="group relative flex min-w-0 flex-1 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
          aria-label={`${slide.headline} — ${slide.accent}`}
        >
          <span
            key={`headline-${index}`}
            className="hidden animate-[fade-in_0.6s_ease] truncate text-sm font-semibold tracking-tight text-white sm:inline-block md:text-[15px]"
          >
            {slide.headline}
          </span>
          <span
            key={`accent-${index}`}
            className="animate-[fade-in_0.6s_ease] truncate text-xs text-accent-400 sm:ml-1 md:text-[13px]"
          >
            {slide.accent}
          </span>
          <span className="hidden shrink-0 items-center gap-1 px-2 py-1 text-xs font-bold text-brand-950 md:inline-flex">
            <span className="rounded-full bg-accent-400 px-2.5 py-0.5 transition-colors group-hover:bg-accent-300">
              Shop now
            </span>
            <ArrowRight
              size={13}
              strokeWidth={2}
              className="-ml-1.5 transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </Link>

        {/* Category marquee ticker */}
        <div className="hidden shrink-0 items-center gap-3 overflow-hidden lg:flex" aria-hidden>
          <div className="flex items-center gap-3 animate-[marquee_24s_linear_infinite] whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, dup) =>
              [
                "Generators",
                "Solar",
                "Phones",
                "Fans",
                "Inverters",
                "Appliances",
                "Pay Small Small",
              ].map((item) => (
                <span key={`${dup}-${item}`} className="flex items-center gap-3 text-xs text-neutral-300">
                  <span className="h-1 w-1 rounded-full bg-accent-400" />
                  {item}
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}