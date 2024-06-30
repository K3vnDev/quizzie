import { useEffect, useState } from 'react'
import { validateQuiz } from '../../services/validateQuiz'
import { UserQuiz } from './UserQuizzesDisplay'
const API_URL = import.meta.env.VITE_API_URL

export const LocalQuiz = () => {
  const [localQuiz, setLocalQuiz] = useState(null)

  useEffect(() => {
    let quizFromLS = window.localStorage.getItem('localQuiz')
    if (!quizFromLS) return

    quizFromLS = JSON.parse(quizFromLS)
    const { success, data: validatedQuiz } = validateQuiz(quizFromLS)

    if (!success) return

    setLocalQuiz(validatedQuiz)

    const token = window.localStorage.getItem('token')

    fetch(`${API_URL}/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(validatedQuiz)
    })
      .then(res => {
        if (res.ok) window.localStorage.removeItem('localQuiz')
        else {
          res.json()
            .then(data => console.log(data))
        }
      })
  }, [])

  return localQuiz
    ? <UserQuiz quiz={localQuiz} />
    : <></>
}
