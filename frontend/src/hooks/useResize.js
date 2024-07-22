import { useEffect, useState } from 'react'

export function useResize (minWidth) {
  const [value, setValue] = useState(window.innerWidth > minWidth)

  const handleResize = () => {
    setValue(window.innerWidth > minWidth)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return value
}
