import type { Locale } from '../content'

export function formattedToday(now: Date, locale: Locale) {
  if (locale === 'en') {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Belgrade', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }).format(now)
  }
  const raw = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Belgrade', weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric',
  }).formatToParts(now)
  const part = (type: Intl.DateTimeFormatPartTypes) => raw.find((item) => item.type === type)?.value ?? ''
  const weekdays: Record<string, string> = {
    Sunday: 'E diel', Monday: 'E hënë', Tuesday: 'E martë', Wednesday: 'E mërkurë',
    Thursday: 'E enjte', Friday: 'E premte', Saturday: 'E shtunë',
  }
  const months = ['janar', 'shkurt', 'mars', 'prill', 'maj', 'qershor', 'korrik', 'gusht', 'shtator', 'tetor', 'nëntor', 'dhjetor']
  return `${weekdays[part('weekday')]}, ${part('day')} ${months[Number(part('month')) - 1]} ${part('year')}`
}
