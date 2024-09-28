import { useEffect } from 'react'

export const useAppName = (name, dep = undefined) => {
  useEffect(() => {
    document.title = name
    return () => {
      document.title = 'Quizzie'
    }
  }, [dep])
}
