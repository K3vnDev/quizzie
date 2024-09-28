import { useEffect, useState } from 'react'
import { useStore } from '../../../store/useStore'
import { randomElement } from '../../../services/randomElement'
import './questionAnswerMessage.css'

export function QuestionAnswerMessage() {
  const questionAnsweredMessage = useStore(state => state.questionAnsweredMessage)
  const [message, setMessage] = useState('')

  const red = '#b85e67'
  const green = '#5eb86e'
  const opacity = '0a'

  useEffect(() => {
    setMessage(() => {
      switch (questionAnsweredMessage) {
        case 'timeout':
          return randomElement('Time out!', 'Too slow!', 'Out of time!')
        case 'correct':
          return randomElement(
            'Correct!',
            'Great!',
            'Excellent!',
            'Well done!',
            'Nice!',
            'Good job!',
            'Right!',
            'Yep!',
            'Exactly!'
          )
        case 'incorrect':
          return randomElement(
            'Incorrect!',
            'Bad!',
            'Wrong!',
            'Nope!',
            'Not quite!',
            'Uh-oh!',
            'Oops!',
            'Missed it!',
            'Sorry!'
          )
      }
    })
  }, [questionAnsweredMessage])

  if (!questionAnsweredMessage) return

  return (
    <span
      className='question-answer-message'
      style={
        questionAnsweredMessage === 'correct'
          ? { '--qm-color': green, '--qm-color-st': green + opacity }
          : { '--qm-color': red, '--qm-color-st': red + opacity }
      }
    >
      {message}
    </span>
  )
}
