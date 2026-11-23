import { BIK_YEAR, getBikDate } from '../server/bik'

const todayInKosovo = () => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Belgrade', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date())
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? ''
  return `${part('year')}-${part('month')}-${part('day')}`
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'GET') return Response.json({ error: 'Method not allowed' }, { status: 405 })
    const date = new URL(request.url).searchParams.get('date') ?? todayInKosovo()
    if (!new RegExp(`^${BIK_YEAR}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`).test(date)) {
      return Response.json({ error: 'Choose a date in 2026' }, { status: 400 })
    }
    try {
      return Response.json(await getBikDate(date), {
        headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600' },
      })
    } catch (error) {
      console.error('BIK prayer times unavailable:', error)
      return Response.json({ error: 'BIK prayer times unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
    }
  },
}
