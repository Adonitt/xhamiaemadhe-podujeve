import { Link } from 'react-router-dom'
import { pagePath, type Locale } from '../../content'
import { mosqueConfig } from '../../config'
import { mosquePhotos } from '../../gallery'
import type { Copy } from '../../types'
import { ArchMark, ArrowIcon } from '../shared/Icons'

export function AboutSection({ locale, t, full = false }: { locale: Locale; t: Copy; full?: boolean }) {
  const featuredPhoto = mosquePhotos.find((photo) => photo.about) ?? mosquePhotos[0]
  const photoUrl = mosqueConfig.aboutPhotoUrl ?? featuredPhoto?.src
  const photoAlt = featuredPhoto?.alt[locale] ?? (locale === 'sq' ? 'Pamje e Xhamisë së Madhe në Podujevë' : 'The Grand Mosque in Podujevë')

  return <section className={full ? 'section section-about section-page' : 'section section-about'}>
    <div className="container">
      <div className="about-grid">
        <figure className="about-visual">
          {photoUrl
            ? <img className="about-photo" src={photoUrl} alt={photoAlt} loading="lazy" />
            : <div className="about-visual-placeholder" aria-hidden="true"><ArchMark large /></div>}
          <div className="about-visual-shade" aria-hidden="true" />
          <figcaption className="about-visual-caption">
            <span>{locale === 'sq' ? 'XHAMIA E MADHE' : 'THE GRAND MOSQUE'}</span>
            <strong>{t.city}</strong>
          </figcaption>
          <span className="about-visual-seal" aria-hidden="true"><ArchMark /></span>
        </figure>

        <div className="about-copy">
          <span className="eyebrow"><span className="small-diamond" />{t.aboutEyebrow}</span>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
          <blockquote><span aria-hidden="true">“</span>{t.aboutQuote}</blockquote>
          <Link className="button button-dark" to={full ? `${pagePath(locale, 'rreth')}#gallery` : pagePath(locale, 'rreth')}>
            {full ? t.galleryTitle : t.aboutMore}<ArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  </section>
}
