// Polska typografia na ekranie: twarde spacje tam, gdzie łamanie wiersza razi.
// Nie zmienia słów, tylko rodzaj spacji. Działa rekurencyjnie na całym obiekcie copy.

const NBSP = ' ';

const rules: [RegExp, string][] = [
  // grupy tysięcy i numer telefonu: 389 000, 50 000,00, +48 505 085 001
  [/(?<=\d) (?=\d{3}(?!\d))/g, NBSP],
  // liczba z jednostką albo słowem: 78 m², 389 000 €, 2 sypialnie, 1 plan
  [/(?<=\d) (?=[\p{L}€%])/gu, NBSP],
  // jednoliterowe spójniki i przyimki nie zostają na końcu wiersza
  [/(?<=^|[\s(„])([aiouwzAIOUWZ]) /g, `$1${NBSP}`],
  // kropka środkowa zostaje przy poprzednim słowie
  [/ ·/g, `${NBSP}·`],
];

export function typoText(text: string): string {
  return rules.reduce((out, [pattern, replacement]) => out.replace(pattern, replacement), text);
}

export function typo<T>(value: T): T {
  if (typeof value === 'string') return typoText(value) as T;
  if (Array.isArray(value)) return value.map((item) => typo(item)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, typo(item)])) as T;
  }
  return value;
}

// Do meta i JSON-LD: z powrotem zwykłe spacje.
export function plainText(text: string): string {
  return text.replaceAll(NBSP, ' ');
}
