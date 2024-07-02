import { useStore } from '../store/useStore'

export default function useReset () {
  const [
    setIsShowingQuestion,
    setIsUnloadingQuestion,
    setIsUnloadingPlayMode,
    setIsShowingResults,
    resetResults,
    setDisabledButtons
  ] =
  useStore(s => [
    s.setIsShowingQuestion,
    s.setIsUnloadingQuestion,
    s.setIsUnloadingPlayMode,
    s.setIsShowingResults,
    s.resetResults,
    s.setDisabledButtons
  ])

  const resetPlayMode = () => {
    setIsShowingQuestion(true)
    setIsUnloadingQuestion(false)
    setIsUnloadingPlayMode(false)
    setIsShowingResults(false)
    resetResults()
  }

  const resetEditMode = () => {
    setIsShowingQuestion(true)
    setIsUnloadingQuestion(false)
    setIsUnloadingPlayMode(false)
    setIsShowingResults(false)
    resetResults()
  }

  const resetDashboard = () => {
    setIsShowingQuestion(true)
    setIsUnloadingQuestion(false)
    setIsUnloadingPlayMode(false)
    setIsShowingResults(false)
    setDisabledButtons(false)
    resetResults()
  }

  return { resetPlayMode, resetEditMode, resetDashboard }
}
