import { useNavigate } from 'react-router-dom'
import { useStore } from '../../../store/useStore.js'
import { Edit as EditIcon } from '../../../icons/Edit.jsx'

export function EditButton({ onMenu }) {
  const navigate = useNavigate()
  const quizOwnedByUser = useStore(state => state.quizOwnedByUser)
  const transitioning = useStore(state => state.transitioning)

  return quizOwnedByUser ? (
    <button
      className='edit-btn'
      onClick={() => navigate('/edit')}
      disabled={transitioning && onMenu}
    >
      <EditIcon />
    </button>
  ) : (
    <></>
  )
}
