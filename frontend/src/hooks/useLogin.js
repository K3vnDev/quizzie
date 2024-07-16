import { useState } from 'react'
const { VITE_API_URL: API_URL } = import.meta.env

export function useLogin () {
  const [fetching, setFetching] = useState(false)
  const [showing, setShowing] = useState('login')

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
      console.log(token)
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

  return { login, signUp, showing, setShowing, fetching }
}
