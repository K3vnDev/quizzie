import { useEffect, useRef, useState } from 'react'
import { useCooldown } from '../../../hooks/useCooldown.js'
import { useTransition } from '../../../hooks/useTransition.js'
import { Check as CheckIcon } from '../../../icons/Check.jsx'
import { CloudError as CloudErrorIcon } from '../../../icons/CloudError.jsx'
import { CloudSaved as CloudSavedIcon } from '../../../icons/CloudSaved.jsx'
import { CloudUpload as CloudUploadIcon } from '../../../icons/CloudUpload.jsx'
import { Play as PlayIcon } from '../../../icons/Play.jsx'
import { Settings as SettingsIcon } from '../../../icons/Settings.jsx'
import { Share as ShareIcon } from '../../../icons/Share.jsx'
import { useStore } from '../../../store/useStore.js'
import { AppLogo } from '../../root/AppLogo/AppLogo.jsx'
import { LoadingArrows } from '../../root/LoadingArrows/LoadingArrows.jsx'
import { LoginAnchor } from '../../root/LoginAnchor/LoginAnchor.jsx'
import './editModeButtonsHeader.css'

export function EditModeButtonsHeader() {
  const token = window.localStorage.getItem('token')

  return (
    <header className='edit-mode-header'>
      <section>
        <AppLogo />
        {token ? <CloudInfo /> : <LoginAnchor />}
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

  return <div className='cloud-info'>{icon[cloudState]}</div>
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

  return token ? (
    <>
      <button
        className='quiz-share-btn'
        style={{ '--bg-color': '#222' }}
        disabled={transitioning || animation !== 'none'}
        onClick={handleClick}
      >
        <div className='quiz-url-copied-message' style={{ animation }}>
          Url copied to clipboard!
        </div>
        {animation === 'none' ? <ShareIcon /> : <CheckIcon />}
      </button>
    </>
  ) : (
    <></>
  )
}

const SettingsButton = () => {
  const transitioning = useStore(state => state.transitioning)
  const setIsDisplayingQuizSettings = useStore(state => state.setIsDisplayingQuizSettings)

  const handleClick = () => {
    setIsDisplayingQuizSettings(true)
  }

  return (
    <button
      className='quiz-settings-btn'
      disabled={transitioning}
      style={{ '--bg-color': '#343434' }}
      onClick={handleClick}
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
