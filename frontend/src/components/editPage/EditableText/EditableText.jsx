import { useCantWriteAnimation } from '../../../hooks/useCantWriteAnimation.js'
import { useEffect, useRef } from 'react'
import { validateInput } from '../../../services/validateInput.js'
import './editableText.css'

export function EditableText({
  initialText,
  setIsEditing,
  handleTextChange,
  maxLength,
  outsideContainerRef,
  selectOn,
  displayAsTextArea
}) {
  const inputRef = useRef()
  const { animation, triggerAnimation } = useCantWriteAnimation()
  const exitEditMode = () => setIsEditing(false)

  const resizeScroll = setCursor => {
    const input = inputRef.current

    if (displayAsTextArea) {
      input.style.textWrap = 'nowrap'
      input.style.width = '0px'
      input.style.width = input.scrollWidth > 180 ? `${input.scrollWidth + 25}px` : '200px'
      input.style.textWrap = 'wrap'

      input.style.height = '0px'
      input.style.height = `${input.scrollHeight}px`
    } else {
      input.style.width = '0px'
      input.style.width = input.scrollWidth > 40 ? `${input.scrollWidth + 30}px` : '60px'
    }

    if (setCursor) input.setSelectionRange(input.value.length, input.value.length)
  }

  useEditableText({ inputRef, outsideContainerRef, exitEditMode, resizeScroll })

  const handleChange = e => {
    const { value } = e.target
    const newInput = validateInput({ prevInput: initialText, newInput: value, maxLength })
    if (newInput !== initialText) {
      handleTextChange(value.trimStart())
      resizeScroll(false)
    } else triggerAnimation()
  }

  const selectInitialText = () => {
    if (selectOn && selectOn.includes(initialText)) {
      inputRef.current.select()
    }
  }

  useEffect(selectInitialText, [])

  return displayAsTextArea ? (
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
  ) : (
    <input
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

function useEditableText({ inputRef, outsideContainerRef, exitEditMode, resizeScroll }) {
  const firstClick = useRef(true)
  const event = useRef(new Event('editmodeexitfromenterkey', { target: '' }))

  const handleClick = ({ target }) => {
    if (firstClick.current) {
      firstClick.current = false
      return
    }

    if (
      inputRef.current.contains(target) ||
      (outsideContainerRef && outsideContainerRef.current.contains(target))
    ) {
      inputRef.current.focus()
    } else exitEditMode()
  }

  const handleKeyDown = e => {
    if (e.code === 'Enter') {
      e.preventDefault()
      document.dispatchEvent(event.current)
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
