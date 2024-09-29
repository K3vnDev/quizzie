import { useEffect } from 'react'
import { usePlayMode } from '../../../hooks/usePlayMode.js'
import { useStore } from '../../../store/useStore.js'
import { AppLogo } from '../../root/AppLogo/AppLogo.jsx'
import { EditButton } from '../../root/EditButton/EditButton.jsx'
import { PlayQuestionBox } from '../PlayQuestionBox/PlayQuestionBox.jsx'
import { ProgressMessage } from '../ProgressMessage/ProgressMessage.jsx'
import { QuestionAnswerMessage } from '../QuestionAnswerMessage/QuestionAnswerMessage.jsx'
import { TimeBar } from '../TimeBar/TimeBar.jsx'

export function PlayMode() {
  const {
    quizName,
    progress,
    currentQuestion,
    setResponse,
    answerTime,
    timeBarWaitTime,
    timeBarPaused,
    nameAppearTime
  } = usePlayMode()

  const setTransitioning = useStore(state => state.setTransitioning)
  const transitioning = useStore(state => state.transitioning)
  const isUnloadingPlayMode = useStore(state => state.isUnloadingPlayMode)

  useEffect(() => {
    setTransitioning(true)
    const timeOutId = setTimeout(() => {
      setTransitioning(false)
    }, nameAppearTime * 1000)
    return () => clearTimeout(timeOutId)
  }, [])

  if (transitioning) {
    return (
      <section className='text-section'>
        <h2
          style={{
            animation: `quiz-name-appear ${nameAppearTime}s ease both`,
            userSelect: 'none'
          }}
        >
          {quizName}
        </h2>
      </section>
    )
  }

  return (
    <>
      <header className='header-buttons-wrapper'>
        <AppLogo />
        <EditButton onMenu={false} />
      </header>

      <section
        className='text-section'
        style={isUnloadingPlayMode ? { opacity: 0, translate: '0 -20px' } : {}}
      >
        <h2>{quizName}</h2>
        <ProgressMessage progress={progress} />
      </section>
      <PlayQuestionBox question={currentQuestion} setResponse={setResponse} />
      <TimeBar time={answerTime} wait={timeBarWaitTime} paused={timeBarPaused} />
      <QuestionAnswerMessage />
    </>
  )
}
