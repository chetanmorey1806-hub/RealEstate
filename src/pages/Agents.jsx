import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import SmartImage from '../components/SmartImage'
import { CtaBand, PageHero, SectionHead } from '../components/common'
import { agents } from '../data/content'
import useReveal from '../hooks/useReveal'

export default function Agents() {
  useReveal([])

  return (
    <>
      <PageHero
        title="Meet the consultants"
        text="Six specialists, each covering one vertical and one geography. The person you speak to on day one is the person who closes your file."
        crumbs={[{ label: 'Agents' }]}
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="Our team"
            title="People, not a call centre"
            text="Between them they have closed more than eighteen hundred transactions across five cities."
          />

          <div className="grid grid-3 rail rail-wide">
            {agents.map((a, i) => (
              <article
                key={a.id}
                className="agent-card reveal"
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="agent-photo">
                  <SmartImage src={a.photo} alt={a.name} />
                  <div className="agent-social">
                    <a
                      href={`https://wa.me/${a.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`WhatsApp ${a.name}`}
                    >
                      <FaWhatsapp size={15} />
                    </a>
                    <a href={`tel:${a.phone.replace(/\s/g, '')}`} aria-label={`Call ${a.name}`}>
                      <FiPhone size={15} />
                    </a>
                    <a href={`mailto:${a.email}`} aria-label={`Email ${a.name}`}>
                      <FiMail size={15} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                      <FaLinkedinIn size={15} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                      <FaFacebookF size={15} />
                    </a>
                  </div>
                </div>

                <div className="agent-body">
                  <h3>{a.name}</h3>
                  <div className="agent-role">{a.role}</div>
                  <p style={{ fontSize: '0.9rem' }}>{a.bio}</p>

                  <div className="row wrap gap-8" style={{ justifyContent: 'center', marginBottom: 14 }}>
                    {a.specialities.map((s) => (
                      <span key={s} className="chip chip-outline">
                        {s}
                      </span>
                    ))}
                  </div>

                  <p
                    className="row gap-8"
                    style={{ justifyContent: 'center', fontSize: '0.85rem', margin: 0 }}
                  >
                    <FiMapPin size={13} style={{ color: 'var(--gold)' }} /> {a.city} ·{' '}
                    {a.languages.join(', ')}
                  </p>

                  <div className="agent-meta">
                    <div>
                      <b>{a.experience}</b>
                      years
                    </div>
                    <div>
                      <b>{a.deals}+</b>
                      deals closed
                    </div>
                  </div>

                  <div className="row gap-8" style={{ marginTop: 16 }}>
                    <a
                      href={`tel:${a.phone.replace(/\s/g, '')}`}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <FiPhone size={14} /> Call
                    </a>
                    <a
                      href={`mailto:${a.email}`}
                      className="btn btn-outline btn-sm"
                      style={{ flex: 1 }}
                    >
                      <FiMail size={14} /> Email
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CtaBand
            title="Want to join the team?"
            text="We hire consultants who would rather explain a bad deal than close it. Send us a note and we will call you back."
            primary={{ label: 'Write to us', to: '/contact' }}
            secondary={{ label: 'About the firm', to: '/about' }}
          />
        </div>
      </section>
    </>
  )
}
