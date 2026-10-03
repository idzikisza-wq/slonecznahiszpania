# slonecznahiszpania.pl: przebudowa w systemie Kwadrat

Ten plik czyta Claude Code na starcie każdej sesji. To jedyne źródło prawdy o projekcie. Jeśli zadanie jest sprzeczne z tym plikiem, zapytaj w PR, nie zgaduj.

## Cel

Odtworzyć stronę https://www.slonecznahiszpania.pl (landing Kwadrat Nieruchomości: porównanie Costa del Sol, Costa Blanca i innych regionów Hiszpanii) jako statyczną, szybką stronę w systemie wizualnym Kwadrat Documents. Treść i kolejność sekcji zostają jak w oryginale. Zmienia się forma: typografia, kolor, siatka, rytm.

Od 3.10.2026 oryginałem jest nowa wersja strony (Costa del Sol i Costa Blanca). Teksty i zdjęcia pochodzą z jej wyrenderowanej wersji, wygląd z systemu Kwadrat.

Właściciel: Idzi Kisza. Język strony: polski (`lang="pl"`).

Obecna strona stoi na Lovable i zostaje nietknięta. To repo jest osobne. Nie łącz go z Lovable, nie kopiuj kodu z repo Lovable. Domenę przepina Idzi dopiero po akceptacji podglądu.

## Zasada nadrzędna

Czytelność ponad efektowność. Odwiedzający w trzy sekundy wie: co to jest, dla kogo, co ma zrobić dalej. Jeśli element tego nie wspiera, wylatuje.

## Stack

- Astro (najnowsza stabilna), bez frameworka UI, bez Tailwinda. Czysty CSS z custom properties.
- Zero zależności poza Astro i fontem z Google Fonts. Żadnych bibliotek ikon, animacji, sliderów.
- Build statyczny do `dist/`. Hosting: Cloudflare Pages, podgląd na adresie `*.pages.dev`.
- Struktura: `src/pages/index.astro`, sekcje w `src/components/`, całe copy w `src/content/site.ts` (poprawka tekstu nie wymaga grzebania w markupie), style w `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/markers.css`.
- Logo jest już w repo: `public/brand/kwadrat-logo-lockup.svg` (znak z napisem NIERUCHOMOŚCI) i `public/brand/kwadrat-logo.svg` (sam kwadrat). Nie rysuj logo od nowa, nie przekoloruj, nie przeskaluj nieproporcjonalnie. Usuń z plików blok `<metadata>` (c2pa) przy optymalizacji, ścieżek nie ruszaj.
- Zdjęcia w `public/img/`: WebP plus JPG przez `<picture>`, szerokości 1600 i 800 px, `width` i `height` zawsze ustawione, `loading="lazy"` poza hero.

## Tokeny

Przenieś 1:1 do `src/styles/tokens.css`. To jedyne miejsce w repo, gdzie wolno zapisać kolor jako hex.

```css
:root {
  --kwadrat-red: #e30613; /* logo, kwadraciki, jedna liczba. Nigdy tło, nigdy dłuższy tekst */
  --red-tint:    #fdedee; /* tło wiersza-kotwicy w tabeli (Porównanie: wiersz „Dla kogo”) */
  --ink:         #1a1a1a; /* tytuły, nagłówki, duże liczby, pogrubienia, linia mocna */
  --text:        #333333; /* tekst podstawowy, listy, tabele */
  --muted:       #6f6f6f; /* etykiety, podpisy, uwagi, stopka */
  --line:        #d9d9d9; /* linie podziału, stopka, krawędź callouta, kwadracik minusów */
  --line-soft:   #ececec; /* linie między wierszami tabel i FAQ */
  --surface:     #f5f5f5; /* jedyne szare tło: placeholder zdjęcia, pola formularza */
  --paper:       #ffffff; /* tło strony */

  --font-sans: "Mulish", "Helvetica Neue", Arial, sans-serif;

  --rule: 1px;            /* każda linia na ekranie */
  --marker-section: 10px; /* czerwony kwadracik przed h2 */
  --marker-list: 7px;     /* kwadracik w listach */

  --space-xs: 8px;
  --space-s: 16px;
  --space-m: 32px;
  --space-l: 48px;
  --space-xl: 80px;
  --section: 120px;       /* odstęp między sekcjami; 72px poniżej 760px */

  --container: 1200px;
  --side: 76px;           /* margines boczny; 24px poniżej 760px */
  --gutter: 24px;
  --measure: 68ch;        /* maksymalna szerokość akapitu */
}
```

