# 08 Dokumenty Kwadrat: design system

Eksport z design systemu Kwadrat Documents (README, komponenty, tokeny). Źródło zasad dla checklisty końcowej.

# Kwadrat Documents

System dokumentów Grupy Inwestycyjnej Kwadrat: wyceny, oferty sprzedaży, foldery nieruchomości komercyjnych, raporty dla właściciela i one pagery. Jeden zestaw klocków, pięć kolejności treści. Format A4, PDF.

**Zasada nadrzędna: czytelność ponad efektowność.** Klient otwiera PDF i w trzy sekundy wie, gdzie patrzeć.

Pełny opis z przykładami na prawdziwych materiałach: PDF w grupie zasobów *Dokumenty* (Kwadrat_Document_System.pdf, 18 stron, ostatnia strona to Style Guide do wydruku).

## Marka w dokumentach

- W materiałach dla klientów zawsze **Grupa Inwestycyjna Kwadrat**. Oddział (Żoliborz) nie jest marką i nie pojawia się w nagłówkach.
- Stopka: Idzi Kisza · Grupa Inwestycyjna Kwadrat · ul. Słowackiego 22/11a, Warszawa · tel. 600 038 758 · idzi.kisza@kwadrat.io · numer strony.
- Logo: kwadrat KWADRAT w czerwieni `kwadrat-red` na białym, 14 mm na stronie 1, 5 mm w nagłówku kolejnych stron, pole ochronne 4 mm. Nigdy na zdjęciu, nigdy na czerwonym tle w dokumencie. Wersja biała tylko na ciemnym zdjęciu albo czerwieni poza dokumentami.

## Sześć reguł

1. **Dużo bieli.** Marginesy 20 mm, najwyżej cztery bloki treści na stronie. Nie mieści się: następna strona, nie mniejszy font.
2. **Jeden akcent.** `kwadrat-red` w logo, w kwadraciku przed nagłówkiem sekcji, w jednej liczbie na stronie i w krawędzi bloku rekomendacji. Nigdy jako tło, nigdy w tabelach, nigdy dłuższy tekst.
3. **Cienkie linie zamiast ramek.** `rule-strong` 0,5 pt w `ink` pod nagłówkiem tabeli i nad kafelkiem KPI, `rule-hair` 0,25 pt w `line-soft` między wierszami. Zero obramowań, cieni, zaokrągleń (`radius-none`), gradientów, ikon.
4. **Najpierw wynik.** Strona 1 odpowiada na pytanie klienta: ile, za ile, co dalej. Dalsze strony to uzasadnienie.
5. **Zdjęcia duże, w naturalnych proporcjach.** 3:2 lub 4:3, pełna szerokość 170 mm albo dwa po 82,5 mm. Bez ramek, bez tekstu na zdjęciu.
6. **Jedna rodzina fontów.** Mulish w trzech grubościach. Hierarchię buduje rozmiar i grubość, nie kolor.

## Kolejność treści

| Dokument | Strona 1 | Dalsze strony | Zamknięcie |
|---|---|---|---|
| Wycena | lead z wynikiem, 3 KPI, rekomendacja, dane nieruchomości, metoda | porównania z kotwicą, plusy i minusy, tabela scenariuszy | następne kroki, zastrzeżenie metodologiczne |
| Oferta sprzedaży | 4 KPI z ceną, zdjęcie główne, lead o miejscu | atuty, układ i metraże, zdjęcia, lokalizacja | dla kogo, kontakt |
| Folder komercyjny | 4 KPI z ceną netto, zdjęcie z drona, lead o produkcie | parametry techniczne, zdjęcia, lokalizacja, zakres transakcji | dokumenty po NDA, kontakt |
| Raport dla właściciela | „co się wydarzyło, co dalej”, 4 KPI, rekomendacja | oś czasu działań, feedback z prezentacji | kroki i decyzja do podjęcia |
| One pager | zdjęcie, 4 KPI z ceną, 6 konkretów, dane | brak | kontakt w stopce |

## Kolory

Osiem kolorów, proporcja na stronie około 88% `paper`, 7% tekst (`ink`, `text`), 3,5% `surface` i linie, 1,5% `kwadrat-red`. Za dużo czerwonego to więcej niż: logo, znacznik sekcji, jedna liczba.

Minusy i uwagi oznaczamy szarym kwadracikiem (`line`), nie drugim kolorem. W systemie nie ma zielonego ani pomarańczowego.

