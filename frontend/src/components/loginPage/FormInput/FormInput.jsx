import { useEffect, useState } from 'react'
import './formInput.css'
import { useCantWriteAnimation } from '../../../hooks/useCantWriteAnimation'
import { useStore } from '../../../store/useStore'

export function FormInput ({ m, password }) {
  const [input, setInput] = useState('')
  const { animation, triggerAnimation } = useCantWriteAnimation()
  const formTransitionating = useStore(state => state.formTransitionating)

  useEffect(() => {
    const handleAnimateInput = e => {
      const { inputName } = e.detail
      if (inputName === '' || inputName === m) triggerAnimation()

      if ((
        inputName.includes(m) && password) ||
        inputName === ''
      ) {
        setInput('')
      }
    }

    document.addEventListener('animateinput', handleAnimateInput)
    return () => document.removeEventListener('animateinput', handleAnimateInput)
  }, [])

  useEffect(() => {
    if (formTransitionating) setInput('')
  }, [formTransitionating])

  const info = password
    ? { type: 'password', maxLength: 20 }
    : { type: 'text', maxLength: 10 }

  const handleChange = e => {
    let { value } = e.target
    value = value.trim()

    if (
      value.length > info.maxLength &&
       value.length >= input.length
    ) {
      triggerAnimation()
      return
    }

    setInput(value)
  }

  return (
    <label className='form-input'>
      <span>{m}</span>
      <input
        type={info.type}
        value={input}
        onChange={handleChange}
        style={{ animation }}
        disabled={formTransitionating}
        name={m}
      />
    </label>
  )
}
