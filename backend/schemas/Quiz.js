import { model, Schema } from 'mongoose'
import { z } from 'zod'

const quizSchema = new Schema({
  id: String,
  owner: String,
  name: String,
  config: {
    shuffleQuestions: Boolean,
    shuffleAnswers: Boolean,
    shuffleAnswerColors: Boolean,
    showIcons: Boolean,
    answerTime: Number
  },
  questions: [
    {
      query: String,
      displayMode: String,
      answers: [
        {
          text: String,
          isCorrect: Boolean
        }
      ]
    }
  ]
})

quizSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Quiz = model('Quiz', quizSchema)

// Validations
const quizValidationSchema = z.object({
  name: z.string().min(3).max(25).trim(),
  config: z.object({
    shuffleQuestions: z.boolean(),
    shuffleAnswers: z.boolean(),
    shuffleAnswerColors: z.boolean(),
    showIcons: z.boolean(),
    answerTime: z.number().min(3).positive()
  }),
  questions: z.array(
    z.object({
      query: z.string().min(1).max(100).trim(),
      displayMode: z.string().length(4),
      answers: z.array(
        z.object({
          text: z.string().min(1).max(200).trim(),
          isCorrect: z.boolean()
        })
      )
    })
  ).min(2).max(4)
})

export const validateQuiz = quiz => quizValidationSchema.safeParse(quiz)
