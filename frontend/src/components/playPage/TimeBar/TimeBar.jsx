import { useStore } from '../../../store/useStore'
import './timeBar.css'

export function TimeBar({ time, wait, paused }) {
  const isShowingQuestion = useStore(state => state.isShowingQuestion)
  const isUnloadingPlayMode = useStore(state => state.isUnloadingPlayMode)

  const className = isUnloadingPlayMode ? 'time-bar-wrapper unloading' : 'time-bar-wrapper'

  return (
    <div className={className}>
      {isShowingQuestion && (
        <div
          className='time-bar'
          style={{
            animation: `time-bar ${time}s linear ${wait}s both`,
            animationPlayState: paused ? 'paused' : 'running'
          }}
        />
      )}
    </div>
  )
}