## Typografia

Mulish 400 / 600 / 700. Wartości w px w tokenach to przeliczenie dla ekranu; w druku obowiązują punkty z opisu każdego stylu.

- `title` 24 pt: zawsze jedna linia. Ulica i numer („ul. Młynarska 32”) albo nazwa („Hala Ro-Ma, Nadarzyn”). Miasto i dzielnica idą do podtytułu.
- `subtitle` 11 pt: jedna linia, trzy konkrety po kropce środkowej.
- `section` 13 pt + kwadracik 2,4 mm, `subsection` 10 pt.
- `label` 7,5 pt SemiBold wersaliki, +8% światła. Jedyne miejsce na wersaliki.
- `lead` 11 pt, `body` 9,5 pt, `table` 9 pt, `small` 7,5 pt.

## Liczby i KPI

- Rząd 3 kafelków: liczby `kpi` 26 pt. Rząd 4 kafelków: 22 pt.
- Etykieta nad liczbą, uwaga pod liczbą, każda w jednej linii. Liczby w rzędzie zawsze na jednej wysokości (kafelki to subgrid).
- Jedna liczba w kafelku, nigdy w dwóch liniach. **Kwoty od miliona w kafelku: „3,1 mln zł”, „35 mln zł”**, pełna kwota w uwadze pod liczbą. Widełki też w uwadze.
- Jedna czerwona liczba na stronie: ta, na którą klient ma patrzeć (cena ofertowa, najwyższa oferta).
- Zapis: `779 000 zł`, `46,70 m²`, `16 680 zł / m²`, zakresy słowem „do” (`740 000 do 760 000 zł`), daty `26.06.2026`. Bez myślników długich.

## Tabele

Bez ramek i pionowych linii. Nagłówek: `label` + linia 0,5 pt `ink`. Wiersze 9 pt, ok. 7 mm, linie 0,25 pt `line-soft`, bez zebry. Liczby do prawej, cyfry tabelaryczne, jednostka w każdej komórce. Jedna kotwica na tabelę: tło `red-tint` i pogrubienie, z notą pod tabelą, dlaczego ten wiersz. Najwyżej 7 kolumn.

Scenariusze wyceny to też tabela (Scenariusz, Widełki, Kiedy realny), z kotwicą na scenariuszu rekomendowanym.

## Rekomendacja i wyróżnienia

- Blok rekomendacji: tło `surface`, lewa krawędź 2 pt `kwadrat-red`, etykieta „Rekomendacja” w czerwieni, zdanie 11 pt SemiBold, komentarz 9,5 pt. Jeden na dokument, na stronie 1. Tylko w wycenie i raporcie.
- Wnioski i atuty: lista z czerwonymi kwadracikami, najwyżej pięć punktów.
- Uwaga albo ryzyko: callout z lewą krawędzią 1 pt `line`, bez tła.

## Siatka i odstępy

A4, marginesy 20 / 16 / 14 mm, pole treści 170 × 267 mm, 12 kolumn po 9,6 mm, gutter 5 mm. Cztery podziały wystarczą: 12, 6+6, 4+4+4, 8+4. Odstępy z bazy 4 mm: 2 / 4 / 8 / 12 / 20 mm. Limity na stronę: 4 bloki, 3 zdjęcia, 1 rekomendacja, 1 czerwona liczba.

## Zdjęcia

3:2 lub 4:3, bez kadrowania do kwadratu. Zdjęcie z drona na okładce folderu komercyjnego, wnętrze z oknem na okładce oferty mieszkania. Kolejność: widok z zewnątrz lub z okna, część dzienna, detale. Rzut na białym tle. Brak zdjęcia: pole `surface` z napisem „Zdjęcie 3:2”, nigdy obrazek z internetu.

## Checklista przed wysyłką

- Strona 1 odpowiada na pytanie klienta bez przewijania.
- Tytuł, podtytuł, etykiety i uwagi KPI w jednej linii. Nic nie wychodzi poza margines.
- Jedna czerwona liczba na stronie, jeden blok rekomendacji.
- Zero myślników długich, wersaliki tylko w etykietach.
- Nagłówek, stopka, data i numer strony na każdej stronie.
- „Grupa Inwestycyjna Kwadrat”, nie „Kwadrat Żoliborz”.
- W wycenie zastrzeżenie: „Analiza rynkowa na potrzeby strategii sprzedaży, nie stanowi operatu szacunkowego.”

