import { useNavigate } from 'react-router-dom'
import { useStore } from '../../../store/useStore.js'
import { Timer as TimerIcon } from '../../../icons/Timer.jsx'
import { Question as QuestionIcon } from '../../../icons/Question.jsx'
import { Edit as EditIcon } from '../../../icons/Edit.jsx'
import { Play as PlayIcon } from '../../../icons/Play.jsx'
import { useTransition } from '../../../hooks/useTransition.js'
import './userQuiz.css'
const API_URL = import.meta.env.VITE_API_URL

export function UserQuiz ({ quizzes, index, deleteMode, setUserData }) {
  const quiz = quizzes[index]
  const { name, previewColor, config, questions } = quiz

  const className = deleteMode
    ? 'user-quiz delete-mode'
    : 'user-quiz'

  const handleClick = () => {
    if (deleteMode) {
      const token = window.localStorage.getItem('token')

      const prevQuizzes = structuredClone(quizzes)
      setUserData(u => {
        const newUserData = structuredClone(u)
        const quizIndex = quizzes.findIndex(q => q.id === quiz.id)
        newUserData.quizzes.splice(quizIndex, 1)
        return newUserData
      })

      fetch(`${API_URL}/quiz/${quiz.id}`, {
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
  }

  return (
    <div
      className={className}
      style={{ '--bg-color': previewColor }}
      onClick={handleClick}
    >
      <h4>{name}</h4>
      <section>
        <div>
          <TimerIcon />
          <span>{config.answerTime}s</span>
        </div>
        <div>
          <QuestionIcon />
          <span>{questions.length}</span>
        </div>
      </section>
      {
        !deleteMode &&
          <UserQuizEditMenu quiz={quiz} />
      }
    </div>
  )
}

const UserQuizEditMenu = ({ quiz }) => {
  const setQuiz = useStore(state => state.setQuiz)
  const { makeTransition } = useTransition()
  const navigate = useNavigate()

  const handleEnterPlayMode = () => {
    setQuiz(quiz)
    makeTransition('/play')
  }

  const handleEnterEditMode = () => {
    setQuiz(quiz)
    navigate('/edit')
  }

  return (
    <div className='edit-menu'>
      <button onClick={handleEnterPlayMode}>
        <PlayIcon />
      </button>
      <button onClick={handleEnterEditMode}>
        <EditIcon />
      </button>
    </div>
  )
}
