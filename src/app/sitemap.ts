import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { products } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/pay-small-small",
    "/sell-on-tornaz",
    "/resell-with-tornaz",
    "/login",
    "/signup",
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE.url}/products/${p.slug}`,
    lastModified: new Date(p.createdAt),
  }));

  return [...routes, ...productRoutes];
}
