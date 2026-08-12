import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiCrosshair, FiFilter, FiList, FiMapPin, FiX } from 'react-icons/fi'
import PropertyMap from '../components/PropertyMap'
import FilterPanel from '../components/FilterPanel'
import SmartImage from '../components/SmartImage'
import { PageHero } from '../components/common'
import { cities, properties } from '../data/properties'
import { getPlaces, placeTypes } from '../data/places'
import {
  countActive,
  emptyFilters,
  filtersToParams,
  paramsToFilters,
  searchProperties,
} from '../utils/search'
import { distanceKm, formatDistance } from '../utils/geo'
import { shortAddress, shortINR } from '../utils/format'
import useBodyLock from '../hooks/useBodyLock'

const CITY_CENTRES = {
  Pune: { lat: 18.5204, lng: 73.8567 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Bengaluru: { lat: 12.9716, lng: 77.5946 },
  Lonavala: { lat: 18.7546, lng: 73.4062 },
  Goa: { lat: 15.4909, lng: 73.8278 },
}

const RADII = [2, 5, 10, 25, 50]

export default function MapSearch() {
  const [params, setParams] = useSearchParams()
  const [filters, setFilters] = useState(() => paramsToFilters(params))
  const [activeId, setActiveId] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [showPois, setShowPois] = useState(false)

  useBodyLock(sheetOpen)

  const set = useCallback((key, value) => setFilters((f) => ({ ...f, [key]: value })), [])
  const reset = useCallback(() => setFilters(emptyFilters), [])

  useEffect(() => {
    setParams(filtersToParams(filters, ''), { replace: true })
  }, [filters, setParams])

  const results = useMemo(() => searchProperties(filters, 'relevance'), [filters])

  // POIs around whatever is currently in view, deduped by name.
  const places = useMemo(() => {
    if (!showPois) return []
    const keys = [...new Set(results.map((p) => p.address.localityKey))]
    const seen = new Set()
    return keys
      .flatMap((k) => getPlaces(k))
      .filter((pl) => {
        if (seen.has(pl.name)) return false
        seen.add(pl.name)
        return true
      })
  }, [results, showPois])

  const dropPin = (point) => {
    set('centre', point)
    if (!filters.radiusKm) set('radiusKm', '5')
  }

  const useMyLocation = () => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => dropPin({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => dropPin(CITY_CENTRES.Pune),
      { timeout: 8000 },
    )
  }

  const activeCount = countActive(filters)

  return (
    <>
      <PageHero
        title="Search on the map"
        text="Drop a pin anywhere, set a radius, and see only what falls inside it — with schools, hospitals, metro stations and malls plotted alongside."
        crumbs={[{ label: 'Properties', to: '/properties' }, { label: 'Map search' }]}
        image="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="section">
        <div className="container">
          {/* ------------------------ map toolbar ------------------------ */}
          <div className="map-toolbar">
            <button
              type="button"
              className="btn btn-outline btn-sm sheet-trigger"
              onClick={() => setSheetOpen(true)}
            >
              <FiFilter size={14} /> Filters
              {activeCount > 0 && <span className="badge">{activeCount}</span>}
            </button>

            <label htmlFor="m-city" className="sr-only">
              Jump to city
            </label>
            <select
              id="m-city"
              value={filters.city}
              onChange={(e) => {
                set('city', e.target.value)
                if (e.target.value) set('centre', CITY_CENTRES[e.target.value] || null)
              }}
            >
              <option value="">Search all cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label htmlFor="m-radius" className="sr-only">
              Radius
            </label>
            <select
              id="m-radius"
              value={filters.radiusKm}
              onChange={(e) => set('radiusKm', e.target.value)}
              disabled={!filters.centre}
            >
              <option value="">No radius</option>
              {RADII.map((r) => (
                <option key={r} value={r}>
                  Within {r} km
                </option>
              ))}
            </select>

            <button type="button" className="btn btn-outline btn-sm" onClick={useMyLocation}>
              <FiCrosshair size={14} /> Near me
            </button>

            <button
              type="button"
              className={`btn btn-sm ${showPois ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setShowPois((v) => !v)}
            >
              <FiMapPin size={14} /> Nearby places
            </button>

            {filters.centre && (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  set('centre', null)
                  set('radiusKm', '')
                }}
              >
                <FiX size={14} /> Clear pin
              </button>
            )}

            <Link to="/properties" className="btn btn-outline btn-sm" style={{ marginLeft: 'auto' }}>
              <FiList size={14} /> List view
            </Link>
          </div>

          <p className="map-help">
            {filters.centre
              ? `Searching ${filters.radiusKm ? `within ${filters.radiusKm} km of` : 'around'} your pin — click the map to move it.`
              : 'Click anywhere on the map to drop a search pin.'}
          </p>

          {/* --------------------------- layout -------------------------- */}
          <div className="map-layout">
            <div
              className={`filters-backdrop ${sheetOpen ? 'show' : ''}`}
              onClick={() => setSheetOpen(false)}
              role="presentation"
            />

            <div className="map-results">
              <h4>
                {results.length} {results.length === 1 ? 'match' : 'matches'}
              </h4>

              {results.length === 0 && (
                <p className="muted" style={{ fontSize: 'var(--fs-sm)' }}>
                  Nothing inside this area. Widen the radius or clear a filter.
                </p>
              )}

              <ul>
                {results.map((p) => (
                  <li
                    key={p.id}
                    className={activeId === p.id ? 'on' : ''}
                    onMouseEnter={() => setActiveId(p.id)}
                    onFocus={() => setActiveId(p.id)}
                  >
                    <Link to={`/properties/${p.slug}`}>
                      <SmartImage src={p.images[0]} alt="" />
                      <div>
                        <b>{p.title}</b>
                        <span>
                          <FiMapPin size={11} /> {shortAddress(p.address)}
                        </span>
                        <em>
                          {shortINR(p.price)}
                          {p.priceUnit ? `/${p.priceUnit}` : ''} · {p.beds > 0 ? `${p.beds} BHK · ` : ''}
                          {p.area} sq.ft.
                          {filters.centre &&
                            ` · ${formatDistance(distanceKm(filters.centre, p.coords))} away`}
                        </em>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="map-canvas">
              <PropertyMap
                properties={results}
                places={places}
                centre={filters.centre}
                radiusKm={Number(filters.radiusKm) || 0}
                activeId={activeId}
                onMarkerClick={(p) => setActiveId(p.id)}
                onMapClick={dropPin}
                height="100%"
              />
            </div>
          </div>

          {showPois && places.length > 0 && (
            <div className="map-legend">
              {[...new Set(places.map((p) => p.type))].map((t) => (
                <span key={t}>
                  <i className={`t-${t}`} /> {placeTypes[t]?.label || t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* filter panel lives outside the flow on phones, as a sheet */}
      <div className="map-filter-host">
        <FilterPanel
          filters={filters}
          set={set}
          reset={reset}
          activeCount={activeCount}
          resultCount={results.length}
          onSave={() => setSheetOpen(false)}
          onClose={() => setSheetOpen(false)}
          isSheet={sheetOpen}
        />
      </div>

      <section className="section section--tint" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="map-stats">
            <div>
              <b>{properties.length}</b>
              <span>Listings plotted</span>
            </div>
            <div>
              <b>{cities.length}</b>
              <span>Cities covered</span>
            </div>
            <div>
              <b>{Object.keys(placeTypes).length}</b>
              <span>POI categories</span>
            </div>
            <div>
              <b>OSM</b>
              <span>Open map data</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
