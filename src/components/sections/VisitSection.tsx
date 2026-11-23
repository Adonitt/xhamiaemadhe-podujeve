import { mosqueConfig } from '../../config'
import type { Copy } from '../../types'
import type { Locale } from '../../content'
import { ArrowIcon } from '../shared/Icons'

export function VisitSection({ locale, t, full = false }: { locale: Locale; t: Copy; full?: boolean }) {
  return <section className={full ? 'section section-visit section-page' : 'section section-visit'}><div className="container visit-grid">
    <div className="visit-copy"><span className="eyebrow"><span className="small-diamond" />{t.visitEyebrow}</span><h2>{t.visitTitle}</h2><p>{t.visitText}</p><div className="visit-detail"><span>{t.addressLabel}</span><strong>{locale === 'sq' ? mosqueConfig.address : mosqueConfig.addressEn}</strong></div><div className="visit-detail"><span>{t.accessLabel}</span><strong>{t.accessText}</strong></div><a className="button button-dark" href={mosqueConfig.mapUrl} target="_blank" rel="noopener noreferrer">{t.mapButton}<ArrowIcon diagonal /></a><small className="map-note">{t.mapNote}</small></div>
    <div className="map-art map-embed"><iframe title={locale === 'sq' ? 'Lokacioni i Xhamisë së Madhe në Google Maps' : 'The Grand Mosque location on Google Maps'} src={mosqueConfig.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
  </div></section>
}
