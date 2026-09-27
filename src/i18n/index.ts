import { siteConfig } from '../site.config';
import en, { type Dictionary } from './en';

// Other language files are picked up when they exist (tr.ts, sw.ts).
const otherFiles = import.meta.glob<{ default: Dictionary }>(['./tr.ts', './sw.ts'], { eager: true });

export const locales = ['en', 'tr', 'sw'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Language files that exist. A language only goes live once listed in siteConfig.publishedLocales. */
const dictionaries: Partial<Record<Locale, Dictionary>> = {
  en,
  ...Object.fromEntries(
    Object.entries(otherFiles).map(([file, mod]) => [file.replace(/^\.\/|\.ts$/g, ''), mod.default]),
  ),
};

/** Live languages, in switcher order. */
export const publishedLocales: Locale[] = locales.filter(
  (l) => (siteConfig.publishedLocales as readonly string[]).includes(l) && dictionaries[l],
);

/**
 * Languages that get a page and appear in the language menu: the published ones, plus any
 * drafted file when previewing locally. Sitemap and hreflang only ever use publishedLocales.
 */
export const availableLocales: Locale[] = siteConfig.previewLanguages
  ? locales.filter((l) => dictionaries[l])
  : publishedLocales;

/** Native language names for the switcher. */
export const languageNames: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
  sw: 'Kiswahili',
};

export function getDictionary(locale: Locale): Dictionary {
  const dict = dictionaries[locale];
  if (!dict) throw new Error(`No language file for "${locale}"`);
  return dict;
}

/** Home path for a language, including the base path: /akcanut/, /akcanut/tr/ */
export function localePath(locale: Locale): string {
  const base = import.meta.env.BASE_URL;
  return locale === defaultLocale ? base : `${base}${locale}/`;
}

/** Path to a file in /public, including the base path. */
export function publicPath(file: string): string {
  return `${import.meta.env.BASE_URL}${file.replace(/^\//, '')}`;
}

/** Fills {placeholders} in a string. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(email: string, subject: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

/**
 * Every language file must mirror the English keys, so a missing or misspelt key
 * fails the build instead of showing an empty string on the site.
 */
function assertSameShape(reference: unknown, candidate: unknown, path: string): void {
  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate) || candidate.length !== reference.length) {
      throw new Error(`i18n: "${path}" must be a list of ${reference.length} items`);
    }
    reference.forEach((item, i) => assertSameShape(item, candidate[i], `${path}[${i}]`));
    return;
  }
  if (reference && typeof reference === 'object') {
    if (!candidate || typeof candidate !== 'object') throw new Error(`i18n: "${path}" is missing`);
    const refKeys = Object.keys(reference).sort();
    const candKeys = Object.keys(candidate).sort();
    const missing = refKeys.filter((k) => !candKeys.includes(k));
    const extra = candKeys.filter((k) => !refKeys.includes(k));
    if (missing.length || extra.length) {
      throw new Error(`i18n: "${path}" missing [${missing.join(', ')}], unexpected [${extra.join(', ')}]`);
    }
    for (const key of refKeys) {
      assertSameShape((reference as Record<string, unknown>)[key], (candidate as Record<string, unknown>)[key], `${path}.${key}`);
    }
    return;
  }
  if (typeof candidate !== 'string' || candidate.trim() === '') throw new Error(`i18n: "${path}" is empty`);
}

for (const [locale, dict] of Object.entries(dictionaries)) {
  if (locale !== defaultLocale) assertSameShape(en, dict, locale);
}

export type { Dictionary };
