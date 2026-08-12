import { useEffect, useRef } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Keeps Tab inside an open dialog and restores focus to whatever opened it.
 * Without this a keyboard user tabs straight out of the drawer into the page
 * behind it, which is still visually covered.
 */
export default function useFocusTrap(active, { onEscape } = {}) {
  const ref = useRef(null)
  const restoreTo = useRef(null)

  // Held in a ref so an inline arrow from the caller does not re-run the
  // effect on every render — the cleanup would pull focus back to the
  // trigger each time and the dialog could never hold focus.
  const escapeRef = useRef(onEscape)
  escapeRef.current = onEscape

  useEffect(() => {
    if (!active) return undefined
    const node = ref.current
    if (!node) return undefined

    restoreTo.current = document.activeElement

    // Move focus in once the open transition has begun.
    const focusFirst = () => {
      const first = node.querySelector(FOCUSABLE)
      if (first) first.focus()
      else node.focus()
    }
    const raf = requestAnimationFrame(focusFirst)

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        escapeRef.current?.()
        return
      }
      if (e.key !== 'Tab') return

      const items = [...node.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (!items.length) return

      const first = items[0]
      const last = items[items.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKeyDown)
      restoreTo.current?.focus?.()
    }
  }, [active])

  return ref
}
