import { Router } from 'express'
import { Quiz, validateQuiz } from '../schemas/Quiz.js'
import { generateQuizId } from '../services/generateQuizId.js'
import { User } from '../schemas/User.js'
import { userAuth } from '../middleware/userAuth.js'
import { $error, $success } from '../services/jsonMessages.js'
import { generateQuizColor } from '../services/generateQuizColor.js'

export const quizRouter = Router()

// get all quizzes
quizRouter.get('/all', async (req, res) => {
  try {
    const quizzes = await Quiz.find({})
    res.json(quizzes)
  } catch { res.status(500) }
})

// get quiz
quizRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const quiz = await Quiz.findOne({ id })
  if (quiz) return res.json(quiz)
  return res.status(404).json($error('requested quiz not found'))
})

quizRouter.use(userAuth)

quizRouter.get('/edit/:id', async (req, res) => {
  const { username } = req
  const { id } = req.params

  if (!username) return res.status(401).json($error('access denied'))

  const quizFromDb = await Quiz.findOne({ id })
  if (!quizFromDb) return res.status(404).json($error('requested quiz not found'))

  if (quizFromDb.owner !== username) return res.status(401).json($error('access denied'))

  res.json(quizFromDb)
})

// create quiz
quizRouter.post('/', async (req, res) => {
  const { username } = req
  const quizFromReq = req.body

  console.log(quizFromReq)

  const { success, data: validatedQuiz, error } = validateQuiz(quizFromReq)
  if (!success) return res.status(400).json(error.issues)

  const userFromDb = await User.findOne({ username })
  if (!userFromDb) return res.status(401).json($error('access denied'))

  const userQuizzes = await Quiz.find({ owner: username })
  const previewColor = generateQuizColor(userQuizzes)

  const id = await generateQuizId()
  const newQuiz = new Quiz({
    id,
    owner: username,
    previewColor,
    ...validatedQuiz
  })
  newQuiz.save()
    .then(savedQuiz => {
      res.status(201).json({
        ...$success('quiz created'),
        data: savedQuiz
      })
    })
    .catch(() => {
      res.status(500).json($error('couldnt create quiz'))
    })
})

// update quiz
quizRouter.put('/', async (req, res) => {
  const { username } = req
  const { id, ...quizFromReq } = req.body

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
  const { username } = req
  const { id } = req.params

  const quizFromDb = await Quiz.findOne({ id })
  if (quizFromDb.owner !== username) return res.status(401).json($error('unauthorized'))

  const { deletedCount } = await Quiz.deleteOne({ id })
    .catch(() => res.status(500).json($error('couldnt delete quiz')))

  if (deletedCount === 1) return res.json($success('quiz deleted'))
  res.status(404).json($error('requested quiz not found'))
})
