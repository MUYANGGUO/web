import Link from 'next/link';
import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 text-sm md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          © {new Date().getFullYear()} — {site.name}
        </p>
        <div className="flex flex-wrap items-center gap-5 font-mono text-[11px] uppercase tracking-[0.16em]">
          <a href={`https://github.com/${site.social.github}`} className="text-muted hover:text-fg" rel="noreferrer noopener">
            github
          </a>
          <a
            href={`https://www.linkedin.com/in/${site.social.linkedin}/`}
            className="text-muted hover:text-fg"
            rel="noreferrer noopener"
          >
            linkedin
          </a>
          <a
            href={`https://www.youtube.com/channel/${site.social.youtubeChannel}`}
            className="text-muted hover:text-fg"
            rel="noreferrer noopener"
          >
            youtube
          </a>
          <Link href="/feed.xml" className="text-muted hover:text-fg">
            rss
          </Link>
        </div>
      </div>
    </footer>
  );
}
