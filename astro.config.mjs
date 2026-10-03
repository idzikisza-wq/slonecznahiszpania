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
});
