import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReset } from './useReset'

const { VITE_API_URL: API_URL } = import.meta.env

export function useDashboard() {
  const [userData, setUserData] = useState({})
  const [deleteMode, setDeleteMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const resetState = useReset()

  const fetchQuizzes = async () => {
    const token = window.localStorage.getItem('token')

    try {
      if (!token) throw new Error('')
      setIsLoading(true)

      const res = await fetch(`${API_URL}/user/quizzes`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('')

      const { data } = await res.json()
      setUserData(data)
      setIsLoading(false)
    } catch {
      navigate('/login')
    }
  }

  useEffect(() => {
    if (userData.quizzes && userData.quizzes.length === 0) {
      setDeleteMode(false)
    }
  }, [userData.quizzes])

  useEffect(() => {
    resetState()
    fetchQuizzes()
  }, [])

  return { userData, setUserData, deleteMode, setDeleteMode, isLoading }
}
