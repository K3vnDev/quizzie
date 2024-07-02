import { Add as AddIcon } from '../../icons/Add.jsx'
import { Timer as TimerIcon } from '../../icons/Timer.jsx'
import { Question as QuestionIcon } from '../../icons/Question.jsx'
import './userQuizzesDisplay.css'
import { LocalQuiz } from './LocalQuiz.jsx'
import { Edit as EditIcon } from '../../icons/Edit.jsx'
import { Play as PlayIcon } from '../../icons/Play.jsx'
import { useStore } from '../../store/useStore.js'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export function UserQuizzesDisplay ({ quizzes }) {
  return (
    <section className='user-quizzes-display grid'>
      <CreateNewQuizButton />
      <LocalQuiz />
      {
        quizzes.map(quiz => (
          <UserQuiz
            quiz={quiz}
            key={quiz.id}
          />
        ))
      }
    </section>
  )
}

const CreateNewQuizButton = () => {
  return (
    <button className='create-new-quiz-btn'>
      <AddIcon />
    </button>
  )
}

export const UserQuiz = ({ quiz }) => {
  const { name, config, questions } = quiz

  return (
    <div className='user-quiz'>
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
      <UserQuizEditMenu quiz={quiz} />
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
