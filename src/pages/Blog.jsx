import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi'
import SmartImage from '../components/SmartImage'
import { CtaBand, PageHero, SectionHead } from '../components/common'
import { blogPosts } from '../data/content'
import { formatDate } from '../utils/format'
import useReveal from '../hooks/useReveal'

const categories = ['All', ...new Set(blogPosts.map((p) => p.category))]

export default function Blog() {
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? blogPosts : blogPosts.filter((p) => p.category === cat)

  useReveal([cat])

  return (
    <>
      <PageHero
        title="Guides & market notes"
        text="What we tell clients on calls, written down — buying guides, loan mechanics, RERA checks and honest market reads."
        crumbs={[{ label: 'Blog' }]}
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="From our desk"
            title="Six things worth reading before you sign anything"
          />

          <div className="pill-row" style={{ justifyContent: 'center', marginBottom: 40 }}>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`pill ${cat === c ? 'on' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-3">
            {list.map((p, i) => (
              <article
                key={p.id}
                className="post-card reveal"
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="post-media">
                  <Link to={`/blog/${p.slug}`} aria-label={p.title}>
                    <SmartImage src={p.cover} alt={p.title} />
                  </Link>
                  <span className="chip chip-brand">{p.category}</span>
                </div>
                <div className="post-body">
                  <div className="post-meta">
                    <span>
                      <FiCalendar size={13} /> {formatDate(p.date)}
                    </span>
                    <span>
                      <FiClock size={13} /> {p.readTime}
                    </span>
                  </div>
                  <h3>
                    <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p>{p.excerpt}</p>
                  <Link to={`/blog/${p.slug}`} className="link-arrow">
                    Read article <FiArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CtaBand
            title="Have a question the articles do not answer?"
            text="Send it over. If it is a good one we will probably turn the answer into the next post."
          />
        </div>
      </section>
    </>
  )
}
