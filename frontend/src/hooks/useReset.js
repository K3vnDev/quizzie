import { useStore } from '../store/useStore'

export default function useReset () {
  const [
    setIsShowingQuestion,
    setIsUnloadingQuestion,
    setIsUnloadingPlayMode,
    setIsShowingResults,
    resetResults
  ] =
  useStore(s => [
    s.setIsShowingQuestion,
    s.setIsUnloadingQuestion,
    s.setIsUnloadingPlayMode,
    s.setIsShowingResults,
    s.resetResults
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

  return { resetPlayMode, resetEditMode }
}
