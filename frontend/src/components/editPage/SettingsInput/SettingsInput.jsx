import { useEffect, useRef, useState } from 'react'
import { useCantWriteAnimation } from '../../../hooks/useCantWriteAnimation'
import './settingsInput.css'

export function SettingsInput ({ value, action }) {
  const [text, setText] = useState(value)
  const { animation, triggerAnimation } = useCantWriteAnimation()
  const inputRef = useRef()
  const focusing = useRef(false)

  useEffect(() => {
    setText(
      !focusing.current
        ? `${value}s`
        : value
    )
  }, [value])

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Enter' && focusing.current) inputRef.current.blur()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleChange = e => {
    const { value } = e.target

    if (value.length > 2) {
      triggerAnimation()
      return
    }
    const newValue = Number(value)
    if (isNaN(newValue)) return

    setText(newValue)
  }

  const handleFocus = () => {
    setText(t => t.replace('s', ''))
    focusing.current = true
  }

  const handleBlur = () => {
    setText(value + 's')
    focusing.current = false

    if (text < 3) {
      triggerAnimation()
      action(3)
    } else if
    (text > 30) {
      triggerAnimation()
      action(30)
    } else {
      action(text)
    }
  }

  return (
    <input
      type='text'
      className='settings-input'
      value={text}
      ref={inputRef}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{ animation }}
    />
  )
}