Font: Mulish 400, 600, 700 z Google Fonts (z podzbiorem latin-ext, bo copy ma polskie i hiszpańskie znaki: ą, ś, á, é), `display=swap`, preconnect do fonts.gstatic.com. Żadnej innej wagi, żadnej kursywy, żadnego innego kroju.

## Sześć reguł systemu (z Kwadrat Documents, przeniesione na web)

1. Dużo bieli. Około 88% powierzchni to `--paper`. Sekcja ma najwyżej cztery bloki treści (blok: rząd kafelków, lista, zdjęcie, formularz, tabela). Podsekcja z własnym h3 liczy się jako osobna sekcja. Jak coś się nie mieści: tnij albo dziel, nie zmniejszaj fontu ani odstępów.
2. Jeden akcent. `--kwadrat-red` występuje tylko w: logo, kwadraciku przed każdym h2, kwadracikach list atutów i jednej liczbie na całej stronie (ocena 4,9 w Opiniach). Nigdy jako tło przycisku, sekcji, pola. Nigdy jako kolor tekstu dłuższego niż jedna liczba. Nigdy w hoverze.
3. Cienkie linie zamiast ramek. Linia mocna: 1px `--ink` nad kafelkiem i pod nagłówkiem tabeli. Linia lekka: 1px `--line` pod nagłówkiem strony, nad stopką, krawędź callouta. Linia włosowa: 1px `--line-soft` między wierszami tabeli i pozycjami FAQ. Zero obramowań wokół bloków, cieni, zaokrągleń, gradientów, ikon.
4. Najpierw wynik. Hero odpowiada na pytanie odwiedzającego bez przewijania: co, dla kogo, następny krok (CTA).
5. Zdjęcia duże, w naturalnych proporcjach 3:2 albo 4:3. Bez kadrowania do kwadratu, bez ramek, bez tekstu, nakładek i gradientów na zdjęciu. Logo nigdy na zdjęciu. Brak zdjęcia: pole `--surface` z napisem w `small` „Zdjęcie 3:2", nigdy obrazek z internetu.
6. Jedna rodzina fontów. Hierarchię buduje rozmiar i grubość, nie kolor. Wersaliki wyłącznie w stylu `label`.

## Rozszerzenie webowe

System jest zaprojektowany pod A4. Poniższe to jedyne dopuszczalne dopowiedzenia pod web. Nie dokładaj własnych.

### Skala typograficzna

| Styl | Waga | Desktop | Mobile (do 760px) | Kolor i uwagi |
| --- | --- | --- | --- | --- |
| h1 (title) | 700 | 44px / 1.15, tracking -0.01em | 32px / 1.2 | ink, jeden na stronie, w hero |
| h2 (section) | 700 | 28px / 1.25 | 24px / 1.25 | ink, zawsze z czerwonym kwadracikiem `--marker-section` przed tekstem, odstęp 12px, wyrównany do środka pierwszej linii |
| h3 (subsection) | 700 | 20px / 1.3 | 18px / 1.3 | ink, bez kwadracika |
| lead | 400 | 20px / 1.5 | 18px / 1.5 | ink, pierwszy akapit pod h1 i pod h2 |
| body | 400 | 17px / 1.65 | 16px / 1.65 | text, kolumna do `--measure` |
| small | 400 | 14px / 1.5 | 14px / 1.5 | muted: podpisy, noty, zgody, stopka |
| label | 600 | 12px / 1.3, wersaliki, tracking 0.08em | 12px | muted: etykieta nad h2 i nad liczbą, nagłówek tabeli, nawigacja (tu w ink) |
| kpi | 700 | 40px / 1.1, tracking -0.02em | 32px / 1.1 | ink; jedyny wyjątek czerwony: 4,9 |
| kpi-mid | 700 | 28px / 1.2 | 24px / 1.2 | ink: numery kroków procesu |
| num2 | 700 | 24px / 1.2 | 21px / 1.2 | ink: ceny ofert, telefon w kontakcie |

