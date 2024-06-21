import { useStore } from '../../store/useStore.js'
import usePlayMode from '../../hooks/usePlayMode.js'
import { useEffect } from 'react'
import ProgressMessage from '../ProgressMessage/ProgressMessage.jsx'
import PlayQuestionBox from '../PlayQuestionBox/PlayQuestionBox.jsx'
import TimeBar from '../TimeBar/TimeBar.jsx'
import QuestionAnswerMessage from '../QuestionAnswerMessage/QuestionAnswerMessage.jsx'

export default function PlayMode () {
  const {
    questionName, progress, currentQuestion,
    setResponse, answerTime, timeBarWaitTime, timeBarPaused
  } = usePlayMode()

  const setTransitioning = useStore(state => state.setTransitioning)
  const transitioning = useStore(state => state.transitioning)
  const isUnloadingPlayMode = useStore(state => state.isUnloadingPlayMode)

  useEffect(() => {
    setTransitioning(true)
    const timeOutId = setTimeout(() => {
      setTransitioning(false)
    }, 3000)
    return () => clearTimeout(timeOutId)
  }, [])

  if (transitioning) {
    return (
      <section className='text-section'>
        <h2>{questionName}</h2>
      </section>
    )
  }

  return (
    <>
      <section
        className='text-section'
        style={
        isUnloadingPlayMode
          ? { opacity: 0, translate: '0 -20px' }
          : {}
      }
      >
        <h2>{questionName}</h2>
        <ProgressMessage progress={progress} />
      </section>
      <PlayQuestionBox
        question={currentQuestion}
        setResponse={setResponse}
      />
      <TimeBar
        time={answerTime}
        wait={timeBarWaitTime}
        paused={timeBarPaused}
      />
      <QuestionAnswerMessage />
    </>
  )
}
