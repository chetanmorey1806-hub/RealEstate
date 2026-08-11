import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiFilter, FiGrid, FiList, FiRotateCcw, FiSearch } from 'react-icons/fi'
import PropertyCard from '../components/PropertyCard'
import { CtaBand, PageHero } from '../components/common'
import { cities, properties, propertyTypes } from '../data/properties'
import { shortINR } from '../utils/format'
import useReveal from '../hooks/useReveal'

const PER_PAGE = 6
const MAX_BUDGET = 70000000

const bedOptions = ['1', '2', '3', '4', '5+']

export default function Properties() {
  const [params, setParams] = useSearchParams()

  const [q, setQ] = useState(params.get('q') || '')
  const [city, setCity] = useState(params.get('city') || '')
  const [type, setType] = useState(params.get('type') || '')
  const [status, setStatus] = useState(params.get('status') || '')
  const [beds, setBeds] = useState(params.get('beds') || '')
  const [maxPrice, setMaxPrice] = useState(() => {
    const budget = params.get('budget')
    if (!budget) return MAX_BUDGET
    const high = Number(budget.split('-')[1])
    return Number.isFinite(high) ? Math.min(high, MAX_BUDGET) : MAX_BUDGET
  })
  const [minPrice, setMinPrice] = useState(() => {
    const budget = params.get('budget')
    if (!budget) return 0
    const low = Number(budget.split('-')[0])
    return Number.isFinite(low) ? low : 0
  })
  const [sort, setSort] = useState('newest')
  const [view, setView] = useState('grid')
  const [page, setPage] = useState(1)

  // Keep the address bar in step with the filters so results stay shareable.
  useEffect(() => {
    const next = new URLSearchParams()
    if (q) next.set('q', q)
    if (city) next.set('city', city)
    if (type) next.set('type', type)
    if (status) next.set('status', status)
    if (beds) next.set('beds', beds)
    if (minPrice > 0 || maxPrice < MAX_BUDGET) next.set('budget', `${minPrice}-${maxPrice}`)
    setParams(next, { replace: true })
    setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, city, type, status, beds, minPrice, maxPrice])

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()

    const filtered = properties.filter((p) => {
      if (city && p.address.city !== city) return false
      if (type && p.type !== type) return false
      if (status && p.status !== status) return false
      if (beds) {
        if (beds === '5+' ? p.beds < 5 : p.beds !== Number(beds)) return false
      }
      // Rentals are monthly figures, so the sale-price slider must not hide them.
      if (!p.priceUnit && (p.price < minPrice || p.price > maxPrice)) return false
      if (needle) {
        const haystack = [
          p.title,
          p.type,
          p.address.line,
          p.address.locality,
          p.address.city,
          p.address.pin,
          p.description,
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(needle)) return false
      }
      return true
    })

    const sorted = [...filtered]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'area-desc') sorted.sort((a, b) => b.area - a.area)
    if (sort === 'newest') sorted.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn))
    return sorted
  }, [q, city, type, status, beds, minPrice, maxPrice, sort])

  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE))
  const current = results.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  useReveal([current.map((p) => p.id).join(','), view])

  const reset = () => {
    setQ('')
    setCity('')
    setType('')
    setStatus('')
    setBeds('')
    setMinPrice(0)
    setMaxPrice(MAX_BUDGET)
  }

  return (
    <>
      <PageHero
        title="Properties for sale and rent"
        text="Twelve verified listings across Pune, Mumbai, Bengaluru, Lonavala and Goa — apartments, villas, plots, offices and retail."
        crumbs={[{ label: 'Properties' }]}
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="section">
        <div className="container listing-layout">
          <aside className="filters">
            <h4>
              <FiFilter size={16} /> Filter results
            </h4>

            <div className="filter-group">
              <label htmlFor="f-q">Keyword</label>
              <input
                id="f-q"
                type="text"
                placeholder="Locality, project, pincode…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <span className="filter-label">Listing type</span>
              <div className="pill-row">
                {['', 'For Sale', 'For Rent'].map((s) => (
                  <button
                    key={s || 'all'}
                    type="button"
                    className={`pill ${status === s ? 'on' : ''}`}
                    onClick={() => setStatus(s)}
                  >
                    {s || 'All'}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="f-city">City</label>
              <select id="f-city" value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">All cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="f-type">Property type</label>
              <select id="f-type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">All types</option>
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <span className="filter-label">Bedrooms</span>
              <div className="pill-row">
                <button
                  type="button"
                  className={`pill ${beds === '' ? 'on' : ''}`}
                  onClick={() => setBeds('')}
                >
                  Any
                </button>
                {bedOptions.map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={`pill ${beds === b ? 'on' : ''}`}
                    onClick={() => setBeds(b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="f-price">Maximum sale price</label>
              <input
                id="f-price"
                type="range"
                min={0}
                max={MAX_BUDGET}
                step={500000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="range-out">
                <span>{shortINR(minPrice)}</span>
                <span>{maxPrice >= MAX_BUDGET ? 'Any' : shortINR(maxPrice)}</span>
              </div>
            </div>

            <button type="button" className="btn btn-outline btn-block" onClick={reset}>
              <FiRotateCcw size={15} /> Reset filters
            </button>
          </aside>

          <div>
            <div className="listing-toolbar">
              <span className="count">
                Showing <b>{current.length}</b> of <b>{results.length}</b> properties
              </span>
              <div className="toolbar-right">
                <label htmlFor="sort" className="sr-only">
                  Sort by
                </label>
                <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="newest">Newest first</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="area-desc">Largest area</option>
                </select>
                <div className="view-toggle">
                  <button
                    type="button"
                    className={view === 'grid' ? 'on' : ''}
                    onClick={() => setView('grid')}
                    aria-label="Grid view"
                  >
                    <FiGrid size={16} />
                  </button>
                  <button
                    type="button"
                    className={view === 'list' ? 'on' : ''}
                    onClick={() => setView('list')}
                    aria-label="List view"
                  >
                    <FiList size={16} />
                  </button>
                </div>
              </div>
            </div>

            {current.length === 0 ? (
              <div className="empty-state">
                <FiSearch size={38} />
                <h3>No properties match those filters</h3>
                <p>Try widening the budget or clearing the locality.</p>
                <button type="button" className="btn btn-primary" onClick={reset}>
                  Reset filters
                </button>
              </div>
            ) : (
              <div className={`listing-grid ${view === 'list' ? 'list-view' : ''}`}>
                {current.map((p, i) => (
                  <div className="reveal" key={p.id} style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                    <PropertyCard property={p} view={view} />
                  </div>
                ))}
              </div>
            )}

            {pages > 1 && (
              <div className="pagination">
                <button type="button" onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Prev
                </button>
                {Array.from({ length: pages }, (_, n) => (
                  <button
                    key={n}
                    type="button"
                    className={page === n + 1 ? 'active' : ''}
                    onClick={() => setPage(n + 1)}
                  >
                    {n + 1}
                  </button>
                ))}
                <button type="button" onClick={() => setPage(page + 1)} disabled={page === pages}>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CtaBand
            title="Cannot find it here? We have off-market inventory too."
            text="Roughly a third of what we transact never reaches a portal. Tell us the brief and we will check what is quietly available."
          />
        </div>
      </section>
    </>
  )
}
