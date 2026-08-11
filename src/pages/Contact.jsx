import { useState } from 'react'
import { FiCheck, FiClock, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import { CtaBand, FaqList, PageHero, SectionHead } from '../components/common'
import { company, offices } from '../data/site'
import { services } from '../data/content'
import { mapEmbed } from '../utils/format'
import useReveal from '../hooks/useReveal'

const emptyForm = { name: '', email: '', phone: '', service: '', budget: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [activeOffice, setActiveOffice] = useState(offices[0])

  useReveal([])

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((x) => ({ ...x, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a 10-digit phone number.'
    if (form.message.trim().length < 10) next.message = 'Tell us a little more (10+ characters).'
    return next
  }

  const submit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return
    setSent(true)
    setForm(emptyForm)
  }

  return (
    <>
      <PageHero
        title="Contact us"
        text="Three offices, one number that a consultant actually answers. Tell us what you are looking for and we will come back within one working hour."
        crumbs={[{ label: 'Contact' }]}
        image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80"
      />

      {/* -------------------------- quick contact ------------------------- */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="grid grid-4">
            {[
              {
                icon: FiPhone,
                title: 'Call us',
                lines: [company.phone, company.phoneAlt],
                href: `tel:${company.phone.replace(/\s/g, '')}`,
              },
              {
                icon: FiMail,
                title: 'Email us',
                lines: [company.email, company.salesEmail],
                href: `mailto:${company.email}`,
              },
              {
                icon: FaWhatsapp,
                title: 'WhatsApp',
                lines: ['Send photos and floor plans', 'Replies in minutes'],
                href: `https://wa.me/${company.phone.replace(/\D/g, '')}`,
              },
              {
                icon: FiClock,
                title: 'Office hours',
                lines: [company.hours, 'Sunday visits by appointment'],
              },
            ].map((c, i) => (
              <div
                key={c.title}
                className="svc-card compact-sm reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="svc-icon">
                  <c.icon />
                </span>
                <div>
                  <h3>{c.title}</h3>
                  {c.lines.map((l) => (
                    <p key={l} style={{ marginBottom: 2, fontSize: 'var(--fs-sm)' }}>
                      {c.href ? <a href={c.href}>{l}</a> : l}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- form + map -------------------------- */}
      <section className="section">
        <div className="container contact-layout">
          <div>
            <span className="eyebrow">Send an enquiry</span>
            <h2>Tell us what you are looking for</h2>
            <p style={{ marginBottom: 26 }}>
              The more specific the brief, the better the shortlist. Budget range, preferred
              localities and when you want to move are the three that matter most.
            </p>

            {sent ? (
              <div className="notice notice-ok" style={{ marginBottom: 20 }}>
                <FiCheck size={18} />
                <span>
                  Thank you — your enquiry has reached our team. A consultant will call you back
                  within one working hour, and you will get a written shortlist within two days.
                </span>
              </div>
            ) : null}

            <form className="contact-form" onSubmit={submit} noValidate>
              <div className="form-2col">
                <div className={`field ${errors.name ? 'invalid' : ''}`}>
                  <label htmlFor="c-name">Full name *</label>
                  <input id="c-name" value={form.name} onChange={set('name')} placeholder="Your name" />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
                <div className={`field ${errors.phone ? 'invalid' : ''}`}>
                  <label htmlFor="c-phone">Phone *</label>
                  <input
                    id="c-phone"
                    type="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="+91 98XXX XXXXX"
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className={`field ${errors.email ? 'invalid' : ''}`}>
                <label htmlFor="c-email">Email *</label>
                <input
                  id="c-email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-2col">
                <div className="field">
                  <label htmlFor="c-service">What do you need?</label>
                  <select id="c-service" value={form.service} onChange={set('service')}>
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="c-budget">Budget range</label>
                  <select id="c-budget" value={form.budget} onChange={set('budget')}>
                    <option value="">Select a range</option>
                    <option>Under ₹50 lakh</option>
                    <option>₹50 lakh – ₹1 crore</option>
                    <option>₹1 crore – ₹2.5 crore</option>
                    <option>₹2.5 crore – ₹5 crore</option>
                    <option>Above ₹5 crore</option>
                    <option>Rental / lease</option>
                  </select>
                </div>
              </div>

              <div className={`field ${errors.message ? 'invalid' : ''}`}>
                <label htmlFor="c-msg">Your requirement *</label>
                <textarea
                  id="c-msg"
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Localities you are considering, timeline, number of bedrooms, anything non-negotiable…"
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary">
                <FiSend size={16} /> Send enquiry
              </button>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0 }}>
                We never share your details with developers without asking you first.
              </p>
            </form>
          </div>

          <div>
            <span className="eyebrow">Visit us</span>
            <h2>Our offices</h2>
            <p style={{ marginBottom: 22 }}>
              Walk in during office hours or book a slot — the consultant for your micro-market will
              be there.
            </p>

            <div className="pill-row" style={{ marginBottom: 20 }}>
              {offices.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`pill ${activeOffice.id === o.id ? 'on' : ''}`}
                  onClick={() => setActiveOffice(o)}
                >
                  {o.city}
                </button>
              ))}
            </div>

            <div className="office-card" style={{ marginBottom: 20 }}>
              <span className="chip chip-soft">{activeOffice.label}</span>
              <h3>{activeOffice.city}</h3>
              <ul className="office-lines">
                <li>
                  <FiMapPin size={16} />
                  <span>
                    {activeOffice.line1}
                    <br />
                    {activeOffice.line2}
                    <br />
                    {activeOffice.area}
                  </span>
                </li>
                <li>
                  <FiPhone size={16} />
                  <a href={`tel:${activeOffice.phone.replace(/\s/g, '')}`}>{activeOffice.phone}</a>
                </li>
                <li>
                  <FiMail size={16} />
                  <a href={`mailto:${activeOffice.email}`}>{activeOffice.email}</a>
                </li>
                <li>
                  <FiClock size={16} />
                  <span>{activeOffice.hours}</span>
                </li>
              </ul>
            </div>

            <div className="map-frame" style={{ height: 380 }}>
              <iframe
                key={activeOffice.id}
                title={`Map of the ${activeOffice.city} office`}
                src={mapEmbed(activeOffice.mapQuery)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead center eyebrow="Before you call" title="Questions we get every week" />
          <div style={{ maxWidth: 820, marginInline: 'auto' }}>
            <FaqList />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CtaBand
            title="Prefer we call you?"
            text="Leave a number on the form above and pick a time. No sales script, no follow-up spam."
            primary={{ label: 'Browse properties', to: '/properties' }}
            secondary={{ label: 'Meet the team', to: '/agents' }}
          />
        </div>
      </section>
    </>
  )
}
