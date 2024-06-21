import '../../index.css'
import './playPage.css'
import { useStore } from '../../store/useStore.js'
import PlayMode from '../../components/PlayMode/PlayMode.jsx'
import Results from '../../components/Results/Results.jsx'
import useRouteClassName from '../../hooks/useRouteClassName.js'

export default function PlayPage () {
  const isShowingResults = useStore(state => state.isShowingResults)
  useRouteClassName('play')

  return isShowingResults
    ? <Results />
    : <PlayMode />
}
