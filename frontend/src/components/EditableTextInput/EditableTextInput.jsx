import { useRef } from 'react'
import { useEditableText } from '../../hooks/useEditableText'

export function EditableTextInput ({ initialText, maxLength, setIsEditing, handleTextChange }) {
  const inputRef = useRef()

  const exitEditMode = () => setIsEditing(false)

  const resizeScroll = () => {
    const input = inputRef.current

    input.style.width = '0px'
    input.style.width = input.scrollWidth > 40
      ? `${input.scrollWidth + 25}px`
      : '60px'
  }

  useEditableText({ inputRef, exitEditMode, resizeScroll })

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
    resizeScroll()
  }

  return (
    <input
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
