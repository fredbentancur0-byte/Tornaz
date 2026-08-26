"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  }

  return (
    <form role="search" className="mt-6 max-w-lg" onSubmit={submit}>
      <label htmlFor="hero-search" className="sr-only">
        Search products
      </label>
      <div className="flex items-center gap-2 rounded-lg bg-white p-1.5 shadow-lg focus-within:ring-2 focus-within:ring-accent-300">
        <input
          id="hero-search"
          name="q"
          type="search"
          enterKeyHint="search"
          autoComplete="off"
          placeholder="Search phones, fashion, guides and more"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full bg-transparent px-3 text-neutral-900 outline-none placeholder:text-neutral-500"
        />
        <button
          type="submit"
          aria-label="Search products"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent text-text-on-accent hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <Search size={20} strokeWidth={1.75} />
        </button>
      </div>
    </form>
  );
}
