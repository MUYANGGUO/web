/**
 * Scan all content/posts/*.md for image references, HEAD-probe each remote URL,
 * print a report of broken ones grouped by file. Read-only — does not edit posts.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'content', 'posts');

interface Ref {
  file: string;
  url: string;
  raw: string;
}

const refs: Ref[] = [];
for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.md'))) {
  const body = fs.readFileSync(path.join(DIR, f), 'utf8');
  // <img src="..."> with single or double quotes
  for (const m of body.matchAll(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi)) {
    refs.push({ file: f, url: m[1], raw: m[0] });
  }
  // ![alt](url) — markdown image
  for (const m of body.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) {
    refs.push({ file: f, url: m[1], raw: m[0] });
  }
}

console.log(`scanned ${refs.length} image refs across content/posts/`);

async function main() {
const results = await Promise.all(
  refs.map(async (r) => {
    if (r.url.startsWith('/')) return { ...r, status: 'local', code: 0 };
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);
      let resp = await fetch(r.url, { method: 'HEAD', redirect: 'follow', signal: ctrl.signal });
      // GitHub raw + some hosts return 405 on HEAD; retry with GET range
      if (resp.status === 405 || resp.status === 403) {
        resp = await fetch(r.url, { method: 'GET', redirect: 'follow', signal: ctrl.signal, headers: { Range: 'bytes=0-0' } });
      }
      clearTimeout(t);
      return { ...r, status: resp.ok || resp.status === 206 ? 'ok' : 'bad', code: resp.status };
    } catch (e) {
      return { ...r, status: 'err', code: 0, error: (e as Error).message };
    }
  })
);

const broken = results.filter((r) => r.status === 'bad' || r.status === 'err');
console.log(`\n=== ${broken.length} broken / unreachable ===`);
const byFile = new Map<string, typeof broken>();
for (const b of broken) {
  if (!byFile.has(b.file)) byFile.set(b.file, []);
  byFile.get(b.file)!.push(b);
}
for (const [f, list] of byFile) {
  console.log(`\n${f}:`);
  for (const b of list) {
    console.log(`  [${b.code || 'err'}] ${b.url}`);
  }
}

const ok = results.filter((r) => r.status === 'ok' || r.status === 'local');
console.log(`\n=== ${ok.length} ok ===`);
}
main();
