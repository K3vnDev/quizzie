import { useEffect, useRef, useState } from 'react'

export function useCooldown({ action, reset, cooldown }) {
  const [waiting, setWaiting] = useState(false)
  const timeout = useRef()

  useEffect(() => () => clearTimeout(timeout.current), [])

  const triggerAction = () => {
    if (waiting) return

    action()
    setWaiting(true)

    timeout.current = setTimeout(() => {
      if (reset) reset()
      setWaiting(false)
    }, cooldown)
  }

  return [triggerAction, waiting]
}
