import { AppLogo } from '../../components/AppLogo/AppLogo'
import { BrowseQuizzesForm } from '../../components/BrowseQuizzesForm/BrowseQuizzesForm'
import { BrowseQuizzesGrid } from '../../components/BrowseQuizzesGrid/BrowseQuizzesGrid'
import { TransitionRound } from '../../components/TransitionRound/TransitionRound.jsx'
import useRouteClassName from '../../hooks/useRouteClassName'
import './browsePage.css'

export function BrowsePage () {
  useRouteClassName('browse')

  return (
    <>
      <AppLogo />
      <BrowseQuizzesForm />
      <BrowseQuizzesGrid />
      <TransitionRound />
    </>
  )
}
