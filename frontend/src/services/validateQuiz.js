import { z } from 'zod'

const quizValidationSchema = z.object({
  name: z.string().min(3).max(20).trim(),
  config: z.object({
    shuffleQuestions: z.boolean(),
    shuffleAnswers: z.boolean(),
    shuffleAnswerColors: z.boolean(),
    showIcons: z.boolean(),
    answerTime: z.number().min(3).positive()
  }),
  questions: z.array(
    z.object({
      query: z.string().min(1).max(50).trim(),
      displayMode: z.string().length(4),
      answers: z.array(
        z.object({
          text: z.string().min(1).max(50).trim(),
          isCorrect: z.boolean()
        })
      ).max(4)
    })
  ).min(1).max(15)
})

export const validateQuiz = quiz => quizValidationSchema.safeParse(quiz)
