export const demoQuiz = {
  id: 'demo',
  name: 'Demo Quiz',
  config: {
    shuffleQuestions: false,
    shufleAnswers: true,
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
      query: "Who wrote the play 'Romeo and Juliet'?",
      displayMode: 'list',
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
      query: 'Which element has the atomic number 1?',
      displayMode: 'grid',
      answers: [
        {
          text: 'Helium',
          isCorrect: false
        },
        {
          text: 'Hydrogen',
          isCorrect: true
        },
        {
          text: 'Oxygen',
          isCorrect: false
        },
        {
          text: 'Carbon',
          isCorrect: false
        }
      ]
    }
  ]
}

// export const demoQuiz = {
//   id: 'extended',
//   name: 'Extended Quiz',
//   config: {
//     shuffleQuestions: false,
//     shuffleAnswers: true,
//     shuffleAnswerColors: false,
//     showIcons: true,
//     answerTime: 10
//   },
//   questions: [
//     {
//       query: 'What is the largest planet in our solar system?',
//       displayMode: 'grid',
//       answers: [
//         {
//           text: 'Earth',
//           isCorrect: false
//         },
//         {
//           text: 'Jupiter',
//           isCorrect: true
//         },
//         {
//           text: 'Saturn',
//           isCorrect: false
//         },
//         {
//           text: 'Mars',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'Which continent is known as the "Dark Continent"?',
//       displayMode: 'grid',
//       answers: [
//         {
//           text: 'Asia',
//           isCorrect: false
//         },
//         {
//           text: 'Africa',
//           isCorrect: true
//         },
//         {
//           text: 'South America',
//           isCorrect: false
//         },
//         {
//           text: 'Europe',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'What is the capital city of Japan?',
//       displayMode: 'grid',
//       answers: [
//         {
//           text: 'Beijing',
//           isCorrect: false
//         },
//         {
//           text: 'Seoul',
//           isCorrect: false
//         },
//         {
//           text: 'Tokyo',
//           isCorrect: true
//         },
//         {
//           text: 'Bangkok',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'Who is known as the "Father of Computers"?',
//       displayMode: 'grid',
//       answers: [
//         {
//           text: 'Albert Einstein',
//           isCorrect: false
//         },
//         {
//           text: 'Isaac Newton',
//           isCorrect: false
//         },
//         {
//           text: 'Charles Babbage',
//           isCorrect: true
//         },
//         {
//           text: 'Alan Turing',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'What is the square root of 64?',
//       displayMode: 'grid',
//       answers: [
//         {
//           text: '6',
//           isCorrect: false
//         },
//         {
//           text: '8',
//           isCorrect: true
//         },
//         {
//           text: '10',
//           isCorrect: false
//         },
//         {
//           text: '12',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'Who painted the "Mona Lisa"?',
//       displayMode: 'list',
//       answers: [
//         {
//           text: 'Vincent van Gogh',
//           isCorrect: false
//         },
//         {
//           text: 'Pablo Picasso',
//           isCorrect: false
//         },
//         {
//           text: 'Leonardo da Vinci',
//           isCorrect: true
//         },
//         {
//           text: 'Claude Monet',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'What is the chemical symbol for gold?',
//       displayMode: 'grid',
//       answers: [
//         {
//           text: 'Ag',
//           isCorrect: false
//         },
//         {
//           text: 'Au',
//           isCorrect: true
//         },
//         {
//           text: 'Pb',
//           isCorrect: false
//         },
//         {
//           text: 'Fe',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'Which organ is responsible for pumping blood throughout the human body?',
//       displayMode: 'grid',
//       answers: [
//         {
//           text: 'Liver',
//           isCorrect: false
//         },
//         {
//           text: 'Lungs',
//           isCorrect: false
//         },
//         {
//           text: 'Heart',
//           isCorrect: true
//         },
//         {
//           text: 'Kidneys',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'What is the main ingredient in guacamole?',
//       displayMode: 'grid',
//       answers: [
//         {
//           text: 'Tomato',
//           isCorrect: false
//         },
//         {
//           text: 'Avocado',
//           isCorrect: true
//         },
//         {
//           text: 'Onion',
//           isCorrect: false
//         },
//         {
//           text: 'Pepper',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'Who wrote the novel "1984"?',
//       displayMode: 'list',
//       answers: [
//         {
//           text: 'Aldous Huxley',
//           isCorrect: false
//         },
//         {
//           text: 'George Orwell',
//           isCorrect: true
//         },
//         {
//           text: 'F. Scott Fitzgerald',
//           isCorrect: false
//         },
//         {
//           text: 'J.K. Rowling',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'What gas do plants absorb from the atmosphere?',
//       displayMode: 'grid',
//       answers: [
//         {
//           text: 'Oxygen',
//           isCorrect: false
//         },
//         {
//           text: 'Nitrogen',
//           isCorrect: false
//         },
//         {
//           text: 'Carbon Dioxide',
//           isCorrect: true
//         },
//         {
//           text: 'Helium',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'Which country is the largest by land area?',
//       displayMode: 'grid',
//       answers: [
//         {
//           text: 'United States',
//           isCorrect: false
//         },
//         {
//           text: 'China',
//           isCorrect: false
//         },
//         {
//           text: 'Russia',
//           isCorrect: true
//         },
//         {
//           text: 'Canada',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'Who discovered penicillin?',
//       displayMode: 'list',
//       answers: [
//         {
//           text: 'Marie Curie',
//           isCorrect: false
//         },
//         {
//           text: 'Alexander Fleming',
//           isCorrect: true
//         },
//         {
//           text: 'Louis Pasteur',
//           isCorrect: false
//         },
//         {
//           text: 'Gregor Mendel',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'What is the smallest prime number?',
//       displayMode: 'grid',
//       answers: [
//         {
//           text: '0',
//           isCorrect: false
//         },
//         {
//           text: '1',
//           isCorrect: false
//         },
//         {
//           text: '2',
//           isCorrect: true
//         },
//         {
//           text: '3',
//           isCorrect: false
//         }
//       ]
//     },
//     {
//       query: 'In which year did the Titanic sink?',
//       displayMode: 'grid',
//       answers: [
//         {
//           text: '1905',
//           isCorrect: false
//         },
//         {
//           text: '1912',
//           isCorrect: true
//         },
//         {
//           text: '1918',
//           isCorrect: false
//         },
//         {
//           text: '1925',
//           isCorrect: false
//         }
//       ]
//     }
//   ]
// }
