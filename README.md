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
| `/properties` | 12 listings, 20+ filters, 7 sort modes, saved searches, wishlist, grid/list toggle, pagination — all filter state mirrored into the URL so results are shareable |
| `/map-search` | Map-based search: price markers, click-to-drop pin, radius filter, POI overlay, synced result list |
| `/properties/:slug` | Photos / 360° tour / video / floor plan tabs, overview, price breakdown, area analysis, amenities, map with nearby places, builder, RERA, EMI calculator, enquiry, visit booking, brochure, share, wishlist |
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

### Advanced search

`src/utils/search.js` is a single pure function — the listings page and the map page
both call it, so they can never disagree about what matches.

**Filters:** keyword · city · locality · PIN code · property type · buy/rent · min price ·
max price · min area · max area · bedrooms · bathrooms · furnishing · parking · amenities
(21, grouped, AND-matched) · construction status · possession-by date · property age ·
RERA approved · verified only · listed by (owner / agent / builder) · map radius.

**Sorting:** relevance (a weighted score — locality and PIN hits outrank a passing mention
in the description) · latest · price ↑ ↓ · area ↑ ↓ · popularity.

Filters combine freely, collapse into grouped accordions with per-group active counts,
appear as removable chips above the results, and serialise to the URL. **Clear filters**
resets everything; **Save search** stores the filter set in `localStorage` and re-runs it
on click. Prices are range-checked against sale or rent scales separately, so a ₹1 crore
ceiling never hides a ₹78,000/month rental.

### Property details

Media is tabbed — **photo gallery**, **360° tour**, **video**, **floor plan** — then
overview, price breakdown (agreement value, stamp duty, registration, GST, all-in),
area analysis with carpet/built-up/super built-up bars and the computed loading
percentage, amenities, location map, nearby places, builder profile, RERA banner,
construction and possession, EMI calculator, similar properties. Sidebar carries the
seller enquiry form, visit booking (date, slot, in-person or video), and the EMI panel.
Header actions: wishlist, share (Web Share API with clipboard fallback) and brochure.

The **floor plan** is drawn as SVG from each listing's own room count and carpet area —
the labelled room sizes add up to the advertised carpet area rather than being a stock
image. The **brochure** is generated in the browser as a self-contained HTML file and
downloaded; it opens and prints to PDF anywhere.

### Maps

Built on **Leaflet + OpenStreetMap** — no API key, no billing account, works offline of
any Google setup. Google Maps is still used for the "Directions" and "Open in Maps"
deep links, which need no key either.

- Price-labelled markers with photo popups, on the detail page and across search results
- **Map-based search**: click to drop a pin, pick a radius (2–50 km), results filter live
- **Nearby places** — schools, hospitals, restaurants, malls, metro, bus stops, airports,
  parks — colour-coded on the map and listed by distance
- **Distances are computed**, not typed: haversine from the listing's coordinates, with a
  drive-time estimate at an average city speed
- "Near me" uses the Geolocation API and falls back to a city centre if it is declined

Leaflet is code-split, so it only downloads on the two routes that need it.

**Known limitation:** markers overlap at country-level zoom where several listings sit in
one city. Zooming or filtering by city separates them; adding `leaflet.markercluster`
would solve it at any zoom.

### Skeleton loading

`Skeleton.jsx` provides `SkeletonCard`, `SkeletonGrid`, `SkeletonMap`, `SkeletonDetail` and
`SkeletonPage`. Each mirrors the real component's box model, so nothing shifts when the
content arrives. They serve as the Suspense fallback for every lazy route and for the map
chunk, and `SmartImage` shimmers per-image until each photo decodes.

### Micro-interactions

Pointer-positioned **ripples** on every button, pill and tab (one delegated listener, so it
covers controls rendered later); a **heart burst** with expanding rings when a property is
shortlisted; a **toast queue** confirming shortlist / save-search / clear-filters /
copy-link / brochure actions; spring easing on press; hover lift on cards; sweep highlight
across buttons; animated theme-icon swap.

### Page transitions

Navigation opts into the **View Transitions API** (`viewTransition` on nav links, tab bar
and property cards) for a real cross-fade where supported, with a keyed CSS entrance
animation as the universal fallback. Both are disabled under `prefers-reduced-motion`.

### Scroll animations

