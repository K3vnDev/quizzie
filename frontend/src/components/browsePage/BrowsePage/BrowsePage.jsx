import './browsePage.css'
import '../../../index.css'
import { useRouteClassName } from '../../../hooks/useRouteClassName'
import { TransitionRound } from '../../root/TransitionRound/TransitionRound'
import { BrowseQuizzesForm } from '../BrowseQuizzesForm/BrowseQuizzesForm'
import { useBrowse } from '../../../hooks/useBrowse'
import { BrowseQuizzesGrid } from '../BrowseQuizzesGrid/BrowseQuizzesGrid'
import { BrowseHeader } from '../BrowseHeader/BrowseHeader'

export function BrowsePage () {
  const { input, setInput, quizzes, isFetching, isLoading } = useBrowse()
  useRouteClassName('browse')

  return (
    <>
      <BrowseHeader />
      <BrowseQuizzesForm
        isFetching={isFetching}
        setInput={setInput}
        input={input}
      />
      <BrowseQuizzesGrid
        isLoading={isLoading}
        quizzes={quizzes}
      />
      <TransitionRound />
    </>
  )
}
