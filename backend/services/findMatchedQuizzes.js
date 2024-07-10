export function findMatchedQuizzes (query, allQuizzes) {
  query = query.toLowerCase()
  const matchedQuizzes = allQuizzes.filter(quiz => {
    const name = quiz.name.toLowerCase()
    return name.includes(query)
  })
  return matchedQuizzes
}
