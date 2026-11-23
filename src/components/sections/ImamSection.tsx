import { mosqueConfig } from '../../config'
import type { Locale } from '../../content'
import type { Copy } from '../../types'
import { ArchMark } from '../shared/Icons'
import { SectionHeading } from '../shared/SectionHeading'

export function ImamSection({ locale, t }: { locale: Locale; t: Copy }) {
  const imam = mosqueConfig.imam
  const biography = imam.biography[locale]
  const hasProfile = Boolean(imam.name || biography)

  return <section className="section section-imam">
    <div className="container">
      <SectionHeading eyebrow={t.imamEyebrow} title={t.imamTitle} intro={t.imamIntro} />
      <article className={hasProfile ? 'imam-card imam-card-ready' : 'imam-card'}>
        <div className="imam-photo-wrap">
          {imam.photoUrl
            ? <img src={imam.photoUrl} alt={imam.name ?? t.imamTitle} loading="lazy" />
            : <div className="imam-photo-placeholder" aria-hidden="true"><ArchMark large /></div>}
        </div>
        <div className="imam-profile-copy">
          {!hasProfile && <span className="imam-status"><span className="small-diamond" />{t.imamPendingLabel}</span>}
          <h3>{imam.name ?? t.imamPendingName}</h3>
          <p>{biography ?? t.imamPendingText}</p>
        </div>
      </article>
    </div>
  </section>
}
