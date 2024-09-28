import { useRouteClassName } from '../../../hooks/useRouteClassName'
import { useNavigate } from 'react-router-dom'
import './notFound.css'

const useNotFound = () => {
  useRouteClassName('not-found')

  const navigate = useNavigate()
  return { navigate }
}

export function PageNotFound() {
  const { navigate } = useNotFound()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div className='not-found'>
      <h3>
        Oops, page not found :( <span>404</span>
      </h3>
      <button onClick={handleClick}>Back to main page</button>
    </div>
  )
}

export function QuizNotFound() {
  const { navigate } = useNotFound()

  const handleClick = () => {
    navigate('/browse')
  }

  return (
    <div className='not-found'>
      <h3>
        Sorry, quiz not found :( <span>404</span>
      </h3>
      <button onClick={handleClick}>Browse other quizzes</button>
    </div>
  )
}
