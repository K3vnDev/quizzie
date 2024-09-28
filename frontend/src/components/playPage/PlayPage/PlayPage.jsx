import '../../../index.css'
import './playPage.css'
import { useEffect, useRef, useState } from 'react'
import { usePlayQuiz } from '../../../hooks/usePlayQuiz.js'
import { useRouteClassName } from '../../../hooks/useRouteClassName.js'
import { useStore } from '../../../store/useStore.js'
import { LoadingArrows } from '../../root/LoadingArrows/LoadingArrows.jsx'
import { QuizNotFound } from '../../root/NotFound/NotFound.jsx'
import { PlayMode } from '../PlayMode/PlayMode.jsx'
import { QuizResults } from '../QuizResults/QuizResults.jsx'

export function PlayPage() {
  const isShowingResults = useStore(state => state.isShowingResults)
  const { isLoading, quizNotFound } = usePlayQuiz()

  // Debug Results
  const debugResults = useStore(state => state.debugResults)
  useEffect(() => debugResults(15), [])
  //

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

  return !isWaiting ? <LoadingArrows /> : <></>
}
