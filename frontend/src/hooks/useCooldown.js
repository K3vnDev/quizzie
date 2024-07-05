import { useEffect, useRef } from 'react'

export function useCooldown ({ action, reset, cooldown }) {
  const timeout = useRef()
  const waiting = useRef(false)

  useEffect(() => {
    return () => clearTimeout(timeout.current)
  }, [])

  const triggerAction = () => {
    if (!waiting.current) {
      action()
      waiting.current = true

      timeout.current = setTimeout(() => {
        if (reset) reset()
        waiting.current = false
      }, cooldown)
    }
  }

  return triggerAction
}
