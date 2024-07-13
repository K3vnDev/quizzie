import { Add as AddIcon } from '../../icons/Add.jsx'
import './userQuizzesGrid.css'
import { LocalQuiz } from './LocalQuiz.jsx'
import { useStore } from '../../store/useStore.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { templateQuiz } from '../../store/quizzes/templateQuiz.js'
import { UserQuiz } from './UserQuiz.jsx'
import { LoadingArrows } from '../LoadingArrows/LoadingArrows.jsx'
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
  const transitioning = useStore(state => state.transitioning)
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
