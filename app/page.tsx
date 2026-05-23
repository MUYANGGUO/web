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
  const latestPost = blog[0];
  const featuredProject = projects.find((p) => p.slug === 'threejs-react-cyber-leetcode') ?? projects[0];

  return (
    <div className="space-y-12">
      <Bento
        latestPost={latestPost}
        featuredProject={featuredProject}
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
          {blog.slice(0, 4).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
