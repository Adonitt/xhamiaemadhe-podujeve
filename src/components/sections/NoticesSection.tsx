import { Link } from 'react-router-dom'
import { pagePath, type Locale } from '../../content'
import { notices, type MosqueNotice } from '../../data'
import type { Copy } from '../../types'
import { formattedToday } from '../../utils/date'
import { ArchMark, ArrowIcon } from '../shared/Icons'
import { SectionHeading } from '../shared/SectionHeading'

function NoticeCard({ notice, locale, t }: { notice?: MosqueNotice; locale: Locale; t: Copy }) {
  const isSample = !notice
  const mosqueName = locale === 'sq' ? 'Xhamia e Madhe · Podujevë' : 'The Grand Mosque · Podujevë'

  return <article className={isSample ? 'notice-item notice-item-sample' : 'notice-item'}>
    <div className="notice-card-header">
      <div className="notice-card-source">
        <span className="notice-card-mark" aria-hidden="true"><ArchMark /></span>
        <span>{mosqueName}</span>
      </div>
      {notice
        ? <div className="notice-published"><span>{t.noticeDateLabel}</span><time dateTime={notice.date}>{formattedToday(new Date(`${notice.date}T12:00:00Z`), locale)}</time></div>
        : <span className="notice-sample-label">{t.noticeSampleLabel}</span>}
    </div>
    <h3>{notice ? notice.title[locale] : t.noticeSampleTitle}</h3>
    <p>{notice ? notice.body[locale] : t.noticeSampleBody}</p>
  </article>
}

export function NoticesSection({ locale, t, full = false }: { locale: Locale; t: Copy; full?: boolean }) {
  const published = [...notices].sort((a, b) => b.date.localeCompare(a.date)).slice(0, full ? undefined : 3)
  return <section className={full ? 'section section-notices section-page' : 'section section-notices'}><div className="container notices-grid">
    <SectionHeading eyebrow={t.noticeEyebrow} title={t.noticeTitle} intro={t.noticeText} />
    <div className="notice-list">
      {published.length
        ? published.map((item) => <NoticeCard key={item.id} notice={item} locale={locale} t={t} />)
        : <NoticeCard locale={locale} t={t} />}
      {!full && <Link className="text-link" to={pagePath(locale, 'njoftimet')}>{t.nav.njoftimet}<ArrowIcon /></Link>}
    </div>
  </div></section>
}
