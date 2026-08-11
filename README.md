# Estatica Realty — Real Estate Website

A complete multi-page real estate website built with **React 19 + Vite 8**, covering every
topic a property firm needs: listings, projects, services, agents, guides, offices and
enquiry flows.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

## Pages

| Route | What's on it |
| --- | --- |
| `/` | Hero image slider, search panel, services, featured listings, why-us, animated stats, projects, localities, process, testimonial slider, FAQ, CTA |
| `/properties` | 12 listings with live filters (keyword, city, type, bedrooms, price slider), sorting, grid/list toggle, pagination, empty state — filter state is mirrored into the URL so results are shareable |
| `/properties/:slug` | Image gallery with thumbnails, spec grid, full description, fact table, amenities, Google map, agent enquiry form, EMI calculator, similar properties |
| `/projects` | Six developer mandates filterable by construction stage |
| `/projects/:slug` | Gallery, highlights, amenities, RERA facts, construction progress, payment plan, map, units on sale |
| `/services` | Eight services in depth, process, fee table, FAQ (deep-linkable via `/services#buying`) |
| `/agents` | Six consultants with specialities, languages, deal counts and contact actions |
| `/about` | Story, stats, 2009→2025 timeline, commitments, all three offices, testimonials |
| `/blog` + `/blog/:slug` | Six long-form articles with category filter and share links |
| `/contact` | Validated enquiry form, office switcher with live Google map, quick-contact cards, FAQ |
| `*` | 404 page |

## Features

- **Image sliders** — the hero (autoplay, Ken Burns, dots + arrows, pause on hover), the
  property/project gallery (thumbnails, arrows, keyboard ←/→) and the testimonial slider.
- **Icons** throughout via `react-icons` (Feather + Font Awesome 6).
- **Real addresses** — every property, project and office carries a full street address with
  locality, city, state, pincode and landmark, rendered into an embedded Google map.
- **Theme toggle** — light/dark, persisted in `localStorage`.
- **Responsive** — 1440px down to 390px with a slide-in mobile drawer; no horizontal overflow.
- **Scroll reveals** and count-up statistics via `IntersectionObserver`, all disabled under
  `prefers-reduced-motion`.
- **Indian number formatting** — `₹4.25 Cr` / `₹89.50 L` short forms plus a working EMI calculator.
- `SmartImage` shows a shimmer while loading and falls back to a gradient panel if a remote
  image ever fails.

## Structure

```
src/
├── components/     Navbar, Footer, HeroSlider, Gallery, TestimonialSlider,
│                   PropertyCard, ProjectCard, SearchPanel, SmartImage,
│                   common.jsx (SectionHead, PageHero, CtaBand, Counter, FaqList,
│                   ScrollToTop, BackToTop), icons.js
├── data/           site.js (company, offices, nav, stats)
│                   properties.js (12 listings)
│                   projects.js (6 projects)
│                   content.js (services, agents, testimonials, blog, FAQs,
│                   process, localities, milestones)
├── hooks/          useReveal.js
├── pages/          Home, Properties, PropertyDetail, Projects, ProjectDetail,
│                   Services, Agents, About, Blog, BlogDetail, Contact, NotFound
├── styles/         base.css (tokens, reset, layout, buttons, forms)
│                   components.css
│                   pages.css
└── utils/          format.js (currency, dates, addresses, map embeds, EMI)
```

## Notes

Photography is hotlinked from Unsplash and portraits are stock images — swap the URLs in
`src/data/` for your own assets before going live. All content (company, RERA numbers,
listings, people) is illustrative sample data. Forms are front-end only; wire the submit
handlers in `Contact.jsx`, `PropertyDetail.jsx` and `Footer.jsx` to your backend or a form
service.
