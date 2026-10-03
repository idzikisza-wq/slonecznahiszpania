# slonecznahiszpania.pl: przebudowa w systemie Kwadrat

Ten plik czyta Claude Code na starcie każdej sesji. To jedyne źródło prawdy o projekcie. Jeśli zadanie jest sprzeczne z tym plikiem, zapytaj w PR, nie zgaduj.

## Cel

Odtworzyć stronę https://www.slonecznahiszpania.pl (landing Kwadrat Nieruchomości pod zakup nieruchomości w Andaluzji) jako statyczną, szybką stronę w systemie wizualnym Kwadrat Documents. Treść i kolejność sekcji zostają jak w oryginale. Zmienia się forma: typografia, kolor, siatka, rytm.

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
  --red-tint:    #fdedee; /* tło wiersza-kotwicy w tabeli; na tej stronie nieużywany */
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
- CTA główny: prostokąt z tłem `--ink`, tekst `label` w `--paper`, padding 16px 28px, bez zaokrąglenia, bez cienia. Hover: tło `--text`. Focus: outline 2px `--ink` z offsetem 3px. To jedyne ciemne pole na stronie.
- CTA drugi: tekst `label` w `--ink` z linią 1px `--ink` pod spodem. Hover: kolor `--muted`.
- Pole formularza: tło `--surface`, brak obramowania, dolna linia 1px `--line`, padding 14px 16px, tekst `body`. Etykieta pola w `label` nad polem. Focus: dolna linia 2px `--ink`. Błąd: komunikat w `small` w `--ink` pod polem, bez koloru czerwonego (czerwień nie sygnalizuje błędów). Dwa krótkie pola mogą stać w jednym rzędzie, na mobile jedno pod drugim. Lista wyboru bez natywnego wyglądu (Safari podmienia w niej font na systemowy): Mulish, ta sama wysokość co pozostałe pola, po prawej szary znak tekstowy „›" obrócony w dół. Zgoda jako tekst `small` pod przyciskiem (wysłanie formularza oznacza zgodę), bez checkboxa.
- Nagłówek strony: logo lockup po lewej (wysokość 36px desktop, 28px mobile, pole ochronne co najmniej 16px), po prawej linki w `label` w ink i na końcu CTA główny KONSULTACJA (#kontakt). Bez podtytułu i bez telefonu. Pod nagłówkiem linia lekka. Nie sticky. Na mobile linki i przycisk chowane pod słowem MENU w `label`, bez ikony.
- Favicon: `kwadrat-logo.svg`.

### Dostępność

Kontrast `ink`, `text` i `muted` na `paper` spełnia AA dla podanych rozmiarów. Focus widoczny na każdym elemencie interaktywnym. Wszystkie zdjęcia z sensownym `alt`. Jeden h1, poprawna hierarchia h2 i h3. Kolejność tabulacji zgodna z kolejnością wizualną.

## Marka

- Logo: lockup KWADRAT NIERUCHOMOŚCI w nagłówku (strona to materiał poza dokumentami A4, więc lockup jest właściwą wersją). W stopce brak logo.
- Nazwa w treści: Kwadrat Nieruchomości (meta, logo, opisy). W leadzie Opinii, w zgodach pod formularzami i w linku do kwadrat.io: Grupa Inwestycyjna Kwadrat, odmieniana. Dane spółki w stopce: GRUPA INWESTYCYJNA KWADRAT Sp. z o.o. Oddział Żoliborz nie występuje nigdzie.
- Telefon i e-mail: jak na obecnej stronie (+48 505 085 001, biuro@kwadrat.io). DO POTWIERDZENIA przez Idziego, trzymaj w jednej stałej w `site.ts`.

## Treść: inwentarz sekcji (kolejność bez zmian)

Całe copy jest już w `docs/copy.md`, przeniesione z obecnej strony i oczyszczone z myślników. Przenieś je 1:1 do `src/content/site.ts`. Nie pobieraj HTML obecnej strony. Poniżej układ każdej sekcji, kotwice w nawiasach.

Stan po przeglądzie Idziego z 3.10.2026: aktualne, zatwierdzone copy jest w `src/content/site.ts`, a `docs/copy.md` zostaje jako zapis stanu starej strony. Inwentarz poniżej uwzględnia zmiany z tego przeglądu.

1. Nagłówek. Logo, nawigacja: Dlaczego Hiszpania, Proces zakupu, Opinie, FAQ, na końcu CTA główny KONSULTACJA (#kontakt). Bez podtytułu i bez telefonu. Menu wskazuje tylko sekcje, które są na stronie.
2. Hero (#start). `label` POLSKA OBSŁUGA NA MIEJSCU, h1 z oryginału, `lead` z oryginału, CTA główny UMÓW BEZPŁATNĄ KONSULTACJĘ (#kontakt), CTA drugi JAK WYGLĄDA ZAKUP (#proces). Pod spodem zdjęcie hero 3:2 na szerokość kontenera, pod nim podpis `small`: „Twój adres na południu. Málaga · Costa del Sol · Andaluzja". Bez rzędu kafelków (PL, 360°, 1 plan usunięte po przeglądzie).
3. Poradnik (#poradnik). Układ 6+6. Lewa: `label` BEZPŁATNY PORADNIK, h2, akapit, lista atutów z czterema punktami, `small` „PDF · dostęp natychmiast po zapisie". Prawa: formularz od góry kolumny: Imię i Nazwisko w jednym rzędzie, E-mail, CTA główny POBIERZ BEZPŁATNY PORADNIK, zgoda. Bez zdjęcia.
4. Po co kupujesz. `label` DOPASOWANA ŚCIEŻKA, h2, `lead`. Trzy kafelki tekstowe 4+4+4: `label` 01, 02, 03, h3, akapit. Pod rzędem jeden CTA główny UMÓW BEZPŁATNĄ KONSULTACJĘ (#kontakt).
5. Dlaczego Hiszpania (#dlaczego-hiszpania). `label` PERSPEKTYWA POLSKIEGO INWESTORA, h2, `lead`, trzy kafelki tekstowe 4+4+4. Podsekcja: `label` GEOPOLITYKA I RYZYKA, h3, akapit, lista uwag (szare kwadraciki) z trzema ryzykami (woda, najem krótkoterminowy, kurs): tytuł pogrubiony w ink, po nim opis w `body`.
6. Dlaczego Andaluzja (#dlaczego-andaluzja). `label` WYBÓR REGIONU, h2, `lead`, cztery kafelki tekstowe w układzie 6+6 (sezonowość popytu, Málaga jako miasto, lotnisko, zabudowa), pod nimi `small` ze źródłem liczby mieszkańców. Bez podsekcji. O Costa Blanca tylko zdania, które da się obronić, albo ze źródłem.
7. Lokalizacje (#lokalizacje). `label` LOKALNA SPECJALIZACJA, h2, `lead`. Układ 6+6: tabela danych z `label` ANDALUZJA nad nią i pięcioma wierszami (miasto pogrubione w ink, Lagos jako „Lagos (prowincja Málaga)") oraz zdjęcie 4:3, na mobile nad tabelą.
8. Proces (#proces). `label` JASNY PROCES, h2, `lead`. Rząd czterech kafelków 3+3+3+3: numer w `kpi-mid` (1, 2, 3, 4), h3, zdanie.
9. Oferty (#oferty). Ukryte przełącznikiem `SHOW_OFFERS = false` w `site.ts` (ceny bez potwierdzonego źródła); wtedy znikają też z menu. Nagłówek „Przykłady z Costa del Sol". Docelowo prawdziwe oferty (zdjęcie 4:3, miejsce, parametry, cena z oferty, link w polu `href`). `label` PRZYKŁADOWE KIERUNKI, h2, `small` o orientacyjności cen. Trzy oferty 4+4+4: zdjęcie 4:3, `label` lokalizacja, h3 tytuł, `small` parametry (2 sypialnie · 78 m² · widok na miasto), cena `num2`. Bez ramek, bez przycisków przy ofertach.
10. Obsługa 360°. `label` OBSŁUGA 360°, h2. Układ 6+6: jedna lista atutów z pięcioma punktami i zdjęcie 4:3, na mobile nad listą.
11. Bezpieczeństwo: sekcja usunięta (obiecywała koszty, których nie pokazywała, a dane spółki dublowały stopkę). Wraca z tabelą kosztów zakupu (Pozycja, Kto pobiera, Orientacyjnie), gdy wartości potwierdzi hiszpański prawnik albo doradca podatkowy.
12. Opinie (#opinie). `label` OPINIE KLIENTÓW, h2, akapit. Jeden kafelek: `label` OCENA GOOGLE, liczba 4,9 w `--kwadrat-red` (jedyna czerwona liczba na stronie) z dopiskiem „/ 5" w num2 ink, uwaga `small` z liczbą opinii. Dwie opinie jako bloki callout: cytat w `body` w cudzysłowach „ ", pod nim autor i czas w `small`. Lead z rokiem założenia z dokumentu firmy, przy liczbie opinii data odczytu. Cytaty skrócone do jednego zdania, pod nimi `small` „Opinie dotyczą obsługi w Polsce.". CTA drugi ZOBACZ WSZYSTKIE OPINIE (link z oryginału). Chmurę tagów usuń. Bez gwiazdek, bez logo Google.
13. FAQ (#faq). `label` NAJCZĘSTSZE PYTANIA, h2. Cztery pytania jako natywne `<details>`: `<summary>` w stylu h3, odpowiedź w `body`, linia włosowa między pozycjami, po prawej szary znak tekstowy „+" (otwarte: „−"), nie ikona. Pierwsze pytanie otwarte od startu.
14. Kontakt (#kontakt). Układ 6+6. Lewa: `label` BEZPŁATNA KONSULTACJA, h2, akapit, `label` ZADZWOŃ DO NAS, telefon w `num2` jako link `tel:`, CTA drugi POZNAJ GRUPĘ INWESTYCYJNĄ KWADRAT (kwadrat.io). Bez zdjęcia. Prawa: formularz Imię i nazwisko, E-mail, Rozważany region (select, placeholder „Wybierz lub zostaw otwarte": Costa del Sol, Costa Blanca, Chcę porównać regiony, Inny region Hiszpanii), Wiadomość, CTA główny WYŚLIJ ZAPYTANIE, zgoda.
15. Stopka. Linia lekka nad. W `small`: pełne dane rejestrowe spółki z oryginału, zdanie „Treści na stronie mają charakter informacyjny i nie stanowią porady prawnej, podatkowej ani inwestycyjnej.", www.kwadrat.io, biuro@kwadrat.io, link Polityka prywatności.

## Copy: zasady przenoszenia

- `docs/copy.md` jest już bez długich myślników. Nie wprowadzaj ich z powrotem. Pauzę zastępuje kropka, przecinek albo dwukropek.
- Nie dopisuj copy, nie „ulepszaj" zdań. Każde skrócenie zgłoś w PR jako osobny punkt do akceptacji.
- Liczby: spacja w tysiącach (389 000 €), przecinek dziesiętny (4,9), zakresy słowem „do", kropka środkowa między faktami.
- Wersaliki tylko w etykietach. Bez wykrzykników, bez emoji.

## Zdjęcia

- Docelowe zdjęcia i PDF poradnika dostarcza Idzi. Źródła zdjęć leżą w `zdjecia/` pod nazwą miejsca na stronie, warianty do `public/img/` robi `npm run zdjecia` (kadr i punkt kadru w `scripts/zdjecia.mjs`). PDF do `public/poradnik.pdf`.
- Do podglądu pobierz zdjęcia z listy na końcu `docs/copy.md` do `public/img/` i dodaj w PR listę z adnotacją „tymczasowe, do akceptacji". Jeśli pobranie się nie uda (brak sieci) albo zdjęcie jest wyraźnie stockowe lub generowane, wstaw placeholder `--surface` „Zdjęcie 3:2" i zgłoś to w PR.
- Okładka poradnika z obecnej strony powstała poza tym systemem: oznacz ją w PR jako do wymiany.
- Nigdy nie linkuj zdjęć z cudzego hostingu.

## Formularze

Dwa formularze: poradnik i kontakt. Dostawca domyślny: Web3Forms (DO POTWIERDZENIA), wysyłka na biuro@kwadrat.io. Klucz w zmiennej `PUBLIC_WEB3FORMS_KEY`, nigdy w repo, `.env` w `.gitignore`. Bez klucza formularz działa w trybie demo: komunikat sukcesu i log payloadu w konsoli.

- Honeypot przeciw spamowi, bez CAPTCHA.
- Po wysłaniu poradnika: komunikat w `body` i link do `public/poradnik.pdf`. Do czasu dostarczenia pliku: jednostronicowy placeholder PDF wygenerowany w repo.
- Pod każdym formularzem zgoda (treść w `site.ts`, do potwierdzenia z prawnikiem) plus zdanie z linkiem do `/polityka-prywatnosci`.
- Strona `/polityka-prywatnosci`: szablon w stylu systemu z nagłówkiem i stopką, treść to wyłącznie „Treść w przygotowaniu." Nie pisz tekstu prawnego. Treść dostarczy Idzi.

## SEO i meta

- Title: „Kwadrat Nieruchomości | Andaluzja i Málaga". Description i og:tagi z oryginału, bez myślników. og:image: zdjęcie hero.
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
