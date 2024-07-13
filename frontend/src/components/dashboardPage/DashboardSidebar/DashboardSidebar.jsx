import { UserProfilePic } from '../UserProfilePic/UserProfilePic.jsx'
import { Search as SearchIcon } from '../../../icons/Search.jsx'
import { Delete as DeleteIcon } from '../../../icons/Delete.jsx'
import { Logout as LogoutIcon } from '../../../icons/Logout.jsx'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../../store/useStore.js'
import './dashboardSidebar.css'

export function DashboardSidebar ({ userData, deleteMode, setDeleteMode, isLoading }) {
  const { username, profileColor, quizzes } = userData

  return (
    <aside className='dashboard-sidebar'>
      <section>
        <UserProfilePic
          username={username}
          profileColor={profileColor}
          isLoading={isLoading}
        />
        <SearchButton isLoading={isLoading} />
        <DeleteModeButton
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
          userQuizzes={quizzes}
          isLoading={isLoading}
        />
      </section>
      <section>
        <LogoutButton isLoading={isLoading} />
      </section>
    </aside>
  )
}

const SearchButton = ({ isLoading }) => {
  const navigate = useNavigate()
  const transitioning = useStore(state => state.transitioning)

  if (isLoading) {
    return (
      <button
        className='search-btn loading'
        disabled
      />
    )
  }

  return (
    <button
      className='search-btn'
      onClick={() => navigate('/browse')}
      disabled={transitioning}
    >
      <SearchIcon />
    </button>
  )
}

const DeleteModeButton = ({ deleteMode, setDeleteMode, userQuizzes, isLoading }) => {
  const transitioning = useStore(state => state.transitioning)
  const style = deleteMode ? { filter: 'invert(100%)' } : {}

  if (isLoading) {
    return (
      <button
        className='delete-btn loading'
        disabled
      />
    )
  }

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

const LogoutButton = ({ isLoading }) => {
  const navigate = useNavigate()
  const transitioning = useStore(state => state.transitioning)

  const handleClick = () => {
    window.localStorage.removeItem('token')
    navigate('/')
  }

  if (isLoading) {
    return (
      <button
        className='delete-btn loading'
        disabled
      />
    )
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
