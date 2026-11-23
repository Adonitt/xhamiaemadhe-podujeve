import prayerTimesApi from '../../api/prayer-times'

export default function handler(request: Request): Promise<Response> {
  return prayerTimesApi.fetch(request)
}
