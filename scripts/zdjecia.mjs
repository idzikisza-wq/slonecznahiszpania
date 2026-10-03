// Generuje warianty zdjęć do public/img z plików źródłowych w zdjecia/.
// Uruchom: npm run zdjecia
//
// Plik źródłowy nazywa się jak miejsce na stronie (hero.jpg, oferta-mijas.jpg...).
// Skrypt kadruje do proporcji miejsca, zapisuje WebP i JPG w szerokościach 800 i 1600
// (albo w szerokości źródła, jeśli jest mniejsze) i usuwa metadane (EXIF, GPS).
// Folder zdjecia/do-decyzji/ jest pomijany.
// sharp instaluje się razem z Astro (opcjonalna zależność), osobna instalacja niepotrzebna.

import { readdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'zdjecia';
const OUT = path.join('public', 'img');
const WIDTHS = [800, 1600];

// ratio null = naturalne proporcje pliku. position: która część zostaje przy kadrowaniu.
const SLOTS = {
  hero: { ratio: [3, 2], position: 'bottom' },
  'oferta-malaga': { ratio: [4, 3], position: 'centre' },
  'oferta-mijas': { ratio: [4, 3], position: 'centre' },
  'oferta-marbella': { ratio: [4, 3], position: 'centre' },
  'poradnik-okladka': { ratio: null, position: 'centre' },
};

const sources = await readdir(SRC, { withFileTypes: true });
const outputs = await readdir(OUT).catch(() => []);

for (const [slot, { ratio, position }] of Object.entries(SLOTS)) {
  const source = sources.find((f) => f.isFile() && /\.(jpe?g|png|webp)$/i.test(f.name) && path.parse(f.name).name === slot);
  if (!source) {
    console.log(`${slot}: brak pliku w ${SRC}/, na stronie zostaje szare pole`);
    continue;
  }

  const input = path.join(SRC, source.name);
  const meta = await sharp(input).rotate().metadata();
  const [w, h] = meta.orientation >= 5 ? [meta.height, meta.width] : [meta.width, meta.height];

  // kadr do proporcji miejsca, bez skalowania w górę
  let cropW = w;
  let cropH = h;
  if (ratio) {
    const target = ratio[0] / ratio[1];
    if (w / h > target) cropW = Math.round(h * target);
    else cropH = Math.round(w / target);
  }

  const widths = WIDTHS.filter((x) => x <= cropW);
  if (widths.length === 0) widths.push(cropW);
  if (cropW < Math.max(...WIDTHS)) {
    console.warn(`${slot}: źródło ma ${cropW} px szerokości po kadrze, za mało na ${Math.max(...WIDTHS)} px`);
  }

  for (const old of outputs.filter((f) => f.startsWith(`${slot}-`))) {
    await unlink(path.join(OUT, old));
  }

  for (const width of widths) {
    const height = Math.round((width * cropH) / cropW);
    const base = sharp(input).rotate().resize(width, height, { fit: 'cover', position });
    await base.clone().webp({ quality: 78 }).toFile(path.join(OUT, `${slot}-${width}.webp`));
    await base.clone().jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(path.join(OUT, `${slot}-${width}.jpg`));
    console.log(`${slot}: ${width}×${height} webp + jpg`);
  }
}
