"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  image: string;
  eyebrow: string;
  title: string;
}

const SLIDE_MS = 6000;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || reduceMotion || slides.length <= 1) return;
    const timer = setInterval(next, SLIDE_MS);
    return () => clearInterval(timer);
  }, [next, paused, reduceMotion, slides.length]);

  if (slides.length === 0) return null;

  return (
    <section
      aria-label="Featured products and offers"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-brand-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0].screenX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].screenX - touchStartX.current;
        if (Math.abs(delta) > 48) {
          if (delta < 0) next();
          else prev();
        }
        touchStartX.current = null;
      }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[16/7]">
        {slides.map((slide, i) => (
          <div
            key={slide.title}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.2,0,0.2,1)]",
              i === index ? "z-10 opacity-100" : "z-0 opacity-0",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
            {/* Navy scrim so the headline stays legible over any photo. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/40 to-brand-950/5"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-950/80 to-transparent"
            />
          </div>
        ))}

        {/* Copy overlay */}
        <div className="absolute inset-0 z-20">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 md:px-6">
            {slides.map((slide, i) => (
              <div
                key={slide.title}
                aria-hidden={i !== index}
                className={cn(
                  "w-full max-w-2xl transition-all duration-700 ease-[cubic-bezier(0.2,0,0.2,1)]",
                  i === index
                    ? "translate-y-0 opacity-100"
                    : i < index
                      ? "-translate-x-6 opacity-0"
                      : "translate-x-6 opacity-0",
                )}
              >
                {i === index && (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-300 md:text-sm">
                      {slide.eyebrow}
                    </p>
                    <h1 className="mt-3 max-w-3xl font-display text-2xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
                      {slide.title}
                    </h1>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar (JMPotters style segmented fill) */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 px-4 md:bottom-5">
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className="group flex h-6 w-8 cursor-pointer items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 md:w-12"
              >
                <span
                  aria-hidden
                  className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/25"
                >
                  {i === index && !paused && !reduceMotion && (
                    <span
                      key={`fill-${index}`}
                      className="absolute inset-0 origin-left animate-[progress_6s_linear_forwards] rounded-full bg-accent-400"
                    />
                  )}
                  {i < index && (
                    <span className="absolute inset-0 rounded-full bg-accent-400" />
                  )}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Arrows */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={prev}
              className="absolute left-2 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-brand-950/50 text-white backdrop-blur-sm transition-colors hover:bg-brand-950/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 md:inline-flex"
            >
              <ChevronLeft size={20} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              className="absolute right-2 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-brand-950/50 text-white backdrop-blur-sm transition-colors hover:bg-brand-950/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 md:inline-flex"
            >
              <ChevronRight size={20} strokeWidth={1.75} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
