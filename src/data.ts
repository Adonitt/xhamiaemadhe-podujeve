/** Publish only dates and details confirmed by the mosque. */
export type LocalizedText = { sq: string; en: string }

export type MosqueEvent = {
  id: string
  date: string // YYYY-MM-DD, Kosovo local date
  time: string // HH:mm, Kosovo local time
  title: LocalizedText
  description: LocalizedText
  contact: string
}

export type MosqueNotice = {
  id: string
  date: string // YYYY-MM-DD, Kosovo local date
  title: LocalizedText
  body: LocalizedText
}

export const events: MosqueEvent[] = []
export const notices: MosqueNotice[] = [
  {
    id: 'ligjerata-e-diele-2026-11-23',
    date: '2026-11-15',
    title: {
      sq: 'Ligjërata për xhematin',
      en: 'Talks for the congregation',
    },
    body: {
      sq: 'Ligjëratat mbahen çdo të diel pas namazit të jacisë, për meshkuj dhe gra.',
      en: 'Talks are held every Sunday after the Isha prayer, for men and women.',
    },
  },
  {
    id: 'mesime-besimi-femije-2026-11-23',
    date: '2026-07-04',
    title: {
      sq: 'Mësimet e besimit për fëmijë',
      en: 'Faith classes for children',
    },
    body: {
      sq: 'Mësimet për fëmijë mbahen çdo vikend, nga ora 11:00 deri në 13:00. Mirë se vini!',
      en: 'Children’s classes are held every weekend from 11:00 to 13:00. Everyone is welcome!',
    },
  },
]
