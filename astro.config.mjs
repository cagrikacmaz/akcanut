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
      provider: fontProviders.google(),
      name: 'Noto Serif Display',
      cssVariable: '--font-display',
      weights: [700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['serif'],
      display: 'swap',
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
