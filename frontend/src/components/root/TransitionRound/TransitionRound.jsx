import { useEffect } from 'react'
import { useStore } from '../../../store/useStore'
import './transitionRound.css'
import { useWidth } from '../../../hooks/useWidth'

export function TransitionRound() {
  const { onVerticalView } = useWidth()
  const [transitioning, setTransitioning] = useStore(state => [
    state.transitioning,
    state.setTransitioning
  ])
  useEffect(() => setTransitioning(false), [])

  const transitionClassName = (() => {
    let className = 'bg-transition-round'
    if (transitioning) className += ' transitioning'
    if (onVerticalView) className += ' on-vertical-view'
    return className
  })()

  return <div className={transitionClassName} />
}
