/**
 * Kiswahili strings, for Kenyan readers (native review done, 2026).
 * Keys must match en.ts exactly (checked at build time). Placeholders such as {name}
 * are filled in by the components and must stay as they are.
 *
 * Conventions: "hazelnut" is kept as a loanword and kernels are "kokwa"; a lot is
 * "shehena"; running text uses "Uturuki" while the brand tagline keeps "Türkiye";
 * units follow Kenyan usage ("kilo 200", "tani 1", "mm 11 hadi 13").
 */
import type { Dictionary } from './en';

const sw: Dictionary = {
  langName: 'Kiswahili',

  meta: {
    title: 'AKCANUT · Hazelnut bora kutoka Akçakoca, Uturuki',
    description:
      'Kokwa mbichi za asili za hazelnut kutoka shamba la familia huko Akçakoca, pwani ya Bahari Nyeusi ya Uturuki. Asili moja, kila shehena hupimwa, kwa Kenya na Afrika Mashariki.',
    ogTitle: 'AKCANUT · Asili inayoonekana.',
    ogDescription:
      'Hazelnut bora kutoka Akçakoca, pwani ya Bahari Nyeusi ya Uturuki. Kokwa mbichi za asili, kila shehena hupimwa, kwa Kenya na Afrika Mashariki.',
    ogImageAlt: 'Nembo ya AKCANUT kando ya kokwa mbichi za hazelnut.',
    ogLocale: 'sw_KE',
  },

  a11y: {
    skipLink: 'Ruka hadi maudhui',
    homeLink: 'AKCANUT, rudi juu',
    mainNav: 'Menyu kuu',
    menuOpen: 'Menyu',
    menuClose: 'Funga',
    languages: 'Lugha',
    changeLanguage: 'Badilisha lugha',
    viewInLanguage: 'Tazama kwa Kiswahili',
    newTab: '(hufunguka kwenye kichupo kipya)',
  },

  nav: {
    journey: 'Safari',
    origin: 'Asili',
    product: 'Bidhaa',
    quality: 'Ubora',
    trade: 'Biashara',
    contact: 'Mawasiliano',
  },

  hero: {
    logoAlt: 'Nembo ya AKCANUT: Akçakoca Hazelnuts, Türkiye',
    title: 'Asili inayoonekana.',
    lead: 'Hazelnut bora kutoka Akçakoca, kwenye pwani ya Bahari Nyeusi ya Uturuki.',
    ctaOrigin: 'Gundua asili',
    ctaTrade: 'Kwa wanunuzi wa biashara',
  },

  journey: {
    eyebrow: 'Safari',
    title: 'Kutoka shambani hadi Nairobi',
    intro: 'Fuata shehena moja kutoka shamba la familia huko Akçakoca hadi Nairobi, kwa hatua saba.',
    iconAlt: 'Nembo ya AKCANUT: vilima na mawimbi ya Bahari Nyeusi ndani ya ganda la hazelnut.',
    mapLabel: 'Ramani ya njia: kutoka Akçakoca hadi Istanbul, kisha kwa ndege hadi Nairobi na kwa meli hadi Mombasa.',
    places: {
      akcakoca: 'Akçakoca',
      istanbul: 'Istanbul',
      nairobi: 'Nairobi',
      mombasa: 'Mombasa',
    },
    areas: {
      blackSea: 'Bahari Nyeusi',
      marmara: 'Bahari ya Marmara',
      indianOcean: 'Bahari Hindi',
      turkiye: 'Uturuki',
      kenya: 'Kenya',
    },
    legend: {
      road: 'Akçakoca hadi Istanbul',
      air: 'Kwa ndege · kuanzia kilo 200',
      sea: 'Kwa meli · kuanzia tani 1',
    },
    steps: [
      {
        meta: 'Agosti na Septemba',
        title: 'Mavuno',
        text: 'Familia huvuna mazao kutoka shamba lake yenyewe.',
        alt: 'Wanafamilia wakikusanya hazelnut chini ya miti ya shamba huko Akçakoca.',
      },
      {
        meta: 'Shambani',
        title: 'Kukausha juani',
        text: 'Hazelnut hutandazwa nje na kukaushwa kwa jua, kisha hujazwa kwenye magunia.',
        alt: 'Hazelnut zilizotandazwa juu ya maturubai zikikauka juani, na magunia yaliyojaa mbele.',
      },
      {
        meta: 'Ukubwa wa kawaida mm 11 hadi 13',
        title: 'Kuvunja na kuchambua kwa mkono',
        text: 'Zikishakauka, hazelnut huvunjwa na kokwa huchambuliwa kwa mkono.',
        alt: 'Picha ya karibu ya maganda ya hazelnut yaliyovunjika pamoja na hazelnut nzima.',
      },
      {
        meta: 'Kila shehena',
        title: 'Kupimwa maabarani',
        text: 'Kila shehena hupimwa aflatoksini katika maabara iliyoidhinishwa. Matokeo huwa ndani ya viwango vya Umoja wa Ulaya, na cheti cha uchambuzi huambatana na shehena.',
        alt: 'Bika za maabara zinazoonyesha ndani na pipeti juu ya meza nyeupe.',
      },
      {
        meta: 'Hudumu miezi 12 bila kufunguliwa',
        title: 'Kufungwa kwa vakyumu',
        text: 'Kokwa hufungwa kwa vakyumu katika pakiti za kilo 1, 2.5 na 5, na za kilo 10 kwa jumla ukiomba.',
        alt: 'Pakiti mbili za vakyumu zenye kokwa mbichi za asili za hazelnut.',
      },
      {
        meta: 'FOB au FCA',
        title: 'Istanbul',
        text: 'Kila shehena husafirishwa kutoka Istanbul kwa masharti ya FOB au FCA, pamoja na hati zake za kusafirisha nje.',
        alt: 'Daraja linaloning’inia juu ya mlangobahari wa Bosphorus huko Istanbul, pamoja na meli ya mizigo na boti ya abiria majini.',
      },
      {
        meta: 'Kwa ndege na kwa meli',
        title: 'Nairobi',
        text: 'Oda za majaribio husafirishwa kwa ndege hadi Nairobi kuanzia kilo 200; usafirishaji kwa meli hadi Mombasa huanzia tani moja. Kwa kuwa tuna familia nchini Kenya, tunaweza kuwepo Nairobi kwa maonjo na uzinduzi.',
        alt: 'Majengo marefu ya Nairobi yakionekana nyuma ya miti ya migunga na nyasi.',
      },
    ],
  },

  origin: {
    eyebrow: 'Asili',
    title: 'Kutoka vilima vya Bahari Nyeusi vya Akçakoca',
    lead: 'AKCANUT hutoka katika shamba moja la familia huko Akçakoca, mkoa wa Düzce.',
    familyTitle: 'Shamba la familia',
    familyText:
      'Familia imekuwa ikilima hazelnut hapa kwa vizazi vingi. Shamba huzalisha tani 4 hadi 5 za hazelnut zenye maganda kwa mwaka, na wakulima jirani wa wilaya hiyo hiyo huongeza ugavi pale unapohitajika.',
    registeredTitle: 'Asili iliyosajiliwa',
    registeredText:
      'Akçakoca Sarı Fındığı ilisajiliwa kama kiashiria cha kijiografia nchini Uturuki mwaka 2019. Shamba la familia liko ndani ya eneo hili la kilimo.',
    statement: 'Hazelnut ya Kituruki yenye mahali, familia na hadithi yake.',
    canopyAlt: 'Miti ya hazelnut katika shamba la familia, Akçakoca.',
    canopyCaption: 'Shamba la familia, Akçakoca',
    hillsAlt: 'Hazelnut zikikauka nje chini ya vilima vya kijani na anga safi.',
    hillsCaption: 'Mavuno na ukaushaji shambani',
    mapTitle: 'Inapolimwa',
    mapCaption: 'Akçakoca, Düzce, kwenye pwani ya Bahari Nyeusi ya Uturuki.',
    mapLabel: 'Ramani shirikishi ya Akçakoca',
    mapLink: 'Fungua ramani kwenye OpenStreetMap',
    nameTitle: 'Jina',
    nameText:
      'AKÇA inakumbusha sarafu ya kale ya fedha na mji wa Akçakoca wenyewe. NUT ni neno la Kiingereza linaloeleza kilichomo ndani.',
  },

  product: {
    eyebrow: 'Bidhaa',
    title: 'Kokwa mbichi za asili za hazelnut',
    lead: 'Zikiwa na ngozi yake, hazijakaangwa wala kutiwa chumvi, kutoka mavuno ya 2026.',
    photoAlt: 'Picha ya karibu ya kokwa mbichi za hazelnut zenye ngozi ya kahawia, ndani ya pakiti ya vakyumu inayoonyesha ndani.',
    rawTitle: 'Maana ya “mbichi ya asili”',
    rawText:
      'Ni kokwa kama inavyotoka kwenye ganda, iliyokaushwa tu na si zaidi. Haikaangwi wala haitiwi chumvi, na ngozi yake nyembamba ya kahawia hubaki; kinachofuata ni uamuzi wako.',
    homeTitle: 'Nyumbani',
    home: [
      {
        title: 'Kukaanga kwenye kikaango',
        text: 'Pasha kikaango kikavu kwenye moto wa wastani. Weka kokwa safu moja na uzigeuze mara kwa mara kwa dakika 5 hadi 7, hadi zitoe harufu nzuri na kuwa na rangi ya dhahabu kidogo, kisha zimimine kwenye sahani zipoe. Ukitaka zisizo na ngozi, zisugue kwa kitambaa safi cha jikoni zikiwa bado na joto.',
      },
      {
        title: 'Katika mapishi ya kuoka',
        text: 'Zikate na uziongeze kwenye keki, biskuti na mkate, au uzisage kwa ajili ya tart na vitafunio vya kuoka. Kuzikaanga kwanza huongeza ladha.',
      },
      {
        title: 'Pamoja na kahawa',
        text: 'Bakuli dogo la kokwa zilizokaangwa pamoja na kahawa, kwa wageni au kwa ajili yako mwenyewe.',
      },
    ],
    storageTitle: 'Kuhifadhi',
    storageText:
      'Pakiti ambazo hazijafunguliwa hudumu miezi 12 mahali pakavu na penye ubaridi. Ukishafungua, hamishia kokwa kwenye chombo kisichopitisha hewa na uziweke mahali pakavu na penye ubaridi. Jikoni kukiwa na joto, jokofu ndipo mahali pazuri zaidi.',
    findTitle: 'Mahali pa kuipata',
    findText: 'Unatafuta AKCANUT jijini Nairobi?',
    findCta: 'Tutumie ujumbe WhatsApp',
    findTodo: 'Maduka: ongeza maduka yaliyothibitishwa yakipatikana',
  },

  quality: {
    eyebrow: 'Ubora',
    title: 'Asili moja. Kilimo cha familia. Kila shehena hupimwa.',
    lead: 'Vipimo vilivyo wazi, na kila shehena hupimwa kabla ya kupakiwa.',
    specs: [
      { label: 'Aina', value: 'Kokwa mbichi za asili', note: 'Zenye ngozi, hazijakaangwa, bila chumvi. Mavuno ya 2026.' },
      { label: 'Ukubwa', value: 'mm 11 hadi 13', note: 'mm 13 hadi 15 ukiomba.' },
      { label: 'Unyevu', value: 'Kiwango cha juu 6%', note: 'Hukaushwa shambani.' },
      {
        label: 'Upimaji',
        value: 'Aflatoksini, kila shehena',
        note: 'Maabara iliyoidhinishwa, ndani ya viwango vya Umoja wa Ulaya, cheti cha uchambuzi kwa kila shehena.',
      },
      { label: 'Ufungaji', value: 'Pakiti za vakyumu za kilo 1, 2.5 na 5', note: 'Kilo 10 kwa jumla kwa vakyumu ukiomba.' },
      { label: 'Muda wa kudumu', value: 'Miezi 12', note: 'Bila kufunguliwa, mahali pakavu na penye ubaridi.' },
    ],
  },

  trade: {
    eyebrow: 'Kwa wanunuzi wa biashara',
    title: 'Moja kwa moja kutoka kwa wakulima wanaolijua shamba',
    lead: 'Tunasambaza kokwa mbichi za asili za hazelnut kutoka Akçakoca kwa maduka ya hadhi ya juu, hoteli na wanunuzi wa vyakula maalum nchini Kenya na Afrika Mashariki. Upimaji wa kila shehena, vipimo vilivyo wazi na ufungaji wa vakyumu vinakidhi mahitaji ya hoteli na maduka ya hadhi ya juu.',
    whoTitle: 'Tunaowasambazia',
    who: ['Maduka ya hadhi ya juu', 'Hoteli', 'Vyakula maalum'],
    howTitle: 'Tunavyofanya kazi',
    how: [
      { term: 'Masharti', detail: 'FOB au FCA Istanbul' },
      { term: 'Oda za majaribio', detail: 'Kuanzia kilo 200, kwa ndege hadi Nairobi' },
      { term: 'Usafirishaji kwa meli', detail: 'Kuanzia tani 1, hadi Mombasa' },
      { term: 'Hati', detail: 'Cheti cha uchambuzi na hati za kusafirisha nje kwa kila shehena' },
      { term: 'Sampuli', detail: 'Zinapatikana ukiomba' },
      {
        term: 'Ugavi',
        detail: 'Shamba la familia pamoja na wakulima jirani wa wilaya hiyo hiyo, wote chini ya kiwango kimoja cha ukubwa na upimaji',
      },
      { term: 'Ufungaji', detail: 'Pakiti za vakyumu za kilo 1, 2.5 na 5; kilo 10 kwa jumla ukiomba' },
      { term: 'Msimbo wa HS', detail: '0802.22' },
      { term: 'Jijini Nairobi', detail: 'Maonjo, ziara za hoteli na usaidizi wa uzinduzi, ana kwa ana' },
    ],
    pricing: 'Bei hutolewa ukiomba.',
    sampleCta: 'Omba sampuli',
    emailPrompt: 'Unapendelea barua pepe?',
    emailSubject: 'Ombi la sampuli: kokwa za hazelnut za AKCANUT',
    kenyaPrompt: 'Uko Kenya?',
    kenyaCta: 'Mtumie ujumbe Ahmed Mwangi Hassan, mtu wetu wa mawasiliano jijini Nairobi.',
    downloadTitle: 'Wasifu wa chapa na mwongozo wa utambulisho',
    downloadMeta: 'PDF kwa Kiingereza, kurasa {pages}, {size}',
    downloadCta: 'Pakua',
  },

  contact: {
    eyebrow: 'Mawasiliano',
    title: 'Wasiliana nasi moja kwa moja',
    lead: 'Tutumie ujumbe WhatsApp au barua pepe. WhatsApp hufunguka ukiwa na ujumbe mfupi ulio tayari kutumwa.',
    turkiyeLabel: 'Uturuki',
    nairobiLabel: 'Mawasiliano Nairobi',
    whatsapp: 'WhatsApp',
    whatsappLabel: 'Mtumie {name} ujumbe WhatsApp',
    emailLabel: 'Barua pepe',
    emailSubject: 'Ulizo kuhusu AKCANUT',
  },

  whatsapp: {
    general: 'Habari, nimeiona AKCANUT kwenye tovuti yenu na ningependa kujua zaidi kuhusu hazelnut zenu kutoka Akçakoca.',
    nairobi: 'Habari Ahmed, nimeiona AKCANUT kwenye tovuti na ningependa kujua zaidi kuhusu hazelnut zenu.',
    sample:
      'Habari, ningependa kuomba sampuli ya kokwa mbichi za asili za hazelnut za AKCANUT.\nKampuni:\nJiji:\nKiasi kinachokadiriwa:',
    whereToBuy: 'Habari, naweza kununua hazelnut za AKCANUT wapi jijini Nairobi?',
  },

  footer: {
    tagline: 'Akçakoca Hazelnuts · Türkiye',
    languages: 'Lugha',
    copyright: '© {year} AKCANUT',
    backToTop: 'Rudi juu',
    photoCredits: 'Picha za safari kwa hatua ya 3, 4, 6 na 7 ni za {names} kupitia Unsplash.',
  },

  notFound: {
    title: 'Ukurasa haupatikani',
    text: 'Ukurasa huu haupo.',
    home: 'Nenda kwenye ukurasa wa mwanzo',
  },

  todo: 'TODO',

  schema: {
    organizationDescription:
      'Kokwa mbichi za asili za hazelnut kutoka asili moja, shamba la familia huko Akçakoca, Uturuki, kwa Kenya na Afrika Mashariki.',
    productName: 'Kokwa mbichi za asili za hazelnut za AKCANUT',
    productDescription:
      'Kokwa mbichi za asili za hazelnut, zenye ngozi, hazijakaangwa wala kutiwa chumvi, kutoka mavuno ya 2026 huko Akçakoca, Uturuki. Ukubwa wa kawaida mm 11 hadi 13, unyevu wa juu zaidi 6%, kila shehena hupimwa aflatoksini.',
  },
};

export default sw;
