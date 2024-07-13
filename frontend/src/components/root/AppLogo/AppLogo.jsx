import { useNavigate } from 'react-router-dom'
import './appLogo.css'
import { useStore } from '../../../store/useStore'

export function AppLogo () {
  const navigate = useNavigate()
  const transitioning = useStore(state => state.transitioning)

  const handleClick = async () => {
    const token = window.localStorage.getItem('token')
    if (!token) return navigate('/')

    navigate('/dashboard')
  }

  return (
    <button
      className='app-logo'
      disabled={transitioning}
      onClick={handleClick}
    />
  )
}
