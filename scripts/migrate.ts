/**
 * One-shot migration: Jekyll _posts/*.md → content/posts/*.md
 *
 * - Strips Jekyll layout/permalink fields
 * - Normalizes tag → tags (array)
 * - Adds `kind: leetcode | project | post`
 * - Rewrites Jekyll {% highlight LANG %} ... {% endhighlight %} → fenced code
 * - Slug = lowercased filename minus YYYY-MM-DD- prefix and .md (preserves /:title/)
 * - Copies assets/img → public/img and rewrites /assets/img references
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const SRC = path.join(ROOT, '_posts');
const OUT = path.join(ROOT, 'content', 'posts');
const ASSETS_SRC = path.join(ROOT, 'assets', 'img');
const ASSETS_OUT = path.join(ROOT, 'public', 'img');

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(ASSETS_OUT, { recursive: true });

function copyDir(src: string, dst: string) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

copyDir(ASSETS_SRC, ASSETS_OUT);
// also copy the avatar/background/etc directly to /public for clean URLs
for (const f of ['favicon.ico', 'favicon.png']) {
  const s = path.join(ROOT, f);
  if (fs.existsSync(s)) fs.copyFileSync(s, path.join(ROOT, 'public', f));
}

function preprocessContent(body: string): string {
  let out = body;
  // Jekyll highlight blocks → fenced code
  out = out.replace(/\{%\s*highlight\s+(\w+)\s*%\}/g, (_m, lang) => '\n```' + lang + '\n');
  out = out.replace(/\{%\s*endhighlight\s*%\}/g, '\n```\n');
  // Strip {% raw %} / {% endraw %} wrappers
  out = out.replace(/\{%\s*raw\s*%\}/g, '').replace(/\{%\s*endraw\s*%\}/g, '');
  // Rewrite /assets/img/... or assets/img/... to /img/...
  out = out.replace(/(["'(])\/?assets\/img\//g, '$1/img/');
  return out;
}

function slugFromFilename(file: string): string {
  // 2021-01-01-Leetcode-1-Two-Sum.md → leetcode-1-two-sum
  return file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/i, '').toLowerCase();
}

function normalizeTags(fm: Record<string, unknown>): string[] {
  const raw = (fm.tags ?? fm.tag) as unknown;
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(String).map((s) => s.trim()).filter(Boolean);
  if (typeof raw === 'string')
    return raw
      .split(/[,]\s*/)
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

function detectKind(fm: Record<string, unknown>, slug: string): 'leetcode' | 'project' | 'post' {
  if (fm.leetcode === true || slug.startsWith('leetcode-')) return 'leetcode';
  if (fm.project === true) return 'project';
  return 'post';
}

function dump(fm: Record<string, unknown>, body: string): string {
  const lines = ['---'];
  const orderedKeys = ['title', 'date', 'excerpt', 'kind', 'tags', 'featured', 'order', 'comments'];
  const seen = new Set<string>();
  for (const k of orderedKeys) {
    if (!(k in fm)) continue;
    seen.add(k);
    const v = fm[k];
    lines.push(serializeKey(k, v));
  }
  for (const [k, v] of Object.entries(fm)) {
    if (seen.has(k)) continue;
    if (v === undefined || v === null) continue;
    lines.push(serializeKey(k, v));
  }
  lines.push('---');
  return lines.join('\n') + '\n' + body.trimStart();
}

function serializeKey(k: string, v: unknown): string {
  if (Array.isArray(v)) {
    if (v.length === 0) return `${k}: []`;
    return `${k}:\n${v.map((x) => `  - ${yamlScalar(x)}`).join('\n')}`;
  }
  return `${k}: ${yamlScalar(v)}`;
}

function yamlScalar(v: unknown): string {
  if (v === true || v === false) return String(v);
  if (typeof v === 'number') return String(v);
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  const s = String(v ?? '');
  if (s === '') return '""';
  if (/[:#\-\?\!\&\*\|>\%\@\`\[\]\{\},'"\n]/.test(s) || /^\s|\s$/.test(s)) {
    return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return s;
}

const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.md'));
let migrated = 0;
const skipped: string[] = [];

for (const file of files) {
  if (/\bcopy\b/i.test(file)) {
    skipped.push(file);
    continue;
  }
  const raw = fs.readFileSync(path.join(SRC, file), 'utf8');
  const parsed = matter(raw);
  const fm = { ...parsed.data } as Record<string, unknown>;
  const slug = slugFromFilename(file);
  const kind = detectKind(fm, slug);

  delete fm.layout;
  delete fm.permalink;
  delete fm.tag;
  delete fm.leetcode;
  delete fm.project;
  delete fm.feature;

  const out: Record<string, unknown> = {
    title: fm.title ?? slug,
    date: fm.date ? new Date(fm.date as string).toISOString().slice(0, 10) : '1970-01-01',
    excerpt: fm.excerpt ?? '',
    kind,
    tags: normalizeTags({ ...parsed.data }),
  };
  if (typeof fm.order === 'number') out.order = fm.order;
  if (fm.comments !== undefined) out.comments = fm.comments;

  const body = preprocessContent(parsed.content);
  fs.writeFileSync(path.join(OUT, `${slug}.md`), dump(out, body), 'utf8');
  migrated++;
}

console.log(`migrated: ${migrated}, skipped: ${skipped.length} (${skipped.join(', ') || '-'})`);
