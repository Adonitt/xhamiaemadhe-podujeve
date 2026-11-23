export type MosquePhoto = {
  src: string
  alt: { sq: string; en: string }
  /** Show this photo in the automatically rotating home hero. */
  hero?: boolean
  /** Use this photo as the featured image in the about section. */
  about?: boolean
}

/**
 * Add new mosque photos under public/assets, then add their paths and captions here.
 * Set hero: true for wide photos that should also rotate behind the home page.
 */
export const mosquePhotos: MosquePhoto[] = [
   {
    src: '/assets/foto 1 jashte.jpeg',
    alt: { sq: 'Pamje e jashtme e xhamisë', en: 'View of the mosque exterior' },
  },
  {
    src: '/assets/foto 2 jashte.jpeg',
    alt: { sq: 'Pamje e jashtme e Xhamisë së Madhe në Podujevë', en: 'Exterior view of the Grand Mosque in Podujevë' },
    hero: true,
    about: true,
  },
  {
    src: '/assets/foto 1 brenda.jpeg',
    alt: { sq: 'Pamje e sallës së faljes', en: 'View of the prayer hall' },
    hero: true,
  },
  {
    src: '/assets/foto 2 brenda.jpeg',
    alt: { sq: 'Salla e faljes dhe qilimat e xhamisë', en: 'The mosque prayer hall and carpets' },
    hero: true,
  },
  {
    src: "/assets/abdes'hanja 1.jpg",
    alt: { sq: 'Hapësira e abdes’hanes', en: 'The mosque ablution area' },
  },
]

export const heroPhotos = mosquePhotos.filter((photo) => photo.hero)
