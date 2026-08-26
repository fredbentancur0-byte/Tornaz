import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchProducts } from "@/lib/data-access";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductsExplorer, type ExplorerInitial } from "./products-explorer";

export const metadata: Metadata = {
  title: "All products",
  description:
    "Browse phones, generators, appliances, fashion and digital guides on Tornaz Stores. Pay in full or Pay Small Small.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const get = (key: string) => {
    const v = params[key];
    return typeof v === "string" ? v : "";
  };

  const sort = get("sort");
  const initial: ExplorerInitial = {
    q: get("q"),
    category: get("category"),
    productType: get("productType"),
    paySmallSmall: get("payment") === "pay-small-small",
    min: get("min"),
    max: get("max"),
    sort: sort === "price-asc" || sort === "price-desc" ? sort : "newest",
  };

  const products = await fetchProducts();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumb items={[{ label: "All products" }]} />
      <div className="mt-4">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-text-heading md:text-4xl">
          All products
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
          Browse phones, generators, appliances, fashion and digital guides from
          trusted sellers. Pay in full or spread it with Pay Small Small.
        </p>
      </div>
      <Suspense fallback={<CatalogSkeleton />}>
        <ProductsExplorer products={products} initial={initial} />
      </Suspense>
    </div>
  );
}

function CatalogSkeleton() {
  return (
    <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
      <div className="hidden animate-pulse space-y-4 lg:block">
        <div className="h-4 w-24 rounded bg-bg-muted" />
        <div className="h-40 rounded-xl bg-bg-muted" />
        <div className="h-24 rounded-xl bg-bg-muted" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg border border-border bg-surface p-2">
            <div className="aspect-square rounded-md bg-bg-muted" />
            <div className="mt-2 h-4 w-3/4 rounded bg-bg-muted" />
            <div className="mt-1 h-4 w-1/3 rounded bg-bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
