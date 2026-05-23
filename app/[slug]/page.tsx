import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug, renderMarkdown, tagSlug } from '@/lib/content';
import { site } from '@/lib/site';
import { formatDate } from '@/lib/utils';
import { Disqus } from '@/components/disqus';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const canonical = `/${post.slug}/`;
  return {
    title: post.title,
    description: post.excerpt || site.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt || site.description,
      type: 'article',
      url: canonical,
      publishedTime: post.date,
      tags: post.tags,
      images: [site.avatar],
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.excerpt || site.description,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const html = await renderMarkdown(post.body);
  const url = `${site.url}/${post.slug}/`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: site.author, url: site.url },
    mainEntityOfPage: url,
    image: `${site.url}${site.avatar}`,
    keywords: post.tags.join(', '),
  };

  const kindLabel = post.kind === 'leetcode' ? 'LeetCode' : post.kind === 'project' ? 'Project' : 'Post';

  return (
    <article className="mx-auto max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="mb-8 border-b border-border pb-6">
        <p className="chip mb-3">{kindLabel}</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{post.title}</h1>
        {post.excerpt ? <p className="mt-3 text-muted">{post.excerpt}</p> : null}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingMinutes} min read</span>
          {post.tags.length > 0 ? (
            <>
              <span>·</span>
              <span className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <Link key={t} href={`/tags/${tagSlug(t)}/`} className="chip hover:text-fg">
                    #{t}
                  </Link>
                ))}
              </span>
            </>
          ) : null}
        </div>
      </header>

      <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />

      {post.comments !== false ? <Disqus identifier={post.slug} title={post.title} url={url} /> : null}
    </article>
  );
}
