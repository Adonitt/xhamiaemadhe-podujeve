import prayerTimesApi from '../../api/prayer-times'

export function onRequest({ request }: { request: Request }): Promise<Response> {
  return prayerTimesApi.fetch(request)
}
