import { lazy, Suspense, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiDownload,
  FiExternalLink,
  FiEye,
  FiHeart,
  FiImage,
  FiLayers,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShare2,
  FiShield,
  FiVideo,
} from 'react-icons/fi'
import {
  FaBath,
  FaBed,
  FaBuilding,
  FaCarSide,
  FaCompass,
  FaCubes,
  FaVectorSquare,
  FaWhatsapp,
} from 'react-icons/fa6'
import Gallery from '../components/Gallery'
import Tour360 from '../components/Tour360'
import VideoPlayer from '../components/VideoPlayer'
import FloorPlan from '../components/FloorPlan'
import NearbyPlaces from '../components/NearbyPlaces'
import EmiCalculator from '../components/EmiCalculator'
import PropertyCard from '../components/PropertyCard'
import SmartImage from '../components/SmartImage'
import NotFound from './NotFound'
import { builders, getPropertyBySlug, properties } from '../data/properties'
import { getAgent } from '../data/content'
import { getPlaces } from '../data/places'
import { downloadBrochure } from '../utils/brochure'
import { directionsLink } from '../utils/geo'
import {
  formatDate,
  formatINR,
  formatNumber,
  fullAddress,
  shortAddress,
  shortINR,
} from '../utils/format'
import useWishlist from '../hooks/useWishlist'
import { useToast } from '../components/toast-context'
import { SkeletonMap } from '../components/Skeleton'

const PropertyMap = lazy(() => import('../components/PropertyMap'))

const MEDIA_TABS = [
  { key: 'photos', label: 'Photos', icon: FiImage },
  { key: 'tour', label: '360° tour', icon: FiLayers },
  { key: 'video', label: 'Video', icon: FiVideo },
  { key: 'plan', label: 'Floor plan', icon: FaVectorSquare },
]

