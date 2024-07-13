import '../../../index.css'
import './dashboardPage.css'
import { useDashboard } from '../../../hooks/useDashboard.js'
import { useRouteClassName } from '../../../hooks/useRouteClassName'
import { UserQuizzesHeader } from '../UserQuizzesHeader/UserQuizzesHeader.jsx'
import { DashboardSidebar } from '../DashboardSidebar/DashboardSidebar.jsx'
import { UserQuizzesGrid } from '../UserQuizzesGrid/UserQuizzesGrid.jsx'
import { TransitionRound } from '../../root/TransitionRound/TransitionRound.jsx'

export function DashboardPage () {
  const { userData, setUserData, deleteMode, setDeleteMode, isLoading } = useDashboard()
  useRouteClassName('dashboard')

  return (
    <>
      <DashboardSidebar
        userData={userData}
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
        isLoading={isLoading}
      />
      <main>
        <UserQuizzesHeader
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
          isLoading={isLoading}
        />
        <UserQuizzesGrid
          quizzes={userData.quizzes}
          deleteMode={deleteMode}
          setUserData={setUserData}
          isLoading={isLoading}
        />
      </main>
      <TransitionRound />
    </>
  )
}
