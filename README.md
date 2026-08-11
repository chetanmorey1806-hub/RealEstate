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
- **Indian number formatting** — `₹4.25 Cr` / `₹89.50 L` short forms plus a working EMI calculator.
- `SmartImage` shows a shimmer while loading and falls back to a gradient panel if a remote
  image ever fails.

### Typography

A fluid scale (`--fs-2xs` … `--fs-4xl` in `base.css`) drives every size through `clamp()`, so
type shrinks with the viewport rather than snapping at breakpoints. The display face is
**Fraunces**, loaded as a variable font and driven through its `SOFT` and `WONK` axes — the
`WONK` axis swaps in the alternate glyphs that give the headings their character, dialled up
further on hero accents and pull quotes. Body copy is **Plus Jakarta Sans**. Inputs are pinned
to a 16px minimum so iOS Safari never zooms on focus.

### Animated navigation

- Header **retracts on scroll-down and returns on scroll-up**, shrinking as it goes.
- **Scroll-progress bar** across the bottom edge of the header.
- **Morphing hamburger** — three bars rotate into an X on a spring curve.
- **Drawer** with numbered links that cascade in on staggered delays; the header rides above it
  so the X stays tappable, and the panel lives inside a clipped layer so its parked position
  never widens the page.

### Mobile

- **App-style bottom tab bar** (Home / Search / Projects / Agents / Call) with an active pill.
- **Swipeable snap rails** — card grids become horizontal carousels on phones instead of endless
  vertical stacks, with a "swipe for more" hint.
- **Filters as a bottom sheet** with a grab handle, active-filter count badge and a "Show N
  properties" confirm; the tab bar drops away while it is open.
- **Sticky action bar** on property pages carrying the price plus Call and WhatsApp.
- Compact card layout (icon beside text), 3-up spec grids, two-up stat and footer columns,
  sideways-scrolling filter pills, and the top strip hidden in favour of the tab bar.
- Verified at 1440 / 768 / 390 / 320px: **no horizontal scroll, no console errors**.

### Motion

Scroll reveals in three flavours (rise, sideways, zoom — sideways falls back to vertical on
narrow screens), count-up statistics, an infinite marquee band, button light-sweeps, spring
easing on taps, a page-transition fade keyed to the route, and a floating badge. All of it is
switched off under `prefers-reduced-motion`.

## Structure

```
src/
├── components/     Navbar, Footer, MobileTabBar, HeroSlider, Gallery, Marquee,
│                   TestimonialSlider, PropertyCard, ProjectCard, SearchPanel,
│                   SmartImage, common.jsx (SectionHead, PageHero, CtaBand,
│                   Counter, FaqList, ScrollToTop, BackToTop), icons.js
├── data/           site.js (company, offices, nav, stats)
│                   properties.js (12 listings)
│                   projects.js (6 projects)
│                   content.js (services, agents, testimonials, blog, FAQs,
│                   process, localities, milestones)
├── hooks/          useReveal.js, useBodyLock.js
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