const SECTIONS = [
  ['overview', 'Overview'],
  ['pricing', 'Price'],
  ['area', 'Area'],
  ['amenities', 'Amenities'],
  ['location', 'Location'],
  ['builder', 'Builder'],
  ['rera', 'RERA'],
]

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = getPropertyBySlug(slug)

  const [tab, setTab] = useState('photos')
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [visit, setVisit] = useState({ date: '', slot: '', mode: 'In person' })
  const [visitBooked, setVisitBooked] = useState(false)
  const [copied, setCopied] = useState(false)
  const wishlist = useWishlist()
  const { toast } = useToast()

  const places = useMemo(
    () => (property ? getPlaces(property.address.localityKey) : []),
    [property],
  )

  if (!property) return <NotFound />

  const agent = getAgent(property.agentId)
  const builder = builders[property.builder]
  const isRent = Boolean(property.priceUnit)
  const saved = wishlist.has(property.id)

  const similar = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.type === property.type || p.address.city === property.address.city),
    )
    .slice(0, 3)

  const specs = [
    { icon: FaBed, label: 'Bedrooms', value: property.beds || '—' },
    { icon: FaBath, label: 'Bathrooms', value: property.baths || '—' },
    { icon: FaVectorSquare, label: 'Built-up', value: `${formatNumber(property.area)} sq.ft.` },
    { icon: FaCarSide, label: 'Parking', value: property.parking || '—' },
    { icon: FaBuilding, label: 'Floor', value: property.floor },
    { icon: FaCompass, label: 'Facing', value: property.facing },
  ]

  // Stamp duty and registration are the two costs buyers most often forget.
  const stampDuty = Math.round(property.price * 0.06)
  const registration = Math.min(30000, Math.round(property.price * 0.01))
  const gst = property.constructionStatus === 'Under construction'
    ? Math.round(property.price * 0.05)
    : 0
  const allIn = property.price + stampDuty + registration + gst

  const areaRows = [
    ['Carpet area', property.carpetArea],
    ['Built-up area', property.builtUpArea || property.area],
    ['Super built-up area', property.area],
  ].filter(([, v]) => v > 0)
  const maxArea = Math.max(...areaRows.map(([, v]) => v))

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', phone: '', message: '' })
  }

  const bookVisit = (e) => {
    e.preventDefault()
    setVisitBooked(true)
  }

  const share = async () => {
    const data = { title: property.title, text: shortAddress(property.address), url: window.location.href }
    if (navigator.share) {
      try {
        await navigator.share(data)
        return
      } catch {
        // user dismissed the sheet — fall through to the clipboard copy
      }
    }
    try {
      await navigator.clipboard?.writeText(window.location.href)
      setCopied(true)
      toast('Link copied to clipboard', { type: 'success' })
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // clipboard blocked; nothing else to fall back to
    }
  }

  return (
    <>
      <section style={{ background: 'var(--surface-2)', paddingBlock: 18 }}>
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

      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          {/* ---------------------------- header ---------------------------- */}
          <div className="detail-head">
            <div>
              <div className="row wrap gap-8" style={{ marginBottom: 12 }}>
                <span className={`chip ${isRent ? 'chip-gold' : 'chip-brand'}`}>{property.status}</span>
                <span className="chip chip-soft">{property.type}</span>
                {property.verified && (
                  <span className="chip chip-verified">
                    <FiShield size={11} /> Verified
                  </span>
                )}
                {property.rera.approved && <span className="chip chip-outline">RERA approved</span>}
                <span className="chip chip-outline">{property.listedBy}</span>
              </div>
              <h1>{property.title}</h1>
              <p className="row gap-8" style={{ color: 'var(--muted)', margin: '0 0 8px' }}>
                <FiMapPin size={15} style={{ color: 'var(--gold)' }} />
                {fullAddress(property.address)}
              </p>
              <p className="detail-meta">
                <span>
                  <FiEye size={13} /> {formatNumber(property.views)} views
                </span>
                <span>
                  <FiCalendar size={13} /> Listed {formatDate(property.postedOn)}
                </span>
                <span>ID {property.id.toUpperCase()}</span>
              </p>
            </div>

            <div className="detail-head-actions">
              <div className="detail-price">
                {shortINR(property.price)}
                {isRent ? (
                  <small>per {property.priceUnit}</small>
                ) : (
                  property.pricePerSqft > 0 && (
                    <small>{formatINR(property.pricePerSqft)} per sq.ft.</small>
                  )
                )}
              </div>
              <div className="row wrap gap-8">
                <button
                  type="button"
                  className={`btn btn-sm ${saved ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => {
                    const added = wishlist.toggle(property.id)
                    toast(added ? 'Added to your shortlist' : 'Removed from your shortlist', {
                      type: added ? 'like' : 'info',
                    })
                  }}
                  aria-pressed={saved}
                >
                  <FiHeart size={14} fill={saved ? 'currentColor' : 'none'} />
                  {saved ? 'Shortlisted' : 'Wishlist'}
                </button>
                <button type="button" className="btn btn-outline btn-sm" onClick={share}>
                  <FiShare2 size={14} /> {copied ? 'Link copied' : 'Share'}
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    downloadBrochure(property, agent)
                    toast('Brochure downloaded', { type: 'success' })
                  }}
                >
                  <FiDownload size={14} /> Brochure
                </button>
              </div>
            </div>
          </div>

          <div className="detail-layout">
            <div>
              {/* -------------------------- media -------------------------- */}
              <div
                className="media-tabs"
                role="tablist"
                aria-label="Property media"
                onKeyDown={(e) => {
                  const i = MEDIA_TABS.findIndex((t) => t.key === tab)
                  const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
                  if (!step) return
                  e.preventDefault()
                  const next = MEDIA_TABS[(i + step + MEDIA_TABS.length) % MEDIA_TABS.length]
                  setTab(next.key)
                  e.currentTarget.querySelector(`#tab-${next.key}`)?.focus()
                }}
              >
                {MEDIA_TABS.map((t) => (
                  <button
                    key={t.key}
                    id={`tab-${t.key}`}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.key}
                    aria-controls="media-panel"
                    tabIndex={tab === t.key ? 0 : -1}
                    className={tab === t.key ? 'on' : ''}
                    onClick={() => setTab(t.key)}
                  >
                    <t.icon size={14} aria-hidden="true" /> {t.label}
                  </button>
                ))}
              </div>

              <div
                className="media-stage"
                id="media-panel"
                role="tabpanel"
                aria-labelledby={`tab-${tab}`}
                tabIndex={0}
              >
                {tab === 'photos' && <Gallery images={property.images} alt={property.title} />}
                {tab === 'tour' && (
                  <Tour360 src={property.panorama} alt={`360 view of ${property.title}`} />
                )}
                {tab === 'video' && (
                  <VideoPlayer video={property.video} title={`${property.title} walkthrough`} />
                )}
                {tab === 'plan' && <FloorPlan property={property} />}
              </div>

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

              {/* ------------------------ section nav ---------------------- */}
              <nav className="section-nav">
                {SECTIONS.map(([id, label]) => (
                  <a key={id} href={`#${id}`}>
                    {label}
                  </a>
                ))}
              </nav>

              {/* -------------------------- overview ----------------------- */}
              <div className="detail-block" id="overview">
                <h2>Property overview</h2>
                <p>{property.description}</p>
                <p style={{ marginBottom: 0 }}>
                  The property sits in {property.address.locality}, {property.address.city} —{' '}
                  {property.address.landmark.toLowerCase()}. Our consultant has inspected the unit
                  in person and verified the title documents, the society NOC position and the RERA
                  status where applicable.
                </p>

                <ul className="fact-list" style={{ marginTop: 22 }}>
                  {[
                    ['Property type', property.type],
                    ['Listing', property.status],
                    ['Furnishing', property.furnishing],
                    ['Facing', property.facing],
                    ['Floor', `${property.floor}`],
                    ['Balconies', property.balconies || '—'],
                    ['Parking', `${property.parking || 'None'} · ${property.parkingType}`],
                    ['Age of property', property.age],
                    ['Listed by', property.listedBy],
                    ['Enquiries', formatNumber(property.enquiries)],
                  ].map(([k, v]) => (
                    <li key={k}>
                      <span>{k}</span>
                      <b>{v}</b>
                    </li>
                  ))}
                </ul>
              </div>

              {/* --------------------------- price ------------------------- */}
              <div className="detail-block" id="pricing">
                <h2>Price information</h2>
                {isRent ? (
                  <ul className="fact-list">
                    <li>
                      <span>Monthly rent</span>
                      <b>{formatINR(property.price)}</b>
                    </li>
                    <li>
                      <span>Security deposit</span>
                      <b>{formatINR(property.deposit || property.price * 6)}</b>
                    </li>
                    <li>
                      <span>Maintenance</span>
                      <b>Included</b>
                    </li>
                    <li>
                      <span>Lock-in period</span>
                      <b>11 months</b>
                    </li>
                  </ul>
                ) : (
                  <>
                    <ul className="price-rows">
                      <li>
                        <span>Agreement value</span>
                        <b>{formatINR(property.price)}</b>
                      </li>
                      <li>
                        <span>Stamp duty (6%)</span>
                        <b>{formatINR(stampDuty)}</b>
                      </li>
                      <li>
                        <span>Registration</span>
                        <b>{formatINR(registration)}</b>
                      </li>
                      {gst > 0 && (
                        <li>
                          <span>GST (5%, under construction)</span>
                          <b>{formatINR(gst)}</b>
                        </li>
                      )}
                      <li className="total">
                        <span>Approximate all-in cost</span>
                        <b>{formatINR(allIn)}</b>
                      </li>
                    </ul>
                    <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 12 }}>
                      Stamp duty varies by state and buyer gender; a 1% concession usually applies
                      for a sole female buyer in Maharashtra.
                    </p>
                  </>
                )}
              </div>

              {/* ---------------------------- area ------------------------- */}
              <div className="detail-block" id="area">
                <h2>Area details</h2>
                <div className="area-bars">
                  {areaRows.map(([label, value]) => (
                    <div className="area-bar" key={label}>
                      <span>{label}</span>
                      <i>
                        <b style={{ width: `${(value / maxArea) * 100}%` }} />
                      </i>
                      <em>{formatNumber(value)} sq.ft.</em>
                    </div>
                  ))}
                </div>
                <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 14 }}>
                  Carpet area is the only figure RERA allows a developer to sell on — it is the
                  usable floor area within the walls. Loading here is{' '}
                  <b>{Math.round((property.area / property.carpetArea - 1) * 100)}%</b>.
                </p>
              </div>

              {/* ------------------------- amenities ----------------------- */}
              <div className="detail-block" id="amenities">
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

              {/* -------------------------- location ----------------------- */}
              <div className="detail-block" id="location">
                <h2>Location & nearby places</h2>
                <p className="row wrap gap-12" style={{ marginBottom: 16 }}>
                  {fullAddress(property.address)}
                  <a
                    href={directionsLink(property.coords)}
                    target="_blank"
                    rel="noreferrer"
                    className="link-arrow"
                  >
                    Directions <FiExternalLink size={13} />
                  </a>
                </p>

                <Suspense fallback={<SkeletonMap height={380} />}>
                  <PropertyMap
                    properties={[property]}
                    places={places}
                    centre={property.coords}
                    zoom={14}
                    height={380}
                    fit={false}
                    className="detail-map"
                  />
                </Suspense>

                <h3 style={{ margin: '26px 0 14px' }}>What is around</h3>
                <NearbyPlaces origin={property.coords} places={places} />
              </div>

              {/* -------------------------- builder ------------------------ */}
              <div className="detail-block" id="builder">
                <h2>Builder information</h2>
                <div className="builder-card">
                  <span className="builder-mark">{builder.name.charAt(0)}</span>
                  <div>
                    <b>{builder.name}</b>
                    <p>{builder.about}</p>
                    {builder.established && (
                      <div className="builder-stats">
                        <div>
                          <b>{builder.established}</b>
                          <span>Established</span>
                        </div>
                        <div>
                          <b>{builder.completed}</b>
                          <span>Delivered</span>
                        </div>
                        <div>
                          <b>{builder.ongoing}</b>
                          <span>Ongoing</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ------------------- RERA & construction ------------------- */}
              <div className="detail-block" id="rera">
                <h2>RERA, construction & possession</h2>

                <div className={`rera-banner ${property.rera.approved ? 'ok' : 'warn'}`}>
                  <FiShield size={20} />
                  <div>
                    <b>
                      {property.rera.approved
                        ? `RERA registered — ${property.rera.number}`
                        : 'Not registered under RERA'}
                    </b>
                    <span>
                      {property.rera.approved
                        ? 'Verify the registration and quarterly progress filings on your state RERA portal before paying a booking amount.'
                        : 'Projects below the RERA threshold, completed buildings and pure resale units are exempt. Ask for the occupancy certificate instead.'}
                    </span>
                  </div>
                </div>

                <ul className="fact-list" style={{ marginTop: 20 }}>
                  <li>
                    <span>Construction status</span>
                    <b>{property.constructionStatus}</b>
                  </li>
                  <li>
                    <span>Possession</span>
                    <b>{property.possession}</b>
                  </li>
                  <li>
                    <span>Possession date</span>
                    <b>{formatDate(property.possessionDate)}</b>
                  </li>
                  <li>
                    <span>Age of property</span>
                    <b>{property.age}</b>
                  </li>
                  <li>
                    <span>Total floors</span>
                    <b>{property.totalFloors || '—'}</b>
                  </li>
                  <li>
                    <span>Verified by Estatica</span>
                    <b>{property.verified ? 'Yes — site inspected' : 'Pending inspection'}</b>
                  </li>
                </ul>
              </div>
            </div>

            {/* --------------------------- sidebar --------------------------- */}
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
                    <b style={{ color: 'var(--ink)' }}>Contact the seller</b>
                    <div className="field">
                      <label htmlFor="e-name">Your name</label>
                      <input
                        id="e-name"
                        required
                        autoComplete="name"
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
                        inputMode="tel"
                        autoComplete="tel"
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
                        style={{ minHeight: 80 }}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={`I would like to know more about ${property.title}.`}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      <FiMail size={16} /> Send enquiry
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
                </div>
              </div>

              {/* ---------------------- schedule visit ---------------------- */}
              <div className="side-card">
                <h4 style={{ marginBottom: 14 }}>Schedule a visit</h4>
                {visitBooked ? (
                  <div className="notice notice-ok">
                    <FiCheck size={17} />
                    <span>
                      Visit requested for {visit.date || 'the next available slot'}
                      {visit.slot ? `, ${visit.slot}` : ''} ({visit.mode.toLowerCase()}). We will
                      confirm by phone.
                    </span>
                  </div>
                ) : (
                  <form className="side-form" onSubmit={bookVisit}>
                    <div className="field">
                      <label htmlFor="v-date">Preferred date</label>
                      <input
                        id="v-date"
                        type="date"
                        required
                        value={visit.date}
                        onChange={(e) => setVisit({ ...visit, date: e.target.value })}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="v-slot">Time slot</label>
                      <select
                        id="v-slot"
                        required
                        value={visit.slot}
                        onChange={(e) => setVisit({ ...visit, slot: e.target.value })}
                      >
                        <option value="">Choose a slot</option>
                        <option>10:00 – 12:00</option>
                        <option>12:00 – 15:00</option>
                        <option>15:00 – 18:00</option>
                        <option>18:00 – 20:00</option>
                      </select>
                    </div>
                    <div className="pill-row">
                      {['In person', 'Video call'].map((m) => (
                        <button
                          key={m}
                          type="button"
                          className={`pill ${visit.mode === m ? 'on' : ''}`}
                          onClick={() => setVisit({ ...visit, mode: m })}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      <FiCalendar size={16} /> Request visit
                    </button>
                  </form>
                )}
              </div>

              {/* ------------------------ EMI ------------------------------ */}
              {!isRent && (
                <div className="side-card">
                  <h4 style={{ marginBottom: 6 }}>EMI calculator</h4>
                  <EmiCalculator price={property.price} />
                </div>
              )}

              <div className="side-card">
                <h4 style={{ marginBottom: 12 }}>
                  <FaCubes size={14} style={{ color: 'var(--gold)' }} /> At a glance
                </h4>
                <div className="emi-breakdown">
                  <span>Carpet area</span>
                  <b>{formatNumber(property.carpetArea)} sq.ft.</b>
                </div>
                <div className="emi-breakdown">
                  <span>Possession</span>
                  <b>{property.possession}</b>
                </div>
                <div className="emi-breakdown">
                  <span>RERA</span>
                  <b>{property.rera.approved ? 'Registered' : 'Exempt'}</b>
                </div>
                <div className="emi-breakdown" style={{ borderBottom: 0 }}>
                  <span>Listed by</span>
                  <b>{property.listedBy}</b>
                </div>
              </div>
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
        <button
          type="button"
          className={`btn btn-sm ${saved ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => wishlist.toggle(property.id)}
          aria-label="Add to wishlist"
        >
          <FiHeart size={16} fill={saved ? 'currentColor' : 'none'} />
        </button>
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
          <FiPhone size={15} /> Call
        </a>
      </div>
    </>
  )
}
