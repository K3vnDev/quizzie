import { useEffect, useRef, useState } from 'react'
import { colorAndIcon } from '../../services/colorAndIcon.jsx'
import { EditAnswerMenu } from './EditAnswerMenu.jsx'
import { useStore } from '../../store/useStore.js'
import { EditableTextArea } from '../EditableText/EditableText.jsx'
import { Checkbox as CheckboxIcon } from '../../icons/Checkbox.jsx'
import { Cross as CrossIcon } from '../../icons/Cross.jsx'

export function EditableAnswer ({ answer, answerIndex, showIcons, questionIndex }) {
  const setAnswerText = useStore(state => state.setAnswerText)
  const { color } = colorAndIcon[answerIndex]
  const { text: answerText, isCorrect } = answer
  const [isEditing, setIsEditing] = useState(answerText === '')
  const [canShowMenu, setCanShowMenu] = useState(true)
  const deleteAnswer = useStore(state => state.deleteAnswer)
  const answerBoxRef = useRef()
  const timeout = useRef()

  useEffect(() => {
    if (answerText === '' && !isEditing) deleteAnswer(questionIndex, answerIndex)
  })

  useEffect(() => {
    const handleEnterKey = () => {
      const isHovering = answerBoxRef.current.matches(':hover')
      setCanShowMenu(!isHovering)

      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        setCanShowMenu(true)
      }, 1000)
    }
    const handleMouseLeave = () => setCanShowMenu(true)

    document.addEventListener('editmodeexitfromenterkey', handleEnterKey)
    answerBoxRef.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('editmodeexitfromenterkey', handleEnterKey)
      if (answerBoxRef.current) answerBoxRef.current.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timeout.current)
    }
  }, [])

  const icon = isCorrect
    ? <CheckboxIcon />
    : <CrossIcon />

  const style = {
    '--bg-color': color,
    '--bg-color-st': color + 80
  }

  const handleTextChange = text => {
    setAnswerText(text, questionIndex, answerIndex)
  }

  if (isEditing) {
    return (
      <div
        className='edit-answer-box'
        style={style}
        ref={answerBoxRef}
      >
        {icon}
        <EditableTextArea
          initialText={answerText}
          setIsEditing={setIsEditing}
          handleTextChange={handleTextChange}
          outsideContainerRef={answerBoxRef}
          selectOn={['first answer', 'second answer']}
          maxLength={50}
        />
      </div>
    )
  }

  return (
    <div
      className='edit-answer-box'
      style={style}
      ref={answerBoxRef}
    >
      {icon}
      <span>{answerText}</span>
      {
        canShowMenu &&
          <EditAnswerMenu
            setEditingText={setIsEditing}
            questionIndex={questionIndex}
            answerIndex={answerIndex}
          />
      }
    </div>
  )
}
