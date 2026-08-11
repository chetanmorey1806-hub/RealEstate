import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiClock,
  FiMail,
  FiMoon,
  FiPhone,
  FiSun,
} from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from 'react-icons/fa6'
import { company, navLinks } from '../data/site'
import useBodyLock from '../hooks/useBodyLock'

const socialIcon = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
}

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 12)
      setProgress(max > 0 ? Math.min(y / max, 1) : 0)
      // Retract on the way down, snap back the moment the user scrolls up.
      setHidden(y > 220 && y > lastY.current + 4)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useBodyLock(open)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const Brand = (
    <>
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.5 9.6V21h13V9.6" />
          <path d="M10 21v-6h4v6" />
        </svg>
      </span>
      <span className="logo-text">
        {company.name.split(' ')[0]}
        <small>Realty</small>
      </span>
    </>
  )

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="row wrap gap-24">
            <a href={`tel:${company.phone.replace(/\s/g, '')}`}>
              <FiPhone size={12} /> {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="topbar-hide-sm">
              <FiMail size={12} /> {company.email}
            </a>
            <span className="topbar-hide-sm row gap-8">
              <FiClock size={12} /> {company.hours}
            </span>
          </div>
          <div className="topbar-social">
            {company.socials.map((s) => {
              const Icon = socialIcon[s.icon]
              return (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <Icon size={11} />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <header
        className={`nav ${scrolled ? 'scrolled' : ''} ${hidden && !open ? 'nav-up' : ''} ${
          open ? 'nav-open' : ''
        }`}
      >
        <div className="container nav-inner">
          <Link to="/" className="logo">
            {Brand}
          </Link>

          <nav className="nav-links">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}>
                <span>{l.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="icon-btn theme-btn"
              onClick={onToggleTheme}
              aria-label="Toggle colour theme"
            >
              <span className="theme-icon" key={theme}>
                {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
              </span>
            </button>

            <Link to="/contact" className="btn btn-primary nav-cta">
              Book a consultation
            </Link>

            <button
              type="button"
              className={`burger ${open ? 'is-open' : ''}`}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <span className="nav-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </header>

      {/* --------------------------- drawer --------------------------- */}

      {/* Fixed, clipped layer: the panel parks off-screen inside it, so it
          never adds width to the document. */}
      <div className={`drawer-layer ${open ? 'open' : ''}`}>
        <div
          className={`drawer-backdrop ${open ? 'show' : ''}`}
          onClick={() => setOpen(false)}
          role="presentation"
        />

        <aside className={`drawer ${open ? 'show' : ''}`} aria-hidden={!open}>
        <nav className="drawer-nav">
          {navLinks.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              style={{ '--d': `${0.06 * i + 0.08}s` }}
            >
              <em>{String(i + 1).padStart(2, '0')}</em>
              <span>{l.label}</span>
              <FiArrowUpRight size={17} />
            </NavLink>
          ))}
        </nav>

        <div className="drawer-foot" style={{ '--d': `${0.06 * navLinks.length + 0.1}s` }}>
          <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="drawer-link">
            <FiPhone size={15} /> {company.phone}
          </a>
          <a href={`mailto:${company.email}`} className="drawer-link">
            <FiMail size={15} /> {company.email}
          </a>

          <div className="row gap-8" style={{ marginTop: 14 }}>
            <Link to="/contact" className="btn btn-primary" style={{ flex: 1 }}>
              Book a visit
            </Link>
            <a
              href={`https://wa.me/${company.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              aria-label="WhatsApp"
              style={{ paddingInline: 16 }}
            >
              <FaWhatsapp size={17} />
            </a>
          </div>

          <div className="topbar-social drawer-social">
            {company.socials.map((s) => {
              const Icon = socialIcon[s.icon]
              return (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <Icon size={12} />
                </a>
              )
            })}
          </div>
        </div>
        </aside>
      </div>
    </>
  )
}
