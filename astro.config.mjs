// @ts-check
import { defineConfig } from 'astro/config';

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
