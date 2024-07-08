import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { Edit as EditIcon } from '../../icons/Edit'

export function EditButton () {
  const navigate = useNavigate()
  const quizOwnedByUser = useStore(state => state.quizOwnedByUser)
  const disabledButtons = useStore(state => state.disabledButtons)

  const handleClick = () => {
    navigate('/edit')
  }

  return quizOwnedByUser
    ? (
      <button
        className='edit-btn'
        onClick={handleClick}
        disabled={disabledButtons}
      >
        <EditIcon />
      </button>
      )
    : <></>
}
