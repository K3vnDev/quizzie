import { useRouteClassName } from './useRouteClassName'

export function useResults({ results }) {
  useRouteClassName('results')

  const isQuestionCorrect = question =>
    question.answers.findIndex(ans => ans.isCorrect && ans.chosen) !== -1

  const questionBoxClassName =
    results.length > 6 ? 'result-questions-box lot' : 'result-questions-box few'

  const score = (() => {
    let count = 0
    results.forEach(q => {
      if (isQuestionCorrect(q)) count++
    })
    return Math.floor((count / results.length) * 100)
  })()

  const numberOfStars = Math.floor(score / 30)

  return { questionBoxClassName, numberOfStars, isQuestionCorrect, score }
}
