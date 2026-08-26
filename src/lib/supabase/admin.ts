import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client. Only import from server contexts (seed scripts, route
 * handlers, admin actions). Never expose SUPABASE_SERVICE_ROLE_KEY to the client.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase URL or service role key");
  }
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