## Relacja do UNLISTED

Ten system jest dla materiałów pod marką Grupy Inwestycyjnej Kwadrat. Oferty off market pod marką UNLISTED mają osobny design system (Cormorant Garamond + Montserrat, off white) i nie mieszamy ich z tym.


---

# DataTable

Lekka tabela: porównania, scenariusze wyceny, parametry techniczne, oś czasu działań, układ i metraże.

- Bez ramek, bez pionowych linii, bez zebry. Nagłówek: etykieta `label` plus linia 0,5 pt w `ink`. Wiersze 9 pt, ok. 7 mm wysokości, linie 0,25 pt w `line-soft`.
- Liczby do prawej, cyfry tabelaryczne, jednostka w każdej komórce.
- Kotwica: jeden wiersz na tabelę z tłem `red-tint` i pogrubieniem, zawsze z notą `small` pod tabelą, dlaczego ten wiersz.
- Wiersz sumy: linia 0,5 pt w `ink` nad nim, pogrubienie, bez tła.
- Najwyżej 7 kolumn. Więcej danych: druga tabela, nie mniejszy font. Kolumna z datą albo krótką etykietą ma stałą szerokość, żeby nic się nie łamało.

Tabela danych (etykieta i wartość, dwie kolumny po 6 modułów): etykieta `muted` 34 mm, wartość `ink`. Do danych nieruchomości.


---

# Footer

Stopka na każdej stronie każdego dokumentu, 9 mm od dolnej krawędzi.

- Linia 0,5 pt w `line`, tekst 7 pt w `muted`.
- Treść: Idzi Kisza · Grupa Inwestycyjna Kwadrat · ul. Słowackiego 22/11a, Warszawa · tel. 600 038 758 · idzi.kisza@kwadrat.io · numer strony „Strona 2 / 3”.
- W wycenie druga linia: „Analiza rynkowa na potrzeby strategii sprzedaży, nie stanowi operatu szacunkowego.” plus źródło i data danych.


---

# KpiRow

Rząd 3 albo 4 kafelków z najważniejszymi liczbami, zawsze bezpośrednio pod leadem na stronie 1.

- Kafelek: linia 0,5 pt w `ink` nad nim, etykieta `label`, liczba, uwaga `small`. Bez ramek i teł.
- Rząd 3 kafelków: liczba `kpi` 26 pt. Rząd 4 kafelków: 22 pt. Wartość tekstowa (np. „Front na S8”): `kpi-mid` 18 pt.
- Etykieta, liczba i uwaga zawsze w jednej linii. Kafelki to subgrid, więc liczby w rzędzie stoją na jednej wysokości nawet przy różnych etykietach.
- Jedna liczba w kafelku. **Kwoty od miliona: „3,1 mln zł”, „35 mln zł”**, pełna kwota w uwadze. Widełki też w uwadze.
- Jedna czerwona (`kwadrat-red`) liczba na stronie: ta, na którą klient ma patrzeć.

Kiedy coś się nie mieści: skróć etykietę albo uwagę, użyj formatu „mln zł”, przejdź na 3 kafelki. Nigdy mniejszy font i nigdy wyjście poza margines.


---

# PageHeader

Nagłówek strony 1 i nagłówek biegnący kolejnych stron, identyczny we wszystkich pięciu typach dokumentów.

**Strona 1:** logo 14 mm (`logo-page1`) w lewym górnym rogu, pole ochronne 4 mm. Obok etykieta typu dokumentu (`label`), tytuł `title` 24 pt w jednej linii (ulica i numer albo nazwa, bez miasta), podtytuł `subtitle` 11 pt w jednej linii: miasto lub dzielnica plus trzy konkrety po kropce środkowej. Po prawej: Grupa Inwestycyjna Kwadrat, kto przygotował, data. Pod całością linia 0,5 pt w `ink`.

**Kolejne strony:** logo 5 mm, typ dokumentu i adres 7,5 pt w `muted`, po prawej „Grupa Inwestycyjna Kwadrat”, linia 0,25 pt w `line`. Numer strony tylko w stopce.

Nie: „Kwadrat Żoliborz” w nagłówku, tytuł w dwóch liniach, logo na zdjęciu.


---

# Recommendation

Blok rekomendacji: jedno zdanie decyzji, które klient ma zapamiętać, plus krótki komentarz.

