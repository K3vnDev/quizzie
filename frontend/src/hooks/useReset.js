import { useStore } from '../store/useStore'

export function useReset () {
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

  return () => {
    setIsShowingQuestion(true)
    setIsUnloadingQuestion(false)
    setIsUnloadingPlayMode(false)
    setIsShowingResults(false)
    resetResults()
  }
}
