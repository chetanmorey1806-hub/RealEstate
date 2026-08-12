import { useEffect, useState } from 'react'
import {
  FiCheck,
  FiChevronDown,
  FiFilter,
  FiRotateCcw,
  FiSave,
  FiSliders,
  FiX,
} from 'react-icons/fi'
import {
  cities,
  constructionStatuses,
  furnishings,
  listedByOptions,
  localities,
  propertyTypes,
} from '../data/properties'
import { amenityGroups } from '../data/amenities'
import { shortINR } from '../utils/format'

const bedOptions = ['1', '2', '3', '4', '5+']
const bathOptions = ['1', '2', '3', '4+']
const parkingOptions = [
  { value: 'yes', label: 'Any parking' },
  { value: '2+', label: '2 or more' },
  { value: 'no', label: 'No parking' },
]
const ageOptions = [
  { value: '0', label: 'New / under construction' },
  { value: '2', label: 'Up to 2 years' },
  { value: '5', label: 'Up to 5 years' },
  { value: '10', label: 'Up to 10 years' },
]

/** Collapsible section so the panel stays scannable with 20+ controls. */
function Group({ title, children, defaultOpen = true, count = 0 }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = `fg-${title.replace(/\W+/g, '-').toLowerCase()}`
  return (
    <div className={`fgroup ${open ? 'open' : ''}`}>
      <h5>
        <button
          type="button"
          className="fgroup-head"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={id}
        >
          {title}
          {count > 0 && (
            <span className="fgroup-count">
              {count}
              <span className="sr-only"> filters active</span>
            </span>
          )}
          <FiChevronDown size={15} aria-hidden="true" />
        </button>
      </h5>
      <div className="fgroup-body" id={id} role="group" aria-label={title}>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default function FilterPanel({
  panelRef,
  filters,
  set,
  reset,
  activeCount,
  resultCount,
  onSave,
  onClose,
  isSheet,
}) {
  // The keyword box keeps its own state so typing stays responsive; the
  // search (and the URL write) only runs once typing pauses.
  const [keyword, setKeyword] = useState(filters.q)

  useEffect(() => setKeyword(filters.q), [filters.q])

  useEffect(() => {
    if (keyword === filters.q) return undefined
    const t = setTimeout(() => set('q', keyword), 250)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  const isRent = filters.status === 'For Rent'
  const priceMax = isRent ? 500000 : 70000000
  const priceStep = isRent ? 5000 : 500000

  const toggleAmenity = (a) =>
    set(
      'amenities',
      filters.amenities.includes(a)
        ? filters.amenities.filter((x) => x !== a)
        : [...filters.amenities, a],
    )

  return (
    <aside
      ref={panelRef}
      className={`filters ${isSheet ? 'open' : ''}`}
      role="dialog"
      aria-modal={isSheet || undefined}
      aria-label="Filter properties"
    >
      <h4>
        <FiFilter size={16} aria-hidden="true" /> Filters
        {activeCount > 0 && <span className="fgroup-count">{activeCount}</span>}
        <button
          type="button"
          className="icon-btn sheet-trigger"
          style={{ marginLeft: 'auto', width: 34, height: 34 }}
          onClick={onClose}
          aria-label="Close filters"
        >
          <FiX size={16} />
        </button>
      </h4>

      {/* ------------------------- location ------------------------- */}
      <Group title="Location" count={[filters.city, filters.locality, filters.pin].filter(Boolean).length}>
        <div className="filter-group">
          <label htmlFor="f-q">Keyword</label>
          <input
            id="f-q"
            type="search"
            inputMode="search"
            autoComplete="off"
            placeholder="Project, landmark, locality…"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="f-city">City</label>
          <select id="f-city" value={filters.city} onChange={(e) => set('city', e.target.value)}>
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="f-loc">Locality</label>
          <select
            id="f-loc"
            value={filters.locality}
            onChange={(e) => set('locality', e.target.value)}
          >
            <option value="">All localities</option>
            {localities.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="f-pin">PIN code</label>
          <input
            id="f-pin"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            placeholder="e.g. 411045"
            value={filters.pin}
            onChange={(e) => set('pin', e.target.value.replace(/\D/g, ''))}
          />
        </div>
      </Group>

      {/* --------------------- type and listing --------------------- */}
      <Group title="Property & listing" count={[filters.type, filters.status, filters.listedBy].filter(Boolean).length}>
        <div className="filter-group">
          <span className="filter-label">Buy or rent</span>
          <div className="pill-row">
            {['', 'For Sale', 'For Rent'].map((s) => (
              <button
                key={s || 'all'}
                type="button"
                className={`pill ${filters.status === s ? 'on' : ''}`}
                onClick={() => set('status', s)}
              >
                {s === '' ? 'Any' : s === 'For Sale' ? 'Buy' : 'Rent'}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="f-type">Property type</label>
          <select id="f-type" value={filters.type} onChange={(e) => set('type', e.target.value)}>
            <option value="">All types</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <span className="filter-label">Listed by</span>
          <div className="pill-row">
            <button
              type="button"
              className={`pill ${filters.listedBy === '' ? 'on' : ''}`}
              onClick={() => set('listedBy', '')}
            >
              Anyone
            </button>
            {listedByOptions.map((o) => (
              <button
                key={o}
                type="button"
                className={`pill ${filters.listedBy === o ? 'on' : ''}`}
                onClick={() => set('listedBy', o)}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      </Group>

      {/* ------------------------- budget --------------------------- */}
      <Group title={isRent ? 'Monthly rent' : 'Budget'} count={[filters.minPrice, filters.maxPrice].filter(Boolean).length}>
        <div className="filter-group">
          <label htmlFor="f-maxprice">
            Maximum {isRent ? 'rent' : 'price'} —{' '}
            <b>{filters.maxPrice ? shortINR(Number(filters.maxPrice)) : 'Any'}</b>
          </label>
          <input
            id="f-maxprice"
            type="range"
            min={0}
            max={priceMax}
            step={priceStep}
            value={filters.maxPrice || priceMax}
            onChange={(e) =>
              set('maxPrice', Number(e.target.value) >= priceMax ? '' : e.target.value)
            }
          />
        </div>

        <div className="filter-duo">
          <div className="filter-group">
            <label htmlFor="f-minprice">Min</label>
            <input
              id="f-minprice"
              type="number"
              min={0}
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => set('minPrice', e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="f-maxprice-n">Max</label>
            <input
              id="f-maxprice-n"
              type="number"
              min={0}
              placeholder="Any"
              value={filters.maxPrice}
              onChange={(e) => set('maxPrice', e.target.value)}
            />
          </div>
        </div>
      </Group>

      {/* -------------------------- area ---------------------------- */}
      <Group title="Area (sq.ft.)" count={[filters.minArea, filters.maxArea].filter(Boolean).length} defaultOpen={false}>
        <div className="filter-duo">
          <div className="filter-group">
            <label htmlFor="f-minarea">Min area</label>
            <input
              id="f-minarea"
              type="number"
              min={0}
              placeholder="0"
              value={filters.minArea}
              onChange={(e) => set('minArea', e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="f-maxarea">Max area</label>
            <input
              id="f-maxarea"
              type="number"
              min={0}
              placeholder="Any"
              value={filters.maxArea}
              onChange={(e) => set('maxArea', e.target.value)}
            />
          </div>
        </div>
      </Group>

      {/* ------------------------- rooms ---------------------------- */}
      <Group title="Rooms & parking" count={[filters.beds, filters.baths, filters.furnishing, filters.parking].filter(Boolean).length}>
        <div className="filter-group">
          <span className="filter-label">Bedrooms</span>
          <div className="pill-row">
            <button
              type="button"
              className={`pill ${filters.beds === '' ? 'on' : ''}`}
              onClick={() => set('beds', '')}
            >
              Any
            </button>
            {bedOptions.map((b) => (
              <button
                key={b}
                type="button"
                className={`pill ${filters.beds === b ? 'on' : ''}`}
                onClick={() => set('beds', b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Bathrooms</span>
          <div className="pill-row">
            <button
              type="button"
              className={`pill ${filters.baths === '' ? 'on' : ''}`}
              onClick={() => set('baths', '')}
            >
              Any
            </button>
            {bathOptions.map((b) => (
              <button
                key={b}
                type="button"
                className={`pill ${filters.baths === b ? 'on' : ''}`}
                onClick={() => set('baths', b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Furnishing</span>
          <div className="pill-row">
            <button
              type="button"
              className={`pill ${filters.furnishing === '' ? 'on' : ''}`}
              onClick={() => set('furnishing', '')}
            >
              Any
            </button>
            {furnishings.map((f) => (
              <button
                key={f}
                type="button"
                className={`pill ${filters.furnishing === f ? 'on' : ''}`}
                onClick={() => set('furnishing', f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Parking</span>
          <div className="pill-row">
            <button
              type="button"
              className={`pill ${filters.parking === '' ? 'on' : ''}`}
              onClick={() => set('parking', '')}
            >
              Any
            </button>
            {parkingOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`pill ${filters.parking === o.value ? 'on' : ''}`}
                onClick={() => set('parking', o.value)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </Group>

      {/* ---------------------- construction ------------------------ */}
      <Group
        title="Construction & possession"
        defaultOpen={false}
        count={[filters.constructionStatus, filters.possessionBy, filters.maxAge].filter(Boolean).length}
      >
        <div className="filter-group">
          <span className="filter-label">Construction status</span>
          <div className="pill-row">
            <button
              type="button"
              className={`pill ${filters.constructionStatus === '' ? 'on' : ''}`}
              onClick={() => set('constructionStatus', '')}
            >
              Any
            </button>
            {constructionStatuses.map((s) => (
              <button
                key={s}
                type="button"
                className={`pill ${filters.constructionStatus === s ? 'on' : ''}`}
                onClick={() => set('constructionStatus', s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="f-poss">Possession by</label>
          <input
            id="f-poss"
            type="date"
            value={filters.possessionBy}
            onChange={(e) => set('possessionBy', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <span className="filter-label">Property age</span>
          <div className="pill-row">
            <button
              type="button"
              className={`pill ${filters.maxAge === '' ? 'on' : ''}`}
              onClick={() => set('maxAge', '')}
            >
              Any
            </button>
            {ageOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`pill ${filters.maxAge === o.value ? 'on' : ''}`}
                onClick={() => set('maxAge', o.value)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </Group>

      {/* ------------------------ amenities ------------------------- */}
      <Group title="Amenities" defaultOpen={false} count={filters.amenities.length}>
        {amenityGroups.map((g) => (
          <div className="filter-group" key={g.group}>
            <span className="filter-label">{g.group}</span>
            <div className="check-grid">
              {g.items.map((a) => {
                const on = filters.amenities.includes(a)
                return (
                  <button
                    key={a}
                    type="button"
                    className={`check ${on ? 'on' : ''}`}
                    onClick={() => toggleAmenity(a)}
                    aria-pressed={on}
                  >
                    <i>{on && <FiCheck size={11} />}</i>
                    {a}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </Group>

      {/* ------------------------- trust ---------------------------- */}
      <Group title="Trust & verification" count={[filters.reraOnly, filters.verifiedOnly].filter(Boolean).length}>
        <label className="switch">
          <input
            type="checkbox"
            checked={filters.reraOnly}
            onChange={(e) => set('reraOnly', e.target.checked)}
          />
          <i />
          <span>RERA approved only</span>
        </label>
        <label className="switch">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => set('verifiedOnly', e.target.checked)}
          />
          <i />
          <span>Verified properties only</span>
        </label>
      </Group>

      <div className="filter-actions">
        <button type="button" className="btn btn-outline btn-block" onClick={reset}>
          <FiRotateCcw size={15} /> Clear all filters
        </button>
        <button type="button" className="btn btn-outline btn-block" onClick={onSave}>
          <FiSave size={15} /> Save this search
        </button>
        <button type="button" className="btn btn-primary btn-block sheet-trigger" onClick={onClose}>
          <FiSliders size={15} /> Show {resultCount} properties
        </button>
      </div>
    </aside>
  )
}
