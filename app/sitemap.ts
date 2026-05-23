import type { MetadataRoute } from 'next';
import { getAllPosts, getAllTags, tagSlug } from '@/lib/content';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/posts/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/leetcode/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/projects/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about/`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/tags/`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];
  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/${p.slug}/`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  const tags: MetadataRoute.Sitemap = getAllTags().map((t) => ({
    url: `${base}/tags/${tagSlug(t.tag)}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.3,
  }));
  return [...staticRoutes, ...posts, ...tags];
}
