import { Link, useParams } from 'react-router-dom'
import { FiArrowRight, FiCalendar, FiChevronRight, FiClock, FiUser } from 'react-icons/fi'
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import SmartImage from '../components/SmartImage'
import { CtaBand } from '../components/common'
import NotFound from './NotFound'
import { blogPosts, getPostBySlug } from '../data/content'
import { formatDate } from '../utils/format'

export default function BlogDetail() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <NotFound />

  const more = blogPosts.filter((p) => p.id !== post.id).slice(0, 3)
  const url = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      <section style={{ background: 'var(--surface-2)', paddingBlock: 18 }}>
        <div className="container">
          <nav className="crumbs" style={{ color: 'var(--muted)', margin: 0 }} aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <FiChevronRight size={13} />
            <Link to="/blog">Blog</Link>
            <FiChevronRight size={13} />
            <span>{post.category}</span>
          </nav>
        </div>
      </section>

      <article className="section">
        <div className="container">
          <div className="article">
            <span className="chip chip-brand" style={{ marginBottom: 16 }}>
              {post.category}
            </span>
            <h1>{post.title}</h1>

            <div className="article-meta">
              <span>
                <FiUser size={14} /> {post.author}
              </span>
              <span>
                <FiCalendar size={14} /> {formatDate(post.date)}
              </span>
              <span>
                <FiClock size={14} /> {post.readTime}
              </span>
            </div>

            <div className="article-cover">
              <SmartImage src={post.cover} alt={post.title} />
            </div>

            {post.body.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}

            <div className="share-row">
              <b style={{ color: 'var(--ink)', fontSize: '0.9rem' }}>Share this article</b>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp size={16} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on X"
              >
                <FaXTwitter size={15} />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on Facebook"
              >
                <FaFacebookF size={15} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedinIn size={15} />
              </a>
            </div>
          </div>
        </div>
      </article>

      <section className="section section--tint">
        <div className="container">
          <h2 style={{ marginBottom: 28 }}>Keep reading</h2>
          <div className="grid grid-3">
            {more.map((p) => (
              <article key={p.id} className="post-card">
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

      <section className="section">
        <div className="container">
          <CtaBand />
        </div>
      </section>
    </>
  )
}
