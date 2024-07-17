import { useEffect, useRef, useState } from 'react'
import { useDebounce } from './useDebounce'
const API_URL = import.meta.env.VITE_API_URL

export function useBrowse () {
  const [input, setInput] = useState('')
  const [quizzes, setQuizzes] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const firstRender = useRef(true)
  const query = useDebounce(input, 300)

  useEffect(() => {
    if (firstRender.current) {
      const searchParams = new URLSearchParams(window.location.search)
      const searchFromUrl = searchParams.get('s')

      if (searchFromUrl) setInput(searchFromUrl)
      else handleFetchQuizzes('')

      firstRender.current = false
      return
    }
    handleFetchQuizzes(query)
  }, [query])

  useEffect(() => {
    if (firstRender.current) return
    const newUrl = input !== '' ? `browse?s=${input}` : 'browse'
    window.history.replaceState({}, '', newUrl)
  }, [input])

  const handleFetchQuizzes = async (query) => {
    setIsFetching(true)
    await fetchQuizzes(query)
    setIsFetching(false)
    setIsLoading(false)
  }

  const fetchQuizzes = async (query) => {
    try {
      const res = await fetch(`${API_URL}/quiz/search/${query}`)
      if (!res.ok) throw new Error('Error fetching quizzes')

      const { allQuizzes, matchedQuizzes } = await res.json()
      setQuizzes(() => allQuizzes ?? matchedQuizzes)
    } catch {}
  }

  return { input, setInput, quizzes, isFetching, isLoading }
}