Cyfry tabelaryczne wszędzie (`font-variant-numeric: tabular-nums`). Pogrubienie (700, ink) dozwolone w tekście tylko dla kluczowej liczby albo tytułu pozycji listy.

### Siatka

Kontener `--container`, margines `--side`. 12 kolumn, gutter `--gutter`. Dozwolone podziały: 12, 6+6, 4+4+4, 8+4, plus 3+3+3+3 wyłącznie dla rzędu czterech kafelków. Jeden breakpoint: 760px. Poniżej wszystko w jednej kolumnie (rząd czterech kafelków: 2 × 2 do 480px, niżej 1 kolumna). Zdjęcie przy tekście ląduje nad tekstem.

### Komponenty

- Etykieta sekcji: `label` nad h2, odstęp `--space-xs`.
- Kafelek (KpiRow): linia mocna nad, `label`, liczba `kpi`, uwaga `small`, każda część w jednej linii. Rząd kafelków to CSS subgrid, liczby w rzędzie stoją na jednej wysokości. Bez tła, bez ramki.
- Kafelek tekstowy: jak kafelek, ale zamiast liczby h3 i akapit `body`. Używany w sekcjach z trzema lub czterema argumentami.
- Lista atutów: czerwony kwadracik `--marker-list`, najwyżej pięć punktów na listę. Lista uwag i ryzyk: kwadracik w `--line`. Kwadracik wyrównany do środka pierwszej linii.
- Callout: lewa krawędź 1px `--line`, padding-left `--space-s`, bez tła.
- Tabela danych: dwie kolumny, lewa w `muted` o stałej szerokości, prawa w `text`, linie włosowe między wierszami, bez pionowych linii, bez zebry.
- Tabela porównania: kolumna kryterium w `label`, dwie kolumny regionów. Nagłówek w `label` z linią mocną pod spodem, wiersze z linią włosową, bez ramek, pionowych linii i zebry. Wiersz-kotwica na tle `--red-tint`, pogrubiony, tekst w ink, z notą `small` pod tabelą. Na mobile każdy wiersz to blok z etykietami regionów.
- Sekcja między liniami: dawne ciemne pasy (Porównanie, Obsługa 360°) na tle `--paper`, oddzielone od sąsiednich sekcji liniami lekkimi.
- Kierunek (hero): zdjęcie w naturalnych proporcjach bez ramki i tekstu, pod nim `small` „Zdjęcie poglądowe" (stała `PHOTO_NOTE` w `site.ts`), `label` KIERUNEK 01, tytuł w stylu h3 (h2 bez kwadracika), akapit, CTA drugi.
- CTA główny: prostokąt z tłem `--ink`, tekst `label` w `--paper`, padding 16px 28px, bez zaokrąglenia, bez cienia. Hover: tło `--text`. Focus: outline 2px `--ink` z offsetem 3px. To jedyne ciemne pole na stronie.
- CTA drugi: tekst `label` w `--ink` z linią 1px `--ink` pod spodem. Hover: kolor `--muted`.
- Pole formularza: tło `--surface`, brak obramowania, dolna linia 1px `--line`, padding 14px 16px, tekst `body`. Etykieta pola w `label` nad polem. Focus: dolna linia 2px `--ink`. Błąd: komunikat w `small` w `--ink` pod polem, bez koloru czerwonego (czerwień nie sygnalizuje błędów). Dwa krótkie pola mogą stać w jednym rzędzie, na mobile jedno pod drugim. Lista wyboru bez natywnego wyglądu (Safari podmienia w niej font na systemowy): Mulish, ta sama wysokość co pozostałe pola, po prawej szary znak tekstowy „›" obrócony w dół. Zgoda jako tekst `small` pod przyciskiem (wysłanie formularza oznacza zgodę), bez checkboxa.
- Nagłówek strony: logo lockup po lewej (wysokość 36px desktop, 28px mobile, pole ochronne co najmniej 16px), po prawej menu w `label` w ink, na końcu telefon jako zwykły tekst (link `tel:`, bez przycisku i ikony). Bez podtytułu. Pod nagłówkiem linia lekka. Nie sticky. Na mobile linki chowane pod słowem MENU w `label`, bez ikony, telefon widoczny obok.
- Favicon: `kwadrat-logo.svg`.

