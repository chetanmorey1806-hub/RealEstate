import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiArrowRight, FiArrowUp, FiChevronRight, FiPlus } from 'react-icons/fi'
import SmartImage from './SmartImage'
import { faqs } from '../data/content'

/* ------------------------------- headings ------------------------------ */

export function SectionHead({ eyebrow, title, text, center = false, action, onInk = false }) {
  const head = (
    <div className={`section-head ${center ? 'center' : ''} ${action ? 'section-head--row' : ''}`}>
      <div style={{ maxWidth: 640 }}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  )
  return onInk ? <div className="on-ink">{head}</div> : head
}

/* ------------------------------ page hero ------------------------------ */

export function PageHero({ title, text, image, crumbs = [] }) {
  return (
    <section className="page-hero">
      <SmartImage src={image} alt="" />
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="row gap-8">
              <FiChevronRight size={13} />
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  )
}

/* ------------------------------ CTA band ------------------------------- */

export function CtaBand({
  title = 'Not sure where to start? Talk to us for twenty minutes.',
  text = 'Tell us the budget, the commute and the timeline. We will come back with a shortlist of four to six options — and the honest drawbacks of each.',
  primary = { label: 'Book a consultation', to: '/contact' },
  secondary = { label: 'Browse properties', to: '/properties' },
}) {
  return (
    <div className="cta-band">
      <SmartImage
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
        alt=""
      />
      <div className="cta-inner">
        <div>
          <h2 style={{ marginBottom: 12 }}>{title}</h2>
          <p style={{ marginBottom: 0 }}>{text}</p>
        </div>
        <div className="row wrap gap-12">
          <Link to={primary.to} className="btn btn-gold">
            {primary.label} <FiArrowRight size={17} />
          </Link>
          <Link to={secondary.to} className="btn btn-ghost-light">
            {secondary.label}
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------ counters ------------------------------- */

export function Counter({ to, suffix = '', duration = 1600 }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const run = () => {
      if (started.current) return
      started.current = true
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        // ease-out so the number decelerates into place
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    if (!('IntersectionObserver' in window)) {
      run()
      return undefined
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <b ref={ref}>
      {new Intl.NumberFormat('en-IN').format(n)}
      {suffix}
    </b>
  )
}

/* -------------------------------- FAQ ---------------------------------- */

export function FaqList({ items = faqs, limit }) {
  const [open, setOpen] = useState(0)
  const list = limit ? items.slice(0, limit) : items

  return (
    <div>
      {list.map((f, i) => (
        <div key={f.q} className={`faq-item ${open === i ? 'open' : ''}`}>
          <button
            type="button"
            className="faq-q"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            {f.q}
            <i>
              <FiPlus size={15} />
            </i>
          </button>
          <div className="faq-a">
            <div>
              <p>{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------------------------- scroll helpers --------------------------- */

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={`to-top ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <FiArrowUp size={18} />
    </button>
  )
}
