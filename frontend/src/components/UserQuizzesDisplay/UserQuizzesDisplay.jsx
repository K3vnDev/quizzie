import { Add as AddIcon } from '../../icons/Add.jsx'
import './userQuizzesDisplay.css'
import { LocalQuiz } from './LocalQuiz.jsx'

export function UserQuizzesDisplay ({ quizzes }) {
  return (
    <section className='user-quizzes-display grid'>
      <CreateNewQuizButton />
      <LocalQuiz />
      {
        // quizzes.map()
      }
    </section>
  )
}

const CreateNewQuizButton = () => {
  return (
    <button className='create-new-quiz-btn'>
      <AddIcon />
    </button>
  )
}

export const UserQuiz = ({ quiz }) => {
  return (
    <div className='user-quiz'>
      {quiz.name}
    </div>
  )
}
