import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Post } from '@/lib/content';
import { formatDate } from '@/lib/utils';

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/${post.slug}/`}
      className="group flex flex-col gap-2 border border-border bg-card p-5 transition-colors hover:bg-subtle"
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="flex items-center gap-2">
          {post.readingMinutes}m
          <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
        </span>
      </div>
      <h3 className="text-[15px] font-medium leading-snug tracking-tight">
        {post.title}
      </h3>
      {post.excerpt ? <p className="line-clamp-2 text-sm text-muted">{post.excerpt}</p> : null}
      {post.tags.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 4).map((t) => (
            <span key={t} className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              · {t}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
