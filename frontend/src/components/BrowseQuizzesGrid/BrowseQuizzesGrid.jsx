import { Timer as TimerIcon } from '../../icons/Timer.jsx'
import { Question as QuestionIcon } from '../../icons/Question.jsx'
import { useStore } from '../../store/useStore.js'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import './browseQuizzesGrid.css'

export function BrowseQuizzesGrid ({ query, quizzes }) {
  const [notDisabled, setNotDisabled] = useState(true)

  if (quizzes.length === 0) return

  return (
    <section className='browse-quizzes-grid'>
      {
        quizzes.map(quiz => (
          <BrowseQuiz
            notDisabled={notDisabled}
            setNotDisabled={setNotDisabled}
            key={quiz.id}
            quiz={quiz}
          />
        ))
      }
    </section>
  )
}

const BrowseQuiz = ({ quiz, notDisabled, setNotDisabled }) => {
  const { name, previewColor, config, questions } = quiz
  const setQuiz = useStore(state => state.setQuiz)
  const setTransitioning = useStore(state => state.setTransitioning)
  const navigate = useNavigate()
  const timeout = useRef()

  useEffect(() => {
    return () => clearTimeout(timeout.current)
  }, [])

  const handleClick = () => {
    if (!notDisabled) return

    setQuiz(quiz)
    setTransitioning(true)
    setNotDisabled(false)

    timeout.current = setTimeout(() => {
      navigate('/play')
    }, 1000)
  }

  const className = notDisabled
    ? 'browse-quiz not-disabled'
    : 'browse-quiz'

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
    </div>
  )
}
