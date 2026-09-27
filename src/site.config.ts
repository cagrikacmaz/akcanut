/**
 * Site-wide settings. Everything language-specific lives in src/i18n.
 */
export const siteConfig = {
  /**
   * Show the dashed TODO tags that mark missing content (photos, stockists).
   * Keep true during development; set to false for the public launch.
   */
  showTodos: true,

  /**
   * Languages that are live. The switcher, hreflang tags and sitemap only list these.
   * Add 'tr' and 'sw' once their files have been reviewed.
   */
  publishedLocales: ['en'] as const satisfies readonly ('en' | 'tr' | 'sw')[],

  contacts: {
    turkiye: { name: 'Çağrı Kaçmaz', phone: '+90 536 329 78 78', whatsapp: '905363297878' },
    nairobi: { name: 'Ahmed Mwangi Hassan', phone: '+254 706 381 401', whatsapp: '254706381401' },
    email: 'cagrikacmaz91@gmail.com',
  },

  /** Town centre of Akçakoca. The site never marks the orchard itself. */
  akcakoca: { lat: 41.0867, lon: 31.1167 },

  brandProfile: { file: 'downloads/akcanut-brand-profile.pdf', pages: 6 },
};
