import { useEffect, useMemo, useRef, useState } from 'react'

const WIDTHS = [400, 640, 900, 1280, 1800]

/**
 * Builds a srcset from an Unsplash URL by rewriting its `w` parameter, so the
 * browser downloads a frame sized for the slot instead of the largest one.
 * Non-Unsplash sources are passed through untouched.
 */
function buildSrcSet(src) {
  if (!src?.includes('images.unsplash.com')) return null
  try {
    const url = new URL(src)
    const base = Number(url.searchParams.get('w')) || 1200
    return WIDTHS.filter((w) => w <= base * 1.5)
      .map((w) => {
        url.searchParams.set('w', String(w))
        return `${url.toString()} ${w}w`
      })
      .join(', ')
  } catch {
    return null
  }
}

/**
 * Image wrapper that shows a shimmer while loading and falls back to a
 * gradient panel if the remote image never arrives.
 */
export default function SmartImage({
  src,
  alt = '',
  className = '',
  style,
  sizes = '(max-width: 720px) 92vw, (max-width: 1200px) 46vw, 33vw',
  priority = false,
  ...rest
}) {
  const [state, setState] = useState('loading')
  const imgRef = useRef(null)
  const srcSet = useMemo(() => buildSrcSet(src), [src])

  useEffect(() => {
    setState('loading')
  }, [src])

  // Images restored from the browser cache can complete before React attaches
  // the onLoad handler, which would leave the shimmer running forever.
  useEffect(() => {
    const el = imgRef.current
    if (el?.complete && el.naturalWidth > 0) setState('loaded')
  }, [src])

  return (
    <div
      className={`simg ${state === 'loaded' ? 'loaded' : ''} ${
        state === 'failed' ? 'failed' : ''
      } ${className}`}
      style={style}
    >
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet || undefined}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        // The LCP image must not be lazy — that delays the largest paint.
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setState('loaded')}
        onError={() => setState('failed')}
        {...rest}
      />
    </div>
  )
}
