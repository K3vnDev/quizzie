import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
import { templateQuiz } from '../store/quizzes/templateQuiz'
import { validateQuiz } from '../services/validateQuiz'
const API_URL = import.meta.env.VITE_API_URL

export function useEditQuiz () {
  const quiz = useStore(state => state.quiz)
  const setQuiz = useStore(state => state.setQuiz)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const setQueryParam = id => {
    if (id) window.history.replaceState({}, '', `edit?q=${id}`)
  }
  const fetchQuiz = async (id) => {
    try {
      const token = window.localStorage.getItem('token')

      const res = await fetch(`${API_URL}/quiz/edit/${id}`, {
        headers: {
          headers: { Authorization: `Bearer ${token}` }
        }
      })
      if (!res.ok) throw new Error('Error fetching quiz')

      const data = await res.json()
      console.log(data)

      if (data.status !== 'error') {
        setQuiz(data)
        setIsLoading(false)
      } else throw new Error('')
    } catch {
      navigate('/login') // TODO: redirect to login page
    }
  }

  useEffect(() => {
    if (quiz) {
      if (quiz.id) setQueryParam(quiz.id)
      setIsLoading(false)
      return
    }

    const searchParams = new URLSearchParams(window.location.search)
    const quizIdFromUrl = searchParams.get('q')
    if (quizIdFromUrl) {
      fetchQuiz(quizIdFromUrl)
    } else {
      const quizFromStorage = JSON.parse(
        window.localStorage.getItem('localQuiz')
      )
      if (quizFromStorage) {
        const { success } = validateQuiz(quizFromStorage)
        setQuiz(
          success
            ? quizFromStorage
            : templateQuiz
        )
      } else {
        navigate('/dashboard')
      }
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('localQuiz', JSON.stringify(quiz))
  }, [quiz])

  return { isLoading, fetchQuiz }
}
