// Builds a self-contained HTML brochure in the browser and downloads it.
// No server round-trip, and it opens/prints straight to PDF from any browser.

import { builders } from '../data/properties'
import { company } from '../data/site'
import { formatDate, formatINR, formatNumber, fullAddress, shortINR } from './format'

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

export function buildBrochureHtml(property, agent) {
  const builder = builders[property.builder]
  const rows = [
    ['Property type', property.type],
    ['Listing', property.status],
    ['Configuration', property.beds > 0 ? `${property.beds} BHK` : property.type],
    ['Super built-up area', `${formatNumber(property.area)} sq.ft.`],
    ['Built-up area', `${formatNumber(property.builtUpArea)} sq.ft.`],
    ['Carpet area', `${formatNumber(property.carpetArea)} sq.ft.`],
    ['Bathrooms', property.baths || '—'],
    ['Balconies', property.balconies || '—'],
    ['Parking', `${property.parking || 'None'} (${property.parkingType})`],
    ['Floor', property.floor],
    ['Facing', property.facing],
    ['Furnishing', property.furnishing],
    ['Construction status', property.constructionStatus],
    ['Possession', property.possession],
    ['Age', property.age],
    ['RERA', property.rera.approved ? property.rera.number : 'Not registered'],
    ['Listed by', property.listedBy],
    ['Listing ID', property.id.toUpperCase()],
    ['Posted on', formatDate(property.postedOn)],
  ]

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<title>${esc(property.title)} — ${esc(company.name)}</title>
<style>
  @page { margin: 16mm; }
  body { font: 13px/1.6 -apple-system, "Segoe UI", Roboto, sans-serif; color: #1c2b40; margin: 0; padding: 28px; }
  h1 { font-size: 24px; margin: 0 0 4px; }
  h2 { font-size: 15px; margin: 26px 0 10px; padding-bottom: 6px; border-bottom: 2px solid #0f6f5c; color: #0f6f5c; }
  .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; border-bottom: 3px solid #0f6f5c; padding-bottom: 14px; }
  .brand { font-size: 18px; font-weight: 800; color: #0f6f5c; }
  .price { font-size: 22px; font-weight: 800; color: #0f6f5c; white-space: nowrap; }
  .muted { color: #6b7a8d; }
  img.hero { width: 100%; height: 260px; object-fit: cover; border-radius: 10px; margin: 16px 0; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 7px 0; border-bottom: 1px dashed #dde3ea; vertical-align: top; }
  td:last-child { text-align: right; font-weight: 600; }
  ul { padding-left: 18px; margin: 0; }
  li { margin-bottom: 3px; }
  .cols { display: flex; gap: 28px; }
  .cols > * { flex: 1; }
  footer { margin-top: 28px; padding-top: 12px; border-top: 1px solid #dde3ea; font-size: 11px; color: #6b7a8d; }
</style></head>
<body>
  <div class="head">
    <div>
      <div class="brand">${esc(company.name)}</div>
      <div class="muted">${esc(company.tagline)} · ${esc(company.rera)}</div>
    </div>
    <div class="price">${esc(shortINR(property.price))}${property.priceUnit ? ` / ${esc(property.priceUnit)}` : ''}</div>
  </div>

  <h1>${esc(property.title)}</h1>
  <div class="muted">${esc(fullAddress(property.address))}</div>
  <img class="hero" src="${esc(property.images[0])}" alt="" />

  <h2>About this property</h2>
  <p>${esc(property.description)}</p>

  <div class="cols">
    <div>
      <h2>Specifications</h2>
      <table>${rows.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</table>
    </div>
    <div>
      <h2>Amenities</h2>
      <ul>${property.amenities.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>

      <h2>Price</h2>
      <table>
        <tr><td>${property.priceUnit ? 'Monthly rent' : 'Agreement value'}</td><td>${esc(formatINR(property.price))}</td></tr>
        ${property.deposit ? `<tr><td>Security deposit</td><td>${esc(formatINR(property.deposit))}</td></tr>` : ''}
        ${property.pricePerSqft ? `<tr><td>Rate per sq.ft.</td><td>${esc(formatINR(property.pricePerSqft))}</td></tr>` : ''}
      </table>
    </div>
  </div>

  <h2>Developer</h2>
  <p><b>${esc(builder?.name || '—')}</b><br />${esc(builder?.about || '')}</p>

  <h2>Your consultant</h2>
  <p><b>${esc(agent?.name || '—')}</b> — ${esc(agent?.role || '')}<br />
     ${esc(agent?.phone || company.phone)} · ${esc(agent?.email || company.email)}</p>

  <footer>
    Generated from ${esc(company.name)} on ${esc(formatDate(new Date().toISOString()))}.
    Figures are indicative and subject to change. Verify all documents before transacting.
  </footer>
</body></html>`
}

export function downloadBrochure(property, agent) {
  const html = buildBrochureHtml(property, agent)
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${property.slug}-brochure.html`
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Revoke on the next tick so the download has definitely started.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
