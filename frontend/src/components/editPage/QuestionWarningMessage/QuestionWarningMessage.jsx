import { Warning as WarningIcon } from '../../../icons/Warning.jsx'
import './questionWarningMessage.css'

export function QuestionWarningMessage ({ answers }) {
  const noCorrectAnswer = answers.every(ans => !ans.isCorrect)
  const fewAnswers = answers.length < 2

  const message = (() => {
    if (fewAnswers) return 'There are less than two answers'
    else if (noCorrectAnswer) return 'No answer is marked as correct'
    else return ''
  })()

  if (message) {
    return (
      <div className='question-warning-message'>
        <WarningIcon />
        <span>{message}</span>
      </div>
    )
  }
}
