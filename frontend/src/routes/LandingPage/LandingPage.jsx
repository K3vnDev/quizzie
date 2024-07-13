import '../../index.css'
import './landingPage.css'
import useRouteClassName from '../../hooks/useRouteClassName.js'
import { useEffect, useState } from 'react'
import { useStore } from '../../store/useStore.js'
import { MenuQuestion } from '../../components/MenuQuestion/MenuQuestion.jsx'
import { TransitionRound } from '../../components/TransitionRound/TransitionRound.jsx'
import { useNavigate } from 'react-router-dom'
import { LoginAnchor } from '../../components/LoginAnchor/LoginAnchor.jsx'

export default function LandingPage () {
  useRouteClassName('landing')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [setIsShowingResults, setQuiz] = useStore(
    state => [
      state.setIsShowingResults,
      state.setQuiz
    ]
  )

  useEffect(() => {
    setQuiz(null)
    setIsShowingResults(false)

    const token = window.localStorage.getItem('token')
    if (token) navigate('/dashboard')
    else setIsLoading(false)
  }, [])

  if (isLoading) return

  return (
    <>
      <TitleAndSlogan />
      <MenuQuestion />
      <TransitionRound />
    </>
  )
}

const TitleAndSlogan = () => {
  return (
    <main className='title-n-slogan'>
      <h1>Quizzie</h1>
      <h3>
        A simple way to <span>create</span><br />
        your own <span>quizzes.</span>
      </h3>
      <LoginAnchor />
    </main>
  )
}
