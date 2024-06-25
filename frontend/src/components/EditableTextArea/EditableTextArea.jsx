import { useEffect, useRef } from 'react'

export function EditableTextArea ({ initialText, setIsEditing, handleTextChange, maxLength, outsideContainerRef }) {
  const inputRef = useRef()
  const firstClick = useRef(true)

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

  const exitEditMode = () => setIsEditing(false)

  const resizeScroll = setCursor => {
    const textarea = inputRef.current

    textarea.style.textWrap = 'nowrap'
    textarea.style.width = '0px'
    textarea.style.width = textarea.scrollWidth > 180
      ? `${textarea.scrollWidth + 25}px`
      : '200px'
    textarea.style.textWrap = 'wrap'

    textarea.style.height = '0px'
    textarea.style.height = `${textarea.scrollHeight}px`

    if (setCursor) textarea.setSelectionRange(textarea.value.length, textarea.value.length)
  }

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
      exitEditMode()
    }
  }

  const handleChange = e => {
    const { value } = e.target
    if (
      (value.length > maxLength &&
      value.length >= initialText.length) ||
      value.slice(-2) === '  '
    ) {
      return
    }

    handleTextChange(value.trimStart())
    resizeScroll(false)
  }

  return (
    <textarea
      type='text'
      value={initialText}
      onChange={handleChange}
      style={{
        overflow: 'hidden',
        resize: 'none'
      }}
      ref={inputRef}
    />
  )
}
