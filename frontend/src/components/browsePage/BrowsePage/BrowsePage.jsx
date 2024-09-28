import './browsePage.css'
import '../../../index.css'
import { useAppName } from '../../../hooks/useAppName'
import { useBrowse } from '../../../hooks/useBrowse'
import { useRouteClassName } from '../../../hooks/useRouteClassName'
import { TransitionRound } from '../../root/TransitionRound/TransitionRound'
import { BrowseHeader } from '../BrowseHeader/BrowseHeader'
import { BrowseQuizzesForm } from '../BrowseQuizzesForm/BrowseQuizzesForm'
import { BrowseQuizzesGrid } from '../BrowseQuizzesGrid/BrowseQuizzesGrid'

export function BrowsePage() {
  const { input, setInput, quizzes, isFetching, isLoading } = useBrowse()
  useRouteClassName('browse')
  useAppName('Browse Quizzes')

  return (
    <>
      <BrowseHeader />
      <BrowseQuizzesForm isFetching={isFetching} setInput={setInput} input={input} />
      <BrowseQuizzesGrid isLoading={isLoading} quizzes={quizzes} />
      <TransitionRound />
    </>
  )
}
