import type { APIRoute } from 'astro';

// Crawlers only read robots.txt at the domain root, so this file takes effect once the
// site moves to its own domain (akcanut.com). On the GitHub project page it is harmless.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL}sitemap.xml`, site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
