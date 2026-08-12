/**
 * Skeleton placeholders. Each one mirrors the real component's box model so
 * swapping in the loaded content does not shift the layout.
 */

export function Skeleton({ w, h, r, className = '', style }) {
  return (
    <span
      className={`sk ${className}`}
      style={{ width: w, height: h, borderRadius: r, ...style }}
      aria-hidden="true"
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="sk-card" aria-hidden="true">
      <Skeleton className="sk-media" />
      <div className="sk-body">
        <Skeleton w="35%" h={10} />
        <Skeleton w="85%" h={16} />
        <Skeleton w="65%" h={12} />
        <div className="sk-row">
          <Skeleton w={56} h={10} />
          <Skeleton w={56} h={10} />
          <Skeleton w={70} h={10} />
        </div>
      </div>
      <div className="sk-foot">
        <Skeleton w={30} h={30} r="50%" />
        <Skeleton w="45%" h={12} />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6, className = '' }) {
  return (
    <div className={`listing-grid ${className}`} role="status" aria-label="Loading properties">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonMap({ height = 380 }) {
  return (
    <div className="sk-map" style={{ height }} role="status" aria-label="Loading map">
      <Skeleton className="sk-fill" />
      <span className="sk-map-note">Loading map…</span>
    </div>
  )
}

/** Full-page placeholder used while a lazily-loaded route arrives. */
export function SkeletonPage() {
  return (
    <div role="status" aria-label="Loading page">
      <div className="sk-hero">
        <div className="container">
          <Skeleton w={180} h={12} />
          <Skeleton w="min(520px, 80%)" h={38} style={{ marginTop: 16 }} />
          <Skeleton w="min(420px, 70%)" h={14} style={{ marginTop: 14 }} />
        </div>
      </div>
      <div className="container" style={{ paddingBlock: 'var(--section-y)' }}>
        <SkeletonGrid count={4} />
      </div>
    </div>
  )
}

export function SkeletonDetail() {
  return (
    <div className="container" role="status" aria-label="Loading property">
      <div style={{ paddingBlock: 30 }}>
        <Skeleton w={220} h={12} />
        <Skeleton w="min(560px, 90%)" h={34} style={{ marginTop: 16 }} />
        <Skeleton w="min(400px, 70%)" h={14} style={{ marginTop: 12 }} />
      </div>
      <Skeleton className="sk-stage" />
      <div className="sk-specs">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} h={68} />
        ))}
      </div>
    </div>
  )
}
