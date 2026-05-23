import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags, tagSlug } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse posts by tag.',
  alternates: { canonical: '/tags/' },
};

export default function TagsIndex() {
  const tags = getAllTags();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Tags</h1>
        <p className="mt-2 text-muted">{tags.length} tags across the archive.</p>
      </header>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Link key={t.tag} href={`/tags/${tagSlug(t.tag)}/`} className="chip hover:text-fg hover:border-accent/40">
            {t.tag} <span className="text-muted">· {t.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
