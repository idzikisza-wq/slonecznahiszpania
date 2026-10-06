// Całe copy strony w jednym miejscu. To jest aktualne, zatwierdzone copy.
// Źródło: nowa wersja www.slonecznahiszpania.pl, wyrenderowana 3.10.2026, przeniesiona 1:1
// z poprawkami Idziego (bez długich myślników, pisownia Málaga jak na live od 5.10.2026, poprawki DANE).
// docs/copy.md zostaje jako zapis stanu najstarszej wersji strony.
// Etykiety zapisujemy zdaniowo: wersaliki robi CSS (klasa .label).
// Twarde spacje (przed „·", po jednoliterowych spójnikach, w liczbach)
// dokłada automatycznie funkcja typo() na końcu pliku. Pisz zwykłe spacje.
// Bez pauz i półpauz: pilnuje tego npm run lint:kwadrat.

import { typo } from './typo';

// Przykładowe nieruchomości: oferty i ceny potwierdził Idzi (3.10.2026), sekcja jest widoczna.
// Gdy false, sekcja i pozycja „Oferty" w menu znikają ze strony.
export const SHOW_OFFERS = true;

// Zdjęcie poglądowe (DANE): podpis pod zdjęciem w hero. Pusty tekst ukrywa podpis.
export const PHOTO_NOTE = 'Zdjęcie poglądowe';

// Zdjęcia ofert to wizualizacje dewelopera (Idzi, 3.10.2026): podpis pod każdym zdjęciem oferty.
// Pusty tekst ukrywa podpis, np. po podmianie na zdjęcia nieruchomości.
export const OFFER_PHOTO_NOTE = 'Wizualizacja';

// Jedyny telefon na całej stronie (nagłówek, Konsultacja, stopka, schema.org): numer z nowej strony,
// potwierdzony przez Idziego 3.10 i 5.10.2026.
export const CONTACT_PHONE = '+48 505 085 001';

const CONTACT = {
  phone: CONTACT_PHONE,
  phoneHref: `tel:${CONTACT_PHONE.replace(/[^\d+]/g, '')}`,
  // Na ten adres trafiają zgłoszenia z formularzy (klucz Web3Forms); jest też w danych strukturalnych
  email: 'biuro@kwadrat.io',
};

// Marka w treści: Kwadrat Nieruchomości, jak na live (decyzja Idziego 5.10.2026).
// Pełna nazwa spółki tylko w danych spółki: stopka, polityka prywatności, schema.org (legalName).
// Dane spółki jak w stopce live slonecznahiszpania.pl, w zapisie systemowym.
const COMPANY = {
  brand: 'Kwadrat Nieruchomości',
  tagline: 'Hiszpania · Costa del Sol · Costa Blanca',
  legalName: 'Grupa Inwestycyjna Kwadrat Sp. z o.o.',
  street: 'ul. Samorządowa 9/1',
  postalCode: '05-400',
  city: 'Otwock',
  nip: '5322092950',
  regon: '388901030',
  krs: '0000896911',
  // Twarde spacje: „m.st. Warszawy” i „XIV Wydział” nie rozdzielają się przy łamaniu
  court: 'Sąd Rejonowy dla m.st.\u00a0Warszawy w Warszawie, XIV\u00a0Wydział Gospodarczy KRS',
  capital: '50 000 zł',
  website: 'https://www.kwadrat.io/',
  websiteLabel: 'www.kwadrat.io',
};

// Social media w stopce: linki tekstowe, bez ikon. TikTok bezpośrednio, nie przez przekierowanie Google.
export const SOCIAL = [
  { label: 'Facebook', href: 'https://www.facebook.com/kwadratotwock/' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCgaHalw9yhbhTqfaa1B1YCg' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@kwadratnieruchomosci' },
];

// Ocena Google (pasek KPI pod hero i sekcja Opinie): wartość i liczba opinii z nowej strony,
// nazwa wizytówki i data odczytu od Idziego (3.10.2026). Nie wpisywać z głowy.
// Jeśli którekolwiek z pięciu pól (razem z linkiem) jest puste, kafelki z oceną się nie renderują.
// DO POTWIERDZENIA: link prowadzi do wyszukiwania w Mapach Google; najlepiej podać link do wizytówki.
export const GOOGLE_RATING = '4,9';
export const GOOGLE_REVIEWS = '120';
export const GOOGLE_PROFILE_NAME = 'Kwadrat Otwock';
export const GOOGLE_READ_DATE = '01.10.2026';
// Wizytówka „Oddział Otwock” z linku w stopce kwadrat.io (prośba Idziego 6.10.2026: link wprost do wizytówki)
export const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/HnGgjbUpEfx6YWoT6';
// Google Analytics 4 (decyzja Idziego 6.10.2026): identyfikator pomiaru G-XXXX w zmiennej
// PUBLIC_GA_ID (jak klucz formularzy, nigdy w repo). Bez niego strona nie ładuje Google Analytics
// ani baneru zgody. Z nim baner pyta o zgodę, a Google Analytics ładuje się dopiero po „Akceptuję”.
const GA_RAW = String(import.meta.env.PUBLIC_GA_ID ?? '').trim();
export const GA_ID = /^G-[A-Z0-9]{4,20}$/.test(GA_RAW) ? GA_RAW : '';

