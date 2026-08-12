import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiMapPin } from 'react-icons/fi'
import { FaBath, FaBed, FaCarSide, FaVectorSquare } from 'react-icons/fa6'
import SmartImage from './SmartImage'
import { useToast } from './toast-context'
import { getAgent } from '../data/content'
import { formatNumber, shortAddress, shortINR } from '../utils/format'
import useWishlist from '../hooks/useWishlist'

export default function PropertyCard({ property, view = 'grid', priority = false }) {
  const wishlist = useWishlist()
  const { toast } = useToast()
  const [burst, setBurst] = useState(false)
  const fav = wishlist.has(property.id)
  const agent = getAgent(property.agentId)

  const toggleFav = () => {
    const added = wishlist.toggle(property.id)
    if (added) {
      setBurst(true)
      setTimeout(() => setBurst(false), 620)
    }
    toast(added ? `${property.title} added to your shortlist` : 'Removed from your shortlist', {
      type: added ? 'like' : 'info',
    })
  }

  return (
    <article className={`p-card ${view === 'list' ? 'list' : ''}`}>
      <div className="p-card-media">
        <Link to={`/properties/${property.slug}`} tabIndex={-1} aria-hidden="true">
          <SmartImage
            src={property.images[0]}
            alt=""
            priority={priority}
            sizes="(max-width: 720px) 80vw, (max-width: 1200px) 45vw, 30vw"
          />
        </Link>

        <div className="p-card-badges">
          <span className={`chip ${property.status === 'For Rent' ? 'chip-gold' : 'chip-brand'}`}>
            {property.status}
          </span>
          {property.featured && <span className="chip">Featured</span>}
          <span className="spacer" />
          <button
            type="button"
            className={`fav-btn ${fav ? 'on' : ''} ${burst ? 'burst' : ''}`}
            onClick={toggleFav}
            aria-label={
              fav ? `Remove ${property.title} from shortlist` : `Add ${property.title} to shortlist`
            }
            aria-pressed={fav}
          >
            <FiHeart size={16} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="p-card-price">
          {shortINR(property.price)}
          {property.priceUnit && <small> /{property.priceUnit}</small>}
        </div>
      </div>

      <div className="p-card-body">
        <span className="p-card-type">{property.type}</span>
        <h3>
          {/* The whole card is clickable via this stretched link, which keeps
              one tab stop per card instead of three. */}
          <Link to={`/properties/${property.slug}`} className="stretch-link" viewTransition>
            {property.title}
          </Link>
        </h3>
        <p className="p-card-addr">
          <FiMapPin size={14} aria-hidden="true" />
          <span>
            {property.address.line}, {shortAddress(property.address)} — {property.address.pin}
          </span>
        </p>

        {view === 'list' && (
          <p style={{ fontSize: 'var(--fs-sm)', margin: 0 }}>
            {property.description.slice(0, 165)}…
          </p>
        )}

        <div className="p-card-specs">
          {property.beds > 0 && (
            <span>
              <FaBed size={15} aria-hidden="true" /> {property.beds} Beds
            </span>
          )}
          {property.baths > 0 && (
            <span>
              <FaBath size={14} aria-hidden="true" /> {property.baths} Baths
            </span>
          )}
          <span>
            <FaVectorSquare size={13} aria-hidden="true" /> {formatNumber(property.area)} sq.ft.
          </span>
          {property.parking > 0 && (
            <span>
              <FaCarSide size={15} aria-hidden="true" /> {property.parking} Parking
            </span>
          )}
        </div>
      </div>

      <div className="p-card-foot">
        <div className="p-card-agent">
          {agent && (
            <>
              <SmartImage src={agent.photo} alt="" sizes="32px" />
              <b>{agent.name}</b>
            </>
          )}
        </div>
        <span className="p-card-cta" aria-hidden="true">
          Details
        </span>
      </div>
    </article>
  )
}
