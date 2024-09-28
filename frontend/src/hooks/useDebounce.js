import { useEffect, useRef, useState } from 'react'

export function useDebounce(value, wait) {
  const timeout = useRef()
  const firstTrigger = useRef(true)
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    if (firstTrigger.current) {
      firstTrigger.current = false
      return
    }

    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setDebouncedValue(value)
    }, wait)

    return () => {
      clearTimeout(timeout.current)
    }
  }, [value])

  return debouncedValue
}
