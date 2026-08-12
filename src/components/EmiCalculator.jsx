import { useMemo, useState } from 'react'
import { calcEMI, formatINR, shortINR } from '../utils/format'

export default function EmiCalculator({ price }) {
  const [downPct, setDownPct] = useState(20)
  const [years, setYears] = useState(20)
  const [rate, setRate] = useState(8.6)

  const { emi, loan, totalInterest, totalPayable } = useMemo(() => {
    const l = price * (1 - downPct / 100)
    const e = calcEMI(l, rate, years)
    const total = e * years * 12
    return { emi: e, loan: l, totalInterest: total - l, totalPayable: total }
  }, [price, downPct, years, rate])

  // Donut proportions for the principal / interest split.
  const principalShare = loan / (loan + totalInterest)
  const circumference = 2 * Math.PI * 42

  return (
    <div className="emi">
      <div className="emi-controls">
        <label htmlFor="emi-dp">
          Down payment <b>{downPct}%</b> · {shortINR(Math.round(price * (downPct / 100)))}
        </label>
        <input
          id="emi-dp"
          type="range"
          min={10}
          max={60}
          step={5}
          value={downPct}
          onChange={(e) => setDownPct(Number(e.target.value))}
        />

        <label htmlFor="emi-yr">
          Tenure <b>{years} years</b>
        </label>
        <input
          id="emi-yr"
          type="range"
          min={5}
          max={30}
          step={1}
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
        />

        <label htmlFor="emi-rate">
          Interest rate <b>{rate.toFixed(1)}% p.a.</b>
        </label>
        <input
          id="emi-rate"
          type="range"
          min={7}
          max={12}
          step={0.1}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
      </div>

      <div className="emi-result">
        <svg viewBox="0 0 100 100" className="emi-donut" aria-hidden="true">
          <circle cx="50" cy="50" r="42" className="track" />
          <circle
            cx="50"
            cy="50"
            r="42"
            className="value"
            strokeDasharray={`${principalShare * circumference} ${circumference}`}
          />
        </svg>

        <div className="emi-figure">
          <span>Monthly EMI</span>
          <b>{formatINR(Math.round(emi))}</b>
        </div>
      </div>

      <ul className="emi-rows">
        <li>
          <span>
            <i className="dot principal" /> Principal
          </span>
          <b>{shortINR(Math.round(loan))}</b>
        </li>
        <li>
          <span>
            <i className="dot interest" /> Total interest
          </span>
          <b>{shortINR(Math.round(totalInterest))}</b>
        </li>
        <li>
          <span>Total payable</span>
          <b>{shortINR(Math.round(totalPayable))}</b>
        </li>
      </ul>

      <p className="emi-note">
        Indicative only. Your actual rate depends on credit profile, lender and loan-to-value.
      </p>
    </div>
  )
}
