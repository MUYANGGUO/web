import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/content';
import { PostCard } from '@/components/post-card';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Writing on machine learning, simulation, HPC, distributed systems, and side projects.',
  alternates: { canonical: '/posts/' },
};

export default function PostsIndex() {
  const posts = getBlogPosts();
  const groups = new Map<string, typeof posts>();
  for (const p of posts) {
    const y = p.date.slice(0, 4);
    if (!groups.has(y)) groups.set(y, []);
    groups.get(y)!.push(p);
  }
  const years = [...groups.keys()].sort((a, b) => (a < b ? 1 : -1));

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-medium tracking-tight">Posts</h1>
      </header>
      {years.map((year) => (
        <section key={year}>
          <h2 className="mb-4 font-display text-sm font-medium uppercase tracking-wider text-muted">{year}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {groups.get(year)!.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
