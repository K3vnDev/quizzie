import { create } from 'zustand'
import { templateQuestion } from './quizzes/templateQuiz'

export const useStore = create((set, get) => ({
  // Quiz

  quiz: null,
  setQuiz: value => set(() => ({ quiz: value })),

  setQuizName: value =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      newQuiz.name = value
      return { quiz: newQuiz }
    }),

  createNewAnswer: questionIndex =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      const prevAnswers = newQuiz.questions[questionIndex].answers
      const newAnswers = [...prevAnswers, { text: '', isCorrect: false }]
      newQuiz.questions[questionIndex].answers = newAnswers
      return prevAnswers.length < 4 ? { quiz: newQuiz } : { quiz: state.quiz }
    }),
  setAnswerText: (value, questionIndex, answerIndex) =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      newQuiz.questions[questionIndex].answers[answerIndex].text = value
      return { quiz: newQuiz }
    }),
  setCorrectAnswer: (questionIndex, answerIndex) =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      const prevAnswers = newQuiz.questions[questionIndex].answers
      const newAnswers = prevAnswers.map((answer, index) => {
        answer.isCorrect = index === answerIndex
        return answer
      })
      newQuiz.questions[questionIndex].answers = newAnswers
      return { quiz: newQuiz }
    }),
  deleteAnswer: (questionIndex, answerIndex) =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      const newAnswers = newQuiz.questions[questionIndex].answers
      newAnswers.splice(answerIndex, 1)
      newQuiz.questions[questionIndex].answers = newAnswers
      return { quiz: newQuiz }
    }),

  createNewQuestion: () =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      const newQuestion = { ...templateQuestion }
      newQuiz.questions.push(newQuestion)
      return { quiz: newQuiz }
    }),
  deleteQuestion: questionIndex =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      newQuiz.questions.splice(questionIndex, 1)
      return { quiz: newQuiz }
    }),
  setQuestionQuery: (value, questionIndex) =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      newQuiz.questions[questionIndex].query = value
      return { quiz: newQuiz }
    }),
  toggleQuestionDisplayMode: questionIndex =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      const newDisplayMode =
        newQuiz.questions[questionIndex].displayMode === 'grid' ? 'list' : 'grid'

      newQuiz.questions[questionIndex].displayMode = newDisplayMode
      return { quiz: newQuiz }
    }),

  setShuffleQuestions: value =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      newQuiz.config.shuffleQuestions = value
      return { quiz: newQuiz }
    }),
  setShuffleAnswers: value =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      newQuiz.config.shuffleAnswers = value
      return { quiz: newQuiz }
    }),
  setShuffleAnswerColors: value =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      newQuiz.config.shuffleAnswerColors = value
      return { quiz: newQuiz }
    }),
  setShowIcons: value =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      newQuiz.config.showIcons = value
      return { quiz: newQuiz }
    }),
  setAnswerTime: value =>
    set(state => {
      const newQuiz = structuredClone(state.quiz)
      newQuiz.config.answerTime = value
      return { quiz: newQuiz }
    }),

  transitioning: false,
  setTransitioning: value => set(() => ({ transitioning: value })),

  quizOwnedByUser: false,
  setQuizOwnedByUser: value => set(() => ({ quizOwnedByUser: value })),

  // Play Mode

  isShowingQuestion: false,
  setIsShowingQuestion: value => set(() => ({ isShowingQuestion: value })),

  isUnloadingQuestion: false,
  setIsUnloadingQuestion: value => set(() => ({ isUnloadingQuestion: value })),

  disabledButtons: false,
  setDisabledButtons: value => set(() => ({ disabledButtons: value })),

  questionAnsweredMessage: null,
  hideQuestionAnsweredMessage: () => set(() => ({ questionAnsweredMessage: null })),
  showQuestionAnsweredMessage: value =>
    set(() => {
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
  resetResults: () => set(() => ({ results: [] })),

  cloudState: 'saved', // 'not saved', 'uploading'
  setCloudState: value => set(() => ({ cloudState: value })),

  formTransitionating: false,
  setFormTransitionating: value => set(() => ({ formTransitionating: value })),

  isDisplayingQuizSettings: false,
  setIsDisplayingQuizSettings: value => set(() => ({ isDisplayingQuizSettings: value }))
}))
