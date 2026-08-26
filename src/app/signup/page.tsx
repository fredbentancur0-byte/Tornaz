"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, MailCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/button";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/account";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}${next}`,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) {
      router.push(next);
      router.refresh();
    } else {
      setCheckEmail(true);
    }
  }

  if (checkEmail) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <MailCheck size={40} strokeWidth={1.75} className="mx-auto text-state-success" />
        <h2 className="mt-4 font-display text-xl font-bold text-text-heading">
          Check your email
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          We sent a confirmation link to <span className="font-medium text-text-primary">{email}</span>.
          Click it to activate your account, then sign in.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setCheckEmail(false);
            router.push("/login");
          }}
        >
          Back to sign in
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-text-heading">
          Full name
        </label>
        <input
          id="fullName"
          required
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. Ada Obi"
          className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-border-brand focus:ring-2 focus:ring-focus-ring"
        />
      </div>
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
          minLength={6}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
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
        Create account
      </Button>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-16 md:py-24">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-text-heading">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        Track orders, save your details, and pay small small on eligible items.
      </p>
      <Suspense fallback={null}>
        <SignupForm />
      </Suspense>
      <p className="mt-6 text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
