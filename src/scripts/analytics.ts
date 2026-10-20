// Google Analytics 4 po zgodzie (decyzja Idziego 6.10.2026). Działa tylko z identyfikatorem
// PUBLIC_GA_ID (atrybut data-ga na <html>). Bez zgody nic nie ładuje i nie zapisuje cookies.
// „Akceptuję” ładuje gtag.js tylko do statystyk: reklamy i Google Signals wyłączone, cookies
// na 13 miesięcy. „Odrzucam” po wcześniejszej zgodzie wyłącza wysyłkę i usuwa cookies _ga.
// Wybór zostaje w localStorage (kw-zgoda: tak albo nie). „Ustawienia cookies” w stopce otwiera
// baner ponownie. Zdarzenia: generate_lead (formularz naprawdę wysłany, w forms.ts przez
// window.kwTrack) i phone_click (link tel:).

type Params = Record<string, unknown>;
type Win = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  kwTrack?: (name: string, params?: Params) => void;
} & Record<string, unknown>;

const KEY = 'kw-zgoda';
const OPEN = 'zgoda-otwarta';
const root = document.documentElement;
const id = root.dataset.ga ?? '';
const win = window as unknown as Win;
const disableFlag = `ga-disable-${id}`;

const read = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

const write = (value: string) => {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // bez pamięci przeglądarki decyzja obowiązuje do końca wizyty
  }
};

let loaded = false;

function grant() {
  win[disableFlag] = false;
  if (loaded) {
    win.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    return;
  }
  loaded = true;
  win.dataLayer = win.dataLayer || [];
  win.gtag = function gtag() {
    // gtag.js oczekuje obiektu arguments, nie tablicy
    win.dataLayer!.push(arguments);
  };
  win.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  win.gtag('js', new Date());
  win.gtag('config', id, {
    cookie_expires: 13 * 30 * 24 * 60 * 60,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.append(script);
}

// Usuwa cookies _ga i _ga_* z bieżącej domeny i domen nadrzędnych (Google zapisuje je na najwyższej)
function removeCookies() {
  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));
  const parts = location.hostname.split('.');
  const domains = parts.map((_, index) => parts.slice(index).join('.')).filter((domain) => domain.includes('.'));
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
  }
}

function deny() {
  win[disableFlag] = true;
  win.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  removeCookies();
}

function decide(value: 'tak' | 'nie', banner: Element | null) {
  write(value);
  const hadFocus = banner?.contains(document.activeElement);
  root.classList.remove(OPEN);
  if (value === 'tak') grant();
  else deny();
  // Baner znika: fokus wraca na początek strony, a nie w próżnię
  if (hadFocus) document.querySelector<HTMLElement>('.brand')?.focus();
}

if (id) {
  if (read() === 'tak') grant();

  win.kwTrack = (name, params) => {
    if (loaded && !win[disableFlag]) win.gtag?.('event', name, params);
  };

  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    if (!target) return;

    const choice = target.closest<HTMLElement>('[data-zgoda]');
    if (choice) {
      decide(choice.dataset.zgoda === 'tak' ? 'tak' : 'nie', choice.closest('.zgoda'));
      return;
    }

    if (target.closest('[data-zgoda-ustawienia]')) {
      root.classList.add(OPEN);
      const banner = document.querySelector<HTMLElement>('.zgoda');
      banner?.scrollIntoView({ block: 'start' });
      banner?.querySelector<HTMLElement>('[data-zgoda="tak"]')?.focus();
      return;
    }

    const tel = target.closest('a[href^="tel:"]');
    if (tel) {
      const place = tel.closest('section[id]')?.id ?? tel.closest('header, footer')?.tagName.toLowerCase();
      win.kwTrack?.('phone_click', { link_location: place });
    }
  });
}
