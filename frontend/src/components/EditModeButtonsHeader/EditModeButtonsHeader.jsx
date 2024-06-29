import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play as PlayIcon } from '../../icons/Play.jsx'
import { Settings as SettingsIcon } from '../../icons/Settings.jsx'
import { useStore } from '../../store/useStore.js'
const { VITE_API_URL: API_URL } = import.meta.env

export function EditModeButtonsHeader () {
  const [disabledButtons, setDisabledButtons] = useState(false)

  return (
    <header className='edit-mode-header'>
      <section>
        <AppLogo
          disabledButtons={disabledButtons}
        />
      </section>
      <section>
        <SettingsButton
          disabledButtons={disabledButtons}
        />
        <PlayButton
          disabledButtons={disabledButtons}
          setDisabledButtons={setDisabledButtons}
        />
      </section>
    </header>
  )
}

const AppLogo = ({ disabledButtons }) => {
  const handleClick = async () => {
    const token = window.localStorage.getItem('token')
    const res = await fetch(`${API_URL}/user/quizzes`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <button
      className='app-logo'
      disabled={disabledButtons}
      onClick={handleClick}
    />
  )
}

const SettingsButton = ({ disabledButtons }) => {
  return (
    <button
      className='quiz-settings-btn'
      disabled={disabledButtons}
      style={{ '--bg-color': '#343434' }}
    >
      <SettingsIcon />
    </button>
  )
}

const PlayButton = ({ disabledButtons, setDisabledButtons }) => {
  const navigate = useNavigate()
  const timeoutRef = useRef()
  const setTransitioning = useStore(state => state.setTransitioning)

  const handleClick = () => {
    setDisabledButtons(true)
    setTransitioning(true)
    timeoutRef.current = setTimeout(() => {
      navigate('/play')
    }, 1000)
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <button
      className='quiz-play-btn'
      onClick={handleClick}
      disabled={disabledButtons}
      style={{ '--bg-color': '#0647ED' }}
    >
      <PlayIcon />
    </button>
  )
}
