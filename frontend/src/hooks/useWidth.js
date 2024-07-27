import { useEffect, useState } from 'react'

export function useWidth (minWidth = 0) {
  const [onMinWidth, setOnMinWidt] = useState(document.documentElement.clientWidth > minWidth)
  const [onVerticalView, setOnVerticalView] = useState(checkVerticalView())

  const handleResize = () => {
    setOnMinWidt(document.documentElement.clientWidth > minWidth)
    setOnVerticalView(checkVerticalView())
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { onMinWidth, onVerticalView }
}

const checkVerticalView = () => {
  return document.documentElement.clientWidth < document.documentElement.clientHeight
}
