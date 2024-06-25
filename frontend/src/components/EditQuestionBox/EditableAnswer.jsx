import { useEffect, useRef, useState } from 'react'
import { colorAndIcon } from '../../services/colorAndIcon.jsx'
import { EditAnswerMenu } from './EditAnswerMenu.jsx'
import { useStore } from '../../store/useStore.js'

export function EditableAnswer ({ answer, answerIndex, showIcons, questionIndex }) {
  const { color, icon } = colorAndIcon[answerIndex]
  const { text: answerText } = answer
  const [editingText, setEditingText] = useState(answerText === '')
  const deleteAnswer = useStore(state => state.deleteAnswer)
  const answerBoxRef = useRef()
  const style = {
    '--bg-color': color,
    '--bg-color-st': color + 80,
    padding: '26px 28px 26px 16px' // Make conditional
  }

  useEffect(() => {
    if (answerText === '' && !editingText) {
      deleteAnswer(questionIndex, answerIndex)
    }
  })

  return (
    <div
      className='edit-answer-box'
      style={style}
      ref={answerBoxRef}
    >
      {showIcons && icon}
      {
        editingText
          ? <TextInput
              text={answerText}
              answerBoxRef={answerBoxRef}
              setEditingText={setEditingText}
              answerIndex={answerIndex}
              questionIndex={questionIndex}
            />
          : <span>{answer.text}</span>
      }
      {
        !editingText &&
          <EditAnswerMenu
            setEditingText={setEditingText}
            questionIndex={questionIndex}
            answerIndex={answerIndex}
          />
      }
    </div>
  )
}

const TextInput = ({ text, answerBoxRef, setEditingText, answerIndex, questionIndex }) => {
  const setAnswerText = useStore(state => state.setAnswerText)
  const inputRef = useRef()
  const firstClick = useRef(true)

  const handleExitEditMode = () => {
    setEditingText(false)
  }

  const handleClick = ({ target }) => {
    if (!answerBoxRef.current.contains(target) && !firstClick.current) {
      handleExitEditMode()
    } else {
      inputRef.current.focus()
    }
    firstClick.current = false
  }

  const resizeScroll = (setCursor) => {
    const textarea = inputRef.current

    textarea.style.textWrap = 'nowrap'
    textarea.style.width = '0px'
    textarea.style.width = textarea.scrollWidth > 170
      ? `${textarea.scrollWidth + 25}px`
      : '190px'
    textarea.style.textWrap = 'wrap'

    textarea.style.height = '0px'
    textarea.style.height = `${textarea.scrollHeight}px`

    if (setCursor) {
      textarea.setSelectionRange(textarea.value.length, textarea.value.length)
    }
  }

  const handleKeyDown = e => {
    if (e.code === 'Enter') {
      e.preventDefault()
      handleExitEditMode()
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

  const handleChange = e => {
    const { value } = e.target
    if (inputRef.current.scrollHeight > 120 && value.length > text.length) return
    if (value.slice(-2) === '  ') return

    setAnswerText(value.trimStart(), questionIndex, answerIndex)
    resizeScroll(false)
  }

  return (
    <textarea
      type='text'
      ref={inputRef}
      value={text}
      onChange={handleChange}
    />
  )
}
