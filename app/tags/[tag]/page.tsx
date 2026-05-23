import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag, tagSlug } from '@/lib/content';
import { PostCard } from '@/components/post-card';

type Params = { tag: string };

export function generateStaticParams(): Params[] {
  return getAllTags().map((t) => ({ tag: tagSlug(t.tag) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `Posts tagged with #${tag}.`,
    alternates: { canonical: `/tags/${tag}/` },
  };
}

export default async function TagPage({ params }: { params: Promise<Params> }) {
  const { tag } = await params;
  const all = getAllTags();
  const match = all.find((t) => tagSlug(t.tag) === tag);
  if (!match) notFound();
  const posts = getPostsByTag(match.tag);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">#{match.tag}</h1>
        <p className="mt-2 text-muted">{posts.length} posts</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
