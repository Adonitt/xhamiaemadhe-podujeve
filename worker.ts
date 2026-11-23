import prayerTimesApi from './api/prayer-times'

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url)

    if (pathname === '/api/prayer-times') {
      return prayerTimesApi.fetch(request)
    }

    if (pathname.startsWith('/api/')) {
      return Response.json({ error: 'Not found' }, { status: 404 })
    }

    return env.ASSETS.fetch(request)
  },
}
