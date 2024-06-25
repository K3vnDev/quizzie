import { useState } from 'react'
import { useStore } from '../store/useStore'

export function useEditMode () {
  const { name, config, questions } = useStore(state => state.quiz)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  return {
    quizName: name,
    currentQuestionIndex
  }
}
