import { useNavigate } from 'react-router-dom'
import { useTransition } from '../../../hooks/useTransition.js'
import { useStore } from '../../../store/useStore.js'
import { Edit as EditIcon } from '../../../icons/Edit.jsx'
import { Play as PlayIcon } from '../../../icons/Play.jsx'
import './userQuizOptionsMenu.css'

export function UserQuizOptionsMenu ({ quiz }) {
  const setQuiz = useStore(state => state.setQuiz)
  const transitioning = useStore(state => state.transitioning)
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
    <div className='user-quiz-options-menu'>
      <button
        onClick={handleEnterPlayMode}
        disabled={transitioning}
      >
        <PlayIcon />
      </button>
      <button
        onClick={handleEnterEditMode}
        disabled={transitioning}
      >
        <EditIcon />
      </button>
    </div>
  )
}
