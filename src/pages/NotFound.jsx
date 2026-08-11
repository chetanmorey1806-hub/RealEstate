import { Link } from 'react-router-dom'
import { FiArrowLeft, FiSearch } from 'react-icons/fi'

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container">
        <div className="big">404</div>
        <h1>That address does not exist</h1>
        <p style={{ maxWidth: 460, marginInline: 'auto' }}>
          The page you were looking for has moved or was never here. Try the listings — there are
          twelve verified properties waiting.
        </p>
        <div className="row wrap gap-12" style={{ justifyContent: 'center', marginTop: 26 }}>
          <Link to="/" className="btn btn-primary">
            <FiArrowLeft size={16} /> Back home
          </Link>
          <Link to="/properties" className="btn btn-outline">
            <FiSearch size={16} /> Browse properties
          </Link>
        </div>
      </div>
    </section>
  )
}
