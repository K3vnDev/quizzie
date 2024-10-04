import { useStore } from '../../../store/useStore'
import './questionProgress.css'

export const QuestionProgress = ({ questionIndex }) => {
  const { questions } = useStore(state => state.quiz)

  return (
    <span className='question-progress'>{`Question ${questionIndex + 1} of ${questions.length}`}</span>
  )
}
