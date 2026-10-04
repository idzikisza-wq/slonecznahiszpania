// Strażnik systemu Kwadrat. Uruchamiany przed każdym buildem (npm run build).
// Przerywa build, gdy w src/ złamana jest któraś z reguł z CLAUDE.md (sekcja Strażnik systemu).
// Użycie: node scripts/lint-kwadrat.mjs [katalog]   (domyślnie src; package.json z katalogu wyżej)
//
// Pliki czyta w całości (deklaracja może mieć wartość w kolejnej linii), po usunięciu komentarzy.
// Sprawdza zapis CSS (border-radius) i obiekty stylu w JS i Astro (borderRadius).
// Wyjątki dotyczą ścieżek względem katalogu: styles/tokens.css i styles/markers.css.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.argv[2] ?? 'src');
const PACKAGE = path.join(path.dirname(ROOT), 'package.json');
const EXTENSIONS = new Set(['.astro', '.css', '.ts', '.js', '.mjs', '.md', '.mdx', '.html', '.json', '.svg']);
const TOKENS = 'styles/tokens.css';
const MARKERS = 'styles/markers.css';

// Jedyne dozwolone użycia czerwieni w markers.css: selektor i właściwość
const RED_USES = new Set([
  'h2:not(.h3)::before|background',
  '.list--plus > li::before|background',
  '.kpi--accent|color',
]);

// Tokeny z CLAUDE.md: definiuje je wyłącznie tokens.css
const TOKEN_NAMES =
  'kwadrat-red|red-tint|ink|text|muted|line|line-soft|surface|paper|font-sans|rule|marker-section|marker-list|' +
  'container|side|gutter|measure|section|block|space-xs|space-s|space-m';

// Nazwane kolory CSS (bez transparent i currentColor)
const NAMED_COLORS =
  'aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|' +
  'burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|' +
  'darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|' +
  'darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|' +
  'deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|' +
  'ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|' +
  'lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|' +
  'lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|' +
  'lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|' +
  'mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|' +
  'mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|' +
  'olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|' +
  'papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|' +
  'saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|' +
  'snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|' +
  'yellowgreen';
const NAMED_COLOR = new RegExp(`(?<![\\w-])(?:${NAMED_COLORS})(?![\\w-])`, 'i');

