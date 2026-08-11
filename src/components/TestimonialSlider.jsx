import { useEffect, useState } from 'react'
import { FaQuoteLeft, FaStar } from 'react-icons/fa6'
import { testimonials } from '../data/content'
import SmartImage from './SmartImage'

export default function TestimonialSlider() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    const t = setTimeout(() => setI((n) => (n + 1) % testimonials.length), 7000)
    return () => clearTimeout(t)
  }, [i, paused])

  return (
    <div
      className="tslider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <FaQuoteLeft size={34} style={{ color: 'var(--gold)', opacity: 0.5, marginBottom: 22 }} />

      {testimonials.map((t, n) => (
        <div key={t.id} className={`tslide ${n === i ? 'active' : ''}`}>
          <div className="tstars" aria-label={`${t.rating} out of 5`}>
            {Array.from({ length: t.rating }, (_, s) => (
              <FaStar key={s} size={15} />
            ))}
          </div>
          <p className="tquote">“{t.quote}”</p>
          <div className="tperson">
            <SmartImage src={t.photo} alt={t.name} />
            <div style={{ textAlign: 'left' }}>
              <b>{t.name}</b>
              <span>{t.role}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="tdots">
        {testimonials.map((t, n) => (
          <button
            key={t.id}
            type="button"
            className={n === i ? 'active' : ''}
            onClick={() => setI(n)}
            aria-label={`Testimonial ${n + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
