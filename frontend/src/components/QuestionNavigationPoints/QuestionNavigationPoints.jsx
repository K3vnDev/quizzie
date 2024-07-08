import { useStore } from '../../store/useStore'
import './questionNavigationPoints.css'

export function QuestionNavigationPoints ({ navigateQuestion, questionIndex }) {
  const { questions } = useStore(state => state.quiz)

  return (
    <div className='question-navigation-points'>
      {
        questions.map((question, index) => (
          <NavigationPoint
            navigateQuestion={navigateQuestion}
            questionIndex={questionIndex}
            index={index}
            key={index}
          />
        ))
      }
    </div>
  )
}

const NavigationPoint = ({ navigateQuestion, questionIndex, index }) => {
  const handleClick = () => {
    navigateQuestion(index)
  }

  const className = questionIndex === index
    ? 'navigation-point selected'
    : 'navigation-point'

  return (
    <button
      className={className}
      onClick={handleClick}
    />
  )
}
