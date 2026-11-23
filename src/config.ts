export type PrayerKey = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'

export type DailyPrayerTimes = {
  /** YYYY-MM-DD in Kosovo local time. */
  date: string
  begins: Record<PrayerKey, string>
  sunrise: string
  imsak?: string
  fajrAdhan?: string
  verifiedBy: string
  source?: 'bik'
}

export type BankTransferDetails = {
  beneficiary: string | null
  bankName: string | null
  iban: string | null
  swiftBic: string | null
}

export type ImamProfile = {
  name: string | null
  photoUrl: string | null
  biography: { sq: string | null; en: string | null }
}

export const mosqueConfig = {
  name: 'Xhamia e Madhe',
  city: 'Podujevë',
  address: 'W53X+VJJ, Rruga Ali Ajeti, Podujevë 11000, Kosovë',
  addressEn: 'W53X+VJJ, Rruga Ali Ajeti, Podujevë 11000, Kosovo',
  /** Add real mosque photos to public/photos, then set paths such as '/photos/ballina.jpg'. */
  heroPhotoUrl: null as string | null,
  aboutPhotoUrl: null as string | null,
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=42.90500881613754%2C21.199008307858158',
  mapEmbedUrl: 'https://www.google.com/maps?q=42.90500881613754%2C21.199008307858158&output=embed&z=17',
  /** Add only the official, mosque-confirmed donation URL. */
  donationUrl: 'https://www.gofundme.com/f/xhamia-e-madhe-podujeve?utm_campaign=p_lico+share-sheet-first-launch&utm_medium=copy_link&utm_source=customer',
  /** Fill in only bank details confirmed by the mosque. */
  bankTransfer: {
    beneficiary: null,
    bankName: null,
    iban: null,
    swiftBic: null,
  } satisfies BankTransferDetails,
  /** Add the imam's confirmed profile details when they are available. */
  imam: {
    name: null,
    photoUrl: null,
    biography: { sq: null, en: null },
  } satisfies ImamProfile,
  bikCalendarUrl: 'https://bislame.net/takvimi/',
  /** Optional mosque-approved overrides; BIK daily times load automatically through /api/prayer-times. */
  prayerTimes: [] as DailyPrayerTimes[],
}
