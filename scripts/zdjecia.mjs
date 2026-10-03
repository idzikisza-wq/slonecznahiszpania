// Generuje warianty zdjęć do public/img z plików źródłowych w zdjecia/.
// Uruchom: npm run zdjecia
//
// Plik źródłowy nazywa się jak miejsce na stronie (hero.jpg, oferta-mijas.jpg...).
// Skrypt kadruje do proporcji miejsca, zapisuje WebP i JPG w szerokościach 800 i 1600
// (mniejsze źródło także w jego pełnej szerokości) i usuwa metadane (EXIF, GPS).
// Warianty miejsc, których już nie ma na liście, są usuwane z public/img.
// Podfoldery w zdjecia/ (np. do-decyzji/) są pomijane.
// sharp instaluje się razem z Astro (opcjonalna zależność), osobna instalacja niepotrzebna.

import { readdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'zdjecia';
const OUT = path.join('public', 'img');
const WIDTHS = [800, 1600];

// ratio null = naturalne proporcje pliku.
// focus [x, y]: gdzie leży kadr w nadmiarze zdjęcia, od 0 (lewo, góra) do 1 (prawo, dół).
const SLOTS = {
  'hero-costa-del-sol': { ratio: null },
  'hero-costa-blanca': { ratio: null },
  'poradnik-cover': { ratio: null },
  'oferta-malaga': { ratio: null },
  'oferta-mijas': { ratio: null },
  'oferta-marbella': { ratio: null },
};

const sources = await readdir(SRC, { withFileTypes: true });
const outputs = await readdir(OUT).catch(() => []);
const isSlotFile = (file, slot) => new RegExp(`^${slot}-\\d+\\.(jpg|webp)$`).test(file);

for (const old of outputs.filter((f) => !Object.keys(SLOTS).some((slot) => isSlotFile(f, slot)))) {
  await unlink(path.join(OUT, old));
  console.log(`${old}: usunięty (miejsca nie ma już na stronie)`);
}

for (const [slot, { ratio, focus = [0.5, 0.5] }] of Object.entries(SLOTS)) {
  const source = sources.find((f) => f.isFile() && /\.(jpe?g|png|webp)$/i.test(f.name) && path.parse(f.name).name === slot);
  if (!source) {
    for (const old of outputs.filter((f) => isSlotFile(f, slot))) {
      await unlink(path.join(OUT, old));
    }
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

  const left = Math.round((w - cropW) * focus[0]);
  const top = Math.round((h - cropH) * focus[1]);

  const widths = WIDTHS.filter((x) => x <= cropW);
  if (cropW < Math.max(...WIDTHS)) {
    widths.push(cropW);
    console.warn(`${slot}: źródło ma ${cropW} px szerokości po kadrze, za mało na ${Math.max(...WIDTHS)} px`);
  }

  for (const old of outputs.filter((f) => isSlotFile(f, slot))) {
    await unlink(path.join(OUT, old));
  }

  for (const width of widths) {
    const height = Math.round((width * cropH) / cropW);
    const base = sharp(input).rotate().extract({ left, top, width: cropW, height: cropH }).resize(width, height);
    await base.clone().webp({ quality: 78 }).toFile(path.join(OUT, `${slot}-${width}.webp`));
    await base
      .clone()
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toFile(path.join(OUT, `${slot}-${width}.jpg`));
    console.log(`${slot}: ${width}×${height} webp + jpg`);
  }
}
