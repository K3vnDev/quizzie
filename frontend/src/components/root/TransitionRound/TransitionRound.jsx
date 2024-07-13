import { useEffect } from 'react'
import { useStore } from '../../../store/useStore'
import './transitionRound.css'

export function TransitionRound () {
  const [transitioning, setTransitioning] = useStore(
    state => [
      state.transitioning,
      state.setTransitioning
    ]
  )

  useEffect(() => {
    setTransitioning(false)
  }, [])

  const transitionClassName = transitioning
    ? 'bg-transition-round transitioning'
    : 'bg-transition-round'

  return <div className={transitionClassName} />
}
