import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiMapPin } from 'react-icons/fi'
import { FaBath, FaBed, FaCarSide, FaVectorSquare } from 'react-icons/fa6'
import SmartImage from './SmartImage'
import { getAgent } from '../data/content'
import { formatNumber, shortAddress, shortINR } from '../utils/format'

export default function PropertyCard({ property, view = 'grid' }) {
  const [fav, setFav] = useState(false)
  const agent = getAgent(property.agentId)

  return (
    <article className={`p-card ${view === 'list' ? 'list' : ''}`}>
      <div className="p-card-media">
        <Link to={`/properties/${property.slug}`} aria-label={property.title}>
          <SmartImage src={property.images[0]} alt={property.title} />
        </Link>

        <div className="p-card-badges">
          <span className={`chip ${property.status === 'For Rent' ? 'chip-gold' : 'chip-brand'}`}>
            {property.status}
          </span>
          {property.featured && <span className="chip">Featured</span>}
          <span className="spacer" />
          <button
            type="button"
            className={`fav-btn ${fav ? 'on' : ''}`}
            onClick={() => setFav((f) => !f)}
            aria-label={fav ? 'Remove from shortlist' : 'Add to shortlist'}
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
          <Link to={`/properties/${property.slug}`}>{property.title}</Link>
        </h3>
        <p className="p-card-addr">
          <FiMapPin size={14} />
          <span>
            {property.address.line}, {shortAddress(property.address)} — {property.address.pin}
          </span>
        </p>

        {view === 'list' && (
          <p style={{ fontSize: '0.92rem', margin: 0 }}>
            {property.description.slice(0, 165)}…
          </p>
        )}

        <div className="p-card-specs">
          {property.beds > 0 && (
            <span>
              <FaBed size={15} /> {property.beds} Beds
            </span>
          )}
          {property.baths > 0 && (
            <span>
              <FaBath size={14} /> {property.baths} Baths
            </span>
          )}
          <span>
            <FaVectorSquare size={13} /> {formatNumber(property.area)} sq.ft.
          </span>
          {property.parking > 0 && (
            <span>
              <FaCarSide size={15} /> {property.parking} Parking
            </span>
          )}
        </div>
      </div>

      <div className="p-card-foot">
        <div className="p-card-agent">
          {agent && (
            <>
              <SmartImage src={agent.photo} alt={agent.name} />
              <b>{agent.name}</b>
            </>
          )}
        </div>
        <Link to={`/properties/${property.slug}`} className="btn btn-outline btn-sm">
          Details
        </Link>
      </div>
    </article>
  )
}
