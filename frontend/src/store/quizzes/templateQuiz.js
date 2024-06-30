export const templateQuiz = {
  name: 'My Quiz',
  config: {
    shuffleQuestions: false,
    shuffleAnswers: true,
    shuffleAnswerColors: false,
    showIcons: true,
    answerTime: 10
  },
  questions: [
    {
      query: 'Is this an example question?',
      displayMode: 'grid',
      answers: [
        {
          text: 'Yes',
          isCorrect: true
        },
        {
          text: 'No',
          isCorrect: false
        }
      ]
    }
  ]
}
