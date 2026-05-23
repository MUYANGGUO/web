import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

export type Kind = 'leetcode' | 'project' | 'post';

export interface Frontmatter {
  title: string;
  date: string;
  excerpt: string;
  kind: Kind;
  tags: string[];
  order?: number;
  comments?: boolean;
}

export interface Post extends Frontmatter {
  slug: string;
  body: string;
  readingMinutes: number;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'posts');

let _cache: Post[] | null = null;
const isDev = process.env.NODE_ENV !== 'production';

export function getAllPosts(): Post[] {
  if (!isDev && _cache) return _cache;
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  const out: Post[] = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const fm = data as Partial<Frontmatter>;
    const words = content.split(/\s+/).filter(Boolean).length;
    return {
      slug,
      title: fm.title ?? slug,
      date: typeof fm.date === 'string' ? fm.date : new Date(fm.date as unknown as string).toISOString().slice(0, 10),
      excerpt: fm.excerpt ?? '',
      kind: (fm.kind as Kind) ?? 'post',
      tags: fm.tags ?? [],
      order: fm.order,
      comments: fm.comments,
      body: content,
      readingMinutes: Math.max(1, Math.round(words / 200)),
    };
  });
  out.sort((a, b) => (a.date < b.date ? 1 : -1));
  if (!isDev) _cache = out;
  return out;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug.toLowerCase());
}

export function getPostsByKind(kind: Kind): Post[] {
  return getAllPosts().filter((p) => p.kind === kind);
}

export function getBlogPosts(): Post[] {
  // The "posts" listing: everything except leetcode (per user request to keep leetcode separate).
  return getAllPosts().filter((p) => p.kind !== 'leetcode');
}

export function getAllTags(): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of getAllPosts()) {
    for (const t of p.tags) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return [...map.entries()].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  const t = tag.toLowerCase();
  return getAllPosts().filter((p) => p.tags.some((x) => x.toLowerCase() === t));
}

export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['heading-anchor'] } })
  .use(rehypeKatex)
  .use(rehypePrettyCode, {
    theme: { dark: 'github-dark-dimmed', light: 'github-light' },
    keepBackground: false,
  })
  .use(rehypeStringify, { allowDangerousHtml: true });

export async function renderMarkdown(body: string): Promise<string> {
  const file = await processor.process(body);
  return String(file);
}
