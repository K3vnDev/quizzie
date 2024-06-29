import '../../index.css'
import './landingPage.css'
import useRouteClassName from '../../hooks/useRouteClassName.js'
import { useEffect } from 'react'
import { useStore } from '../../store/useStore.js'
import { MenuQuestion } from '../../components/MenuQuestion/MenuQuestion.jsx'
import { TransitionRound } from '../../components/TransitionRound/TransitionRound.jsx'
import { useNavigate } from 'react-router-dom'

export default function LandingPage () {
  useRouteClassName('landing')
  const [setIsShowingResults, setQuiz] = useStore(
    state => [
      state.setIsShowingResults,
      state.setQuiz
    ]
  )

  useEffect(() => {
    setQuiz(null)
    setIsShowingResults(false)
  }, [])

  return (
    <>
      <TitleAndSlogan />
      <MenuQuestion />
      <TransitionRound />
    </>
  )
}

const TitleAndSlogan = () => {
  const navigate = useNavigate()

  return (
    <main className='title-n-slogan'>
      <h1>Quizzie</h1>
      <h3>
        A simple way to <span>create</span><br />
        your own <span>quizzes.</span>
      </h3>
      <p onClick={() => navigate('/login')}>
        Login or Sign up
      </p>
    </main>
  )
}
