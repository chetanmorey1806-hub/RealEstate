import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  FiBookmark,
  FiFilter,
  FiGrid,
  FiHeart,
  FiList,
  FiMap,
  FiSearch,
  FiTrash2,
  FiX,
} from 'react-icons/fi'
import PropertyCard from '../components/PropertyCard'
import FilterPanel from '../components/FilterPanel'
import { CtaBand, PageHero } from '../components/common'
import {
  countActive,
  emptyFilters,
  filtersToParams,
  paramsToFilters,
  searchProperties,
  sortOptions,
} from '../utils/search'
import useReveal from '../hooks/useReveal'
import useBodyLock from '../hooks/useBodyLock'
import useSavedSearches from '../hooks/useSavedSearches'
import useWishlist from '../hooks/useWishlist'
import useFocusTrap from '../hooks/useFocusTrap'
import { useToast } from '../components/toast-context'

const PER_PAGE = 6

export default function Properties() {
  const [params, setParams] = useSearchParams()

  const [filters, setFilters] = useState(() => paramsToFilters(params))
  const [sort, setSort] = useState(() => params.get('sort') || 'relevance')
  const [view, setView] = useState('grid')
  const [page, setPage] = useState(1)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [onlySaved, setOnlySaved] = useState(false)

  const saved = useSavedSearches()
  const wishlist = useWishlist()
  const { toast } = useToast()

  useBodyLock(sheetOpen)
  const sheetRef = useFocusTrap(sheetOpen, { onEscape: () => setSheetOpen(false) })

  const set = useCallback((key, value) => {
    setFilters((f) => ({ ...f, [key]: value }))
    setPage(1)
  }, [])

  const reset = useCallback(() => {
    setFilters(emptyFilters)
    setPage(1)
    toast('All filters cleared', { type: 'info' })
  }, [toast])

  // Mirror state into the URL so any result set is shareable and bookmarkable.
  useEffect(() => {
    setParams(filtersToParams(filters, sort), { replace: true })
  }, [filters, sort, setParams])

  const results = useMemo(() => {
    const found = searchProperties(filters, sort)
    return onlySaved ? found.filter((p) => wishlist.has(p.id)) : found
  }, [filters, sort, onlySaved, wishlist])

  const activeCount = countActive(filters)
  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE))
  const currentPage = Math.min(page, pages)
  const current = results.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  useReveal([current.map((p) => p.id).join(','), view])

  const handleSave = () => {
    const label =
      [filters.locality || filters.city, filters.type, filters.beds && `${filters.beds} BHK`]
        .filter(Boolean)
        .join(' · ') || 'All properties'
    saved.save(label, filters, sort)
    toast(`Search saved as “${label}”`, { type: 'success' })
  }

  const applySaved = (entry) => {
    const p = new URLSearchParams(entry.query)
    setFilters(paramsToFilters(p))
    setSort(p.get('sort') || 'relevance')
    setPage(1)
  }

  return (
    <>
      <PageHero
        title="Find your property"
        text="Twelve verified listings across five cities. Filter on twenty-plus criteria — location, budget, area, rooms, amenities, construction status, RERA and who is selling."
        crumbs={[{ label: 'Properties' }]}
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="section">
        <div className="container listing-layout">
          <div
            className={`filters-backdrop ${sheetOpen ? 'show' : ''}`}
            onClick={() => setSheetOpen(false)}
            role="presentation"
          />

          <div>
            <FilterPanel
              panelRef={sheetRef}
              filters={filters}
              set={set}
              reset={reset}
              activeCount={activeCount}
              resultCount={results.length}
              onSave={handleSave}
              onClose={() => setSheetOpen(false)}
              isSheet={sheetOpen}
            />

            {saved.items.length > 0 && (
              <div className="saved-box">
                <h4>
                  <FiBookmark size={15} /> Saved searches
                </h4>
                <ul>
                  {saved.items.map((s) => (
                    <li key={s.id}>
                      <button type="button" onClick={() => applySaved(s)}>
                        {s.name}
                      </button>
                      <button
                        type="button"
                        className="saved-del"
                        onClick={() => saved.remove(s.id)}
                        aria-label={`Delete saved search ${s.name}`}
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            {/* Announced politely so a screen reader hears the new count
                without the focus jumping. */}
            <p className="sr-only" role="status" aria-live="polite">
              {results.length} properties match your filters
            </p>

            <div className="listing-toolbar">
              <span className="count">
                <b>{results.length}</b> {results.length === 1 ? 'property' : 'properties'}
                {activeCount > 0 && ` · ${activeCount} filter${activeCount > 1 ? 's' : ''}`}
              </span>

              <div className="toolbar-right">
                <button
                  type="button"
                  className="btn btn-outline btn-sm sheet-trigger"
                  onClick={() => setSheetOpen(true)}
                >
                  <FiFilter size={14} /> Filters
                  {activeCount > 0 && <span className="badge">{activeCount}</span>}
                </button>

                <Link
                  to={`/map-search?${filtersToParams(filters, sort).toString()}`}
                  className="btn btn-outline btn-sm"
                >
                  <FiMap size={14} /> Map
                </Link>

                <button
                  type="button"
                  className={`btn btn-sm ${onlySaved ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setOnlySaved((v) => !v)}
                >
                  <FiHeart size={14} fill={onlySaved ? 'currentColor' : 'none'} />
                  {wishlist.count > 0 && <span className="badge">{wishlist.count}</span>}
                </button>

                <label htmlFor="sort" className="sr-only">
                  Sort by
                </label>
                <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
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

            {activeCount > 0 && (
              <div className="chip-row" role="group" aria-label="Active filters">
                {Object.entries(filters).map(([key, value]) => {
                  if (key === 'centre' || !value || (Array.isArray(value) && !value.length)) {
                    return null
                  }
                  const labels = Array.isArray(value) ? value : [value === true ? key : value]
                  return labels.map((label) => (
                    <button
                      key={`${key}-${label}`}
                      type="button"
                      className="chip chip-soft"
                      onClick={() =>
                        set(
                          key,
                          Array.isArray(value)
                            ? value.filter((v) => v !== label)
                            : emptyFilters[key],
                        )
                      }
                    >
                      {String(label)} <FiX size={12} />
                    </button>
                  ))
                })}
                <button type="button" className="chip chip-outline" onClick={reset}>
                  Clear all
                </button>
              </div>
            )}

            {current.length === 0 ? (
              <div className="empty-state">
                <FiSearch size={36} />
                <h3>{onlySaved ? 'Nothing shortlisted yet' : 'No properties match those filters'}</h3>
                <p>
                  {onlySaved
                    ? 'Tap the heart on any listing to add it to your shortlist.'
                    : 'Try widening the budget, clearing the locality, or dropping an amenity.'}
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onlySaved ? () => setOnlySaved(false) : reset}
                >
                  {onlySaved ? 'Back to all properties' : 'Clear all filters'}
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
                <button
                  type="button"
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {Array.from({ length: pages }, (_, n) => (
                  <button
                    key={n}
                    type="button"
                    className={currentPage === n + 1 ? 'active' : ''}
                    onClick={() => setPage(n + 1)}
                  >
                    {n + 1}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage === pages}
                >
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