- Tło `surface`, lewa krawędź 2 pt `kwadrat-red`, etykieta „Rekomendacja” w czerwieni, zdanie 11 pt SemiBold w `ink`, komentarz 9,5 pt.
- Jeden na dokument, zawsze na stronie 1, pod rzędem KPI. Tylko w wycenie i raporcie dla właściciela. W ofercie i folderze zamiast niego „Dla kogo” albo „Zakres transakcji” jako callout.
- Wnioski i atuty: lista z czerwonymi kwadracikami 1,8 mm, najwyżej pięć punktów. Minusy i uwagi: kwadraciki `line`.
- Uwaga albo ryzyko: callout z lewą krawędzią 1 pt `line`, bez tła.


## Tokeny (tokens.json)

```json
{
  "name": "Kwadrat Documents",
  "version": 1,
  "color": {
    "themes": [
      {
        "id": "print",
        "name": "Druk i PDF"
      }
    ],
    "tokens": [
      {
        "name": "kwadrat-red",
        "value": "#e30613",
        "usage": "Czerwony Kwadratu (CMYK 0/100/100/0). Logo, kwadracik przed nagłówkiem sekcji, jedna kluczowa liczba na stronie, krawędź 2 pt bloku rekomendacji, kwadraciki w liście atutów. Nigdy jako tło, nigdy jako kolor dłuższego tekstu, nigdy w tabelach."
      },
      {
        "name": "red-tint",
        "value": "#fdedee",
        "usage": "Tło wyróżnionego wiersza tabeli (kotwica). Jedna kotwica na tabelę. Nigdy jako kolor tekstu, nigdy na dużych polach."
      },
      {
        "name": "ink",
        "value": "#1a1a1a",
        "usage": "Czerń: tytuły, nagłówki sekcji, duże liczby, pogrubienia w tekście, linia 0,5 pt pod nagłówkiem strony 1 i pod nagłówkiem tabeli."
      },
      {
        "name": "text",
        "value": "#333333",
        "usage": "Grafit: tekst podstawowy 9,5 pt, treść tabel, listy."
      },
      {
        "name": "muted",
        "value": "#6f6f6f",
        "usage": "Szary: etykiety wersalikami, podtytuły, podpisy zdjęć, stopka, uwagi pod liczbami, lewa kolumna tabel danych."
      },
      {
        "name": "line",
        "value": "#d9d9d9",
        "usage": "Linie 0,5 pt: stopka, nagłówek kolejnych stron, krawędź callouta. Cienkie linie zamiast ramek."
      },
      {
        "name": "line-soft",
        "value": "#ececec",
        "usage": "Linie 0,25 pt między wierszami tabel i w tabelach danych."
      },
      {
        "name": "surface",
        "value": "#f5f5f5",
        "usage": "Jedyne szare tło w systemie: blok rekomendacji i placeholder zdjęcia. Nie dla tabel, nie dla nagłówków, nie dla całych stron."
      },
      {
        "name": "paper",
        "value": "#ffffff",
        "usage": "Tło każdej strony. Około 90% powierzchni dokumentu. Biel jest elementem systemu, nie pustką."
      }
    ]
  },
  "type": {
    "fonts": [
      {
        "family": "Mulish",
        "file": "fonts/Mulish-400.woff2",
        "weight": "400",
        "style": "normal"
      },
      {
        "family": "Mulish",
        "file": "fonts/Mulish-600.woff2",
        "weight": "600",
        "style": "normal"
      },
      {
        "family": "Mulish",
        "file": "fonts/Mulish-700.woff2",
        "weight": "700",
        "style": "normal"
      }
    ],
    "families": {
      "sans": "\"Mulish\", \"Helvetica Neue\", Arial, sans-serif"
    },
    "groups": [
      {
        "name": "Nagłówki",
        "family": "sans",
        "styles": [
          {
            "name": "title",
            "fontSize": "32px",
            "lineHeight": "36px",
            "fontWeight": 700,
            "letterSpacing": "-0.01em",
            "sample": "ul. Młynarska 32, Warszawa",
            "usage": "24pt / 27pt w druku. Tytuł dokumentu na stronie 1: adres albo nazwa nieruchomości. Czerń."
          },
          {
            "name": "subtitle",
            "fontSize": "14.7px",
            "lineHeight": "20px",
            "fontWeight": 400,
            "sample": "Wola, Młynów · 46,70 m² · 3 pokoje",
            "usage": "11pt / 15pt w druku. Podtytuł pod tytułem: trzy konkrety rozdzielone kropką środkową. Szary."
          },
          {
            "name": "section",
            "fontSize": "17.3px",
            "lineHeight": "21.3px",
            "fontWeight": 700,
            "sample": "Porównania transakcyjne",
            "usage": "13pt / 16pt w druku. Nagłówek sekcji, zawsze z czerwonym kwadracikiem 2,4 mm przed tekstem. 10 mm odstępu przed, 3 mm po."
          },
          {
            "name": "subsection",
            "fontSize": "13.3px",
            "lineHeight": "17.3px",
            "fontWeight": 700,
            "sample": "Podnosi wartość",
            "usage": "10pt / 13pt w druku. Śródtytuł wewnątrz sekcji, bez kwadracika. Czerń."
          },
          {
            "name": "label",
            "fontSize": "10px",
            "lineHeight": "13.3px",
            "fontWeight": 600,
            "letterSpacing": "0.08em",
            "sample": "CENA OFERTOWA",
            "usage": "7.5pt / 10pt w druku. Etykieta wersalikami: nad liczbą KPI, nagłówek tabeli, typ dokumentu w nagłówku strony. Jedyne miejsce na wersaliki. Szary (czerwony tylko w etykiecie „Rekomendacja”)."
          }
        ]
      },
      {
        "name": "Tekst",
        "family": "sans",
        "styles": [
          {
            "name": "lead",
            "fontSize": "14.7px",
            "lineHeight": "21.3px",
            "fontWeight": 400,
            "sample": "Wartość mieszkania mieści się dziś w przedziale 740 000 zł do 760 000 zł.",
            "usage": "11pt / 16pt w druku. Lead pod nagłówkiem strony 1: trzy zdania, pierwsze z wynikiem. Czerń, kluczowa liczba pogrubiona."
          },
          {
            "name": "body",
            "fontSize": "12.7px",
            "lineHeight": "19.3px",
            "fontWeight": 400,
            "sample": "Podstawą są ceny z aktów notarialnych z najbliższego sąsiedztwa.",
            "usage": "9.5pt / 14.5pt w druku. Tekst podstawowy i listy. Grafit. Szerokość wiersza do 170 mm, w dwóch kolumnach po 82,5 mm."
          },
          {
            "name": "table",
            "fontSize": "12px",
            "lineHeight": "16px",
            "fontWeight": 400,
            "sample": "Młynarska 30 · 46,6 m² · 750 000 zł",
            "usage": "9pt / 12pt w druku. Treść tabel i tabel danych. Liczby do prawej, cyfry tabelaryczne."
          },
          {
            "name": "small",
            "fontSize": "10px",
            "lineHeight": "14.7px",
            "fontWeight": 400,
            "sample": "Analiza rynkowa na potrzeby strategii sprzedaży, nie stanowi operatu szacunkowego.",
            "usage": "7.5pt / 11pt w druku. Podpisy zdjęć, uwagi pod tabelą, zastrzeżenia. Szary. Stopka: 7 pt."
          }
        ]
      },
      {
        "name": "Liczby",
        "family": "sans",
        "styles": [
          {
            "name": "kpi",
            "fontSize": "34.7px",
            "lineHeight": "37.3px",
            "fontWeight": 700,
            "letterSpacing": "-0.02em",
            "sample": "779 000 zł",
            "usage": "26pt / 28pt w druku. Liczba w kafelku KPI. Czerń, albo czerwony dla jednej liczby na stronie. Jedna liczba w kafelku, widełki idą do uwagi pod nią."
          },
          {
            "name": "hero",
            "fontSize": "48px",
            "lineHeight": "50.7px",
            "fontWeight": 700,
            "letterSpacing": "-0.02em",
            "sample": "3 100 000 zł",
            "usage": "36pt / 38pt w druku. Tylko w trzech miejscach: cena na okładce oferty, cena na one pagerze, wynik na stronie 1 raportu."
          },
          {
            "name": "kpi-mid",
            "fontSize": "24px",
            "lineHeight": "29.3px",
            "fontWeight": 700,
            "letterSpacing": "-0.01em",
            "sample": "Front na S8",
            "usage": "18pt / 22pt w druku. Wariant kafelka KPI dla wartości tekstowych albo dłuższych (lokalizacja, status)."
          },
          {
            "name": "num2",
            "fontSize": "21.3px",
            "lineHeight": "26.7px",
            "fontWeight": 700,
            "sample": "16 680 zł / m²",
            "usage": "16pt / 20pt w druku. Liczba druga: cena za metr i wartości pomocnicze w tekście."
          }
        ]
      }
    ]
  },
  "spacing": {
    "note": "Baza 4 mm. Dokumenty A4: marginesy 20 mm na bokach, 16 mm góra, 14 mm dół; pole treści 170 × 267 mm; 12 kolumn po 9,6 mm z gutterem 5 mm.",
    "tokens": [
      {
        "name": "space-xs",
        "value": "8px",
        "usage": "2 mm w druku. Etykieta do wartości, podpis do zdjęcia, kwadracik do nagłówka."
      },
      {
        "name": "space-s",
        "value": "15px",
        "usage": "4 mm w druku. Między akapitami, nagłówek sekcji do treści, uwaga pod kotwicą tabeli."
      },
      {
        "name": "space-m",
        "value": "30px",
        "usage": "8 mm w druku. Między blokami: rząd KPI, tabela, zdjęcie, blok rekomendacji."
      },
      {
        "name": "space-l",
        "value": "45px",
        "usage": "12 mm w druku. Między sekcjami: 10 mm przed nagłówkiem sekcji, 3 mm po nim."
      },
      {
        "name": "space-xl",
        "value": "76px",
        "usage": "20 mm w druku. Oddech przed blokiem końcowym na okładce i one pagerze."
      },
      {
        "name": "margin-side",
        "value": "76px",
        "usage": "20 mm w druku. Lewy i prawy margines strony A4."
      },
      {
        "name": "margin-top",
        "value": "60px",
        "usage": "16 mm w druku. Górny margines strony A4. Nagłówek strony 1 zajmuje pierwsze 22 mm pola treści."
      },
      {
        "name": "margin-bottom",
        "value": "53px",
        "usage": "14 mm w druku. Dolny margines; stopka stoi 9 mm od krawędzi."
      },
      {
        "name": "gutter",
        "value": "19px",
        "usage": "5 mm w druku. Odstęp między 12 kolumnami siatki i między dwoma zdjęciami obok siebie."
      },
      {
        "name": "column",
        "value": "36px",
        "usage": "9,6 mm w druku. Szerokość jednej z 12 kolumn. Podziały, które wystarczą: 12, 6+6, 4+4+4, 8+4."
      }
    ]
  },
  "radius": {
    "note": "System nie zaokrągla niczego. Jeden token, żeby reguła była zapisana.",
    "tokens": [
      {
        "name": "radius-none",
        "value": "0px",
        "usage": "Zdjęcia, bloki, kafelki, tabele: wszystko ma proste rogi. Bez zaokrągleń, bez cieni, bez gradientów."
      }
    ]
  },
  "stroke": {
    "note": "Cienkie linie zamiast ramek.",
    "tokens": [
      {
        "name": "rule-strong",
        "value": "0.5pt",
        "usage": "Linia w czerni: pod nagłówkiem strony 1, pod nagłówkiem tabeli, nad kafelkiem KPI, nad wierszem sumy."
      },
      {
        "name": "rule-light",
        "value": "0.5pt",
        "usage": "Linia w kolorze line: stopka, podziały."
      },
      {
        "name": "rule-hair",
        "value": "0.25pt",
        "usage": "Linia w kolorze line-soft: między wierszami tabel, nagłówek kolejnych stron."
      },
      {
        "name": "rule-accent",
        "value": "2pt",
        "usage": "Czerwona lewa krawędź bloku rekomendacji. Jedyna gruba linia w systemie."
      },
      {
        "name": "marker-section",
        "value": "2.4mm",
        "usage": "Bok czerwonego kwadracika przed nagłówkiem sekcji."
      },
      {
        "name": "marker-list",
        "value": "1.8mm",
        "usage": "Bok kwadracika w listach: czerwony dla atutów i plusów, line dla minusów i uwag."
      },
      {
        "name": "logo-page1",
        "value": "14mm",
        "usage": "Logo w nagłówku strony 1, pole ochronne 4 mm."
      },
      {
        "name": "logo-running",
        "value": "5mm",
        "usage": "Logo w nagłówku kolejnych stron."
      }
    ]
  }
}```
