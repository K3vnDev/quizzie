import { Add as AddIcon } from '../../../icons/Add.jsx'
import { useStore } from '../../../store/useStore.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './userQuizzesGrid.css'
import { UserQuiz } from '../UserQuiz/UserQuiz.jsx'
import { templateQuiz } from '../../../store/quizzes/templateQuiz.js'
import { LoadingArrows } from '../../root/LoadingArrows/LoadingArrows.jsx'
import { LocalQuiz } from '../LocalQuiz/LocalQuiz.jsx'
const API_URL = import.meta.env.VITE_API_URL

export function UserQuizzesGrid ({ quizzes, setUserData, deleteMode, isLoading }) {
  if (isLoading) {
    return <QuizzesPreview />
  }

  return (
    <section className='user-quizzes-grid'>
      <CreateNewQuizButton
        deleteMode={deleteMode}
      />
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
      <LocalQuiz
        setUserData={setUserData}
      />
    </section>
  )
}

const CreateNewQuizButton = ({ deleteMode }) => {
  const setQuiz = useStore(state => state.setQuiz)
  const transitioning = useStore(state => state.transitioning)
  const [buttonLoading, setButtonLoading] = useState(false)
  const navigate = useNavigate()

  if (deleteMode) return

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

  const className = buttonLoading
    ? 'create-new-quiz-btn loading'
    : 'create-new-quiz-btn'

  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={buttonLoading || transitioning}
    >
      {
        buttonLoading
          ? <LoadingArrows />
          : <AddIcon />
      }
    </button>
  )
}

const QuizzesPreview = () => {
  const quizzesPreview = Array(6).fill({})

  return (
    <section className='user-quizzes-grid'>
      {
        quizzesPreview.map((_, i) => (
          <div
            className='user-quiz loading'
            key={i}
          />
        ))
      }
    </section>
  )
}
