import { useEffect, useRef, useState } from 'react'
import { colorAndIcon } from '../../services/colorAndIcon.jsx'
import { EditAnswerMenu } from './EditAnswerMenu.jsx'
import { useStore } from '../../store/useStore.js'
import { EditableTextArea } from '../EditableTextArea/EditableTextArea.jsx'

export function EditableAnswer ({ answer, answerIndex, showIcons, questionIndex }) {
  const setAnswerText = useStore(state => state.setAnswerText)
  const { color, icon } = colorAndIcon[answerIndex]
  const { text: answerText } = answer
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
      {showIcons && icon}
      {
        isEditing
          ? <EditableTextArea
              initialText={answerText}
              setIsEditing={setIsEditing}
              handleTextChange={handleTextChange}
              outsideContainerRef={answerBoxRef}
              maxLength={100}
            />
          : <span>{answer.text}</span>
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
