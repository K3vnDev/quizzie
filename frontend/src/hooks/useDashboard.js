import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useReset from '../hooks/useReset.js'

const { VITE_API_URL: API_URL } = import.meta.env

export function useDashboard () {
  const [userData, setUserData] = useState({})
  const { resetDashboard } = useReset()
  const [deleteMode, setDeleteMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const fetchQuizzes = async () => {
    const token = window.localStorage.getItem('token')
    if (!token) return navigate('/login')

    const res = await fetch(`${API_URL}/user/quizzes`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    if (res.ok) {
      setUserData(data.data)
      setIsLoading(false)
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    if (
      userData.quizzes &&
      userData.quizzes.length === 0
    ) {
      setDeleteMode(false)
    }
  }, [userData.quizzes])

  useEffect(() => {
    resetDashboard()
    fetchQuizzes()
  }, [])

  return { userData, setUserData, deleteMode, setDeleteMode, isLoading }
}
