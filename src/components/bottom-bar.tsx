"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: LayoutGrid },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/account", label: "Account", icon: User },
];

export function BottomBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_hsl(224_66%_10%/0.08)] md:hidden"
    >
      {tabs.map((tab) => {
        const active =
          tab.href === "/"
            ? pathname === "/"
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-text-secondary before:absolute before:inset-x-6 before:top-0 before:h-0.5 before:rounded-full before:bg-primary before:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
              active && "text-primary [&>span]:font-semibold before:opacity-100",
            )}
          >
            <tab.icon size={22} strokeWidth={1.75} />
            <span className="text-xs">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
