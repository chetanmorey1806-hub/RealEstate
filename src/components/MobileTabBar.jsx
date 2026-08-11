import { NavLink, useLocation } from 'react-router-dom'
import { FiGrid, FiHome, FiPhone, FiSearch, FiUsers } from 'react-icons/fi'
import { company } from '../data/site'

const tabs = [
  { to: '/', label: 'Home', icon: FiHome, end: true },
  { to: '/properties', label: 'Search', icon: FiSearch },
  { to: '/projects', label: 'Projects', icon: FiGrid },
  { to: '/agents', label: 'Agents', icon: FiUsers },
]

/** App-style bottom navigation, phones only. */
export default function MobileTabBar() {
  const { pathname } = useLocation()

  return (
    <nav className="tabbar" aria-label="Quick navigation">
      {tabs.map((t) => {
        const active = t.end ? pathname === t.to : pathname.startsWith(t.to)
        return (
          <NavLink key={t.to} to={t.to} end={t.end} className={active ? 'active' : ''}>
            <span className="tab-ico">
              <t.icon size={19} />
            </span>
            <span className="tab-label">{t.label}</span>
          </NavLink>
        )
      })}

      <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="tab-call">
        <span className="tab-ico">
          <FiPhone size={19} />
        </span>
        <span className="tab-label">Call</span>
      </a>
    </nav>
  )
}
