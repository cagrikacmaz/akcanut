import type { APIRoute } from 'astro';
import { localePath, publishedLocales } from '../i18n';

// One URL per live language, each listing its alternates for search engines.
export const GET: APIRoute = ({ site }) => {
  const url = (locale: (typeof publishedLocales)[number]) => new URL(localePath(locale), site).href;
  const alternates = (indent: string) =>
    publishedLocales.length > 1
      ? publishedLocales
          .map((l) => `${indent}<xhtml:link rel="alternate" hreflang="${l}" href="${url(l)}"/>`)
          .concat(`${indent}<xhtml:link rel="alternate" hreflang="x-default" href="${url('en')}"/>`)
          .join('\n')
      : '';

  const entries = publishedLocales
    .map((l) => ['  <url>', `    <loc>${url(l)}</loc>`, alternates('    '), '  </url>'].filter(Boolean).join('\n'))
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
