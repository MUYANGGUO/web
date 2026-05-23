/**
 * Post-build: generate /out/feed.xml (Atom) from content collection.
 * Static export can't use Next route handlers, so we render the feed here.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, 'content', 'posts');
const OUT = path.join(ROOT, 'out', 'feed.xml');

const SITE_URL = 'https://muyangguo.com';
const SITE_TITLE = 'Muyang Guo';
const SITE_DESC =
  'Muyang acquired M.S. in Computational Science & Engineering and B.S./M.S. in Mechanical Engineering from Georgia Tech.';

interface Entry {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

const files = fs.readdirSync(CONTENT).filter((f) => f.endsWith('.md'));
const entries: Entry[] = files
  .map((f) => {
    const raw = fs.readFileSync(path.join(CONTENT, f), 'utf8');
    const { data } = matter(raw);
    return {
      slug: f.replace(/\.md$/, ''),
      title: String(data.title ?? ''),
      date: typeof data.date === 'string' ? data.date : new Date(data.date as unknown as string).toISOString().slice(0, 10),
      excerpt: String(data.excerpt ?? ''),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .slice(0, 30);

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const items = entries
  .map(
    (e) => `  <entry>
    <title>${esc(e.title)}</title>
    <link href="${SITE_URL}/${e.slug}/"/>
    <id>${SITE_URL}/${e.slug}/</id>
    <updated>${new Date(e.date).toISOString()}</updated>
    <summary>${esc(e.excerpt)}</summary>
  </entry>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${esc(SITE_TITLE)}</title>
  <subtitle>${esc(SITE_DESC)}</subtitle>
  <link href="${SITE_URL}/feed.xml" rel="self"/>
  <link href="${SITE_URL}/"/>
  <updated>${new Date().toISOString()}</updated>
  <id>${SITE_URL}/</id>
  <author><name>Muyang Guo</name></author>
${items}
</feed>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, xml, 'utf8');
console.log(`feed.xml: ${entries.length} entries → ${OUT}`);
