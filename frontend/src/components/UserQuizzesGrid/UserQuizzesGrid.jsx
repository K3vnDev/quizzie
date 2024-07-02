import { Add as AddIcon } from '../../icons/Add.jsx'
import { Timer as TimerIcon } from '../../icons/Timer.jsx'
import { Question as QuestionIcon } from '../../icons/Question.jsx'
import './userQuizzesGrid.css'
import { LocalQuiz } from './LocalQuiz.jsx'
import { Edit as EditIcon } from '../../icons/Edit.jsx'
import { Play as PlayIcon } from '../../icons/Play.jsx'
import { useStore } from '../../store/useStore.js'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { templateQuiz } from '../../store/quizzes/templateQuiz.js'
const API_URL = import.meta.env.VITE_API_URL

export function UserQuizzesGrid ({ quizzes, setUserData, deleteMode }) {
  return (
    <section className='user-quizzes-grid grid'>
      {
        !deleteMode &&
          <CreateNewQuizButton />
      }
      <LocalQuiz />
      {
        quizzes.map((quiz, index) => (
          <UserQuiz
            quizzes={quizzes}
            key={quiz.id}
            deleteMode={deleteMode}
            setUserData={setUserData}
            index={index}
          />
        ))
      }
    </section>
  )
}

const CreateNewQuizButton = () => {
  const setQuiz = useStore(state => state.setQuiz)
  const [buttonLoading, setButtonLoading] = useState(false)
  const navigate = useNavigate()

  const handleClick = async () => {
    const token = window.localStorage.getItem('token')
    setButtonLoading(true)

    try {
      const res = await fetch(`${API_URL}/quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(templateQuiz)
      })
      const data = await res.json()

      if (data.status === 'success') {
        setQuiz(data.data)
        navigate('/edit')
      }
    } catch {
      setButtonLoading(false)
    }
  }

  return (
    <button
      className='create-new-quiz-btn'
      onClick={handleClick}
      disabled={buttonLoading}
    >
      <AddIcon />
    </button>
  )
}

export const UserQuiz = ({ quizzes, index, deleteMode, setUserData }) => {
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
  const setTransitioning = useStore(state => state.setTransitioning)
  const navigate = useNavigate()
  const timeoutRef = useRef()

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const handleEnterPlayMode = () => {
    setTransitioning(true)

    timeoutRef.current = setTimeout(() => {
      setQuiz(quiz)
      navigate('/play')
    }, 1000)
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
