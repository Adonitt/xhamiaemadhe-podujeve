export type Locale = 'sq' | 'en'
export type PageKey = 'home' | 'orari' | 'aktivitetet' | 'njoftimet' | 'rreth' | 'vizita' | 'kontribuo'

export const pageSlugs: Record<Locale, Record<PageKey, string>> = {
  sq: {
    home: '', orari: 'orari', aktivitetet: 'aktivitetet', njoftimet: 'njoftimet',
    rreth: 'rreth-nesh', vizita: 'vizita', kontribuo: 'kontribuo',
  },
  en: {
    home: '', orari: 'prayer-times', aktivitetet: 'programmes', njoftimet: 'notices',
    rreth: 'about', vizita: 'visit', kontribuo: 'support',
  },
}

export const pagePath = (locale: Locale, page: PageKey) =>
  page === 'home' ? (locale === 'sq' ? '/' : '/?lang=en') : `/${pageSlugs[locale][page]}`

export function resolveRoute(pathname: string, search = ''): { locale: Locale; page: PageKey; redirect?: string } {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) {
    return { locale: new URLSearchParams(search).get('lang') === 'en' ? 'en' : 'sq', page: 'home' }
  }

  if (segments[0] === 'sq' || segments[0] === 'en') {
    const locale = segments[0]
    const page = (Object.entries(pageSlugs[locale]).find(([, slug]) => slug === (segments[1] ?? ''))?.[0] ?? 'home') as PageKey
    return { locale, page, redirect: pagePath(locale, page) }
  }

  if (segments.length === 1) {
    for (const locale of ['sq', 'en'] as Locale[]) {
      const page = (Object.entries(pageSlugs[locale]).find(([key, slug]) => key !== 'home' && slug === segments[0])?.[0]) as PageKey | undefined
      if (page) return { locale, page }
    }
  }

  return { locale: 'sq', page: 'home', redirect: '/' }
}

