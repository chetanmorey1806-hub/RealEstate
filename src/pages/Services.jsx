import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import { CtaBand, FaqList, PageHero, SectionHead } from '../components/common'
import { processIcons, serviceIcons } from '../components/icons'
import { processSteps, services } from '../data/content'
import useReveal from '../hooks/useReveal'

export default function Services() {
  const { hash } = useLocation()
  useReveal([])

  // Deep links such as /services#buying should land on the right block.
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60)
  }, [hash])

  return (
    <>
      <PageHero
        title="Services"
        text="Eight verticals, each run by people who work only in that vertical — from a first-time purchase to a portfolio review."
        crumbs={[{ label: 'Services' }]}
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="What we do"
            title="Pick the part you need — or hand us the whole file"
            text="Most clients start with one service and end up using three. There is no bundle you have to buy into."
          />

          <div className="grid grid-2">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.icon]
              return (
                <div
                  key={s.id}
                  id={s.slug}
                  className="svc-card reveal"
                  style={{ transitionDelay: `${(i % 2) * 80}ms`, scrollMarginTop: 110 }}
                >
                  <span className="svc-icon">
                    <Icon />
                  </span>
                  <h3>{s.title}</h3>
                  <p style={{ color: 'var(--ink-2)', fontWeight: 600 }}>{s.short}</p>
                  <p>{s.body}</p>
                  <ul className="svc-points">
                    {s.points.map((p) => (
                      <li key={p}>
                        <FiCheck size={15} /> {p}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="link-arrow" style={{ marginTop: 20 }}>
                    Enquire about this <FiArrowRight size={15} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead center eyebrow="How it works" title="What working with us looks like" />
          <div className="grid grid-4">
            {processSteps.map((s, i) => {
              const Icon = processIcons[s.icon]
              return (
                <div key={s.title} className="svc-card text-center reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="svc-icon" style={{ marginInline: 'auto' }}>
                    <Icon />
                  </span>
                  <h3>
                    {i + 1}. {s.title}
                  </h3>
                  <p>{s.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-split" style={{ alignItems: 'start' }}>
            <div>
              <span className="eyebrow">Fees</span>
              <h2>What this costs</h2>
              <p>
                Our fee is agreed in writing before we start. On primary sales the developer pays it,
                so the price you get through us matches or beats the site office.
              </p>
              <ul className="fact-list" style={{ gridTemplateColumns: '1fr', marginTop: 20 }}>
                <li>
                  <span>Primary purchase (new project)</span>
                  <b>Nil for the buyer</b>
                </li>
                <li>
                  <span>Resale purchase or sale</span>
                  <b>1% + GST</b>
                </li>
                <li>
                  <span>Residential leasing</span>
                  <b>1 month rent</b>
                </li>
                <li>
                  <span>Commercial leasing</span>
                  <b>1–2 months rent</b>
                </li>
                <li>
                  <span>Property management</span>
                  <b>5% of annual rent</b>
                </li>
                <li>
                  <span>Investment advisory</span>
                  <b>Fixed retainer</b>
                </li>
              </ul>
            </div>
            <div>
              <span className="eyebrow">Questions</span>
              <h2>Frequently asked</h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CtaBand
            title="Tell us which part you need help with."
            text="A twenty-minute call is enough for us to tell you whether we are the right firm for the job."
          />
        </div>
      </section>
    </>
  )
}
