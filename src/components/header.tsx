"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Dropdown, DropdownItem } from "@/components/dropdown";
import { HeaderSearch, MobileSearchButton } from "@/components/search-form";
import { CartButton } from "@/components/cart-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LinkButton } from "@/components/button";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header({ userEmail }: { userEmail?: string | null }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface transition-shadow">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 md:h-[72px] md:gap-4 md:px-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <Dropdown label="Shop">
            <DropdownItem href="/products">All products</DropdownItem>
            {CATEGORIES.map((c) => (
              <DropdownItem key={c.slug} href={`/products?category=${c.slug}`}>
                {c.name}
              </DropdownItem>
            ))}
            <div className="my-1 h-px bg-border" />
            <DropdownItem href="/products?sort=newest">New arrivals</DropdownItem>
          </Dropdown>
          <Dropdown label="Pay Small Small">
            <DropdownItem href="/pay-small-small">How it works</DropdownItem>
            <DropdownItem href="/products?payment=pay-small-small">
              Eligible products
            </DropdownItem>
          </Dropdown>
          <Dropdown label="Partner with us">
            <DropdownItem href="/sell-on-tornaz">Sell on Tornaz</DropdownItem>
            <DropdownItem href="/resell-with-tornaz">Become a reseller</DropdownItem>
          </Dropdown>
        </nav>

        <div className="ml-auto flex items-center gap-1 md:gap-2">
          <HeaderSearch />
          <MobileSearchButton />
          <CartButton />
          <ThemeToggle />
          {userEmail ? (
            <LinkButton
              href="/account"
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Account
            </LinkButton>
          ) : (
            <LinkButton
              href="/login"
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Sign in
            </LinkButton>
          )}
          <span className="hidden lg:inline-flex">
            <LinkButton href="/signup" variant="accent" size="sm">
              Create account
            </LinkButton>
          </span>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring md:hidden"
          >
            {menuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-b border-border bg-surface transition-[max-height] duration-200 ease-[cubic-bezier(0.2,0,0.2,1)]",
          menuOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0 border-b-0",
        )}
      >
        <nav aria-label="Mobile" className="space-y-1 px-4 py-4">
          <MobileLink href="/products" onNavigate={() => setMenuOpen(false)}>
            Shop all products
          </MobileLink>
          {CATEGORIES.map((c) => (
            <MobileLink
              key={c.slug}
              href={`/products?category=${c.slug}`}
              onNavigate={() => setMenuOpen(false)}
            >
              {c.name}
            </MobileLink>
          ))}
          <div className="my-2 h-px bg-border" />
          <MobileLink href="/pay-small-small" onNavigate={() => setMenuOpen(false)}>
            Pay Small Small — how it works
          </MobileLink>
          <MobileLink href="/sell-on-tornaz" onNavigate={() => setMenuOpen(false)}>
            Sell on Tornaz
          </MobileLink>
          <MobileLink href="/resell-with-tornaz" onNavigate={() => setMenuOpen(false)}>
            Become a reseller
          </MobileLink>
          <div className="my-2 h-px bg-border" />
          <MobileLink
            href={userEmail ? "/account" : "/login"}
            onNavigate={() => setMenuOpen(false)}
          >
            {userEmail ? "My account" : "Sign in"}
          </MobileLink>
          <MobileLink href="/signup" onNavigate={() => setMenuOpen(false)}>
            Create account
          </MobileLink>
        </nav>
      </div>
    </header>
  );
}

function MobileLink({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="block rounded-md px-3 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-muted"
    >
      {children}
    </Link>
  );
}