### Dostępność

Kontrast `ink`, `text` i `muted` na `paper` spełnia AA dla podanych rozmiarów. Focus widoczny na każdym elemencie interaktywnym. Wszystkie zdjęcia z sensownym `alt`. Jeden h1, poprawna hierarchia h2 i h3. Kolejność tabulacji zgodna z kolejnością wizualną.

## Marka

- Logo: lockup KWADRAT NIERUCHOMOŚCI w nagłówku (strona to materiał poza dokumentami A4, więc lockup jest właściwą wersją). W stopce brak logo.
- Nazwa w treści: Kwadrat Nieruchomości (meta, logo, opisy). W leadzie Opinii i w zgodzie pod formularzem kontaktowym: Grupa Inwestycyjna Kwadrat, odmieniana. Dane spółki w stopce: GRUPA INWESTYCYJNA KWADRAT Sp. z o.o. Oddział Żoliborz nie występuje nigdzie.
- Telefon i e-mail: jak na obecnej stronie (+48 505 085 001, biuro@kwadrat.io). DO POTWIERDZENIA przez Idziego, trzymaj w jednej stałej w `site.ts`.

## Treść: inwentarz sekcji (kolejność bez zmian)

Źródłem treści jest nowa wersja www.slonecznahiszpania.pl, wyrenderowana przeglądarką (to aplikacja JS: zwykły fetch może zwrócić starą wersję). Aktualne, zatwierdzone copy jest w `src/content/site.ts`. `docs/copy.md` to zapis najstarszej wersji strony, nie źródło. Nie odtwarzaj tekstów z pamięci. Poniżej układ każdej sekcji, kotwice w nawiasach.

Usunięte po przebudowie z 3.10.2026: rząd PL / 360° / 1 plan, sekcja „Bez ukrytych kosztów", sekcje o Costa Blanca z poprzedniej wersji, lista ryzyk z migracją, tabela lokalizacji z Lagos, zdjęcie pary z placu i selfie z kart ofert.

