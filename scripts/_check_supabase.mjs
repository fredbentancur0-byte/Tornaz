import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const c = createClient(url, anon);
const { data, error } = await c.from("products").select("slug").limit(100);
console.log("products:", error ? `ERROR: ${error.message}` : `${(data ?? []).length} rows`);
const { data: o, error: oe } = await c.from("orders").select("id").limit(100);
console.log("orders:", oe ? `ERROR: ${oe.message}` : `${(o ?? []).length} rows`);
