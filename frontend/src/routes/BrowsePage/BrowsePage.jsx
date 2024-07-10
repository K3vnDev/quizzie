import { AppLogo } from '../../components/AppLogo/AppLogo'
import { BrowseQuizzesForm } from '../../components/BrowseQuizzesForm/BrowseQuizzesForm'
import { BrowseQuizzesGrid } from '../../components/BrowseQuizzesGrid/BrowseQuizzesGrid'
import { TransitionRound } from '../../components/TransitionRound/TransitionRound.jsx'
import useRouteClassName from '../../hooks/useRouteClassName'
import './browsePage.css'
import { useBrowse } from '../../hooks/useBrowse.js'

export function BrowsePage () {
  const { input, setInput, quizzes, isFetching } = useBrowse()
  useRouteClassName('browse')

  return (
    <>
      <AppLogo />
      <BrowseQuizzesForm
        isFetching={isFetching}
        setInput={setInput}
        input={input}
      />
      <BrowseQuizzesGrid
        query={input}
        quizzes={quizzes}
      />
      <TransitionRound />
    </>
  )
}
