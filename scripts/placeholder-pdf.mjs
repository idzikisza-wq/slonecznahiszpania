// Generuje jednostronicowy placeholder public/poradnik.pdf (A4), bez zależności.
// Do podmiany na docelowy PDF poradnika. Tekst tylko ASCII: standardowy font PDF nie ma polskich znaków.
// Uruchom: npm run pdf:placeholder

import { writeFile } from 'node:fs/promises';

const lines = [
  ['F2', 24, 72, 760, 'Poradnik'],
  ['F1', 12, 72, 730, 'Plik tymczasowy. Docelowy poradnik w przygotowaniu.'],
  ['F1', 10, 72, 72, 'www.kwadrat.io'],
];

const content = lines.map(([font, size, x, y, text]) => `BT /${font} ${size} Tf ${x} ${y} Td (${text}) Tj ET`).join('\n');

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>',
  `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
  '<< /Title (Poradnik: plik tymczasowy) /Producer (slonecznahiszpania.pl) >>',
];

let pdf = '%PDF-1.4\n';
const offsets = objects.map((body, index) => {
  const offset = Buffer.byteLength(pdf);
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  return offset;
});
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
pdf += offsets.map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`).join('');
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${objects.length} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

await writeFile('public/poradnik.pdf', pdf, 'latin1');
console.log('public/poradnik.pdf: placeholder zapisany');
