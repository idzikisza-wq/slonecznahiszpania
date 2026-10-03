// Całe copy strony w jednym miejscu. To jest aktualne, zatwierdzone copy.
// Punkt wyjścia: docs/copy.md (copy starej strony). Zmiany po przeglądzie Idziego
// z 3.10.2026 są wprowadzone tutaj, docs/copy.md zostaje jako zapis stanu starej strony.
// Etykiety zapisujemy zdaniowo: wersaliki robi CSS (klasa .label).
// Twarde spacje (przed „·", po jednoliterowych spójnikach, w liczbach)
// dokłada automatycznie funkcja typo() na końcu pliku. Pisz zwykłe spacje.
// Bez pauz i półpauz: pilnuje tego npm run lint:kwadrat.

import { typo } from './typo';

// DO POTWIERDZENIA (Idzi): telefon i e-mail. Jedyne miejsce w repo.
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
// (generuje npm run zdjecia). ratio musi zgadzać się z kadrem w scripts/zdjecia.mjs.
// Brak plików = szare pole z podpisem. Alt opisuje to, co widać na zdjęciu.
const IMAGES = {
  hero: {
    name: 'hero',
    ratio: [3, 2],
    alt: 'Zachód słońca nad Morzem Śródziemnym i nadmorska promenada z palmami',
    placeholder: 'Zdjęcie 3:2',
  },
  locations: {
    name: 'lokalizacje',
    ratio: [4, 3],
    // DO POTWIERDZENIA: jaka to miejscowość (Frigiliana?), wtedy można ją dopisać do altu
    alt: 'Białe miasteczko na zboczu gór w Andaluzji',
    placeholder: 'Zdjęcie 4:3',
  },
  offerMalaga: {
    name: 'oferta-malaga',
    ratio: [4, 3],
    alt: 'Trzy osoby przed białym apartamentowcem z basenem i palmami',
    placeholder: 'Zdjęcie 4:3',
  },
  offerMijas: {
    name: 'oferta-mijas',
    ratio: [4, 3],
    alt: 'Willa pośród wzgórz, Mijas',
    placeholder: 'Zdjęcie 4:3',
  },
  offerMarbella: {
    name: 'oferta-marbella',
    ratio: [4, 3],
    alt: 'Biały apartamentowiec z dużymi tarasami i palmami',
    placeholder: 'Zdjęcie 4:3',
  },
  service: {
    name: 'obsluga',
    ratio: [4, 3],
    alt: 'Widok z tarasu na ogród z palmami i biały apartamentowiec',
    placeholder: 'Zdjęcie 4:3',
  },
  contact: {
    name: 'kontakt',
    ratio: [4, 3],
    alt: 'Piotr i Ania na deptaku w centrum Málagi',
    placeholder: 'Zdjęcie 4:3',
  },
};

