import { useNavigate } from 'react-router-dom'
import '../../../index.css'
import './landingPage.css'
import { useEffect, useState } from 'react'
import { useStore } from '../../../store/useStore'
import { TransitionRound } from '../../root/TransitionRound/TransitionRound.jsx'
import { LoginAnchor } from '../../root/LoginAnchor/LoginAnchor.jsx'
import { MenuQuestion } from '../MenuQuestion/MenuQuestion.jsx'
import { useRouteClassName } from '../../../hooks/useRouteClassName.js'
import { useReset } from '../../../hooks/useReset.js'
import { useWidth } from '../../../hooks/useWidth.js'
const { VITE_API_URL: API_URL } = import.meta.env

export function LandingPage() {
  useRouteClassName('landing')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const resetState = useReset()

  const [setIsShowingResults, setQuiz] = useStore(state => [
    state.setIsShowingResults,
    state.setQuiz
  ])

  useEffect(() => {
    setQuiz(null)
    resetState()
    setIsShowingResults(false)
    fetch(`${API_URL}/fizz`)

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
  const { onMinWidth: showingLoginAnchor } = useWidth(1000)

  return (
    <main className='title-n-slogan'>
      <h1>Quizzie</h1>
      <h3>
        A simple way to <span>create</span>
        <br />
        your own <span>quizzes.</span>
      </h3>
      {showingLoginAnchor && <LoginAnchor />}
    </main>
  )
}
