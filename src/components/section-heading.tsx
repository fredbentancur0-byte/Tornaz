import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  linkHref,
  linkLabel,
}: {
  eyebrow: string;
  title: ReactNode;
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-primary">{eyebrow}</p>
        <h2 className="mt-1 font-display text-2xl font-bold text-text-heading md:text-3xl">
          {title}
        </h2>
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="text-sm font-semibold text-primary hover:underline"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
