import { useStore } from '../../../store/useStore.js'
import './questionNavigationPoints.css'

export function QuestionNavigationPoints({ navigateQuestion, questionIndex }) {
  const { questions } = useStore(state => state.quiz)

  return (
    <div className='question-navigation-points'>
      {questions.map((question, index) => (
        <NavigationPoint
          navigateQuestion={navigateQuestion}
          questionIndex={questionIndex}
          question={question}
          index={index}
          key={index}
        />
      ))}
    </div>
  )
}

const NavigationPoint = ({ navigateQuestion, question, questionIndex, index }) => {
  const isInvalid = question.answers.every(ans => !ans.isCorrect)
  const selected = questionIndex === index

  const className = (() => {
    let val = 'navigation-point'
    if (selected) val += ' selected'
    if (isInvalid) val += ' invalid'
    return val
  })()

  return <button className={className} onClick={() => navigateQuestion(index)} />
}
