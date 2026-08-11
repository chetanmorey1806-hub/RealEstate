import { useEffect } from 'react'

/**
 * Locks page scrolling while a modal surface (drawer, filter sheet) is open
 * and flags the body so the mobile tab bar can slide out of the way.
 */
export default function useBodyLock(active) {
  useEffect(() => {
    if (!active) return undefined

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('modal-open')

    return () => {
      document.body.style.overflow = previous
      document.body.classList.remove('modal-open')
    }
  }, [active])
}
