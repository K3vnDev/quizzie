import { useEffect, useState } from 'react'

export function useScroll () {
  const initialState = document.documentElement.scrollTop === 0
  const [scrollIsOnTop, setScrollIsOnTop] = useState(initialState)
  const [scrolledUp, setScrolledUp] = useState(false)

  useEffect(() => {
    let lastScrollPos = 0

    const handleScroll = () => {
      const scroll = document.documentElement.scrollTop
      setScrollIsOnTop(scroll === 0)
      setScrolledUp(scroll < lastScrollPos && lastScrollPos !== 0)
      lastScrollPos = scroll
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollIsOnTop, scrolledUp }
}
