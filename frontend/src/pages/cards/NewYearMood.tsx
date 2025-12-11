import React, { useEffect, useState } from 'react'
import './new-year.css'

const NewYearMood: React.FC<{ enabled?: boolean; celebrate?: number }> = ({
  enabled = true,
  celebrate,
}) => {
  const [show, setShow] = useState(enabled)
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    setShow(enabled)
  }, [enabled])

  useEffect(() => {
    if (celebrate !== undefined) {
      setBurst(true)
      const t = setTimeout(() => setBurst(false), 1200)
      return () => clearTimeout(t)
    }
    return
  }, [celebrate])

  if (!show) return null

  return (
    <div className="new-year-wrapper" aria-hidden="true">
      <div className="new-year-banner">
        <h2>🎉 Happy New Year! 🎉</h2>
        <p className="new-year-sub">
          Wishing you an inspiring year of learning and growth.
        </p>
      </div>

      {/* snow flakes */}
      <div className="snow-container">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className={`flake flake-${i % 8}`}></div>
        ))}
      </div>

      {/* confetti */}
      <div className="confetti-container">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className={`confetti confetti-${i % 6}`}></div>
        ))}
      </div>

      {/* burst confetti */}
      {burst && (
        <div className="burst-confetti-container">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className={`burst burst-${i % 8}`}></div>
          ))}
        </div>
      )}
    </div>
  )
}

export default NewYearMood
