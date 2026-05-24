import { Bento } from '@/components/bento';
import { PostCard } from '@/components/post-card';
import { getBlogPosts, getPostsByKind } from '@/lib/content';
import { getAllPhotos } from '@/lib/photos';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function HomePage() {
  const blog = getBlogPosts();
  const projects = getPostsByKind('project');
  const photos = await getAllPhotos();
  const latestPost = blog.find((p) => p.slug === 'keyboardlab') ?? blog[0];
  const featuredSlugs = [
    'shadowclaw-your-ai-agents-in-your-pocket',
    'eletypes-four-years-later',
    'threejs-react-cyber-leetcode',
  ];
  const featuredProjects = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 2);
  if (featuredProjects.length === 0 && projects[0]) featuredProjects.push(projects[0]);

  // Hide anything already shown in the Bento (latest post + featured projects)
  const shownSlugs = new Set<string>([latestPost?.slug, ...featuredProjects.map((p) => p.slug)].filter(Boolean) as string[]);
  const recent = blog.filter((p) => !shownSlugs.has(p.slug)).slice(0, 4);

  return (
    <div className="space-y-12">
      <Bento
        latestPost={latestPost}
        featuredProjects={featuredProjects}
        postCount={blog.length}
        projectCount={projects.length}
        photo={photos[0]}
        photoCount={photos.length}
      />

      <section>
        <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em]">Recent / Writing</h2>
          <Link href="/posts/" className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-fg">
            All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-px bg-border md:grid-cols-2 border border-border">
          {recent.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