const sq = {
  language: 'Shqip', otherLanguage: 'English', city: 'Podujevë · Kosovë',
  brandTag: 'PODUJEVË',
  nav: { home: 'Ballina', orari: 'Orari', aktivitetet: 'Aktivitetet', njoftimet: 'Njoftimet', gallery: 'Galeria', rreth: 'Rreth nesh', vizita: 'Vizita', kontribuo: 'Kontribuo' },
  menu: 'Hap menynë', closeMenu: 'Mbyll menynë', skip: 'Kalo te përmbajtja',
  heroEyebrow: 'NJË SHTËPI PËR BESIMIN DHE BASHKËSINË',
  heroTitle: 'Xhamia e Madhe',
  heroCity: 'në Podujevë',
  heroText: 'Një vend për namaz, dije dhe afërsi me njëri-tjetrin. Mirë se vini në xhaminë tonë.',
  heroCaption: 'E hapur për falje, mësim dhe vizita.',
  viewActivities: 'Shiko aktivitetet',
  nextPrayer: 'NAMAZI I RADHËS', today: 'SOT NË XHAMI',
  starts: 'Fillon', adhan: 'Ezani', imsak: 'Imsaku', remaining: 'DERI NË FILLIM',
  schedulePending: 'Orari nuk u ngarkua',
  schedulePendingText: 'Provo sërish pas pak ose shih Takvimin zyrtar të BIK-ut.',
  scheduleLoading: 'Po merret orari nga BIK-u…',
  dayComplete: 'Vaktet e sotme kanë përfunduar',
  dayCompleteText: 'Orari i nesërm gjendet në Takvimin e BIK-ut.',
  noTimes: '—:—', sourceBik: 'Shiko Takvimin e BIK-ut', sourceNote: 'Për kohët bazë, shihni Takvimin e Bashkësisë Islame të Kosovës.',
  bikSourceNote: 'Kohët e hyrjes së namazit sipas Takvimit 2026 të BIK-ut, pa korrigjim minutash. Ora e xhumasë përcaktohet nga hyrja e drekës të premten.',
  fajrRule: 'Sabahu hyn 30 minuta pas imsakut; ezani në xhaminë tonë thirret 30 minuta para lindjes së diellit.',
  prayerNames: { fajr: 'Sabahu', sunrise: 'Lindja e diellit', dhuhr: 'Dreka', asr: 'Ikindia', maghrib: 'Akshami', isha: 'Jacia' },
  verified: 'Orar i konfirmuar nga xhamia',
  fullSchedule: 'Orari i plotë',
  scheduleHeading: 'Sot në xhami',
  scheduleIntro: 'Kohët e namazit, të paraqitura qartë për ditën e sotme.',
  scheduleYearEyebrow: 'TAKVIMI 2026', scheduleYearHeading: 'Orari sipas datës', scheduleYearIntro: 'Zgjidh cilëndo datë të vitit 2026 për të parë kohët e namazit në Podujevë.',
  datePickerLabel: 'Zgjidh datën', todayButton: 'Sot', yearRange: 'Zgjidh një datë nga viti 2026.',
  fridayEyebrow: 'ÇDO TË PREMTE', fridayTitle: 'Namazi i xhumasë', fridayTimeLabel: 'Falet në',
  fridayFixedNote: 'Ora fikse caktohet nga koha e hyrjes së drekës në Takvimin e BIK-ut.',
  fridayUnavailable: 'Ora e xhumasë nuk mund të përcaktohet për këtë datë nga Takvimi 2026.',
  programmesEyebrow: 'JETA NË XHAMI', programmesTitle: 'Më shumë se një vend faljeje',
  programmesIntro: 'Xhamia bashkon njerëzit për namaz, mësim dhe veprimtari të komunitetit.',
  programmeMore: 'Më shumë për aktivitetet',
  upcomingTitle: 'Aktivitetet e ardhshme', upcomingEmpty: 'Datat dhe orët e aktiviteteve do të publikohen sapo të konfirmohen nga xhamia.',
  eventContact: 'Kontakt',
  programmeItems: [
    { no: '01', title: 'Ligjërata', text: 'Çdo të diel pas namazit të jacisë mbahen ligjërata për meshkuj dhe gra.', timing: 'E diel · pas jacisë' },
    { no: '02', title: 'Mësime për fëmijë', text: 'Mësimet për fëmijë mbahen çdo vikend, nga ora 11:00 deri në 13:00.', timing: 'Çdo vikend · 11:00–13:00' },
    { no: '03', title: 'Aktivitete për gra', text: 'Takime dhe programe për gratë e komunitetit.' },
    { no: '04', title: 'Vizita', text: 'Mund të na vizitoni kurdo që dëshironi; dyert e xhamisë janë të hapura.', timing: 'Kurdo që dëshironi' },
  ],
  noticeEyebrow: 'NJOFTIME', noticeTitle: 'Nga xhamia jonë',
  noticeText: 'Këtu do të publikohen njoftimet dhe datat e aktiviteteve të ardhshme.',
  noticeDateLabel: 'Data e njoftimit',
  noticeEmpty: 'Aktualisht nuk ka njoftime të datuara për publikim.',
  noticeSampleLabel: 'SHEMBULL', noticeSampleTitle: 'Njoftim për xhematin',
  noticeSampleBody: 'Këtu do të shfaqen njoftimet zyrtare të xhamisë, me datën dhe hollësitë përkatëse.',
  galleryEyebrow: 'PAMJE NGA XHAMIA', galleryTitle: 'Galeria',
  galleryIntro: 'Disa pamje nga hapësirat e Xhamisë së Madhe në Podujevë.',
  galleryShowMore: 'Shfaq më shumë',
  aboutEyebrow: 'RRETH NESH', aboutTitle: 'Një vend që na bashkon',
  aboutText: 'Xhamia e Madhe në Podujevë është funksionale dhe mirëpret besimtarët për pesë vaktet, xhumanë, mësime, ligjërata dhe vizita. Faqja jonë synon t’i bëjë informacionet e përditshme të lehta për t’u gjetur.',
  aboutMore: 'Njihuni me xhaminë',
  aboutQuote: 'Një hapësirë e hapur për adhurim, dije dhe bashkësi.',
  mosqueInfoEyebrow: 'INFORMATA PËR XHAMINË', mosqueInfoTitle: 'Xhamia dhe bashkësia',
  mosqueInfoIntro: 'Një vend për falje, mësim dhe afërsi mes njerëzve të Podujevës.',
  mosquePrayerTitle: 'Pesë vaktet', mosquePrayerText: 'Xhamia mirëpret besimtarët për namazet ditore.',
  mosqueFridayTitle: 'Namazi i xhumasë', mosqueFridayText: 'Besimtarët mblidhen çdo të premte për namazin e xhumasë.',
  mosqueLearningTitle: 'Mësime dhe vizita', mosqueLearningText: 'Xhamia organizon mësime e ligjërata dhe mirëpret vizitorët.',
  mosqueSeparateSpacesTitle: 'Hapësira për gra dhe burra', mosqueSeparateSpacesText: 'Hapësirat e faljes për gra dhe burra janë plotësisht të ndara.',
  imamEyebrow: 'PROFILI', imamTitle: 'Imami i xhamisë',
  imamIntro: 'Njihuni me imamin dhe rolin e tij në jetën e xhamisë.',
  imamPendingName: 'Të dhënat e imamit', imamPendingText: 'Profili do të plotësohet me emrin, fotografinë dhe biografinë e konfirmuar.',
  imamPendingLabel: 'PROFIL NË PËRGATITJE',
  donateEyebrow: 'KONTRIBUO', donateTitle: 'Mbështetni jetën e xhamisë',
  donateText: 'Kontributet ndihmojnë aktivitetet dhe kujdesin e përditshëm për xhaminë. Përdorni të dhënat bankare zyrtare më poshtë për ndihmë.',
  donateButton: 'Kanali zyrtar së shpejti', donateActive: 'Kontribuo përmes GoFundMe',
  donateTransferLabel: 'TRANSFER BANKAR', donateBankTitle: 'Të dhënat për ndihmë',
  donateBankIntro: 'Të dhënat bankare do të publikohen pasi të konfirmohen nga xhamia.',
  donateBeneficiary: 'Përfituesi', donateBank: 'Banka', donateIban: 'IBAN', donateSwift: 'SWIFT / BIC',
  donateDetailsPending: 'Do të shtohet pas konfirmimit', donateMosqueAddress: 'Adresa e xhamisë',
  donateSecurityNote: 'Para transferit, verifikoni që përfituesi është ai i konfirmuar nga xhamia.',
  visitEyebrow: 'NA VIZITONI', visitTitle: 'Ju mirëpresim në Podujevë',
  visitText: 'Xhamia ndodhet në rrugën Ali Ajeti, në pikën W53X+VJJ. Përdorni hartën për udhëzime të sakta drejt lokacionit.',
  addressLabel: 'ADRESA', accessLabel: 'VIZITA', accessText: 'Për vizita në grup dhe orare të aktiviteteve, interesohuni drejtpërdrejt në xhami.',
  mapButton: 'Hape në Google Maps', mapNote: 'Koordinatat: 42.90500881613754, 21.199008307858158 · W53X+VJJ.',
  footerText: 'Një vend për namaz, dije dhe bashkësi në Podujevë.',
  footerExplore: 'Eksploro', footerInfo: 'Informata', facebookPage: 'InfoXhamia në Facebook', copyright: 'Të gjitha të drejtat e rezervuara.',
  pageTitles: {
    home: 'Ballina', orari: 'Orari i namazit', aktivitetet: 'Aktivitetet', njoftimet: 'Njoftimet',
    rreth: 'Rreth nesh', vizita: 'Na vizitoni', kontribuo: 'Kontribuo',
  },
  pageDescriptions: {
    home: 'Xhamia e Madhe në Podujevë — orari, aktivitetet dhe informatat për vizitë.',
    orari: 'Shikoni orarin e namazit dhe të xhumasë në Xhaminë e Madhe në Podujevë.',
    aktivitetet: 'Ligjërata, mësime dhe aktivitete në Xhaminë e Madhe në Podujevë.',
    njoftimet: 'Njoftimet zyrtare nga Xhamia e Madhe në Podujevë.',
    rreth: 'Mësoni më shumë për Xhaminë e Madhe në Podujevë.',
    vizita: 'Adresa dhe udhëzimet për të vizituar Xhaminë e Madhe në Podujevë.',
    kontribuo: 'Mësoni si ta mbështesni Xhaminë e Madhe në Podujevë.',
  },
}