const raw = {
  contact: CONTACT,
  company: COMPANY,

  meta: {
    title: 'Kwadrat Nieruchomości | Andaluzja i Málaga',
    description:
      'Bezpieczny zakup nieruchomości w Andaluzji i na Costa del Sol. Polska obsługa od wyboru oferty po odbiór kluczy.',
    ogTitle: 'Kwadrat Nieruchomości | Hiszpania',
    ogDescription: 'Nieruchomości w Andaluzji, prowadzone od pierwszej rozmowy do odbioru kluczy.',
  },

  header: {
    logoAlt: 'Kwadrat Nieruchomości',
    menu: 'Menu',
    navLabel: 'Nawigacja główna',
    skipLink: 'Przejdź do treści',
    nav: [
      { label: 'Dlaczego Hiszpania', href: '/#dlaczego-hiszpania' },
      { label: 'Proces zakupu', href: '/#proces' },
      { label: 'Opinie', href: '/#opinie' },
      { label: 'FAQ', href: '/#faq' },
    ],
    cta: { label: 'Konsultacja', href: '/#kontakt' },
  },

  hero: {
    label: 'Polska obsługa na miejscu',
    title: 'Nieruchomości w Andaluzji bez niepewności.',
    lead: 'Znajdziemy dla Ciebie apartament, dom lub inwestycję w Máladze i na Costa del Sol. Po polsku, z lokalnym wsparciem i pełną kontrolą formalności.',
    ctaPrimary: { label: 'Umów bezpłatną konsultację', href: '#kontakt' },
    ctaSecondary: { label: 'Jak wygląda zakup', href: '#proces' },
    kpis: [
      { value: 'PL', note: 'obsługa po polsku' },
      { value: '360°', note: 'wsparcia przy zakupie' },
      { value: '1 plan', note: 'od rozmowy do kluczy' },
    ],
    image: IMAGES.hero,
    caption: 'Twój adres na południu. Málaga · Costa del Sol · Andaluzja',
  },

  guide: {
    label: 'Bezpłatny poradnik',
    title: 'Kupno nieruchomości w Andaluzji: krok po kroku',
    text: 'Praktyczny przewodnik dla polskiego kupującego: od pierwszej rozmowy, przez koszty i formalności, aż po odbiór kluczy i wynajem.',
    list: [
      'Koszty zakupu krok po kroku: podatki, notariusz, rejestr',
      'NIE, rachunek bankowy i pełnomocnictwa bez niespodzianek',
      'Jak ocenić lokalizację pod najem całoroczny',
      'Najczęstsze ryzyka i jak je weryfikujemy przed zakupem',
    ],
    note: 'PDF · dostęp natychmiast po zapisie',
    form: {
      firstName: 'Imię',
      lastName: 'Nazwisko',
      email: 'E-mail',
      submit: 'Pobierz bezpłatny poradnik',
      // DO POTWIERDZENIA z prawnikiem: treść zgody
      consent: 'Wysyłając formularz, zgadzasz się na przesłanie poradnika i kontakt w tej sprawie.',
      success: 'Dziękujemy. Poradnik jest gotowy do pobrania.',
      download: 'Pobierz poradnik (PDF)',
      pdf: '/poradnik.pdf',
      subject: 'Poradnik: nowy zapis ze strony slonecznahiszpania.pl',
    },
  },

  purpose: {
    label: 'Dopasowana ścieżka',
    title: 'Po co kupujesz w Hiszpanii?',
    lead: 'Nie zaczynamy od katalogu. Zaczynamy od Twojego planu.',
    items: [
      {
        label: '01',
        title: 'Inwestycja pod wynajem',
        text: 'Apartamenty z potencjałem najmu w Máladze i nad morzem. Analizujemy lokalizację, koszty i realny popyt.',
      },
      {
        label: '02',
        title: 'Dom na wypoczynek',
        text: 'Wille i domy w spokojnych częściach Marbelli, Benalmádeny i Mijas, blisko plaży, usług i lotniska.',
      },
      {
        label: '03',
        title: 'Mieszkanie na stałe',
        text: 'Nieruchomości do wygodnego życia przez cały rok, z dobrym dojazdem, szkołami i codzienną infrastrukturą.',
      },
    ],
    cta: { label: 'Umów bezpłatną konsultację', href: '#kontakt' },
  },

  whySpain: {
    label: 'Perspektywa polskiego inwestora',
    title: 'Dlaczego Hiszpania i na co uważać',
    lead: 'Zarówno argumenty za, jak i ryzyka, które analizujemy z każdym klientem.',
    items: [
      {
        title: 'Majątek w euro, poza polskim rynkiem',
        text: 'Nieruchomość w strefie euro i w UE to dywersyfikacja: część majątku poza polskim rynkiem. Wiąże się z ryzykiem kursu, które omawiamy poniżej.',
      },
      {
        title: 'Południe Europy, daleko od frontu',
        text: 'Hiszpania leży na zachodnim krańcu UE i NATO, w strefie euro. Costa del Sol jest daleko od konfliktu we wschodniej Europie.',
      },
      {
        title: 'Najem, który działa cały rok',
        text: 'Málaga i wybrzeże Axarquía mają popyt także poza latem: turyści, emeryci, osoby pracujące zdalnie. Skalę popytu sprawdzamy dla konkretnej oferty.',
      },
    ],
    risks: {
      label: 'Geopolityka i ryzyka',
      title: 'Ryzyka nazywamy wprost',
      text: 'Każde z poniższych zagrożeń sprawdzamy w ramach weryfikacji oferty. Zanim podejmiesz decyzję, znasz odpowiedź.',
      items: [
        {
          title: 'Susza i dostęp do wody',
          text: 'Andaluzja odczuwa zmiany klimatu. Sprawdzamy źródło zaopatrzenia w wodę i plany gminy: te czynniki realnie wpływają na wartość nieruchomości.',
        },
        {
          title: 'Regulacje najmu krótkoterminowego',
          text: 'Władze zaostrzają zasady licencjonowania najmu turystycznego. Weryfikujemy licencję i przepisy konkretnej gminy przed każdą rekomendacją.',
        },
        {
          title: 'Ryzyko kursu EUR/PL',
          text: 'Kurs euro wpływa na koszt zakupu i wartość inwestycji w złotych. Planujemy moment płatności i przewalutowania razem z Tobą.',
        },
      ],
    },
  },

  // Jedna sekcja zamiast dwóch. Zdania o Costa Blanca zmiękczone do tego, co da się obronić.
  // NOWE, DO AKCEPTACJI: teksty bloków 1, 2 i 4 oraz linijka ze źródłem
  whyAndalusia: {
    label: 'Wybór regionu',
    title: 'Dlaczego Andaluzja, a nie Costa Blanca',
    lead: 'Oba wybrzeża sprzedają słońce: różni je to, co dzieje się poza sezonem.',
    items: [
      {
        title: 'Sezonowość popytu',
        text: 'Na obu wybrzeżach szczyt najmu przypada na lato, a w miejscowościach z przewagą domów wakacyjnych ruch po sezonie wyraźnie spada. Obłożenie poza sezonem sprawdzamy dla konkretnej miejscowości.',
      },
      {
        title: 'Málaga to miasto, nie kurort',
        text: 'Málaga jest szóstym co do wielkości miastem Hiszpanii, z ok. 586 tys. mieszkańców w 2024 roku. To centrum technologiczne z portem, uczelniami i galeriami. Popyt na mieszkania tworzą tu nie tylko turyści.',
      },
      {
        title: 'Lotnisko z bezpośrednimi lotami z Polski',
        text: 'Lotnisko w Máladze (AGP) ma bezpośrednie loty z polskich miast. Aktualne trasy sprawdzisz na stronie lotniska.',
      },
      {
        title: 'Zabudowa i konkurencja przy najmie',
        text: 'Na obu wybrzeżach są gęste osiedla apartamentów i spokojne okolice z niską zabudową. Różnice bywają duże nawet w jednej miejscowości, dlatego gęstość zabudowy i konkurencję przy najmie sprawdzamy dla konkretnej oferty.',
      },
    ],
    source: {
      lead: 'Liczba mieszkańców:',
      label: 'Ayuntamiento de Málaga, Basic city facts',
      href: 'https://openforbusiness.malaga.eu/en/basic-city-facts/',
    },
  },

  locations: {
    label: 'Lokalna specjalizacja',
    title: 'Málaga i wybrzeże Axarquía',
    lead: 'Od miejskiego rytmu Málagi po klifowe zatoki Nerji.',
    tableLabel: 'Andaluzja',
    rows: [
      { key: 'Málaga', value: 'Kultura, port i rynek działający przez cały rok.' },
      { key: 'Torre del Mar', value: 'Długa promenada, plaże i przystępne ceny.' },
      { key: 'Caleta de Vélez', value: 'Port rybacki, marina i kameralna zabudowa.' },
      { key: 'Lagos (prowincja Málaga)', value: 'Cisza, andaluzyjski klimat i widoki na wzgórza.' },
      { key: 'Nerja', value: 'Balcón de Europa, zatoki i dojrzały rynek najmu.' },
    ],
    image: IMAGES.locations,
  },

  process: {
    label: 'Jasny proces',
    title: 'Od pierwszej rozmowy do kluczy',
    lead: 'Cztery etapy. Po każdym wiesz, co dalej.',
    steps: [
      { number: '1', title: 'Rozmowa i plan', text: 'Poznajemy Twój cel, budżet i oczekiwania wobec lokalizacji.' },
      { number: '2', title: 'Selekcja ofert', text: 'Przeszukujemy rynek i przedstawiamy krótką, dopasowaną listę.' },
      { number: '3', title: 'Oględziny i kontrola', text: 'Organizujemy wizyty oraz weryfikujemy dokumenty i stan prawny.' },
      { number: '4', title: 'Umowa i klucze', text: 'Koordynujemy notariusza, płatności i przekazanie nieruchomości.' },
    ],
  },

  // Do zastąpienia prawdziwymi ofertami: zdjęcie 4:3, miejsce, parametry, cena z oferty
  // i link (pole href, wtedy tytuł staje się linkiem). Do tego czasu sekcja jest poza menu.
  offers: {
    label: 'Przykładowe kierunki',
    title: 'Nieruchomości warte rozmowy',
    note: 'Zakres i ceny są orientacyjne. Właściwą ofertę dobieramy po konsultacji.',
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
    title: 'W Hiszpanii kupujesz. My pilnujemy reszty.',
    list: [
      'Wyszukanie i selekcja ofert',
      'Weryfikacja dokumentów i obciążeń z prawnikiem i notariuszem',
      'NIE, rachunek bankowy i pełnomocnictwa',
      // DO POTWIERDZENIA: punkt zostaje tylko, jeśli to realna usługa
      'Wsparcie w finansowaniu',
      'Odbiór i opieka po zakupie',
    ],
    image: IMAGES.service,
  },

  reviews: {
    label: 'Opinie klientów',
    title: 'Zaufanie potwierdzone w Google',
    // DO UZUPEŁNIENIA: „od lat" zamienić na rok założenia z dokumentu firmy
    text: 'Grupa Inwestycyjna Kwadrat obsługuje klientów w Polsce od lat. Te same standardy przenosimy do Hiszpanii.',
    rating: {
      label: 'Ocena Google',
      value: '4,9',
      scale: '/ 5',
      // DO UZUPEŁNIENIA: data odczytu liczby opinii
      note: 'Na podstawie 120 opinii w wizytówce Google',
    },
    // Każdy cytat skrócony do jednego zdania z oryginalnej opinii. Cudzysłowy „ ” dokłada szablon.
    quotes: [
      {
        text: 'Chciałabym wyrazić szczerą wdzięczność pani Marzenie za wysoki profesjonalizm, odpowiedzialność i troskliwe podejście do klienta.',
        author: 'Anna Nik',
        meta: '3 miesiące temu · opinia Google',
      },
      {
        text: 'Polecam współpracę, usługi na wysokim poziomie.',
        author: 'Kanan Mammadov',
        meta: '4 lata temu · opinia Google',
      },
    ],
    quotesNote: 'Opinie dotyczą obsługi w Polsce.',
    cta: {
      label: 'Zobacz wszystkie opinie',
      href: 'https://www.google.com/maps/search/Kwadrat+Nieruchomo%C5%9Bci+Otwock',
    },
  },

  faq: {
    label: 'Najczęstsze pytania',
    title: 'Zanim zaczniesz szukać',
    items: [
      {
        question: 'Czy Polak może kupić nieruchomość w Hiszpanii?',
        answer:
          'Tak. Obywatel Polski może kupić nieruchomość na takich samych zasadach jak obywatel Hiszpanii. Do transakcji potrzebny jest numer NIE.',
      },
      {
        question: 'Jakie dodatkowe koszty trzeba uwzględnić?',
        answer:
          'Poza ceną zakupu należy uwzględnić podatki, notariusza, wpis do rejestru i obsługę prawną. Dokładne wyliczenie zależy od rynku pierwotnego lub wtórnego.',
      },
      {
        question: 'Czy muszę być w Hiszpanii podczas całego procesu?',
        answer:
          'Nie. Część formalności można przeprowadzić zdalnie na podstawie pełnomocnictwa, a wizytę zaplanować na oględziny i finalny wybór.',
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
    title: 'Zacznijmy od Twojego planu',
    text: 'Napisz, czego szukasz i jaki budżet rozważasz. Wrócimy z pytaniami, które pozwolą dobrze rozpocząć poszukiwania.',
    phoneLabel: 'Zadzwoń do nas',
    cta: { label: 'Poznaj Grupę Inwestycyjną Kwadrat', href: COMPANY.website },
    image: IMAGES.contact,
    form: {
      name: 'Imię i nazwisko',
      email: 'E-mail',
      phone: 'Telefon',
      interest: 'Co Cię interesuje?',
      interestPlaceholder: 'Wybierz cel zakupu',
      interestOptions: ['Inwestycja pod wynajem', 'Dom na wypoczynek', 'Mieszkanie na stałe', 'Jeszcze nie wiem'],
      message: 'Wiadomość',
      submit: 'Wyślij zapytanie',
      // DO POTWIERDZENIA z prawnikiem: treść zgody i zdanie o newsletterach
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
