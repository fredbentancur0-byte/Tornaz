import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "brand" | "accent" | "danger" | "success" | "neutral";

const variants: Record<BadgeVariant, string> = {
  brand: "bg-brand-900/85 text-white",
  accent: "bg-accent text-text-on-accent",
  danger: "bg-state-danger-bg text-state-danger-fg",
  success: "bg-state-success-bg text-state-success-fg",
  neutral: "bg-bg-muted text-text-secondary",
};

export function Badge({
  children,
  variant = "brand",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
