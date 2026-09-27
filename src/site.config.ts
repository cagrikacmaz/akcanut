/**
 * Site-wide settings. Everything language-specific lives in src/i18n.
 */
export const siteConfig = {
  /**
   * Show the dashed TODO tags that mark missing content (photos, stockists).
   * Keep true during development; set to false for the public launch.
   */
  showTodos: false,

  /**
   * Languages that are live. The language menu, hreflang tags and sitemap list these.
   */
  publishedLocales: ['en', 'tr', 'sw'] as const satisfies readonly ('en' | 'tr' | 'sw')[],

  /**
   * Show languages that are drafted but not yet published, for local testing only:
   * always in `npm run dev`, and in a build started with PREVIEW_LANGUAGES=true.
   * The deploy workflow never sets it, so drafts stay out of the published site.
   */
  previewLanguages:
    import.meta.env.DEV || (typeof process !== 'undefined' && process.env.PREVIEW_LANGUAGES === 'true'),

  contacts: {
    turkiye: { name: 'Çağrı Kaçmaz', phone: '+90 536 329 78 78', whatsapp: '905363297878' },
    nairobi: { name: 'Ahmed Mwangi Hassan', phone: '+254 706 381 401', whatsapp: '254706381401' },
    email: 'cagrikacmaz91@gmail.com',
  },

  /** Town centre of Akçakoca. The site never marks the orchard itself. */
  akcakoca: { lat: 41.0867, lon: 31.1167 },

  brandProfile: { file: 'downloads/akcanut-brand-profile.pdf', pages: 6 },
};
