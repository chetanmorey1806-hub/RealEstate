import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileTabBar from './components/MobileTabBar'
import { BackToTop, ScrollToTop } from './components/common'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Services from './pages/Services'
import Agents from './pages/Agents'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('estatica-theme') || 'light')
  const location = useLocation()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('estatica-theme', theme)
  }, [theme])

  return (
    <>
      <ScrollToTop />
      <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />

      {/* Keying on the path replays the entrance animation on every route. */}
      <main className="page-enter" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
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
      </main>

      <Footer />
      <BackToTop />
      <MobileTabBar />
    </>
  )
}
