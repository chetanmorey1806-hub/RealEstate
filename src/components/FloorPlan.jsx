import { useMemo, useState } from 'react'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import { formatNumber } from '../utils/format'

/**
 * Schematic floor plan drawn from the listing's own room counts and carpet
 * area, so the labelled sizes always add up to the advertised carpet area.
 * Rooms are laid out on a 100x70 grid; `f` is each room's share of the area.
 */

// x, y, w, h are grid units; f is the share of carpet area used for the label.
const LAYOUTS = {
  1: [
    { name: 'Living / Dining', x: 0, y: 0, w: 58, h: 42, f: 0.36 },
    { name: 'Kitchen', x: 0, y: 42, w: 30, h: 28, f: 0.13 },
    { name: 'Bedroom', x: 58, y: 0, w: 42, h: 40, f: 0.27 },
    { name: 'Bath', x: 58, y: 40, w: 42, h: 30, f: 0.09 },
    { name: 'Balcony', x: 30, y: 42, w: 28, h: 28, f: 0.15, balcony: true },
  ],
  2: [
    { name: 'Living / Dining', x: 0, y: 0, w: 52, h: 40, f: 0.29 },
    { name: 'Kitchen', x: 0, y: 40, w: 26, h: 30, f: 0.11 },
    { name: 'Master Bedroom', x: 52, y: 0, w: 48, h: 36, f: 0.22 },
    { name: 'Bedroom 2', x: 52, y: 36, w: 30, h: 34, f: 0.18 },
    { name: 'Bath', x: 82, y: 36, w: 18, h: 18, f: 0.06 },
    { name: 'Bath', x: 82, y: 54, w: 18, h: 16, f: 0.05 },
    { name: 'Balcony', x: 26, y: 40, w: 26, h: 30, f: 0.09, balcony: true },
  ],
  3: [
    { name: 'Living / Dining', x: 0, y: 0, w: 46, h: 38, f: 0.24 },
    { name: 'Kitchen', x: 0, y: 38, w: 24, h: 32, f: 0.1 },
    { name: 'Master Bedroom', x: 46, y: 0, w: 34, h: 34, f: 0.18 },
    { name: 'Bedroom 2', x: 80, y: 0, w: 20, h: 34, f: 0.12 },
    { name: 'Bedroom 3', x: 46, y: 34, w: 32, h: 36, f: 0.16 },
    { name: 'Bath', x: 78, y: 34, w: 22, h: 18, f: 0.05 },
    { name: 'Bath', x: 78, y: 52, w: 22, h: 18, f: 0.05 },
    { name: 'Balcony', x: 24, y: 38, w: 22, h: 32, f: 0.1, balcony: true },
  ],
  4: [
    { name: 'Living / Dining', x: 0, y: 0, w: 42, h: 36, f: 0.2 },
    { name: 'Kitchen', x: 0, y: 36, w: 22, h: 34, f: 0.09 },
    { name: 'Master Bedroom', x: 42, y: 0, w: 32, h: 32, f: 0.16 },
    { name: 'Bedroom 2', x: 74, y: 0, w: 26, h: 32, f: 0.13 },
    { name: 'Bedroom 3', x: 42, y: 32, w: 30, h: 38, f: 0.14 },
    { name: 'Bedroom 4', x: 72, y: 32, w: 28, h: 22, f: 0.12 },
    { name: 'Bath', x: 72, y: 54, w: 14, h: 16, f: 0.04 },
    { name: 'Bath', x: 86, y: 54, w: 14, h: 16, f: 0.04 },
    { name: 'Balcony', x: 22, y: 36, w: 20, h: 34, f: 0.08, balcony: true },
  ],
  5: [
    { name: 'Living / Dining', x: 0, y: 0, w: 40, h: 34, f: 0.18 },
    { name: 'Kitchen', x: 0, y: 34, w: 22, h: 20, f: 0.08 },
    { name: 'Utility', x: 0, y: 54, w: 22, h: 16, f: 0.05 },
    { name: 'Master Bedroom', x: 40, y: 0, w: 30, h: 30, f: 0.14 },
    { name: 'Bedroom 2', x: 70, y: 0, w: 30, h: 30, f: 0.13 },
    { name: 'Bedroom 3', x: 40, y: 30, w: 28, h: 22, f: 0.12 },
    { name: 'Bedroom 4', x: 68, y: 30, w: 32, h: 22, f: 0.12 },
    { name: 'Bedroom 5', x: 40, y: 52, w: 30, h: 18, f: 0.11 },
    { name: 'Bath', x: 70, y: 52, w: 30, h: 18, f: 0.07 },
    { name: 'Deck', x: 22, y: 34, w: 18, h: 36, f: 0.0, balcony: true },
  ],
}

