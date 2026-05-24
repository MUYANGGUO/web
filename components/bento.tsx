import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Youtube, ArrowUpRight, ArrowRight } from 'lucide-react';
import { site } from '@/lib/site';
import { formatDate } from '@/lib/utils';
import type { Post } from '@/lib/content';
import type { Photo } from '@/lib/photos';
import { cn } from '@/lib/utils';
import { AvatarLightbox } from './avatar-lightbox';

interface Props {
  latestPost: Post | undefined;
  featuredProjects: Post[];
  postCount: number;
  projectCount: number;
  photo?: Photo;
  photoCount: number;
}

// Per-tile short titles to keep narrow Bento tiles from wrapping awkwardly.
const BENTO_SHORT_TITLES: Record<string, string> = {
  'eletypes-four-years-later': 'EleTypes.com',
};
function bentoShortTitle(post: Post): string {
  return BENTO_SHORT_TITLES[post.slug] ?? post.title;
}

export function Bento({ latestPost, featuredProjects, postCount, projectCount, photo, photoCount }: Props) {
  return (
    <section className="grid grid-cols-1 gap-px bg-border md:grid-cols-6 md:auto-rows-[minmax(160px,auto)] border border-border">
      {/* Hero — span 4x2 */}
      <Tile
        className="md:col-span-4 md:row-span-2 flex flex-col justify-between p-6 md:p-8 border-l-2"
        style={{ borderLeftColor: '#b026ff' }}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-[2.2rem] font-medium leading-[1.05] tracking-tight md:text-[3rem]">
              {site.name}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-[15px]">
              {site.description}
            </p>
          </div>
          <AvatarLightbox />

        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          <Link href="/posts/" className="pill-btn">Writing →</Link>
          <Link href="/projects/" className="pill-btn">Projects →</Link>
          <Link href="/about/" className="pill-btn">CV →</Link>
        </div>
      </Tile>

      {/* Stats — 2 wide, large mono */}
      <Tile className="md:col-span-2 grid grid-cols-2 items-end gap-2 p-5">
        <Stat n={postCount} label="Posts" />
        <Stat n={projectCount} label="Proj" />
      </Tile>

      {/* Social icons — logos only */}
      <Tile className="md:col-span-2 flex flex-col gap-3 p-5">
        <p className="label">Find me</p>
        <div className="grid grid-cols-3 gap-px bg-border flex-1">
          <SocialIcon href={`https://github.com/${site.social.github}`} label="GitHub" icon={<Github className="h-5 w-5" />} />
          <SocialIcon href={`https://www.linkedin.com/in/${site.social.linkedin}/`} label="LinkedIn" icon={<Linkedin className="h-5 w-5" />} />
          <SocialIcon href={`https://www.youtube.com/channel/${site.social.youtubeChannel}`} label="YouTube" icon={<Youtube className="h-5 w-5" />} />
        </div>
      </Tile>

      {/* Latest post — accent highlight */}
      {latestPost ? (
        <TileLink href={`/${latestPost.slug}/`} accent className="md:col-span-4 group flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="label-accent">Latest / Writing</span>
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <h3 className="mt-4 max-w-xl text-[1.4rem] font-medium leading-tight tracking-tight md:text-[1.6rem]">
              {latestPost.title}
            </h3>
            {latestPost.excerpt ? <p className="mt-3 line-clamp-2 max-w-xl text-sm opacity-80">{latestPost.excerpt}</p> : null}
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-widest">
            {formatDate(latestPost.date)} — {latestPost.readingMinutes}M READ
          </p>
        </TileLink>
      ) : null}

      {/* Awards — college era (placed early so it docks next to Latest Post, directly under Social) */}
      <Tile className="md:col-span-2 flex flex-col gap-3 p-5">
        <p className="label">Recognition</p>
        <ul className="space-y-3 text-[13px] leading-relaxed">
          <li>
            <span className="font-medium">1st place</span>{' '}
            <span className="text-muted">— ASME Hackathon 2020.</span>
          </li>
          <li>
            <span className="font-medium">Honorable mention</span>{' '}
            <span className="text-muted">— EGHI&rsquo;s Global Health Hackathon, 2021.</span>
          </li>
        </ul>
      </Tile>

      {/* Featured project — primary (large) */}
      {featuredProjects[0] ? (
        <TileLink href={`/${featuredProjects[0].slug}/`} className="md:col-span-4 group flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="label">Featured / Project</span>
              <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
            </div>
            <h3 className="mt-4 min-h-[2lh] max-w-xl text-[1.4rem] font-medium leading-tight tracking-tight md:text-[1.6rem]">
              {featuredProjects[0].title}
            </h3>
            {featuredProjects[0].excerpt ? (
              <p className="mt-1 line-clamp-2 max-w-xl text-sm text-muted">{featuredProjects[0].excerpt}</p>
            ) : null}
          </div>
          <p className="mt-6 label">{formatDate(featuredProjects[0].date)}</p>
        </TileLink>
      ) : null}

      {/* Featured project — secondary (narrower col-span-2, but matches primary typography) */}
      {featuredProjects[1] ? (
        <TileLink href={`/${featuredProjects[1].slug}/`} className="md:col-span-2 group flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="label">Featured / Project</span>
              <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
            </div>
            <h3 className="mt-4 min-h-[2lh] text-[1.4rem] font-medium leading-tight tracking-tight md:text-[1.6rem]">
              {bentoShortTitle(featuredProjects[1])}
            </h3>
            {featuredProjects[1].excerpt ? (
              <p className="mt-1 line-clamp-2 text-sm text-muted">{featuredProjects[1].excerpt}</p>
            ) : null}
          </div>
          <p className="mt-6 label">{formatDate(featuredProjects[1].date)}</p>
        </TileLink>
      ) : null}

      {/* Photography teaser */}
      {photo ? (
        <Link
          href="/photos/"
          className="group relative overflow-hidden bg-card md:col-span-2"
          aria-label="Photography"
        >
          <Image
            src={photo.src}
            alt="Photography"
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/0" />
          <div className="relative flex h-full flex-col justify-between p-5 text-white">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em]">Photo / {photoCount.toString().padStart(2, '0')}</p>
            <div>
              <p className="text-[15px] font-medium">Photography →</p>
              {photo.camera || photo.date ? (
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                  {[photo.camera, photo.date].filter(Boolean).join(' · ')}
                </p>
              ) : null}
            </div>
          </div>
        </Link>
      ) : (
        <div className="md:col-span-2 bg-card" aria-hidden="true" />
      )}

      {/* LeetCode CTA */}
      <TileLink href="/leetcode/" className="md:col-span-2 group flex items-center justify-between p-5">
        <div>
          <p className="label">Archive / Algorithms</p>
          <p className="mt-2 font-medium tracking-tight">LeetCode notes</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-fg" />
      </TileLink>
    </section>
  );
}

interface TileProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
function Tile({ className, children, style }: TileProps) {
  return (
    <div className={cn('bg-card', className)} style={style}>
      {children}
    </div>
  );
}

interface TileLinkProps extends TileProps {
  href: string;
  accent?: boolean;
}
function TileLink({ className, children, href, accent }: TileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'transition-colors',
        accent ? 'bg-accent text-accent-fg hover:bg-accent/90' : 'bg-card hover:bg-subtle',
        className
      )}
    >
      {children}
    </Link>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div>
      <p className="font-mono text-[2.5rem] font-medium leading-none tracking-tight tabular-nums">{String(n).padStart(2, '0')}</p>
      <p className="mt-2 label">{label}</p>
    </div>
  );
}

function SocialIcon({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      title={label}
      className="group flex items-center justify-center bg-card text-muted transition-colors hover:bg-fg hover:text-bg"
    >
      {icon}
    </a>
  );
}
