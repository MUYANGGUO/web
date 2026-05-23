/**
 * Download every Google Drive image referenced in content/posts/*.md to
 * public/img/posts/<id>.png and rewrite the URLs in-place. Run once.
 */
import fs from 'node:fs';
import path from 'node:path';

const POSTS = path.join(process.cwd(), 'content', 'posts');
const OUT = path.join(process.cwd(), 'public', 'img', 'posts');
fs.mkdirSync(OUT, { recursive: true });

const DRIVE_RE = /https:\/\/drive\.google\.com\/uc\?id=([A-Za-z0-9_-]+)/g;
const seen = new Set<string>();

async function download(id: string): Promise<{ ok: true; ext: string } | { ok: false; reason: string }> {
  const url = `https://drive.google.com/uc?id=${id}`;
  try {
    const resp = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://muyangguo.xyz/' },
    });
    if (!resp.ok) return { ok: false, reason: `http ${resp.status}` };
    const ct = resp.headers.get('content-type') ?? '';
    if (!ct.startsWith('image/')) return { ok: false, reason: `not image (${ct})` };
    const ext = ct.split('/')[1].split(';')[0].replace('jpeg', 'jpg');
    const buf = Buffer.from(await resp.arrayBuffer());
    fs.writeFileSync(path.join(OUT, `${id}.${ext}`), buf);
    return { ok: true, ext };
  } catch (e) {
    return { ok: false, reason: (e as Error).message };
  }
}

async function main() {
  // collect ids
  for (const f of fs.readdirSync(POSTS).filter((x) => x.endsWith('.md'))) {
    const body = fs.readFileSync(path.join(POSTS, f), 'utf8');
    for (const m of body.matchAll(DRIVE_RE)) seen.add(m[1]);
  }
  console.log(`found ${seen.size} unique Drive image IDs`);

  // download
  const idToPath = new Map<string, string | null>();
  for (const id of seen) {
    const r = await download(id);
    if (r.ok) {
      idToPath.set(id, `/img/posts/${id}.${r.ext}`);
      console.log(`  ok  ${id}.${r.ext}`);
    } else {
      idToPath.set(id, null);
      console.log(`  bad ${id}: ${r.reason}`);
    }
  }

  // rewrite
  let edits = 0;
  for (const f of fs.readdirSync(POSTS).filter((x) => x.endsWith('.md'))) {
    const fp = path.join(POSTS, f);
    const before = fs.readFileSync(fp, 'utf8');
    const after = before.replace(DRIVE_RE, (whole, id: string) => {
      const local = idToPath.get(id);
      return local ?? whole;
    });
    if (after !== before) {
      fs.writeFileSync(fp, after);
      edits++;
      console.log(`  rewrote ${f}`);
    }
  }
  console.log(`done. files edited: ${edits}`);
}

main();
