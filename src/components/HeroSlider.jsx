import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiPlay } from 'react-icons/fi'
import SmartImage from './SmartImage'

const slides = [
  {
    eyebrow: 'Ready to move · Baner, Pune',
    title: ['Live where the', 'city meets the', 'river'],
    accent: 'river',
    text: 'Sky residences at Aureus Skyline — 3, 4 and 5 BHK homes on an elevated podium garden, minutes from Balewadi High Street.',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1900&q=80',
    primary: { label: 'View this project', to: '/projects/aureus-skyline' },
    secondary: { label: 'Browse all properties', to: '/properties' },
  },
  {
    eyebrow: 'Weekend homes · Lonavala ridge',
    title: ['A second home', 'that pays for', 'itself'],
    accent: 'itself',
    text: 'Valley-facing villas at Palm Grove Estate with private infinity pools and a managed rental programme that ran at 82% occupancy last season.',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1900&q=80',
    primary: { label: 'Explore Palm Grove', to: '/projects/palm-grove-estate' },
    secondary: { label: 'Talk to an advisor', to: '/contact' },
  },
  {
    eyebrow: 'Commercial · Baner–Pashan Link',
    title: ['Office floors', 'built for whole', 'teams'],
    accent: 'teams',
    text: 'Column-free 12,000 sq.ft. plates at Meridian Business Bay, fitted and ready — move seventy people in under three weeks.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1900&q=80',
    primary: { label: 'See commercial space', to: '/properties?type=Office+Space' },
    secondary: { label: 'Our services', to: '/services' },
  },
  {
    eyebrow: 'Resale & rentals · Across 5 cities',
    title: ['Sixteen years', 'of finding the', 'right address'],
    accent: 'right address',
    text: '2,400 completed transactions, every listing physically verified, and a fee stated in writing before you engage us.',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1900&q=80',
    primary: { label: 'Find a property', to: '/properties' },
    secondary: { label: 'Meet the team', to: '/agents' },
  },
]

const DURATION = 6500

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  const go = useCallback((next) => {
    setIndex(() => (next + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (paused) return undefined
    timer.current = setTimeout(() => go(index + 1), DURATION)
    return () => clearTimeout(timer.current)
  }, [index, paused, go])

  const slide = slides[index]

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured properties"
    >
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={`hero-slide ${i === index ? 'active' : ''}`}
          aria-hidden={i !== index}
        >
          <SmartImage src={s.image} alt={s.title.join(' ')} />
        </div>
      ))}

      <div className="hero-body">
        <div className="container">
          <div className="hero-copy" key={index}>
            <span className="eyebrow" style={{ animation: 'fadeUp .6s .05s both' }}>
              {slide.eyebrow}
            </span>
            <h1 style={{ animation: 'fadeUp .6s .12s both' }}>
              {slide.title.map((line) => (
                <span key={line} style={{ display: 'block' }}>
                  {line === slide.accent ? (
                    <em>{line}</em>
                  ) : line.includes(slide.accent) ? (
                    <>
                      {line.replace(slide.accent, '')}
                      <em>{slide.accent}</em>
                    </>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>
            <p style={{ animation: 'fadeUp .6s .2s both' }}>{slide.text}</p>

            <div className="hero-actions" style={{ animation: 'fadeUp .6s .28s both' }}>
              <Link to={slide.primary.to} className="btn btn-primary">
                {slide.primary.label} <FiArrowRight size={17} />
              </Link>
              <Link to={slide.secondary.to} className="btn btn-ghost-light">
                <FiPlay size={15} /> {slide.secondary.label}
              </Link>
            </div>

            <div className="hero-facts" style={{ animation: 'fadeUp .6s .36s both' }}>
              <div>
                <b>2,400+</b>
                <span>Deals closed</span>
              </div>
              <div>
                <b>42</b>
                <span>Projects delivered</span>
              </div>
              <div>
                <b>5</b>
                <span>Cities covered</span>
              </div>
              <div>
                <b>4.9/5</b>
                <span>Client rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-dots">
        {slides.map((s, i) => (
          <button
            key={s.image}
            type="button"
            className={i === index ? 'active' : ''}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="hero-nav">
        <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide">
          <FiChevronLeft size={20} />
        </button>
        <button type="button" onClick={() => go(index + 1)} aria-label="Next slide">
          <FiChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
