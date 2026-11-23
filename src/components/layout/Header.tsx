import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { pagePath, type Locale, type PageKey } from '../../content'
import { mosqueConfig } from '../../config'
import type { Copy } from '../../types'
import { ArchMark, ArrowIcon } from '../shared/Icons'

const navPages: PageKey[] = ['orari', 'aktivitetet', 'njoftimet', 'rreth', 'vizita']

export function Header({ locale, page, t }: { locale: Locale; page: PageKey; t: Copy }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname, location.search, location.hash])
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])
  const other: Locale = locale === 'sq' ? 'en' : 'sq'
  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to={pagePath(locale, 'home')} aria-label={`${mosqueConfig.name} — ${t.nav.home}`}>
          <ArchMark />
          <span className="brand-text"><strong>{locale === 'sq' ? 'Xhamia e Madhe' : 'The Grand Mosque'}</strong><small>{t.brandTag}</small></span>
        </Link>
        <nav id="main-navigation" className={open ? 'main-nav main-nav-open' : 'main-nav'} aria-label={locale === 'sq' ? 'Navigimi kryesor' : 'Main navigation'}>
          {navPages.map((key) => <Link key={key} className={page === key ? 'nav-link active' : 'nav-link'} to={pagePath(locale, key)} aria-current={page === key ? 'page' : undefined}>{t.nav[key]}</Link>)}
          <Link className={location.hash === '#gallery' ? 'nav-link active' : 'nav-link'} to={`${pagePath(locale, 'rreth')}#gallery`}>{t.nav.gallery}</Link>
          <Link className="nav-donate mobile-only" to={pagePath(locale, 'kontribuo')}>{t.nav.kontribuo}</Link>
        </nav>
        <div className="header-actions">
          <Link className="lang-switch" to={pagePath(other, page)} lang={other} aria-label={locale === 'sq' ? 'Switch to English' : 'Kalo në shqip'}>{other.toUpperCase()}</Link>
          <Link className="button button-bronze header-donate" to={pagePath(locale, 'kontribuo')}>{t.nav.kontribuo} <ArrowIcon diagonal /></Link>
          <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? t.closeMenu : t.menu} onClick={() => setOpen(!open)}>
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  </>
}
