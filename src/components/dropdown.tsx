"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dropdown({
  label,
  children,
  align = "left",
  className,
}: {
  label: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring font-medium gap-1 hover:bg-bg-muted hover:text-text-primary inline-flex items-center px-3 py-2 rounded-md text-sm text-text-secondary transition-colors whitespace-nowrap"
      >
        {label}
        <ChevronDown
          size={14}
          strokeWidth={1.75}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div
          className={cn(
            "absolute top-full z-50 mt-2 min-w-56 rounded-xl border border-border bg-surface p-2 shadow-lg",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="block rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary"
    >
      {children}
    </Link>
  );
}

