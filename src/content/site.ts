// Całe copy strony w jednym miejscu. To jest aktualne, zatwierdzone copy.
// Źródło: nowa wersja www.slonecznahiszpania.pl, wyrenderowana 3.10.2026, przeniesiona 1:1
// z poprawkami Idziego (bez długich myślników, pisownia Malaga, poprawki DANE).
// docs/copy.md zostaje jako zapis stanu najstarszej wersji strony.
// Etykiety zapisujemy zdaniowo: wersaliki robi CSS (klasa .label).
// Twarde spacje (przed „·", po jednoliterowych spójnikach, w liczbach)
// dokłada automatycznie funkcja typo() na końcu pliku. Pisz zwykłe spacje.
// Bez pauz i półpauz: pilnuje tego npm run lint:kwadrat.

import { typo } from './typo';

// Przykładowe nieruchomości: oferty i ceny potwierdził Idzi (3.10.2026), sekcja jest widoczna.
// Gdy false, sekcja i pozycja „Oferty" w menu znikają ze strony.
export const SHOW_OFFERS = true;

// Zdjęcia poglądowe (DANE): podpis pod zdjęciami w hero. Pusty tekst ukrywa podpis.
export const PHOTO_NOTE = 'Zdjęcie poglądowe';

// Zdjęcia ofert to wizualizacje dewelopera (Idzi, 3.10.2026): podpis pod każdym zdjęciem oferty.
// Pusty tekst ukrywa podpis, np. po podmianie na zdjęcia nieruchomości.
export const OFFER_PHOTO_NOTE = 'Wizualizacja';

// Telefon i e-mail jak na nowej stronie (potwierdził Idzi 3.10.2026). Jedyne miejsce w repo.
const CONTACT = {
  phone: '+48 505 085 001',
  phoneHref: 'tel:+48505085001',
  email: 'biuro@kwadrat.io',
};

const COMPANY = {
  brand: 'Kwadrat Nieruchomości',
  legalName: 'GRUPA INWESTYCYJNA KWADRAT Sp. z o.o.',
  street: 'ul. Samorządowa 9/1',
  postalCode: '05-400',
  city: 'Otwock',
  nip: '5322092950',
  regon: '388901030',
  krs: '0000896911',
  capital: '50 000,00 zł',
  court: 'Sąd Rejonowy dla m.st. Warszawy w Warszawie, XIV Wydział Gospodarczy KRS',
  website: 'https://www.kwadrat.io',
  websiteLabel: 'www.kwadrat.io',
};

