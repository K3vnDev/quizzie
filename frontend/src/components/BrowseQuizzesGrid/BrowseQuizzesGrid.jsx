import './browseQuizzesGrid.css'
import { BrowseQuiz } from '../BrowseQuiz/BrowseQuiz.jsx'

export function BrowseQuizzesGrid ({ query, quizzes }) {
  if (quizzes.length === 0) return

  return (
    <section className='browse-quizzes-grid'>
      {
        quizzes.map(quiz => (
          <BrowseQuiz key={quiz.id} quiz={quiz} />
        ))
      }
    </section>
  )
}
