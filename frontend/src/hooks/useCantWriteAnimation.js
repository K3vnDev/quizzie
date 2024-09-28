import { useState } from 'react'
import { useCooldown } from './useCooldown'

export function useCantWriteAnimation() {
  const [animation, setAnimation] = useState('none')
  const animationTime = 0.25
  const [triggerAnimation] = useCooldown({
    action: () => setAnimation(`not-able-to-keep-writing ${animationTime}s ease both`),
    reset: () => setAnimation('none'),
    cooldown: animationTime * 1000
  })

  return { animation, triggerAnimation }
}
