# slonecznahiszpania.pl w systemie Kwadrat

Jedyne źródło prawdy o projekcie, czytane na starcie każdej sesji. Gdy zadanie jest sprzeczne z tym plikiem, zapytaj w PR, nie zgaduj.

## Projekt

- Cel: statyczna, szybka wersja https://www.slonecznahiszpania.pl (landing Kwadrat Nieruchomości: Costa del Sol, Costa Blanca i inne regiony Hiszpanii). Treść i kolejność sekcji jak na live, forma (typografia, kolor, siatka, rytm) z systemu Kwadrat.
- Właściciel: Idzi Kisza. Język strony: polski (`lang="pl"`).
- Hierarchia źródeł: decyzje Idziego zapisane w tym pliku, potem system Kwadrat v2 z warstwą www (artefakt „Kwadrat Documents”, https://claude.ai/artifact/P7idjpFLkGF93rq3bqeGQj: `project/WEB.md`, `tokens.json`, `components/bundle.css`, komponenty Web*; klasy `kw-*` wolno kopiować 1:1), potem `08_DOKUMENTY_KWADRAT.md` (system pod A4).
- Strona na Lovable zostaje nietknięta: nie łącz z nią repo, nie kopiuj jej kodu. Domenę przepina Idzi po akceptacji podglądu.
- Zasada nadrzędna: czytelność ponad efektowność. W trzy sekundy widać, co to jest, od kogo i co zrobić dalej; element, który tego nie wspiera, wylatuje.

## Stack

- Astro (najnowsza stabilna), czysty CSS z custom properties, bez frameworka UI i Tailwinda. Jedyna zależność w `package.json`: `astro`.
- Mulish 400, 600, 700 lokalnie w `public/fonts/` (licencja w `OFL.txt`), `@font-face` z `font-display: swap` w `tokens.css`, preload w `Base.astro`. Strona nie ładuje niczego z zewnątrz, poza Google Analytics po zgodzie (sekcja Analityka).
- Build statyczny do `dist/`, hosting Cloudflare Pages (podgląd `*.pages.dev`). `vite.build.cssTarget` w `astro.config.mjs` trzyma `max-width:` w media queries dla Safari do 16.3: nie usuwaj.
- Pliki: strony w `src/pages/`, sekcje w `src/components/`, całe copy i dane w `src/content/site.ts` (twarde spacje dokłada `typo.ts`), style w `src/styles/tokens.css`, `base.css`, `markers.css`.
- Logo: `public/brand/kwadrat-logo-lockup.svg` (znak z napisem NIERUCHOMOŚCI) w nagłówku, `kwadrat-logo.svg` w stopce i jako favicon, zawsze na białym. Nie rysuj od nowa, nie przekoloruj, skaluj tylko proporcjonalnie; przy optymalizacji usuń blok `<metadata>`, ścieżek nie ruszaj.

## Tokeny

Wartości są w `src/styles/tokens.css`: jedyne miejsce na kolor w hex i nazwę kroju. Innych kolorów (granat, turkus, `#e72f2f`) nie ma nigdzie.

| Token | Wartość | Użycie |
| --- | --- | --- |
| `--kwadrat-red` | #E30613 | tylko: logo, kwadracik przed h2, kwadraciki list atutów, jedna liczba na ekranie (reguła 2); wyjątek: tło przycisku na okładce poradnika (9.10.2026) |
| `--red-tint` | #fdedee | tylko wiersz-kotwica tabeli porównania |
| `--ink` | #1a1a1a | nagłówki, liczby, linki, przycisk główny, linie mocne |
| `--text` | #333333 | tekst, lead, listy, tabele, hover przycisku |
| `--muted` | #6f6f6f | etykiety, podpisy, odpowiedzi FAQ, stopka (5,0:1, nie rozjaśniać) |
| `--line` / `--line-soft` | #d9d9d9 / #ececec | linie lekkie / linie między wierszami tabel |
| `--surface` / `--paper` | #f5f5f5 / #ffffff | tylko pole zamiast zdjęcia / jedyne tło strony |

Rytm: `--container` 1200px (z marginesem), `--side` 40px (20px poniżej 768px), `--gutter` 24px, `--measure` 720px, `--section` 96px (64px), `--block` 40px (32px), `--space-xs/s/m` 8/16/24px, `--rule` 1px, `--marker-section` 12px, `--marker-list` 8px.

## Sześć reguł systemu

1. Dużo bieli: na ekran najwyżej cztery bloki (rząd kafelków, lista, zdjęcie, formularz, tabela); podsekcja z własnym h3 to osobna sekcja. Gdy się nie mieści, tnij albo dziel, nie zmniejszaj fontu ani odstępów.
2. Jeden akcent: czerwień tylko w czterech miejscach z tabeli tokenów. Jedyna czerwona liczba to ocena Google 4,9 (pasek KPI w hero i Opinie), nigdy dwie na jednym ekranie. Nigdy tło (jedyny wyjątek: przycisk na okładce poradnika, decyzja Idziego 9.10.2026), tekst, link, hover, błąd ani otwarte FAQ.
3. Linie zamiast ramek: mocna 1px ink (nad kafelkiem, krokiem, kierunkiem, stopką, pod nagłówkiem tabeli), lekka 1px `--line` (między sekcjami, pod nagłówkiem strony, w FAQ, pod polami, callout), włosowa 1px `--line-soft` (wiersze tabel). Zero ramek wokół bloków, cieni, zaokrągleń, gradientów i ikon; jedyny wyjątek to piktogram telefonu w nagłówku.
4. Najpierw wynik: h1, lead i przycisk główny bez przewijania w 1440 × 900 i 390 × 844.
5. Zdjęcia duże, w naturalnych proporcjach (3:2, 4:3): bez kadrowania do kwadratu, ramek, tekstu, nakładek, gradientów i kart na zdjęciu, logo nigdy na zdjęciu. Poglądowe mają podpis „Zdjęcie poglądowe”. Brak zdjęcia: pole `--surface` z `small` „Zdjęcie 3:2”, a na podglądzie kopia zdjęcia, które już jest w repo. Nigdy obrazek z internetu ani z cudzego hostingu.
6. Jedna rodzina fontów: hierarchia rozmiarem i grubością, nie kolorem. Wersaliki tylko w stylu `label`.

## Typografia (www)

| Styl | Waga | Desktop | Poniżej 768px | Uwagi |
| --- | --- | --- | --- | --- |
| h1 | 400 i 700 | 48/56, tracking -0.015em | 32/38 | ink, jeden na stronie: początek 400, puenta 700 |
| h2 | 700 | 32/40 | 26/32 | ink, czerwony kwadracik 12px przed tekstem, odstęp 14px, na linii bazowej |
| h3 | 700 | 20/28 | 18/26 | ink, bez kwadracika |
| lead | 400 | 18/30 | 16/27 | text, do 720px, pierwszy akapit pod h1 i h2 |
| body | 400 | 16/27 | 16/27 | text, do 720px, nigdy mniej niż 16px |
| pytanie FAQ | 700 | 18/25 | 16/23 | ink |
| label | 600 | 12/16, wersaliki, tracking 0.08em | bez zmian | muted: nad h2 i liczbą, numer kroku, nagłówek tabeli |
| small | 400 | 13/20 | bez zmian | muted: podpisy, noty, zgody, stopka |
| kpi | 700 | 40/44, tracking -0.02em | 32/36 | ink (wyjątek: ocena Google w czerwieni); wartość tekstowa 20px (18px) na linii bazowej liczby |
| przycisk / menu / etykieta pola | 600 | 16/20 / 15/20 / 13/20 | bez zmian | paper na ink / ink / muted |

Cyfry tabelaryczne wszędzie. Pogrubienie w tekście (700, ink) tylko dla kluczowej liczby, tytułu pozycji listy i puenty h1.

## Siatka

- 12 kolumn, gutter 24px. Podziały: 12, 6+6, 4+4+4, 8+4, 7+5 oraz rzędy po cztery (pasek KPI, kroki).
- Progi 768px i 1200px. Telefon: jedna kolumna (pasek KPI w dwóch). Tablet: najwyżej dwie kolumny; 8+4, 7+5 i 4+4+4 w jednej, 6+6 bez zmian, KPI i kroki 2 × 2, w Poradniku opis na całą szerokość, a okładka i formularz 6+6; stopka w trzech kolumnach. Od 1200px pełny układ, menu w jednym rzędzie.
- Sekcje co `--section`, oddzielone linią 1px `--line`, nigdy kolorowym tłem; bloki co `--block`.

## Komponenty

- Etykieta sekcji: `label` nad h2, odstęp 16px.
- Nagłówek: lockup 148 × 40px, obok niego w jednej linii (odstęp 16px, wyśrodkowany w pionie) `label` „Hiszpania · Costa del Sol · Costa Blanca”, nigdy pod logo; poniżej 768px etykiety nie ma (brak miejsca); menu 15px 600 ink (hover: podkreślenie); na końcu sam piktogram słuchawki 20px w polu 40 × 40px (link `tel:`, `aria-label` „Zadzwoń +48 505 085 001”, hover: linia 1px pod piktogramem). Numer w nagłówku się nie wyświetla. Piktogram: `src/components/ui/PhoneIcon.astro`, własny inline SVG w `currentColor`, ostre krawędzie, `aria-hidden`. Pod paskiem linia 1px `--line`, nie sticky. Poniżej 1200px linki pod tekstowym przyciskiem „Menu”, piktogram obok. Kolejność w HTML to kolejność tabulacji: lockup, piktogram (do 1199px), „Menu”, linki, piktogram (od 1200px; widoczny zawsze jeden). Tab po otwarciu menu wchodzi w linki, Escape zamyka menu i wraca na przycisk, bez JS menu stoi otwarte. Lockup zmniejsza się proporcjonalnie dopiero poniżej 320px.
- Hero (WebHero): `label`, h1, lead, jeden przycisk główny i jeden link drugi, `small`. Pod spodem dwa kierunki 6+6 (na telefonie jeden pod drugim), na końcu pasek KPI. Zdjęcia zawsze pod przyciskami.
- Kierunek: zdjęcie z `small` „Zdjęcie poglądowe” (`PHOTO_NOTE`), linia 1px ink, `label` KIERUNEK 01, tytuł w stylu h3 (h2 bez kwadracika), akapit, link drugi na dole kolumny (linki obu kierunków na jednej linii).
- Pasek KPI (WebStats): 3 do 4 kafelków w subgridzie (wartości na jednej wysokości): linia ink nad, `label`, wartość, `small`. Kafelek 1 to ocena Google z `GOOGLE_RATING`, `GOOGLE_REVIEWS`, `GOOGLE_PROFILE_NAME`, `GOOGLE_READ_DATE` i `GOOGLE_REVIEWS_URL`; gdy któreś pole jest puste, nie renderuje się ani on, ani kafelek oceny w Opiniach (link zmieniaj, nie usuwaj). Wartości wpisuje Idzi, nigdy Claude. Pozostałe kafelki: wartości tekstowe tylko z usług i regionów opisanych na stronie, bez nowych obietnic i liczby oddziałów. Tablet i telefon: dwie kolumny.
- Kafelek tekstowy: linia ink nad, `label`, h3, akapit, opcjonalnie link drugi na dole.
- Kroki (WebSteps): rząd po cztery (przy innej liczbie 3+3), linia ink nad, `label` „Krok 01”, h3, jedno do dwóch zdań; zdjęcia 4:3 przy wszystkich krokach albo przy żadnym (dziś przy żadnym); bez strzałek.
- Listy: atuty z czerwonym kwadracikiem 8px, najwyżej pięć punktów na listę; uwagi i ryzyka z kwadracikiem w `--line`; kwadracik na środku pierwszej linii.
- Callout: lewa krawędź 1px `--line`, padding-left 16px, bez tła.
- Tabela danych: dwie kolumny, lewa `muted` o stałej szerokości, prawa `text`, linie włosowe, bez pionowych linii i zebry.
- Tabela porównania: kryterium w `label`, dwie kolumny regionów, nagłówek w `label` z linią mocną, wiersze z linią włosową; wiersz-kotwica na `--red-tint`, pogrubiony, w ink; pod tabelą nota `small` o gminach, bez zdania o wierszu-kotwicy. Na telefonie wiersz to blok z etykietami regionów.
- Przycisk główny (kw-btn): tło ink, tekst paper 600 16px, padding 16px 28px, co najmniej 52px wysokości, rogi 0, bez cienia, hover tło `--text`. Jeden na sekcję (wyjątek: przycisk na okładce poradnika), jedyne ciemne pole na stronie.
- Link drugi (kw-link): ink 600, podkreślenie 1px z odsunięciem 4px, hover 2px.
- Fokus: obrys 2px ink z odsunięciem 3px na każdym elemencie klikanym.
- Formularz: pola Mulish 16px na bieli, dolna linia 1px `--line`, padding 12px 0, etykieta 13px 600 muted nad polem. Błąd: `small` w ink z kwadracikiem `--line`, bez czerwieni. Dwa krótkie pola w rzędzie (na telefonie pod sobą). Lista wyboru bez natywnego wyglądu, 52px, po prawej znak „›” obrócony w dół. Zgoda w `small` pod przyciskiem, bez checkboxa, przez `aria-describedby`. W trakcie wysyłki `aria-disabled` (nie `disabled`), limit 15 s.
- FAQ (WebFaq): natywne `<details>`, pierwsze otwarte; linia `--line` nad pierwszym i pod każdym; pytanie 18px 700 ink, padding 24px 52px 24px 0; plus z dwóch kresek 16 × 2px w ink zamiast znaku „+”, pionowa obraca się do 0 (0,2 s, bez animacji przy `prefers-reduced-motion`); odpowiedź 16/27 muted do 720px; bez zmiany koloru na hover i po otwarciu.
- Stopka (WebFooter): linia ink nad, tekst 13/20 muted, nagłówki 700 ink, kolumny 4+4+4 (na telefonie jedna). Kolumna 1: logo 40px, „Kwadrat Nieruchomości”, hasło „Hiszpania · Costa del Sol · Costa Blanca”, Facebook · YouTube · TikTok jako linki tekstowe. Kolumna 2: „Kontakt”: tel. +48 505 085 001, biuro@kwadrat.io, www.kwadrat.io (linki z celem dotyku 24px). Kolumna 3: dane spółki. Pasek dolny za linią `--line`: zastrzeżenie, „Polityka prywatności” i, z Google Analytics, przycisk „Ustawienia cookies”. Kod pocztowy z miastem, NIP, REGON i KRS nie łamią się w środku.

## Dostępność

Kontrast na paper: ink 17,4:1, text 12,6:1, muted 5,0:1, kwadrat-red 4,9:1 (tylko liczba 40px); każdy tekst co najmniej 4,5:1. Fokus widoczny, sensowne alty, jeden h1, poprawna hierarchia h2 i h3, tabulacja zgodna z kolejnością wizualną, cele dotyku co najmniej 24px, font bez przesunięć układu (CLS 0).

## Marka i dane

- W treści, meta, og:site_name i schema.org `name`: „Kwadrat Nieruchomości”, bez odmiany. „Grupa Inwestycyjna Kwadrat Sp. z o.o.” tylko w danych spółki: stopka, administrator w polityce prywatności, schema.org `legalName`. Bez oddziału Żoliborz, „Kwadrat Żoliborz” i liczby oddziałów.
- Jedyny telefon na stronie: +48 505 085 001 (`CONTACT_PHONE`): piktogram w nagłówku, Konsultacja, stopka, schema.org. Formularze i stopka: biuro@kwadrat.io. Bez bloku agenta i drugiego numeru.
- Dane spółki (`COMPANY`): Grupa Inwestycyjna Kwadrat Sp. z o.o., ul. Samorządowa 9/1, 05-400 Otwock, NIP 5322092950, REGON 388901030, KRS 0000896911, Sąd Rejonowy dla m.st. Warszawy w Warszawie, XIV Wydział Gospodarczy KRS, kapitał zakładowy 50 000 zł, www.kwadrat.io.
- Social (`SOCIAL`): Facebook, YouTube, TikTok, tylko linki tekstowe.

## Sekcje (kolejność bez zmian, kotwice w nawiasach)

Zatwierdzone copy jest w `site.ts`. `docs/copy.md` to zapis najstarszej wersji, nie źródło: nie wracają z niej rząd PL / 360° / 1 plan, „Bez ukrytych kosztów”, stare sekcje o Costa Blanca, lista ryzyk z migracją ani tabela z Lagos. Nie odtwarzaj tekstów z pamięci; live to aplikacja JS, więc czytaj wersję wyrenderowaną przeglądarką.

1. Nagłówek: lockup, etykieta, menu (Porównanie, Regiony, Proces, Oferty, Poradnik, Opinie, FAQ; Oferty znika przy `SHOW_OFFERS = false`), piktogram telefonu.
2. Hero (#start): `label` PRZEWODNIK PO HISZPAŃSKIM RYNKU, h1 „Dwa wybrzeża.” (400) / „Dwie dobre odpowiedzi.” (700), lead, przycisk „Pobierz poradnik” (#poradnik), link „Porównajmy Twój wybór” (#kontakt), `small` „Bez rankingu na siłę. ...”. Kierunki Costa del Sol i Costa Blanca ze zdjęciami tarasów i linkiem „Zobacz mocne strony i kompromisy” (#porownanie). Pasek KPI: Ocena Google, Regiony, Obsługa, Weryfikacja.
3. Porównanie (#porownanie): `label`, h2, lead, tabela (Charakter, Budżet, Życie poza sezonem, Dostępność, Dla kogo jako kotwica), pod nią nota o różnicach między gminami.
4. Regiony (#regiony): `label`, h2, lead, sześć kafelków 4+4+4 (`label` 01 do 06, `label` z miejscowościami, h3, akapit).
5. Poradnik (#poradnik): 4+4+4: opis (`label`, h2, akapit, lista atutów z czterema punktami, `small` „PDF · dostęp po zapisie”), okładka bez ramki i cienia z czerwonym przyciskiem „Pobierz darmowy poradnik” obok napisu „Słoneczna Hiszpania” (prowadzi do formularza, fokus na pierwszym polu, po zapisie na linku do PDF; hover ink), formularz od góry kolumny (Imię i Nazwisko w rzędzie, E-mail, przycisk, zgoda).
6. Po co kupujesz (#cele): `label`, h2, lead, trzy kafelki 4+4+4 z linkiem „Porozmawiajmy” (#kontakt); bez przycisku głównego pod rzędem.
7. Dlaczego Hiszpania (#dlaczego-hiszpania): `label`, h2, lead, trzy kafelki, pod nimi callout z h3 „Ryzyka nazywamy wprost” i akapitem.
8. Od Málagi po Alicante (#lokalizacje): `label`, h2, lead, dwie tabele danych 6+6 (Costa del Sol i Axarquía, Costa Blanca), po cztery miejscowości pogrubione w ink.
9. Proces (#proces): `label`, h2, lead, cztery kroki „Krok 01” do „Krok 04”.
10. Przykładowe nieruchomości (#oferty, przełącznik `SHOW_OFFERS`): „Przykłady z Costa del Sol”, trzy oferty 4+4+4: zdjęcie z `small` „Wizualizacja” (`OFFER_PHOTO_NOTE`), `label` lokalizacja, h3, `small` parametry, cena w stylu `kpi`, opcjonalny link `href`.
11. Obsługa 360° (#bezpieczenstwo): 4+4+4: `label`, h2, akapit, obok dwie listy atutów po trzy punkty (sześć punktów jak na live).
12. Na miejscu w Hiszpanii (#na-miejscu): 6+6: `label`, h2 „Nasi rezydenci i lokalni agenci”, akapit o Sylwii Antczak Baranowskiej i Gilberto Tejadzie (rezydenci i lokalni agenci); obok zdjęcie Idziego z Sylwią i Gilbertem (selfie, robocze) bez podpisu, imiona w alcie. Bez ich telefonów i e-maili.
13. Opinie (#opinie): `label`, h2, akapit; kafelek oceny (`label` OCENA GOOGLE, 4,9 w czerwieni z „/ 5” 20px w ink, `small` z liczbą opinii, wizytówką i datą odczytu, link „Zobacz wszystkie”) i dwie opinie jako callout. Bez gwiazdek i logo Google.
14. FAQ (#faq): `label`, h2, cztery pytania, pierwsze otwarte. TODO w `site.ts`: prawo zakupu (prawnik potwierdził według Idziego 3.10.2026, TODO zamyka Idzi) i koszty.
15. Konsultacja (#kontakt): 6+6. Lewa: `label`, h2, akapit, `label` ZADZWOŃ DO NAS, telefon 20px 700 ink (`tel:`), na dole zdjęcie Piotra i Ani 4:3, wyrównane do dołu formularza, bez podpisu (prawdziwe zdjęcie zespołu). Na telefonie: tekst, zdjęcie, formularz. Prawa: Imię i nazwisko, E-mail, Rozważany region (opcjonalnie; placeholder „Wybierz lub zostaw otwarte”; Costa del Sol, Costa Blanca, Chcę porównać regiony, Inny region Hiszpanii), Wiadomość (opcjonalnie), przycisk „Wyślij zapytanie”, zgoda. Placeholdery z live.
16. Stopka (opis w Komponentach), zastrzeżenie: „Treści na stronie mają charakter informacyjny i nie stanowią porady prawnej, podatkowej ani inwestycyjnej.”

## Copy

- Bez pauz i półpauz, także w altach, meta i zgodach; zamiast nich kropka, przecinek albo dwukropek.
- Nie dopisuj copy i nie „ulepszaj” zdań; każde skrócenie zgłoś w PR do akceptacji.
- Liczby: spacja w tysiącach (389 000 €), przecinek dziesiętny (4,9), zakresy słowem „do”, kropka środkowa między faktami, daty w zapisie 01.10.2026.
- Wersaliki tylko w `label`; przyciski, linki i menu zwykłą pisownią. Bez wykrzykników i emoji (poza cytatami klientów).
- Pisownia: Málaga, Málagi, Máladze; Torre del Mar, Caleta de Vélez, Dénia, Cádiz, Axarquía po hiszpańsku.

## Zdjęcia i PDF

- Źródła w `zdjecia/` pod nazwą miejsca; `npm run zdjecia` zapisuje WebP i JPG 800 i 1600px (mniejsze źródło w pełnej szerokości) do `public/img/`; proporcje i kadr w `scripts/zdjecia.mjs`. Na stronie `<picture>`, zawsze `width` i `height`, `loading="lazy"` poza hero.
- Hero: `hero-costa-del-sol.jpg` i `hero-costa-blanca.jpg` (1200 × 912, od dewelopera, poglądowe), alty „Taras apartamentu z widokiem na wybrzeże Costa del Sol” i „Taras apartamentu z widokiem na Alicante i Costa Blanca”.
- Oferty: `oferta-malaga.jpg`, `oferta-mijas.jpg`, `oferta-marbella.jpg` (1008 × 752, wizualizacje dewelopera, Idzi podmieni). Poradnik: `poradnik-cover.png`, pierwsza strona PDF poradnika (A4, 1654 × 2339, decyzja Idziego 9.10.2026); przy nowym PDF podmienić razem z nim. Kontakt: `kontakt.jpg` (Piotr i Ania, 720 × 960, kadr 4:3 z dołu, `focus` 0,86; do podmiany na oryginał z telefonu). Poza `kontakt.jpg` bez kadrowania.
- Na miejscu w Hiszpanii: `zespol-hiszpania.jpg`, selfie Idziego z Sylwią i Gilbertem (1500 × 2000, robocze, Idzi może podmienić): `ratio: null`, bez kadru i podpisu (pusty `team.photoNote`), alt z imionami od lewej.
- PDF poradnika: `public/poradnik.pdf`, wersja od Idziego z 9.10.2026 (22 strony A4 w stylu Kwadrat, 0,8 MB); Cloudflare Pages przyjmuje pliki do 25 MiB, większy plik trzeba zmniejszyć (zdjęcia do JPEG). Treści PDF nie zmieniamy. W `public/_headers` `X-Robots-Tag: noindex`.

## Formularze

- Poradnik i kontakt przez Web3Forms na biuro@kwadrat.io. Klucz `PUBLIC_WEB3FORMS_KEY` tylko w zmiennych środowiskowych, nigdy w repo (`.env` w `.gitignore`). Bez klucza tryb demo: komunikat sukcesu i payload w konsoli.
- Honeypot, bez CAPTCHA. Po zapisie na poradnik komunikat i link do PDF.
- Zgody: pod poradnikiem z live, pod kontaktem z poprzedniej wersji strony (obie potwierdzone); pod każdym formularzem zdanie z linkiem do `/polityka-prywatnosci`.
- Polityka prywatności (`privacy` w `site.ts`, strona w stylu systemu): klauzula RODO z https://kwadrat.io/rodo/ dostosowana do formularzy tej strony, lista zmian w komentarzu nad nią. Tekstu prawnego nie zmieniaj bez zgody Idziego; przed produkcją sprawdza go prawnik (TODO), także przekazywanie danych poza EOG.

## Analityka

- Google Analytics 4 tylko z identyfikatorem w `PUBLIC_GA_ID` (zmienna środowiskowa, nigdy w repo, `GA_ID` w `site.ts`). Bez niego strona nie ma ani skryptu Google, ani baneru.
- Baner zgody (`src/components/Consent.astro`, logika w `src/scripts/analytics.ts`): na samej górze strony w normalnym układzie, nie przyklejony, linia `--line` pod spodem, tekst `small`, dwa równorzędne przyciski w stylu linku drugiego („Akceptuję”, „Odrzucam”). Klasa `zgoda-otwarta` z `<head>` przed malowaniem, więc CLS 0. Wybór w localStorage `kw-zgoda`; „Ustawienia cookies” w stopce otwiera baner ponownie.
- Google Analytics ładuje się dopiero po zgodzie: bez reklam i Google Signals, cookies na 13 miesięcy. Wycofanie zgody wyłącza wysyłkę i usuwa cookies `_ga`.
- Zdarzenia: `generate_lead` (formularz naprawdę wysłany, nie w trybie demo; `form_id`) i `phone_click` (link `tel:`; `link_location`).
- Polityka prywatności: bez identyfikatora zdanie `privacy.cookies`, z nim akapity `privacy.cookiesAnalytics`. Teksty baneru i te akapity akceptuje Idzi i sprawdza prawnik, zanim identyfikator trafi do Cloudflare Pages (TODO w `site.ts`).

## SEO

- Meta jak na live: title „Kwadrat Nieruchomości | Costa del Sol i Costa Blanca”, og:title i twitter:title „Kwadrat Nieruchomości | Hiszpania”, description, og:description i twitter:description w `site.ts`. og:image i twitter:image: `/img/hero-costa-del-sol-1200.jpg` (1200 × 912), twitter:card `summary_large_image`.
- schema.org: RealEstateAgent (name, legalName, NIP, REGON, KRS, telefon, adres, logo `kwadrat-logo.svg`) i FAQPage. Kotwice jak w sekcjach.
- `public/sitemap.xml` (dwie strony) i `Sitemap:` w `robots.txt`.

## Czego nie robić

- Tailwind, Bootstrap, biblioteki komponentów i ikon, animacje wejścia, slidery, karuzele, parallax, sticky CTA, pop-upy i przyklejone banery (jedyny baner to zgoda na Google Analytics z sekcji Analityka), tryb ciemny.
- Zaokrąglenia, cienie, ramki wokół bloków, karty z tłem, gradienty, ikony poza piktogramem telefonu, emoji, gwiazdki, strzałki między krokami. Znak „›” w liście wyboru nie jest ikoną.
- Czerwień poza regułą 2, krój inny niż Mulish, waga inna niż 400, 600, 700, kursywa.
- Zmiana kolejności sekcji i usuwanie treści poza tym, co opisuje ten plik.
- Z kwadrat.io: czerwień `#e72f2f` i czerwony hover albo otwarte FAQ, ceny bez spacji („439000 PLN”), długie myślniki, karuzele, ikony, liczba oddziałów, ocena Google bez wizytówki i daty odczytu.
- Commit kluczy i `.env`, jakiekolwiek połączenie z repo Lovable.

## Strażnik

`npm run lint:kwadrat` (`scripts/lint-kwadrat.mjs`) działa przed `build` i przerywa go, gdy w `src/` znajdzie: kolor poza `tokens.css` (hex, `%23`, `rgb()`, `hsl()`, `color-mix()`, nazwany kolor, redefinicja tokenu); `--kwadrat-red` poza `tokens.css` i czterema regułami `markers.css` (kwadracik h2, kwadracik listy atutów, `.kpi--accent`, `.cta.guide-cover-cta`); zaokrąglenie (`border-radius`, `clip-path`, `rx`/`ry`), cień albo gradient; wagę spoza 400, 600, 700, `font-variation-settings`, kursywę, `font-family` inne niż `var(--font-sans)` lub `inherit`, skrót `font:` inny niż `font: inherit`; pauzę lub półpauzę (znak, encja, sekwencja ucieczki, także w komentarzach); bibliotekę ikon albo zależność spoza `astro`. Szczegóły w skrypcie.

## Definition of done

1. `npm run build` i `lint:kwadrat` przechodzą.
2. Zrzuty Playwright w `docs/screenshots/`: cała strona 390, 768, 1280, 1440 i 1600px, pierwszy ekran 1440 × 900 i 390 × 844; linki w opisie PR.
3. Lighthouse co najmniej 95 w każdej kategorii, wynik w PR. Gdy środowisko nie pozwala zmierzyć, napisz to w PR wprost.
4. Checklisty „Checklista przed publikacją strony” (`WEB.md`) i „Checklista przed wysyłką” (`08_DOKUMENTY_KWADRAT.md`) przechodzą, wynik w PR.
5. Konfiguracja Cloudflare Pages gotowa (build command, output dir, wersja Node w README).
6. README: uruchomienie lokalne, podmiana zdjęć i PDF, klucz formularza, Cloudflare Pages krok po kroku, checklista przełączenia domeny (wykonuje Idzi).
7. W PR lista otwartych punktów: tymczasowe zdjęcia, skrócone zdania, TODO w kodzie, sprawy do potwierdzenia przez Idziego.

## Dziennik decyzji Idziego

- 3.10.2026: oryginałem jest nowa wersja live; Web3Forms; oferty i ceny widoczne; telefon +48 505 085 001; zgoda pod kontaktem z poprzedniej wersji strony; zdjęcia hero i ofert od dewelopera; prawnik potwierdził odpowiedź o prawie zakupu.
- 4.10.2026: system Kwadrat v2 z warstwą www; polityka prywatności na bazie kwadrat.io/rodo; biuro@kwadrat.io w stopce.
- 5.10.2026: zdjęcie Piotra i Ani w Kontakcie. Zgodność z live (11 punktów): meta jak na live, pisownia Málaga, marka Kwadrat Nieruchomości, lockup z etykietą w nagłówku, dwa zdjęcia w hero i przycisk „Porównajmy Twój wybór”, sześć punktów Obsługi 360° w dwóch listach, bez noty o wierszu-kotwicy, REGON i sąd w stopce, jeden telefon bez bloku agenta, linki „Porozmawiajmy” w celach, brakujące zdjęcia dublowane na podglądzie. Piktogram telefonu zamiast słowa „Zadzwoń”, bez numeru w nagłówku. Etykieta „Hiszpania · Costa del Sol · Costa Blanca” obok lockupu, nie pod nim.
- 6.10.2026: „(opcjonalnie)” przy polach Rozważany region i Wiadomość; link „Zobacz wszystkie” wprost do wizytówki (link „Oddział Otwock” ze stopki kwadrat.io); Google Analytics 4 po zgodzie. Rozwiązań z 5.10.2026 przedstawionych do akceptacji Idzi nie przyjął, wrócimy do nich; do tego czasu bez zmian.
- 7.10.2026: sekcja „Na miejscu w Hiszpanii” między Obsługą 360° a Opiniami: Sylwia Antczak Baranowska i Gilberto Tejada, nasi rezydenci i lokalni agenci; zdjęcie robocze: selfie Idziego z nimi. Poradnik PDF z live zamiast placeholdera.
- 8.10.2026: pobieranie poradnika na górę: w hero przycisk główny „Pobierz poradnik”, a „Porównajmy Twój wybór” jako link obok; kolejność sekcji bez zmian.
- 9.10.2026: nowy, poprawiony poradnik PDF (22 strony A4 w stylu Kwadrat) zamiast wersji z live; okładka przy formularzu to jego pierwsza strona. Na okładce przycisk „Pobierz darmowy poradnik”, czerwony w kolorze Kwadratu, obok napisu „Słoneczna Hiszpania”: świadomy wyjątek od reguł 2 (czerwone tło) i 5 (nic na zdjęciu) oraz od jednego przycisku głównego na sekcję, tylko w Poradniku.
