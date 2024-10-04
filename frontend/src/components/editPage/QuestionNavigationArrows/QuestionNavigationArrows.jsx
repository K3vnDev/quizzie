import { Left as LeftIcon } from '../../../icons/Left.jsx'
import { Right as RightIcon } from '../../../icons/Rigth.jsx'
import './questionNavigationArrows.css'

export function QuestionNavigationArrows({ children, navigateQuestion, questionIndex }) {
  return (
    <div className='question-navigation-arrows'>
      <button
        className='left'
        onClick={() => navigateQuestion('left')}
        disabled={questionIndex === 0}
      >
        <LeftIcon />
      </button>
      {children}
      <button
        className='right'
        onClick={() => navigateQuestion('right')}
        disabled={questionIndex >= 14}
      >
        <RightIcon />
      </button>
    </div>
  )
}
