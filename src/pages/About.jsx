import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import SmartImage from '../components/SmartImage'
import TestimonialSlider from '../components/TestimonialSlider'
import { Counter, CtaBand, PageHero, SectionHead } from '../components/common'
import { whyIcons } from '../components/icons'
import { milestones, whyUs } from '../data/content'
import { company, offices, stats } from '../data/site'
import useReveal from '../hooks/useReveal'

export default function About() {
  useReveal([])

  return (
    <>
      <PageHero
        title="About Estatica Realty"
        text={company.description}
        crumbs={[{ label: 'About' }]}
        image="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="section">
        <div className="container about-split">
          <div style={{ position: 'relative' }}>
            <div className="about-collage">
              <SmartImage
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
                alt="Our office"
              />
              <SmartImage
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80"
                alt="A delivered home"
              />
              <SmartImage
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=700&q=80"
                alt="The team at work"
              />
            </div>
            <div className="about-badge">
              <b>2009</b>
              <span>Founded in Pune</span>
            </div>
          </div>

          <div>
            <span className="eyebrow">Who we are</span>
            <h2>Started in one room in Aundh. Still answer our own phones.</h2>
            <p>
              Estatica began in 2009 as a two-person resale desk. We took on our first project
              mandate in 2013, opened Mumbai in 2016 and Bengaluru in 2022, and have since closed
              more than 2,400 transactions.
            </p>
            <p>
              What has not changed is the operating rule we started with: the client hears the
              drawbacks before they hear the pitch. It costs us deals. It is also why more than half
              of our business now comes from people a previous client sent to us.
            </p>

            <ul className="svc-points" style={{ marginTop: 22, fontSize: '0.96rem', gap: 12 }}>
              <li>
                <FiCheck size={16} /> Registered under {company.rera}
              </li>
              <li>
                <FiCheck size={16} /> Empanelled advocates for every title search
              </li>
              <li>
                <FiCheck size={16} /> Fee agreed in writing before we begin
              </li>
              <li>
                <FiCheck size={16} /> 61% of new business comes from referrals
              </li>
            </ul>

            <Link to="/contact" className="btn btn-primary" style={{ marginTop: 30 }}>
              Talk to us <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

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

      <section className="section">
        <div className="container about-split" style={{ alignItems: 'start' }}>
          <div>
            <span className="eyebrow">Our story</span>
            <h2>Sixteen years, six milestones</h2>
            <p>
              Growth has been deliberately slow. We have added a city only when we had someone who
              already knew its streets.
            </p>
            <ul className="timeline" style={{ marginTop: 30 }}>
              {milestones.map((m) => (
                <li key={m.year}>
                  <span className="year">{m.year}</span>
                  <h4>{m.title}</h4>
                  <p>{m.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow">How we work</span>
            <h2>Four commitments we hold ourselves to</h2>
            <div className="grid" style={{ gap: 18, marginTop: 24 }}>
              {whyUs.map((w) => {
                const Icon = whyIcons[w.icon]
                return (
                  <div key={w.title} className="svc-card" style={{ padding: '24px 22px' }}>
                    <div className="row gap-16" style={{ alignItems: 'flex-start' }}>
                      <span className="svc-icon" style={{ marginBottom: 0, flex: 'none' }}>
                        <Icon />
                      </span>
                      <div>
                        <h4 style={{ marginBottom: 4 }}>{w.title}</h4>
                        <p style={{ fontSize: '0.92rem', marginBottom: 0 }}>{w.text}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead center eyebrow="Our offices" title="Three cities, one standard" />
          <div className="grid grid-3">
            {offices.map((o, i) => (
              <div key={o.id} className="office-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="chip chip-soft">{o.label}</span>
                <h3>{o.city}</h3>
                <p style={{ fontSize: '0.92rem', marginBottom: 8 }}>
                  {o.line1}
                  <br />
                  {o.line2}
                  <br />
                  {o.area}
                </p>
                <p style={{ fontSize: '0.88rem', marginBottom: 0 }}>
                  <a href={`tel:${o.phone.replace(/\s/g, '')}`}>{o.phone}</a>
                  <br />
                  <a href={`mailto:${o.email}`}>{o.email}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Client stories" title="In their words" />
          <TestimonialSlider />
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
