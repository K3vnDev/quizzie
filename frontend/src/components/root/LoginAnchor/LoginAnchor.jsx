import { useNavigate } from 'react-router-dom'
import './loginAnchor.css'

export function LoginAnchor() {
  const navigate = useNavigate()

  const handleClick = e => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    // biome-ignore lint/a11y/useValidAnchor: <>
    <a className='login-anchor' onClick={handleClick}>
      Login or Sign up
    </a>
  )
}
