// Całe copy strony w jednym miejscu. Źródło: docs/copy.md, przeniesione 1:1.
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
// Brak plików = szare pole z podpisem.
const IMAGES = {
  hero: {
    name: 'hero',
    ratio: [3, 2],
    // DO POTWIERDZENIA: alt z copy.md opisywał stare zdjęcie (apartament), nowe to zachód słońca
    alt: 'Zachód słońca nad Morzem Śródziemnym i nadmorska promenada z palmami',
    placeholder: 'Zdjęcie 3:2',
  },
  guideCover: {
    name: 'poradnik-okladka',
    ratio: [3, 4],
    // DO POTWIERDZENIA: alt z copy.md: „Okładka bezpłatnego poradnika: Bezpieczne inwestowanie
    // w nieruchomości w Hiszpanii". Nowe zdjęcie to nie okładka z tytułem, więc alt opisuje zdjęcie.
    alt: 'Kobieta i mężczyzna na deptaku w centrum Málagi',
    placeholder: 'Zdjęcie 3:4',
  },
  offerMalaga: {
    name: 'oferta-malaga',
    ratio: [4, 3],
    alt: 'Apartament z tarasem, Málaga Centro',
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
    alt: 'Penthouse z panoramą, Marbella',
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
    tagline: 'Hiszpania · Andaluzja · Málaga',
    menu: 'Menu',
    navLabel: 'Nawigacja główna',
    skipLink: 'Przejdź do treści',
    nav: [
      { label: 'Oferty', href: '/#oferty' },
      { label: 'Lokalizacje', href: '/#lokalizacje' },
      { label: 'Dlaczego Hiszpania', href: '/#dlaczego-hiszpania' },
      { label: 'Dlaczego Andaluzja', href: '/#dlaczego-andaluzja' },
      { label: 'Proces zakupu', href: '/#proces' },
      { label: 'Bezpieczeństwo', href: '/#bezpieczenstwo' },
      { label: 'Poradnik', href: '/#poradnik' },
      { label: 'Opinie', href: '/#opinie' },
      { label: 'FAQ', href: '/#faq' },
    ],
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
    image: IMAGES.guideCover,
    form: {
      firstName: 'Imię',
      lastName: 'Nazwisko',
      email: 'E-mail',
      submit: 'Pobierz bezpłatny poradnik',
      consent:
        'Zapisując się, zgadzasz się na kontakt od Kwadrat Nieruchomości w sprawie Twojego zapytania. Nie wysyłamy newsletterów.',
      // NOWE, DO AKCEPTACJI: komunikat po zapisie
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
    cta: { label: 'Porozmawiajmy', href: '#kontakt' },
  },

  whySpain: {
    label: 'Perspektywa polskiego inwestora',
    title: 'Dlaczego Hiszpania i na co uważać',
    lead: 'Zarówno argumenty za, jak i ryzyka, które analizujemy z każdym klientem.',
    items: [
      {
        title: 'Majątek w euro, poza polskim rynkiem',
        text: 'Nieruchomość w strefie euro i w UE to dywersyfikacja: zabezpieczenie przed ryzykiem walutowym i koncentracją całego majątku w jednym kraju.',
      },
      {
        title: 'Południe Europy, daleko od frontu',
        text: 'Hiszpania leży na zachodnim krańcu NATO i UE. Konflikt we wschodniej Europie nie przekłada się na codzienne życie ani na rynek nieruchomości na Costa del Sol.',
      },
      {
        title: 'Najem, który działa cały rok',
        text: 'Málaga i wybrzeże Axarquía przyciągają turystów, emerytów i pracujących zdalnie w każdej porze roku: przychody z wynajmu nie kończą się z sezonem.',
      },
    ],
    risks: {
      label: 'Geopolityka i ryzyka',
      title: 'Ryzyka nazywamy wprost',
      text: 'Każde z poniższych zagrożeń sprawdzamy w ramach weryfikacji oferty. Zanim podejmiesz decyzję, znasz odpowiedź.',
      items: [
        {
          title: 'Presja migracyjna na południu UE',
          text: 'Realna, ale skoncentrowana na enklawach Ceuta i Melilla oraz na trasach przez Morze Alborán, nie na rynkach mieszkaniowych Costa del Sol.',
        },
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

  whyAndalusia: {
    label: 'Wybór regionu',
    title: 'Dlaczego Andaluzja, a nie Costa Blanca',
    lead: 'Oba wybrzeża sprzedają słońce: różni je to, co dzieje się poza sezonem.',
    items: [
      {
        title: 'Sezon najmu nie kończy się we wrześniu',
        text: 'Costa Blanca żyje ruchem wakacyjnym: po sezonie popyt wyraźnie zamiera. Costa del Sol i Axarquía mają najem całoroczny: turyści poza sezonem, emeryci, studenci i pracujący zdalnie w Máladze. To przekłada się na stabilniejszy przychód z wynajmu.',
      },
      {
        title: 'Málaga to miasto, nie kurort',
        text: 'Alicante to głównie przystań dla ruchu wakacyjnego. Málaga jest czwartym co do wielkości miastem Hiszpanii, centrum technologicznym, z portem, uczelniami i galeriami. Miasto utrzymuje rynek nieruchomości niezależnie od turystyki.',
      },
      {
        title: 'Lotnisko z bezpośrednimi lotami z Polski',
        text: 'Málaga (AGP) obsługuje znacznie więcej połączeń niż Alicante, w tym bezpośrednie loty z Warszawy, Krakowa i innych polskich miast. Tani i krótki dojazd sprawia, że częściej korzystasz z własnej nieruchomości.',
      },
      {
        title: 'Mniejsza podaż, wyższy standard przestrzeni',
        text: 'Costa Blanca to dziesiątki lat masowej zabudowy: blokowiska apartamentów blisko siebie i wysoka konkurencja przy wynajmie. Na Costa del Sol i w Axarquía przeważa kameralna, andaluzyjska zabudowa i niższa gęstość.',
      },
    ],
    compare: {
      label: 'Andaluzja vs. Costa Blanca',
      title: 'W liczbach i na co dzień',
      text: 'Porównanie, które przeprowadzamy z każdym klientem, który rozważa oba wybrzeża.',
      items: [
        {
          title: 'Całoroczne życie vs. sezonowość',
          text: 'Na Costa del Sol restauracje, szkoły i usługi pracują cały rok. Na wielu miejscowościach Costa Blanca po październiku zamykają się na sezon, i trudniej wynająć albo sprzedać poza nim.',
        },
        {
          title: 'Dywersyfikacja popytu',
          text: 'Málaga łączy turystów, studentów, pracowników technologicznych i stałych mieszkańców. Costa Blanca opiera się głównie na turystyce i emerytach zagranicznych, jednym źródle popytu.',
        },
        {
          title: 'Axarquía: przystępne ceny, autentyczny klimat',
          text: 'Torre del Mar, Caleta de Vélez, Lagos czy Nerja oferują ceny niższe niż Marbella czy popularne kurorty Costa Blanca, przy autentycznej, andaluzyjskiej atmosferze.',
        },
        {
          title: 'Wartość przy odsprzedaży',
          text: 'Rynek wokół Málagi rośnie na fali migracji pracowników i inwestycji w miasto. Na przesyconym rynku Costa Blanca odsprzedaż bywa dłuższa i pod presją cenową.',
        },
      ],
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
      { key: 'Lagos', value: 'Cisza, andaluzyjski klimat i widoki na wzgórza.' },
      { key: 'Nerja', value: 'Balcón de Europa, zatoki i dojrzały rynek najmu.' },
    ],
  },

  process: {
    label: 'Jasny proces',
    title: 'Od pierwszej rozmowy do kluczy',
    lead: 'Każdy etap ma właściciela, termin i jasny następny krok.',
    steps: [
      { number: '1', title: 'Rozmowa i plan', text: 'Poznajemy Twój cel, budżet i oczekiwania wobec lokalizacji.' },
      { number: '2', title: 'Selekcja ofert', text: 'Przeszukujemy rynek i przedstawiamy krótką, dopasowaną listę.' },
      { number: '3', title: 'Oględziny i kontrola', text: 'Organizujemy wizyty oraz weryfikujemy dokumenty i stan prawny.' },
      { number: '4', title: 'Umowa i klucze', text: 'Koordynujemy notariusza, płatności i przekazanie nieruchomości.' },
    ],
  },

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
      },
      {
        location: 'Mijas',
        title: 'Willa pośród wzgórz',
        details: ['3 sypialnie', '164 m²', 'prywatny basen'],
        price: '695 000 €',
        image: IMAGES.offerMijas,
      },
      {
        location: 'Marbella',
        title: 'Penthouse z panoramą',
        details: ['3 sypialnie', '112 m²', 'duży taras'],
        price: '825 000 €',
        image: IMAGES.offerMarbella,
      },
    ],
  },

  service: {
    label: 'Obsługa 360°',
    title: 'W Hiszpanii kupujesz. My pilnujemy reszty.',
    lists: [
      [
        'Wyszukanie i selekcja ofert',
        'Weryfikacja dokumentów i obciążeń',
        'Koordynacja prawnika i notariusza',
      ],
      [
        'NIE, rachunek bankowy i pełnomocnictwa',
        'Wsparcie w finansowaniu',
        'Odbiór i opieka po zakupie',
      ],
    ],
  },

  safety: {
    label: 'Bezpieczeństwo formalne',
    title: 'Bez skrótów. Bez ukrytych kosztów.',
    text: 'Przed decyzją otrzymujesz jasny obraz stanu prawnego, harmonogramu i wszystkich kosztów zakupu. Dokumenty omawiamy po polsku.',
    rows: [
      { key: 'Spółka', value: COMPANY.legalName },
      { key: 'NIP', value: COMPANY.nip },
      { key: 'KRS', value: COMPANY.krs },
    ],
  },

  reviews: {
    label: 'Opinie klientów',
    title: 'Zaufanie potwierdzone w Google',
    text: 'Kwadrat Nieruchomości obsługuje klientów w Polsce od lat. Te same standardy przenosimy do Hiszpanii.',
    rating: {
      label: 'Ocena Google',
      value: '4,9',
      scale: '/ 5',
      note: 'Na podstawie 120 opinii w wizytówce Google',
    },
    // Cudzysłowy „ ” dokłada szablon. Wykrzyknik w opinii 1 zostaje: to cytat klienta.
    quotes: [
      {
        text: 'Chciałabym wyrazić szczerą wdzięczność pani Marzenie za wysoki profesjonalizm, odpowiedzialność i troskliwe podejście do klienta. Na każdym etapie transakcji czułam jej pełne zaangażowanie, kompetencję i chęć pomocy. Gorąco polecam!',
        author: 'Anna Nik',
        meta: '3 miesiące temu · opinia Google',
      },
      {
        text: 'Polecam współpracę, usługi na wysokim poziomie. Pracowałem z panem Arturem Szparagą i jestem bardzo zadowolony.',
        author: 'Kanan Mammadov',
        meta: '4 lata temu · opinia Google',
      },
    ],
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
    cta: { label: 'Poznaj Kwadrat Nieruchomości', href: COMPANY.website },
    form: {
      name: 'Imię i nazwisko',
      email: 'E-mail',
      interest: 'Co Cię interesuje?',
      interestPlaceholder: 'Wybierz cel zakupu',
      interestOptions: ['Inwestycja pod wynajem', 'Dom na wypoczynek', 'Przeprowadzka na stałe'],
      message: 'Wiadomość',
      submit: 'Wyślij zapytanie',
      // DO POTWIERDZENIA: docs/copy.md podaje zgodę tylko przy poradniku, używamy jej 1:1 także tutaj
      consent:
        'Zapisując się, zgadzasz się na kontakt od Kwadrat Nieruchomości w sprawie Twojego zapytania. Nie wysyłamy newsletterów.',
      // NOWE, DO AKCEPTACJI: komunikat po wysłaniu
      success: 'Dziękujemy. Zapytanie zostało wysłane.',
      subject: 'Zapytanie ze strony slonecznahiszpania.pl',
    },
  },

  // NOWE, DO AKCEPTACJI: komunikaty wspólne dla obu formularzy
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
