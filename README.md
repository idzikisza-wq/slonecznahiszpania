# slonecznahiszpania.pl

Landing Kwadrat Nieruchomości: porównanie Costa del Sol, Costa Blanca i innych regionów Hiszpanii, w systemie wizualnym Kwadrat Documents. Statyczna strona w Astro, czysty CSS, zero zależności poza Astro i fontem Mulish z Google Fonts.

Zasady projektu, tokeny i inwentarz sekcji: [CLAUDE.md](CLAUDE.md). Całe aktualne copy jest w `src/content/site.ts` (źródło: nowa wersja www.slonecznahiszpania.pl, wyrenderowana 3.10.2026). [docs/copy.md](docs/copy.md) to zapis najstarszej wersji strony.

## Uruchomienie lokalne

Wymagany Node.js 22.12 lub nowszy (wersja w `.nvmrc`).

```bash
npm install
npm run dev        # podgląd na http://localhost:4321
npm run build      # strażnik lint:kwadrat, potem build do dist/
npm run preview    # podgląd zbudowanej strony
```

| Skrypt | Co robi |
| --- | --- |
| `npm run dev` | serwer deweloperski z odświeżaniem |
| `npm run build` | `lint:kwadrat`, potem statyczny build do `dist/` |
| `npm run lint:kwadrat` | strażnik systemu: przerywa build przy złamaniu reguł (kolory hex poza tokenami, czerwień poza `markers.css`, zaokrąglenia, cienie, gradienty, niedozwolone wagi i kroje, pauzy i półpauzy) |
| `npm run zdjecia` | generuje warianty zdjęć do `public/img/` z plików w `zdjecia/` |
| `npm run pdf:placeholder` | odtwarza tymczasowy `public/poradnik.pdf` |

## Struktura

```
src/
  content/site.ts      całe copy strony, telefon i e-mail w jednej stałej
  content/typo.ts      twarde spacje (spójniki, liczby, kropka środkowa)
  pages/               index.astro, polityka-prywatnosci.astro
  layouts/Base.astro   head, meta, schema.org, font
  components/          sekcje strony w kolejności z inwentarza
  components/ui/       kafelki, listy, tabela, zdjęcie, pola formularza
  scripts/forms.ts     walidacja i wysyłka formularzy
  styles/              tokens.css, base.css, markers.css
public/
  brand/               logo (lockup i sam znak), favicon
  img/                 warianty zdjęć (generowane, nie edytować ręcznie)
  poradnik.pdf         PDF poradnika (teraz placeholder)
zdjecia/               pliki źródłowe zdjęć
scripts/               lint-kwadrat, zdjecia, placeholder-pdf
```

## Zmiana tekstu

Każde zdanie na stronie siedzi w `src/content/site.ts`. Zmieniasz tekst tam, markupu nie ruszasz. Pisz zwykłe spacje: twarde spacje dokłada `typo.ts`. Nie używaj pauz i półpauz: build ich nie przepuści.

## Podmiana zdjęć

Miejsca na stronie (źródła w `zdjecia/`, nazwa pliku = nazwa miejsca):

| Plik źródłowy w `zdjecia/` | Miejsce | Proporcje |
| --- | --- | --- |
| `hero-costa-del-sol.jpg` | hero, kierunek 01 | naturalne (dziś 1200 × 912) |
| `hero-costa-blanca.jpg` | hero, kierunek 02 | naturalne (dziś 1200 × 912) |
| `poradnik-cover.webp` | okładka przy formularzu poradnika | naturalne |
| `oferta-malaga.jpg` | oferta Málaga Centro | naturalne (dziś 1008 × 752) |
| `oferta-mijas.jpg` | oferta Mijas | naturalne |
| `oferta-marbella.jpg` | oferta Marbella | naturalne |

1. Wrzuć plik do `zdjecia/` pod nazwą z tabeli (jpg, jpeg, png albo webp). Najlepiej co najmniej 1600 px szerokości. Zdjęcia z iPhone'a w HEIC najpierw wyeksportuj jako JPG.
2. Uruchom `npm run zdjecia`. Skrypt zapisuje WebP i JPG w szerokościach 800 i 1600 px do `public/img/` (mniejsze źródło także w jego pełnej szerokości) i usuwa metadane (EXIF, GPS). Kadr do innych proporcji ustawiasz polem `ratio` i punktem `focus` przy danym miejscu w `scripts/zdjecia.mjs`.
3. Jeśli zmieniły się proporcje, popraw `ratio` przy danym zdjęciu w `src/content/site.ts`. Tam też są teksty alternatywne (`alt`).
4. Zrób commit plików z `zdjecia/` i `public/img/`.

