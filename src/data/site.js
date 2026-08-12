// Central company / contact information used across the whole site.

export const company = {
  name: 'Estatica Realty',
  tagline: 'Find the address of your happiness',
  founded: 2009,
  rera: 'RERA Reg. No. P52100051287',
  description:
    'Estatica Realty is a full-service real estate firm handling residential and commercial sales, leasing, project marketing, property management and investment advisory across Western and Southern India.',
  phone: '+91 98220 45611',
  phoneAlt: '+91 20 4901 7788',
  email: 'hello@estaticarealty.in',
  salesEmail: 'sales@estaticarealty.in',
  hours: 'Mon – Sat · 9:30 AM to 7:00 PM',
  socials: [
    { label: 'Facebook', icon: 'facebook', href: 'https://facebook.com' },
    { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com' },
    { label: 'YouTube', icon: 'youtube', href: 'https://youtube.com' },
  ],
}

export const offices = [
  {
    id: 'pune',
    city: 'Pune',
    label: 'Head Office',
    line1: '4th Floor, Meridian Business Bay',
    line2: 'Baner–Pashan Link Road, Baner',
    area: 'Pune, Maharashtra 411045',
    phone: '+91 20 4901 7788',
    email: 'pune@estaticarealty.in',
    hours: 'Mon – Sat · 9:30 AM – 7:00 PM',
    mapQuery: 'Baner Pashan Link Road, Baner, Pune, Maharashtra 411045',
  },
  {
    id: 'mumbai',
    city: 'Mumbai',
    label: 'Western Region',
    line1: 'Unit 1102, Trade Link Tower',
    line2: 'Linking Road, Bandra West',
    area: 'Mumbai, Maharashtra 400050',
    phone: '+91 22 6742 3300',
    email: 'mumbai@estaticarealty.in',
    hours: 'Mon – Sat · 10:00 AM – 7:30 PM',
    mapQuery: 'Linking Road, Bandra West, Mumbai, Maharashtra 400050',
  },
  {
    id: 'bengaluru',
    city: 'Bengaluru',
    label: 'Southern Region',
    line1: 'Prestige Atrium, 3rd Floor',
    line2: '80 Feet Road, Koramangala 4th Block',
    area: 'Bengaluru, Karnataka 560034',
    phone: '+91 80 4711 9020',
    email: 'blr@estaticarealty.in',
    hours: 'Mon – Sat · 9:00 AM – 6:30 PM',
    mapQuery: '80 Feet Road, Koramangala 4th Block, Bengaluru, Karnataka 560034',
  },
]

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'Map Search', to: '/map-search' },
  { label: 'Projects', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'Agents', to: '/agents' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export const stats = [
  { value: 2400, suffix: '+', label: 'Properties sold' },
  { value: 18, suffix: 'k+', label: 'Happy families' },
  { value: 42, suffix: '', label: 'Projects delivered' },
  { value: 16, suffix: ' yrs', label: 'In the market' },
]
