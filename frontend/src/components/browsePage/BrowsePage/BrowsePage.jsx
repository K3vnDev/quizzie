import './browsePage.css'
import '../../../index.css'
import { useRouteClassName } from '../../../hooks/useRouteClassName'
import { AppLogo } from '../../root/AppLogo/AppLogo'
import { TransitionRound } from '../../root/TransitionRound/TransitionRound'
import { BrowseQuizzesForm } from '../BrowseQuizzesForm/BrowseQuizzesForm'
import { useBrowse } from '../../../hooks/useBrowse'
import { BrowseQuizzesGrid } from '../BrowseQuizzesGrid/BrowseQuizzesGrid'

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
