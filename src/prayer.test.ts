import { afterEach, describe, expect, it } from 'vitest'
import { mosqueConfig, type DailyPrayerTimes } from './config'
import { formatCountdown, isFriday, isFridayDate, kosovoDateKey, nextPrayer, todaySchedule } from './prayer'
import { fridayDateOnOrAfter, fridayPrayerTimeFromDhuhr } from './friday'

const day = (date: string): DailyPrayerTimes => ({
  date,
  begins: { fajr: '05:00', dhuhr: '12:30', asr: '15:30', maghrib: '18:00', isha: '19:30' },
  sunrise: '06:30',
  verifiedBy: 'Test',
})

afterEach(() => mosqueConfig.prayerTimes.splice(0))

describe('Kosovo prayer dates', () => {
  it('uses the Kosovo calendar day and Friday at local midnight', () => {
    expect(kosovoDateKey(new Date('2026-10-15T22:30:00Z'))).toBe('2026-10-16')
    expect(isFriday(new Date('2026-10-15T22:30:00Z'))).toBe(true)
    expect(isFridayDate('2026-10-16')).toBe(true)
  })

  it('uses the next Friday and derives one time from its BIK Dhuhr entry', () => {
    expect(fridayDateOnOrAfter('2026-10-13')).toBe('2026-10-16')
    expect(fridayDateOnOrAfter('2026-10-16')).toBe('2026-10-16')
    expect(fridayDateOnOrAfter('2026-12-31')).toBe('2027-01-01')
    expect(fridayPrayerTimeFromDhuhr('11:24')).toBe('12:00')
    expect(fridayPrayerTimeFromDhuhr('12:25')).toBe('13:00')
    expect(fridayPrayerTimeFromDhuhr('10:59')).toBeNull()
  })

  it('shows Jumu’ah as the next prayer on Friday at its fixed time', () => {
    mosqueConfig.prayerTimes.push(day('2026-10-16'))
    const summer = nextPrayer(new Date('2026-10-16T10:45:00Z'))
    expect(summer).toMatchObject({ key: 'jumuah', begins: '13:00', remainingSeconds: 15 * 60 })
    expect(summer).not.toHaveProperty('congregation')

    const winterDay = day('2026-11-06')
    winterDay.begins.dhuhr = '11:30'
    mosqueConfig.prayerTimes.push(winterDay)
    const winter = nextPrayer(new Date('2026-11-06T10:45:00Z'))
    expect(winter).toMatchObject({ key: 'jumuah', begins: '12:00', remainingSeconds: 15 * 60 })
  })

  it('shows an honest pending state when no verified day exists', () => {
    expect(todaySchedule(new Date('2026-10-13T12:00:00Z'))).toBeUndefined()
    expect(nextPrayer(new Date('2026-10-13T12:00:00Z'))).toBeNull()
  })

  it('finds tomorrow’s Fajr after the final prayer today', () => {
    mosqueConfig.prayerTimes.push(day('2026-10-13'), day('2026-10-14'))
    const next = nextPrayer(new Date('2026-10-13T21:30:00Z'))
    expect(next?.date).toBe('2026-10-14')
    expect(next?.key).toBe('fajr')
    expect(next?.remainingSeconds).toBe(5.5 * 3600)
    expect(formatCountdown(next!.remainingSeconds)).toBe('05:30:00')
  })

  it('accounts for Kosovo daylight saving time', () => {
    mosqueConfig.prayerTimes.push(day('2026-03-29'))
    const next = nextPrayer(new Date('2026-03-29T01:30:00Z'))
    expect(next?.key).toBe('fajr')
    expect(next?.remainingSeconds).toBe(90 * 60)
  })
})
