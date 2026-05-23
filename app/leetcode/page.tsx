import type { Metadata } from 'next';
import Link from 'next/link';
import { getPostsByKind } from '@/lib/content';

export const metadata: Metadata = {
  title: 'LeetCode',
  description: 'LeetCode problems with solutions, intuitions, and complexity notes.',
  alternates: { canonical: '/leetcode/' },
};

interface Row {
  num: number | null;
  title: string;
  slug: string;
  difficulty: string;
}

const difficultyClass: Record<string, string> = {
  Easy: 'text-emerald-500',
  Medium: 'text-amber-500',
  Hard: 'text-rose-500',
};

function parse(title: string, slug: string): Row {
  // "Leetcode 1 Two Sum - Easy" → 1, "Two Sum", "Easy"
  // Index page → num null
  const m = /Leetcode\s+(\d+)\s+(.+?)\s*-\s*(Easy|Medium|Hard)$/i.exec(title);
  if (m) return { num: Number(m[1]), title: m[2], slug, difficulty: m[3] };
  return { num: null, title, slug, difficulty: '' };
}

export default function LeetcodePage() {
  const posts = getPostsByKind('leetcode');
  const rows = posts
    .map((p) => parse(p.title, p.slug))
    .filter((r) => r.num !== null)
    .sort((a, b) => (a.num! - b.num!));
  const indexPost = posts.find((p) => /index/i.test(p.title));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">LeetCode</h1>
        <p className="mt-2 text-muted">Solutions, intuitions, and a quick rolodex by problem number.</p>
      </header>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-subtle/60 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="w-16 px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Problem</th>
              <th className="w-32 px-4 py-3 text-left">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className="border-b border-border/60 last:border-0 hover:bg-subtle/40">
                <td className="px-4 py-3 font-mono text-xs text-muted">{r.num}</td>
                <td className="px-4 py-3">
                  <Link href={`/${r.slug}/`} className="font-medium hover:text-accent">
                    {r.title}
                  </Link>
                </td>
                <td className={`px-4 py-3 text-xs font-medium ${difficultyClass[r.difficulty] ?? ''}`}>
                  {r.difficulty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