const en: typeof sq = {
  language: 'English', otherLanguage: 'Shqip', city: 'Podujevë · Kosovo', brandTag: 'PODUJEVA',
  nav: { home: 'Home', orari: 'Prayer times', aktivitetet: 'Programmes', njoftimet: 'Notices', gallery: 'Gallery', rreth: 'About', vizita: 'Visit', kontribuo: 'Support' },
  menu: 'Open menu', closeMenu: 'Close menu', skip: 'Skip to content',
  heroEyebrow: 'A HOME FOR FAITH AND COMMUNITY',
  heroTitle: 'The Grand Mosque', heroCity: 'of Podujevë',
  heroText: 'A place for prayer, learning and connection. You are welcome at our mosque.',
  heroCaption: 'Open for prayer, learning and visits.',
  viewActivities: 'View activities',
  nextPrayer: 'NEXT PRAYER', today: 'TODAY AT THE MOSQUE',
  starts: 'Begins', adhan: 'Adhan', imsak: 'Imsak', remaining: 'UNTIL IT BEGINS',
  schedulePending: 'Timetable unavailable',
  schedulePendingText: 'Please try again shortly or consult the official BIK calendar.',
  scheduleLoading: 'Loading times from BIK…',
  dayComplete: 'Today’s prayers have finished',
  dayCompleteText: 'Tomorrow’s times are available in the BIK calendar.',
  noTimes: '—:—', sourceBik: 'View the BIK calendar', sourceNote: 'For base times, consult the Islamic Community of Kosovo calendar.',
  bikSourceNote: 'Prayer start times from the official 2026 BIK calendar, without a minute adjustment. Jumu’ah time is determined from Friday’s Dhuhr entry.',
  fajrRule: 'Fajr begins 30 minutes after Imsak; adhan at our mosque is called 30 minutes before sunrise.',
  prayerNames: { fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' },
  verified: 'Timetable confirmed by the mosque', fullSchedule: 'Full timetable',
  scheduleHeading: 'Today at the mosque',
  scheduleIntro: 'Prayer times, clearly presented for today.',
  scheduleYearEyebrow: '2026 CALENDAR', scheduleYearHeading: 'Times by date', scheduleYearIntro: 'Choose any day in 2026 to see prayer times for Podujevë.',
  datePickerLabel: 'Choose a date', todayButton: 'Today', yearRange: 'Choose a date in 2026.',
  fridayEyebrow: 'EVERY FRIDAY', fridayTitle: 'Jumu’ah prayer', fridayTimeLabel: 'Prayer at',
  fridayFixedNote: 'The fixed time follows the Dhuhr entry in the official BIK calendar.',
  fridayUnavailable: 'Jumu’ah time cannot be determined for this date from the 2026 calendar.',
  programmesEyebrow: 'LIFE AT THE MOSQUE', programmesTitle: 'More than a place of prayer',
  programmesIntro: 'Our mosque brings people together for worship, learning and community life.',
  programmeMore: 'Explore programmes',
  upcomingTitle: 'Upcoming activities', upcomingEmpty: 'Activity dates and times will be published once confirmed by the mosque.',
  eventContact: 'Contact',
  programmeItems: [
    { no: '01', title: 'Talks', text: 'Talks for men and women are held every Sunday after the Isha prayer.', timing: 'Sunday · after Isha' },
    { no: '02', title: 'Children’s classes', text: 'Children’s classes take place every weekend from 11:00 to 13:00.', timing: 'Every weekend · 11:00–13:00' },
    { no: '03', title: 'Women’s activities', text: 'Gatherings and programmes for women in the community.' },
    { no: '04', title: 'Visits', text: 'You are welcome to visit whenever you wish; the mosque’s doors are open to you.', timing: 'Whenever you wish' },
  ],
  noticeEyebrow: 'NOTICES', noticeTitle: 'From our mosque',
  noticeText: 'Dated announcements and upcoming activities will be published here.',
  noticeDateLabel: 'Notice date',
  noticeEmpty: 'There are currently no dated notices to publish.',
  noticeSampleLabel: 'SAMPLE', noticeSampleTitle: 'Notice for the congregation',
  noticeSampleBody: 'Official mosque announcements will appear here, with their date and relevant details.',
  galleryEyebrow: 'A LOOK INSIDE', galleryTitle: 'Gallery',
  galleryIntro: 'A few views of the Grand Mosque in Podujevë.',
  galleryShowMore: 'Show more',
  aboutEyebrow: 'ABOUT US', aboutTitle: 'A place that brings us together',
  aboutText: 'The Grand Mosque in Podujevë is open and welcomes worshippers for the five daily prayers, Jumu’ah, classes, talks and visits. This website makes everyday information easy to find.',
  aboutMore: 'Get to know the mosque',
  aboutQuote: 'An open space for worship, learning and community.',
  mosqueInfoEyebrow: 'MOSQUE INFORMATION', mosqueInfoTitle: 'The mosque and community',
  mosqueInfoIntro: 'A place for prayer, learning and connection among the people of Podujevë.',
  mosquePrayerTitle: 'Daily prayers', mosquePrayerText: 'The mosque welcomes worshippers for the five daily prayers.',
  mosqueFridayTitle: 'Friday prayer', mosqueFridayText: 'Worshippers gather at the mosque every Friday for Jumu’ah prayer.',
  mosqueLearningTitle: 'Learning and visits', mosqueLearningText: 'The mosque holds classes and talks and welcomes visitors.',
  mosqueSeparateSpacesTitle: 'Separate spaces for women and men', mosqueSeparateSpacesText: 'The prayer areas for women and men are completely separate.',
  imamEyebrow: 'PROFILE', imamTitle: 'The mosque imam',
  imamIntro: 'Meet the imam and learn about his role in the life of the mosque.',
  imamPendingName: 'Imam details', imamPendingText: 'The profile will be completed with the confirmed name, photograph and biography.',
  imamPendingLabel: 'PROFILE IN PREPARATION',
  donateEyebrow: 'SUPPORT', donateTitle: 'Support the life of the mosque',
  donateText: 'Contributions support the mosque’s activities and daily care. Use the official bank details below to help.',
  donateButton: 'Official channel coming soon', donateActive: 'Contribute through GoFundMe',
  donateTransferLabel: 'BANK TRANSFER', donateBankTitle: 'Contribution details',
  donateBankIntro: 'Bank details will be published once confirmed by the mosque.',
  donateBeneficiary: 'Beneficiary', donateBank: 'Bank', donateIban: 'IBAN', donateSwift: 'SWIFT / BIC',
  donateDetailsPending: 'To be added after confirmation', donateMosqueAddress: 'Mosque address',
  donateSecurityNote: 'Before transferring, confirm the beneficiary with the mosque.',
  visitEyebrow: 'VISIT US', visitTitle: 'We welcome you to Podujevë',
  visitText: 'The mosque is on Ali Ajeti Street at plus code W53X+VJJ. Use the map for precise directions to the location.',
  addressLabel: 'ADDRESS', accessLabel: 'VISITS', accessText: 'For group visits and activity times, please ask directly at the mosque.',
  mapButton: 'Open in Google Maps', mapNote: 'Coordinates: 42.90500881613754, 21.199008307858158 · W53X+VJJ.',
  footerText: 'A place for prayer, learning and community in Podujevë.',
  footerExplore: 'Explore', footerInfo: 'Information', facebookPage: 'InfoXhamia on Facebook', copyright: 'All rights reserved.',
  pageTitles: {
    home: 'Home', orari: 'Prayer times', aktivitetet: 'Programmes', njoftimet: 'Notices',
    rreth: 'About', vizita: 'Visit us', kontribuo: 'Support',
  },
  pageDescriptions: {
    home: 'The Grand Mosque in Podujevë — prayer times, programmes and visitor information.',
    orari: 'Prayer and Friday times at the Grand Mosque in Podujevë.',
    aktivitetet: 'Talks, classes and community programmes at the Grand Mosque in Podujevë.',
    njoftimet: 'Official notices from the Grand Mosque in Podujevë.',
    rreth: 'Learn about the Grand Mosque in Podujevë.',
    vizita: 'Address and visitor information for the Grand Mosque in Podujevë.',
    kontribuo: 'Learn how to support the Grand Mosque in Podujevë.',
  },
}

export const copy: Record<Locale, typeof sq> = { sq, en }
