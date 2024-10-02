import { useEffect, useRef, useState } from 'react'
import { Search as SearchIcon } from '../../../icons/Search'
import { useStore } from '../../../store/useStore'
import { AppLogo } from '../../root/AppLogo/AppLogo'
import './browseHeader.css'

export function BrowseHeader() {
  const [inputIsVisible, setInputIsVisible] = useState(true)
  const transitioning = useStore(state => state.transitioning)
  const focusInput = useRef(false)
  const input = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      input.current = document.querySelector('.browse-quizzes-form input')
      if (!input.current) return

      const offset = 10
      const { bottom } = input.current.getBoundingClientRect()

      const scrollOnTop = window.scrollY === 0
      if (focusInput.current && scrollOnTop) {
        input.current.focus()
        focusInput.current = false
      }
      const inputIsVisible = bottom + offset > 0
      setInputIsVisible(inputIsVisible)
    }
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [focusInput.current])

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    focusInput.current = true
  }

  const className = inputIsVisible ? 'browse-header' : 'browse-header visible'

  return (
    <>
      <AppLogo />
      <header className={className}>
        <AppLogo />
        <button className='search-btn' onClick={handleClick} disabled={transitioning}>
          <SearchIcon />
        </button>
      </header>
    </>
  )
}
