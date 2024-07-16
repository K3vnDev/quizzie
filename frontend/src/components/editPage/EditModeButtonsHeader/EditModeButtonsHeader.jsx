import { useEffect, useRef, useState } from 'react'
import { Play as PlayIcon } from '../../../icons/Play.jsx'
import { Share as ShareIcon } from '../../../icons/Share.jsx'
import { Settings as SettingsIcon } from '../../../icons/Settings.jsx'
import { CloudSaved as CloudSavedIcon } from '../../../icons/CloudSaved.jsx'
import { CloudUpload as CloudUploadIcon } from '../../../icons/CloudUpload.jsx'
import { CloudError as CloudErrorIcon } from '../../../icons/CloudError.jsx'
import { Check as CheckIcon } from '../../../icons/Check.jsx'
import { AppLogo } from '../../root/AppLogo/AppLogo.jsx'
import { LoginAnchor } from '../../root/LoginAnchor/LoginAnchor.jsx'
import { useStore } from '../../../store/useStore.js'
import { useCooldown } from '../../../hooks/useCooldown.js'
import { useTransition } from '../../../hooks/useTransition.js'
import { LoadingArrows } from '../../root/LoadingArrows/LoadingArrows.jsx'
import './editModeButtonsHeader.css'

export function EditModeButtonsHeader () {
  const token = window.localStorage.getItem('token')

  return (
    <header className='edit-mode-header'>
      <section>
        <AppLogo />
        {
          token
            ? <CloudInfo />
            : <LoginAnchor />
        }

      </section>

      <section>
        <ShareButton />
        <SettingsButton />
        <PlayButton />
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

const ShareButton = () => {
  const { id } = useStore(state => state.quiz)
  const transitioning = useStore(state => state.transitioning)
  const [animation, setAnimation] = useState('none')
  const animationTime = 2.5

  const [toggleMessageClassName] = useCooldown({
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
          style={{ '--bg-color': '#222' }}
          disabled={transitioning || animation !== 'none'}
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

const SettingsButton = () => {
  const transitioning = useStore(state => state.transitioning)

  return (
    <button
      className='quiz-settings-btn'
      disabled={transitioning}
      style={{ '--bg-color': '#343434' }}
    >
      <SettingsIcon />
    </button>
  )
}

const PlayButton = () => {
  const timeoutRef = useRef()
  const { makeTransition } = useTransition()
  const transitioning = useStore(state => state.transitioning)

  const handleClick = () => makeTransition('/play')

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <button
      className='quiz-play-btn'
      onClick={handleClick}
      disabled={transitioning}
      style={{ '--bg-color': '#0647ED' }}
    >
      <PlayIcon />
    </button>
  )
}