export const HAS_GOOGLE_RATING = [GOOGLE_RATING, GOOGLE_REVIEWS, GOOGLE_PROFILE_NAME, GOOGLE_READ_DATE, GOOGLE_REVIEWS_URL].every(
  (field) => field.trim() !== '',
);

// Zdjęcia: źródła w zdjecia/, warianty w public/img/{name}-{szerokość}.webp i .jpg
// (generuje npm run zdjecia). ratio to naturalne proporcje pliku, bez kadrowania.
// Brak plików = szare pole z podpisem.
// Źródło zdjęć w hero i w ofertach: deweloper (potwierdził Idzi 3.10.2026).
// Hero: dwa zdjęcia, po jednym przy każdym kierunku (decyzja Idziego 5.10.2026, jak na live).
// Alty jak na live. Podpis „Zdjęcie poglądowe” (PHOTO_NOTE) zostaje.
const IMAGES = {
  heroSol: {
    name: 'hero-costa-del-sol',
    ratio: [1200, 912],
    alt: 'Taras apartamentu z widokiem na wybrzeże Costa del Sol',
    placeholder: 'Zdjęcie 4:3',
  },
  heroBlanca: {
    name: 'hero-costa-blanca',
    ratio: [1200, 912],
    alt: 'Taras apartamentu z widokiem na Alicante i Costa Blanca',
    placeholder: 'Zdjęcie 4:3',
  },
  // Piotr i Ania (zdjęcie od Idziego), w Kontakcie pod telefonem. Prawdziwe zdjęcie zespołu,
  // nie poglądowe, więc bez podpisu. Źródło ma 720 px szerokości: do podmiany na oryginał.
  contact: {
    name: 'kontakt',
    ratio: [4, 3],
    alt: 'Piotr i Ania na deptaku w centrum Málagi',
    placeholder: 'Zdjęcie 4:3',
  },
  guideCover: {
    name: 'poradnik-cover',
    ratio: [1354, 1920],
    alt: 'Okładka bezpłatnego poradnika o inwestowaniu w nieruchomości w Hiszpanii',
    placeholder: 'Okładka poradnika',
  },
  offerMalaga: {
    name: 'oferta-malaga',
    ratio: [1008, 752],
    alt: 'Apartament z tarasem, Málaga Centro',
    placeholder: 'Zdjęcie 4:3',
  },
  offerMijas: {
    name: 'oferta-mijas',
    ratio: [1008, 752],
    alt: 'Willa pośród wzgórz, Mijas',
    placeholder: 'Zdjęcie 4:3',
  },
  offerMarbella: {
    name: 'oferta-marbella',
    ratio: [1008, 752],
    alt: 'Penthouse z panoramą, Marbella',
    placeholder: 'Zdjęcie 4:3',
  },
};

