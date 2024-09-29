export const demoQuiz = {
  id: 'demo',
  name: 'Demo Quiz',
  config: {
    shuffleQuestions: true,
    shuffleAnswers: true,
    shuffleAnswerColors: false,
    showIcons: true,
    answerTime: 10
  },
  questions: [
    {
      query: 'What is the capital of the United States?',
      displayMode: 'grid',
      answers: [
        {
          text: 'New York',
          isCorrect: false
        },
        {
          text: 'Washington',
          isCorrect: true
        },
        {
          text: 'Miami',
          isCorrect: false
        },
        {
          text: 'Barrancabermeja',
          isCorrect: false
        }
      ]
    },
    {
      query: 'Which planet is known as the Red Planet?',
      displayMode: 'grid',
      answers: [
        {
          text: 'Earth',
          isCorrect: false
        },
        {
          text: 'Mars',
          isCorrect: true
        },
        {
          text: 'Jupiter',
          isCorrect: false
        },
        {
          text: 'Venus',
          isCorrect: false
        }
      ]
    },
    {
      query: 'What is the chemical symbol for water?',
      displayMode: 'grid',
      answers: [
        {
          text: 'O2',
          isCorrect: false
        },
        {
          text: 'H2O',
          isCorrect: true
        },
        {
          text: 'CO2',
          isCorrect: false
        },
        {
          text: 'NaCl',
          isCorrect: false
        }
      ]
    },
    {
      query: 'Who wrote the play "Romeo and Juliet"?',
      displayMode: 'grid',
      answers: [
        {
          text: 'Mark Twain',
          isCorrect: false
        },
        {
          text: 'Charles Dickens',
          isCorrect: false
        },
        {
          text: 'William Shakespeare',
          isCorrect: true
        },
        {
          text: 'Jane Austen',
          isCorrect: false
        }
      ]
    },
    {
      query: 'Which value is closer to the number Pi?',
      displayMode: 'grid',
      answers: [
        {
          text: '2.71',
          isCorrect: false
        },
        {
          text: '3.14',
          isCorrect: true
        },
        {
          text: '1.61',
          isCorrect: false
        },
        {
          text: '0.69',
          isCorrect: false
        }
      ]
    }
  ]
}
