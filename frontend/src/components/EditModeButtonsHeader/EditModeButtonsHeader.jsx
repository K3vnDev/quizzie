import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play as PlayIcon } from '../../icons/Play.jsx'
import { Share as ShareIcon } from '../../icons/Share.jsx'
import { Settings as SettingsIcon } from '../../icons/Settings.jsx'
import { CloudSaved as CloudSavedIcon } from '../../icons/CloudSaved.jsx'
import { CloudUpload as CloudUploadIcon } from '../../icons/CloudUpload.jsx'
import { CloudError as CloudErrorIcon } from '../../icons/CloudError.jsx'
import { Check as CheckIcon } from '../../icons/Check.jsx'
import { useCooldown } from '../../hooks/useCooldown.js'
import { useStore } from '../../store/useStore.js'
import { AppLogo } from '../AppLogo/AppLogo.jsx'
import { LoadingArrows } from '../LoadingArrows/LoadingArrows.jsx'
import './editModeButtonsHeader.css'

export function EditModeButtonsHeader () {
  const [disabledButtons, setDisabledButtons] = useState(false)

  return (
    <header className='edit-mode-header'>
      <section>
        <AppLogo
          disabledButtons={disabledButtons}
        />
        <CloudInfo />
      </section>

      <section>
        <ShareButton
          disabledButtons={disabledButtons}
        />
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

const CloudInfo = () => {
  const cloudState = useStore(state => state.cloudState)

  const icon = {
    uploading: <LoadingArrows />,
    'not saved': <CloudUploadIcon />,
    saved: <CloudSavedIcon />,
    error: <CloudErrorIcon />
  }

  return (
    <div className='cloud-info'>
      {icon[cloudState]}
    </div>
  )
}

const ShareButton = ({ disabledButtons }) => {
  const { id } = useStore(state => state.quiz)
  const [animation, setAnimation] = useState('none')
  const animationTime = 2.5

  const toggleMessageClassName = useCooldown({
    action: () => setAnimation(`copied-message-appear ${animationTime}s ease both`),
    reset: () => setAnimation('none'),
    cooldown: animationTime * 1000
  })
  const token = window.localStorage.getItem('token')

  const handleClick = () => {
    const quizUrl = `${window.location.host}/play?q=${id}`
    navigator.clipboard.writeText(quizUrl)
    toggleMessageClassName()
  }

  return token
    ? (
      <>
        <button
          className='quiz-share-btn'
          style={{ '--bg-color': '#343434' }}
          disabled={disabledButtons || animation !== 'none'}
          onClick={handleClick}
        >
          {
            animation === 'none'
              ? <ShareIcon />
              : <CheckIcon />
          }
        </button>
        <div
          className='quiz-url-copied-message'
          style={{ animation }}
        >
          Url copied to clipboard!
        </div>
      </>
      )
    : <></>
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
