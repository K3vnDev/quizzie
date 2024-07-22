import { useEffect, useState } from 'react'

export function useMinWidth (minWidth) {
  const [value, setValue] = useState(document.documentElement.clientWidth > minWidth)

  const handleResize = () => {
    setValue(document.documentElement.clientWidth > minWidth)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return value
}
