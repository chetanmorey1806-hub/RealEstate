import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiPhone } from 'react-icons/fi'
import HeroSlider from '../components/HeroSlider'
import SearchPanel from '../components/SearchPanel'
import PropertyCard from '../components/PropertyCard'
import ProjectCard from '../components/ProjectCard'
import TestimonialSlider from '../components/TestimonialSlider'
import SmartImage from '../components/SmartImage'
import { CtaBand, Counter, FaqList, SectionHead } from '../components/common'
import { processIcons, serviceIcons, whyIcons } from '../components/icons'
import { featuredProperties } from '../data/properties'
import { projects } from '../data/projects'
import { localities, processSteps, services, whyUs } from '../data/content'
import { stats } from '../data/site'
import useReveal from '../hooks/useReveal'

export default function Home() {
  useReveal([])

  return (
    <>
      <HeroSlider />
      <SearchPanel />

      {/* ------------------------------ services --------------------------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="What we do"
            title="Every part of a property decision, under one roof"
            text="Buying, selling, leasing, managing and financing — handled by specialists who work only in that vertical."
          />
          <div className="grid grid-4">
            {services.slice(0, 4).map((s, i) => {
              const Icon = serviceIcons[s.icon]
              return (
                <div
                  className="svc-card reveal"
                  key={s.id}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <span className="svc-icon">
                    <Icon />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                  <Link to={`/services#${s.slug}`} className="link-arrow" style={{ marginTop: 16 }}>
                    Read more <FiArrowRight size={15} />
                  </Link>
                </div>
              )
            })}
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link to="/services" className="btn btn-outline">
              All eight services <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------- featured homes ------------------------ */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="Handpicked"
            title="Featured properties"
            text="Every listing below has been physically inspected by our team, with title and RERA status verified before it went live."
            action={
              <Link to="/properties" className="btn btn-outline">
                View all listings <FiArrowRight size={16} />
              </Link>
            }
          />
          <div className="grid grid-3">
            {featuredProperties.slice(0, 6).map((p, i) => (
              <div className="reveal" key={p.id} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <PropertyCard property={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ why us ----------------------------- */}
      <section className="section">
        <div className="container">
          <div className="about-split">
            <div style={{ position: 'relative' }}>
              <div className="about-collage">
                <SmartImage
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                  alt="Living room interior"
                />
                <SmartImage
                  src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=700&q=80"
                  alt="Modern kitchen"
                />
                <SmartImage
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=80"
                  alt="Bedroom interior"
                />
              </div>
              <div className="about-badge">
                <b>16</b>
                <span>Years in the market</span>
              </div>
            </div>

            <div>
              <span className="eyebrow">Why Estatica</span>
              <h2>We would rather lose a deal than sell you the wrong home</h2>
              <p>
                Most brokerages are paid to move whatever inventory they are holding. We are paid to
                get you the right address at the right price — which sometimes means telling you the
                flat you loved is overpriced by eleven percent.
              </p>

              <div className="grid grid-2" style={{ gap: 20, marginTop: 28 }}>
                {whyUs.map((w) => {
                  const Icon = whyIcons[w.icon]
                  return (
                    <div key={w.title} className="row gap-16" style={{ alignItems: 'flex-start' }}>
                      <span className="svc-icon" style={{ marginBottom: 0, flex: 'none' }}>
                        <Icon />
                      </span>
                      <div>
                        <h4 style={{ marginBottom: 4 }}>{w.title}</h4>
                        <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>{w.text}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="row wrap gap-12" style={{ marginTop: 34 }}>
                <Link to="/about" className="btn btn-primary">
                  About the firm <FiArrowRight size={16} />
                </Link>
                <a href="tel:+919822045611" className="btn btn-outline">
                  <FiPhone size={16} /> +91 98220 45611
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ stats ------------------------------ */}
      <section className="section section--ink on-ink" style={{ paddingBlock: 'clamp(40px, 5vw, 68px)' }}>
        <div className="container">
          <div className="grid grid-4" style={{ gap: 0 }}>
            {stats.map((s, i) => (
              <div key={s.label} className={`stat ${i < stats.length - 1 ? 'stat-divider' : ''}`}>
                <Counter to={s.value} suffix={s.suffix} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- projects ---------------------------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Our projects"
            title="Projects we market exclusively"
            text="From a 23-storey tower in Baner to twenty-four valley villas on the Lonavala ridge — with live construction status on each."
            action={
              <Link to="/projects" className="btn btn-outline">
                All projects <FiArrowRight size={16} />
              </Link>
            }
          />
          <div className="grid grid-3">
            {projects.slice(0, 3).map((p, i) => (
              <div className="reveal" key={p.id} style={{ transitionDelay: `${i * 80}ms` }}>
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- localities --------------------------- */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            center
            eyebrow="Where we work"
            title="Browse by locality"
            text="Six micro-markets we know street by street, with live inventory in each."
          />
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            {localities.map((l, i) => (
              <Link
                to={`/properties?city=${encodeURIComponent(l.city)}`}
                key={l.name}
                className="loc-card reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <SmartImage src={l.image} alt={l.name} />
                <div className="loc-body">
                  <h4>{l.name}</h4>
                  <span>{l.listings} listings</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- process ----------------------------- */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="How it works"
            title="Four steps from first call to keys in hand"
          />
          <div className="grid grid-4">
            {processSteps.map((s, i) => {
              const Icon = processIcons[s.icon]
              return (
                <div
                  key={s.title}
                  className="svc-card reveal text-center"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span
                    className="svc-icon"
                    style={{ marginInline: 'auto', position: 'relative' }}
                  >
                    <Icon />
                    <b
                      style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: 'var(--gold)',
                        color: '#241d0d',
                        fontSize: '0.78rem',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      {i + 1}
                    </b>
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* --------------------------- testimonials -------------------------- */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            center
            eyebrow="Client stories"
            title="What people say after the paperwork is done"
          />
          <TestimonialSlider />
        </div>
      </section>

      {/* -------------------------------- FAQ ------------------------------ */}
      <section className="section">
        <div className="container">
          <div className="about-split" style={{ alignItems: 'start' }}>
            <div>
              <span className="eyebrow">Questions</span>
              <h2>The things buyers ask us first</h2>
              <p>
                If your question is not here, call the number below — you will reach a consultant,
                not a call centre.
              </p>
              <ul className="svc-points" style={{ marginTop: 22, fontSize: '0.95rem' }}>
                <li>
                  <FiCheck size={16} /> No brokerage on primary sales
                </li>
                <li>
                  <FiCheck size={16} /> Title and RERA verified before listing
                </li>
                <li>
                  <FiCheck size={16} /> One consultant owns your file end to end
                </li>
              </ul>
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: 26 }}>
                Ask us anything <FiArrowRight size={16} />
              </Link>
            </div>
            <FaqList limit={5} />
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
