import { Link } from 'react-router-dom'
import { pagePath, type Locale } from '../../content'
import { mosqueConfig, type DailyPrayerTimes, type PrayerKey } from '../../config'
import { formatCountdown, isFridayDate, kosovoDateKey, nextPrayer } from '../../prayer'
import { fridayDateOnOrAfter, fridayPrayerTimeFromDhuhr } from '../../friday'
import type { BikFriday } from '../../../server/bik'
import type { Copy } from '../../types'
import { formattedToday } from '../../utils/date'
import { ArrowIcon } from '../shared/Icons'
import { SectionHeading } from '../shared/SectionHeading'

const prayerKeys: PrayerKey[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']

function PrayerTable({ locale, t, now, date, schedules, status }: { locale: Locale; t: Copy; now: Date; date: string; schedules: DailyPrayerTimes[]; status: 'loading' | 'ready' | 'error' }) {
  const schedule = schedules.find((item) => item.date === date)
  const next = date === kosovoDateKey(now) ? nextPrayer(now, schedules) : null
  const fridayTime = schedule && isFridayDate(date) ? fridayPrayerTimeFromDhuhr(schedule.begins.dhuhr) : null
  const nextName = next?.key === 'jumuah' ? t.fridayTitle : next ? t.prayerNames[next.key] : ''
  const additionalTimes = [
    ...(schedule?.imsak ? [{ label: t.imsak, time: schedule.imsak }] : []),
    ...(schedule?.sunrise ? [{ label: t.prayerNames.sunrise, time: schedule.sunrise }] : []),
    ...(fridayTime ? [{ label: t.fridayTitle, time: fridayTime }] : []),
  ]

  return <div className="schedule-wrap">
    <div className="schedule-date">{formattedToday(new Date(`${date}T12:00:00Z`), locale)}</div>
    {date === kosovoDateKey(now) && <div className="next-prayer-feature">
      <div className="next-prayer-copy">
        <span className="next-prayer-label">{t.nextPrayer}</span>
        {next
          ? <><strong className="next-prayer-name">{nextName}</strong><span className="next-prayer-remaining">{t.remaining}</span><strong className="next-prayer-countdown">{formatCountdown(next.remainingSeconds)}</strong></>
          : <><strong className="next-prayer-name">{status === 'loading' ? t.scheduleLoading : t.dayComplete}</strong><span className="next-prayer-remaining">{status === 'loading' ? t.schedulePendingText : t.dayCompleteText}</span></>}
      </div>
      {next && <div className="next-prayer-time"><span>{t.starts}</span><time dateTime={next.begins}>{next.begins}</time></div>}
    </div>}
    <div className="prayer-time-grid" aria-label={t.scheduleHeading}>
      {prayerKeys.map((key) => {
        const active = Boolean(next && next.date === date && (next.key === key || (key === 'dhuhr' && next.key === 'jumuah')))
        return <article className={active ? 'prayer-time-card is-next' : 'prayer-time-card'} key={key}>
          {active && <span className="prayer-time-next-label">{t.nextPrayer}</span>}
          <h3>{t.prayerNames[key]}</h3>
          <time dateTime={schedule?.begins[key]}>{schedule?.begins[key] ?? '—:—'}</time>
          {key === 'fajr' && schedule?.fajrAdhan && <span className="prayer-time-adhan">{t.adhan} {schedule.fajrAdhan}</span>}
        </article>
      })}
    </div>
    {additionalTimes.length > 0 && <div className="prayer-additional-times">
      {additionalTimes.map((item) => <div className="prayer-additional-time" key={item.label}><span>{item.label}</span><time>{item.time}</time></div>)}
    </div>}
    <p className="source-note">{schedule ? (schedule.source === 'bik' ? t.bikSourceNote : `${t.verified}: ${schedule.verifiedBy}`) : status === 'loading' ? t.scheduleLoading : t.sourceNote}</p>
    {schedule?.imsak && <p className="fajr-note">{t.fajrRule}</p>}
  </div>
}

function FridayCard({ locale, t, date, friday, status }: { locale: Locale; t: Copy; date: string; friday: BikFriday | null; status: 'loading' | 'ready' | 'error' }) {
  const shownFriday = friday?.date === fridayDateOnOrAfter(date) ? friday : null
  return <div className="friday-card">
    <div className="friday-top"><span className="eyebrow eyebrow-bronze"><span className="small-diamond" />{t.fridayEyebrow}</span><span className="friday-star" aria-hidden="true">✧</span></div>
    <h3>{t.fridayTitle}</h3>
    {shownFriday ? <>
      <time className="friday-date" dateTime={shownFriday.date}>{formattedToday(new Date(`${shownFriday.date}T12:00:00Z`), locale)}</time>
      <div className="friday-single-time"><span>{t.fridayTimeLabel}</span><strong>{shownFriday.prayerTime}</strong></div>
      <p>{t.fridayFixedNote}</p>
    </> : <p className="friday-unavailable">{status === 'loading' ? t.scheduleLoading : t.fridayUnavailable}</p>}
  </div>
}

export function ScheduleSection({ locale, t, now, date, onDateChange, schedules, friday, status, sourceUrl, full = false }: { locale: Locale; t: Copy; now: Date; date: string; onDateChange: (value: string) => void; schedules: DailyPrayerTimes[]; friday: BikFriday | null; status: 'loading' | 'ready' | 'error'; sourceUrl?: string; full?: boolean }) {
  const shiftDate = (days: number) => {
    const next = new Date(`${date}T12:00:00Z`)
    next.setUTCDate(next.getUTCDate() + days)
    const key = next.toISOString().slice(0, 10)
    if (key >= '2026-01-01' && key <= '2026-12-31') onDateChange(key)
  }
  const chooseDate = (value: string) => {
    if (value >= '2026-01-01' && value <= '2026-12-31') onDateChange(value)
  }
  return <section className={full ? 'section section-schedule section-page' : 'section section-schedule'} id="schedule">
    <div className="container">
      <SectionHeading eyebrow={full ? t.scheduleYearEyebrow : t.today} title={full ? t.scheduleYearHeading : t.scheduleHeading} intro={full ? t.scheduleYearIntro : t.scheduleIntro} action={!full && <Link className="text-link" to={pagePath(locale, 'orari')}>{t.fullSchedule}<ArrowIcon /></Link>} />
      {full && <div className="date-selector"><div><label htmlFor="prayer-date">{t.datePickerLabel}</label><span>{t.yearRange}</span></div><div className="date-controls"><button type="button" aria-label={locale === 'sq' ? 'Dita e mëparshme' : 'Previous day'} disabled={date <= '2026-01-01'} onClick={() => shiftDate(-1)}>‹</button><input id="prayer-date" type="date" min="2026-01-01" max="2026-12-31" value={date} onInput={(event) => chooseDate(event.currentTarget.value)} onChange={(event) => chooseDate(event.currentTarget.value)} /><button type="button" aria-label={locale === 'sq' ? 'Dita e ardhshme' : 'Next day'} disabled={date >= '2026-12-31'} onClick={() => shiftDate(1)}>›</button><button type="button" className="today-control" onClick={() => onDateChange(kosovoDateKey(now))}>{t.todayButton}</button></div></div>}
      <div className="schedule-grid"><PrayerTable locale={locale} t={t} now={now} date={date} schedules={schedules} status={status} /><FridayCard locale={locale} t={t} date={date} friday={friday} status={status} /></div>
      <a className="source-link" href={sourceUrl ?? mosqueConfig.bikCalendarUrl} target="_blank" rel="noopener noreferrer">{t.sourceBik}<ArrowIcon diagonal /></a>
    </div>
  </section>
}
