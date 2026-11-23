import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { copy, pagePath, type Locale, type PageKey } from '../content'
import { mosqueConfig } from '../config'
import { kosovoDateKey } from '../prayer'
import { useBikData } from '../useBikData'
import { useClock } from '../hooks/useClock'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { ContentPage } from '../pages/ContentPage'
import { HomePage } from '../pages/HomePage'

export function SiteApp({ locale, page }: { locale: Locale; page: PageKey }) {
  const location = useLocation()
  const t = copy[locale]
  const now = useClock()
  const todayKey = kosovoDateKey(now)
  const [selectedDate, setSelectedDate] = useState(todayKey)
  useEffect(() => setSelectedDate(todayKey), [page, todayKey])
  const requestedDate = page === 'orari' ? selectedDate : todayKey
  const { data: bikData, status: bikStatus } = useBikData(requestedDate)
  const schedules = bikData ? [...mosqueConfig.prayerTimes, bikData.schedule] : mosqueConfig.prayerTimes

  useEffect(() => {
    if (!location.hash) return
    document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = `${t.pageTitles[page]} · ${locale === 'sq' ? 'Xhamia e Madhe' : 'The Grand Mosque'} · Podujevë`
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.pageDescriptions[page])
    document.querySelectorAll('link[data-i18n]').forEach((node) => node.remove())
    for (const language of ['sq', 'en'] as Locale[]) {
      const alternate = document.createElement('link')
      alternate.rel = 'alternate'
      alternate.hreflang = language
      alternate.href = `${window.location.origin}${pagePath(language, page)}`
      alternate.dataset.i18n = 'true'
      document.head.appendChild(alternate)
    }
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [locale, page, location.pathname, location.search, t])

  return <>
    <Header locale={locale} page={page} t={t} />
    <main id="main">
      {page === 'home'
        ? <HomePage
            locale={locale}
            t={t}
            now={now}
            today={todayKey}
            onDateChange={setSelectedDate}
            schedules={schedules}
            friday={bikData?.friday ?? null}
            status={bikStatus}
            sourceUrl={bikData?.sourceUrl}
          />
        : <ContentPage
            locale={locale}
            page={page}
            t={t}
            now={now}
            date={selectedDate}
            onDateChange={setSelectedDate}
            schedules={schedules}
            friday={bikData?.friday ?? null}
            status={bikStatus}
            sourceUrl={bikData?.sourceUrl}
          />}
    </main>
    <Footer locale={locale} t={t} />
    <div className="mobile-quick"><Link to={pagePath(locale, 'orari')}>{t.nav.orari}</Link><Link to={pagePath(locale, 'vizita')}>{t.nav.vizita}</Link><Link to={pagePath(locale, 'kontribuo')}>{t.nav.kontribuo}</Link></div>
  </>
}
