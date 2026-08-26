"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BadgePercent, ShieldCheck, Truck } from "lucide-react";

const MESSAGES = [
  {
    icon: BadgePercent,
    text: "Pay Small Small — 60% today, 20% in 30 days, 20% in 60 days",
    href: "/pay-small-small",
  },
  {
    icon: Truck,
    text: "Free delivery on orders over ₦150,000",
    href: "/products",
  },
  {
    icon: ShieldCheck,
    text: "Your payment is held by Tornaz in escrow until your order is delivered",
    href: "/pay-small-small",
  },
];

const QUICK_LINKS = [
  { label: "Sell on Tornaz", href: "/sell-on-tornaz" },
  { label: "Become a reseller", href: "/resell-with-tornaz" },
  { label: "Support", href: "/terms" },
];

const ROTATE_MS = 5000;

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % MESSAGES.length),
      ROTATE_MS,
    );
    return () => clearInterval(timer);
  }, [paused]);

  const message = MESSAGES[index];

  return (
    <div className="relative z-50 bg-brand-950 text-white">
      <div
        className="mx-auto flex h-10 w-full max-w-7xl items-center gap-4 px-4 md:h-11 md:px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <Link
          href={message.href}
          className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
        >
          <message.icon
            size={15}
            strokeWidth={1.75}
            aria-hidden
            className="shrink-0 text-accent-400"
          />
          <span
            key={index}
            aria-live="polite"
            className="animate-[fade-in_0.45s_ease] truncate text-xs font-medium text-neutral-100 md:text-[13px]"
          >
            {message.text}
          </span>
          <span className="hidden shrink-0 text-xs font-semibold text-accent-400 underline-offset-2 transition-colors group-hover:text-accent-300 group-hover:underline sm:inline">
            Learn more
          </span>
        </Link>

        <nav aria-label="Quick links" className="hidden shrink-0 items-center gap-1 md:flex">
          {QUICK_LINKS.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && (
                <span aria-hidden className="mx-2 h-3.5 w-px bg-white/20" />
              )}
              <Link
                href={link.href}
                className="rounded px-2 py-1 text-xs font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}