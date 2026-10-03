// Strażnik systemu Kwadrat. Uruchamiany przed każdym buildem (npm run build).
// Przerywa build, gdy w src/ złamana jest któraś z reguł z CLAUDE.md (sekcja Strażnik systemu).
// Użycie: node scripts/lint-kwadrat.mjs [katalog]   (domyślnie src)

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.argv[2] ?? 'src';
const EXTENSIONS = new Set(['.astro', '.css', '.ts', '.js', '.mjs', '.md', '.mdx', '.html', '.json', '.svg']);
const TOKENS = 'tokens.css';
const MARKERS = 'markers.css';

const rules = [
  {
    id: 1,
    name: 'kolor hex poza tokens.css',
    skip: (file) => file === TOKENS,
    pattern: /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})(?![\w-])/gi,
  },
  {
    id: 1,
    name: 'kolor rgb()/hsl() poza tokens.css',
    skip: (file) => file === TOKENS,
    pattern: /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(/gi,
  },
  {
    id: 2,
    name: '--kwadrat-red poza tokens.css i markers.css',
    skip: (file) => file === TOKENS || file === MARKERS,
    pattern: /--kwadrat-red\b/g,
  },
  {
    id: 3,
    name: 'border-radius inny niż 0',
    pattern: /border(?:-[a-z]+)*-radius\s*:\s*([^;}"'\n]+)/gi,
    reject: (match) => !/^(?:0(?:px|rem|em|%)?\s*)+(?:!important)?$/.test(match[1].trim()),
  },
  {
    id: 3,
    name: 'cień (box-shadow, text-shadow, drop-shadow)',
    pattern: /\b(?:box-shadow|text-shadow|drop-shadow)\b/gi,
  },
  {
    id: 3,
    name: 'gradient',
    pattern: /\b(?:repeating-)?(?:linear|radial|conic)-gradient\s*\(/gi,
  },
  {
    id: 4,
    name: 'font-weight inny niż 400, 600, 700',
    pattern: /font-weight\s*:\s*([^;}"'\n]+)/gi,
    reject: (match) => !/^(?:400|600|700|inherit)(?:\s*!important)?$/.test(match[1].trim()),
  },
  {
    id: 4,
    name: 'kursywa',
    pattern: /font-style\s*:\s*(?:italic|oblique)/gi,
  },
  {
    id: 4,
    name: 'font-family inny niż var(--font-sans)',
    pattern: /font-family\s*:\s*([^;}"'\n]+)/gi,
    reject: (match) => !/^(?:var\(--font-sans\)|inherit)(?:\s*!important)?$/.test(match[1].trim()),
  },
  {
    id: 4,
    name: 'skrót font: (może zmienić krój lub wagę), dozwolone tylko font: inherit',
    pattern: /(?<![\w-])font\s*:\s*([^;}"'\n]+)/gi,
    reject: (match) => match[1].trim() !== 'inherit',
  },
  {
    id: 5,
    name: 'pauza (U+2014) albo półpauza (U+2013)',
    pattern: /[\u2013\u2014]/g,
  },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTENSIONS.has(path.extname(entry.name))) yield full;
  }
}

const problems = [];

for await (const file of walk(ROOT)) {
  const name = path.basename(file);
  const lines = (await readFile(file, 'utf8')).split('\n');
  lines.forEach((line, index) => {
    for (const rule of rules) {
      if (rule.skip?.(name)) continue;
      for (const match of line.matchAll(rule.pattern)) {
        if (rule.reject && !rule.reject(match)) continue;
        problems.push(`${file}:${index + 1}  [reguła ${rule.id}] ${rule.name}: ${match[0].trim()}`);
      }
    }
  });
}

if (problems.length) {
  console.error(`lint:kwadrat: ${problems.length} naruszeń systemu Kwadrat\n`);
  console.error(problems.join('\n'));
  process.exit(1);
}

console.log('lint:kwadrat: OK, system Kwadrat zachowany');
