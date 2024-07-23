import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const { VITE_API_URL: API_URL } = import.meta.env

export function useLogin () {
  const [fetching, setFetching] = useState(false)
  const [verifyingAuth, setVerifyingAuth] = useState(true)
  const [showing, setShowing] = useState('login')
  const navigate = useNavigate()

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (!token) return setVerifyingAuth(false)

    fetch(`${API_URL}/user/quizzes`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.ok) navigate('/dashboard')
        else throw new Error('')
      })
      .catch(() => setVerifyingAuth(false))
  }, [])

  const login = async (username, password) => {
    try {
      setFetching(true)
      const res = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      setFetching(false)

      if (!res.ok) return data
      if (!data.status || data.status === 'error') return data

      const { token } = data.data
      window.localStorage.setItem('token', token)
      return data
    } catch {
      setFetching(false)
    }
  }

  const signUp = async (username, password) => {
    setFetching(true)
    const res = await fetch(`${API_URL}/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    setFetching(false)

    if (!res.ok) return data
    if (!data.status || data.status === 'error') return data

    const { token } = data.data
    window.localStorage.setItem('token', token)
  }

  return { login, signUp, showing, setShowing, fetching, verifyingAuth }
}
