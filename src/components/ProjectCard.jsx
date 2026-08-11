import { Link } from 'react-router-dom'
import { FiArrowRight, FiMapPin } from 'react-icons/fi'
import { FaBuilding, FaLayerGroup } from 'react-icons/fa6'
import SmartImage from './SmartImage'
import { shortINR } from '../utils/format'

const stageChip = {
  'Ready to move': 'chip-brand',
  'Under construction': 'chip-gold',
  'New launch': 'chip',
}

export default function ProjectCard({ project }) {
  return (
    <article className="pj-card">
      <SmartImage src={project.images[0]} alt={project.name} />

      <div className="pj-card-body">
        <span className={`chip ${stageChip[project.stage] || 'chip'}`} style={{ marginBottom: 14 }}>
          {project.stage}
        </span>
        <h3>{project.name}</h3>
        <p>
          <FiMapPin size={13} /> {project.address.locality}, {project.address.city} ·{' '}
          {project.configuration}
        </p>

        {project.completion < 100 && (
          <>
            <div className="progress" aria-hidden="true">
              <i style={{ width: `${project.completion}%` }} />
            </div>
            <p style={{ fontSize: '0.78rem', marginBottom: 10 }}>
              {project.completion}% complete · possession {project.possession}
            </p>
          </>
        )}

        <div className="pj-meta">
          <span>
            <FaBuilding size={13} /> {project.units} units
          </span>
          <span>
            <FaLayerGroup size={13} /> {project.sizeRange}
          </span>
          <span>Starts {shortINR(project.priceFrom)}</span>
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="btn btn-ghost-light btn-sm"
          style={{ marginTop: 18 }}
        >
          View project <FiArrowRight size={15} />
        </Link>
      </div>
    </article>
  )
}
