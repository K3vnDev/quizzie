import { useEffect, useState } from 'react'
import './dashboardPage.css'
import { useStore } from '../../store/useStore'
import { useNavigate } from 'react-router-dom'
import useRouteClassName from '../../hooks/useRouteClassName.js'
const { VITE_API_URL: API_URL } = import.meta.env

export function DashboardPage () {
  const [userQuizzes, setUserQuizzes] = useStore(
    state =>
      [state.userQuizzes, state.setUserQuizzes]
  )
  const navigate = useNavigate()
  const [username, setUsername] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useRouteClassName('dashboard')

  const fetchQuizzes = async () => {
    const token = window.localStorage.getItem('token')
    if (!token) return navigate('/login')

    const res = await fetch(`${API_URL}/user/quizzes`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    if (res.ok) {
      const { quizzes, username } = data.data
      setUserQuizzes(quizzes)
      setUsername(username)
      setIsLoading(false)
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    fetchQuizzes()
  }, [])

  if (isLoading) return

  return (
    <>
      <aside>
        <button className='user-profile' />
        <button className='search' />
      </aside>
      <main>
        <header>
          <h2>Your Quizzes</h2>
          <div className='buttons'>
            {/* Displaymode buttons here */}
          </div>
        </header>
        <section>
          {/* Quizzes here */}
        </section>
      </main>
    </>
  )
}
