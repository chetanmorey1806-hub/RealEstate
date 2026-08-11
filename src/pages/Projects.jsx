import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { CtaBand, PageHero, SectionHead } from '../components/common'
import { projects } from '../data/projects'
import useReveal from '../hooks/useReveal'

const stages = ['All', 'New launch', 'Under construction', 'Ready to move']

export default function Projects() {
  const [stage, setStage] = useState('All')
  const list = stage === 'All' ? projects : projects.filter((p) => p.stage === stage)

  useReveal([stage])

  return (
    <>
      <PageHero
        title="Projects we market"
        text="Exclusive mandates across residential, commercial and second-home formats — with live construction status, RERA numbers and possession dates on every one."
        crumbs={[{ label: 'Projects' }]}
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="Six live mandates"
            title="From launch pricing to ready possession"
            text="Filter by construction stage to see what fits your timeline."
          />

          <div className="pill-row scroll-sm" style={{ justifyContent: 'center', marginBottom: 34 }}>
            {stages.map((s) => (
              <button
                key={s}
                type="button"
                className={`pill ${stage === s ? 'on' : ''}`}
                onClick={() => setStage(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-3 rail">
            {list.map((p, i) => (
              <div className="reveal" key={p.id} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CtaBand
            title="Developing something? We take on marketing mandates."
            text="We have taken 42 projects from launch to full sell-out, handling pricing strategy, channel partners, the site experience and the CRM handover."
            primary={{ label: 'Talk about a mandate', to: '/contact' }}
            secondary={{ label: 'Our services', to: '/services' }}
          />
        </div>
      </section>
    </>
  )
}
