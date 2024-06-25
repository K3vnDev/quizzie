import { useEditableText } from '../../hooks/useEditableText'
import { useRef } from 'react'

export function EditableTextArea ({ initialText, setIsEditing, handleTextChange, maxLength, outsideContainerRef }) {
  const inputRef = useRef()

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

  useEditableText({ inputRef, outsideContainerRef, exitEditMode, resizeScroll })

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
