import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileTabBar from './components/MobileTabBar'
import { ToastProvider } from './components/Toast'
import { SkeletonPage } from './components/Skeleton'
import { BackToTop } from './components/common'
import Home from './pages/Home'

// Every route below the fold is code-split; only the home page ships in the
// initial bundle. Leaflet in particular stays out until a map is needed.
const Properties = lazy(() => import('./pages/Properties'))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'))
const MapSearch = lazy(() => import('./pages/MapSearch'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Services = lazy(() => import('./pages/Services'))
const Agents = lazy(() => import('./pages/Agents'))
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const TITLES = {
  '/': 'Home',
  '/properties': 'Properties',
  '/map-search': 'Map search',
  '/projects': 'Projects',
  '/services': 'Services',
  '/agents': 'Agents',
  '/about': 'About',
  '/blog': 'Blog',
  '/contact': 'Contact',
}

/**
 * On every route change: scroll to top, move focus to the main region so
 * keyboard and screen-reader users start at the new content rather than
 * wherever the old page left them, and announce the change politely.
 */
function RouteChange({ mainRef }) {
  const { pathname } = useLocation()
  const [announcement, setAnnouncement] = useState('')
  // Comparing paths (rather than a "first render" flag) keeps this correct
  // under StrictMode, which invokes effects twice on mount — a flag would be
  // flipped by the first pass and let the second steal focus on page load.
  const prevPath = useRef(pathname)

  useEffect(() => {
    window.scrollTo(0, 0)

    if (prevPath.current === pathname) return
    prevPath.current = pathname

    const label = TITLES[pathname] || pathname.split('/').filter(Boolean).join(' ') || 'Page'
    document.title = `${label} — Estatica Realty`
    setAnnouncement(`${label} page loaded`)
    mainRef.current?.focus()
  }, [pathname, mainRef])

  return (
    <p className="sr-only" role="status" aria-live="polite">
      {announcement}
    </p>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('estatica-theme') || 'light')
  const location = useLocation()
  const mainRef = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('estatica-theme', theme)
  }, [theme])

  return (
    <ToastProvider>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <RouteChange mainRef={mainRef} />

      <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />

      {/* tabIndex -1 makes the region programmatically focusable on navigation
          without adding it to the tab order. */}
      <main id="main" ref={mainRef} tabIndex={-1} className="page-enter" key={location.pathname}>
        <Suspense fallback={<SkeletonPage />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:slug" element={<PropertyDetail />} />
            <Route path="/map-search" element={<MapSearch />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
      <MobileTabBar />
    </ToastProvider>
  )
}
