import { useEffect, useState } from 'react'

export function useScroll (scrollGap) {
  const initialState = document.documentElement.scrollTop < scrollGap
  const [scrollIsOnTop, setScrollIsOnTop] = useState(initialState)
  const [scrolledUp, setScrolledUp] = useState(false)

  useEffect(() => {
    let lastScrollPos = 0

    const handleScroll = () => {
      const scroll = document.documentElement.scrollTop
      setScrollIsOnTop(scroll < scrollGap)
      setScrolledUp(scroll < lastScrollPos && lastScrollPos !== 0)
      lastScrollPos = scroll
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollIsOnTop, scrolledUp }
}
