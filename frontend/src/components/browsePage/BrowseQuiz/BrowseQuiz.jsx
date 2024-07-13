import { useStore } from '../../../store/useStore.js'
import { Timer as TimerIcon } from '../../../icons/Timer.jsx'
import { Question as QuestionIcon } from '../../../icons/Question.jsx'
import { useTransition } from '../../../hooks/useTransition.js'
import './browseQuiz.css'

export function BrowseQuiz ({ quiz }) {
  const { name, previewColor, config, questions, owner } = quiz
  const setQuiz = useStore(state => state.setQuiz)
  const transitioning = useStore(state => state.transitioning)
  const { makeTransition } = useTransition()

  const handleClick = () => {
    if (!transitioning) {
      setQuiz(quiz)
      makeTransition('/play')
    }
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
