export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 16 16 4M6 4h10v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )
}

export function ArchMark({ large = false }: { large?: boolean }) {
  return <svg className={large ? 'arch-mark arch-mark-large' : 'arch-mark'} aria-hidden="true" viewBox="0 0 72 80" fill="none">
    <path d="M7 73V32C7 18 18 7 36 2c18 5 29 16 29 30v41" stroke="currentColor" strokeWidth="2.5" />
    <path d="M15 73V34c0-10 7-18 21-23 14 5 21 13 21 23v39" stroke="currentColor" strokeWidth="1.5" />
    <path d="M27 73V40c0-6 3-11 9-14 6 3 9 8 9 14v33" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 73h58" stroke="currentColor" strokeWidth="2.5" />
  </svg>
}

export function ArchitectureArt() {
  return <div className="architecture-art" aria-hidden="true">
    <div className="architecture-disc" />
    <div className="architecture-lines">
      <span /><span /><span /><span /><span />
    </div>
    <svg viewBox="0 0 640 460" className="architecture-svg" fill="none" preserveAspectRatio="xMidYMax meet">
      <path d="M20 460V245C20 150 76 80 158 48c82 32 138 102 138 197v215" />
      <path d="M72 460V249c0-64 30-112 86-144 56 32 86 80 86 144v211" />
      <path d="M124 460V264c0-28 12-51 34-67 22 16 34 39 34 67v196" />
      <path d="M293 460V194C293 91 359 18 461 0c102 18 168 91 168 194v266" />
      <path d="M345 460V199c0-72 42-122 116-147 74 25 116 75 116 147v261" />
      <path d="M397 460V218c0-36 24-67 64-82 40 15 64 46 64 82v242" />
      <path d="M0 459h640" />
      <path d="M461 0V-34" />
    </svg>
  </div>
}
