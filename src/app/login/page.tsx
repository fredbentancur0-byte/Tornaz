"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-heading">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-border-brand focus:ring-2 focus:ring-focus-ring"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-text-heading">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-border-brand focus:ring-2 focus:ring-focus-ring"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-state-danger-bg px-3 py-2.5 text-sm text-state-danger-fg">
          {error}
        </p>
      )}

      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={loading}>
        {loading && <Loader2 size={18} strokeWidth={1.75} className="animate-spin" />}
        Sign in
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-16 md:py-24">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-text-heading">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        Sign in to track orders and manage your Tornaz account.
      </p>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
      <p className="mt-6 text-sm text-text-secondary">
        New to Tornaz?{" "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
