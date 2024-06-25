import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL

export function usePlayQuiz () {
  const quiz = useStore(state => state.quiz)
  const setQuiz = useStore(state => state.setQuiz)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const setQueryParam = id => window.history.replaceState({}, '', `play?q=${id}`)

  const fetchQuiz = async (id) => {
    try {
      const res = await fetch(`${API_URL}/quiz/${id}`)
      if (!res.ok) throw new Error('')

      const data = await res.json()
      console.log(data)
      if (data.status !== 'error') {
        setQuiz(data)
        setIsLoading(false)
      } else throw new Error('')
    } catch (err) {
      // show not found error
      console.error(err)
    }
  }

  useEffect(() => {
    if (quiz) {
      setQueryParam(quiz.id)
      setIsLoading(false)
      return
    }
    const searchParams = new URLSearchParams(window.location.search)
    const quizIdFromUrl = searchParams.get('q')

    if (quizIdFromUrl) fetchQuiz(quizIdFromUrl)
    else navigate('/')
  }, [])

  return { isLoading, fetchQuiz }
}
