import { useEffect } from 'react'

/**
 * Delegated ripple for every `.btn` on the page. One listener on the document
 * beats attaching handlers to hundreds of buttons, and it keeps working for
 * buttons rendered later.
 */
export default function useRipple(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined

    const onPointerDown = (e) => {
      const btn = e.target.closest?.('.btn, .pill, .tab-ico')
      if (!btn || btn.disabled) return

      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2

      const ink = document.createElement('span')
      ink.className = 'ripple'
      ink.style.width = `${size}px`
      ink.style.height = `${size}px`
      ink.style.left = `${e.clientX - rect.left - size / 2}px`
      ink.style.top = `${e.clientY - rect.top - size / 2}px`

      btn.appendChild(ink)
      ink.addEventListener('animationend', () => ink.remove(), { once: true })
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [enabled])
}
