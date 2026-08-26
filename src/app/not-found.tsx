import { LinkButton } from "@/components/button";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-24 text-center">
      <p className="font-display text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-text-heading">
        This page is out of stock
      </h1>
      <p className="mt-2 text-sm text-text-tertiary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <LinkButton href="/" variant="accent" size="lg" className="mt-8">
        Back to the store
      </LinkButton>
    </div>
  );
}
