// Geospatial helpers — distances, bounds and map deep links.

const R = 6371 // mean earth radius, km
const toRad = (deg) => (deg * Math.PI) / 180

/** Great-circle distance between two {lat,lng} points, in kilometres. */
export function distanceKm(a, b) {
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)

  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.sqrt(h))
}

export const formatDistance = (km) =>
  km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(km < 10 ? 1 : 0)} km`

/** Rough driving time at an average city speed of 24 km/h. */
export const driveTime = (km) => {
  const mins = Math.max(1, Math.round((km / 24) * 60))
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  return `${h} h ${mins % 60} min`
}

/** Attaches computed distance to each place and sorts nearest first. */
export function withDistances(origin, places) {
  return places
    .map((pl) => ({ ...pl, km: distanceKm(origin, pl) }))
    .sort((a, b) => a.km - b.km)
}

/** Bounding box for a set of {lat,lng}, padded so markers aren't on the edge. */
export function boundsOf(points, pad = 0.01) {
  if (!points.length) return null
  const lats = points.map((p) => p.lat)
  const lngs = points.map((p) => p.lng)
  return [
    [Math.min(...lats) - pad, Math.min(...lngs) - pad],
    [Math.max(...lats) + pad, Math.max(...lngs) + pad],
  ]
}

export const googleMapsLink = ({ lat, lng }, label = '') =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}${
    label ? `&query_place_id=${encodeURIComponent(label)}` : ''
  }`

export const directionsLink = ({ lat, lng }) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
