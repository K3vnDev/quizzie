import { useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'

export function useTransition() {
  const setTransitioning = useStore(state => state.setTransitioning)
  const navigate = useNavigate()
  const timeoutRef = useRef()

  const makeTransition = target => {
    setTransitioning(true)
    timeoutRef.current = setTimeout(() => navigate(target), 1000)
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  return { makeTransition }
}
