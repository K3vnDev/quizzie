import { useEffect, useRef, useState } from 'react'
import { useReset } from './useReset'
import { useStore } from '../store/useStore'
import { useShuffle } from './useShuffle'
import { waitForSeconds } from '../services/waitForSeconds'

export function usePlayMode () {
  const [
    { name, questions, config },
    setIsShowingQuestion,
    setIsUnloadingQuestion,
    setDisabledButtons,
    showQuestionAnsweredMessage,
    setIsUnloadingPlayMode,
    setIsShowingResults,
    addResult
  ] = useStore(s => [
    s.quiz,
    s.setIsShowingQuestion,
    s.setIsUnloadingQuestion,
    s.setDisabledButtons,
    s.showQuestionAnsweredMessage,
    s.setIsUnloadingPlayMode,
    s.setIsShowingResults,
    s.addResult
  ])

  const [questionsToShow] = useShuffle(questions, config.shuffleQuestions, questions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeBarPaused, setTimeBarPaused] = useState(false)
  const loadNextQuestion = useRef()
  const firstRender = useRef(true)

  useEffect(() => {
    clearTimeout(loadNextQuestion.current)
    const timeOutTime = firstRender.current
      ? answerTime + timeBarWaitTime + 3000
      : answerTime + timeBarWaitTime

    firstRender.current = false
    loadNextQuestion.current = setTimeout(() => {
      setResponse(null)
    }, timeOutTime)

    return () => {
      clearTimeout(loadNextQuestion.current)
    }
  }, [currentQuestionIndex])

  const resetState = useReset()
  useEffect(resetState, [])

  const progress = {
    current: currentQuestionIndex + 1,
    last: questionsToShow.length
  }

  const timeBarWaitTime = 0.8 * 1000
  const answerTime = config.answerTime * 1000

  const nextQuestion = async (response) => {
    clearTimeout(loadNextQuestion.current)

    showQuestionAnsweredMessage(
      response === true
        ? 'correct'
        : response === false
          ? 'incorrect'
          : 'timeout'
    )
    setTimeBarPaused(true)
    setDisabledButtons(true)
    await waitForSeconds(response === null ? 0.5 : 0.2)

    setIsUnloadingQuestion(true)
    await waitForSeconds(0.3) // wait for desmount question box animation

    setIsShowingQuestion(false)
    setIsUnloadingQuestion(false)
    await waitForSeconds(0.1) // wait some time before showing next question

    // if theres no next question, end process
    if (currentQuestionIndex + 1 >= questionsToShow.length) {
      setIsUnloadingPlayMode(true)
      await waitForSeconds(0.3)

      setIsShowingResults(true)
      setIsUnloadingPlayMode(false)
      return
    }

    setIsShowingQuestion(true)
    setTimeBarPaused(false)

    setCurrentQuestionIndex(c => c + 1)
  }

  const setResponse = (response) => {
    if (response === null) {
      const question = questionsToShow[currentQuestionIndex]
      addResult({
        questionQuery: question.query,
        answers: question.answers
      })
    }
    nextQuestion(response)
  }

  return {
    quizName: name,
    progress,
    currentQuestion: questionsToShow[currentQuestionIndex],
    setResponse,
    answerTime: answerTime / 1000,
    timeBarWaitTime: timeBarWaitTime / 1000,
    timeBarPaused
  }
}
