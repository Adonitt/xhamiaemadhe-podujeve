import type { Locale, PageKey } from '../content'
import type { DailyPrayerTimes } from '../config'
import type { BikFriday } from '../../server/bik'
import type { Copy } from '../types'
import { PageBanner } from '../components/layout/PageBanner'
import { AboutSection } from '../components/sections/AboutSection'
import { DonationSection } from '../components/sections/DonationSection'
import { GallerySection } from '../components/sections/GallerySection'
import { ImamSection } from '../components/sections/ImamSection'
import { MosqueDetailsSection } from '../components/sections/MosqueDetailsSection'
import { NoticesSection } from '../components/sections/NoticesSection'
import { ProgrammeGrid } from '../components/sections/ProgrammeSection'
import { ScheduleSection } from '../components/sections/ScheduleSection'
import { VisitSection } from '../components/sections/VisitSection'

type ContentPageProps = {
  locale: Locale
  page: PageKey
  t: Copy
  now: Date
  date: string
  schedules: DailyPrayerTimes[]
  friday: BikFriday | null
  status: 'loading' | 'ready' | 'error'
  sourceUrl?: string
  onDateChange: (value: string) => void
}

export function ContentPage({ locale, page, t, now, date, schedules, friday, status, sourceUrl, onDateChange }: ContentPageProps) {
  return <>
    <PageBanner t={t} page={page} />
    {page === 'orari' && <ScheduleSection
      locale={locale}
      t={t}
      now={now}
      date={date}
      onDateChange={onDateChange}
      schedules={schedules}
      friday={friday}
      status={status}
      sourceUrl={sourceUrl}
      full
    />}
    {page === 'aktivitetet' && <ProgrammeGrid locale={locale} t={t} full />}
    {page === 'njoftimet' && <NoticesSection locale={locale} t={t} full />}
    {page === 'rreth' && <>
      <AboutSection locale={locale} t={t} full />
      <MosqueDetailsSection locale={locale} t={t} />
      <ImamSection locale={locale} t={t} />
      <GallerySection locale={locale} t={t} full />
    </>}
    {page === 'vizita' && <VisitSection locale={locale} t={t} full />}
    {page === 'kontribuo' && <DonationSection locale={locale} t={t} full />}
  </>
}