// Właściwości z kolorem, w zapisie CSS i w obiektach stylu (camelCase)
const COLOR_PROPS =
  /(?<![\w-])(color|background(?:-color)?|backgroundColor|border(?:-(?:top|right|bottom|left|block|inline)(?:-(?:start|end))?)?(?:-color)?|border(?:Top|Right|Bottom|Left)?(?:Color)?|outline(?:-color)?|outlineColor|text-decoration(?:-color)?|textDecoration(?:Color)?|caret-color|caretColor|accent-color|accentColor|column-rule(?:-color)?|fill|stroke)\s*[:=]\s*(["']?)([^;}\n]*)/g;

// Biblioteki ikon i fonty ikon (system nie używa ikon)
const ICON_SOURCE =
  /(?:(?:^|[/@~-])icons?(?:[/-]|$)|lucide|fortawesome|font-?awesome|material-symbols|@mdi\/|@iconify|feather|phosphor|@tabler\/|octicons|remixicon|boxicons)/i;

// Wartość deklaracji bez cudzysłowów, !important i reszty linii. Kończy się na średniku, klamrze,
// cudzysłowie zamykającym atrybut style albo na następnej właściwości obiektu stylu.
// Przykłady: `var(--font-sans)` zostaje, `'8px', boxShadow: …` daje 8px,
// `700" class="nowrap">` z atrybutu style daje 700, `"Mulish";` daje Mulish.
const valueOf = (raw) => {
  let value = raw.trim();
  const quote = value.match(/^["'`]/)?.[0];
  if (quote) {
    const close = value.indexOf(quote, 1);
    value = close === -1 ? value.slice(1) : value.slice(1, close);
  } else {
    value = value.split(/["'`]|,\s*[\w-]+\s*:/)[0];
  }
  value = value.replace(/\s*!important\s*$/, '').trim();
  while (value.endsWith(')') && value.split(')').length > value.split('(').length) value = value.slice(0, -1).trim();
  return value.replace(/[,;]+$/, '').trim();
};

const rules = [
  {
    id: 1,
    name: 'kolor hex poza tokens.css',
    skip: (rel) => rel === TOKENS,
    pattern: /(?<![&\w/])(?<!href=["'])#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})(?![\w-])/gi,
  },
  {
    id: 1,
    name: 'kolor hex w data URI (%23) poza tokens.css',
    skip: (rel) => rel === TOKENS,
    pattern: /%23(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})(?![0-9a-f])/gi,
  },
  {
    id: 1,
    name: 'kolor rgb(), hsl(), color-mix() poza tokens.css',
    skip: (rel) => rel === TOKENS,
    pattern: /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color-mix|color)\(/gi,
  },
  {
    id: 1,
    name: 'nazwany kolor CSS poza tokens.css',
    skip: (rel) => rel === TOKENS,
    pattern: COLOR_PROPS,
    reject: (match) => NAMED_COLOR.test(valueOf(match[3]).replace(/var\([^)]*\)/g, '')),
  },
  {
    id: 1,
    name: 'redefinicja tokenu poza tokens.css',
    skip: (rel) => rel === TOKENS,
    pattern: new RegExp(`(?<![\\w-])--(?:${TOKEN_NAMES})\\s*:`, 'g'),
  },
  {
    id: 2,
    name: '--kwadrat-red poza tokens.css i markers.css',
    skip: (rel) => rel === TOKENS || rel === MARKERS,
    pattern: /--kwadrat-red\b/g,
  },
  {
    id: 2,
    name: '--kwadrat-red w tokens.css poza własną definicją',
    only: (rel) => rel === TOKENS,
    pattern: /--kwadrat-red\b(?!\s*:)/g,
  },
  {
    id: 3,
    name: 'border-radius inny niż 0',
    pattern: /(?<![\w-])(?:-(?:webkit|moz|ms|o)-|Webkit|Moz|ms)?(?:border(?:-[a-z]+)*-radius|[bB]order(?:[A-Z][a-z]+)*Radius)\s*:\s*([^;}\n]+)/g,
    reject: (match) => !/^(?:0(?:px|rem|em|%)?\s*)+$/.test(valueOf(match[1])),
  },
  {
    id: 3,
    name: 'zaokrąglenie w clip-path albo w SVG (rx, ry)',
    pattern:
      /\binset\([^)]*\bround\s+(?!0(?:px)?[\s)])|(?:clip-path|clipPath|shape-outside)\s*:\s*["']?(?:circle|ellipse)\(|(?<![\w-])r[xy]=["']?(?!0["'\s>])[\d.]/g,
  },
  {
    id: 3,
    name: 'cień (box-shadow, text-shadow, drop-shadow)',
    pattern:
      /(?<![\w-])(?:-(?:webkit|moz|ms|o)-|Webkit|Moz|ms)?(?:box-shadow|text-shadow|[bB]oxShadow|[tT]extShadow)\s*:\s*([^;}\n]+)|\bdrop-shadow\s*\(/g,
    reject: (match) => match[1] === undefined || valueOf(match[1]) !== 'none',
  },
  {
    id: 3,
    name: 'gradient',
    pattern: /\b(?:repeating-)?(?:linear|radial|conic)-gradient\s*\(/gi,
  },
  {
    id: 4,
    name: 'font-weight inny niż 400, 600, 700',
    pattern: /(?<![\w-])(?:font-weight|fontWeight)\s*[:=]\s*([^;}\n]+)/g,
    reject: (match) => !/^(?:400|600|700|normal|bold|inherit)$/.test(valueOf(match[1])),
  },
  {
    id: 4,
    name: 'oś wagi albo kursywy fontu (font-variation-settings)',
    pattern: /(?<![\w-])(?:font-variation-settings|fontVariationSettings)\s*:/g,
  },
  {
    id: 4,
    name: 'kursywa',
    pattern: /(?<![\w-])(?:font-style|fontStyle)\s*[:=]\s*["']?(?:italic|oblique)/g,
  },
  {
    id: 4,
    name: 'font-family inny niż var(--font-sans) (nazwa „Mulish” tylko w @font-face w tokens.css)',
    pattern: /(?<![\w-])(?:font-family|fontFamily)\s*[:=]\s*([^;}\n]+)/g,
    reject: (match, rel) => {
      const value = valueOf(match[1]);
      if (value === 'var(--font-sans)' || value === 'inherit') return false;
      return !(rel === TOKENS && value === 'Mulish');
    },
  },
  {
    id: 4,
    name: 'skrót font: (może zmienić krój lub wagę), dozwolone tylko font: inherit',
    pattern: /(?<![\w-])font\s*:\s*([^;}\n]+)/g,
    reject: (match) => valueOf(match[1]) !== 'inherit',
  },
  {
    id: 5,
    name: 'pauza albo półpauza (także jako encja albo sekwencja ucieczki)',
    // także w komentarzach: pauz nie ma nigdzie w repo
    raw: true,
    pattern:
      /[\u2013\u2014]|&[mn]dash;|&#0*(?:8211|8212)(?!\d)|&#x0*201[34](?![0-9a-f])|\\u\{?0*201[34]\}?|\\0*201[34](?![0-9a-f])/gi,
  },
  {
    id: 6,
    name: 'import biblioteki ikon',
    pattern:
      /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*|@import\s+(?:url\()?\s*|<link[^>]*href=)["'`]([^"'`]+)["'`]/g,
    reject: (match) => ICON_SOURCE.test(match[1]),
  },
];

// Komentarze zamienione na spacje: numery linii i pozycje zostają, treść komentarza nie wpływa na wynik.
// Skaner pomija teksty w cudzysłowach (np. '/img/*' w .ts to nie komentarz). // liczy się jako
// komentarz tylko na początku linii albo po spacji (nie w url(//…) ani w https://), w CSS wcale.
function stripComments(text, ext) {
  const blank = (part) => part.replace(/[^\n]/g, ' ');
  const lineComments = ext !== '.css';
  let out = '';
  let quote = null;
  let i = 0;
  while (i < text.length) {
    const char = text[i];
    if (quote) {
      if (char === '\\') {
        out += text.slice(i, i + 2);
        i += 2;
        continue;
      }
      if (char === quote || (char === '\n' && quote !== '`')) quote = null;
      out += char;
      i += 1;
      continue;
    }
    const closing = text.startsWith('/*', i) ? '*/' : text.startsWith('<!--', i) ? '-->' : null;
    if (closing) {
      const end = text.indexOf(closing, i + 2);
      const stop = end === -1 ? text.length : end + closing.length;
      out += blank(text.slice(i, stop));
      i = stop;
      continue;
    }
    if (lineComments && text.startsWith('//', i) && (i === 0 || /\s/.test(text[i - 1]))) {
      const end = text.indexOf('\n', i);
      const stop = end === -1 ? text.length : end;
      out += blank(text.slice(i, stop));
      i = stop;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') quote = char;
    out += char;
    i += 1;
  }
  return out;
}

// markers.css: czerwień tylko w trzech regułach z RED_USES, jako var(--kwadrat-red)
function checkMarkers(text, file, problems) {
  for (const block of text.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = block[1].trim().replace(/\s+/g, ' ');
    for (const decl of block[2].split(';')) {
      if (!decl.includes('--kwadrat-red')) continue;
      const [prop, ...rest] = decl.split(':');
      const value = rest.join(':').trim();
      const ok = RED_USES.has(`${selector}|${prop.trim()}`) && value === 'var(--kwadrat-red)';
      if (!ok) {
        const line = text.slice(0, block.index).split('\n').length;
        problems.push(`${file}:${line}  [reguła 2] czerwień w markers.css poza dozwolonymi kwadracikami i liczbą: ${selector} { ${decl.trim()} }`);
      }
    }
  }
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTENSIONS.has(path.extname(entry.name))) yield full;
  }
}

const problems = [];

for await (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  const source = await readFile(file, 'utf8');
  const text = stripComments(source, path.extname(file));
  const shown = path.relative(process.cwd(), file);
  for (const rule of rules) {
    if (rule.skip?.(rel) || (rule.only && !rule.only(rel))) continue;
    for (const match of (rule.raw ? source : text).matchAll(rule.pattern)) {
      if (rule.reject && !rule.reject(match, rel)) continue;
      const line = text.slice(0, match.index).split('\n').length;
      const found = match[0].trim().replace(/\s+/g, ' ');
      problems.push(`${shown}:${line}  [reguła ${rule.id}] ${rule.name}: ${found.length > 70 ? `${found.slice(0, 70)}…` : found}`);
    }
  }
  if (rel === MARKERS) checkMarkers(text, shown, problems);
}

// Zależności: CLAUDE.md dopuszcza tylko Astro (żadnych bibliotek ikon, komponentów, animacji)
const pkg = JSON.parse(await readFile(PACKAGE, 'utf8'));
for (const dep of Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })) {
  if (dep !== 'astro') {
    const kind = ICON_SOURCE.test(dep) ? 'biblioteka ikon' : 'zależność spoza Astro';
    problems.push(`package.json  [reguła 6] ${kind}: ${dep}`);
  }
}

if (problems.length) {
  console.error(`lint:kwadrat: ${problems.length} naruszeń systemu Kwadrat\n`);
  console.error(problems.join('\n'));
  process.exit(1);
}

console.log('lint:kwadrat: OK, system Kwadrat zachowany');
