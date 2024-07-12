import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { useEffect, useRef } from 'react'
import { Timer as TimerIcon } from '../../icons/Timer.jsx'
import { Question as QuestionIcon } from '../../icons/Question.jsx'
import './browseQuiz.css'

export function BrowseQuiz ({ quiz }) {
  const { name, previewColor, config, questions, owner } = quiz
  const setQuiz = useStore(state => state.setQuiz)
  const setTransitioning = useStore(state => state.setTransitioning)
  const transitioning = useStore(state => state.transitioning)
  const navigate = useNavigate()
  const timeout = useRef()

  useEffect(() => {
    return () => clearTimeout(timeout.current)
  }, [])

  const handleClick = () => {
    if (transitioning) return

    setQuiz(quiz)
    setTransitioning(true)

    timeout.current = setTimeout(() => {
      navigate('/play')
    }, 1000)
  }

  const className = !transitioning
    ? 'browse-quiz not-disabled'
    : 'browse-quiz'

  return (
    <div
      className={className}
      style={{ '--bg-color': previewColor }}
      onClick={handleClick}
    >
      <h4>{name}</h4>
      <section className='info'>
        <h6>by {owner}</h6>
        <div>
          <span>
            <TimerIcon />
            <p>{config.answerTime}s</p>
          </span>
          <span>
            <QuestionIcon />
            <p>{questions.length}</p>
          </span>
        </div>
      </section>
    </div>
  )
}
