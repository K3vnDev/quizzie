import { useEffect, useRef } from 'react'

const event = new Event('editmodeexitfromenterkey', { target: 'hola' })
export function useEditableText ({ inputRef, outsideContainerRef, exitEditMode, resizeScroll }) {
  const firstClick = useRef(true)

  const handleClick = ({ target }) => {
    if (firstClick.current) {
      firstClick.current = false
      return
    }

    if (
      inputRef.current.contains(target) ||
      (outsideContainerRef &&
      outsideContainerRef.current.contains(target))
    ) {
      inputRef.current.focus()
    } else exitEditMode()
  }

  const handleKeyDown = e => {
    if (e.code === 'Enter') {
      e.preventDefault()
      document.dispatchEvent(event)
      exitEditMode()
    }
  }

  useEffect(() => {
    inputRef.current.focus()
    resizeScroll(true)
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}
