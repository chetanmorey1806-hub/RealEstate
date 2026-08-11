import { Link, useParams } from 'react-router-dom'
import { FiCheck, FiChevronRight, FiDownload, FiMapPin, FiPhone } from 'react-icons/fi'
import Gallery from '../components/Gallery'
import { CtaBand } from '../components/common'
import NotFound from './NotFound'
import { getProjectBySlug, projects } from '../data/projects'
import { properties } from '../data/properties'
import PropertyCard from '../components/PropertyCard'
import { fullAddress, mapEmbed, shortINR } from '../utils/format'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <NotFound />

  const related = projects.filter((p) => p.id !== project.id).slice(0, 3)
  const unitsOnSale = properties.filter(
    (p) => p.address.locality === project.address.locality,
  )

  const stats = [
    { label: 'Configuration', value: project.configuration },
    { label: 'Sizes', value: project.sizeRange },
    { label: 'Starting at', value: shortINR(project.priceFrom) },
    { label: 'Total units', value: project.units },
    { label: 'Land area', value: project.landArea },
    { label: 'Possession', value: project.possession },
  ]

  const facts = [
    ['Developer', project.developer],
    ['Category', project.category],
    ['Stage', project.stage],
    ['Launched', project.launched],
    ['Towers', project.towers || 'Plotted / row format'],
    ['Floors', `${project.floors} levels`],
    ['RERA number', project.rera],
    ['Construction progress', `${project.completion}%`],
  ]

  return (
    <>
      <section style={{ background: 'var(--surface-2)', paddingBlock: 18 }}>
        <div className="container">
          <nav className="crumbs" style={{ color: 'var(--muted)', margin: 0 }} aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <FiChevronRight size={13} />
            <Link to="/projects">Projects</Link>
            <FiChevronRight size={13} />
            <span>{project.name}</span>
          </nav>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 34 }}>
        <div className="container">
          <div className="detail-head">
            <div>
              <div className="row wrap gap-8" style={{ marginBottom: 12 }}>
                <span className="chip chip-brand">{project.stage}</span>
                <span className="chip chip-soft">{project.category}</span>
                <span className="chip chip-outline">RERA {project.rera}</span>
              </div>
              <h1>{project.name}</h1>
              <p className="row gap-8" style={{ color: 'var(--muted)', margin: 0 }}>
                <FiMapPin size={15} style={{ color: 'var(--gold)' }} />
                {fullAddress(project.address)}
              </p>
            </div>
            <div className="detail-price">
              {shortINR(project.priceFrom)}
              <small>onwards · {project.configuration}</small>
            </div>
          </div>

          <Gallery images={project.images} alt={project.name} />

          <div className="pj-hero-stats" style={{ marginTop: 26 }}>
            {stats.map((s) => (
              <div key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="detail-layout" style={{ marginTop: 10 }}>
            <div>
              <div className="detail-block">
                <h2>About {project.name}</h2>
                <p style={{ fontSize: '1.06rem', color: 'var(--ink-2)' }}>{project.summary}</p>
                <p style={{ marginBottom: 0 }}>{project.description}</p>
              </div>

              <div className="detail-block">
                <h2>Project highlights</h2>
                <ul className="svc-points" style={{ fontSize: '0.96rem', gap: 12 }}>
                  {project.highlights.map((h) => (
                    <li key={h}>
                      <FiCheck size={16} /> {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-block">
                <h2>Amenities</h2>
                <div className="amenity-grid">
                  {project.amenities.map((a) => (
                    <div className="amenity" key={a}>
                      <FiCheck size={15} />
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-block">
                <h2>Project facts</h2>
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
                <h2>Location</h2>
                <p>{fullAddress(project.address)}</p>
                <div className="map-frame">
                  <iframe
                    title={`Map of ${project.name}`}
                    src={mapEmbed(
                      `${project.address.line}, ${project.address.locality}, ${project.address.city} ${project.address.pin}`,
                    )}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            <aside className="sticky-side">
              <div className="side-card">
                <h4 style={{ marginBottom: 6 }}>Construction status</h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--muted)' }}>
                  Updated from the quarterly RERA filing.
                </p>
                <div
                  className="progress"
                  style={{ background: 'var(--surface-3)' }}
                  role="progressbar"
                  aria-valuenow={project.completion}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <i style={{ width: `${project.completion}%` }} />
                </div>
                <div className="row" style={{ justifyContent: 'space-between', fontSize: '0.84rem' }}>
                  <span>{project.completion}% complete</span>
                  <b style={{ color: 'var(--ink)' }}>{project.possession}</b>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--line)', margin: '18px 0' }} />

                <Link to="/contact" className="btn btn-primary btn-block">
                  Request a site visit
                </Link>
                <a
                  href="#project-facts"
                  className="btn btn-outline btn-block"
                  style={{ marginTop: 10 }}
                  onClick={(e) => e.preventDefault()}
                >
                  <FiDownload size={15} /> Download brochure
                </a>
                <a
                  href="tel:+912049017788"
                  className="btn btn-outline btn-block"
                  style={{ marginTop: 10 }}
                >
                  <FiPhone size={15} /> +91 20 4901 7788
                </a>
              </div>

              <div className="side-card">
                <h4 style={{ marginBottom: 12 }}>Payment plan</h4>
                <div className="emi-breakdown">
                  <span>On booking</span>
                  <b>10%</b>
                </div>
                <div className="emi-breakdown">
                  <span>On agreement</span>
                  <b>20%</b>
                </div>
                <div className="emi-breakdown">
                  <span>Construction linked</span>
                  <b>60%</b>
                </div>
                <div className="emi-breakdown" style={{ borderBottom: 0 }}>
                  <span>On possession</span>
                  <b>10%</b>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {unitsOnSale.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <h2 style={{ marginBottom: 28 }}>Units available in {project.address.locality}</h2>
            <div className="grid grid-3 rail">
              {unitsOnSale.slice(0, 3).map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <h2 style={{ marginBottom: 28 }}>Other projects</h2>
          <div className="grid grid-3 rail">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.slug}`}
                className="svc-card"
                style={{ display: 'block' }}
              >
                <span className="chip chip-soft" style={{ marginBottom: 12 }}>
                  {p.stage}
                </span>
                <h3>{p.name}</h3>
                <p>
                  {p.address.locality}, {p.address.city} · {p.configuration}
                </p>
                <b style={{ color: 'var(--brand)' }}>{shortINR(p.priceFrom)} onwards</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CtaBand />
        </div>
      </section>
    </>
  )
}
