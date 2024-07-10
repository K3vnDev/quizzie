import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'
const API_URL = import.meta.env.VITE_API_URL

export function useBrowse () {
  const [input, setInput] = useState('')
  const [quizzes, setQuizzes] = useState([])
  const [uniqueQuiz, setUniqueQuiz] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const query = useDebounce(input, 300)

  useEffect(() => { handleFetchQuizzes() }, [query])

  const handleFetchQuizzes = async () => {
    setIsFetching(true)
    await fetchQuizzes()
    setIsFetching(false)
  }

  const fetchQuizzes = async () => {
    try {
      const res = await fetch(`${API_URL}/quiz/search/${query}`)
      if (!res.ok) throw new Error('Error fetching quizzes')

      const { allQuizzes, matchedQuizzes, quizFromId } = await res.json()
      if (allQuizzes) {
        setQuizzes(allQuizzes)
        if (quizFromId) {
          setUniqueQuiz(quizFromId)
        }
        return
      }
      setQuizzes(matchedQuizzes)
    } catch {}
  }

  return { input, setInput, quizzes, uniqueQuiz, isFetching }
}
