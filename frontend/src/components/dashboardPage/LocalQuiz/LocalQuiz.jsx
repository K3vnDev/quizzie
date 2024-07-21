import { useEffect, useState } from 'react'
import { validateQuiz } from '../../../services/validateQuiz'
import { LoadingArrows } from '../../root/LoadingArrows/LoadingArrows'
import './localQuiz.css'
const API_URL = import.meta.env.VITE_API_URL

export function LocalQuiz ({ setUserData }) {
  const [loading, setLoading] = useState(false)

  const fetchQuiz = async (validatedQuiz) => {
    const token = window.localStorage.getItem('token')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(validatedQuiz)
      })
      if (!res.ok) throw new Error('')

      const { data: newQuiz } = await res.json()
      setUserData(u => {
        const newUserData = structuredClone(u)
        newUserData.quizzes.push(newQuiz)
        return newUserData
      })

      window.localStorage.removeItem('localQuiz')
    } catch {} finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let quizFromLS = window.localStorage.getItem('localQuiz')
    if (!quizFromLS) return

    quizFromLS = JSON.parse(quizFromLS)
    const { success, data: validatedQuiz } = validateQuiz(quizFromLS)

    if (success) fetchQuiz(validatedQuiz)
    else {
      window.localStorage.removeItem('localQuiz')
      setLoading(false)
    }
  }, [])

  return loading
    ? (
      <div className='local-quiz'>
        <p>Uploading local quiz...</p>
        <LoadingArrows />
      </div>
      )
    : <></>
}
