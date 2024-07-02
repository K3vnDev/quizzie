import { useNavigate } from 'react-router-dom'
import './appLogo.css'

export function AppLogo ({ disabledButtons }) {
  const navigate = useNavigate()

  const handleClick = async () => {
    const token = window.localStorage.getItem('token')
    if (!token) return navigate('/')

    navigate('/dashboard')
  }

  return (
    <button
      className='app-logo'
      disabled={disabledButtons}
      onClick={handleClick}
    />
  )
}
