import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Link2, Package } from "lucide-react";
import { fetchProducts } from "@/lib/data-access";
import { CATEGORIES } from "@/lib/constants";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { HeroCarousel, type HeroSlide } from "@/components/hero-carousel";
import { HeroLinksStrip } from "@/components/hero-links-strip";

export default async function HomePage() {
  const allProducts = await fetchProducts();

  // Hero slides: full-bleed image carousel in JMPotters style. The images are
  // the store's own hero photos (no baked-in text); the carousel keeps only a
  // light eyebrow + headline overlay — no search bar, no CTA buttons here.
  // The important links (Pay Small Small, eligible products, selling, etc.)
  // live in the sliding strip directly beneath the hero instead.
  const heroSlides: HeroSlide[] = [
    {
      image: "/media/hero/0b7dd5b1d5eee40ef5cbe6f111c4d161.jpg",
      eyebrow: "Tornaz",
      title: "Shop what you need. Pay small small.",
    },
    {
      image: "/media/hero/fee8f8b4f73e5047d239f23b0fefe7b4.jpg",
      eyebrow: "Tornaz",
      title: "Bigger things, clearer payment plans.",
    },
    {
      image: "/media/hero/1785024664094_g7flie.jpg",
      eyebrow: "Tornaz",
      title: "Electronics built to last, delivered.",
    },
    {
      image: "/media/hero/original-46d14b0a511fdf6cf11a68535d20b356.webp",
      eyebrow: "Tornaz",
      title: "Trusted sellers. Escrow-protected orders.",
    },
    {
      image: "/media/hero/09b6c602fd139eb7e5d6d84afa05ddfa.webp",
      eyebrow: "Tornaz",
      title: "From power to phones — one marketplace.",
    },
  ];

  // New arrivals: newest products.
  const newArrivals = [...allProducts]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 8);

  // Pay Small Small eligible physical items.
  const pssProducts = allProducts
    .filter((p) => p.paySmallSmall && p.productType === "physical")
    .slice(0, 6);

  // Main categories (excludes the "Inverter Generators" sub-category), each
  // backed by a real product image so the cards feel like the JMPotters layout.
  const mainCategories = CATEGORIES.filter((c) => c.slug !== "inverter-generators");

  // Representative product image per main category (physical product shots).
  const categoryImage: Record<string, string> = {
    "generators-power": "/media/products/bright-3-5kva-petrol-generator/1.png",
    "phones-tablets": "/media/products/tecno-spark-smartphone/1.png",
    "home-appliances": "/media/products/binatone-standing-fan/1.png",
    "digital-courses": "/media/products/provisions-store-guide/1.png",
    "fashion-lifestyle": "/media/products/ankara-fabric-bundle/1.png",
  };

  return (
    <>
      {/* Hero — JMPotters-style full-width image carousel */}
      <HeroCarousel slides={heroSlides} />

      {/* Sliding links strip (JMPotters marquee style) */}
      <HeroLinksStrip />

      {/* Shop by category */}
      <section aria-labelledby="categories-h2" className="bg-bg-sunken">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <SectionHeading
            eyebrow="Browse with purpose"
            title="Shop by category"
            linkHref="/products"
            linkLabel="View all"
          />
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {mainCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/products?category=${c.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-border bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={categoryImage[c.slug] ?? "/placeholder.svg"}
                    alt={`${c.name} products`}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="font-display text-sm font-semibold leading-tight md:text-base">
                    {c.name}
                  </h3>
                  <span className="mt-2 inline-flex translate-y-1 items-center gap-1.5 rounded-full bg-accent-400 px-3 py-1 text-[11px] font-bold text-brand-950 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Shop now
                    <ArrowRight size={12} strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section aria-labelledby="new-h2" className="bg-bg-canvas">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <SectionHeading
            eyebrow="Fresh to the marketplace"
            title="New arrivals"
            linkHref="/products?sort=newest"
            linkLabel="See all products"
          />
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-6">
            {newArrivals.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Pay Small Small eligible */}
      <section aria-labelledby="pay-small-small-h2" className="bg-accent-bg">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="max-w-xl lg:col-span-5">
              <p className="text-sm font-semibold text-accent-fg">
                Pay Small Small eligible
              </p>
              <h2
                id="pay-small-small-h2"
                className="mt-2 font-display text-2xl font-bold text-text-heading md:text-3xl"
              >
                Bring home the bigger things with a clearer payment plan.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                Pay 60% at checkout, then 20% in 30 days and 20% in 60 days. Your
                item is delivered after the final payment clears.
              </p>
              <Link
                href="/pay-small-small"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                See how it works
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:col-span-7">
              {pssProducts.map((p) => (
                <ProductCard key={p.slug} product={p} showSeller={false} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grow with Tornaz */}
      <section aria-labelledby="partner-h2" className="bg-bg-canvas">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">Grow with Tornaz</p>
            <h2
              id="partner-h2"
              className="mt-1 font-display text-2xl font-bold text-text-heading md:text-3xl"
            >
              There is more than one way to build on the marketplace.
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-surface p-6 md:p-8">
              <Package size={28} strokeWidth={1.75} className="text-primary" />
              <h3 className="mt-5 text-xl font-bold text-text-heading">
                Sell on Tornaz
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
                Open a storefront, list your products, and let Tornaz support the
                payment and fulfilment journey.
              </p>
              <Link
                href="/sell-on-tornaz"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Explore selling
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 md:p-8">
              <Link2 size={28} strokeWidth={1.75} className="text-primary" />
              <h3 className="mt-5 text-xl font-bold text-text-heading">
                Become a reseller
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
                Share products you rate, earn commission on completed orders, and
                never hold stock yourself.
              </p>
              <Link
                href="/resell-with-tornaz"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Explore reselling
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
