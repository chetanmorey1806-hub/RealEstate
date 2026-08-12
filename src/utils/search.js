// The search engine: one pure function that turns a filter object into a
// ranked result list. Shared by the listings page and the map search page.

import { properties } from '../data/properties'
import { distanceKm } from './geo'

export const emptyFilters = {
  q: '',
  city: '',
  locality: '',
  pin: '',
  type: '',
  status: '',
  minPrice: '',
  maxPrice: '',
  minArea: '',
  maxArea: '',
  beds: '',
  baths: '',
  furnishing: '',
  parking: '',
  amenities: [],
  constructionStatus: '',
  possessionBy: '',
  maxAge: '',
  reraOnly: false,
  verifiedOnly: false,
  listedBy: '',
  // map-search only
  centre: null,
  radiusKm: '',
}

export const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'latest', label: 'Latest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'area-desc', label: 'Area: largest first' },
  { value: 'area-asc', label: 'Area: smallest first' },
  { value: 'popularity', label: 'Most popular' },
]

const num = (v) => (v === '' || v == null ? null : Number(v))

/** Counts how many filters the user has actually set. */
export function countActive(f) {
  let n = 0
  for (const [key, value] of Object.entries(f)) {
    if (key === 'centre') continue
    if (Array.isArray(value)) n += value.length ? 1 : 0
    else if (typeof value === 'boolean') n += value ? 1 : 0
    else if (value !== '' && value != null) n += 1
  }
  return n
}

/**
 * Relevance score. Only meaningful when a keyword is present — an exact
 * locality or pin hit should outrank a passing mention in the description.
 */
function relevance(p, needle) {
  if (!needle) return p.views / 1000 + (p.verified ? 1 : 0)
  let score = 0
  const n = needle.toLowerCase()
  if (p.title.toLowerCase().includes(n)) score += 10
  if (p.address.locality.toLowerCase().includes(n)) score += 8
  if (p.address.city.toLowerCase().includes(n)) score += 6
  if (p.address.pin.includes(n)) score += 6
  if (p.type.toLowerCase().includes(n)) score += 4
  if (p.address.line.toLowerCase().includes(n)) score += 3
  if (p.description.toLowerCase().includes(n)) score += 1
  if (p.amenities.some((a) => a.toLowerCase().includes(n))) score += 1
  if (p.verified) score += 1
  return score
}

export function searchProperties(filters, sort = 'relevance', list = properties) {
  const f = { ...emptyFilters, ...filters }
  const needle = f.q.trim().toLowerCase()

  const minPrice = num(f.minPrice)
  const maxPrice = num(f.maxPrice)
  const minArea = num(f.minArea)
  const maxArea = num(f.maxArea)
  const maxAge = num(f.maxAge)
  const radiusKm = num(f.radiusKm)

  const matched = list.filter((p) => {
    if (f.city && p.address.city !== f.city) return false
    if (f.locality && p.address.locality !== f.locality) return false
    if (f.pin && !p.address.pin.startsWith(f.pin.trim())) return false
    if (f.type && p.type !== f.type) return false
    if (f.status && p.status !== f.status) return false

    // Sale prices and monthly rents live on different scales, so a price
    // range only applies within the matching listing kind.
    if (minPrice != null || maxPrice != null) {
      const isRent = Boolean(p.priceUnit)
      const wantsRent = f.status === 'For Rent'
      if (isRent === wantsRent || f.status === '') {
        if (minPrice != null && p.price < minPrice) return false
        if (maxPrice != null && p.price > maxPrice) return false
      }
    }

    if (minArea != null && p.area < minArea) return false
    if (maxArea != null && p.area > maxArea) return false

    if (f.beds) {
      const want = f.beds === '5+' ? 5 : Number(f.beds)
      if (f.beds === '5+' ? p.beds < 5 : p.beds !== want) return false
    }
    if (f.baths) {
      const want = f.baths === '4+' ? 4 : Number(f.baths)
      if (f.baths === '4+' ? p.baths < 4 : p.baths !== want) return false
    }

    if (f.furnishing && p.furnishing !== f.furnishing) return false
    if (f.parking === 'yes' && p.parking < 1) return false
    if (f.parking === 'no' && p.parking > 0) return false
    if (f.parking && /^\d\+$/.test(f.parking) && p.parking < Number(f.parking)) return false

    if (f.amenities.length && !f.amenities.every((a) => p.amenities.includes(a))) return false

    if (f.constructionStatus && p.constructionStatus !== f.constructionStatus) return false
    if (f.possessionBy && new Date(p.possessionDate) > new Date(f.possessionBy)) return false
    if (maxAge != null && p.ageYears > maxAge) return false

    if (f.reraOnly && !p.rera.approved) return false
    if (f.verifiedOnly && !p.verified) return false
    if (f.listedBy && p.listedBy !== f.listedBy) return false

    if (f.centre && radiusKm != null && radiusKm > 0) {
      if (distanceKm(f.centre, p.coords) > radiusKm) return false
    }

    if (needle) {
      const haystack = [
        p.title,
        p.type,
        p.address.line,
        p.address.locality,
        p.address.city,
        p.address.pin,
        p.description,
        ...p.amenities,
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(needle)) return false
    }

    return true
  })

  const sorted = [...matched]
  switch (sort) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'area-desc':
      sorted.sort((a, b) => b.area - a.area)
      break
    case 'area-asc':
      sorted.sort((a, b) => a.area - b.area)
      break
    case 'popularity':
      sorted.sort((a, b) => b.views - a.views)
      break
    case 'latest':
      sorted.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn))
      break
    default:
      sorted.sort((a, b) => relevance(b, needle) - relevance(a, needle))
  }

  return sorted
}

/* ------------------------- URL <-> filter state ------------------------- */

export function filtersToParams(f, sort) {
  const p = new URLSearchParams()
  for (const [key, value] of Object.entries(f)) {
    if (key === 'centre') {
      if (value) p.set('centre', `${value.lat.toFixed(5)},${value.lng.toFixed(5)}`)
      continue
    }
    if (Array.isArray(value)) {
      if (value.length) p.set(key, value.join('|'))
    } else if (typeof value === 'boolean') {
      if (value) p.set(key, '1')
    } else if (value !== '' && value != null) {
      p.set(key, String(value))
    }
  }
  if (sort && sort !== 'relevance') p.set('sort', sort)
  return p
}

export function paramsToFilters(params) {
  const f = { ...emptyFilters }
  for (const key of Object.keys(emptyFilters)) {
    const raw = params.get(key)
    if (raw == null) continue
    if (key === 'centre') {
      const [lat, lng] = raw.split(',').map(Number)
      if (Number.isFinite(lat) && Number.isFinite(lng)) f.centre = { lat, lng }
    } else if (Array.isArray(emptyFilters[key])) {
      f[key] = raw.split('|').filter(Boolean)
    } else if (typeof emptyFilters[key] === 'boolean') {
      f[key] = raw === '1'
    } else {
      f[key] = raw
    }
  }
  return f
}
