import { useEffect, useRef, useState } from 'react'
import { colorAndIcon } from '../../services/colorAndIcon.jsx'
import { EditAnswerMenu } from './EditAnswerMenu.jsx'
import { useStore } from '../../store/useStore.js'
import { EditableTextArea } from '../EditableTextArea/EditableTextArea.jsx'
import { Checkbox as CheckboxIcon } from '../../icons/Checkbox.jsx'
import { Cross as CrossIcon } from '../../icons/Cross.jsx'

export function EditableAnswer ({ answer, answerIndex, showIcons, questionIndex }) {
  const setAnswerText = useStore(state => state.setAnswerText)
  const { color } = colorAndIcon[answerIndex]
  const { text: answerText, isCorrect } = answer
  const [isEditing, setIsEditing] = useState(answerText === '')
  const deleteAnswer = useStore(state => state.deleteAnswer)
  const answerBoxRef = useRef()

  useEffect(() => {
    if (answerText === '' && !isEditing) {
      deleteAnswer(questionIndex, answerIndex)
    }
  })

  const style = {
    '--bg-color': color,
    '--bg-color-st': color + 80
  }

  const handleTextChange = text => {
    setAnswerText(text, questionIndex, answerIndex)
  }

  return (
    <div
      className='edit-answer-box'
      style={style}
      ref={answerBoxRef}
    >
      {
        isCorrect
          ? <CheckboxIcon />
          : <CrossIcon />
      }
      {
        isEditing
          ? <EditableTextArea
              initialText={answerText}
              setIsEditing={setIsEditing}
              handleTextChange={handleTextChange}
              outsideContainerRef={answerBoxRef}
              maxLength={50}
            />
          : <span>{answerText}</span>
      }
      {
        !isEditing &&
          <EditAnswerMenu
            setEditingText={setIsEditing}
            questionIndex={questionIndex}
            answerIndex={answerIndex}
          />
      }
    </div>
  )
}
