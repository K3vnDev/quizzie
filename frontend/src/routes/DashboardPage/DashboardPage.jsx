import '../../index.css'
import './dashboardPage.css'
import useRouteClassName from '../../hooks/useRouteClassName.js'
import { UserQuizzesGrid } from '../../components/UserQuizzesGrid/UserQuizzesGrid.jsx'
import { TransitionRound } from '../../components/TransitionRound/TransitionRound.jsx'
import { DashboardSidebar } from '../../components/DashboardSidebar/DashboardSidebar.jsx'
import { useDashboard } from '../../hooks/useDashboard.js'
import { UserQuizzesHeader } from '../../components/UserQuizzesHeader/UserQuizzesHeader.jsx'

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
