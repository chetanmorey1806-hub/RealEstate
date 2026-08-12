import { useCallback, useEffect, useRef, useState } from 'react'
import { FiMaximize2, FiPause, FiPlay, FiRotateCw } from 'react-icons/fi'

/**
 * Drag-to-look panorama viewer. The image is panned horizontally with pointer
 * or touch, auto-rotates when idle, and supports fullscreen.
 *
 * Note: this pans a wide (cylindrical) photo. For a true spherical 360 the
 * source needs to be an equirectangular capture — the same controls apply.
 */
export default function Tour360({ src, alt = '360 degree view' }) {
  const frame = useRef(null)
  const [x, setX] = useState(0)
  const [spinning, setSpinning] = useState(true)
  const drag = useRef(null)
  const maxRef = useRef(0)

  // How far the image can travel before its edge shows.
  const measure = useCallback(() => {
    const el = frame.current
    if (!el) return
    const img = el.querySelector('img')
    if (!img || !img.naturalWidth) return
    const scaled = (img.naturalWidth / img.naturalHeight) * el.clientHeight
    maxRef.current = Math.max(0, scaled - el.clientWidth)
    setX((v) => Math.min(v, maxRef.current))
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  // Auto-rotate: bounce back and forth rather than jumping at the edges.
  useEffect(() => {
    if (!spinning) return undefined
    let dir = 1
    let raf
    const step = () => {
      setX((v) => {
        const max = maxRef.current
        if (max <= 0) return v
        let next = v + dir * 0.45
        if (next >= max) {
          next = max
          dir = -1
        } else if (next <= 0) {
          next = 0
          dir = 1
        }
        return next
      })
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [spinning])

  const onDown = (e) => {
    setSpinning(false)
    drag.current = { startX: e.clientX ?? e.touches?.[0]?.clientX, startVal: x }
    frame.current?.setPointerCapture?.(e.pointerId)
  }

  const onMove = (e) => {
    if (!drag.current) return
    const cx = e.clientX ?? e.touches?.[0]?.clientX
    const delta = drag.current.startX - cx
    setX(Math.max(0, Math.min(maxRef.current, drag.current.startVal + delta)))
  }

  const onUp = () => {
    drag.current = null
  }

  const fullscreen = () => {
    const el = frame.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen()
    else el.requestFullscreen?.()
  }

  const pct = maxRef.current > 0 ? x / maxRef.current : 0

  return (
    <div className="tour360">
      <div
        ref={frame}
        className={`tour-frame ${drag.current ? 'grabbing' : ''}`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="img"
        aria-label={alt}
      >
        <img
          src={src}
          alt=""
          onLoad={measure}
          draggable="false"
          style={{ transform: `translate3d(${-x}px,0,0)` }}
        />

        <span className="tour-hint">
          <FiRotateCw size={14} /> Drag to look around
        </span>

        <div className="tour-controls">
          <button
            type="button"
            onClick={() => setSpinning((s) => !s)}
            aria-label={spinning ? 'Pause auto-rotation' : 'Resume auto-rotation'}
          >
            {spinning ? <FiPause size={15} /> : <FiPlay size={15} />}
          </button>
          <button type="button" onClick={fullscreen} aria-label="Fullscreen">
            <FiMaximize2 size={15} />
          </button>
        </div>

        <div className="tour-track" aria-hidden="true">
          <i style={{ left: `${pct * 100}%` }} />
        </div>
      </div>
    </div>
  )
}
