import '../../../index.css'
import './dashboardPage.css'
import { useAppName } from '../../../hooks/useAppName.js'
import { useDashboard } from '../../../hooks/useDashboard.js'
import { useRouteClassName } from '../../../hooks/useRouteClassName'
import { TransitionRound } from '../../root/TransitionRound/TransitionRound.jsx'
import { DashboardSidebar } from '../DashboardSidebar/DashboardSidebar.jsx'
import { UserQuizzesGrid } from '../UserQuizzesGrid/UserQuizzesGrid.jsx'
import { UserQuizzesHeader } from '../UserQuizzesHeader/UserQuizzesHeader.jsx'

export function DashboardPage() {
  const { userData, setUserData, deleteMode, setDeleteMode, isLoading } = useDashboard()
  useRouteClassName('dashboard')
  useAppName('My Dashboard')

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
