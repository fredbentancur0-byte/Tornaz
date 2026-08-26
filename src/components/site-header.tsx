import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";

export async function SiteHeader() {
  let email: string | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    email = data.user?.email ?? null;
  } catch {
    // Not authenticated or Supabase unavailable — show the public header.
  }
  return <Header userEmail={email} />;
}
