'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export interface Row {
  num: number;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | '';
  source: 'LeetCode' | 'LintCode' | 'Other';
}

const difficultyClass: Record<string, string> = {
  Easy: 'text-emerald-500',
  Medium: 'text-amber-500',
  Hard: 'text-rose-500',
};

const difficulties = ['All', 'Easy', 'Medium', 'Hard'] as const;
const sources = ['All', 'LeetCode', 'LintCode'] as const;

export function LeetcodeTable({ rows }: { rows: Row[] }) {
  const [diff, setDiff] = useState<(typeof difficulties)[number]>('All');
  const [src, setSrc] = useState<(typeof sources)[number]>('All');

  const filtered = useMemo(() => {
    return rows
      .filter((r) => diff === 'All' || r.difficulty === diff)
      .filter((r) => src === 'All' || r.source === src);
  }, [rows, diff, src]);

  const counts = useMemo(() => {
    const c = { Easy: 0, Medium: 0, Hard: 0 } as Record<string, number>;
    for (const r of rows) if (r.difficulty in c) c[r.difficulty]++;
    return c;
  }, [rows]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border bg-card/40 px-4 py-3">
        <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em]">
          <span className="text-muted">Difficulty:</span>
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDiff(d)}
              className={
                'rounded-sm px-2 py-1 transition ' +
                (diff === d ? 'bg-fg text-bg' : 'text-muted hover:text-fg')
              }
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em]">
          <span className="text-muted">Source:</span>
          {sources.map((s) => (
            <button
              key={s}
              onClick={() => setSrc(s)}
              className={
                'rounded-sm px-2 py-1 transition ' +
                (src === s ? 'bg-fg text-bg' : 'text-muted hover:text-fg')
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="border-x border-b border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-subtle/60 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="w-20 px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Problem</th>
              <th className="w-28 px-4 py-3 text-left">Source</th>
              <th className="w-28 px-4 py-3 text-left">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.slug} className="border-b border-border/60 last:border-0 hover:bg-subtle/40">
                <td className="px-4 py-3 font-mono text-xs text-muted">{r.num}</td>
                <td className="px-4 py-3">
                  <Link href={`/${r.slug}/`} className="font-medium hover:text-accent">
                    {r.title}
                  </Link>
                </td>
                <td className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                  {r.source}
                </td>
                <td className={`px-4 py-3 text-xs font-medium ${difficultyClass[r.difficulty] ?? ''}`}>
                  {r.difficulty}
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  No problems match the current filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        Showing {filtered.length} of {rows.length}.{' '}
        Easy {counts.Easy} · Medium {counts.Medium} · Hard {counts.Hard}.
      </p>
    </>
  );
}
