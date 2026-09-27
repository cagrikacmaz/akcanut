// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// Served as a GitHub Pages project page: https://cagrikacmaz.github.io/akcanut/
// Moving to a custom domain (akcanut.com) is described in README.md:
// set `site` to the domain and remove `base`.
export default defineConfig({
  site: 'https://cagrikacmaz.github.io',
  base: '/akcanut',
  trailingSlash: 'always',
  // Keep HTML whitespace rules so inline text and links never run together.
  compressHTML: true,
  build: {
    format: 'directory',
    // One request less on slow connections: page CSS ships inside the HTML.
    inlineStylesheets: 'always',
  },
  i18n: {
    locales: ['en', 'tr', 'sw'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  fonts: [
    {
      // Self-hosted from src/assets/fonts (SIL Open Font License, see OFL.txt there).
      // Google's Latin Extended file for this face is 55 KB, so Turkish letters come
      // from a 1.5 KB subset that only loads when a page uses them.
      provider: fontProviders.local(),
      name: 'Noto Serif Display',
      cssVariable: '--font-display',
      fallbacks: ['serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/noto-serif-display-700-latin.woff2'],
            weight: 700,
            style: 'normal',
            display: 'swap',
            unicodeRange: [
              'U+0000-00FF',
              'U+0131',
              'U+0152-0153',
              'U+02BB-02BC',
              'U+02C6',
              'U+02DA',
              'U+02DC',
              'U+0304',
              'U+0308',
              'U+0329',
              'U+2000-206F',
              'U+20AC',
              'U+2122',
              'U+2191',
              'U+2193',
              'U+2212',
              'U+2215',
              'U+FEFF',
              'U+FFFD',
            ],
          },
          {
            src: ['./src/assets/fonts/noto-serif-display-700-turkish.woff2'],
            weight: 700,
            style: 'normal',
            display: 'swap',
            unicodeRange: ['U+011E-011F', 'U+0130', 'U+015E-015F'],
          },
        ],
      },
    },
    {
      provider: fontProviders.google(),
      name: 'Lato',
      cssVariable: '--font-body',
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
      display: 'swap',
    },
  ],
  devToolbar: { enabled: false },
});
