import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { shortINR } from '../utils/format'
import { boundsOf } from '../utils/geo'

/**
 * Interactive map built on Leaflet + OpenStreetMap tiles — no API key needed.
 * Handles a single property, a whole result set, nearby POIs and a draggable
 * search radius depending on which props are supplied.
 */

const poiColour = {
  school: '#3b82f6',
  hospital: '#e0484c',
  restaurant: '#d98324',
  mall: '#8b5cf6',
  metro: '#0f6f5c',
  bus: '#0891b2',
  airport: '#475569',
  park: '#2f8f5b',
}

const poiGlyph = {
  school: '🎓',
  hospital: '🏥',
  restaurant: '🍽',
  mall: '🛍',
  metro: '🚇',
  bus: '🚌',
  airport: '✈',
  park: '🌳',
}

const priceIcon = (property, active) =>
  L.divIcon({
    className: '',
    html: `<span class="map-pin ${active ? 'active' : ''}">${shortINR(property.price)}${
      property.priceUnit ? '<i>/mo</i>' : ''
    }</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })

const poiIcon = (type) =>
  L.divIcon({
    className: '',
    html: `<span class="map-poi" style="--poi:${poiColour[type] || '#64748b'}">${
      poiGlyph[type] || '•'
    }</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })

export default function PropertyMap({
  properties = [],
  places = [],
  centre,
  radiusKm,
  activeId,
  zoom = 13,
  height = 420,
  onMarkerClick,
  onMapClick,
  fit = true,
  className = '',
}) {
  const holder = useRef(null)
  const map = useRef(null)
  const propLayer = useRef(null)
  const poiLayer = useRef(null)
  const circle = useRef(null)
  const markers = useRef(new Map())
  const clickRef = useRef(onMapClick)
  const activeIdRef = useRef(activeId)

  clickRef.current = onMapClick
  activeIdRef.current = activeId

  // Create the map once; everything else updates in place.
  useEffect(() => {
    if (map.current || !holder.current) return undefined

    const m = L.map(holder.current, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    }).setView([20.5937, 78.9629], 5)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(m)

    // Scroll-wheel zoom only after a deliberate click, so the page still
    // scrolls normally when the cursor passes over the map.
    m.on('click', (e) => {
      m.scrollWheelZoom.enable()
      clickRef.current?.({ lat: e.latlng.lat, lng: e.latlng.lng })
    })
    m.on('mouseout', () => m.scrollWheelZoom.disable())

    propLayer.current = L.layerGroup().addTo(m)
    poiLayer.current = L.layerGroup().addTo(m)
    map.current = m

    return () => {
      m.remove()
      map.current = null
    }
  }, [])

  // Property markers. Rebuilt only when the result set itself changes —
  // highlighting is handled separately so an open popup survives.
  useEffect(() => {
    const m = map.current
    if (!m || !propLayer.current) return
    propLayer.current.clearLayers()
    markers.current.clear()

    properties.forEach((p) => {
      const marker = L.marker([p.coords.lat, p.coords.lng], {
        icon: priceIcon(p, p.id === activeIdRef.current),
        riseOnHover: true,
      })
      markers.current.set(p.id, { marker, property: p })
      marker.bindPopup(
        `<div class="map-popup">
           <img src="${p.images[0]}" alt="" loading="lazy" />
           <div>
             <b>${p.title}</b>
             <span>${p.address.locality}, ${p.address.city}</span>
             <em>${shortINR(p.price)}${p.priceUnit ? ` / ${p.priceUnit}` : ''} · ${p.area} sq.ft.</em>
             <a href="/properties/${p.slug}">View details</a>
           </div>
         </div>`,
        { maxWidth: 260 },
      )
      // Without this the map's own click handler also fires and drops a
      // search pin, which re-renders the layer and closes the popup.
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e)
        onMarkerClick?.(p)
      })
      marker.addTo(propLayer.current)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties])

  // Highlight the active marker by swapping its icon in place.
  useEffect(() => {
    markers.current.forEach(({ marker, property }, id) => {
      marker.setIcon(priceIcon(property, id === activeId))
    })
  }, [activeId])

  // Nearby POI markers
  useEffect(() => {
    const m = map.current
    if (!m || !poiLayer.current) return
    poiLayer.current.clearLayers()

    places.forEach((pl) => {
      L.marker([pl.lat, pl.lng], { icon: poiIcon(pl.type) })
        .bindPopup(`<b>${pl.name}</b>`)
        .addTo(poiLayer.current)
    })
  }, [places])

  // Search radius
  useEffect(() => {
    const m = map.current
    if (!m) return
    if (circle.current) {
      circle.current.remove()
      circle.current = null
    }
    if (centre && radiusKm > 0) {
      circle.current = L.circle([centre.lat, centre.lng], {
        radius: radiusKm * 1000,
        color: '#0f6f5c',
        weight: 1.5,
        fillColor: '#0f6f5c',
        fillOpacity: 0.08,
      }).addTo(m)
    }
  }, [centre, radiusKm])

  // Viewport. Kept in a ref so a later resize can re-apply the same view —
  // Leaflet measures the container on creation, and a fitBounds computed
  // before the final layout would otherwise leave markers off-screen.
  const applyView = useRef(() => {})

  useEffect(() => {
    const m = map.current
    if (!m) return

    applyView.current = () => {
      const points = [
        ...properties.map((p) => p.coords),
        ...places.map((pl) => ({ lat: pl.lat, lng: pl.lng })),
      ]

      if (centre && radiusKm > 0 && circle.current) {
        m.fitBounds(circle.current.getBounds(), { padding: [30, 30] })
      } else if (fit && points.length > 1) {
        const b = boundsOf(points)
        if (b) m.fitBounds(b, { padding: [34, 34], maxZoom: 15 })
      } else if (points.length === 1) {
        m.setView([points[0].lat, points[0].lng], zoom)
      } else if (centre) {
        m.setView([centre.lat, centre.lng], zoom)
      }
    }

    applyView.current()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties, places, centre, radiusKm, fit, zoom])

  useEffect(() => {
    const m = map.current
    if (!m || !holder.current) return undefined

    let first = true
    const ro = new ResizeObserver(() => {
      m.invalidateSize()
      // The first observation fires once the real size is known; re-fitting
      // then is what keeps every marker inside the visible area.
      if (first) {
        first = false
        applyView.current()
      }
    })
    ro.observe(holder.current)
    return () => ro.disconnect()
  }, [])

  return <div ref={holder} className={`leaflet-holder ${className}`} style={{ height }} />
}
