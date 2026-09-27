/**
 * Türkçe metinler. Anahtarlar en.ts ile birebir aynı olmalı (derleme sırasında denetlenir).
 *
 * Üslup: olgusal, kökene dayalı, sade ve seçkin. Uzun tire yok, sağlık iddiası yok.
 * Süslü parantez içindeki yer tutucular, örneğin {name}, bileşenler tarafından doldurulur.
 */
import type { Dictionary } from './en';

const tr: Dictionary = {
  langName: 'Türkçe',

  meta: {
    title: 'AKCANUT · Akçakoca’dan seçkin fındık',
    description:
      'Türkiye’nin Karadeniz kıyısındaki Akçakoca’da bir aile bahçesinden natürel iç fındık. Tek menşeli, her parti analizli; Kenya ve Doğu Afrika’ya tedarik ediliyor.',
    ogTitle: 'AKCANUT · Nereden geldiği belli.',
    ogDescription:
      'Türkiye’nin Karadeniz kıyısındaki Akçakoca’dan seçkin fındık. Natürel iç fındık, her parti analizli; Kenya ve Doğu Afrika için.',
    ogImageAlt: 'Çiğ iç fındıkların yanında AKCANUT logosu.',
    ogLocale: 'tr_TR',
  },

  a11y: {
    skipLink: 'İçeriğe geç',
    homeLink: 'AKCANUT, sayfanın başına dön',
    mainNav: 'Ana menü',
    menuOpen: 'Menü',
    menuClose: 'Kapat',
    languages: 'Dil',
    changeLanguage: 'Dili değiştir',
    viewInLanguage: 'Türkçe görüntüle',
    newTab: '(yeni sekmede açılır)',
  },

  nav: {
    journey: 'Yolculuk',
    origin: 'Köken',
    product: 'Ürün',
    quality: 'Kalite',
    trade: 'Ticari alım',
    contact: 'İletişim',
  },

  hero: {
    logoAlt: 'AKCANUT logosu: Akçakoca Hazelnuts, Türkiye',
    title: 'Nereden geldiği belli.',
    lead: 'Türkiye’nin Karadeniz kıyısındaki Akçakoca’dan seçkin fındık.',
    ctaOrigin: 'Kökenini keşfedin',
    ctaTrade: 'Ticari alıcılar için',
  },

  journey: {
    eyebrow: 'Yolculuk',
    title: 'Bahçeden Nairobi’ye',
    intro: 'Bir partiyi, Akçakoca’daki aile bahçesinden Nairobi’ye yedi adımda izleyin.',
    iconAlt: 'AKCANUT amblemi: fındık kabuğunun içinde tepeler ve Karadeniz’in dalgaları.',
    mapLabel: 'Rota haritası: Akçakoca’dan İstanbul’a, oradan havayoluyla Nairobi’ye ve denizyoluyla Mombasa’ya.',
    places: {
      akcakoca: 'Akçakoca',
      istanbul: 'İstanbul',
      nairobi: 'Nairobi',
      mombasa: 'Mombasa',
    },
    areas: {
      blackSea: 'Karadeniz',
      marmara: 'Marmara Denizi',
      indianOcean: 'Hint Okyanusu',
      turkiye: 'Türkiye',
      kenya: 'Kenya',
    },
    legend: {
      road: 'Akçakoca’dan İstanbul’a',
      air: 'Havayolu · 200 kg’dan itibaren',
      sea: 'Denizyolu · 1 tondan itibaren',
    },
    steps: [
      {
        meta: 'Ağustos ve Eylül',
        title: 'Hasat',
        text: 'Aile, ürünü kendi bahçesinden toplar.',
        alt: 'Akçakoca’daki bahçede ağaçların altında fındık toplayan aile üyeleri.',
      },
      {
        meta: 'Bahçenin başında',
        title: 'Güneşte kurutma',
        text: 'Fındıklar açık alana serilip güneşte kurutulur, ardından çuvallara doldurulur.',
        alt: 'Güneşte kurumak için brandalara serilmiş fındıklar, önde dolu çuvallar.',
      },
      {
        meta: 'Standart kalibre 11 ile 13 mm',
        title: 'Kırma ve elle ayıklama',
        text: 'Kuruyan fındıklar kırılır, iç fındıklar elle ayıklanır.',
        alt: 'Kırık fındık kabukları arasında bütün fındıkların yakın çekimi.',
      },
      {
        meta: 'Her parti',
        title: 'Laboratuvar analizi',
        text: 'Her parti, akredite bir laboratuvarda aflatoksin analizinden geçer. Sonuçlar AB limitleri içindedir ve analiz sertifikası partiyle birlikte gider.',
        alt: 'Beyaz bir tezgâhta şeffaf laboratuvar beherleri ve bir pipet.',
      },
      {
        meta: 'Açılmadan 12 ay dayanır',
        title: 'Vakumlu paketleme',
        text: 'İç fındıklar 1, 2,5 ve 5 kg’lık vakumlu paketlere doldurulur; talep üzerine 10 kg dökme ambalaj da hazırlanır.',
        alt: 'Natürel iç fındık dolu iki vakumlu paket.',
      },
      {
        meta: 'FOB veya FCA',
        title: 'İstanbul',
        text: 'Her parti, ihracat belgeleriyle birlikte FOB ya da FCA şartlarıyla İstanbul’dan yola çıkar.',
        alt: 'İstanbul Boğazı’ndaki asma köprü; suda bir yük gemisi ve bir yolcu teknesi.',
      },
      {
        meta: 'Havayolu ve denizyolu',
        title: 'Nairobi',
        text: 'Deneme siparişleri 200 kg’dan itibaren havayoluyla Nairobi’ye gider; Mombasa’ya denizyolu sevkiyatı 1 tondan başlar. Kenya’daki ailemiz sayesinde tadım ve lansmanlar için Nairobi’de olabiliyoruz.',
        alt: 'Akasya ağaçları ve çayırların ardında Nairobi silueti.',
      },
    ],
  },

  origin: {
    eyebrow: 'Köken',
    title: 'Akçakoca’nın Karadeniz tepelerinden',
    lead: 'AKCANUT, Düzce’nin Akçakoca ilçesindeki tek bir aile bahçesinden gelir.',
    familyTitle: 'Bir aile bahçesi',
    familyText:
      'Aile kuşaklardır burada fındık yetiştiriyor. Bahçe yılda 4 ila 5 ton kabuklu fındık veriyor; daha fazlası gerektiğinde aynı ilçedeki komşu üreticiler tedariki destekliyor.',
    registeredTitle: 'Tescilli menşe',
    registeredText:
      'Akçakoca Sarı Fındığı, 2019’da Türkiye’de coğrafi işaret olarak tescil edildi. Aile bahçesi bu yetiştirme bölgesinin içinde yer alır.',
    statement: 'Yeri, ailesi ve hikâyesi olan bir Türk fındığı.',
    canopyAlt: 'Akçakoca’daki aile bahçesinde fındık ağaçları.',
    canopyCaption: 'Aile bahçesi, Akçakoca',
    hillsAlt: 'Yeşil tepelerin ve açık gökyüzünün altında açıkta kuruyan fındıklar.',
    hillsCaption: 'Yerinde hasat ve kurutma',
    mapTitle: 'Yetiştiği yer',
    mapCaption: 'Akçakoca, Düzce; Türkiye’nin Karadeniz kıyısı.',
    mapLabel: 'Akçakoca’nın etkileşimli haritası',
    mapLink: 'Haritayı OpenStreetMap’te açın',
    nameTitle: 'İsim',
    nameText:
      'AKÇA, tarihî bir gümüş sikkeyi ve Akçakoca’nın kendisini çağrıştırır. NUT, İngilizcede içindekini, yani fındığı söyler.',
  },

  product: {
    eyebrow: 'Ürün',
    title: 'Natürel iç fındık',
    lead: 'Zarlı, kavrulmamış ve tuzsuz; 2026 hasadından.',
    photoAlt: 'Şeffaf vakumlu paket içinde kahverengi zarlı iç fındıkların yakın çekimi.',
    rawTitle: 'Natürel ne demek',
    rawText:
      'Kabuğundan çıktığı haliyle, yalnızca kurutulmuş iç fındık. Kavrulmaz, tuzlanmaz ve ince kahverengi zarı üzerinde kalır; gerisine siz karar verirsiniz.',
    homeTitle: 'Evde',
    home: [
      {
        title: 'Tavada kavurma',
        text: 'Kuru bir tavayı orta ateşte ısıtın. Fındıkları tek kat halinde ekleyin ve 5 ila 7 dakika sık sık karıştırarak kokusu çıkıp hafifçe kızarana kadar kavurun, sonra soğuması için bir tabağa alın. Zarsız isterseniz sıcakken temiz bir mutfak bezinde ovun.',
      },
      {
        title: 'Hamur işlerinde',
        text: 'Kek, kurabiye ve ekmeğe doğrayarak katın ya da tart tabanı ve hamur işleri için öğütün. Önceden kavurmak lezzetini derinleştirir.',
      },
      {
        title: 'Kahvenin yanında',
        text: 'Kahvenin yanında küçük bir kâse kavrulmuş fındık; misafirlere ya da kendinize.',
      },
    ],
    storageTitle: 'Saklama',
    storageText:
      'Açılmamış paketler serin ve kuru bir yerde 12 ay dayanır. Paketi açtıktan sonra fındıkları hava almayan bir kaba aktarın ve serin, kuru bir yerde tutun. Mutfağınız sıcaksa buzdolabı daha iyi bir yerdir.',
    findTitle: 'Nereden bulunur',
    findText: 'AKCANUT’u Nairobi’de mi arıyorsunuz?',
    findCta: 'Bize WhatsApp’tan yazın',
    findTodo: 'Satış noktaları: onaylanan mağazalar belli olunca ekleyin',
  },

  quality: {
    eyebrow: 'Kalite',
    title: 'Tek menşe. Aile üretimi. Her parti analizli.',
    lead: 'Net spesifikasyonlar; her parti yüklemeden önce analiz edilir.',
    specs: [
      { label: 'Ürün', value: 'Natürel iç fındık', note: 'Zarlı, kavrulmamış, tuzsuz. 2026 hasadı.' },
      { label: 'Kalibre', value: '11 ile 13 mm', note: 'Talep üzerine 13 ile 15 mm.' },
      { label: 'Nem', value: 'En fazla %6', note: 'Yerinde kurutulur.' },
      {
        label: 'Parti analizi',
        value: 'Her partide aflatoksin',
        note: 'Akredite laboratuvar, AB limitleri içinde, her partiyle analiz sertifikası.',
      },
      { label: 'Ambalaj', value: '1, 2,5 ve 5 kg vakumlu paket', note: 'Talep üzerine 10 kg dökme vakum.' },
      { label: 'Raf ömrü', value: '12 ay', note: 'Açılmamış, serin ve kuru yerde.' },
    ],
  },

  trade: {
    eyebrow: 'Ticari alıcılar için',
    title: 'Bahçeyi tanıyan üreticiden doğrudan',
    lead: 'Akçakoca’nın natürel iç fındığını Kenya ve Doğu Afrika’daki seçkin perakendecilere, otellere ve özel gıda alıcılarına tedarik ediyoruz. Parti analizleri, net spesifikasyonlar ve vakumlu ambalaj, seçkin otel ve perakende kanallarının ihtiyacına göre.',
    whoTitle: 'Kimlere tedarik ediyoruz',
    who: ['Seçkin perakende', 'Oteller', 'Özel gıda'],
    howTitle: 'Nasıl çalışıyoruz',
    how: [
      { term: 'Teslim şekli', detail: 'FOB veya FCA İstanbul' },
      { term: 'Deneme siparişi', detail: '200 kg’dan itibaren, havayoluyla Nairobi’ye' },
      { term: 'Deniz sevkiyatı', detail: '1 tondan itibaren, Mombasa’ya' },
      { term: 'Belgeler', detail: 'Her partiyle analiz sertifikası ve ihracat belgeleri' },
      { term: 'Numune', detail: 'Talep üzerine' },
      {
        term: 'Tedarik',
        detail: 'Aile bahçesi ve aynı ilçedeki komşu üreticiler; hepsi tek bir kalibre ve analiz standardında',
      },
      { term: 'Ambalaj', detail: '1, 2,5 ve 5 kg vakumlu paket; talep üzerine 10 kg dökme' },
      { term: 'GTİP (HS kodu)', detail: '0802.22' },
      { term: 'Nairobi’de', detail: 'Tadım, otel ziyaretleri ve lansman desteği, yüz yüze' },
    ],
    pricing: 'Fiyatlar talep üzerine.',
    sampleCta: 'Numune isteyin',
    emailPrompt: 'E-postayı mı tercih edersiniz?',
    emailSubject: 'Numune talebi: AKCANUT iç fındık',
    kenyaPrompt: 'Kenya’da mısınız?',
    kenyaCta: 'Nairobi’deki irtibat kişimiz Ahmed Mwangi Hassan’a yazın.',
    downloadTitle: 'Marka profili ve kimlik kılavuzu',
    downloadMeta: 'PDF, İngilizce, {pages} sayfa, {size}',
    downloadCta: 'İndir',
  },

  contact: {
    eyebrow: 'İletişim',
    title: 'Doğrudan bize ulaşın',
    lead: 'WhatsApp’tan yazın ya da e-posta gönderin. WhatsApp, gönderilmeye hazır kısa bir mesajla açılır.',
    turkiyeLabel: 'Türkiye',
    nairobiLabel: 'Nairobi irtibat',
    whatsapp: 'WhatsApp',
    whatsappLabel: '{name} ile WhatsApp’tan yazışın',
    emailLabel: 'E-posta',
    emailSubject: 'AKCANUT bilgi talebi',
  },

  whatsapp: {
    general: 'Merhaba, AKCANUT’u web sitenizde gördüm; Akçakoca fındıklarınız hakkında bilgi almak istiyorum.',
    // Messages to the Nairobi contact stay in English, as agreed.
    nairobi: 'Hello Ahmed, I found AKCANUT on the website and would like to know more about your hazelnuts.',
    sample: 'Merhaba, AKCANUT natürel iç fındık için numune talep etmek istiyorum.\nFirma:\nŞehir:\nTahmini miktar:',
    whereToBuy: 'Hello, where can I buy AKCANUT hazelnuts in Nairobi?',
  },

  footer: {
    tagline: 'Akçakoca Fındığı · Türkiye',
    languages: 'Diller',
    copyright: '© {year} AKCANUT',
    backToTop: 'Başa dön',
    photoCredits: 'Yolculuk bölümündeki 3, 4, 6 ve 7. adımların fotoğrafları: {names} (Unsplash).',
  },

  notFound: {
    title: 'Sayfa bulunamadı',
    text: 'Bu sayfa mevcut değil.',
    home: 'Ana sayfaya dön',
  },

  todo: 'TODO',

  schema: {
    organizationDescription:
      'Türkiye’de Akçakoca’daki bir aile bahçesinden, Kenya ve Doğu Afrika için tek menşeli natürel iç fındık.',
    productName: 'AKCANUT natürel iç fındık',
    productDescription:
      'Zarlı, kavrulmamış ve tuzsuz natürel iç fındık; Akçakoca, Türkiye, 2026 hasadı. Standart kalibre 11 ile 13 mm, en fazla %6 nem, her parti aflatoksin analizli.',
  },
};

export default tr;
