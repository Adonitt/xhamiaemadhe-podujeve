import type { Locale } from '../content'
import type { DailyPrayerTimes } from '../config'
import type { BikFriday } from '../../server/bik'
import type { Copy } from '../types'
import { AboutSection } from '../components/sections/AboutSection'
import { DonationSection } from '../components/sections/DonationSection'
import { Hero } from '../components/sections/HeroSection'
import { NoticesSection } from '../components/sections/NoticesSection'
import { ProgrammeGrid } from '../components/sections/ProgrammeSection'
import { ScheduleSection } from '../components/sections/ScheduleSection'
import { VisitSection } from '../components/sections/VisitSection'

type HomePageProps = {
  locale: Locale
  t: Copy
  now: Date
  today: string
  schedules: DailyPrayerTimes[]
  friday: BikFriday | null
  status: 'loading' | 'ready' | 'error'
  sourceUrl?: string
  onDateChange: (value: string) => void
}

export function HomePage({ locale, t, now, today, schedules, friday, status, sourceUrl, onDateChange }: HomePageProps) {
  return <>
    <Hero locale={locale} t={t} now={now} />
    <ScheduleSection
      locale={locale}
      t={t}
      now={now}
      date={today}
      onDateChange={onDateChange}
      schedules={schedules}
      friday={friday}
      status={status}
      sourceUrl={sourceUrl}
    />
    <ProgrammeGrid locale={locale} t={t} />
    <NoticesSection locale={locale} t={t} />
    <AboutSection locale={locale} t={t} />
    <DonationSection locale={locale} t={t} />
    <VisitSection locale={locale} t={t} />
  </>
}
