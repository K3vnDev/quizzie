import { UserProfilePic } from '../UserProfilePic/UserProfilePic'
import { Search as SearchIcon } from '../../icons/Search.jsx'
import { Delete as DeleteIcon } from '../../icons/Delete.jsx'
import { Logout as LogoutIcon } from '../../icons/Logout.jsx'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore.js'

export function DashboardSidebar ({ userData, deleteMode, setDeleteMode }) {
  const { username, profileColor, quizzes } = userData

  return (
    <aside>
      <section>
        <UserProfilePic
          username={username}
          profileColor={profileColor}
        />
        <SearchButton />
        <DeleteModeButton
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
          userQuizzes={quizzes}
        />
      </section>
      <section>
        <LogoutButton />
      </section>
    </aside>
  )
}

const DeleteModeButton = ({ deleteMode, setDeleteMode, userQuizzes }) => {
  const transitioning = useStore(state => state.transitioning)
  const style = deleteMode ? { filter: 'invert(100%)' } : {}

  return (
    <button
      className='delete-btn'
      onClick={() => setDeleteMode(c => !c)}
      disabled={userQuizzes.length === 0 || transitioning}
      style={style}
    >
      <DeleteIcon />
    </button>
  )
}

const SearchButton = () => {
  const navigate = useNavigate()
  const transitioning = useStore(state => state.transitioning)

  return (
    <button
      className='search'
      onClick={() => navigate('/browse')}
      disabled={transitioning}
    >
      <SearchIcon />
    </button>
  )
}

const LogoutButton = () => {
  const navigate = useNavigate()
  const transitioning = useStore(state => state.transitioning)

  const handleClick = () => {
    window.localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <button
      className='logout-btn'
      onClick={handleClick}
      disabled={transitioning}
    >
      <LogoutIcon />
    </button>
  )
}
