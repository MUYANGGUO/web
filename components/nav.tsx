import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { SearchButton } from './search';

const items = [
  { href: '/posts/', label: 'Writing' },
  { href: '/projects/', label: 'Projects' },
  { href: '/photos/', label: 'Photos' },
  { href: '/about/', label: 'CV' },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5">
        <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.22em] font-medium">
          MUYANG GUO <span className="text-muted">/ INDEX</span>
        </Link>
        <nav className="flex items-center gap-0.5 text-sm">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition hover:text-fg"
            >
              {it.label}
            </Link>
          ))}
          <SearchButton />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
