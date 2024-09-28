import { Check as CheckIcon } from '../../../icons/Check'
import './settingsCheckbox.css'

export function SettingsCheckbox({ value, action }) {
  const handleClick = e => {
    e.stopPropagation()
    action(!value)
  }

  return (
    <button className='settings-checkbox' onClick={handleClick}>
      {value && <CheckIcon />}
    </button>
  )
}
