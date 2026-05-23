import type { Metadata } from 'next';
import Link from 'next/link';
import { getPostsByKind } from '@/lib/content';
import { DifficultyTable, type Row } from '@/components/leetcode-table';

export const metadata: Metadata = {
  title: 'LeetCode',
  description: 'LeetCode and LintCode problems with solutions, intuitions, and complexity notes.',
  alternates: { canonical: '/leetcode/' },
};

const TITLE_RE = /^(LeetCode|LintCode|Leetcode|Lintcode)\s+(\d+)\s+(.+?)\s*-\s*(Easy|Medium|Hard)$/i;

interface ParsedRow extends Row {
  source: 'LeetCode' | 'LintCode';
}

function parse(title: string, slug: string, order?: number): ParsedRow | null {
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
  const allRows = posts
    .map((p) => parse(p.title, p.slug, p.order))
    .filter((r): r is ParsedRow => r !== null && r.num > 0);

  const leetRows = allRows.filter((r) => r.source === 'LeetCode').sort((a, b) => a.num - b.num);
  const lintRows = allRows.filter((r) => r.source === 'LintCode').sort((a, b) => a.num - b.num);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-medium tracking-tight">LeetCode</h1>
        <p className="text-sm text-muted">
          Also see the{' '}
          <Link href="/tags/algorithm-notes/" className="text-accent hover:underline">
            algorithm study notes
          </Link>{' '}
          — theory + walkthroughs that pair with these problems.
        </p>
      </header>

      <DifficultyTable title="LeetCode" rows={leetRows} />
      <DifficultyTable title="LintCode" rows={lintRows} />
    </div>
  );
}
