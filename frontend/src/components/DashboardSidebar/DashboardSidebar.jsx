import { UserProfilePic } from '../UserProfilePic/UserProfilePic'
import { Search as SearchIcon } from '../../icons/Search.jsx'
import { Delete as DeleteIcon } from '../../icons/Delete.jsx'
import { Logout as LogoutIcon } from '../../icons/Logout.jsx'
import { useNavigate } from 'react-router-dom'

export function DashboardSidebar ({ userData, deleteMode, setDeleteMode }) {
  return (
    <aside>
      <section>
        <UserProfilePic
          username={userData.username}
          profileColor={userData.profileColor}
        />
        <SearchButton />
        <DeleteModeButton
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
          userQuizzes={userData.quizzes}
        />
      </section>
      <section>
        <LogoutButton />
      </section>
    </aside>
  )
}

const DeleteModeButton = ({ deleteMode, setDeleteMode, userQuizzes }) => {
  const handleClick = () => {
    setDeleteMode(c => !c)
  }

  const style = deleteMode
    ? { filter: 'invert(100%)' }
    : {}

  return (
    <button
      className='delete-btn'
      onClick={handleClick}
      disabled={userQuizzes.length === 0}
      style={style}
    >
      <DeleteIcon />
    </button>
  )
}

const SearchButton = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/browse')
  }

  return (
    <button
      className='search'
      onClick={handleClick}
    >
      <SearchIcon />
    </button>
  )
}

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    window.localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <button
      className='logout-btn'
      onClick={handleClick}
    >
      <LogoutIcon />
    </button>
  )
}
