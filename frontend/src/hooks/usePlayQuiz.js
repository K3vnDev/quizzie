import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { useAppName } from './useAppName'
const { VITE_API_URL: API_URL } = import.meta.env

export function usePlayQuiz() {
  const quiz = useStore(state => state.quiz)
  const setQuiz = useStore(state => state.setQuiz)
  const setQuizOwnedByUser = useStore(state => state.setQuizOwnedByUser)
  const [isLoading, setIsLoading] = useState(true)
  const [quizNotFound, setQuizNotFound] = useState(false)
  const navigate = useNavigate()

  const setQueryParam = id => {
    window.history.replaceState({}, '', `play?q=${id}`)
  }

  const name = quiz ? `${quiz.name} - Quizzie` : 'Quizzie'
  useAppName(name, quiz)

  const fetchQuiz = async id => {
    try {
      const res = await fetch(`${API_URL}/quiz/${id}`)
      if (!res.ok) throw new Error('')

      const data = await res.json()

      if (data.status !== 'error') {
        setQuiz(data)
        setIsLoading(false)
      } else {
        throw new Error('')
      }
    } catch {
      setIsLoading(false)
      setQuizNotFound(true)
    }
  }

  useEffect(() => {
    if (!quiz) return

    const token = window.localStorage.getItem('token')
    if (!token) return

    fetch(`${API_URL}/quiz/edit/${quiz.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      if (res.ok) setQuizOwnedByUser(true)
    })

    return () => setQuizOwnedByUser(false)
  }, [quiz])

  useEffect(() => {
    const localQuiz = window.localStorage.getItem('localQuiz')
    console.log(localQuiz === JSON.stringify(quiz))
    if (localQuiz === JSON.stringify(quiz)) setQuizOwnedByUser(true)
    return () => setQuizOwnedByUser(false)
  }, [])

  useEffect(() => {
    if (quiz) {
      if (quiz.id) setQueryParam(quiz.id)
      setIsLoading(false)
      return
    }
    const searchParams = new URLSearchParams(window.location.search)
    const quizIdFromUrl = searchParams.get('q')

    if (quizIdFromUrl) fetchQuiz(quizIdFromUrl)
    else navigate('/')
  }, [])

  return { isLoading, quizNotFound }
}
