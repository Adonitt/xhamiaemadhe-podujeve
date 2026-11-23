/** The Friday on or after a Kosovo calendar date. */
export function fridayDateOnOrAfter(dateKey: string): string {
  const date = new Date(`${dateKey}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + (5 - date.getUTCDay() + 7) % 7)
  return date.toISOString().slice(0, 10)
}

export function isFridayDate(dateKey: string): boolean {
  return fridayDateOnOrAfter(dateKey) === dateKey
}

/** The mosque prays Jumu'ah at the next whole hour after BIK's Dhuhr entry. */
export function fridayPrayerTimeFromDhuhr(dhuhr: string): '12:00' | '13:00' | null {
  if (/^11:[0-5]\d$/.test(dhuhr)) return '12:00'
  if (/^12:[0-5]\d$/.test(dhuhr)) return '13:00'
  return null
}
