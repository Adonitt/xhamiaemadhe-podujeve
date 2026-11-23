import { Link } from 'react-router-dom'
import { pagePath, type Locale, type PageKey } from '../../content'
import { mosqueConfig } from '../../config'
import type { Copy } from '../../types'
import { ArchMark } from '../shared/Icons'

export function Footer({ locale, t }: { locale: Locale; t: Copy }) {
  return <footer className="site-footer"><div className="container footer-grid">
    <div className="footer-brand"><Link className="brand" to={pagePath(locale, 'home')}><ArchMark /><span className="brand-text"><strong>{locale === 'sq' ? 'Xhamia e Madhe' : 'The Grand Mosque'}</strong><small>{t.brandTag}</small></span></Link><p>{t.footerText}</p></div>
    <div><h2>{t.footerExplore}</h2><ul>{(['orari', 'aktivitetet', 'njoftimet', 'rreth'] as PageKey[]).map((key) => <li key={key}><Link to={pagePath(locale, key)}>{t.nav[key]}</Link></li>)}</ul></div>
    <div><h2>{t.footerInfo}</h2><ul><li><Link to={pagePath(locale, 'vizita')}>{t.nav.vizita}</Link></li><li><Link to={pagePath(locale, 'kontribuo')}>{t.nav.kontribuo}</Link></li><li><a href={mosqueConfig.bikCalendarUrl} target="_blank" rel="noopener noreferrer">{t.sourceBik}</a></li><li><a href="https://www.facebook.com/profile.php?id=100080700156509" target="_blank" rel="noopener noreferrer">{t.facebookPage}</a></li></ul></div>
    <div className="footer-address"><span>{t.addressLabel}</span><p>{locale === 'sq' ? mosqueConfig.address : mosqueConfig.addressEn}</p></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {mosqueConfig.name}. {t.copyright}</span><span>Podujevë · Kosovë</span></div></footer>
}
