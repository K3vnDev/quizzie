import { create } from 'zustand'
import { newQuiz } from './quizes/newQuiz.js'
import { demoQuiz } from './quizes/demoQuiz.js'

const testQuiz = {
  name: 'Quiz de prueba',
  config: {
    shuffleQuestions: false,
    shuffleAnswers: true,
    shuffleAnswerColors: false,
    showIcons: true,
    answerTime: 1800
  },
  questions: [{
    query: 'What is the main ingredient in traditional Japanese miso soup?',
    displayMode: 'grid',
    answers: [
      {
        text: 'Rice',
        isCorrect: false
      },
      {
        text: 'Tofu',
        isCorrect: false
      },
      {
        text: 'Soup',
        isCorrect: false
      },
      {
        text: 'Miso paste',
        isCorrect: true
      }
    ]
  }]
}

export const useStore = create((set, get) => ({

  // Quiz

  quiz: null,
  setQuiz: value => set(() => ({ quiz: value })),

  setQuizName: value => set(state => {
    const newQuiz = structuredClone(state.quiz)
    newQuiz.name = value
    return { quiz: newQuiz }
  }),

  setAnswerText: (value, questionIndex, answerIndex) => set(state => {
    const newQuiz = structuredClone(state.quiz)
    newQuiz.questions[questionIndex].answers[answerIndex].text = value
    return { quiz: newQuiz }
  }),
  addAnswer: (questionIndex) => set(state => {
    const newQuiz = structuredClone(state.quiz)
    const prevAnswers = newQuiz.questions[questionIndex].answers
    const newAnswers = [...prevAnswers, { text: '', isCorrect: false }]
    newQuiz.questions[questionIndex].answers = newAnswers
    return prevAnswers.length < 4
      ? { quiz: newQuiz }
      : { quiz: state.quiz }
  }),
  deleteAnswer: (questionIndex, answerIndex) => set(state => {
    const newQuiz = structuredClone(state.quiz)
    const newAnswers = newQuiz.questions[questionIndex].answers
    newAnswers.splice(answerIndex, 1)
    newQuiz.questions[questionIndex].answers = newAnswers
    return { quiz: newQuiz }
  }),

  setQuestionQuery: (value, questionIndex) => set(state => {
    const newQuiz = structuredClone(state.quiz)
    newQuiz.questions[questionIndex].query = value
    return { quiz: newQuiz }
  }),

  transitioning: false,
  setTransitioning: value => set(() => ({ transitioning: value })),

  // Play Mode

  isShowingQuestion: false,
  setIsShowingQuestion: value => set(() => ({ isShowingQuestion: value })),

  isUnloadingQuestion: false,
  setIsUnloadingQuestion: value => set(() => ({ isUnloadingQuestion: value })),

  disabledButtons: false,
  setDisabledButtons: value => set(() => ({ disabledButtons: value })),

  questionAnsweredMessage: null,
  hideQuestionAnsweredMessage: () => set(() => ({ questionAnsweredMessage: null })),
  showQuestionAnsweredMessage: value => set(() => {
    setTimeout(() => {
      const { hideQuestionAnsweredMessage } = get()
      get(() => {})
      hideQuestionAnsweredMessage()
    }, 1000)
    return { questionAnsweredMessage: value }
  }),

  isShowingResults: false,
  setIsShowingResults: value => set(() => ({ isShowingResults: value })),

  isUnloadingPlayMode: false,
  setIsUnloadingPlayMode: value => set(() => ({ isUnloadingPlayMode: value })),

  results: [],
  addResult: value => set(state => ({ results: [...state.results, value] })),
  resetResults: () => set(() => ({ results: [] }))

}))
