import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/breadcrumb";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumb items={[{ label: title }]} />
      <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-heading">
        {title}
      </h1>
      <p className="mt-2 text-xs text-text-tertiary">Last updated: {updated}</p>
      <div className="prose-tz mt-8 space-y-6 text-sm leading-relaxed text-text-secondary">
        {children}
      </div>
    </div>
  );
}
