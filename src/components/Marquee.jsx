import { FaHouseChimney } from 'react-icons/fa6'

const words = [
  'Apartments',
  'Villas',
  'Penthouses',
  'Plots',
  'Office Space',
  'Retail Shops',
  'Farmhouses',
  'Second Homes',
  'Rentals',
  'Investments',
]

/** Infinite scrolling word band. The list is duplicated so the -50%
 *  translate loops without a visible seam. */
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {words.map((w) => (
              <span key={w}>
                {w}
                <FaHouseChimney size={13} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
