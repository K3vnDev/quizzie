import '../../../index.css'
import './playPage.css'
import { useStore } from '../../../store/useStore.js'
import { PlayMode } from '../PlayMode/PlayMode.jsx'
import { QuizResults } from '../QuizResults/QuizResults.jsx'
import { useRouteClassName } from '../../../hooks/useRouteClassName.js'
import { usePlayQuiz } from '../../../hooks/usePlayQuiz.js'
import { LoadingArrows } from '../../root/LoadingArrows/LoadingArrows.jsx'
import { useEffect, useRef, useState } from 'react'
import { QuizNotFound } from '../QuizNotFound/QuizNotFound.jsx'

export function PlayPage () {
  const isShowingResults = useStore(state => state.isShowingResults)
  const { isLoading, quizNotFound } = usePlayQuiz()

  useRouteClassName('play')

  if (isLoading) {
    return <LoadingQuiz />
  }
  if (quizNotFound) {
    return <QuizNotFound />
  }
  if (isShowingResults) {
    return <QuizResults />
  }
  return <PlayMode />
}

const LoadingQuiz = () => {
  const timeout = useRef()
  const [isWaiting, setIsWaiting] = useState(true)
  const waitTime = 1000

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setIsWaiting(false)
    }, waitTime)
    return () => clearTimeout(timeout.current)
  }, [])

  return !isWaiting
    ? <LoadingArrows />
    : <></>
}