// Zdjęcia: źródła w zdjecia/, warianty w public/img/{name}-{szerokość}.webp i .jpg
// (generuje npm run zdjecia). ratio to naturalne proporcje pliku, bez kadrowania.
// Brak plików = szare pole z podpisem.
// Źródło zdjęć w hero i w ofertach: deweloper (potwierdził Idzi 3.10.2026).
const IMAGES = {
  heroSol: {
    name: 'hero-costa-del-sol',
    ratio: [1200, 912],
    alt: 'Taras apartamentu z widokiem na morze',
    placeholder: 'Zdjęcie 4:3',
  },
  heroBlanca: {
    name: 'hero-costa-blanca',
    ratio: [1200, 912],
    alt: 'Taras apartamentu z widokiem na morze',
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
    // og:image: zrzut górnej części tej strony w systemie Kwadrat (okno 1600 × 840 zmniejszone
    // do 1200 × 630). Idzi wybrał go 3.10.2026 zamiast zrzutu wersji z Lovable.
    // Alt złożony z nazwy marki i h1.
    ogImage: '/og-image.jpg',
    ogImageAlt: 'Kwadrat Nieruchomości: Dwa wybrzeża. Dwie dobre odpowiedzi.',
    author: 'Kwadrat Nieruchomości',
  },

  header: {
    logoAlt: 'Kwadrat Nieruchomości',
    menu: 'Menu',
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
    title: ['Dwa wybrzeża.', 'Dwie dobre odpowiedzi.'],
    lead: 'Nie sprzedajemy jednego regionu za wszelką cenę. Porównujemy Costa del Sol, Costa Blanca i inne części Hiszpanii, żeby znaleźć miejsce właściwe dla Twojego celu.',
    ctaPrimary: { label: 'Porównajmy Twój wybór', href: '#kontakt' },
    ctaSecondary: { label: 'Pobierz poradnik', href: '#poradnik' },
    note: 'Bez rankingu na siłę. Najlepszy region zależy od celu, budżetu i sposobu użytkowania.',
    directions: [
      {
        label: 'Kierunek 01',
        title: 'Costa del Sol',
        text: 'Malaga, Marbella i spokojniejsza Axarquía. Dla osób, które cenią całoroczną infrastrukturę, zróżnicowany popyt i szeroki wybór lokalizacji.',
        link: { label: 'Zobacz mocne strony i kompromisy', href: '#porownanie' },
        image: IMAGES.heroSol,
      },
      {
        label: 'Kierunek 02',
        title: 'Costa Blanca',
        text: 'Alicante i różnorodne miejscowości nad białym wybrzeżem. Dla osób szukających szerokiej podaży, plażowego stylu życia i elastycznego budżetu.',
        link: { label: 'Zobacz mocne strony i kompromisy', href: '#porownanie' },
        image: IMAGES.heroBlanca,
      },
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
          'Silne szczególnie w Maladze i większych ośrodkach',
          'Dobre w Alicante i większych miastach; kurorty trzeba oceniać osobno',
        ],
      },
      {
        key: 'Dostępność',
        values: [
          'Lotnisko Malaga i rozwinięta komunikacja wzdłuż wybrzeża',
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
    // NOWE (prośba Idziego): nota do wiersza-kotwicy
    anchorNote: 'Wiersz „Dla kogo” podsumowuje porównanie.',
    note: 'Warunki zakupu, najmu i podaży różnią się między gminami. Każdą decyzję poprzedzamy aktualną weryfikacją.',
  },

  regions: {
    label: 'Szersza perspektywa',
    title: 'Hiszpania nie kończy się na dwóch wybrzeżach',
    lead: 'Costa del Sol i Costa Blanca to nasze główne punkty odniesienia, ale czasem lepsza odpowiedź leży gdzie indziej.',
    items: [
      {
        label: '01',
        places: 'Malaga, Marbella, Mijas, Nerja',
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
      },
      {
        label: '02',
        title: 'Dom na wypoczynek',
        text: 'Dobieramy wybrzeże do rytmu Twoich pobytów, połączeń lotniczych, plaż, usług i otoczenia, w którym naprawdę odpoczniesz.',
      },
      {
        label: '03',
        title: 'Mieszkanie na stałe',
        text: 'Sprawdzamy codzienną infrastrukturę, opiekę zdrowotną, dojazdy i życie poza sezonem, zanim przejdziemy do ofert.',
      },
    ],
    cta: { label: 'Umów bezpłatną konsultację', href: '#kontakt' },
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
    title: 'Od Malagi po Alicante',
    lead: 'Na start porównujemy miejscowości reprezentujące różne budżety i style życia.',
    groups: [
      {
        label: 'Costa del Sol i Axarquía',
        rows: [
          { key: 'Malaga', value: 'Miasto działające przez cały rok.' },
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
    steps: [
      {
        number: '1',
        title: 'Rozmowa i kryteria',
        text: 'Ustalamy cel, budżet, horyzont i to, jak chcesz korzystać z nieruchomości.',
      },
      {
        number: '2',
        title: 'Porównanie regionów',
        text: 'Zestawiamy Costa del Sol, Costa Blanca i rozsądne alternatywy pod Twoje kryteria.',
      },
      {
        number: '3',
        title: 'Oferty i weryfikacja',
        text: 'Organizujemy wizyty oraz sprawdzamy dokumenty, koszty i stan prawny.',
      },
      {
        number: '4',
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
    // Najwyżej pięć punktów: weryfikacja połączona z koordynacją prawnika i notariusza
    list: [
      'Wyszukanie i selekcja ofert',
      'Weryfikacja dokumentów i obciążeń z prawnikiem i notariuszem',
      'NIE, rachunek i pełnomocnictwa',
      'Wsparcie w finansowaniu',
      'Odbiór i opieka po zakupie',
    ],
  },

  reviews: {
    label: 'Opinie klientów',
    title: 'Zaufanie potwierdzone w Google',
    text: 'Standard pracy Grupy Inwestycyjnej Kwadrat potwierdzają klienci obsługiwani w Polsce.',
    rating: {
      label: 'Ocena Google',
      value: '4,9',
      scale: '/ 5',
      note: '120 opinii w wizytówce Google',
      // Nazwa wizytówki i data odczytu liczby opinii od Idziego (3.10.2026).
      // Puste pole nie pojawia się na stronie.
      profileName: 'Kwadrat Otwock',
      readDate: '01.10.2026',
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
      href: 'https://www.google.com/maps/search/Kwadrat+Nieruchomo%C5%9Bci+Otwock',
    },
  },

  faq: {
    label: 'Najczęstsze pytania',
    title: 'Zanim zaczniesz szukać',
    items: [
      {
        // Odpowiedź potwierdzona przez hiszpańskiego prawnika (informacja od Idziego, 3.10.2026).
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
    form: {
      name: 'Imię i nazwisko',
      namePlaceholder: 'Jan Kowalski',
      email: 'E-mail',
      emailPlaceholder: 'jan@adres.pl',
      region: 'Rozważany region',
      regionPlaceholder: 'Wybierz lub zostaw otwarte',
      regionOptions: ['Costa del Sol', 'Costa Blanca', 'Chcę porównać regiony', 'Inny region Hiszpanii'],
      message: 'Wiadomość',
      messagePlaceholder: 'Budżet, cel, termin...',
      submit: 'Wyślij zapytanie',
      // Nowa strona nie ma tu zgody. Idzi zdecydował, że ma być (3.10.2026): tekst z poprzedniej
      // wersji strony, treść potwierdzona.
      consent:
        'Wysyłając formularz, zgadzasz się na kontakt od Grupy Inwestycyjnej Kwadrat w sprawie Twojego zapytania. Nie wysyłamy newsletterów.',
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

  footer: {
    lines: [
      `${COMPANY.legalName} · ${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`,
      `NIP: ${COMPANY.nip} · REGON: ${COMPANY.regon} · KRS: ${COMPANY.krs} · kapitał zakładowy: ${COMPANY.capital}`,
      COMPANY.court,
    ],
    disclaimer:
      'Treści na stronie mają charakter informacyjny i nie stanowią porady prawnej, podatkowej ani inwestycyjnej.',
    privacy: { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
  },

  privacy: {
    title: 'Polityka prywatności',
    metaTitle: 'Polityka prywatności | Kwadrat Nieruchomości',
    body: 'Treść w przygotowaniu.',
  },
};

export type Img = (typeof IMAGES)[keyof typeof IMAGES];

export const site = typo(raw);
