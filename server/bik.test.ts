import { expect, it } from 'vitest'
import { getBikDate, getBikDay } from './bik'
import { fridayPrayerTimeFromDhuhr, isFridayDate } from '../src/friday'

it('reads the BIK day without a city minute adjustment', async () => {
  const result = await getBikDate('2026-10-13')
  expect(result.schedule).toMatchObject({
    begins: { fajr: '05:38', dhuhr: '12:26', asr: '15:36', maghrib: '18:06', isha: '19:36' },
    imsak: '05:08', fajrAdhan: '06:08', sunrise: '06:38',
  })
  expect(result.schedule).not.toHaveProperty('congregation')
  expect(result.friday).toEqual({ date: '2026-10-16', prayerTime: '13:00' })
  expect(Object.keys(result).sort()).toEqual(['friday', 'schedule', 'sourceUrl'])
})

it('uses the Friday Dhuhr entry for the single winter time', async () => {
  expect((await getBikDate('2026-11-04')).friday).toEqual({ date: '2026-11-06', prayerTime: '12:00' })
  expect((await getBikDate('2026-12-31')).friday).toBeNull()
})

it('reads every day of 2026, including the daylight saving change', async () => {
  for (let date = new Date('2026-01-01T12:00:00Z'); date.getUTCFullYear() === 2026; date.setUTCDate(date.getUTCDate() + 1)) {
    const key = date.toISOString().slice(0, 10)
    const schedule = await getBikDay(key)
    expect(schedule.date).toBe(key)
    expect(schedule.begins.fajr).toMatch(/^\d\d:\d\d$/)
    if (isFridayDate(key)) expect(fridayPrayerTimeFromDhuhr(schedule.begins.dhuhr)).not.toBeNull()
  }
  expect((await getBikDay('2026-10-25')).begins.dhuhr).toBe('11:24')
})
