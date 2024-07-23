import { useEffect, useRef } from 'react'
import { Search as SearchIcon } from '../../../icons/Search.jsx'
import './browseQuizzesForm.css'
import { validateInput } from '../../../services/validateInput.js'
import { useCantWriteAnimation } from '../../../hooks/useCantWriteAnimation.js'
import { LoadingArrows } from '../../root/LoadingArrows/LoadingArrows.jsx'
import { useStore } from '../../../store/useStore.js'

export function BrowseQuizzesForm ({ input, setInput, isFetching }) {
  const { animation, triggerAnimation } = useCantWriteAnimation()
  const setBrowsePageInputIsVisible = useStore(state => state.setBrowsePageInputIsVisible)
  const inputRef = useRef()
  const titleRef = useRef()

  const handleChange = e => {
    const { value } = e.target
    const validatedInput = validateInput({
      prevInput: input,
      newInput: value,
      maxLength: 20
    })
    if (validatedInput === input) {
      triggerAnimation()
      return
    }
    setInput(validatedInput)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const { top } = titleRef.current.getBoundingClientRect()
        setBrowsePageInputIsVisible(top > 0)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className='browse-quizzes-form'>
      <h2 ref={titleRef}>
        Browse Quizzes
      </h2>
      <label style={{ animation }}>
        {
          isFetching
            ? <LoadingArrows />
            : <SearchIcon />
        }
        <input
          placeholder='name or id...'
          value={input}
          onChange={handleChange}
          ref={inputRef}
        />
      </label>
    </header>
  )
}
