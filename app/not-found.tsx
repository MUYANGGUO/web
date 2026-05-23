import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-24 text-center">
      <p className="font-mono text-xs text-muted">404</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted">The page you&rsquo;re looking for might have been moved, renamed, or never existed.</p>
      <Link href="/" className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-accent/40">
        Back home
      </Link>
    </div>
  );
}
