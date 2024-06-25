import { z } from 'zod'

const quizValidationSchema = z.object({
  name: z.string().min(3).max(25),
  config: z.object({
    shuffleQuestions: z.boolean(),
    shuffleAnswers: z.boolean(),
    shuffleAnswerColors: z.boolean(),
    showIcons: z.boolean(),
    answerTime: z.number().min(3).positive()
  }),
  questions: z.array(
    z.object({
      query: z.string().min(3).max(100),
      displayMode: z.string().length(4),
      answers: z.array(
        z.object({
          text: z.string().min(1).max(200),
          isCorrect: z.boolean()
        })
      )
    })
  ).min(2).max(4)
})

export const validateQuiz = quiz => quizValidationSchema.safeParse(quiz)
