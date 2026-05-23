'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    pagefind?: { search: (q: string) => Promise<{ results: Array<{ data: () => Promise<PagefindHit> }> }> };
  }
}

interface PagefindHit {
  url: string;
  meta: { title?: string };
  excerpt: string;
}

type IndexState = 'idle' | 'loading' | 'ready' | 'missing';

export function SearchButton() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [hits, setHits] = useState<PagefindHit[]>([]);
  const [state, setState] = useState<IndexState>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (window.pagefind) {
      setState('ready');
      return;
    }
    setState('loading');
    // Dynamic import is necessary so the bundler doesn't try to resolve it at build time.
    import(/* webpackIgnore: true */ /* @vite-ignore */ '/pagefind/pagefind.js' as string)
      .then((p: { init?: () => void }) => {
        if (typeof p.init === 'function') p.init();
        window.pagefind = p as unknown as Window['pagefind'];
        setState('ready');
      })
      .catch(() => setState('missing'));
  }, [open]);

  useEffect(() => {
    let alive = true;
    if (!q || !window.pagefind) {
      setHits([]);
      return;
    }
    window.pagefind.search(q).then(async (r) => {
      const data = await Promise.all(r.results.slice(0, 10).map((x) => x.data()));
      if (alive) setHits(data);
    });
    return () => {
      alive = false;
    };
  }, [q]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="Search"
          className="ml-1 inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-2.5 py-1.5 text-xs text-muted transition hover:text-fg hover:border-accent/40"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Search</span>
          <kbd className="hidden rounded border border-border bg-subtle px-1.5 py-0.5 font-mono text-[10px] md:inline">
            ⌘K
          </kbd>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content className="fixed left-1/2 top-24 z-50 w-[92vw] max-w-xl -translate-x-1/2 rounded-2xl border border-border bg-card p-2 shadow-2xl animate-fade-in">
          <Dialog.Title className="sr-only">Search</Dialog.Title>
          <div className="flex items-center gap-2 px-3 py-2">
            <Search className="h-4 w-4 text-muted" />
            <input
              ref={inputRef}
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search posts, leetcode, projects…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
          <div className="max-h-[60vh] overflow-y-auto border-t border-border pt-1">
            {state === 'missing' ? (
              <p className="px-4 py-6 text-xs text-muted">
                Search index not found. Run <code className="rounded bg-subtle px-1 py-0.5 font-mono">npm run build</code> once to generate it; it&rsquo;s available in production automatically.
              </p>
            ) : null}
            {state === 'loading' && !window.pagefind ? (
              <p className="px-4 py-6 text-xs text-muted">Loading search index…</p>
            ) : null}
            {state === 'ready' && hits.length === 0 && q ? (
              <p className="px-4 py-6 text-sm text-muted">No results.</p>
            ) : null}
            {hits.map((h) => (
              <a
                key={h.url}
                href={h.url}
                className="block rounded-lg px-3 py-2 transition hover:bg-subtle"
                onClick={() => setOpen(false)}
              >
                <div className="text-sm font-medium">{h.meta.title ?? h.url}</div>
                <div className="mt-0.5 line-clamp-2 text-xs text-muted" dangerouslySetInnerHTML={{ __html: h.excerpt }} />
              </a>
            ))}
            {state === 'ready' && !q ? (
              <p className="px-4 py-6 text-xs text-muted">
                Type to search across blog posts, LeetCode notes, and projects. Index is built statically with Pagefind.
              </p>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
