import { Add as AddIcon } from '../../../icons/Add.jsx'
import { useStore } from '../../../store/useStore.js'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './userQuizzesGrid.css'
import { UserQuiz } from '../UserQuiz/UserQuiz.jsx'
import { validateQuiz } from '../../../services/validateQuiz.js'
import { templateQuiz } from '../../../store/quizzes/templateQuiz.js'
import { LoadingArrows } from '../../root/LoadingArrows/LoadingArrows.jsx'

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

const LocalQuiz = () => {
  const [localQuiz, setLocalQuiz] = useState(null)

  useEffect(() => {
    let quizFromLS = window.localStorage.getItem('localQuiz')
    if (!quizFromLS) return

    quizFromLS = JSON.parse(quizFromLS)
    const { success, data: validatedQuiz } = validateQuiz(quizFromLS)

    if (!success) return

    setLocalQuiz(validatedQuiz)

    const token = window.localStorage.getItem('token')

    fetch(`${API_URL}/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(validatedQuiz)
    })
      .then(res => {
        if (res.ok) window.localStorage.removeItem('localQuiz')
        else {
          res.json()
            .then(data => console.log(data))
        }
      })
  }, [])

  return localQuiz
    ? <UserQuiz quiz={localQuiz} />
    : <></>
}
