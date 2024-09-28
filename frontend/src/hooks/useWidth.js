import { useEffect, useState } from 'react'

export function useWidth(minWidth = 0) {
  const [onMinWidth, setOnMinWidth] = useState(getWith() > minWidth)
  const [onVerticalView, setOnVerticalView] = useState(checkVerticalView())
  const [clientWidth, setClientWidth] = useState(getWith())

  const handleResize = () => {
    setOnMinWidth(getWith() > minWidth)
    setOnVerticalView(checkVerticalView())
    setClientWidth(getWith())
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { onMinWidth, onVerticalView, clientWidth }
}

const checkVerticalView = () => {
  return getWith() < document.documentElement.clientHeight
}
const getWith = () => document.documentElement.clientWidth