const NON_RESIDENTIAL = {
  'Office Space': [
    { name: 'Reception', x: 0, y: 0, w: 26, h: 24, f: 0.07 },
    { name: 'Workstation Bay', x: 26, y: 0, w: 50, h: 46, f: 0.45 },
    { name: 'Board Room', x: 76, y: 0, w: 24, h: 26, f: 0.12 },
    { name: 'Cabins', x: 76, y: 26, w: 24, h: 24, f: 0.12 },
    { name: 'Pantry', x: 0, y: 24, w: 26, h: 22, f: 0.08 },
    { name: 'Server Room', x: 0, y: 46, w: 26, h: 24, f: 0.06 },
    { name: 'Washrooms', x: 26, y: 46, w: 24, h: 24, f: 0.05 },
    { name: 'Breakout', x: 50, y: 46, w: 50, h: 24, f: 0.05 },
  ],
  'Retail Shop': [
    { name: 'Shop Floor', x: 0, y: 0, w: 70, h: 48, f: 0.66 },
    { name: 'Display Window', x: 0, y: 48, w: 70, h: 22, f: 0.14, balcony: true },
    { name: 'Store', x: 70, y: 0, w: 30, h: 26, f: 0.11 },
    { name: 'Washroom', x: 70, y: 26, w: 30, h: 20, f: 0.05 },
    { name: 'Service Access', x: 70, y: 46, w: 30, h: 24, f: 0.04, balcony: true },
  ],
  Plot: [
    { name: 'Buildable Envelope', x: 8, y: 8, w: 84, h: 46, f: 0.62 },
    { name: 'Setback', x: 0, y: 0, w: 100, h: 8, f: 0.09, balcony: true },
    { name: 'Front Margin', x: 0, y: 54, w: 100, h: 16, f: 0.19, balcony: true },
    { name: 'Side', x: 0, y: 8, w: 8, h: 46, f: 0.05, balcony: true },
    { name: 'Side', x: 92, y: 8, w: 8, h: 46, f: 0.05, balcony: true },
  ],
}

export default function FloorPlan({ property }) {
  const [zoom, setZoom] = useState(false)

  const rooms = useMemo(() => {
    const layout =
      NON_RESIDENTIAL[property.type] || LAYOUTS[Math.min(5, Math.max(1, property.beds))] || LAYOUTS[2]
    return layout.map((r) => ({
      ...r,
      sqft: Math.round(property.carpetArea * r.f),
    }))
  }, [property])

  return (
    <div className={`floorplan ${zoom ? 'zoomed' : ''}`}>
      <div className="floorplan-head">
        <div>
          <b>Typical unit plan</b>
          <span>
            Carpet {formatNumber(property.carpetArea)} sq.ft. · Built-up{' '}
            {formatNumber(property.builtUpArea || property.area)} sq.ft.
          </span>
        </div>
        <button
          type="button"
          className="icon-btn"
          onClick={() => setZoom((z) => !z)}
          aria-label={zoom ? 'Shrink plan' : 'Enlarge plan'}
        >
          {zoom ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />}
        </button>
      </div>

      <svg viewBox="-2 -2 104 84" role="img" aria-label={`Floor plan of ${property.title}`}>
        <rect className="fp-shell" x="0" y="0" width="100" height="70" rx="1" />

        {rooms.map((r, i) => (
          <g key={`${r.name}-${i}`} className={`fp-room ${r.balcony ? 'balcony' : ''}`}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} />
            <text x={r.x + r.w / 2} y={r.y + r.h / 2 - 1.4} className="fp-name">
              {r.name}
            </text>
            {r.sqft > 0 && (
              <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 3.4} className="fp-size">
                {r.sqft} sq.ft.
              </text>
            )}
          </g>
        ))}

        {/* north arrow */}
        <g className="fp-north" transform="translate(95, 77)">
          <circle r="4.4" />
          <path d="M0,-3 L2,2.4 L0,1.1 L-2,2.4 Z" />
          <text y="-5.4">N</text>
        </g>
      </svg>

      <p className="floorplan-note">
        Indicative layout drawn from the registered carpet area and room count. Ask for the
        architect&apos;s stamped drawing before you sign.
      </p>
    </div>
  )
}
