import { useEffect, useState } from 'react'
import './dashboardPage.css'
import { useNavigate } from 'react-router-dom'
import useRouteClassName from '../../hooks/useRouteClassName.js'
import { UserQuizzesGrid } from '../../components/UserQuizzesGrid/UserQuizzesGrid.jsx'
import { TransitionRound } from '../../components/TransitionRound/TransitionRound.jsx'
import useReset from '../../hooks/useReset.js'
import { DashboardSidebar } from '../../components/DashboardSidebar/DashboardSidebar.jsx'
const { VITE_API_URL: API_URL } = import.meta.env

export function DashboardPage () {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState({})
  const { resetDashboard } = useReset()
  const [deleteMode, setDeleteMode] = useState(false)

  const navigate = useNavigate()
  useRouteClassName('dashboard')

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

  if (isLoading) return

  return (
    <>
      <DashboardSidebar
        userData={userData}
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
      />
      <main>
        <UserQuizzesHeader
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
        />
        <UserQuizzesGrid
          quizzes={userData.quizzes}
          deleteMode={deleteMode}
          setUserData={setUserData}
        />
      </main>
      <TransitionRound />
    </>
  )
}

const UserQuizzesHeader = ({ deleteMode, setDeleteMode }) => {
  const handleCancel = () => {
    setDeleteMode(false)
  }

  if (deleteMode) {
    return (
      <header>
        <h3>Select a quiz to delete...</h3>
        <button onClick={handleCancel}>
          Cancel
        </button>
      </header>
    )
  }

  return (
    <header>
      <h2>Your Quizzes</h2>
    </header>
  )
}
