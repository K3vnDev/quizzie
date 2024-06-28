import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import useReset from './useReset'

export function useEditMode () {
  const [
    { name, questions },
    createNewQuestion,
    deleteQuestion
  ] =
  useStore(s => [
    s.quiz,
    s.createNewQuestion,
    s.deleteQuestion
  ])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const { resetEditMode } = useReset()

  useEffect(() => {
    resetEditMode()
  }, [])

  const navigateQuestion = direction => {
    switch (direction) {
      case 'right':
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(c => c + 1)
        } else {
          createNewQuestion()
          setCurrentQuestionIndex(c => c + 1)
        }
        break

      case 'left':
        setCurrentQuestionIndex(c => c - 1)
        break
    }
  }

  const handleDeleteQuestion = () => {
    deleteQuestion(currentQuestionIndex)
    if (currentQuestionIndex === questions.length - 1) {
      setCurrentQuestionIndex(c => c - 1)
    }
  }

  return {
    quizName: name,
    currentQuestionIndex,
    navigateQuestion,
    deleteQuestion: handleDeleteQuestion
  }
}
