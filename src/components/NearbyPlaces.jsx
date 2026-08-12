import { useMemo, useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import {
  FaBuildingColumns,
  FaBus,
  FaCartShopping,
  FaGraduationCap,
  FaPlane,
  FaTrainSubway,
  FaTree,
  FaUtensils,
} from 'react-icons/fa6'
import { placeTypes } from '../data/places'
import { driveTime, formatDistance, googleMapsLink, withDistances } from '../utils/geo'

const typeIcon = {
  school: FaGraduationCap,
  hospital: FaBuildingColumns,
  restaurant: FaUtensils,
  mall: FaCartShopping,
  metro: FaTrainSubway,
  bus: FaBus,
  airport: FaPlane,
  park: FaTree,
}

/** Distance-sorted POI list, filterable by category. */
export default function NearbyPlaces({ origin, places, onHover }) {
  const [type, setType] = useState('')

  const ranked = useMemo(() => withDistances(origin, places), [origin, places])
  const shown = type ? ranked.filter((p) => p.type === type) : ranked
  const available = [...new Set(ranked.map((p) => p.type))]

  return (
    <div className="nearby">
      <div className="pill-row scroll-sm" style={{ marginBottom: 18 }}>
        <button
          type="button"
          className={`pill ${type === '' ? 'on' : ''}`}
          onClick={() => setType('')}
        >
          All ({ranked.length})
        </button>
        {available.map((t) => {
          const Icon = typeIcon[t]
          return (
            <button
              key={t}
              type="button"
              className={`pill ${type === t ? 'on' : ''}`}
              onClick={() => setType(t)}
            >
              <Icon size={12} /> {placeTypes[t]?.label || t}
            </button>
          )
        })}
      </div>

      <ul className="nearby-list">
        {shown.map((pl) => {
          const Icon = typeIcon[pl.type]
          return (
            <li
              key={`${pl.name}-${pl.lat}`}
              onMouseEnter={() => onHover?.(pl)}
              onMouseLeave={() => onHover?.(null)}
            >
              <span className={`nearby-ico t-${pl.type}`}>
                <Icon size={14} />
              </span>
              <span className="nearby-name">
                <b>{pl.name}</b>
                <em>{placeTypes[pl.type]?.label}</em>
              </span>
              <span className="nearby-dist">
                <b>{formatDistance(pl.km)}</b>
                <em>~{driveTime(pl.km)} drive</em>
              </span>
              <a
                href={googleMapsLink(pl)}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${pl.name} in Google Maps`}
              >
                <FiExternalLink size={14} />
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
