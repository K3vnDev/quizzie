import { useState } from 'react'
import './loginPage.css'
const { VITE_API_URL: API_URL } = import.meta.env

export function LoginPage () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    const res = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (!res.ok) setError(data.message) // TODO: improve error handling

    const { token } = data.data
    console.log(token)
    window.localStorage.setItem('token', token)
  }

  const handleSignUp = async () => {
    const res = await fetch(`${API_URL}/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (!res.ok) setError(data.message) // TODO: improve error handling

    const { token } = data.data
    window.localStorage.setItem('token', token)
  }

  return (
    <>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <label>
          Username
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handleLogin}>
          Login
        </button>
        <button onClick={handleSignUp}>
          Sign Up
        </button>
      </main>
      {
      error !== '' &&
        <p style={{ color: 'red' }}>{error}</p>
    }
    </>
  )
}
