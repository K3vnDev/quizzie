import './userQuizDeleteMenu.css'
import { useDebounce } from '../../../hooks/useDebounce.js'
const API_URL = import.meta.env.VITE_API_URL

export function UserQuizDeleteMenu ({ showingDeleteMenu, setShowingDeleteMenu, setUserData, quizzes, quizId }) {
  const debouncedShowingDeleteMenu = useDebounce(showingDeleteMenu, 250)

  const handleDelete = e => {
    e.stopPropagation()
    const token = window.localStorage.getItem('token')

    const prevQuizzes = structuredClone(quizzes)
    setUserData(u => {
      const newUserData = structuredClone(u)
      const quizIndex = quizzes.findIndex(q => q.id === quizId)
      newUserData.quizzes.splice(quizIndex, 1)
      return newUserData
    })

    fetch(`${API_URL}/quiz/${quizId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) {
          setUserData(u => {
            const newUserData = structuredClone(u)
            newUserData.quizzes = prevQuizzes
            return newUserData
          })
        }
      })
  }

  const display =
    debouncedShowingDeleteMenu || showingDeleteMenu
      ? 'flex'
      : 'none'

  const handleCancel = e => {
    e.stopPropagation()
    setShowingDeleteMenu(false)
  }

  const className = showingDeleteMenu
    ? 'user-quiz-delete-menu visible'
    : 'user-quiz-delete-menu hidden'

  return (
    <div
      className={className}
      style={{ display }}
    >
      <h4>Are you sure?</h4>
      <div className='buttons-wrapper'>
        <button
          onClick={handleDelete}
          disabled={!showingDeleteMenu}
        >
          Yes
        </button>
        <button
          onClick={handleCancel}
          disabled={!showingDeleteMenu}
        >
          No
        </button>
      </div>
    </div>
  )
}
