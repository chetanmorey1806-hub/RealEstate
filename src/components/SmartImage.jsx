import { useEffect, useRef, useState } from 'react'

/**
 * Image wrapper that shows a shimmer while loading and falls back to a
 * gradient panel if the remote image never arrives.
 */
export default function SmartImage({ src, alt = '', className = '', style, ...rest }) {
  const [state, setState] = useState('loading')
  const imgRef = useRef(null)

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
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setState('loaded')}
        onError={() => setState('failed')}
        {...rest}
      />
    </div>
  )
}
