import "server-only";
import type { Product } from "@/lib/types";
import { products as bundledProducts, getProductBySlug } from "@/lib/data/products";
import { categoryName } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

interface DbProductRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number | string;
  from_price?: boolean;
  original_price?: number | string | null;
  description?: string;
  long_description?: string;
  product_type: "physical" | "digital";
  pay_small_small?: boolean;
  stock?: "in_stock" | "low_stock" | "out_of_stock";
  seller?: string;
  seller_verified?: boolean;
  image_url?: string;
  featured?: boolean;
  is_new?: boolean;
  created_at?: string;
  rating?: number | null;
  reviews?: number | null;
}

function mapDbProduct(row: DbProductRow): Product {
  const bundled = getProductBySlug(row.slug);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    categoryName: categoryName(row.category),
    price: Number(row.price),
    fromPrice: row.from_price ?? bundled?.fromPrice ?? false,
    originalPrice:
      row.original_price != null ? Number(row.original_price) : bundled?.originalPrice,
    description: row.description ?? bundled?.description ?? "",
    longDescription:
      row.long_description ?? bundled?.longDescription ?? "",
    productType: row.product_type ?? bundled?.productType ?? "physical",
    paySmallSmall: row.pay_small_small ?? bundled?.paySmallSmall ?? false,
    stock: row.stock ?? bundled?.stock ?? "in_stock",
    seller: row.seller ?? bundled?.seller ?? "",
    sellerVerified: row.seller_verified ?? bundled?.sellerVerified ?? true,
    image: row.image_url ?? bundled?.image ?? "",
    featured: row.featured ?? bundled?.featured ?? false,
    isNew: row.is_new ?? bundled?.isNew ?? false,
    createdAt: row.created_at ?? bundled?.createdAt ?? new Date().toISOString(),
    rating: row.rating ?? bundled?.rating,
    reviews: row.reviews ?? bundled?.reviews,
  };
}

/** Fetch all products. Falls back to the bundled catalog when Supabase is unreachable or empty. */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return bundledProducts;

    return (data as DbProductRow[]).map(mapDbProduct);
  } catch {
    return bundledProducts;
  }
}

/** Fetch a single product by slug with the same fallback behaviour. */
export async function fetchProduct(slug: string): Promise<Product | undefined> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (data) return mapDbProduct(data as DbProductRow);

    const local = getProductBySlug(slug);
    return local;
  } catch {
    return getProductBySlug(slug);
  }
}
