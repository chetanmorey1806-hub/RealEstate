import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { cities, propertyTypes } from '../data/properties'

const budgets = [
  { label: 'Any budget', value: '' },
  { label: 'Under ₹1 Cr', value: '0-10000000' },
  { label: '₹1 Cr – ₹2.5 Cr', value: '10000000-25000000' },
  { label: '₹2.5 Cr – ₹5 Cr', value: '25000000-50000000' },
  { label: 'Above ₹5 Cr', value: '50000000-999999999' },
]

/** The overlapping search card that sits under the hero. */
export default function SearchPanel() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('For Sale')
  const [city, setCity] = useState('')
  const [type, setType] = useState('')
  const [budget, setBudget] = useState('')
  const [q, setQ] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (status) params.set('status', status)
    if (city) params.set('city', city)
    if (type) params.set('type', type)
    if (budget) params.set('budget', budget)
    if (q.trim()) params.set('q', q.trim())
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <div className="container">
      <div className="search-panel">
        <div className="search-tabs" role="tablist" aria-label="Listing type">
          {['For Sale', 'For Rent'].map((s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={status === s}
              className={status === s ? 'active' : ''}
              onClick={() => setStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <form className="search-row" onSubmit={submit}>
          <div className="search-cell">
            <label htmlFor="s-q">Keyword</label>
            <input
              id="s-q"
              type="text"
              placeholder="Project, locality…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="search-cell">
            <label htmlFor="s-city">City</label>
            <select id="s-city" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">All cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="search-cell">
            <label htmlFor="s-type">Property type</label>
            <select id="s-type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All types</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="search-cell">
            <label htmlFor="s-budget">Budget</label>
            <select id="s-budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
              {budgets.map((b) => (
                <option key={b.label} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            <FiSearch size={17} /> Search
          </button>
        </form>
      </div>
    </div>
  )
}
