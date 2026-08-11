// Indian-format currency and number helpers.

export const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)

/** 42500000 -> "₹4.25 Cr", 195000 -> "₹1.95 L" */
export const shortINR = (n) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`
  if (n >= 100000) return `₹${(n / 100000).toFixed(2).replace(/\.00$/, '')} L`
  return formatINR(n)
}

export const formatNumber = (n) => new Intl.NumberFormat('en-IN').format(n)

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

export const fullAddress = (a) =>
  [a.line, a.locality, `${a.city} ${a.pin}`, a.state].filter(Boolean).join(', ')

export const shortAddress = (a) => `${a.locality}, ${a.city}`

/** Google Maps embed URL — works without an API key. */
export const mapEmbed = (query) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`

/** Equated monthly instalment. rate is the annual percentage. */
export const calcEMI = (principal, annualRate, years) => {
  const r = annualRate / 12 / 100
  const n = years * 12
  if (r === 0) return principal / n
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}
