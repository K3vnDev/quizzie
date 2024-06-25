import '../../index.css'
import './playPage.css'
import { useStore } from '../../store/useStore.js'
import PlayMode from '../../components/PlayMode/PlayMode.jsx'
import Results from '../../components/Results/Results.jsx'
import useRouteClassName from '../../hooks/useRouteClassName.js'
import { usePlayQuiz } from '../../hooks/usePlayQuiz.js'

export default function PlayPage () {
  const isShowingResults = useStore(state => state.isShowingResults)
  const { isLoading } = usePlayQuiz()
  useRouteClassName('play')

  if (isLoading) return

  return isShowingResults
    ? <Results />
    : <PlayMode />
}
