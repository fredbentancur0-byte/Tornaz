"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HeaderSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  }

  return (
    <form role="search" className="hidden lg:block" onSubmit={submit}>
      <label htmlFor="tz-header-search" className="sr-only">
        Search products
      </label>
      <div className="flex items-center rounded-full bg-bg-muted pl-3 focus-within:ring-2 focus-within:ring-focus-ring">
        <Search size={18} strokeWidth={1.75} className="text-text-tertiary" />
        <input
          id="tz-header-search"
          name="q"
          type="search"
          enterKeyHint="search"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Search products"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-56 bg-transparent px-2 py-2 text-sm text-text-primary outline-none placeholder:text-text-tertiary xl:w-[320px]"
        />
      </div>
    </form>
  );
}

export function MobileSearchButton() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    const query = q.trim();
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  }

  return (
    <>
      <button
        type="button"
        aria-label="Search products"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring lg:hidden"
      >
        <Search size={20} strokeWidth={1.75} />
      </button>
      {open && (
        <form
          role="search"
          onSubmit={submit}
          className="absolute inset-x-0 top-full border-b border-border bg-surface px-4 py-3 lg:hidden"
        >
          <label htmlFor="tz-mobile-search" className="sr-only">
            Search products
          </label>
          <div className="flex items-center rounded-full bg-bg-muted pl-3 focus-within:ring-2 focus-within:ring-focus-ring">
            <Search size={18} strokeWidth={1.75} className="text-text-tertiary" />
            <input
              id="tz-mobile-search"
              name="q"
              type="search"
              autoFocus
              placeholder="Search products"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full bg-transparent px-2 py-2 text-sm text-text-primary outline-none placeholder:text-text-tertiary"
            />
          </div>
        </form>
      )}
    </>
  );
}
