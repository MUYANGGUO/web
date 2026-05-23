/**
 * One-shot import: ../practice-leetcode/{Algorithm-Note, LeetCode, LintCode}
 *   → content/posts/*.md
 *
 *  - Algorithm-Note/*.md → kind: post (study notes)
 *  - LeetCode/{ID}-Name-Difficulty/*.py → kind: leetcode (LeetCode problem)
 *  - LintCode/{ID}-Name-Difficulty/*.py → kind: leetcode (LintCode problem)
 *
 *  Conflict policy: skip if any existing file matches the same slug prefix
 *  (`leetcode-{id}-*` or `lintcode-{id}-*`). Existing curated posts win.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = path.resolve(ROOT, '..', 'practice-leetcode');
const OUT = path.join(ROOT, 'content', 'posts');

if (!fs.existsSync(SRC)) {
  console.error(`practice-leetcode source not found at ${SRC}`);
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

// ----- helpers -----

function camelToKebab(s: string): string {
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function yamlScalar(v: unknown): string {
  if (v === true || v === false) return String(v);
  if (typeof v === 'number') return String(v);
  const s = String(v ?? '');
  if (s === '') return '""';
  if (/[:#\-\?\!\&\*\|>\%\@\`\[\]\{\},'"\n]/.test(s) || /^\s|\s$/.test(s)) {
    return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return s;
}

function dumpFrontmatter(fm: Record<string, unknown>): string {
  const lines = ['---'];
  for (const [k, v] of Object.entries(fm)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      if (v.length === 0) {
        lines.push(`${k}: []`);
      } else {
        lines.push(`${k}:`);
        for (const item of v) lines.push(`  - ${yamlScalar(item)}`);
      }
    } else {
      lines.push(`${k}: ${yamlScalar(v)}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

const existing = new Set(
  fs.existsSync(OUT) ? fs.readdirSync(OUT).filter((f) => f.endsWith('.md')) : []
);

function existsForId(prefix: 'leetcode' | 'lintcode', id: string): boolean {
  const re = new RegExp(`^${prefix}-${id}-`);
  for (const f of existing) if (re.test(f)) return true;
  return false;
}

function writePost(filename: string, body: string) {
  const target = path.join(OUT, filename);
  fs.writeFileSync(target, body, 'utf8');
  existing.add(filename);
}

// ----- problem parser shared by LeetCode + LintCode -----

interface ParsedFolder {
  id: string;
  name: string;
  difficulty: string;
  slugBase: string;
}

function parseFolderName(folder: string): ParsedFolder | null {
  // "01-TwoSum-Easy", "1166-RecommendedResultsAreScattered-Easy",
  // "08-StringToInteger(atoi)-Medium"
  const m = /^(\d+)-(.+?)-(Easy|Medium|Hard)$/i.exec(folder);
  if (!m) return null;
  const id = String(parseInt(m[1], 10));
  const name = m[2];
  const difficulty = m[3][0].toUpperCase() + m[3].slice(1).toLowerCase();
  const slugBase = camelToKebab(name);
  return { id, name, difficulty, slugBase };
}

function readPythonFiles(folderPath: string): { filename: string; content: string }[] {
  const files = fs.readdirSync(folderPath).filter((f) => f.endsWith('.py') || f.endsWith('.cpp') || f.endsWith('.java'));
  return files.map((f) => ({
    filename: f,
    content: fs.readFileSync(path.join(folderPath, f), 'utf8'),
  }));
}

function extractDocstring(code: string): { docstring: string; rest: string } {
  // Match leading triple-quoted docstring (either ''' or """)
  const m = /^\s*('''|""")([\s\S]*?)\1/.exec(code);
  if (!m) return { docstring: '', rest: code.trimStart() };
  const docstring = m[2].trim();
  const rest = code.slice(m[0].length).trimStart();
  return { docstring, rest };
}

function languageFromExt(filename: string): string {
  if (filename.endsWith('.py')) return 'python';
  if (filename.endsWith('.cpp')) return 'cpp';
  if (filename.endsWith('.java')) return 'java';
  return '';
}

function importProblem(
  source: 'LeetCode' | 'LintCode',
  prefix: 'leetcode' | 'lintcode',
  folder: string,
  folderPath: string
): 'imported' | 'skipped' | 'invalid' {
  const parsed = parseFolderName(folder);
  if (!parsed) return 'invalid';
  if (existsForId(prefix, parsed.id)) return 'skipped';

  const files = readPythonFiles(folderPath);
  if (files.length === 0) return 'invalid';

  // Pull docstring from first .py file (preferred)
  const primary = files.find((f) => f.filename.endsWith('.py')) ?? files[0];
  const { docstring, rest: primaryCode } = extractDocstring(primary.content);

  const titleHuman = parsed.name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  const title = `${source} ${parsed.id} ${titleHuman} - ${parsed.difficulty}`;
  const slug = `${prefix}-${parsed.id}-${parsed.slugBase}`;

  // Excerpt: first non-empty line of docstring, cap at 140 chars
  const excerptRaw = docstring.split('\n').map((l) => l.trim()).find((l) => l.length > 0) ?? '';
  const excerpt = excerptRaw.length > 140 ? excerptRaw.slice(0, 137) + '…' : excerptRaw;

  const fm = {
    title,
    date: '2021-01-01',
    excerpt,
    kind: 'leetcode',
    tags: [source, parsed.difficulty, 'Python'],
    order: Number(parsed.id),
    comments: true,
  };

  const lines: string[] = [];
  lines.push(dumpFrontmatter(fm));
  lines.push('');
  lines.push(`### ${parsed.id}. ${titleHuman} — ${parsed.difficulty}`);
  lines.push('');
  const probUrl =
    source === 'LeetCode'
      ? `https://leetcode.com/problems/${parsed.slugBase}/`
      : `https://www.lintcode.com/problem/${parsed.id}/`;
  lines.push(`[Open on ${source}](${probUrl})`);
  lines.push('');

  if (docstring) {
    lines.push('## Problem');
    lines.push('');
    for (const l of docstring.split('\n')) lines.push(l);
    lines.push('');
  }

  lines.push('## Solution');
  lines.push('');

  // For multi-file folders, render each with a subhead
  if (files.length === 1) {
    const code = primaryCode || primary.content;
    lines.push('```' + languageFromExt(primary.filename));
    lines.push(code.trim());
    lines.push('```');
  } else {
    for (const f of files) {
      const code = f === primary ? primaryCode || primary.content : f.content;
      lines.push(`### \`${f.filename}\``);
      lines.push('');
      lines.push('```' + languageFromExt(f.filename));
      lines.push(code.trim());
      lines.push('```');
      lines.push('');
    }
  }
  lines.push('');

  writePost(`${slug}.md`, lines.join('\n'));
  return 'imported';
}

// ----- algorithm notes -----

function noteSlugFromFilename(filename: string): string {
  // "2-algorithm-binary-search.md" → "algorithm-binary-search"
  // "12-algprithm-DFS-lecture-part1.md" → "algorithm-dfs-lecture-part1"  (fix typo)
  let base = filename.replace(/\.md$/i, '').replace(/^\d+-/, '');
  base = base.replace(/algprithm/gi, 'algorithm');
  return camelToKebab(base);
}

function noteTitleFromFilename(filename: string): string {
  let base = filename.replace(/\.md$/i, '').replace(/^\d+-/, '');
  base = base.replace(/algprithm/gi, 'algorithm');
  // Convert hyphens to spaces; title-case Algorithm
  const words = base.split(/[-_]/).filter(Boolean);
  return words
    .map((w) =>
      w.toLowerCase() === 'algorithm' ? 'Algorithm' : w[0]?.toUpperCase() + w.slice(1)
    )
    .join(' ')
    .replace(/^Algorithm /, 'Algorithm Notes: ');
}

function importNotesFromDir(dir: string, slugPrefix = 'note'): number {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Recurse into subdirs like "十五天算法"
      count += importNotesFromDir(fullPath, slugPrefix);
      continue;
    }
    if (!entry.name.endsWith('.md')) continue;
    const slugBody = noteSlugFromFilename(entry.name);
    const slug = `${slugPrefix}-${slugBody}`;
    const filename = `${slug}.md`;
    if (existing.has(filename)) {
      continue;
    }
    const title = noteTitleFromFilename(entry.name);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const fm = {
      title,
      date: '2021-01-01',
      excerpt: '',
      kind: 'post',
      tags: ['Algorithm Notes', 'Study Notes'],
      comments: true,
    };
    const body = `${dumpFrontmatter(fm)}\n\n${raw.trim()}\n`;
    writePost(filename, body);
    count++;
  }
  return count;
}

// ----- run -----

const result = {
  notes: 0,
  leetcode: { imported: 0, skipped: 0, invalid: 0 },
  lintcode: { imported: 0, skipped: 0, invalid: 0 },
};

// 1. Algorithm notes
result.notes = importNotesFromDir(path.join(SRC, 'Algorithm-Note'));

// 2. LeetCode
const LC = path.join(SRC, 'LeetCode');
if (fs.existsSync(LC)) {
  for (const folder of fs.readdirSync(LC)) {
    const p = path.join(LC, folder);
    if (!fs.statSync(p).isDirectory()) continue;
    const r = importProblem('LeetCode', 'leetcode', folder, p);
    result.leetcode[r]++;
  }
}

// 3. LintCode
const LinC = path.join(SRC, 'LintCode');
if (fs.existsSync(LinC)) {
  for (const folder of fs.readdirSync(LinC)) {
    const p = path.join(LinC, folder);
    if (!fs.statSync(p).isDirectory()) continue;
    const r = importProblem('LintCode', 'lintcode', folder, p);
    result.lintcode[r]++;
  }
}

console.log(JSON.stringify(result, null, 2));
