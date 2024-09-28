import { useEffect, useRef, useState } from 'react'
import './settingsRange.css'
import { useStore } from '../../../store/useStore'

export function SettingsRange({ value, action }) {
  const isDisplayingQuizSettings = useStore(state => state.isDisplayingQuizSettings)
  const [rangeWidth, setRangeWidth] = useState(null)
  const rangeRef = useRef(null)

  useEffect(() => {
    if (rangeRef.current) setRangeWidth(rangeRef.current.offsetWidth)
  }, [rangeRef.current, isDisplayingQuizSettings])

  const handleChange = e => {
    const { value } = e.target
    action(Number(value))
  }

  const percentage = (value - 3) / 27

  return (
    <div className='settings-range-wrapper' ref={rangeRef}>
      <input type='range' value={value} onChange={handleChange} max={30} min={3} />
      <div className='settings-range-visual' style={{ '--progress': percentage }}>
        <div className='handler' style={{ '--range-width': `${rangeWidth}px` }} />
      </div>
    </div>
  )
}
