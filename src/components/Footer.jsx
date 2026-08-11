import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiChevronRight, FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6'
import { company, navLinks, offices } from '../data/site'
import { services } from '../data/content'

const socialIcon = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const head = offices[0]

  const subscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setDone(true)
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="logo">
              <span className="logo-mark" aria-hidden="true">
                ⌂
              </span>
              <span>
                {company.name.split(' ')[0]}
                <small>Realty</small>
              </span>
            </span>
            <p style={{ marginTop: 18 }}>{company.description}</p>
            <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>{company.rera}</p>
            <div className="topbar-social" style={{ marginTop: 6 }}>
              {company.socials.map((s) => {
                const Icon = socialIcon[s.icon]
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                    <Icon size={13} />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h4>Explore</h4>
            <ul className="footer-links">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>
                    <FiChevronRight size={13} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul className="footer-links">
              {services.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.slug}`}>
                    <FiChevronRight size={13} />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Head Office</h4>
            <ul className="footer-contact">
              <li>
                <FiMapPin size={16} />
                <span>
                  {head.line1}, {head.line2}
                  <br />
                  {head.area}
                </span>
              </li>
              <li>
                <FiPhone size={16} />
                <span>
                  <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
                  <br />
                  <a href={`tel:${company.phoneAlt.replace(/\s/g, '')}`}>{company.phoneAlt}</a>
                </span>
              </li>
              <li>
                <FiMail size={16} />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <FiClock size={16} />
                <span>{company.hours}</span>
              </li>
            </ul>

            <h4 style={{ marginTop: 26 }}>Newsletter</h4>
            {done ? (
              <p style={{ color: 'var(--gold)', fontWeight: 600 }}>
                Thanks — you are on the list. New listings land every Friday.
              </p>
            ) : (
              <form className="footer-news" onSubmit={subscribe}>
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn-gold" aria-label="Subscribe">
                  <FiArrowRight size={17} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </span>
          <span className="row wrap gap-24">
            <Link to="/about">Privacy Policy</Link>
            <Link to="/about">Terms of Use</Link>
            <Link to="/contact">Careers</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
