import { useRef } from 'react'
import { Search as SearchIcon } from '../../../icons/Search.jsx'
import './browseQuizzesForm.css'
import { useCantWriteAnimation } from '../../../hooks/useCantWriteAnimation.js'
import { validateInput } from '../../../services/validateInput.js'
import { LoadingArrows } from '../../root/LoadingArrows/LoadingArrows.jsx'

export function BrowseQuizzesForm({ input, setInput, isFetching }) {
  const { animation, triggerAnimation } = useCantWriteAnimation()
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

  return (
    <header className='browse-quizzes-form'>
      <h2>Browse Quizzes</h2>
      <label style={{ animation }}>
        {isFetching ? <LoadingArrows /> : <SearchIcon />}
        <input placeholder='name or id...' value={input} onChange={handleChange} ref={inputRef} />
      </label>
    </header>
  )
}
