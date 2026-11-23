import { Link } from 'react-router-dom'
import { pagePath, type Locale } from '../../content'
import { mosqueConfig } from '../../config'
import type { Copy } from '../../types'
import { ArchMark, ArrowIcon } from '../shared/Icons'

export function DonationSection({ locale, t, full = false }: { locale: Locale; t: Copy; full?: boolean }) {
  const bank = mosqueConfig.bankTransfer
  const address = locale === 'sq' ? mosqueConfig.address : mosqueConfig.addressEn
  const bankFields = [
    { label: t.donateBeneficiary, value: bank.beneficiary, important: false },
    { label: t.donateBank, value: bank.bankName, important: false },
    { label: t.donateIban, value: bank.iban, important: true },
    { label: t.donateSwift, value: bank.swiftBic, important: false },
  ]

  return <section className={full ? 'section section-donation section-page' : 'section section-donation'}>
    <div className="container">
      <div className={full ? 'donation-layout donation-layout-full' : 'donation-layout'}>
        <div className="donation-copy">
          <span className="eyebrow eyebrow-bronze"><span className="small-diamond" />{t.donateEyebrow}</span>
          <h2>{t.donateTitle}</h2>
          <p>{t.donateText}</p>
          {mosqueConfig.donationUrl
            ? <a className="button button-bronze donation-more" href={mosqueConfig.donationUrl} target="_blank" rel="noopener noreferrer">
                {t.donateActive}<ArrowIcon diagonal />
              </a>
            : !full && <Link className="button button-bronze donation-more" to={pagePath(locale, 'kontribuo')}>
                {t.nav.kontribuo}<ArrowIcon />
              </Link>}
        </div>

        <aside className="donation-card" aria-label={t.donateBankTitle}>
          <div className="donation-card-header">
            <span className="donation-card-kicker"><span className="small-diamond" />{t.donateTransferLabel}</span>
            <span className="donation-card-mark" aria-hidden="true"><ArchMark /></span>
          </div>
          <h3>{t.donateBankTitle}</h3>
          <p className="donation-card-intro">{t.donateBankIntro}</p>

          <dl className="donation-details">
            {bankFields.map(({ label, value, important }) => <div className={important ? 'donation-detail donation-detail-iban' : 'donation-detail'} key={label}>
              <dt>{label}</dt>
              <dd className={value ? 'donation-detail-value' : 'donation-detail-pending'}>
                {value ?? t.donateDetailsPending}
              </dd>
            </div>)}
          </dl>

          <div className="donation-mosque-info">
            <span>{t.donateMosqueAddress}</span>
            <a href={mosqueConfig.mapUrl} target="_blank" rel="noopener noreferrer">{address}<ArrowIcon diagonal /></a>
          </div>
          <p className="donation-card-note"><span aria-hidden="true">✦</span>{t.donateSecurityNote}</p>
        </aside>
      </div>
    </div>
  </section>
}