const raw = {
  contact: CONTACT,
  company: COMPANY,

  meta: {
    title: 'Kwadrat Nieruchomości | Costa del Sol i Costa Blanca',
    description:
      'Porównaj Costa del Sol, Costa Blanca i inne regiony Hiszpanii. Polska obsługa zakupu nieruchomości od wyboru lokalizacji po odbiór kluczy.',
    ogTitle: 'Kwadrat Nieruchomości | Hiszpania',
    ogDescription:
      'Costa del Sol czy Costa Blanca? Pomagamy wybrać region dopasowany do Twojego celu, budżetu i stylu życia.',
    // og:image: zdjęcie hero Costa del Sol w wariancie 1200 px (decyzja Idziego 5.10.2026)
    ogImage: '/img/hero-costa-del-sol-1200.jpg',
    ogImageSize: [1200, 912],
    ogImageAlt: 'Taras apartamentu z widokiem na wybrzeże Costa del Sol',
    author: 'Kwadrat Nieruchomości',
  },

  header: {
    logoAlt: 'Kwadrat Nieruchomości',
    tagline: COMPANY.tagline,
    menu: 'Menu',
    // Nazwa linku telefonu dla czytników ekranu; na ekranie sam piktogram słuchawki
    // (decyzja Idziego 5.10.2026: piktogram zamiast słowa „Zadzwoń”, numer na górze się nie wyświetla)
    phoneLabel: 'Zadzwoń',
    navLabel: 'Nawigacja główna',
    skipLink: 'Przejdź do treści',
    nav: [
      { label: 'Porównanie', href: '/#porownanie' },
      { label: 'Regiony', href: '/#regiony' },
      { label: 'Proces', href: '/#proces' },
      { label: 'Oferty', href: '/#oferty' },
      { label: 'Poradnik', href: '/#poradnik' },
      { label: 'Opinie', href: '/#opinie' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },

  hero: {
    label: 'Przewodnik po hiszpańskim rynku',
    // H1 w dwóch grubościach (web-display): początek 400, puenta z obietnicą 700. Słowa bez zmian.
    title: { start: 'Dwa wybrzeża.', end: 'Dwie dobre odpowiedzi.' },
    lead: 'Nie sprzedajemy jednego regionu za wszelką cenę. Porównujemy Costa del Sol, Costa Blanca i inne części Hiszpanii, żeby znaleźć miejsce właściwe dla Twojego celu.',
    ctaPrimary: { label: 'Porównajmy Twój wybór', href: '#kontakt' },
    ctaSecondary: { label: 'Pobierz poradnik', href: '#poradnik' },
    note: 'Bez rankingu na siłę. Najlepszy region zależy od celu, budżetu i sposobu użytkowania.',
    directions: [
      {
        label: 'Kierunek 01',
        title: 'Costa del Sol',
        image: IMAGES.heroSol,
        text: 'Málaga, Marbella i spokojniejsza Axarquía. Dla osób, które cenią całoroczną infrastrukturę, zróżnicowany popyt i szeroki wybór lokalizacji.',
        link: { label: 'Zobacz mocne strony i kompromisy', href: '#porownanie' },
      },
      {
        label: 'Kierunek 02',
        title: 'Costa Blanca',
        image: IMAGES.heroBlanca,
        text: 'Alicante i różnorodne miejscowości nad białym wybrzeżem. Dla osób szukających szerokiej podaży, plażowego stylu życia i elastycznego budżetu.',
        link: { label: 'Zobacz mocne strony i kompromisy', href: '#porownanie' },
      },
    ],
  },

  // Pasek KPI pod hero (WebStats). Kafelek 1: ocena Google z konfiguracji GOOGLE_*.
  // Pozostałe: wartości tekstowe wyłącznie z usług i regionów opisanych niżej na stronie
  // (Regiony, Obsługa 360°, opis strony). Bez nowych obietnic i bez liczby oddziałów.
  stats: {
    rating: { label: 'Ocena Google', scale: '/ 5', reviews: 'opinii' },
    items: [
      { label: 'Regiony', value: 'Costa del Sol', note: 'i Costa Blanca' },
      { label: 'Obsługa', value: 'Po polsku', note: 'od wyboru lokalizacji po odbiór kluczy' },
      { label: 'Weryfikacja', value: 'Dokumenty', note: 'z prawnikiem i notariuszem' },
    ],
  },

  comparison: {
    label: 'Costa del Sol czy Costa Blanca?',
    title: 'Porównanie bez zwycięzcy z góry',
    lead: 'Te same kryteria, różne odpowiedzi. Ostateczny wybór robimy na poziomie miasta, osiedla i konkretnej nieruchomości.',
    head: ['Kryterium', 'Costa del Sol', 'Costa Blanca'],
    rows: [
      {
        key: 'Charakter',
        values: [
          'Kosmopolityczne miasta, kurorty premium i andaluzyjskie miejscowości',
          'Duże miasta, popularne kurorty i rozbudowane osiedla mieszkaniowe',
        ],
      },
      {
        key: 'Budżet',
        values: [
          'Duża rozpiętość; prestiżowe adresy wyraźnie podnoszą próg wejścia',
          'Szeroka podaż pozwala łatwiej dopasować lokalizację do budżetu',
        ],
      },
      {
        key: 'Życie poza sezonem',
        values: [
          'Silne szczególnie w Máladze i większych ośrodkach',
          'Dobre w Alicante i większych miastach; kurorty trzeba oceniać osobno',
        ],
      },
      {
        key: 'Dostępność',
        values: [
          'Lotnisko Málaga i rozwinięta komunikacja wzdłuż wybrzeża',
          'Lotnisko Alicante i wygodny dostęp do wielu nadmorskich miejscowości',
        ],
      },
      {
        key: 'Dla kogo',
        values: [
          'Dla szukających zróżnicowanego rynku i mocnej infrastruktury',
          'Dla szukających wyboru, plażowego stylu życia i elastyczności cenowej',
        ],
        anchor: true,
      },
    ],
    note: 'Warunki zakupu, najmu i podaży różnią się między gminami. Każdą decyzję poprzedzamy aktualną weryfikacją.',
  },

  regions: {
    label: 'Szersza perspektywa',
    title: 'Hiszpania nie kończy się na dwóch wybrzeżach',
    lead: 'Costa del Sol i Costa Blanca to nasze główne punkty odniesienia, ale czasem lepsza odpowiedź leży gdzie indziej.',
    items: [
      {
        label: '01',
        places: 'Málaga, Marbella, Mijas, Nerja',
        title: 'Costa del Sol',
        text: 'Duży, zróżnicowany rynek, mocna infrastruktura i całoroczne życie. Ceny w najbardziej znanych lokalizacjach są wyższe.',
      },
      {
        label: '02',
        places: 'Alicante, Torrevieja, Benidorm, Dénia',
        title: 'Costa Blanca',
        text: 'Szeroki wybór mieszkań, rozbudowane osiedla i łatwy dostęp do plaż. Warto uważnie porównywać gminy i sezonowość.',
      },
      {
        label: '03',
        places: 'Murcja, Cartagena, Mar Menor',
        title: 'Costa Cálida',
        text: 'Spokojniejsza alternatywa z niższym progiem wejścia. Rynek jest mniejszy, a wybór połączeń i usług bardziej lokalny.',
      },
      {
        label: '04',
        places: 'Cádiz, Tarifa, Huelva',
        title: 'Costa de la Luz',
        text: 'Atlantycki charakter, przestrzeń i autentyczność. Inny klimat oraz słabsza dostępność lotnicza z Polski.',
      },
      {
        label: '05',
        places: 'Girona, Begur, Roses',
        title: 'Costa Brava',
        text: 'Bliskość Barcelony i Francji, skaliste zatoki i dojrzały rynek. Krótszy sezon plażowy i zwykle wyższe ceny.',
      },
      {
        label: '06',
        places: 'Majorka, Teneryfa, Gran Canaria',
        title: 'Wyspy',
        text: 'Silna turystyka i wyjątkowy styl życia. Logistyka, regulacje najmu i koszty wymagają osobnej analizy.',
      },
    ],
  },

  guide: {
    label: 'Bezpłatny poradnik',
    title: 'Kupno nieruchomości w Hiszpanii: krok po kroku',
    text: 'Praktyczny materiał dla polskiego kupującego: formalności, koszty, ryzyka i pytania, które warto zadać przed wyborem regionu.',
    list: [
      'Koszty zakupu krok po kroku: podatki, notariusz, rejestr',
      'NIE, rachunek bankowy i pełnomocnictwa bez niespodzianek',
      'Jak ocenić lokalizację pod wynajem i własne pobyty',
      'Najczęstsze ryzyka i jak je sprawdzić przed zakupem',
    ],
    note: 'PDF · dostęp po zapisie',
    image: IMAGES.guideCover,
    form: {
      firstName: 'Imię',
      firstNamePlaceholder: 'Jan',
      lastName: 'Nazwisko',
      lastNamePlaceholder: 'Kowalski',
      email: 'E-mail',
      emailPlaceholder: 'jan@adres.pl',
      submit: 'Pobierz bezpłatny poradnik',
      // Treść zgody potwierdzona (Idzi, 3.10.2026).
      consent: 'Zapisując się, zgadzasz się na kontakt w sprawie zapytania. Nie wysyłamy newsletterów.',
      success: 'Dziękujemy. Poradnik jest gotowy do pobrania.',
      download: 'Pobierz poradnik (PDF)',
      pdf: '/poradnik.pdf',
      subject: 'Poradnik: nowy zapis ze strony slonecznahiszpania.pl',
    },
  },

  purpose: {
    label: 'Najpierw cel',
    title: 'Po co kupujesz w Hiszpanii?',
    lead: 'Nie zaczynamy od katalogu ani od mapy. Zaczynamy od Twojego planu.',
    items: [
      {
        label: '01',
        title: 'Inwestycja pod wynajem',
        text: 'Porównujemy popyt, sezonowość, regulacje i koszty w konkretnych miejscowościach, nie tylko rozpoznawalność regionu.',
        link: { label: 'Porozmawiajmy', href: '#kontakt' },
      },
      {
        label: '02',
        title: 'Dom na wypoczynek',
        text: 'Dobieramy wybrzeże do rytmu Twoich pobytów, połączeń lotniczych, plaż, usług i otoczenia, w którym naprawdę odpoczniesz.',
        link: { label: 'Porozmawiajmy', href: '#kontakt' },
      },
      {
        label: '03',
        title: 'Mieszkanie na stałe',
        text: 'Sprawdzamy codzienną infrastrukturę, opiekę zdrowotną, dojazdy i życie poza sezonem, zanim przejdziemy do ofert.',
        link: { label: 'Porozmawiajmy', href: '#kontakt' },
      },
    ],
  },

  whySpain: {
    label: 'Perspektywa polskiego inwestora',
    title: 'Dlaczego Hiszpania i na co uważać',
    lead: 'Dywersyfikacja nie zwalnia z oceny ryzyka. Pokazujemy obie strony decyzji.',
    items: [
      {
        title: 'Majątek w euro, poza polskim rynkiem',
        text: 'Nieruchomość w strefie euro i w UE może ograniczyć koncentrację całego majątku w jednym kraju i jednej walucie.',
      },
      {
        title: 'Położenie na zachodzie Europy',
        text: 'Hiszpania leży daleko od wschodniej flanki NATO i UE, co część polskich kupujących uwzględnia w planie dywersyfikacji.',
      },
      {
        title: 'Wiele źródeł popytu',
        text: 'Turystyka, stali mieszkańcy, studenci, emeryci i pracujący zdalnie tworzą różne grupy najemców: ich udział zależy od lokalizacji.',
      },
    ],
    risks: {
      title: 'Ryzyka nazywamy wprost',
      text: 'Kurs EUR/PLN, ograniczenia najmu, susza i dostęp do wody, lokalna podaż oraz sezonowość sprawdzamy dla konkretnej gminy, zarówno na Costa del Sol, jak i Costa Blanca.',
    },
  },

  locations: {
    label: 'Dwa obszary poszukiwań',
    title: 'Od Málagi po Alicante',
    lead: 'Na start porównujemy miejscowości reprezentujące różne budżety i style życia.',
    groups: [
      {
        label: 'Costa del Sol i Axarquía',
        rows: [
          { key: 'Málaga', value: 'Miasto działające przez cały rok.' },
          { key: 'Torre del Mar', value: 'Promenada i codzienna infrastruktura.' },
          { key: 'Caleta de Vélez', value: 'Marina i kameralna zabudowa.' },
          { key: 'Nerja', value: 'Zatoki i dojrzały rynek turystyczny.' },
        ],
      },
      {
        label: 'Costa Blanca',
        rows: [
          { key: 'Alicante', value: 'Duże miasto, lotnisko i całoroczne usługi.' },
          { key: 'Torrevieja', value: 'Szeroka podaż i międzynarodowa społeczność.' },
          { key: 'Benidorm', value: 'Intensywny rynek turystyczny i miejski charakter.' },
          { key: 'Dénia', value: 'Port, gastronomia i spokojniejszy rytm północy.' },
        ],
      },
    ],
  },

  process: {
    label: 'Jasny proces',
    title: 'Od porównania do kluczy',
    lead: 'Każdy etap ma jasny cel i następny krok.',
    // Etykieta kroku w web-label: „Krok 01” do „Krok 04” (WebSteps)
    stepLabel: 'Krok',
    steps: [
      {
        title: 'Rozmowa i kryteria',
        text: 'Ustalamy cel, budżet, horyzont i to, jak chcesz korzystać z nieruchomości.',
      },
      {
        title: 'Porównanie regionów',
        text: 'Zestawiamy Costa del Sol, Costa Blanca i rozsądne alternatywy pod Twoje kryteria.',
      },
      {
        title: 'Oferty i weryfikacja',
        text: 'Organizujemy wizyty oraz sprawdzamy dokumenty, koszty i stan prawny.',
      },
      {
        title: 'Umowa i klucze',
        text: 'Koordynujemy notariusza, płatności i przekazanie nieruchomości.',
      },
    ],
  },

  // Sekcja za przełącznikiem SHOW_OFFERS. Oferty i ceny potwierdził Idzi (3.10.2026).
  // Oferta: miejsce, tytuł, parametry, cena z oferty i opcjonalny link w polu href.
  offers: {
    label: 'Przykładowe nieruchomości',
    title: 'Przykłady z Costa del Sol',
    note: 'Pokazane ceny są orientacyjne. Oferty z Costa Blanca dobieramy po poznaniu kryteriów: nie publikujemy fikcyjnych przykładów.',
    items: [
      {
        location: 'Málaga Centro',
        title: 'Apartament z tarasem',
        details: ['2 sypialnie', '78 m²', 'widok na miasto'],
        price: '389 000 €',
        image: IMAGES.offerMalaga,
        href: undefined as string | undefined,
      },
      {
        location: 'Mijas',
        title: 'Willa pośród wzgórz',
        details: ['3 sypialnie', '164 m²', 'prywatny basen'],
        price: '695 000 €',
        image: IMAGES.offerMijas,
        href: undefined as string | undefined,
      },
      {
        location: 'Marbella',
        title: 'Penthouse z panoramą',
        details: ['3 sypialnie', '112 m²', 'duży taras'],
        price: '825 000 €',
        image: IMAGES.offerMarbella,
        href: undefined as string | undefined,
      },
    ],
  },

  service: {
    label: 'Obsługa 360°',
    title: 'Region wybierasz świadomie. Formalności prowadzimy my.',
    text: 'Przed decyzją otrzymujesz obraz stanu prawnego, harmonogramu i wszystkich kosztów. Dokumenty omawiamy po polsku.',
    // Sześć punktów jak na live (decyzja Idziego 5.10.2026), w dwóch listach po trzy
    lists: [
      ['Wyszukanie i selekcja ofert', 'Weryfikacja dokumentów i obciążeń', 'Koordynacja prawnika i notariusza'],
      ['NIE, rachunek i pełnomocnictwa', 'Wsparcie w finansowaniu', 'Odbiór i opieka po zakupie'],
    ],
  },

  reviews: {
    label: 'Opinie klientów',
    title: 'Zaufanie potwierdzone w Google',
    text: 'Standard pracy Kwadrat Nieruchomości potwierdzają klienci obsługiwani w Polsce.',
    // Wartości oceny w konfiguracji GOOGLE_* na górze pliku
    rating: {
      label: 'Ocena Google',
      scale: '/ 5',
      note: 'opinii w wizytówce Google',
      readPrefix: 'stan na',
    },
    // Cudzysłowy „ ” dokłada szablon. Wykrzyknik w opinii 1 zostaje: to cytat klienta.
    quotes: [
      {
        text: 'Chciałabym wyrazić szczerą wdzięczność pani Marzenie za wysoki profesjonalizm, odpowiedzialność i troskliwe podejście do klienta. Na każdym etapie transakcji czułam jej pełne zaangażowanie, kompetencję i chęć pomocy. Gorąco polecam!',
        author: 'Anna Nik',
        meta: '3 miesiące temu · opinia Google',
      },
      {
        text: 'Polecam współpracę: usługi na wysokim poziomie. Pracowałem z panem Arturem Szparagą i jestem bardzo zadowolony.',
        author: 'Kanan Mammadov',
        meta: '4 lata temu · opinia Google',
      },
    ],
    cta: {
      label: 'Zobacz wszystkie',
      href: GOOGLE_REVIEWS_URL,
    },
  },

  faq: {
    label: 'Najczęstsze pytania',
    title: 'Zanim zaczniesz szukać',
    items: [
      {
        // TODO: do potwierdzenia przez hiszpańskiego prawnika (prompt v2 i zasada WebFaq).
        // Idzi przekazał 3.10.2026, że prawnik odpowiedź potwierdził: do zamknięcia po jego decyzji.
        question: 'Czy Polak może kupić nieruchomość w Hiszpanii?',
        answer:
          'Tak. Obywatel Polski może kupić nieruchomość na takich samych zasadach jak obywatel Hiszpanii. Do transakcji potrzebny jest numer NIE.',
      },
      {
        question: 'Costa del Sol czy Costa Blanca: co jest lepsze?',
        answer:
          'Nie ma jednej odpowiedzi. Costa del Sol może lepiej pasować do osoby szukającej kosmopolitycznego, całorocznego rynku, a Costa Blanca do kupującego, który ceni szeroki wybór i elastyczny budżet. Porównujemy konkretne miasta i osiedla.',
      },
      {
        // TODO: odpowiedź dotyczy podatków, do potwierdzenia przez prawnika lub doradcę podatkowego
        // przed produkcją (zasada WebFaq w design systemie)
        question: 'Jakie dodatkowe koszty trzeba uwzględnić?',
        answer:
          'Poza ceną zakupu trzeba uwzględnić podatki, notariusza, wpis do rejestru i obsługę prawną. Wyliczenie zależy od regionu oraz rynku pierwotnego lub wtórnego.',
      },
      {
        question: 'Czy pomagacie także po zakupie?',
        answer:
          'Tak. Możemy koordynować przekazanie mediów, wyposażenie, ubezpieczenie oraz dalszą opiekę nad nieruchomością.',
      },
    ],
  },

  contactSection: {
    label: 'Bezpłatna konsultacja',
    title: 'Zacznijmy od Twojego planu, nie od regionu',
    text: 'Napisz, czego szukasz i jaki budżet rozważasz. Wrócimy z pytaniami, które pozwolą uczciwie porównać lokalizacje.',
    phoneLabel: 'Zadzwoń do nas',
    image: IMAGES.contact,
    form: {
      name: 'Imię i nazwisko',
      namePlaceholder: 'Jan Kowalski',
      email: 'E-mail',
      emailPlaceholder: 'jan@adres.pl',
      // „(opcjonalnie)” przy polach niewymaganych: decyzja Idziego 6.10.2026
      region: 'Rozważany region (opcjonalnie)',
      regionPlaceholder: 'Wybierz lub zostaw otwarte',
      regionOptions: ['Costa del Sol', 'Costa Blanca', 'Chcę porównać regiony', 'Inny region Hiszpanii'],
      message: 'Wiadomość (opcjonalnie)',
      messagePlaceholder: 'Budżet, cel, termin...',
      submit: 'Wyślij zapytanie',
      // Nowa strona nie ma tu zgody. Idzi zdecydował, że ma być (3.10.2026): tekst z poprzedniej
      // wersji strony, treść potwierdzona.
      consent:
        'Wysyłając formularz, zgadzasz się na kontakt od Kwadrat Nieruchomości w sprawie Twojego zapytania. Nie wysyłamy newsletterów.',
      success: 'Dziękujemy. Zapytanie zostało wysłane.',
      subject: 'Zapytanie ze strony slonecznahiszpania.pl',
    },
  },

  // Komunikaty wspólne dla obu formularzy
  forms: {
    privacyLead: 'Szczegóły przetwarzania danych:',
    privacyLink: 'Polityka prywatności',
    privacyHref: '/polityka-prywatnosci',
    errorRequired: 'To pole jest wymagane.',
    errorEmail: 'Wpisz poprawny adres e-mail.',
    errorSend: `Nie udało się wysłać formularza. Spróbuj ponownie albo zadzwoń: ${CONTACT.phone}.`,
  },

  // Stopka (WebFooter): marka z hasłem i social, kontakt, dane spółki, pasek prawny
  footer: {
    contactHeading: 'Kontakt',
    // Wiersz w tablicy to lista fragmentów, które nie łamią się w środku (kod pocztowy, NIP, REGON,
    // KRS). Wiersz jako zwykły tekst (nazwa sądu) łamie się normalnie.
    company: [
      [`${COMPANY.street},`, `${COMPANY.postalCode} ${COMPANY.city}`],
      [`NIP ${COMPANY.nip} ·`, `REGON ${COMPANY.regon}`],
      [`KRS ${COMPANY.krs}`],
      COMPANY.court,
      [`Kapitał zakładowy ${COMPANY.capital}`],
    ],
    phonePrefix: 'tel.',
    disclaimer:
      'Treści na stronie mają charakter informacyjny i nie stanowią porady prawnej, podatkowej ani inwestycyjnej.',
    privacy: { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
  },

  // Polityka prywatności: klauzula RODO z kwadrat.io/rodo (odczyt 4.10.2026), dostosowana do
  // formularzy tej strony na prośbę Idziego (4.10.2026). Zmiany wobec oryginału: lead, dopisek
  // o hostingu i obsłudze formularzy, zdanie o cookies, bez odwołania do art. 172 Prawa
  // telekomunikacyjnego (ustawę zastąpiło 10.11.2024 Prawo komunikacji elektronicznej),
  // drobna redakcja bez myślników. Adres e-mail w tekście zamienia się w link.
  // Baner zgody na Google Analytics (decyzja Idziego 6.10.2026): tylko z PUBLIC_GA_ID.
  // TODO: teksty baneru i akapity o Google Analytics w polityce (cookiesAnalytics) akceptuje Idzi
  // i sprawdza prawnik, zanim identyfikator trafi do Cloudflare Pages.
  consent: {
    label: 'Zgoda na statystyki',
    text: 'Za Twoją zgodą korzystamy z Google Analytics, żeby wiedzieć, ile osób odwiedza stronę i wysyła zapytania. Google zapisuje wtedy na Twoim urządzeniu pliki cookies. Zgodę zmienisz w każdej chwili w stopce.',
    policy: 'Polityka prywatności',
    accept: 'Akceptuję',
    reject: 'Odrzucam',
    settings: 'Ustawienia cookies',
  },

  // TODO: przed produkcją treść sprawdza prawnik, w tym:
  // 1. czy dostawcy formularzy (Web3Forms) i hostingu (Cloudflare) przekazują dane poza EOG
  //    (art. 13 ust. 1 lit. f RODO);
  // 2. cele marketingowe i analityczne z oryginału wobec zgód „Nie wysyłamy newsletterów”
  //    i braku narzędzi analitycznych na stronie;
  // 3. tekst mówi o zgodzie („do czasu jej wycofania”), a jedyna podstawa to art. 6 ust. 1
  //    lit. f RODO i lista praw nie wymienia prawa do wycofania zgody.
  privacy: {
    label: 'Zapisy prawne',
    title: 'Polityka prywatności',
    metaTitle: 'Polityka prywatności | Kwadrat Nieruchomości',
    metaDescription:
      'Zasady przetwarzania danych osobowych przesłanych przez formularze na stronie slonecznahiszpania.pl.',
    lead: 'Zasady przetwarzania danych osobowych przesłanych przez formularze na stronie slonecznahiszpania.pl: formularz poradnika i formularz konsultacji.',
    email: CONTACT.email,
    body: [
      `Administratorem danych osobowych jest Grupa Inwestycyjna Kwadrat Sp. z o.o. z siedzibą przy ul. Samorządowej 9/1, 05-400 Otwock („Administrator”), z którym można się skontaktować przez adres ${CONTACT.email}.`,
      'Dane osobowe będą przetwarzane w celu udzielenia odpowiedzi na Pani/Pana wiadomość oraz dla celów marketingowych i analitycznych.',
      'Podstawą prawną przetwarzania danych osobowych jest prawnie uzasadniony interes Administratora, polegający na obsłudze korespondencji oraz prowadzeniu marketingu bezpośredniego produktów i usług własnych, w tym dla celów analitycznych (art. 6 ust. 1 lit. f RODO).',
      'Dostęp do Pani/Pana danych będą mieć nasi pracownicy, podwykonawcy oraz podmioty świadczące usługi na naszą rzecz (tj. usługi IT i wsparcia technicznego, w tym hosting strony i obsługa formularzy) w zakresie koniecznym w celu obsługi korespondencji.',
      'Pani/Pana dane będą przechowywane przez okres niezbędny do rozpatrzenia zapytania lub wniesienia sprzeciwu, w zakresie wyrażonej zgody na kontakt do czasu jej wycofania, a w zakresie, w jakim komunikacja następuje w ramach umowy, do czasu zakończenia jej wykonywania oraz upływu okresu przedawnienia ewentualnych roszczeń umownych.',
    ],
    rightsIntro: 'Przysługuje Pani/Panu prawo do:',
    rights: [
      'żądania dostępu do swoich danych osobowych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, a także prawo do przenoszenia danych,',
      'wniesienia w dowolnym momencie sprzeciwu wobec przetwarzania Pani/Pana danych osobowych z przyczyn związanych ze szczególną sytuacją,',
      'wniesienia skargi do organu nadzorczego, tj. Prezesa Urzędu Ochrony Danych Osobowych.',
    ],
    closing: [
      'Podanie danych jest dobrowolne, jednak ich niepodanie będzie skutkowało brakiem możliwości udzielenia odpowiedzi na Pani/Pana wiadomość. Wyrażenie zgody jest dobrowolne.',
      'Dane osobowe nie będą wykorzystywane do podejmowania zautomatyzowanych decyzji, w tym profilowania.',
    ],
    // Bez PUBLIC_GA_ID (dziś) strona pokazuje zdanie cookies. Z identyfikatorem zamiast niego
    // akapity cookiesAnalytics: projekt do akceptacji Idziego i prawnika (TODO przy consent).
    cookies: 'Strona nie korzysta z narzędzi analitycznych ani reklamowych i sama nie zapisuje plików cookies.',
    cookiesAnalytics: [
      'Za Pani/Pana zgodą strona korzysta z Google Analytics 4, usługi Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irlandia), w celu pomiaru liczby odwiedzin i wysłanych zapytań. Podstawą prawną jest zgoda (art. 6 ust. 1 lit. a RODO). Strona nie korzysta z narzędzi reklamowych.',
      'Google Analytics zapisuje na urządzeniu pliki cookies (_ga i _ga_*), które wygasają po 13 miesiącach. Dane mogą być przekazywane do Google LLC w USA na podstawie decyzji Komisji Europejskiej w sprawie ram ochrony danych między UE a USA (EU-US Data Privacy Framework).',
      'Zgodę można w każdej chwili wycofać przyciskiem „Ustawienia cookies” w stopce strony. Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania, którego dokonano przed jej wycofaniem. Informację o wyborze strona zapisuje w pamięci przeglądarki, bez plików cookies.',
    ],
  },
};

export type Img = (typeof IMAGES)[keyof typeof IMAGES];

export const site = typo(raw);
