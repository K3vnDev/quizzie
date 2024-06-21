import '../../index.css'
import './landingPage.css'
import useRouteClassName from '../../hooks/useRouteClassName.js'
import { useEffect } from 'react'
import { useStore } from '../../store/useStore.js'
import { MenuQuestion } from '../../components/MenuQuestion/MenuQuestion.jsx'
import { TransitionRound } from '../../components/TransitionRound/TransitionRound.jsx'

export default function LandingPage () {
  useRouteClassName('landing')
  const [setIsShowingResults] = useStore(
    state => [
      state.setIsShowingResults
    ]
  )

  useEffect(() => {
    setIsShowingResults(false)
  }, [])

  return (
    <>
      <main className='title-n-slogan'>
        <h1>Quizzie</h1>
        <h3>
          A simple way to <span>create</span><br />
          your own <span>quizzes.</span>
        </h3>
      </main>
      <MenuQuestion />
      <TransitionRound />
    </>
  )
}
