import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Tornaz Stores — home"
      className="flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
    >
      <BrandMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-[0.02em] text-text-heading">
          TORNAZ
        </span>
        <span className="mt-0.5 font-display text-[7px] font-semibold uppercase tracking-[0.34em] text-text-tertiary">
          Stores
        </span>
      </span>
    </Link>
  );
}
