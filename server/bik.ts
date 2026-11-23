import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
// PDF.js uses this module as its fake worker in Node; import it explicitly so
// serverless bundlers include it alongside pdf.mjs.
import 'pdfjs-dist/legacy/build/pdf.worker.mjs'
import type { DailyPrayerTimes } from '../src/config'
import { fridayDateOnOrAfter, fridayPrayerTimeFromDhuhr } from '../src/friday'

export const BIK_YEAR = 2026
export const BIK_PDF_URL = 'https://dituriaislame.com/wp-content/uploads/2026/01/takvimi2026vaktet.pdf'

export type BikFriday = { date: string; prayerTime: '12:00' | '13:00' }
export type BikDayResponse = { schedule: DailyPrayerTimes; friday: BikFriday | null; sourceUrl: string }

async function loadPdf() {
  const response = await fetch(BIK_PDF_URL, { signal: AbortSignal.timeout(12000) })
  if (!response.ok) throw new Error(`BIK PDF returned ${response.status}`)
  const bytes = new Uint8Array(await response.arrayBuffer())
  if (bytes.length < 10000 || bytes.length > 5_000_000) throw new Error('Unexpected BIK PDF size')
  return getDocument({ data: bytes, useSystemFonts: true, disableFontFace: true }).promise
}

let pdfPromise: ReturnType<typeof loadPdf> | null = null
const documentForYear = () => {
  if (!pdfPromise) pdfPromise = loadPdf().catch((error) => { pdfPromise = null; throw error })
  return pdfPromise
}

const clock = (minutes: number): string => {
  const value = ((minutes % 1440) + 1440) % 1440
  return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`
}

const minutes = (time: string): number => {
  const match = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(time)
  if (!match) throw new Error(`Invalid BIK time: ${time}`)
  return Number(match[1]) * 60 + Number(match[2])
}

function parseDate(date: string) {
  const match = /^(2026)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.exec(date)
  if (!match) throw new Error('Date must be within 2026')
  const year = Number(match[1]); const month = Number(match[2]); const day = Number(match[3])
  if (new Date(Date.UTC(year, month - 1, day)).getUTCMonth() !== month - 1) throw new Error('Invalid calendar date')
  return { year, month, day }
}

export async function getBikDay(date: string): Promise<DailyPrayerTimes> {
  const { month, day } = parseDate(date)
  const pdf = await documentForYear()
  const page = await pdf.getPage(9 + (month - 1) * 2)
  const { items } = await page.getTextContent()
  const textItems = items.filter((item) => 'str' in item)
  const dayItem = textItems.find((item) => item.str.trim() === String(day) && item.transform[4] < 45 && item.transform[5] > 25 && item.transform[5] < 340)
  if (!dayItem) throw new Error(`BIK row missing for ${date}`)
  const rowText = textItems
    .filter((item) => Math.abs(item.transform[5] - dayItem.transform[5]) < 0.4)
    .sort((a, b) => a.transform[4] - b.transform[4])
    .map((item) => item.str)
    .join(' ')
  const times = [...rowText.matchAll(/\b\d{1,2}[:.]\d{2}\b/g)].map((match) => minutes(match[0].replace('.', ':')))
  if (times.length !== 8 || times[1] - times[0] !== 20) throw new Error(`BIK row could not be validated for ${date}`)

  const [baseImsak, , baseSunrise, baseDhuhr, baseAsr, baseMaghrib, baseIsha] = times
  const imsak = baseImsak
  const sunrise = baseSunrise

  // Use the Takvim's printed times unchanged. The mosque's requested Sabah
  // rule is 30 minutes after Imsak; its adhan is 30 minutes before sunrise.
  return {
    date,
    begins: {
      fajr: clock(imsak + 30),
      dhuhr: clock(baseDhuhr),
      asr: clock(baseAsr),
      maghrib: clock(baseMaghrib),
      isha: clock(baseIsha),
    },
    sunrise: clock(sunrise),
    imsak: clock(imsak),
    fajrAdhan: clock(sunrise - 30),
    verifiedBy: 'Takvimi 2026 i BIK-ut',
    source: 'bik',
  }
}

export async function getBikDate(date: string): Promise<BikDayResponse> {
  const schedule = await getBikDay(date)
  const fridayDate = fridayDateOnOrAfter(date)
  if (fridayDate > `${BIK_YEAR}-12-31`) return { schedule, friday: null, sourceUrl: BIK_PDF_URL }
  const fridaySchedule = fridayDate === date ? schedule : await getBikDay(fridayDate)
  const prayerTime = fridayPrayerTimeFromDhuhr(fridaySchedule.begins.dhuhr)
  return {
    schedule,
    friday: prayerTime ? { date: fridayDate, prayerTime } : null,
    sourceUrl: BIK_PDF_URL,
  }
}
