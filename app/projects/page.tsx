import type { Metadata } from 'next';
import { getPostsByKind } from '@/lib/content';
import { PostCard } from '@/components/post-card';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Side projects, hackathon submissions, and research work.',
  alternates: { canonical: '/projects/' },
};

export default function ProjectsPage() {
  const projects = getPostsByKind('project');
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-2 text-muted">Side projects, hackathon work, and research write-ups.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