Dopóki zdjęcia nie ma, strona pokazuje szare pole z podpisem, np. „Zdjęcie 4:3". Podfoldery w `zdjecia/` są pomijane przez skrypt i nie trafiają na stronę.

Podpis „Zdjęcie poglądowe" pod zdjęciami w hero to stała `PHOTO_NOTE` w `site.ts`, a podpis „Wizualizacja" pod zdjęciami ofert to stała `OFFER_PHOTO_NOTE`. Pusty tekst ukrywa podpis, np. po podmianie wizualizacji na zdjęcia.

Obraz do udostępniania linku (og:image) to `public/og-image.png`, ustawiany w `meta.ogImage` w `site.ts`. Najlepszy format to 1200 × 630 px.

## Oferty

Sekcja przykładowych nieruchomości jest widoczna (`SHOW_OFFERS = true` w `src/content/site.ts`): oferty i ceny potwierdził Idzi 3.10.2026. Oferty zmieniasz w `site.ts` (miejsce, tytuł, parametry, cena, opcjonalnie `href` z linkiem do oferty). `SHOW_OFFERS = false` chowa sekcję razem z pozycją „Oferty" w menu.

## Podmiana PDF poradnika

Zastąp `public/poradnik.pdf` docelowym plikiem pod tą samą nazwą i zrób commit. Link po zapisie do poradnika nie wymaga zmian.

## Polityka prywatności

Treść strony `/polityka-prywatnosci` jest w `src/pages/polityka-prywatnosci.astro` (teraz tylko „Treść w przygotowaniu."). Akapity wstaw jako kolejne `<p>` w sekcji.

## Formularze (Web3Forms)

Oba formularze (poradnik i kontakt) wysyłają zgłoszenia przez [Web3Forms](https://web3forms.com) na adres przypisany do klucza. Dostawca jest DO POTWIERDZENIA.

1. Na web3forms.com utwórz klucz (Access Key) dla adresu biuro@kwadrat.io. Klucz przychodzi mailem.
2. Lokalnie: skopiuj `.env.example` do `.env` i wpisz `PUBLIC_WEB3FORMS_KEY=twój-klucz`. Plik `.env` jest w `.gitignore`, nigdy nie trafia do repo.
3. W Cloudflare Pages: Settings, Variables and Secrets (zmienne środowiskowe), dodaj `PUBLIC_WEB3FORMS_KEY` dla Production i Preview, potem ponów wdrożenie (klucz jest wstawiany w czasie buildu).

Bez klucza formularze działają w trybie demo: pokazują komunikat sukcesu, a payload trafia do konsoli przeglądarki. Ochrona przed spamem: ukryte pole honeypot, bez CAPTCHA.

## Cloudflare Pages krok po kroku

1. Zaloguj się do panelu Cloudflare, wejdź w Workers & Pages i utwórz nową aplikację typu Pages z opcją połączenia z Gitem (Connect to Git).
2. Autoryzuj GitHub i wybierz repozytorium `slonecznahiszpania`.
3. Ustawienia buildu:
   - Production branch: `main`
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Zmienne środowiskowe: `NODE_VERSION` = `22` (Cloudflare czyta też `.nvmrc`), opcjonalnie `PUBLIC_WEB3FORMS_KEY`.
4. Save and Deploy. Po buildzie strona jest pod adresem `nazwa-projektu.pages.dev`.
5. Każdy pull request i każda gałąź dostają automatycznie własny podgląd pod adresem `*.nazwa-projektu.pages.dev`. Podglądy mają nagłówek noindex, nie trafią do Google.

Nagłówki cache i bezpieczeństwa są w `public/_headers`.

## Checklista przełączenia domeny

Wykonuje Idzi, po akceptacji podglądu.

1. Sprawdzić, gdzie trafiają dziś zapytania z formularzy na stronie w Lovable, i wyeksportować dotychczasowe leady.
2. Podpiąć klucz Web3Forms, wysłać testowe zgłoszenie z obu formularzy, potwierdzić odbiór na biuro@kwadrat.io.
3. Wgrać docelowe zdjęcia, PDF poradnika i treść polityki prywatności.
4. W Cloudflare Pages dodać domenę slonecznahiszpania.pl i www, ustawić rekordy DNS u rejestratora domeny.
5. Po propagacji sprawdzić stronę, formularze i certyfikat, dopiero wtedy odpiąć domenę od projektu w Lovable.
