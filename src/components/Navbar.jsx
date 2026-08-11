import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  FiChevronRight,
  FiClock,
  FiMail,
  FiMenu,
  FiMoon,
  FiPhone,
  FiSun,
  FiX,
} from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6'
import { company, navLinks } from '../data/site'

const socialIcon = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
}

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="row wrap gap-24">
            <a href={`tel:${company.phone.replace(/\s/g, '')}`}>
              <FiPhone size={13} /> {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="topbar-hide-sm">
              <FiMail size={13} /> {company.email}
            </a>
            <span className="topbar-hide-sm row gap-8">
              <FiClock size={13} /> {company.hours}
            </span>
          </div>
          <div className="topbar-social">
            {company.socials.map((s) => {
              const Icon = socialIcon[s.icon]
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                >
                  <Icon size={12} />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link to="/" className="logo">
            <span className="logo-mark" aria-hidden="true">
              ⌂
            </span>
            <span>
              {company.name.split(' ')[0]}
              <small>Realty</small>
            </span>
          </Link>

          <nav className="nav-links">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="icon-btn"
              onClick={onToggleTheme}
              aria-label="Toggle colour theme"
            >
              {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
            </button>
            <Link to="/contact" className="btn btn-primary nav-cta">
              Book a consultation
            </Link>
            <button
              type="button"
              className="icon-btn burger"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu size={19} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <>
          <div
            className="drawer-backdrop"
            onClick={() => setOpen(false)}
            role="presentation"
          />
          <aside className="drawer">
            <div className="drawer-head">
              <span className="logo">
                <span className="logo-mark" aria-hidden="true">
                  ⌂
                </span>
                <span>
                  {company.name.split(' ')[0]}
                  <small>Realty</small>
                </span>
              </span>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <FiX size={19} />
              </button>
            </div>

            <nav>
              {navLinks.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.to === '/'}>
                  {l.label}
                  <FiChevronRight size={16} />
                </NavLink>
              ))}
            </nav>

            <div className="drawer-contact">
              <a href={`tel:${company.phone.replace(/\s/g, '')}`}>
                <FiPhone size={15} /> {company.phone}
              </a>
              <a href={`mailto:${company.email}`}>
                <FiMail size={15} /> {company.email}
              </a>
              <Link to="/contact" className="btn btn-primary btn-block" style={{ marginTop: 14 }}>
                Book a consultation
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  )
}
