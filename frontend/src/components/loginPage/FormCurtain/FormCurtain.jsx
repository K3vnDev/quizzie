import { useEffect, useRef, useState } from 'react'
import './formCurtain.css'
import { useCooldown } from '../../../hooks/useCooldown'
import { useDebounce } from '../../../hooks/useDebounce'
import { useStore } from '../../../store/useStore'
import { useWidth } from '../../../hooks/useWidth'

export function FormCurtain ({ showing, setShowing }) {
  const [animation, setAnimation] = useState('')
  const firstRender = useRef(true)
  const animationTime = 1.2

  const [triggerAction] = useCooldown({
    action: () =>
      setAnimation(`transition-to-${showing} ${animationTime}s ease-in-out both`),
    cooldown: animationTime * 1000
  })

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    triggerAction()
  }, [showing])

  const toggleShowing = () => {
    setShowing(s => showing === 'login' ? 'sign-up' : 'login')
  }

  return (
    <div
      className='form-curtain'
      style={{ animation }}
    >
      <InnerContent
        toggleShowing={toggleShowing}
        animationTime={animationTime}
        showing={showing}
      />
    </div>
  )
}

const InnerContent = ({ showing, toggleShowing, animationTime }) => {
  const [animation, setAnimation] = useState('')
  const setFormTransitionating = useStore(state => state.setFormTransitionating)
  const { onMinWidth: hideShortMessages } = useWidth(1000)

  const [triggerAction, transitioning] = useCooldown({
    action: () => setAnimation(`transition-inner-content ${animationTime}s ease both`),
    reset: () => setAnimation(''),
    cooldown: animationTime * 1000
  })

  useEffect(() => {
    setFormTransitionating(transitioning)
  }, [transitioning])

  const { title, button } = (() => {
    return hideShortMessages
      ? showing === 'login'
        ? { title: 'New on Quizzie?', button: 'Create an account' }
        : { title: 'Been here before?', button: 'Login to your account' }
      : showing === 'login'
        ? { title: 'New Here?', button: 'Sign up' }
        : { title: 'Been Here?', button: 'Login' }
  })()

  const delayedTitle = useDebounce(title, animationTime * 500)
  const delayedButton = useDebounce(button, animationTime * 500)

  const handleClick = async () => {
    toggleShowing()
    triggerAction()
  }

  return (
    <div style={{ animation }}>
      <h4>{delayedTitle}</h4>
      <button
        onClick={handleClick}
        disabled={transitioning}
      >
        {delayedButton}
      </button>
    </div>
  )
}
