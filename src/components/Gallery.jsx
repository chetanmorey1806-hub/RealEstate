import { useCallback, useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import SmartImage from './SmartImage'

/** Image slider with thumbnails, arrow controls and keyboard support. */
export default function Gallery({ images, alt = 'Property photo' }) {
  const [i, setI] = useState(0)

  const go = useCallback(
    (next) => setI((next + images.length) % images.length),
    [images.length],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(i - 1)
      if (e.key === 'ArrowRight') go(i + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [i, go])

  return (
    <div className="gallery">
      <div className="gallery-stage">
        {images.map((src, n) => (
          <SmartImage
            key={src}
            src={src}
            alt={`${alt} ${n + 1}`}
            className={n === i ? 'showing' : ''}
          />
        ))}

        <button
          type="button"
          className="gallery-arrow prev"
          onClick={() => go(i - 1)}
          aria-label="Previous photo"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          type="button"
          className="gallery-arrow next"
          onClick={() => go(i + 1)}
          aria-label="Next photo"
        >
          <FiChevronRight size={20} />
        </button>

        <span className="gallery-count">
          {i + 1} / {images.length}
        </span>
      </div>

      <div className="gallery-thumbs">
        {images.map((src, n) => (
          <button
            key={src}
            type="button"
            className={n === i ? 'active' : ''}
            onClick={() => setI(n)}
            aria-label={`Show photo ${n + 1}`}
          >
            <SmartImage src={src} alt="" />
          </button>
        ))}
      </div>
    </div>
  )
}
