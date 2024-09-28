import './browseQuizzesGrid.css'
import { BrowseQuiz } from '../BrowseQuiz/BrowseQuiz.jsx'

export function BrowseQuizzesGrid({ quizzes, isLoading }) {
  if (isLoading) return <QuizzesPreview />

  return quizzes.length > 0 ? (
    <section className='browse-quizzes-grid'>
      {quizzes.map(quiz => (
        <BrowseQuiz key={quiz.id} quiz={quiz} />
      ))}
    </section>
  ) : (
    <h5 className='browse-quizzes-message'>No quizzes found</h5>
  )
}

const QuizzesPreview = () => {
  const quizzesPreview = Array(5).fill({})

  return (
    <section className='browse-quizzes-grid'>
      {quizzesPreview.map((_, i) => (
        <div className='browse-quiz loading' key={i} />
      ))}
    </section>
  )
}
