import { useEffect, useRef, useState } from 'react'
import { mosquePhotos } from '../../gallery'
import type { Locale } from '../../content'
import type { Copy } from '../../types'
import { ArrowIcon } from '../shared/Icons'
import { SectionHeading } from '../shared/SectionHeading'

const galleryPhotos = mosquePhotos.length === 0
  ? []
  : Array.from({ length: Math.max(10, mosquePhotos.length) }, (_, index) => ({
      ...mosquePhotos[index % mosquePhotos.length],
      galleryKey: `mosque-photo-${index + 1}`,
    }))

export function GallerySection({ locale, t, full = false }: { locale: Locale; t: Copy; full?: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(6)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const selectedPhoto = selectedIndex === null ? null : galleryPhotos[selectedIndex]
  const visiblePhotos = galleryPhotos.slice(0, visibleCount)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (selectedIndex !== null && !dialog.open) dialog.showModal()
    if (selectedIndex === null && dialog.open) dialog.close()
  }, [selectedIndex])

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setSelectedIndex((current) => current === null ? null : (current + 1) % galleryPhotos.length)
      }
      if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) => current === null ? null : (current - 1 + galleryPhotos.length) % galleryPhotos.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex])

  return <section className={full ? 'section section-gallery section-page' : 'section section-gallery'} id="gallery">
    <div className="container">
      <SectionHeading eyebrow={t.galleryEyebrow} title={t.galleryTitle} intro={t.galleryIntro} />
      <div className="gallery-grid">
        {visiblePhotos.map((photo, index) => <button
          className="gallery-card"
          key={photo.galleryKey}
          type="button"
          onClick={() => setSelectedIndex(index)}
          aria-label={`${photo.alt[locale]} — ${locale === 'sq' ? 'Hap fotografinë' : 'Open photo'}`}
        >
          <img src={photo.src} alt="" loading="lazy" />
          <span className="gallery-caption"><span>{photo.alt[locale]}</span><span aria-hidden="true">⤢</span></span>
        </button>)}
      </div>
      {visibleCount < galleryPhotos.length && <button
        className="button button-dark gallery-more"
        type="button"
        onClick={() => setVisibleCount((current) => Math.min(current + 6, galleryPhotos.length))}
      >
        {t.galleryShowMore}<ArrowIcon />
      </button>}
    </div>

    <dialog
      className="gallery-lightbox"
      ref={dialogRef}
      aria-label={locale === 'sq' ? 'Fotografia në madhësi të plotë' : 'Full-size photo'}
      onCancel={(event) => {
        event.preventDefault()
        setSelectedIndex(null)
      }}
      onClose={() => setSelectedIndex(null)}
      onClick={(event) => {
        if (event.target === event.currentTarget) setSelectedIndex(null)
      }}
    >
      {selectedPhoto && selectedIndex !== null && <div className="gallery-lightbox-content">
        <button
          className="gallery-lightbox-close"
          type="button"
          onClick={() => setSelectedIndex(null)}
          aria-label={locale === 'sq' ? 'Mbylle fotografinë' : 'Close photo'}
        >×</button>
        <button
          className="gallery-lightbox-arrow gallery-lightbox-previous"
          type="button"
          onClick={() => setSelectedIndex((selectedIndex - 1 + galleryPhotos.length) % galleryPhotos.length)}
          aria-label={locale === 'sq' ? 'Fotografia paraprake' : 'Previous photo'}
        >‹</button>
        <img className="gallery-lightbox-image" src={selectedPhoto.src} alt={selectedPhoto.alt[locale]} />
        <button
          className="gallery-lightbox-arrow gallery-lightbox-next"
          type="button"
          onClick={() => setSelectedIndex((selectedIndex + 1) % galleryPhotos.length)}
          aria-label={locale === 'sq' ? 'Fotografia e ardhshme' : 'Next photo'}
        >›</button>
        <div className="gallery-lightbox-caption">
          <span>{selectedPhoto.alt[locale]}</span>
          <span>{selectedIndex + 1} / {galleryPhotos.length}</span>
        </div>
      </div>}
    </dialog>
  </section>
}
