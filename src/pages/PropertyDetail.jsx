import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShare2,
} from 'react-icons/fi'
import {
  FaBath,
  FaBed,
  FaBuilding,
  FaCarSide,
  FaCompass,
  FaVectorSquare,
  FaWhatsapp,
} from 'react-icons/fa6'
import Gallery from '../components/Gallery'
import PropertyCard from '../components/PropertyCard'
import SmartImage from '../components/SmartImage'
import NotFound from './NotFound'
import { getPropertyBySlug, properties } from '../data/properties'
import { getAgent } from '../data/content'
import {
  calcEMI,
  formatDate,
  formatINR,
  formatNumber,
  fullAddress,
  mapEmbed,
  shortAddress,
  shortINR,
} from '../utils/format'

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = getPropertyBySlug(slug)

  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [years, setYears] = useState(20)
  const [downPct, setDownPct] = useState(20)

  const emi = useMemo(() => {
    if (!property) return 0
    const loan = property.price * (1 - downPct / 100)
    return calcEMI(loan, 8.6, years)
  }, [property, years, downPct])

  if (!property) return <NotFound />

  const agent = getAgent(property.agentId)
  const similar = properties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.address.city === property.address.city))
    .slice(0, 3)

  const specs = [
    { icon: FaBed, label: 'Bedrooms', value: property.beds || '—' },
    { icon: FaBath, label: 'Bathrooms', value: property.baths || '—' },
    { icon: FaVectorSquare, label: 'Built-up area', value: `${formatNumber(property.area)} sq.ft.` },
    { icon: FaCarSide, label: 'Parking', value: property.parking || '—' },
    { icon: FaBuilding, label: 'Floor', value: property.floor },
    { icon: FaCompass, label: 'Facing', value: property.facing },
  ]

  const facts = [
    ['Property type', property.type],
    ['Listing', property.status],
    ['Furnishing', property.furnishing],
    ['Possession', property.possession],
    ['Age of property', property.age],
    ['Rate per sq.ft.', property.pricePerSqft ? formatINR(property.pricePerSqft) : '—'],
    ['Landmark', property.address.landmark],
    ['Pincode', property.address.pin],
    ['Listing ID', property.id.toUpperCase()],
    ['Posted on', formatDate(property.postedOn)],
  ]

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', phone: '', message: '' })
  }

  const share = async () => {
    const data = { title: property.title, url: window.location.href }
    if (navigator.share) {
      try {
        await navigator.share(data)
        return
      } catch {
        // user dismissed the sheet — fall through to the clipboard copy
      }
    }
    navigator.clipboard?.writeText(window.location.href)
  }

  return (
    <>
      <section style={{ background: 'var(--surface-2)', paddingBlock: '18px' }}>
        <div className="container">
          <nav className="crumbs" style={{ color: 'var(--muted)', margin: 0 }} aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <FiChevronRight size={13} />
            <Link to="/properties">Properties</Link>
            <FiChevronRight size={13} />
            <span>{property.title}</span>
          </nav>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 34 }}>
        <div className="container">
          <div className="detail-head">
            <div>
              <div className="row wrap gap-8" style={{ marginBottom: 12 }}>
                <span className={`chip ${property.status === 'For Rent' ? 'chip-gold' : 'chip-brand'}`}>
                  {property.status}
                </span>
                <span className="chip chip-soft">{property.type}</span>
                <span className="chip chip-outline">{property.possession}</span>
              </div>
              <h1>{property.title}</h1>
              <p className="row gap-8" style={{ color: 'var(--muted)', margin: 0 }}>
                <FiMapPin size={15} style={{ color: 'var(--gold)' }} />
                {fullAddress(property.address)}
              </p>
            </div>
            <div>
              <div className="detail-price">
                {shortINR(property.price)}
                {property.priceUnit && <small>per {property.priceUnit}</small>}
                {!property.priceUnit && property.pricePerSqft > 0 && (
                  <small>{formatINR(property.pricePerSqft)} per sq.ft.</small>
                )}
              </div>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                style={{ marginTop: 12 }}
                onClick={share}
              >
                <FiShare2 size={14} /> Share
              </button>
            </div>
          </div>

          <div className="detail-layout">
            <div>
              <Gallery images={property.images} alt={property.title} />

              <div className="spec-grid">
                {specs.map((s) => (
                  <div className="spec-cell" key={s.label}>
                    <s.icon />
                    <div>
                      <span>{s.label}</span>
                      <b>{s.value}</b>
                    </div>
                  </div>
                ))}
              </div>

              <div className="detail-block">
                <h2>About this property</h2>
                <p>{property.description}</p>
                <p style={{ marginBottom: 0 }}>
                  The property sits in {property.address.locality}, {property.address.city} —{' '}
                  {property.address.landmark.toLowerCase()}. Our consultant has inspected the unit in
                  person and verified the title documents, the society NOC position and the RERA
                  status where applicable.
                </p>
              </div>

              <div className="detail-block">
                <h2>Property details</h2>
                <ul className="fact-list">
                  {facts.map(([k, v]) => (
                    <li key={k}>
                      <span>{k}</span>
                      <b>{v}</b>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-block">
                <h2>Amenities & features</h2>
                <div className="amenity-grid">
                  {property.amenities.map((a) => (
                    <div className="amenity" key={a}>
                      <FiCheck size={15} />
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-block">
                <h2>Location</h2>
                <p>{fullAddress(property.address)}</p>
                <div className="map-frame">
                  <iframe
                    title={`Map of ${property.title}`}
                    src={mapEmbed(
                      `${property.address.line}, ${property.address.locality}, ${property.address.city} ${property.address.pin}`,
                    )}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* ------------------------- sidebar ------------------------- */}
            <aside className="sticky-side">
              <div className="side-card">
                {agent && (
                  <div className="agent-mini">
                    <SmartImage src={agent.photo} alt={agent.name} />
                    <div>
                      <b>{agent.name}</b>
                      <span>{agent.role}</span>
                    </div>
                  </div>
                )}

                {sent ? (
                  <div className="notice notice-ok">
                    <FiCheck size={17} />
                    <span>
                      Thanks — {agent?.name.split(' ')[0]} will call you back within one working
                      hour.
                    </span>
                  </div>
                ) : (
                  <form className="side-form" onSubmit={submit}>
                    <div className="field">
                      <label htmlFor="e-name">Your name</label>
                      <input
                        id="e-name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="e-phone">Phone</label>
                      <input
                        id="e-phone"
                        required
                        type="tel"
                        pattern="[0-9+ ]{10,15}"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 —"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="e-msg">Message</label>
                      <textarea
                        id="e-msg"
                        style={{ minHeight: 90 }}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={`I would like to visit ${property.title}.`}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      <FiCalendar size={16} /> Schedule a visit
                    </button>
                  </form>
                )}

                <div className="row gap-8" style={{ marginTop: 12 }}>
                  <a
                    href={`tel:${agent?.phone.replace(/\s/g, '')}`}
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                  >
                    <FiPhone size={14} /> Call
                  </a>
                  <a
                    href={`https://wa.me/${agent?.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                  >
                    <FaWhatsapp size={15} /> WhatsApp
                  </a>
                  <a
                    href={`mailto:${agent?.email}`}
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                  >
                    <FiMail size={14} /> Email
                  </a>
                </div>
              </div>

              {!property.priceUnit && (
                <div className="side-card">
                  <h4 style={{ marginBottom: 16 }}>EMI calculator</h4>

                  <label htmlFor="dp" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                    Down payment — {downPct}%
                  </label>
                  <input
                    id="dp"
                    type="range"
                    min={10}
                    max={60}
                    step={5}
                    value={downPct}
                    onChange={(e) => setDownPct(Number(e.target.value))}
                  />

                  <label
                    htmlFor="yr"
                    style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginTop: 12 }}
                  >
                    Tenure — {years} years
                  </label>
                  <input
                    id="yr"
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                  />

                  <div className="emi-out">
                    <b>{formatINR(Math.round(emi))}</b>
                    <span>estimated monthly EMI</span>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <div className="emi-breakdown">
                      <span>Loan amount</span>
                      <b>{shortINR(Math.round(property.price * (1 - downPct / 100)))}</b>
                    </div>
                    <div className="emi-breakdown">
                      <span>Down payment</span>
                      <b>{shortINR(Math.round(property.price * (downPct / 100)))}</b>
                    </div>
                    <div className="emi-breakdown" style={{ borderBottom: 0 }}>
                      <span>Interest rate</span>
                      <b>8.6% p.a.</b>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.76rem', color: 'var(--muted)', marginTop: 12, marginBottom: 0 }}>
                    Indicative only. Actual rates depend on your profile and the lender.
                  </p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <h2 style={{ marginBottom: 24 }}>Similar properties</h2>
            <div className="grid grid-3 rail">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Phone-only sticky bar so the price and the two actions that matter
          are always one thumb away. */}
      <div className="action-bar">
        <span className="price">
          <b>
            {shortINR(property.price)}
            {property.priceUnit ? `/${property.priceUnit}` : ''}
          </b>
          <span>{shortAddress(property.address)}</span>
        </span>
        <a
          href={`https://wa.me/${agent?.phone.replace(/\D/g, '')}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline btn-sm"
          aria-label="WhatsApp the consultant"
        >
          <FaWhatsapp size={17} />
        </a>
        <a href={`tel:${agent?.phone.replace(/\s/g, '')}`} className="btn btn-primary btn-sm">
          <FiPhone size={15} /> Call agent
        </a>
      </div>
    </>
  )
}
