/**
 * Seed the Tornaz Stores product catalog into Supabase.
 *
 * Usage:
 *   1. Run supabase/schema.sql in the Supabase SQL editor (creates tables + RLS).
 *   2. npm run seed
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY from .env.local (server-only credential).
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { products } from "../src/lib/data/products";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing env vars. Copy .env.example to .env.local and fill in NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const rows = products.map((p) => ({
  slug: p.slug,
  name: p.name,
  category: p.category,
  price: p.price,
  from_price: p.fromPrice ?? false,
  original_price: p.originalPrice ?? null,
  description: p.description,
  long_description: p.longDescription,
  product_type: p.productType,
  pay_small_small: p.paySmallSmall,
  stock: p.stock,
  seller: p.seller,
  seller_verified: p.sellerVerified,
  image_url: p.image,
  featured: p.featured,
  is_new: p.isNew,
  rating: p.rating ?? null,
  reviews: p.reviews ?? null,
  created_at: p.createdAt,
}));

async function main() {
  console.log(`Seeding ${rows.length} products…`);

  const { error } = await supabase.from("products").upsert(rows, {
    onConflict: "slug",
    ignoreDuplicates: false,
  });

  if (error) {
    console.error("Seed failed:", error.message);
    if (error.message.includes("does not exist")) {
      console.error(
        "\nThe products table doesn't exist yet.\nRun supabase/schema.sql in the Supabase SQL editor first, then retry.",
      );
    }
    process.exit(1);
  }

  console.log(`Done — ${rows.length} products upserted.`);
}

main();
