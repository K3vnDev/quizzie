import jwt from 'jsonwebtoken'

export const userAuth = (req, res, next) => {
  const { token } = req.cookies
  if (!token) { return res.status(401).json({ error: 'unauthorized' }) }
  req.session = { username: null }

  try {
    const data = jwt.verify(token, process.env.SKW)
    req.session.username = data
  } catch (err) {
    console.error(err)
  }

  next()
}
