import { useEffect, useState } from 'react'
import './dashboardPage.css'
import { useNavigate } from 'react-router-dom'
import useRouteClassName from '../../hooks/useRouteClassName.js'
import { Search as SearchIcon } from '../../icons/Search.jsx'
import { UserProfilePic } from '../../components/UserProfilePic/UserProfilePic.jsx'
import { UserQuizzesDisplay } from '../../components/UserQuizzesDisplay/UserQuizzesDisplay.jsx'
import { TransitionRound } from '../../components/TransitionRound/TransitionRound.jsx'
import useReset from '../../hooks/useReset.js'
const { VITE_API_URL: API_URL } = import.meta.env

export function DashboardPage () {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState({})
  const { resetDashboard } = useReset()

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
    resetDashboard()
    fetchQuizzes()
  }, [])

  if (isLoading) return

  return (
    <>
      <aside>
        <UserProfilePic
          username={userData.username}
          profileColor={userData.profileColor}
        />
        <button className='search'>
          <SearchIcon />
        </button>
      </aside>
      <main>
        <header>
          <h2>Your Quizzes</h2>
          <div className='buttons'>
            <button />
            <button />
          </div>
        </header>
        <UserQuizzesDisplay
          quizzes={userData.quizzes}
        />
      </main>
      <TransitionRound />
    </>
  )
}
