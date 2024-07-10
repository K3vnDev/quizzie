import { useRef, useState } from 'react'
import { Search as SearchIcon } from '../../icons/Search.jsx'
import './browseQuizzesForm.css'
import { validateInput } from '../../services/validateInput.js'
import { useCantWriteAnimation } from '../../hooks/useCantWriteAnimation.js'

export function BrowseQuizzesForm () {
  const [input, setInput] = useState('')
  const { animation, triggerAnimation } = useCantWriteAnimation()
  const inputRef = useRef()

  const handleChange = e => {
    const { value } = e.target
    const newInput = validateInput({ prevInput: input, newInput: value, maxLength: 20 })
    if (newInput === input) {
      triggerAnimation()
      return
    }
    setInput(newInput)
  }

  return (
    <header className='browse-quizzes-form'>
      <h2>Browse Quizzes</h2>
      <label style={{ animation }}>
        <SearchIcon />
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
