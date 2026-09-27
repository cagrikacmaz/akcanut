# AKCANUT

Website for AKCANUT, single-origin raw hazelnut kernels from a family orchard in
Akçakoca, Düzce, on Türkiye's Black Sea coast, supplied to Kenya and East Africa.

A static one-page site built with [Astro](https://astro.build), in English (at `/`),
with Turkish (`/tr/`) and Swahili (`/sw/`) to follow. No backend, no forms, no
analytics and no cookies. Contact runs through WhatsApp links and email.

Live address (GitHub Pages): https://cagrikacmaz.github.io/akcanut/

## Working on the site

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev       # http://localhost:4321/akcanut/
npm run build     # production build into dist/
npm run preview   # serve the production build
```

## Where things live

```
src/
  i18n/en.ts          every English string: copy, alt text, meta tags, WhatsApp messages
  i18n/index.ts       languages, helpers, and the check that all language files match
  site.config.ts      contacts, published languages, the TODO switch
  components/         one component per section; journey/ holds the scroll story
  scripts/            small browser scripts: journey steps, Leaflet map, mobile menu
  styles/             design tokens (brand colours, type scale) and global styles
  assets/             optimised logos, photos and fonts
public/               favicons, sharing image, brand profile PDF, web manifest
scripts/              one-off tools that prepare assets (see below)
```

### Editing text

All visible text is in `src/i18n/en.ts`. Change it there and nothing else needs
touching. House rules for the copy, taken from the brand guide:

- Factual, origin-led, quietly premium. British spelling.
- No em dashes, no health or wellness claims, no rustic clichés.
- Never publish prices, payment terms or exclusivity terms.
- Only facts that can be backed up. Missing information gets a TODO, not a guess.

### Settings

`src/site.config.ts`:

- `showTodos`: shows the dashed TODO tags that mark missing content. **Set it to
  `false` for the public launch.**
- `publishedLocales`: the live languages. The language switcher, hreflang tags and
  sitemap only list these.
- `contacts`: names, phone numbers and WhatsApp numbers. Sample requests go to the
  company contact in Türkiye; the "Where to find it" consumer message goes to Nairobi.

## Adding Turkish and Swahili

1. Copy `src/i18n/en.ts` to `tr.ts` or `sw.ts` and translate the values. Keep every
   key: the build fails if a key is missing, empty or misspelt.
2. Register the file in the `dictionaries` object in `src/i18n/index.ts`.
3. Add the page: `src/pages/tr/index.astro` containing `<HomePage locale="tr" />`
   (same pattern as `src/pages/index.astro`).
4. Add the language to `publishedLocales` in `src/site.config.ts`.

The Swahili file is marked "native review needed" at the top until a native
speaker has checked it.

## Assets

The original files live in `./AkcanutAssets`, which is kept out of git. Everything
derived from them is committed, so these scripts only need to run again when an
original changes:

| Command | What it does |
| --- | --- |
| `npm run assets` | Trims the logos, crops the photos, builds favicons and the 1200x630 sharing image |
| `npm run line-art` | Traces the hill and wave lines from the icon for the opening animation |
| `npm run map` | Builds the journey maps from Natural Earth coastlines |
| `python scripts/optimize-pdf.py` | Writes the lighter brand profile PDF (needs `pip install pymupdf`) |

Photos are only cropped and compressed, never retouched. The logos are used as
supplied, trimmed of empty margins.

Fonts: Noto Serif Display Bold is self-hosted from `src/assets/fonts` as its Latin
file plus a small subset with the Turkish letters Ğ ğ İ Ş ş (licence in `OFL.txt`).
Lato is downloaded from Google Fonts at build time and served from this site.

## Deploying to GitHub Pages

Every push to `main` builds and deploys the site through
`.github/workflows/deploy.yml`.

First time only, in the GitHub repository: **Settings → Pages → Build and
deployment → Source: GitHub Actions**.

## Moving to a custom domain (akcanut.com)

1. Create `public/CNAME` containing one line: `akcanut.com`
2. In `astro.config.mjs`, set `site: 'https://akcanut.com'` and delete the `base` line.
   Internal links, the sitemap, hreflang tags and the sharing image all follow
   automatically.
3. At the domain registrar, point the domain at GitHub Pages:
   - `A` records for `akcanut.com`: `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - `AAAA` records (optional): `2606:50c0:8000::153`, `2606:50c0:8001::153`,
     `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` record for `www`: `cagrikacmaz.github.io`
4. In **Settings → Pages**, enter `akcanut.com` as the custom domain and tick
   **Enforce HTTPS** once the certificate is ready.
5. Push. `robots.txt` only takes effect at the root of a domain, so it starts
   working after this move.

## Open items

- [ ] Photo of cracking and hand sorting (journey step 3)
- [ ] Photo of lab testing or a certificate of analysis (journey step 4)
- [ ] Stockists in Nairobi, once confirmed ("Where to find it")
- [ ] A higher-resolution photo of loose kernels: the current kernel photos are
      about 490 px wide, so they are never shown larger than that
- [ ] Turkish and Swahili versions; native review of the Swahili file
- [ ] Set `showTodos` to `false` before launch

## Credits

- Coastlines: [Natural Earth](https://www.naturalearthdata.com) (public domain)
- Map tiles: © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
- Map library: [Leaflet](https://leafletjs.com) (BSD 2-Clause)
- Fonts: Noto Serif Display and Lato (SIL Open Font License 1.1)
