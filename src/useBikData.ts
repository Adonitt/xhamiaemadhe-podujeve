import { useEffect, useState } from 'react'
import type { BikDayResponse } from '../server/bik'

type Status = 'loading' | 'ready' | 'error'

export function useBikData(date: string) {
  const [data, setData] = useState<BikDayResponse | null>(null)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    const controller = new AbortController()
    setData(null)
    setStatus('loading')
    fetch(`/api/prayer-times?date=${encodeURIComponent(date)}&v=2`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Prayer API returned ${response.status}`)
        return response.json() as Promise<BikDayResponse>
      })
      .then((result) => {
        if (result.schedule?.date !== date) throw new Error('Unexpected prayer data')
        setData(result)
        setStatus('ready')
      })
      .catch((error) => {
        if (controller.signal.aborted) return
        console.error('Could not load BIK prayer data:', error)
        setStatus('error')
      })
    return () => controller.abort()
  }, [date])

  return { data, status }
}
