import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "ghost" | "outline" | "danger" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "active:scale-[0.98] border border-transparent cursor-pointer disabled:opacity-50 disabled:pointer-events-none duration-[140ms] ease-[cubic-bezier(0.2,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas font-semibold gap-2 inline-flex items-center justify-center motion-reduce:active:scale-100 no-underline select-none transition-colors whitespace-nowrap";

const variants: Record<Variant, string> = {
  accent: "bg-accent hover:bg-accent-hover text-text-on-accent",
  primary: "bg-primary hover:bg-primary-hover text-text-inverse",
  ghost: "bg-transparent hover:bg-bg-muted text-primary",
  outline:
    "border border-border-strong bg-surface hover:border-border-brand text-text-primary",
  danger: "bg-state-danger hover:bg-state-danger-strong text-white",
  inverse: "border border-white/25 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3 rounded-lg text-sm",
  md: "min-h-11 px-4 rounded-lg text-sm",
  lg: "min-h-[52px] px-6 rounded-lg text-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  href: string;
  children: ReactNode;
}

export function LinkButton({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}
