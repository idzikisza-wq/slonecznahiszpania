// @ts-check
import { defineConfig } from 'astro/config';

// Produkcja na Cloudflare Pages (gałąź main) bez klucza Web3Forms: formularze w trybie demo pokazywałyby
// sukces bez wysyłki i zgłoszenia by przepadały. Build przerywa się z instrukcją. Podglądy innych gałęzi
// i build lokalny działają dalej w trybie demo.
if (process.env.CF_PAGES_BRANCH === 'main' && !process.env.PUBLIC_WEB3FORMS_KEY) {
  throw new Error(
    'Brak PUBLIC_WEB3FORMS_KEY. W Cloudflare Pages: Settings, Variables and Secrets, dodaj PUBLIC_WEB3FORMS_KEY ' +
      '(klucz z web3forms.com) dla Production i ponów wdrożenie. Szczegóły w README.',
  );
}

export default defineConfig({
  site: 'https://www.slonecznahiszpania.pl',
  trailingSlash: 'never',
  build: {
    // /polityka-prywatnosci zamiast /polityka-prywatnosci/ (Cloudflare Pages)
    format: 'file',
    // CSS jest mały: inline w HTML, bez dodatkowego żądania blokującego render
    inlineStylesheets: 'always',
  },
  devToolbar: { enabled: false },
  vite: {
    build: {
      // Minifikator CSS zamienia max-width na zapis (width<=…), którego Safari do 16.3 nie zna:
      // starsze iPhone'y dostałyby układ komputerowy. Niższy cel zostawia klasyczny zapis.
      cssTarget: ['safari14', 'chrome100', 'firefox100', 'edge100'],
    },
  },
});
