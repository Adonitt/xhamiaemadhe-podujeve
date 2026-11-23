import { describe, expect, it } from 'vitest'
import { pagePath, resolveRoute } from './content'

describe('language routes', () => {
  it('uses clean URLs for each page and language', () => {
    expect(pagePath('sq', 'home')).toBe('/')
    expect(pagePath('en', 'home')).toBe('/?lang=en')
    expect(pagePath('sq', 'orari')).toBe('/orari')
    expect(pagePath('en', 'orari')).toBe('/prayer-times')
    expect(resolveRoute('/orari')).toMatchObject({ locale: 'sq', page: 'orari' })
    expect(resolveRoute('/prayer-times')).toMatchObject({ locale: 'en', page: 'orari' })
    expect(resolveRoute('/', '?lang=en')).toMatchObject({ locale: 'en', page: 'home' })
  })

  it('redirects old language-prefixed links to the clean URLs', () => {
    expect(resolveRoute('/sq')).toMatchObject({ redirect: '/' })
    expect(resolveRoute('/en')).toMatchObject({ redirect: '/?lang=en' })
    expect(resolveRoute('/sq/orari')).toMatchObject({ redirect: '/orari' })
    expect(resolveRoute('/en/prayer-times')).toMatchObject({ redirect: '/prayer-times' })
    expect(resolveRoute('/unknown')).toMatchObject({ redirect: '/' })
  })
})
