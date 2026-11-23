import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prayerTimesApi from './api/prayer-times'

export default defineConfig({
  plugins: [react(), {
    name: 'local-prayer-times-api',
    configureServer(server) {
      server.middlewares.use('/api/prayer-times', async (request, response) => {
        const result = await prayerTimesApi.fetch(new Request(`http://localhost/api/prayer-times${request.url ?? ''}`, { method: request.method }))
        response.statusCode = result.status
        result.headers.forEach((value, key) => response.setHeader(key, value))
        response.end(await result.text())
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/prayer-times', async (request, response) => {
        const result = await prayerTimesApi.fetch(new Request(`http://localhost/api/prayer-times${request.url ?? ''}`, { method: request.method }))
        response.statusCode = result.status
        result.headers.forEach((value, key) => response.setHeader(key, value))
        response.end(await result.text())
      })
    },
  }],
})
