import { Link } from 'react-router-dom'
import { pagePath, type Locale } from '../../content'
import { events } from '../../data'
import { kosovoDateKey } from '../../prayer'
import type { Copy } from '../../types'
import { formattedToday } from '../../utils/date'
import { ArchMark, ArrowIcon } from '../shared/Icons'
import { SectionHeading } from '../shared/SectionHeading'

export function ProgrammeGrid({ locale, t, full = false }: { locale: Locale; t: Copy; full?: boolean }) {
  const upcoming = events.filter((item) => item.date >= kosovoDateKey(new Date())).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
  return <section className={full ? 'section section-programmes section-page' : 'section section-programmes'}>
    <div className="container">
      <SectionHeading eyebrow={t.programmesEyebrow} title={t.programmesTitle} intro={t.programmesIntro} action={!full && <Link className="text-link" to={pagePath(locale, 'aktivitetet')}>{t.programmeMore}<ArrowIcon /></Link>} />
      <div className="programme-grid">{t.programmeItems.map((item) => <article className="programme-card" key={item.no}><div className="programme-number">{item.no}</div><div className="programme-icon" aria-hidden="true"><ArchMark /></div><h3>{item.title}</h3><p>{item.text}</p>{full && item.timing && <span className="programme-timing">{item.timing}</span>}</article>)}</div>
      {(full || upcoming.length > 0) && <div className="upcoming-block"><h3>{t.upcomingTitle}</h3>{upcoming.length ? <div className="event-grid">{upcoming.slice(0, full ? undefined : 3).map((item) => <article className="event-card" key={item.id}><span className="event-date">{formattedToday(new Date(`${item.date}T12:00:00Z`), locale)} · {item.time}</span><h4>{item.title[locale]}</h4><p>{item.description[locale]}</p><div><strong>{t.eventContact}:</strong> {item.contact}</div></article>)}</div> : <p className="upcoming-empty">{t.upcomingEmpty}</p>}</div>}
    </div>
  </section>
}
