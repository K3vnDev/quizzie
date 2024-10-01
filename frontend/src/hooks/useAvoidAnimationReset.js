import { useEffect } from 'react'

export const useAvoidAnimationReset = selector => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      const elements = [...document.querySelectorAll(selector)]

      elements.forEach(element => {
        if (document.hidden) element.style.animationPlayState = 'paused'
        else element.style.animationPlayState = 'running'
      })
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])
}
