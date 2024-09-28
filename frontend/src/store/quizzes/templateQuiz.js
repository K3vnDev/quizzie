export const templateQuestion = {
  query: 'my question',
  displayMode: 'grid',
  answers: [
    {
      text: 'first answer',
      isCorrect: true
    },
    {
      text: 'second answer',
      isCorrect: false
    }
  ]
}

export const templateQuiz = {
  name: 'My New Quiz',
  config: {
    shuffleQuestions: false,
    shuffleAnswers: true,
    shuffleAnswerColors: false,
    showIcons: true,
    answerTime: 10
  },
  questions: [{ ...templateQuestion }]
}
