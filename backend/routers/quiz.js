import { Router } from 'express'
import { Quiz, validateQuiz } from '../schemas/Quiz.js'
import { generateQuizId } from '../services/generateQuizId.js'
import { User } from '../schemas/User.js'
import { userAuth } from '../middleware/userAuth.js'
import { $error, $success } from '../services/jsonMessages.js'

export const quizRouter = Router()

// get quiz
quizRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const quiz = await Quiz.findOne({ id })
  if (quiz) return res.json(quiz)
  return res.status(404).json($error('requested quiz not found'))
})

// TODO: get all quizzes

quizRouter.use(userAuth)

quizRouter.get('/edit/:id', async (req, res) => {
  const { username } = req.session

  if (!username) return res.status(301).json($error('access denied'))

  const quizFromDb = await Quiz.findOne({ id })
  if (!quizFromDb) return res.status(404).json($error('requested quiz not found'))

  if (quizFromDb.owner !== username) return res.status(401).json($error('access denied'))

  res.json(quizFromDb)
})

// TODO: get all quizzes from an user

// create quiz
quizRouter.post('/', async (req, res) => {
  const quizFromReq = req.body
  const { username } = req.session

  const { success, data: validatedQuiz, error } = validateQuiz(quizFromReq)
  if (!success) return res.status(300).json(error.issues)

  if (!await User.findOne({ username })) {
    return res.status(301).json($error('invalid owner'))
  }

  const id = await generateQuizId()
  const newQuiz = new Quiz({
    id,
    owner: username,
    ...validatedQuiz
  })
  newQuiz.save()
    .then(savedQuiz => {
      res.status(201).json(savedQuiz)
    })
    .catch(() => {
      res.status(500).json($error('couldnt create quiz'))
    })
})

// update quiz
quizRouter.put('/', async (req, res) => {
  const { id, ...quizFromReq } = req.body
  const { username } = req.session

  const quizFromDb = await Quiz.findOne({ id })
  if (!quizFromDb) return res.status(404).json($error('requested quiz not found'))
  if (quizFromDb.owner !== username) return res.status(401).json($error('unauthorized'))

  const { success, data: validatedQuiz, error } = validateQuiz(quizFromReq)
  if (!success) return res.status(300).json(error.issues)

  await Quiz.updateOne({ id }, validatedQuiz)
    .catch(() => {
      res.status(500).json($error('error updating quiz'))
    })
  res.json(validatedQuiz)
})

// delete quiz
quizRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const { username } = req.session

  const quizFromDb = await Quiz.findOne({ id })
  if (quizFromDb.owner !== username) return res.status(401).json($error('unauthorized'))

  const { deletedCount } = await Quiz.deleteOne({ id })
    .catch(() => res.status(500).json($error('couldnt delete quiz')))

  if (deletedCount === 1) return res.json($success('quiz deleted'))
  res.status(404).json($error('requested quiz not found'))
})
