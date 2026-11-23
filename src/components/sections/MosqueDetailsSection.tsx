import { mosqueConfig } from '../../config'
import type { Copy } from '../../types'
import { ArrowIcon, ArchMark } from '../shared/Icons'
import { SectionHeading } from '../shared/SectionHeading'

export function MosqueDetailsSection({ locale, t }: { locale: 'sq' | 'en'; t: Copy }) {
  const address = locale === 'sq' ? mosqueConfig.address : mosqueConfig.addressEn
  const facts = [
    { number: '01', title: t.mosquePrayerTitle, text: t.mosquePrayerText },
    { number: '02', title: t.mosqueFridayTitle, text: t.mosqueFridayText },
    { number: '03', title: t.mosqueLearningTitle, text: t.mosqueLearningText },
    { number: '04', title: t.mosqueSeparateSpacesTitle, text: t.mosqueSeparateSpacesText },
  ]

  return <section className="section section-mosque-details">
    <div className="container">
      <SectionHeading eyebrow={t.mosqueInfoEyebrow} title={t.mosqueInfoTitle} intro={t.mosqueInfoIntro} />
      <div className="mosque-facts-grid">
        <a className="mosque-address-card" href={mosqueConfig.mapUrl} target="_blank" rel="noopener noreferrer">
          <span className="mosque-address-icon" aria-hidden="true"><ArchMark /></span>
          <span className="mosque-address-copy">
            <span>{t.addressLabel}</span>
            <strong>{address}</strong>
          </span>
          <ArrowIcon diagonal />
        </a>
        {facts.map((fact) => <article className="mosque-fact-card" key={fact.number}>
          <span>{fact.number}</span>
          <h3>{fact.title}</h3>
          <p>{fact.text}</p>
        </article>)}
      </div>
    </div>
  </section>
}
