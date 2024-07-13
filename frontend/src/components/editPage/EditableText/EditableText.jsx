import { useEditableText } from '../../../hooks/useEditableText'
import { useCantWriteAnimation } from '../../../hooks/useCantWriteAnimation.js'
import { useEffect, useRef } from 'react'
import { validateInput } from '../../../services/validateInput.js'
import './editableText.css'

export function EditableTextArea ({ initialText, setIsEditing, handleTextChange, maxLength, outsideContainerRef, selectOn }) {
  const inputRef = useRef()
  const { animation, triggerAnimation } = useCantWriteAnimation()
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
    const newInput = validateInput({ prevInput: initialText, newInput: value, maxLength })
    if (newInput !== initialText) {
      handleTextChange(value.trimStart())
      resizeScroll()
    } else triggerAnimation()
  }

  const selectInitialText = () => {
    if (selectOn && selectOn.includes(initialText)) {
      inputRef.current.select()
    }
  }

  useEffect(selectInitialText, [])

  return (
    <textarea
      type='text'
      value={initialText}
      onChange={handleChange}
      onFocus={selectInitialText}
      style={{
        overflow: 'hidden',
        resize: 'none',
        boxShadow: 'none',
        animation
      }}
      ref={inputRef}
    />
  )
}

export function EditableTextInput ({ initialText, maxLength, setIsEditing, handleTextChange }) {
  const inputRef = useRef()
  const { animation, triggerAnimation } = useCantWriteAnimation()
  const exitEditMode = () => setIsEditing(false)

  const resizeScroll = () => {
    const input = inputRef.current

    input.style.width = '0px'
    input.style.width = input.scrollWidth > 40
      ? `${input.scrollWidth + 30}px`
      : '60px'
  }

  useEditableText({ inputRef, exitEditMode, resizeScroll })

  const handleChange = e => {
    const { value } = e.target
    const newInput = validateInput({ prevInput: initialText, newInput: value, maxLength })
    if (newInput !== initialText) {
      handleTextChange(value.trimStart())
      resizeScroll()
    } else triggerAnimation()
  }

  return (
    <input
      type='text'
      value={initialText}
      onChange={handleChange}
      style={{
        overflow: 'hidden',
        resize: 'none',
        boxShadow: 'none',
        animation
      }}
      ref={inputRef}
    />
  )
}
