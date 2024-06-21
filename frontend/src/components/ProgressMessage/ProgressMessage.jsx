import { useEffect, useState } from 'react'

export default function ProgressMessage ({ progress }) {
  const { current, last } = progress
  const [style, setStyle] = useState({
    animation: 'message-slide-in .3s ease-out both'
  })

  useEffect(() => {
    setStyle({
      animation: 'message-slide-in .3s ease-out both, progress-message-pop 1s ease both'
    })
    const timeOutId = setTimeout(() => {
      setStyle({
        animation: 'message-slide-in .3s ease-out both'
      })
    }, 1000)
    return () => clearTimeout(timeOutId)
  }, [current])

  const message = current === last
    ? 'Final Question!'
    : `Question ${current} of ${last}`

  return (
    <h6 style={style}>
      {message}
    </h6>
  )
}