`IntersectionObserver` reveals in three flavours (rise, sideways, zoom), count-up statistics,
a scroll-progress bar in the header, an infinite marquee, and **scroll-linked parallax** on
page-hero imagery — read on scroll, written inside `requestAnimationFrame`, and applied only
to elements currently in view.

### Accessibility

- **Skip to main content** as the first tab stop, revealed on focus
- Route changes move focus to `<main>`, update `document.title`, and announce politely via
  an `aria-live` region
- **Focus trap** in the drawer and filter sheet: Tab cycles inside, Escape closes, focus
  returns to the trigger; closed panels are `inert`
- Result counts announced live; filter accordions expose `aria-expanded`/`aria-controls`
- Media tabs are a real `tablist` with **arrow-key navigation** and roving tabindex
- Labelled landmarks (`Primary`, `Menu`, `Quick navigation`), `aria-pressed` on toggles,
  `aria-current` on the active tab
- One tab stop per property card via a stretched link, not three
- Audited: **0 images without alt, 0 unnamed buttons, 0 unnamed links**
- Consistent 3px focus ring that switches to gold on dark surfaces
- `forced-colors` support and full `prefers-reduced-motion` opt-out

### Mobile-first

Everything above is built from the small screen up. Audited on a 390px touch viewport:
**no control under the 44×44px WCAG 2.2 target size**, every text input at 16px or more so
iOS never zooms on focus, `inputmode`/`autocomplete` hints on phone, PIN and name fields,
and safe-area insets on the drawer, tab bar and sheets.

### Performance

- **Route-level code splitting** — only the home page is in the initial bundle. Main chunk
  is 308 kB (99 kB gzip); individual routes are 1–34 kB, and Leaflet's 152 kB only loads on
  the two map routes.
- **Responsive images** — `SmartImage` rewrites the Unsplash `w` parameter into a `srcset`
  so the browser fetches a frame sized for the slot; below-fold images are `loading="lazy"`,
  and the hero is `fetchpriority="high"` with eager decoding.
- `content-visibility: auto` with `contain-intrinsic-size` on below-fold sections, so
  off-screen layout and paint are skipped without breaking the scrollbar.
- The keyword field is **debounced** (250ms) so typing does not re-run the search or rewrite
  the URL on every keystroke.
- `useWishlist` returns a memoised object — every card calls it, and an unstable identity
  would invalidate the listing page's `useMemo` on every render.
- Passive scroll listeners, `preconnect` to the font and image hosts, `font-display: swap`.

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
│                   FilterPanel, PropertyMap, NearbyPlaces, Tour360,
│                   VideoPlayer, FloorPlan, EmiCalculator, SmartImage,
│                   Skeleton, Toast, common.jsx, icons.js
├── data/           site.js (company, offices, nav, stats)
│                   properties.js (12 listings)
│                   projects.js (6 projects)
│                   content.js (services, agents, testimonials, blog, FAQs,
│                   process, localities, milestones)
│                   places.js (POIs per locality), amenities.js
├── hooks/          useReveal, useBodyLock, useLocalStore, useWishlist,
│                   useSavedSearches, useFocusTrap, useParallax,
│                   useRipple, useReducedMotion
├── pages/          Home, Properties, PropertyDetail, Projects, ProjectDetail,
│                   Services, Agents, About, Blog, BlogDetail, Contact, NotFound
├── styles/         base.css (tokens, reset, layout, buttons, forms)
│                   components.css
│                   pages.css
│                   search.css, ux.css
└── utils/          format.js (currency, dates, addresses, EMI)
                    search.js (filter + sort engine, URL serialisation)
                    geo.js (haversine, bounds, map links)
                    brochure.js (client-side HTML brochure)
```

## Notes

Photography is hotlinked from Unsplash and portraits are stock images — swap the URLs in
`src/data/` for your own assets before going live. The **360° tour** pans a wide photo;
drop in a true equirectangular capture and the same controls apply. The **video** section
ships with a clearly-labelled placeholder reel — set `video` on a listing to
`{ type: 'youtube', id: '...' }` or your own mp4 and it plays that instead. POI
coordinates are plausible offsets around each locality centre, not surveyed positions. All content (company, RERA numbers,
listings, people) is illustrative sample data. Forms are front-end only; wire the submit
handlers in `Contact.jsx`, `PropertyDetail.jsx` and `Footer.jsx` to your backend or a form
service.
