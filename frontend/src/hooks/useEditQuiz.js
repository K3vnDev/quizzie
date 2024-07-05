import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
import { templateQuiz } from '../store/quizzes/templateQuiz'
import { validateQuiz } from '../services/validateQuiz'
import { useDebounce } from './useDebounce'
const API_URL = import.meta.env.VITE_API_URL

export function useEditQuiz () {
  const quiz = useStore(state => state.quiz)
  const setQuiz = useStore(state => state.setQuiz)
  const setCloudState = useStore(state => state.setCloudState)
  const cloudState = useStore(state => state.cloudState)
  const [isLoading, setIsLoading] = useState(true)
  const isFirstRender = useRef(true)
  const debouncedQuiz = useDebounce(quiz, 400)
  const navigate = useNavigate()

  const token = window.localStorage.getItem('token')

  const setQueryParam = id => {
    if (id) window.history.replaceState({}, '', `edit?q=${id}`)
  }
  const fetchQuiz = async (id) => {
    try {
      const res = await fetch(`${API_URL}/quiz/edit/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Error fetching quiz')

      const data = await res.json()

      if (data.status !== 'error') {
        setQuiz(data)
        setIsLoading(false)
      } else throw new Error('')
    } catch {
      navigate('/login')
    }
  }

  const saveQuizToDB = async (q) => {
    setCloudState('uploading')

    try {
      const res = await fetch(
      `${API_URL}/quiz`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(q)
      })

      if (res.ok) {
        setCloudState('saved')
      // TODO: Handle Errors
      } else throw new Error('Error fetching data')
    } catch {
      setCloudState('error')
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
    if (!token) window.localStorage.setItem('localQuiz', JSON.stringify(quiz))

    if (isFirstRender.current) isFirstRender.current = false
    else if (cloudState !== 'uploading') setCloudState('not saved')
  }, [quiz])

  useEffect(() => {
    if (debouncedQuiz) {
      saveQuizToDB(debouncedQuiz)
    }
  }, [debouncedQuiz])

  return { isLoading }
}
