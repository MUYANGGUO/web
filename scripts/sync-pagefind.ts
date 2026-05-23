/**
 * After build, mirror out/pagefind → public/pagefind so the Next.js dev server
 * can serve the search index at /pagefind/*. The production export already
 * has it at out/pagefind, so this only affects local dev.
 */
import fs from 'node:fs';
import path from 'node:path';

const src = path.join(process.cwd(), 'out', 'pagefind');
const dst = path.join(process.cwd(), 'public', 'pagefind');

if (!fs.existsSync(src)) {
  console.warn(`sync-pagefind: ${src} missing — skip`);
  process.exit(0);
}
fs.rmSync(dst, { recursive: true, force: true });
fs.cpSync(src, dst, { recursive: true });
console.log(`sync-pagefind: ${src} → ${dst}`);
