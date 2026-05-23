import type { Metadata } from 'next';
import Link from 'next/link';
import { getPostsByKind } from '@/lib/content';
import { LeetcodeTable, type Row } from '@/components/leetcode-table';

export const metadata: Metadata = {
  title: 'LeetCode',
  description: 'LeetCode and LintCode problems with solutions, intuitions, and complexity notes.',
  alternates: { canonical: '/leetcode/' },
};

const TITLE_RE = /^(LeetCode|LintCode|Leetcode|Lintcode)\s+(\d+)\s+(.+?)\s*-\s*(Easy|Medium|Hard)$/i;

function parse(title: string, slug: string, order?: number): Row | null {
  const m = TITLE_RE.exec(title);
  if (m) {
    const src = m[1].toLowerCase();
    return {
      num: Number(m[2]),
      title: m[3],
      slug,
      difficulty: (m[4][0].toUpperCase() + m[4].slice(1).toLowerCase()) as Row['difficulty'],
      source: src.startsWith('lintcode') ? 'LintCode' : 'LeetCode',
    };
  }
  // Fallback for the index / category posts
  if (typeof order === 'number' && order > 0) {
    return {
      num: order,
      title,
      slug,
      difficulty: '',
      source: slug.startsWith('lintcode-') ? 'LintCode' : 'LeetCode',
    };
  }
  return null;
}

export default function LeetcodePage() {
  const posts = getPostsByKind('leetcode');
  const rows = posts
    .map((p) => parse(p.title, p.slug, p.order))
    .filter((r): r is Row => r !== null && r.num > 0)
    .sort((a, b) => {
      if (a.source !== b.source) return a.source.localeCompare(b.source);
      return a.num - b.num;
    });
  const indexPost = posts.find((p) => /index/i.test(p.title));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-medium tracking-tight">LeetCode</h1>
      </header>

      <LeetcodeTable rows={rows} />

      {indexPost ? (
        <p className="text-sm text-muted">
          See the{' '}
          <Link href={`/${indexPost.slug}/`} className="text-accent hover:underline">
            category breakdown
          </Link>{' '}
          for problems grouped by topic.
        </p>
      ) : null}
    </div>
  );
}
