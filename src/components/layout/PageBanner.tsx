import type { PageKey } from '../../content'
import type { Copy } from '../../types'

export function PageBanner({ t, page }: { t: Copy; page: PageKey }) {
  return <section className="page-banner"><div className="page-banner-pattern" aria-hidden="true" /><div className="container"><span className="eyebrow eyebrow-bronze"><span className="small-diamond" />{t.city}</span><h1>{t.pageTitles[page]}</h1><p>{t.pageDescriptions[page]}</p></div></section>
}
