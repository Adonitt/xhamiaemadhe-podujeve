import { mosqueConfig, type DailyPrayerTimes, type PrayerKey } from './config'
import { fridayPrayerTimeFromDhuhr, isFridayDate } from './friday'

export { isFridayDate } from './friday'

const prayerOrder: PrayerKey[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']
const kosovoTimeZone = 'Europe/Belgrade'
export type PrayerEventKey = PrayerKey | 'jumuah'

function partsAt(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: kosovoTimeZone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const value = (part: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((item) => item.type === part)?.value ?? 0)
  return {
    year: value('year'), month: value('month'), day: value('day'),
    hour: value('hour'), minute: value('minute'), second: value('second'),
  }
}

export function kosovoDateKey(date: Date): string {
  const { year, month, day } = partsAt(date)
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function todaySchedule(date: Date, schedules: DailyPrayerTimes[] = mosqueConfig.prayerTimes): DailyPrayerTimes | undefined {
  return schedules.find((item) => item.date === kosovoDateKey(date))
}

export function isFriday(date: Date): boolean {
  return new Intl.DateTimeFormat('en-US', { timeZone: kosovoTimeZone, weekday: 'short' }).format(date) === 'Fri'
}

function parseTime(time: string): { hours: number; minutes: number } | null {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time)
  return match ? { hours: Number(match[1]), minutes: Number(match[2]) } : null
}

/** Convert a Kosovo wall-clock time to UTC, including seasonal offset changes. */
function zonedTimeToUtc(dateKey: string, time: string): number | null {
  const parsed = parseTime(time)
  if (!parsed) return null
  const [year, month, day] = dateKey.split('-').map(Number)
  const wallClock = Date.UTC(year, month - 1, day, parsed.hours, parsed.minutes)
  let utc = wallClock
  for (let i = 0; i < 3; i += 1) {
    const p = partsAt(new Date(utc))
    const observedWallClock = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute)
    utc += wallClock - observedWallClock
  }
  return utc
}

export type NextPrayer = {
  key: PrayerEventKey
  begins: string
  date: string
  remainingSeconds: number
}

export function nextPrayer(now: Date, schedules: DailyPrayerTimes[] = mosqueConfig.prayerTimes): NextPrayer | null {
  const currentDay = kosovoDateKey(now)
  const [year, month, day] = currentDay.split('-').map(Number)
  const nextDayDate = new Date(Date.UTC(year, month - 1, day + 1, 12))
  const nextDay = `${nextDayDate.getUTCFullYear()}-${String(nextDayDate.getUTCMonth() + 1).padStart(2, '0')}-${String(nextDayDate.getUTCDate()).padStart(2, '0')}`
  const candidates = schedules
    .filter((schedule) => schedule.date === currentDay || schedule.date === nextDay)
    .flatMap((schedule) => prayerOrder.map((prayerKey) => {
      const fridayTime = prayerKey === 'dhuhr' && isFridayDate(schedule.date)
        ? fridayPrayerTimeFromDhuhr(schedule.begins.dhuhr)
        : null
      const key: PrayerEventKey = fridayTime ? 'jumuah' : prayerKey
      const begins = fridayTime ?? schedule.begins[prayerKey]
      return { key, begins, date: schedule.date, timestamp: zonedTimeToUtc(schedule.date, begins) }
    }))
    .filter((item): item is typeof item & { timestamp: number } => item.timestamp !== null && item.timestamp > now.getTime())
    .sort((a, b) => a.timestamp - b.timestamp)

  const first = candidates[0]
  return first ? {
    key: first.key,
    begins: first.begins,
    date: first.date,
    remainingSeconds: Math.max(0, Math.floor((first.timestamp - now.getTime()) / 1000)),
  } : null
}

export function formatCountdown(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainder = seconds % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
}
