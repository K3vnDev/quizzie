import { search } from './searchData.js'

export function findMatchedQuizzes(query, allQuizzes) {
  const quizMap = Object.fromEntries(allQuizzes.map(quiz => [quiz.name, quiz]))
  const foundQuizzes = search(query, Object.keys(quizMap))

  return foundQuizzes.map(q => quizMap[q.item])
}
