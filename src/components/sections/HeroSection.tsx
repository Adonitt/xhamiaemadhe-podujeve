import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mosqueConfig } from '../../config'
import { pagePath, type Locale } from '../../content'
import { heroPhotos } from '../../gallery'
import type { Copy } from '../../types'
import { formattedToday } from '../../utils/date'
import { ArchitectureArt, ArrowIcon } from '../shared/Icons'

export function Hero({ locale, t, now }: { locale: Locale; t: Copy; now: Date }) {
  const [activePhoto, setActivePhoto] = useState(0)
  useEffect(() => {
    if (heroPhotos.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => setActivePhoto((current) => (current + 1) % heroPhotos.length), 7000)
    return () => window.clearInterval(interval)
  }, [])
  return <section className="hero">
    <div className="hero-background" aria-hidden="true">
      {heroPhotos.map((photo, index) => <img key={photo.src} className={index === activePhoto ? 'hero-background-photo is-active' : 'hero-background-photo'} src={photo.src} alt="" />)}
    </div>
    <div className="hero-pattern" aria-hidden="true" />
    <div className="container hero-grid">
      <div className="hero-copy">
        <span className="eyebrow eyebrow-bronze"><span className="small-diamond" />{t.heroEyebrow}</span>
        <h1>{t.heroTitle}<span>{t.heroCity}</span></h1>
        <p className="hero-lead">{t.heroText}</p>
        <div className="hero-actions">
          <Link className="button button-bronze" to={pagePath(locale, 'aktivitetet')}>{t.viewActivities}<ArrowIcon /></Link>
          <Link className="button button-outline" to={`${pagePath(locale, 'rreth')}#gallery`}>{t.nav.gallery}<ArrowIcon /></Link>
        </div>
        <div className="hero-status"><span className="status-dot" />{t.heroCaption}</div>
      </div>
      <div className="hero-visual">
        <ArchitectureArt />
        <a className="hero-location-card" href={mosqueConfig.mapUrl} target="_blank" rel="noopener noreferrer" aria-label={locale === 'sq' ? 'Hape lokacionin e xhamisë në hartë' : 'Open the mosque location on the map'}>
          <span className="hero-location-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.6"/></svg></span>
          <span className="hero-location-copy">
            <span>{locale === 'sq' ? 'NA GJENI NË PODUJEVË' : 'FIND US IN PODUJEVË'}</span>
            <strong>{locale === 'sq' ? 'Rruga Ali Ajeti' : 'Ali Ajeti Street'}</strong>
            <small>{locale === 'sq' ? 'Podujevë · Kosovë' : 'Podujevë · Kosovo'}</small>
          </span>
          <span className="hero-location-arrow" aria-hidden="true"><ArrowIcon diagonal /></span>
        </a>
      </div>
    </div>
    <div className="hero-bottom"><div className="container"><span>{t.city}</span><span>{formattedToday(now, locale)}</span></div></div>
  </section>
}
