import { useEffect } from 'react'

/**
 * Scroll-linked parallax for elements marked `data-parallax="<strength>"`.
 * Reads on scroll, writes inside rAF, and only touches elements currently in
 * view — so it stays off the main thread's critical path.
 */
export default function useParallax(enabled = true, deps = []) {
  useEffect(() => {
    if (!enabled) return undefined

    const nodes = [...document.querySelectorAll('[data-parallax]')]
    if (!nodes.length) return undefined

    let ticking = false
    const visible = new Set()

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
        update()
      },
      { rootMargin: '120px 0px' },
    )
    nodes.forEach((n) => io.observe(n))

    function update() {
      ticking = false
      const vh = window.innerHeight
      visible.forEach((el) => {
        const rect = el.getBoundingClientRect()
        // -1 when the element is just below the fold, +1 when just above it.
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh
        const strength = Number(el.dataset.parallax) || 20
        el.style.setProperty('--py', `${(progress * strength).toFixed(2)}px`)
      })
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      nodes.forEach((n) => n.style.removeProperty('--py'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps])
}
