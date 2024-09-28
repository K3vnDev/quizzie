import { useEffect, useRef, useState } from 'react'

export function useError() {
  const [errorMessage, setErrorMessage] = useState('')
  const [errorOpacity, setErrorOpacity] = useState('hidden')
  const timeout = useRef()
  const waitTime = 4

  useEffect(() => () => clearTimeout(timeout.current), [])

  const showError = err => {
    clearTimeout(timeout.current)
    setErrorMessage(err)

    setErrorOpacity('visible')
    timeout.current = setTimeout(() => {
      setErrorOpacity('hidden')
    }, waitTime * 1000)
  }

  return { errorMessage, showError, errorOpacity }
}
