# slonecznahiszpania.pl: przebudowa w systemie Kwadrat

Ten plik czyta Claude Code na starcie każdej sesji. To jedyne źródło prawdy o projekcie. Jeśli zadanie jest sprzeczne z tym plikiem, zapytaj w PR, nie zgaduj.

## Cel

Odtworzyć stronę https://www.slonecznahiszpania.pl (landing Grupy Inwestycyjnej Kwadrat: porównanie Costa del Sol, Costa Blanca i innych regionów Hiszpanii) jako statyczną, szybką stronę w systemie wizualnym Kwadrat. Treść i kolejność sekcji zostają jak w oryginale. Zmienia się forma: typografia, kolor, siatka, rytm.

Od 3.10.2026 oryginałem jest nowa wersja strony (Costa del Sol i Costa Blanca). Teksty i zdjęcia pochodzą z jej wyrenderowanej wersji, wygląd z systemu Kwadrat.

Od 4.10.2026 obowiązuje system Kwadrat w wersji 2, z warstwą www. Źródło prawdy o wyglądzie: artefakt „Kwadrat Documents” (https://claude.ai/artifact/P7idjpFLkGF93rq3bqeGQj), pliki `project/README.md`, `project/WEB.md`, `project/tokens.json`, `project/components/bundle.css` i opisy komponentów WebHero, WebStats, WebSteps, WebFaq, WebFooter. Klasy `kw-*` z `bundle.css` wolno kopiować 1:1. Ten plik streszcza wartości v2 dla tej strony. Przy sprzeczności między tym plikiem a artefaktem zapytaj w PR.

Właściciel: Idzi Kisza. Język strony: polski (`lang="pl"`).

Obecna strona stoi na Lovable i zostaje nietknięta. To repo jest osobne. Nie łącz go z Lovable, nie kopiuj kodu z repo Lovable. Domenę przepina Idzi dopiero po akceptacji podglądu.

## Zasada nadrzędna

Czytelność ponad efektowność. Odwiedzający w trzy sekundy wie: co to jest, od kogo, co ma zrobić dalej. Jeśli element tego nie wspiera, wylatuje.

## Stack

- Astro (najnowsza stabilna), bez frameworka UI, bez Tailwinda. Czysty CSS z custom properties.
- Zero zależności poza Astro. Żadnych bibliotek ikon, animacji, sliderów.
- Font Mulish hostowany lokalnie: `public/fonts/Mulish-400.woff2`, `Mulish-600.woff2`, `Mulish-700.woff2` (pliki z artefaktu systemu, z polskimi i hiszpańskimi znakami), `@font-face` z `font-display: swap` w `tokens.css`, preload trzech plików w `Base.astro`. Licencja OFL w `public/fonts/OFL.txt`. Strona nie ładuje niczego z zewnątrz.
- Build statyczny do `dist/`. Hosting: Cloudflare Pages, podgląd na adresie `*.pages.dev`.
- `vite.build.cssTarget` w `astro.config.mjs` trzyma w CSS zapis `max-width:` zamiast `(width<=…)`, którego Safari do 16.3 nie zna. Nie usuwaj.
- Struktura: `src/pages/index.astro`, sekcje w `src/components/`, całe copy i dane kontaktowe w `src/content/site.ts` (poprawka tekstu nie wymaga grzebania w markupie), style w `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/markers.css`.
- Logo jest w repo: `public/brand/kwadrat-logo.svg` (sam kwadrat, wersja www: nagłówek, stopka, favicon) i `public/brand/kwadrat-logo-lockup.svg` (znak z napisem NIERUCHOMOŚCI, od v2 nieużywany na stronie). Nie rysuj logo od nowa, nie przekoloruj, nie przeskaluj nieproporcjonalnie. Usuń z plików blok `<metadata>` (c2pa) przy optymalizacji, ścieżek nie ruszaj.
- Zdjęcia w `public/img/`: WebP plus JPG przez `<picture>`, szerokości 1600 i 800 px, `width` i `height` zawsze ustawione, `loading="lazy"` poza hero.

## Tokeny

Przenieś 1:1 do `src/styles/tokens.css`. To jedyne miejsce w repo, gdzie wolno zapisać kolor jako hex i nazwę kroju (w `@font-face`). Inne kolory (granat, turkus, `#e72f2f`, inne czerwienie) nie występują nigdzie.

```css
:root {
  --kwadrat-red: #E30613;  /* logo, kwadracik przed H2, kwadraciki list, jedna liczba na ekranie */
  --red-tint: #fdedee;     /* tylko kotwica tabeli (Porównanie: wiersz „Dla kogo”) */
  --ink: #1a1a1a;          /* nagłówki, liczby, linki, przycisk główny, linie mocne */
  --text: #333333;         /* tekst, lead, listy, tabele, hover przycisku */
  --muted: #6f6f6f;        /* etykiety, podpisy, odpowiedzi FAQ, stopka (5,0:1, nie rozjaśniać) */
  --line: #d9d9d9;         /* linie między sekcjami, w FAQ, pod polami, krawędź callouta */
  --line-soft: #ececec;    /* linie między wierszami tabel */
  --surface: #f5f5f5;      /* jedyne szare tło: placeholder zdjęcia */
  --paper: #ffffff;        /* tło strony */
  --font-sans: "Mulish", "Helvetica Neue", Arial, sans-serif;

  --rule: 1px;             /* każda linia na ekranie */
  --marker-section: 12px;  /* czerwony kwadracik przed H2 */
  --marker-list: 8px;      /* kwadracik w listach */

  --container: 1200px;     /* razem z bocznym marginesem */
  --side: 40px;            /* margines boczny; 20px poniżej 768px */
  --gutter: 24px;
  --measure: 720px;        /* tekst ciągły, lead, odpowiedzi FAQ */

  --section: 96px;         /* odstęp między sekcjami; 64px poniżej 768px */
  --block: 40px;           /* odstęp między blokami; 32px poniżej 768px */
  --space-xs: 8px;
  --space-s: 16px;
  --space-m: 24px;
}
```

Font: wyłącznie Mulish 400, 600, 700. Żadnej innej wagi, żadnej kursywy, żadnego innego kroju.

## Sześć reguł systemu (z Kwadrat Documents, przeniesione na web)

Pełny opis systemu pod A4 jest w `08_DOKUMENTY_KWADRAT.md` w katalogu głównym repo, warstwa www w `WEB.md` artefaktu. Ich checklisty („Checklista przed wysyłką” i „Checklista przed publikacją strony”) to checklista końcowa strony. Wartości pod web bierzemy z tego pliku.

1. Dużo bieli. Biel dominuje. Na ekran (jedna wysokość okna) najwyżej cztery bloki treści (blok: rząd kafelków, lista, zdjęcie, formularz, tabela). Podsekcja z własnym h3 liczy się jako osobna sekcja. Jak coś się nie mieści: tnij albo dziel, nie zmniejszaj fontu ani odstępów.
2. Jeden akcent. `--kwadrat-red` występuje tylko w: logo, kwadraciku przed każdym h2, kwadracikach list atutów i jednej liczbie na ekranie (ocena Google 4,9: w pasku KPI pod hero i w Opiniach, nigdy dwie na jednym ekranie). Nigdy jako tło przycisku, sekcji, pola. Nigdy w tekście, linku, hoverze ani w otwartym FAQ.
3. Cienkie linie zamiast ramek. Linia mocna: 1px `--ink` nad kafelkiem, krokiem, kierunkiem, nad stopką i pod nagłówkiem tabeli. Linia lekka: 1px `--line` między sekcjami, pod nagłówkiem strony, w FAQ, pod polami formularza, krawędź callouta. Linia włosowa: 1px `--line-soft` między wierszami tabeli. Zero obramowań wokół bloków, cieni, zaokrągleń, gradientów, ikon.
4. Najpierw wynik. Hero odpowiada na pytanie odwiedzającego bez przewijania (1440 × 900 i 390 × 844): co, od kogo, następny krok (H1, lead, przycisk główny).
5. Zdjęcia duże, w naturalnych proporcjach 3:2 albo 4:3. Bez kadrowania do kwadratu, bez ramek, bez tekstu, nakładek i gradientów na zdjęciu, bez kart nachodzących na zdjęcie. Logo nigdy na zdjęciu. Zdjęcie poglądowe ma podpis „Zdjęcie poglądowe”. Brak zdjęcia: pole `--surface` z napisem w `small` „Zdjęcie 3:2", nigdy obrazek z internetu.
6. Jedna rodzina fontów. Hierarchię buduje rozmiar i grubość, nie kolor. Wersaliki wyłącznie w stylu `label`.

## Warstwa www (system v2)

Poniższe to jedyne dopuszczalne wartości pod web. Nie dokładaj własnych.

### Skala typograficzna

| Styl | Waga | Desktop | Telefon (poniżej 768px) | Kolor i uwagi |
| --- | --- | --- | --- | --- |
| h1 (web-display) | 400 i 700 | 48px / 56px, tracking -0.015em | 32px / 38px | ink, jeden na stronie, w hero: początek 400, puenta 700, słowa bez zmian |
| h2 (web-h2) | 700 | 32px / 40px | 26px / 32px | ink, zawsze z czerwonym kwadracikiem 12 × 12px przed tekstem, odstęp 14px, na linii bazowej pierwszego wiersza |
| h3 (web-h3) | 700 | 20px / 28px | 18px / 26px | ink, bez kwadracika: krok, kafelek, region, kierunek |
| lead (web-lead) | 400 | 18px / 30px | 16px / 27px | text, do 720px, pierwszy akapit pod h1 i pod h2 |
| body (web-body) | 400 | 16px / 27px | 16px / 27px | text, do 720px; na telefonie nigdy mniej niż 16px |
| pytanie FAQ (web-faq-q) | 700 | 18px / 25px | 16px / 23px | ink |
| label (web-label) | 600 | 12px / 16px, wersaliki, tracking 0.08em | bez zmian | muted: etykieta nad h2 i nad liczbą, numer kroku, nagłówek tabeli. Jedyne wersaliki |
| small (web-small) | 400 | 13px / 20px | bez zmian | muted: podpisy, noty, zgody, stopka |
| kpi (web-kpi) | 700 | 40px / 44px, tracking -0.02em | 32px / 36px | ink: liczby w pasku KPI, ceny ofert; jedyny wyjątek czerwony: ocena Google |
| wartość tekstowa KPI | 700 | 20px | 18px | ink, na linii bazowej liczby 40px (32px) |
| przycisk | 600 | 16px / 20px | bez zmian | paper na ink, zwykła pisownia |
| menu | 600 | 15px / 20px | bez zmian | ink |
| etykieta pola | 600 | 13px / 20px | bez zmian | muted, nad polem |

Cyfry tabelaryczne wszędzie (`font-variant-numeric: tabular-nums`). Pogrubienie (700, ink) dozwolone w tekście tylko dla kluczowej liczby, tytułu pozycji listy i puenty h1.

### Siatka i rytm

Kontener `--container` 1200px razem z marginesem bocznym `--side` (40px, na telefonie 20px). 12 kolumn, gutter 24px. Dozwolone podziały: 12, 6+6, 4+4+4, 8+4, w hero 7+5, plus rzędy czterech kafelków w pasku KPI i w krokach procesu.

Progi: 768px (`web-bp-tablet`) i 1200px (`web-bp-desktop`).

- Poniżej 768px (telefon): wszystko w jednej kolumnie, poza paskiem KPI (dwie kolumny).
- Od 768 do 1199px (tablet, najwyżej dwie kolumny): podziały 8+4, 7+5 i 4+4+4 w jednej kolumnie, 6+6 bez zmian, pasek KPI i kroki procesu 2 × 2, w Poradniku opis na całą szerokość, a okładka i formularz 6+6. Stopka zostaje w trzech kolumnach.
- Od 1200px pełny układ: dopiero w nim menu mieści się w jednym rzędzie.
- W hero na tablecie i telefonie zdjęcie stoi pod przyciskami.

Odstęp między sekcjami `--section` 96px (64px na telefonie). Każdą sekcję oddziela linia 1px `--line`, nigdy kolorowe tło. Odstęp między blokami `--block` 40px (32px na telefonie).

### Komponenty

- Etykieta sekcji: `label` nad h2, odstęp 16px.
- Nagłówek strony: logo `kwadrat-logo.svg` 40 × 40px na białym tle po lewej, menu tekstowe 15px 600 w ink (hover: podkreślenie), na końcu telefon jako tekst „Zadzwoń +48 505 085 001” (link `tel:`, bez przycisku i ikony). Pod nagłówkiem linia 1px `--line`. Nie sticky. Poniżej 1200px linki chowane pod przyciskiem tekstowym „Menu”, bez ikony, telefon widoczny obok. Kolejność w HTML jest kolejnością tabulacji: logo, telefon (do 1199px), „Menu”, linki, telefon (od 1200px; widoczny zawsze tylko jeden). Tab po otwarciu menu wchodzi w linki, Escape zamyka menu i wraca na przycisk. Bez JS menu stoi otwarte pod paskiem.
- Hero (WebHero): `label`, h1 w dwóch grubościach, lead, jeden przycisk główny i jeden link drugi, pod nimi `small`. Obok (7+5) jedno zdjęcie w naturalnych proporcjach, bez nakładek i przyciemnień, pod nim `small` „Zdjęcie poglądowe” (stała `PHOTO_NOTE` w `site.ts`).
- Pasek KPI (WebStats): bezpośrednio pod hero, 3 do 4 kafelków. Kafelek: linia 1px ink nad, `label`, wartość, uwaga `small`. Kafelki to subgrid, wartości stoją na jednej wysokości. Kafelek 1 to ocena Google z konfiguracji w `site.ts` (`GOOGLE_RATING`, `GOOGLE_REVIEWS`, `GOOGLE_PROFILE_NAME`, `GOOGLE_READ_DATE`, link `GOOGLE_REVIEWS_URL`): gdy któreś z tych pięciu pól jest puste, kafelek się nie renderuje (tak samo kafelek oceny w Opiniach), bo checklista `WEB.md` wymaga przy liczbie wizytówki, daty odczytu i linku. Link zmienia się na inny, nie usuwa. Wartości wpisuje Idzi, nigdy Claude. Pozostałe kafelki: wartości tekstowe 20px 700 wyłącznie z usług i regionów opisanych niżej na stronie, bez nowych obietnic i bez liczby oddziałów. Na tablecie i telefonie dwie kolumny.
- Kierunek: linia 1px ink nad, `label` KIERUNEK 01, tytuł w stylu h3 (h2 bez kwadracika), akapit, link drugi. Bez zdjęcia.
- Kafelek tekstowy: linia 1px ink nad, `label`, h3, akapit `body`. Używany w sekcjach z trzema lub czterema argumentami.
- Kroki procesu (WebSteps): rząd po cztery (przy innej liczbie 3+3), linia 1px ink nad krokiem, `label` „Krok 01”, h3, jedno do dwóch zdań. Zdjęcia 4:3 przy wszystkich krokach albo przy żadnym (dziś przy żadnym). Bez strzałek.
- Lista atutów: czerwony kwadracik `--marker-list` (8px), najwyżej pięć punktów na listę. Lista uwag i ryzyk: kwadracik w `--line`. Kwadracik wyrównany do środka pierwszej linii.
- Callout: lewa krawędź 1px `--line`, padding-left `--space-s`, bez tła.
- Tabela danych: dwie kolumny, lewa w `muted` o stałej szerokości, prawa w `text`, linie włosowe między wierszami, bez pionowych linii, bez zebry.
- Tabela porównania: kolumna kryterium w `label`, dwie kolumny regionów. Nagłówek w `label` z linią mocną pod spodem, wiersze z linią włosową, bez ramek, pionowych linii i zebry. Wiersz-kotwica na tle `--red-tint`, pogrubiony, tekst w ink, z notą `small` pod tabelą. Na telefonie każdy wiersz to blok z etykietami regionów.
- Przycisk główny (kw-btn): tło `--ink`, tekst `--paper` 600 16px, padding 16px 28px, co najmniej 52px wysokości, rogi 0, bez cienia. Hover: tło `--text`. Jeden przycisk główny na sekcję. To jedyne ciemne pole na stronie.
- Link i przycisk drugi (kw-link): tekst `--ink` 600, podkreślenie 1px z odsunięciem 4px. Hover: podkreślenie 2px. Czerwień nigdy w linkach.
- Fokus: obrys 2px `--ink` z odsunięciem 3px na każdym elemencie klikanym, także w polach formularza.
- Pole formularza: Mulish 16px (mniej powoduje zoom na iOS) na bieli, bez ramki, dolna linia 1px `--line`, padding 12px 0. Etykieta pola nad polem: 13px 600 `muted`. Błąd: tekst `small` w `--ink` z kwadracikiem w `--line` pod polem, bez czerwieni. Dwa krótkie pola mogą stać w jednym rzędzie, na telefonie jedno pod drugim. Lista wyboru wygląda jak pole tekstowe: bez natywnego wyglądu (Safari podmienia w niej font na systemowy), Mulish, 52px wysokości, po prawej szary znak tekstowy „›" obrócony w dół. Zgoda jako tekst `small` pod przyciskiem (wysłanie formularza oznacza zgodę), bez checkboxa, połączona z przyciskiem przez `aria-describedby`. W trakcie wysyłki przycisk ma `aria-disabled` (nie `disabled`, który gubi fokus), a żądanie ma limit 15 s.
- FAQ (WebFaq): natywne `<details>`, pierwsze pytanie otwarte od startu. Linia 1px `--line` nad pierwszym pytaniem i pod każdym. Pytanie 18px 700 ink (16px na telefonie), padding 24px 52px 24px 0. Plus z dwóch kresek 16 × 2px w ink (pseudo-elementy): pionowa obraca się do 0 po otwarciu, przejście 0,2 s, bez animacji przy `prefers-reduced-motion`. Odpowiedź 16px / 27px w `muted`, do 720px. Bez zmiany koloru na hover i po otwarciu. Bez znaku „+” i bez ikony.
- Stopka (WebFooter): linia 1px ink nad, tekst 13px / 20px w `muted`, nagłówki kolumn 700 ink. Trzy kolumny 4+4+4, na telefonie jedna. Kolumna 1: logo 40px, „Grupa Inwestycyjna Kwadrat”, „Część Grupy Inwestycyjnej Kwadrat · kwadrat.io” z linkiem do https://kwadrat.io/ (jak w `WEB.md`, decyzja Idziego 4.10.2026), social media jako linki tekstowe (Facebook, YouTube, TikTok). Kolumna 2: „Kontakt” i dane agenta. Kolumna 3: dane spółki i adres biuro@kwadrat.io. Pasek dolny za linią 1px `--line`: zastrzeżenie i link „Polityka prywatności”. Fragmenty danych (kod pocztowy z miastem, NIP, KRS) nie łamią się w środku.
- Favicon: `kwadrat-logo.svg`.

### Dostępność

Kontrast na `--paper`: ink 17,4:1, text 12,6:1, muted 5,0:1 (nie rozjaśniać), kwadrat-red 4,9:1 (tylko liczba 40px). Każdy tekst co najmniej 4,5:1. Focus widoczny na każdym elemencie interaktywnym. Wszystkie zdjęcia z sensownym `alt`. Jeden h1, poprawna hierarchia h2 i h3. Kolejność tabulacji zgodna z kolejnością wizualną. Font bez przesunięć układu (CLS 0).

## Marka

- Nazwa w treści, meta i schema.org: „Grupa Inwestycyjna Kwadrat”, odmieniana. „Kwadrat Nieruchomości” nie występuje w treści (logo bez zmian). Dane spółki: Grupa Inwestycyjna Kwadrat Sp. z o.o. (stała `COMPANY` w `site.ts`). Oddział Żoliborz i „Kwadrat Żoliborz” nie występują nigdzie. Liczby oddziałów nie podajemy.
- Logo: `kwadrat-logo.svg` 40px w nagłówku i w stopce, zawsze na białym tle.
- Telefon i e-mail: +48 505 085 001 i biuro@kwadrat.io, jak na nowej stronie (potwierdził Idzi 3.10.2026). Telefon jest w stałej `CONTACT_PHONE` w `site.ts` z komentarzem TODO: prompt v2 prosi o ponowne potwierdzenie z Idzim. Formularze wysyłają na biuro@kwadrat.io, a adres jest widoczny w stopce, w kolumnie danych spółki (decyzja Idziego 4.10.2026).
- Kontakt agenta w stopce (stała `AGENT`, dane od Idziego): Idzi Kisza, tel. 600 038 758, idzi.kisza@kwadrat.io, ul. Słowackiego 22/11a, Warszawa.
- Social media (stała `SOCIAL`): Facebook, YouTube, TikTok, wyłącznie jako linki tekstowe.

## Treść: inwentarz sekcji (kolejność bez zmian)

Źródłem treści jest nowa wersja www.slonecznahiszpania.pl, wyrenderowana przeglądarką (to aplikacja JS: zwykły fetch może zwrócić starą wersję). Aktualne, zatwierdzone copy jest w `src/content/site.ts`. `docs/copy.md` to zapis najstarszej wersji strony, nie źródło. Nie odtwarzaj tekstów z pamięci. Poniżej układ każdej sekcji, kotwice w nawiasach.

Usunięte po przebudowie z 3.10.2026: rząd PL / 360° / 1 plan, sekcja „Bez ukrytych kosztów", sekcje o Costa Blanca z poprzedniej wersji, lista ryzyk z migracją, tabela lokalizacji z Lagos, zdjęcie pary z placu i selfie z kart ofert. Zdjęcie pary z placu (Piotr i Ania) wróciło 5.10.2026 do Kontaktu (decyzja Idziego).

1. Nagłówek. Logo, menu: Porównanie, Regiony, Proces, Oferty, Poradnik, Opinie, FAQ, na końcu telefon „Zadzwoń +48 505 085 001” jako tekst. Gdy `SHOW_OFFERS = false`, pozycji Oferty nie ma.
2. Hero (#start). `label` PRZEWODNIK PO HISZPAŃSKIM RYNKU, h1 w dwóch liniach „Dwa wybrzeża.” (400) / „Dwie dobre odpowiedzi.” (700) w jednym kolorze ink, `lead`. Przycisk główny „Umów bezpłatną konsultację” (#kontakt), link drugi „Pobierz poradnik” (#poradnik), pod nimi `small` „Bez rankingu na siłę. ...”. Obok (7+5) zdjęcie tarasu z podpisem „Zdjęcie poglądowe”. Pod spodem pasek KPI (Ocena Google, Regiony, Obsługa, Weryfikacja), pod nim dwa kierunki 6+6 bez zdjęć: Costa del Sol i Costa Blanca, link „Zobacz mocne strony i kompromisy” (#porownanie).
3. Porównanie (#porownanie). `label` COSTA DEL SOL CZY COSTA BLANCA?, h2, `lead`, tabela porównania (Charakter, Budżet, Życie poza sezonem, Dostępność, Dla kogo jako wiersz-kotwica), pod nią nota o wierszu-kotwicy i nota o różnicach między gminami.
4. Regiony (#regiony). `label` SZERSZA PERSPEKTYWA, h2, `lead`. Sześć kafelków tekstowych 4+4+4 w dwóch rzędach: `label` 01 do 06, `label` z miejscowościami, h3 z nazwą regionu, akapit.
5. Poradnik (#poradnik). Układ 4+4+4: opis (`label`, h2, akapit, lista atutów z czterema punktami, `small` „PDF · dostęp po zapisie"), okładka w naturalnych proporcjach bez ramki i cienia, formularz od góry kolumny (Imię i Nazwisko w jednym rzędzie, E-mail, przycisk główny, zgoda).
6. Po co kupujesz (#cele). `label` NAJPIERW CEL, h2, `lead`, trzy kafelki tekstowe 4+4+4 (`label` 01 do 03, h3, akapit), pod rzędem jeden przycisk główny „Umów bezpłatną konsultację” (#kontakt).
7. Dlaczego Hiszpania (#dlaczego-hiszpania). `label` PERSPEKTYWA POLSKIEGO INWESTORA, h2, `lead`, trzy kafelki tekstowe 4+4+4, pod nimi callout z h3 „Ryzyka nazywamy wprost" i akapitem.
8. Od Malagi po Alicante (#lokalizacje). `label` DWA OBSZARY POSZUKIWAŃ, h2, `lead`. Dwie tabele danych 6+6: Costa del Sol i Axarquía, Costa Blanca, po cztery miejscowości pogrubione w ink.
9. Proces (#proces). `label` JASNY PROCES, h2, `lead`, cztery kroki (WebSteps): `label` „Krok 01” do „Krok 04”, h3, akapit.
10. Przykładowe nieruchomości (#oferty). Widoczne: oferty i ceny potwierdził Idzi 3.10.2026. Przełącznik `SHOW_OFFERS` w `site.ts` chowa sekcję razem z pozycją Oferty w menu. Nagłówek „Przykłady z Costa del Sol". Trzy oferty 4+4+4: zdjęcie w naturalnych proporcjach, pod nim `small` „Wizualizacja" (stała `OFFER_PHOTO_NOTE` w `site.ts`), `label` lokalizacja, h3, `small` parametry, cena w stylu `kpi`, opcjonalny link w polu `href`.
11. Obsługa 360° (#bezpieczenstwo). 6+6: `label`, h2, akapit; lista atutów z pięcioma punktami.
12. Opinie (#opinie). `label` OPINIE KLIENTÓW, h2, akapit. 4+4+4: kafelek z `label` OCENA GOOGLE, liczbą 4,9 w `--kwadrat-red` z „/ 5” 20px w ink, uwagą `small` „120 opinii w wizytówce Google”, pod nią `small` z nazwą wizytówki i datą odczytu („Kwadrat Otwock”, stan na 01.10.2026), link drugi „Zobacz wszystkie”; dwie opinie jako callout. Wartości z konfiguracji `GOOGLE_*`. Bez gwiazdek, bez logo Google.
13. FAQ (#faq). `label` NAJCZĘSTSZE PYTANIA, h2. Cztery pytania (WebFaq), pierwsze otwarte od startu. Przy odpowiedzi o prawie zakupu w `site.ts` TODO: do potwierdzenia przez hiszpańskiego prawnika (Idzi przekazał 3.10.2026, że prawnik ją potwierdził; TODO zamyka Idzi).
14. Konsultacja (#kontakt). 6+6. Lewa: `label` BEZPŁATNA KONSULTACJA, h2, akapit, `label` ZADZWOŃ DO NAS, telefon 20px 700 ink jako link `tel:`, na dole zdjęcie Piotra i Ani w kadrze 4:3, wyrównane do dołu formularza, bez podpisu (prawdziwe zdjęcie zespołu, nie poglądowe). Na telefonie: tekst, zdjęcie, formularz. Prawa: formularz Imię i nazwisko, E-mail, Rozważany region (select, placeholder „Wybierz lub zostaw otwarte": Costa del Sol, Costa Blanca, Chcę porównać regiony, Inny region Hiszpanii), Wiadomość, przycisk główny „Wyślij zapytanie”, zgoda. Placeholdery pól z nowej strony.
15. Stopka (WebFooter). Marka z linkiem do kwadrat.io („Część Grupy Inwestycyjnej Kwadrat · kwadrat.io”) i social media, kontakt agenta, dane spółki: Grupa Inwestycyjna Kwadrat Sp. z o.o., ul. Samorządowa 9/1, 05-400 Otwock, NIP 5322092950, KRS 0000896911, kapitał zakładowy 50 000 zł, biuro@kwadrat.io. Pasek dolny: „Treści na stronie mają charakter informacyjny i nie stanowią porady prawnej, podatkowej ani inwestycyjnej.” i link Polityka prywatności.

## Copy: zasady przenoszenia

- `docs/copy.md` jest już bez długich myślników. Nie wprowadzaj ich z powrotem, ani w treści, ani w altach, metatagach i zgodach. Pauzę zastępuje kropka, przecinek albo dwukropek.
- Nie dopisuj copy, nie „ulepszaj" zdań. Każde skrócenie zgłoś w PR jako osobny punkt do akceptacji.
- Liczby: spacja w tysiącach (389 000 €, 439 000 zł, nigdy „439000 PLN”), przecinek dziesiętny (4,9), zakresy słowem „do", kropka środkowa między faktami. Daty: 01.10.2026.
- Wersaliki tylko w etykietach (`label`). Przyciski, linki i menu zwykłą pisownią. Bez wykrzykników, bez emoji (wyjątek: cytaty klientów).
- Pisownia: Malaga, Malagi, Maladze po polsku. Torre del Mar, Caleta de Vélez, Dénia, Cádiz, Axarquía zostają po hiszpańsku.

## Zdjęcia

- Źródła zdjęć leżą w `zdjecia/` pod nazwą miejsca na stronie, warianty do `public/img/` robi `npm run zdjecia` (proporcje i punkt kadru w `scripts/zdjecia.mjs`). PDF poradnika do `public/poradnik.pdf`.
- Zdjęcia pochodzą z nowej strony: `hero-costa-del-sol.jpg` (1200 × 912, w hero), `poradnik-cover.webp` (1354 × 1920), `oferta-malaga.jpg`, `oferta-mijas.jpg`, `oferta-marbella.jpg` (1008 × 752). `kontakt.jpg` (Piotr i Ania, 720 × 960, z main jako `poradnik-okladka.jpg`) stoi w Kontakcie w kadrze 4:3 z dolnej części zdjęcia (`focus` 0,86 w `scripts/zdjecia.mjs`): pełna pionowa wysokość wydłużałaby kolumnę daleko poza formularz. Źródło ma tylko 720 px, więc do podmiany na oryginał z telefonu. `hero-costa-blanca.jpg` zostaje w `zdjecia/` jako źródło, bez wariantów w `public/img/`: od v2 nie jest na stronie (kierunki są bez zdjęć). Wszystkie poza `kontakt.jpg` w naturalnych proporcjach, bez kadrowania.
- Zdjęcie tarasu w hero to zdjęcie poglądowe: podpis „Zdjęcie poglądowe" (stała `PHOTO_NOTE`), alt bez nazw konkretnych miejsc. Źródło zdjęć w hero i w ofertach: deweloper (potwierdził Idzi 3.10.2026).
- Zdjęcia ofert to wizualizacje dewelopera: podpis „Wizualizacja" (stała `OFFER_PHOTO_NOTE`). Idzi podmieni je na docelowe.
- Okładka poradnika powstała poza tym systemem: do wymiany.
- Nigdy nie linkuj zdjęć z cudzego hostingu.

## Formularze

Dwa formularze: poradnik i kontakt. Dostawca: Web3Forms (potwierdził Idzi 3.10.2026), wysyłka na biuro@kwadrat.io. Klucz w zmiennej `PUBLIC_WEB3FORMS_KEY`, nigdy w repo, `.env` w `.gitignore`. Bez klucza formularz działa w trybie demo: komunikat sukcesu i log payloadu w konsoli.

- Honeypot przeciw spamowi, bez CAPTCHA.
- Po wysłaniu poradnika: komunikat w `body` i link do `public/poradnik.pdf`. Do czasu dostarczenia pliku: jednostronicowy placeholder PDF wygenerowany w repo.
- Zgoda pod formularzem poradnika z nowej strony (treść w `site.ts`, potwierdzona). Pod formularzem kontaktowym zgoda z poprzedniej wersji strony: nowa strona jej nie ma, ale Idzi zdecydował 3.10.2026, że ma być (treść potwierdzona). Pod każdym formularzem zdanie z linkiem do `/polityka-prywatnosci`.
- Strona `/polityka-prywatnosci`: w stylu systemu z nagłówkiem i stopką. Treść to klauzula RODO z https://kwadrat.io/rodo/ (odczyt 4.10.2026), dostosowana do formularzy tej strony na prośbę Idziego (4.10.2026). Jest w `site.ts` (`privacy`), a lista zmian wobec oryginału w komentarzu nad nią. Nie zmieniaj tekstu prawnego bez zgody Idziego. Przed produkcją treść sprawdza prawnik (TODO w `site.ts`), w tym przekazywanie danych poza EOG przez dostawców formularzy i hostingu.

## SEO i meta

- Title: „Grupa Inwestycyjna Kwadrat | Costa del Sol i Costa Blanca”, og:title „Grupa Inwestycyjna Kwadrat | Hiszpania”. Description i og:description z `<head>` nowej strony, bez myślników. og:image: `public/og-image.jpg`, zrzut górnej części tej strony w systemie Kwadrat (okno 1600 × 840 zmniejszone do 1200 × 630), ostatnio 4.10.2026 po hero v2. Ustawiany w `meta.ogImage` w `site.ts`. Po zmianie hero zrób nowy zrzut.
- Kotwice sekcji jak w inwentarzu.
- Schema.org: RealEstateAgent (Grupa Inwestycyjna Kwadrat, dane spółki, telefon, adres, logo `kwadrat-logo.svg`) i FAQPage z czterema pytaniami.
- `public/sitemap.xml` (dwie strony) i wpis `Sitemap:` w `robots.txt`. PDF poradnika ma w `public/_headers` nagłówek `X-Robots-Tag: noindex`, bo jest „dostępny po zapisie”.
- Lighthouse: Performance, Accessibility, Best Practices, SEO po 95 lub więcej, CLS 0. Strona nie ładuje zasobów z zewnątrz.

## Czego nie robić

- Tailwind, Bootstrap, biblioteki komponentów, ikon, animacji, slidery, karuzele, parallax, animacje wejścia.
- Tryb ciemny. Tło jest jedno: `--paper`.
- Zaokrąglenia, cienie, ramki wokół bloków, karty z tłem, gradienty, ikony, emoji, gwiazdki, strzałki między krokami. Znaki tekstowe z Mulish w liście wyboru („›") nie są ikonami i są dozwolone.
- Czerwony jako tło czegokolwiek, kolor tekstu, hovera, błędu, linku, otwartego FAQ.
- Krój inny niż Mulish, waga inna niż 400, 600, 700, kursywa.
- Sticky CTA, pop-upy, własny baner cookies (jeśli potrzebny, osobne zadanie).
- Zmiana kolejności sekcji i usuwanie treści poza miejscami wskazanymi w inwentarzu.
- Z kwadrat.io nie przenosimy: czerwieni `#e72f2f` i czerwonego tekstu na hover i po otwarciu FAQ, nazwy „Kwadrat Nieruchomości” w treści, cen bez spacji („439000 PLN”), długich myślników, karuzel, sliderów i ikon, liczby oddziałów, oceny Google bez źródła (nazwy wizytówki i daty odczytu).
- Commitowanie kluczy i `.env`. Jakiekolwiek połączenie z repo Lovable.

## Strażnik systemu

`npm run lint:kwadrat` (skrypt `scripts/lint-kwadrat.mjs`) uruchamia się przed `build`. Czyta każdy plik w całości po usunięciu komentarzy (tekst w cudzysłowach to nie komentarz, wartość w kolejnej linii też się liczy) i sprawdza zapis CSS (`border-radius`, także z prefiksem `-webkit-` i `-moz-`), obiekty stylu w JS i Astro (`borderRadius`) i atrybuty SVG (`font-weight="…"`). Wyjątki dotyczą ścieżek `src/styles/tokens.css` i `src/styles/markers.css`, nie samych nazw plików. Wywala build, gdy w `src/`:

1. Pojawia się kolor poza `src/styles/tokens.css`: hex (także `%23…` w data URI), `rgb()`, `hsl()`, `color-mix()` i podobne, nazwany kolor CSS (`red`, `white`…) albo redefinicja tokenu (`--ink:`, `--font-sans:`…).
2. `--kwadrat-red` jest użyty poza `tokens.css` i `markers.css`. W `markers.css` wolno go użyć tylko w trzech regułach: kwadracik h2, kwadracik listy atutów i `.kpi--accent` (ocena Google), zawsze jako `var(--kwadrat-red)`. W `tokens.css` tylko w jego własnej definicji.
3. `border-radius` ma wartość inną niż 0, zaokrąglenie powstaje przez `clip-path` (`inset(… round …)`, `circle()`, `ellipse()`) albo `rx`/`ry` w SVG, występuje cień (`box-shadow` i `text-shadow` inne niż `none`, `drop-shadow()`) albo gradient.
4. `font-weight` ma wartość inną niż 400, 600, 700 (`normal`, `bold`), występuje `font-variation-settings`, kursywa albo `font-family` inne niż `var(--font-sans)` lub `inherit` (nazwa „Mulish” wolno tylko w `@font-face` w `tokens.css`), albo skrót `font:` inny niż `font: inherit`.
5. Występuje pauza albo półpauza: znak U+2014 lub U+2013, encja (`&mdash;`, `&ndash;`, `&#8212;`, `&#x2014;`, liczbowe także bez średnika) albo sekwencja ucieczki (`\u2014`, `\2014`). Ta reguła sprawdza też komentarze.
6. Pojawia się import biblioteki ikon w `src/` albo w `package.json` jest jakakolwiek zależność poza `astro`.

## Definition of done

1. `npm run build` przechodzi, `lint:kwadrat` przechodzi.
2. Zrzuty ekranu całej strony w szerokościach 390, 768, 1280, 1440 i 1600 px oraz pierwszego ekranu 1440 × 900 i 390 × 844 (Playwright) zapisane w `docs/screenshots/` i podlinkowane w opisie PR.
3. Lighthouse 95 lub więcej w każdej kategorii, wynik w PR. Jeśli środowisko nie pozwala uruchomić Playwrighta albo Lighthouse, napisz to w PR wprost, nie pomijaj po cichu.
4. Checklista przed publikacją strony z `WEB.md` i checklista z `08_DOKUMENTY_KWADRAT.md` przechodzą, wynik w PR.
5. Konfiguracja pod Cloudflare Pages gotowa (build command, output dir, wersja Node w README). Podglądy budują się automatycznie po podpięciu repo przez Idziego.
6. README: uruchomienie lokalne, podmiana zdjęć i PDF, podpięcie klucza formularza, podpięcie repo do Cloudflare Pages krok po kroku, oraz checklista przełączenia domeny (poniżej).
7. Lista otwartych punktów w PR: tymczasowe zdjęcia, skrócone zdania, TODO w kodzie, wszystko do potwierdzenia przez Idziego.

## Checklista przełączenia domeny (do README, wykonuje Idzi)

1. Sprawdzić, gdzie trafiają dziś zapytania z formularzy na stronie w Lovable, i wyeksportować dotychczasowe leady.
2. Podpiąć klucz Web3Forms, wysłać testowe zgłoszenie z obu formularzy, potwierdzić odbiór na biuro@kwadrat.io.
3. Wgrać docelowe zdjęcia i PDF poradnika, potwierdzić z prawnikiem treść polityki prywatności.
4. W Cloudflare Pages dodać domenę slonecznahiszpania.pl i www, ustawić rekordy DNS u rejestratora domeny.
5. Po propagacji sprawdzić stronę, formularze i certyfikat, dopiero wtedy odpiąć domenę od projektu w Lovable.

## Prompt startowy (pierwsza sesja)

Przeczytaj CLAUDE.md i docs/copy.md w całości. Postaw projekt Astro zgodnie z sekcją Stack. Zaimplementuj tokeny, style bazowe i markers.css, potem komponenty z sekcji Warstwa www, potem wszystkie sekcje z inwentarza w kolejności, z treścią z docs/copy.md przeniesioną 1:1 do src/content/site.ts. Pobierz zdjęcia według sekcji Zdjęcia. Formularze w trybie demo. Dodaj strażnika lint:kwadrat. Pracuj na gałęzi i otwórz PR do main. W opisie PR: zrzuty ekranu, wynik Lighthouse i lista otwartych punktów. Jeśli którejś reguły z CLAUDE.md nie da się spełnić, nie obchodź jej: opisz problem w PR i zaproponuj dwie opcje.
