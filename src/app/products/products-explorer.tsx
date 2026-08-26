"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import type { Product } from "@/lib/types";
import { CATEGORIES, PAY_SMALL_SMALL } from "@/lib/constants";
import { formatNaira } from "@/lib/format";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

type SortKey = "newest" | "price-asc" | "price-desc";

export interface ExplorerInitial {
  q: string;
  category: string;
  productType: string;
  paySmallSmall: boolean;
  min: string;
  max: string;
  sort: SortKey;
}

export function ProductsExplorer({
  products,
  initial,
}: {
  products: Product[];
  initial: ExplorerInitial;
}) {
  const router = useRouter();
  const [q, setQ] = useState(initial.q);
  const [category, setCategory] = useState(initial.category);
  const [productType, setProductType] = useState(initial.productType);
  const [paySmallSmall, setPaySmallSmall] = useState(initial.paySmallSmall);
  const [min, setMin] = useState(initial.min);
  const [max, setMax] = useState(initial.max);
  const [sort, setSort] = useState<SortKey>(initial.sort);

  const [filtersOpen, setFiltersOpen] = useState(false);

  function syncUrl(next: Record<string, string | boolean | undefined>) {
    const params = new URLSearchParams();
    const merged = {
      q,
      category,
      productType,
      paySmallSmall,
      min,
      max,
      sort,
      ...next,
    };
    if (merged.q) params.set("q", merged.q);
    if (merged.category) params.set("category", merged.category);
    if (merged.productType) params.set("productType", merged.productType);
    if (merged.paySmallSmall) params.set("payment", "pay-small-small");
    if (merged.min) params.set("min", merged.min);
    if (merged.max) params.set("max", merged.max);
    if (merged.sort && merged.sort !== "newest") params.set("sort", merged.sort);
    const qs = params.toString();
    router.replace(qs ? `/products?${qs}` : "/products", { scroll: false });
  }

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    const minNum = min ? Number(min) : null;
    const maxNum = max ? Number(max) : null;

    let list = products.filter((p) => {
      if (query) {
        const haystack = `${p.name} ${p.seller} ${p.categoryName}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (category && p.category !== category) return false;
      if (productType && p.productType !== productType) return false;
      if (paySmallSmall) {
        if (!p.paySmallSmall || p.productType !== "physical") return false;
        if (p.price < PAY_SMALL_SMALL.minEligiblePrice) return false;
      }
      if (minNum != null && p.price < minNum) return false;
      if (maxNum != null && p.price > maxNum) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.createdAt.localeCompare(a.createdAt);
    });

    return list;
  }, [products, q, category, productType, paySmallSmall, min, max, sort]);

  function resetAll() {
    setQ("");
    setCategory("");
    setProductType("");
    setPaySmallSmall(false);
    setMin("");
    setMax("");
    setSort("newest");
    syncUrl({ q: "", category: "", productType: "", paySmallSmall: false, min: "", max: "", sort: "newest" });
  }

  return (
    <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Filters */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-text-heading">Filters</h2>
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary lg:hidden"
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal size={16} strokeWidth={1.75} />
            {filtersOpen ? "Hide" : "Show"}
          </button>
        </div>

        <div className={cn("mt-4 space-y-6", filtersOpen ? "block" : "hidden lg:block")}>
          {/* Category */}
          <fieldset>
            <legend className="text-sm font-semibold text-text-heading">Category</legend>
            <div className="mt-2 space-y-1">
              <FilterRadio
                name="category"
                checked={category === ""}
                label="All categories"
                onChange={() => {
                  setCategory("");
                  syncUrl({ category: "" });
                }}
              />
              {CATEGORIES.map((c) => (
                <FilterRadio
                  key={c.slug}
                  name="category"
                  checked={category === c.slug}
                  label={c.name}
                  onChange={() => {
                    setCategory(c.slug);
                    syncUrl({ category: c.slug });
                  }}
                />
              ))}
            </div>
          </fieldset>

          {/* Price */}
          <fieldset>
            <legend className="text-sm font-semibold text-text-heading">Price</legend>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="Min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-full rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-border-brand focus:ring-2 focus:ring-focus-ring"
              />
              <span className="text-text-tertiary">–</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="Max"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-full rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-border-brand focus:ring-2 focus:ring-focus-ring"
              />
            </div>
            <button
              type="button"
              onClick={() => syncUrl({ min, max })}
              className="mt-2 inline-flex items-center justify-center rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
            >
              Apply price
            </button>
            <p className="mt-2 text-xs text-text-tertiary">Prices include VAT.</p>
          </fieldset>

          {/* Product type */}
          <fieldset>
            <legend className="text-sm font-semibold text-text-heading">Product type</legend>
            <div className="mt-2 space-y-1">
              {[
                { value: "", label: "All" },
                { value: "physical", label: "Physical — delivered to you" },
                { value: "digital", label: "Digital — opens in your library" },
              ].map((opt) => (
                <FilterRadio
                  key={opt.value}
                  name="productType"
                  checked={productType === opt.value}
                  label={opt.label}
                  onChange={() => {
                    setProductType(opt.value);
                    syncUrl({ productType: opt.value });
                  }}
                />
              ))}
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset>
            <legend className="text-sm font-semibold text-text-heading">Payment</legend>
            <label className="mt-2 flex cursor-pointer items-start gap-2 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={paySmallSmall}
                onChange={() => {
                  const next = !paySmallSmall;
                  setPaySmallSmall(next);
                  syncUrl({ paySmallSmall: next });
                }}
                className="mt-0.5 h-4 w-4 accent-primary"
              />
              <span>
                Pay Small Small available
                <span className="mt-1 block text-xs text-text-tertiary">
                  Physical products from {formatNaira(PAY_SMALL_SMALL.minEligiblePrice)}.
                  Goods are delivered after the third payment.
                </span>
              </span>
            </label>
          </fieldset>

          <button
            type="button"
            onClick={resetAll}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">{results.length}</span>{" "}
            {results.length === 1 ? "product" : "products"}
          </p>
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            Sort by
            <select
              value={sort}
              onChange={(e) => {
                const next = e.target.value as SortKey;
                setSort(next);
                syncUrl({ sort: next });
              }}
              className="rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm text-text-primary outline-none focus:border-border-brand focus:ring-2 focus:ring-focus-ring"
            >
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>

        {results.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border-strong bg-bg-sunken p-10 text-center">
            <p className="font-display text-lg font-bold text-text-heading">
              No products match your filters
            </p>
            <p className="mt-1 text-sm text-text-tertiary">
              Try adjusting your search or clearing some filters.
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="mt-4 text-sm font-semibold text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
            {results.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterRadio({
  name,
  checked,
  label,
  onChange,
}: {
  name: string;
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-primary"
      />
      <span className={cn(checked && "font-medium text-text-primary")}>{label}</span>
    </label>
  );
}