1. Nagłówek. Logo, menu: Porównanie, Regiony, Proces, Oferty, Poradnik, Opinie, FAQ, na końcu telefon „+48 505 085 001" jako zwykły tekst. Gdy `SHOW_OFFERS = false`, pozycji Oferty nie ma.
2. Hero (#start). `label` PRZEWODNIK PO HISZPAŃSKIM RYNKU, h1 w dwóch liniach „Dwa wybrzeża." / „Dwie dobre odpowiedzi." w jednym kolorze ink, obok `lead`. CTA główny PORÓWNAJMY TWÓJ WYBÓR (#kontakt), CTA drugi POBIERZ PORADNIK (#poradnik), obok `small` „Bez rankingu na siłę. ...". Przyciski stoją nad zdjęciami, żeby następny krok był widoczny bez przewijania. Pod nimi dwa kierunki 6+6 (komponent Kierunek): Costa del Sol i Costa Blanca, link ZOBACZ MOCNE STRONY I KOMPROMISY (#porownanie).
3. Porównanie (#porownanie). Sekcja między liniami. `label` COSTA DEL SOL CZY COSTA BLANCA?, h2, `lead`, tabela porównania (Charakter, Budżet, Życie poza sezonem, Dostępność, Dla kogo jako wiersz-kotwica), pod nią nota o wierszu-kotwicy i nota o różnicach między gminami.
4. Regiony (#regiony). `label` SZERSZA PERSPEKTYWA, h2, `lead`. Sześć kafelków tekstowych 4+4+4 w dwóch rzędach: `label` 01 do 06, `label` z miejscowościami, h3 z nazwą regionu, akapit.
5. Poradnik (#poradnik). Układ 4+4+4: opis (`label`, h2, akapit, lista atutów z czterema punktami, `small` „PDF · dostęp po zapisie"), okładka w naturalnych proporcjach bez ramki i cienia, formularz od góry kolumny (Imię i Nazwisko w jednym rzędzie, E-mail, CTA główny, zgoda).
6. Po co kupujesz (#cele). `label` NAJPIERW CEL, h2, `lead`, trzy kafelki tekstowe 4+4+4 (`label` 01 do 03, h3, akapit), pod rzędem jeden CTA główny UMÓW BEZPŁATNĄ KONSULTACJĘ (#kontakt).
7. Dlaczego Hiszpania (#dlaczego-hiszpania). `label` PERSPEKTYWA POLSKIEGO INWESTORA, h2, `lead`, trzy kafelki tekstowe 4+4+4, pod nimi callout z h3 „Ryzyka nazywamy wprost" i akapitem.
8. Od Malagi po Alicante (#lokalizacje). `label` DWA OBSZARY POSZUKIWAŃ, h2, `lead`. Dwie tabele danych 6+6: Costa del Sol i Axarquía, Costa Blanca, po cztery miejscowości pogrubione w ink.
9. Proces (#proces). `label` JASNY PROCES, h2, `lead`, rząd czterech kafelków 3+3+3+3 z numerem w `kpi-mid`.
10. Przykładowe nieruchomości (#oferty). Widoczne: oferty i ceny potwierdził Idzi 3.10.2026. Przełącznik `SHOW_OFFERS` w `site.ts` chowa sekcję razem z pozycją Oferty w menu. Nagłówek „Przykłady z Costa del Sol". Trzy oferty 4+4+4: zdjęcie w naturalnych proporcjach, pod nim `small` „Wizualizacja" (stała `OFFER_PHOTO_NOTE` w `site.ts`), `label` lokalizacja, h3, `small` parametry, cena `num2`, opcjonalny link w polu `href`.
11. Obsługa 360° (#bezpieczenstwo). Sekcja między liniami. 6+6: `label`, h2, akapit; lista atutów z pięcioma punktami.
12. Opinie (#opinie). `label` OPINIE KLIENTÓW, h2, akapit. 4+4+4: kafelek z `label` OCENA GOOGLE, liczbą 4,9 w `--kwadrat-red` (jedyna czerwona liczba na stronie) z „/ 5" w num2 ink, uwagą `small` „120 opinii w wizytówce Google" z nazwą wizytówki i datą odczytu od Idziego (Kwadrat Otwock, stan na 1.10.2026), CTA drugi ZOBACZ WSZYSTKIE; dwie opinie jako callout. Bez gwiazdek, bez logo Google.
13. FAQ (#faq). `label` NAJCZĘSTSZE PYTANIA, h2. Cztery pytania jako natywne `<details>`, po prawej szary znak tekstowy „+" (otwarte: „−"), pierwsze otwarte od startu.
14. Konsultacja (#kontakt). 6+6. Lewa: `label` BEZPŁATNA KONSULTACJA, h2, akapit, `label` ZADZWOŃ DO NAS, telefon w `num2` jako link `tel:`. Prawa: formularz Imię i nazwisko, E-mail, Rozważany region (select, placeholder „Wybierz lub zostaw otwarte": Costa del Sol, Costa Blanca, Chcę porównać regiony, Inny region Hiszpanii), Wiadomość, CTA główny WYŚLIJ ZAPYTANIE, zgoda. Placeholdery pól z nowej strony.
15. Stopka. Linia lekka nad. W `small`: pełne dane rejestrowe spółki, zdanie „Treści na stronie mają charakter informacyjny i nie stanowią porady prawnej, podatkowej ani inwestycyjnej.", www.kwadrat.io, biuro@kwadrat.io, link Polityka prywatności.

## Copy: zasady przenoszenia

- `docs/copy.md` jest już bez długich myślników. Nie wprowadzaj ich z powrotem. Pauzę zastępuje kropka, przecinek albo dwukropek.
- Nie dopisuj copy, nie „ulepszaj" zdań. Każde skrócenie zgłoś w PR jako osobny punkt do akceptacji.
- Liczby: spacja w tysiącach (389 000 €), przecinek dziesiętny (4,9), zakresy słowem „do", kropka środkowa między faktami.
- Wersaliki tylko w etykietach. Bez wykrzykników, bez emoji (wyjątek: cytaty klientów).
- Pisownia: Malaga, Malagi, Maladze po polsku. Torre del Mar, Caleta de Vélez, Dénia, Cádiz, Axarquía zostają po hiszpańsku.

## Zdjęcia

- Źródła zdjęć leżą w `zdjecia/` pod nazwą miejsca na stronie, warianty do `public/img/` robi `npm run zdjecia` (proporcje i punkt kadru w `scripts/zdjecia.mjs`). PDF poradnika do `public/poradnik.pdf`.
- Zdjęcia pochodzą z nowej strony: `hero-costa-del-sol.jpg`, `hero-costa-blanca.jpg` (1200 × 912), `poradnik-cover.webp` (1354 × 1920), `oferta-malaga.jpg`, `oferta-mijas.jpg`, `oferta-marbella.jpg` (1008 × 752). Wszystkie w naturalnych proporcjach, bez kadrowania.
- Zdjęcia tarasów w hero to zdjęcia poglądowe: podpis „Zdjęcie poglądowe" (stała `PHOTO_NOTE`), alt bez nazw konkretnych miejsc. Źródło zdjęć w hero i w ofertach: deweloper (potwierdził Idzi 3.10.2026).
- Zdjęcia ofert to wizualizacje dewelopera: podpis „Wizualizacja" (stała `OFFER_PHOTO_NOTE`). Idzi podmieni je na docelowe.
- Okładka poradnika powstała poza tym systemem: do wymiany.
- Nigdy nie linkuj zdjęć z cudzego hostingu.

## Formularze

Dwa formularze: poradnik i kontakt. Dostawca domyślny: Web3Forms (DO POTWIERDZENIA), wysyłka na biuro@kwadrat.io. Klucz w zmiennej `PUBLIC_WEB3FORMS_KEY`, nigdy w repo, `.env` w `.gitignore`. Bez klucza formularz działa w trybie demo: komunikat sukcesu i log payloadu w konsoli.

- Honeypot przeciw spamowi, bez CAPTCHA.
- Po wysłaniu poradnika: komunikat w `body` i link do `public/poradnik.pdf`. Do czasu dostarczenia pliku: jednostronicowy placeholder PDF wygenerowany w repo.
- Zgoda pod formularzem poradnika z nowej strony (treść w `site.ts`, do potwierdzenia z prawnikiem). Pod formularzem kontaktowym zgoda z poprzedniej wersji strony: nowa strona jej nie ma, ale Idzi zdecydował 3.10.2026, że ma być (też do potwierdzenia z prawnikiem). Pod każdym formularzem zdanie z linkiem do `/polityka-prywatnosci`.
- Strona `/polityka-prywatnosci`: szablon w stylu systemu z nagłówkiem i stopką, treść to wyłącznie „Treść w przygotowaniu." Nie pisz tekstu prawnego. Treść dostarczy Idzi.

## SEO i meta

- Title: „Kwadrat Nieruchomości | Costa del Sol i Costa Blanca". Description i og:tagi z `<head>` nowej strony, bez myślników. og:image: plik z `<head>` nowej strony pobrany do `public/og-image.png` (zrzut hero wersji z Lovable, 1920 × 1080), ustawiany w `meta.ogImage` w `site.ts`.
- Kotwice sekcji jak w inwentarzu.
- Schema.org: RealEstateAgent (dane spółki, telefon, adres) i FAQPage z czterema pytaniami.
- Lighthouse: Performance, Accessibility, Best Practices, SEO po 95 lub więcej. Font to jedyny zewnętrzny zasób.

## Czego nie robić

- Tailwind, Bootstrap, biblioteki komponentów, ikon, animacji, slidery, karuzele, parallax, animacje wejścia.
- Tryb ciemny. Tło jest jedno: `--paper`.
- Zaokrąglenia, cienie, ramki wokół bloków, karty z tłem, gradienty, ikony, emoji, gwiazdki. Znaki tekstowe z Mulish w FAQ („+", „−") i w liście wyboru („›") nie są ikonami i są dozwolone.
- Czerwony jako tło czegokolwiek, kolor hovera, kolor błędu, kolor linku.
- Krój inny niż Mulish, waga inna niż 400, 600, 700, kursywa.
- Sticky CTA, pop-upy, własny baner cookies (jeśli potrzebny, osobne zadanie).
- Zmiana kolejności sekcji i usuwanie treści poza miejscami wskazanymi w inwentarzu.
- Commitowanie kluczy i `.env`. Jakiekolwiek połączenie z repo Lovable.

## Strażnik systemu

Dodaj `npm run lint:kwadrat` (skrypt Node w `scripts/`), uruchamiany przed `build`. Wywala build, gdy w `src/`:

1. Pojawia się kolor hex poza `src/styles/tokens.css`.
2. `--kwadrat-red` jest użyty poza `tokens.css` i `markers.css` (w `markers.css` siedzą wyłącznie kwadraciki h2 i list, ocena 4,9 dostaje klasę z tego pliku).
3. `border-radius` ma wartość inną niż 0, występuje `box-shadow`, `linear-gradient` albo `radial-gradient`.
4. `font-weight` ma wartość inną niż 400, 600, 700, występuje `font-style: italic` albo `font-family` inne niż `var(--font-sans)`.
5. W `site.ts` albo w markupie występuje znak U+2014 (pauza) albo U+2013 (półpauza).

## Definition of done

1. `npm run build` przechodzi, `lint:kwadrat` przechodzi.
2. Zrzuty ekranu całej strony w szerokościach 390, 768, 1280 i 1600 px (Playwright) zapisane w `docs/screenshots/` i podlinkowane w opisie PR.
3. Lighthouse 95 lub więcej w każdej kategorii, wynik w PR. Jeśli środowisko nie pozwala uruchomić Playwrighta albo Lighthouse, napisz to w PR wprost, nie pomijaj po cichu.
4. Konfiguracja pod Cloudflare Pages gotowa (build command, output dir, wersja Node w README). Podglądy budują się automatycznie po podpięciu repo przez Idziego.
5. README: uruchomienie lokalne, podmiana zdjęć i PDF, podpięcie klucza formularza, podpięcie repo do Cloudflare Pages krok po kroku, oraz checklista przełączenia domeny (poniżej).
6. Lista otwartych punktów w PR: tymczasowe zdjęcia, skrócone zdania, wszystko oznaczone DO POTWIERDZENIA.

## Checklista przełączenia domeny (do README, wykonuje Idzi)

1. Sprawdzić, gdzie trafiają dziś zapytania z formularzy na stronie w Lovable, i wyeksportować dotychczasowe leady.
2. Podpiąć klucz Web3Forms, wysłać testowe zgłoszenie z obu formularzy, potwierdzić odbiór na biuro@kwadrat.io.
3. Wgrać docelowe zdjęcia, PDF poradnika i treść polityki prywatności.
4. W Cloudflare Pages dodać domenę slonecznahiszpania.pl i www, ustawić rekordy DNS u rejestratora domeny.
5. Po propagacji sprawdzić stronę, formularze i certyfikat, dopiero wtedy odpiąć domenę od projektu w Lovable.

## Prompt startowy (pierwsza sesja)

Przeczytaj CLAUDE.md i docs/copy.md w całości. Postaw projekt Astro zgodnie z sekcją Stack. Zaimplementuj tokeny, style bazowe i markers.css, potem komponenty z sekcji Rozszerzenie webowe, potem wszystkie sekcje z inwentarza w kolejności, z treścią z docs/copy.md przeniesioną 1:1 do src/content/site.ts. Pobierz zdjęcia według sekcji Zdjęcia. Formularze w trybie demo. Dodaj strażnika lint:kwadrat. Pracuj na gałęzi i otwórz PR do main. W opisie PR: zrzuty ekranu w czterech szerokościach, wynik Lighthouse i lista otwartych punktów. Jeśli którejś reguły z CLAUDE.md nie da się spełnić, nie obchodź jej: opisz problem w PR i zaproponuj dwie opcje.
