import { useState } from 'react'
import { FiInfo, FiPlay, FiVideo } from 'react-icons/fi'
import SmartImage from './SmartImage'

/**
 * Poster-first video player. Supports an mp4 source or a YouTube id, and
 * only loads the heavy iframe/stream once the user actually presses play.
 */
export default function VideoPlayer({ video, title = 'Property walkthrough' }) {
  const [playing, setPlaying] = useState(false)

  if (!video) {
    return (
      <div className="video-empty">
        <FiVideo size={26} />
        <p>
          A video walkthrough has not been recorded for this property yet. Ask the consultant and
          we will shoot one within two working days.
        </p>
      </div>
    )
  }

  return (
    <div className="video-wrap">
      {!playing ? (
        <button type="button" className="video-poster" onClick={() => setPlaying(true)}>
          <SmartImage src={video.poster} alt={title} />
          <span className="video-play" aria-hidden="true">
            <FiPlay size={26} />
          </span>
          <span className="sr-only">Play {title}</span>
        </button>
      ) : video.type === 'youtube' ? (
        <iframe
          className="video-frame"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video className="video-frame" src={video.src} poster={video.poster} controls autoPlay />
      )}

      {video.sample && (
        <p className="video-note">
          <FiInfo size={13} /> Placeholder reel — swap <code>video</code> in{' '}
          <code>src/data/properties.js</code> for the property&apos;s own footage.
        </p>
      )}
    </div>
  )
}
