import jwt from 'jsonwebtoken'
import { $error } from '../services/jsonMessages.js'

export const userAuth = (req, res, next) => {
  try {
    const auth = req.get('authorization')

    if (!auth || !auth.startsWith('Bearer')) {
      return res
        .status(401).json($error('Token missing or invalid'))
    }

    const token = auth.substring(7)
    if (!token) {
      return res
        .status(401).json($error('Token missing or invalid'))
    }

    const { username } = jwt.verify(token, process.env.SKW)
    if (!username) {
      return res
        .status(401).json($error('Token missing or invalid'))
    }
    req.username = username
    next()
  } catch { res.status(401).json($error('Token missing or invalid')) }
}
