import { useState } from 'react'
import { Search as SearchIcon } from '../../icons/Search.jsx'
import './browseQuizzesForm.css'

export function BrowseQuizzesForm () {
  const [input, setInput] = useState('')

  const handleChange = e => {
    setInput(e.target.value)
  }

  return (
    <header className='browse-quizzes-form'>
      <h2>Browse Quizzes</h2>
      <label>
        <SearchIcon />
        <input
          placeholder='name or id...'
          value={input}
          onChange={handleChange}
        />
      </label>
    </header>
  )
}
