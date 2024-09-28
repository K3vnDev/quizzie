import { useEffect, useState } from 'react'
import { Star } from '../../../icons/Star'
import './stars.css'

export function Stars({ n }) {
  const [stars, setStars] = useState(Array(3).fill({}))

  useEffect(() => {
    setStars(s =>
      s.map((_, i) => {
        const delay = i * 0.25 + 1
        return n > i ? { animation: `star-popup .7s ease ${delay}s both` } : {}
      })
    )
  }, [])

  return (
    <div className='stars-wrapper'>
      {stars.map(({ animation }, index) => {
        return animation ? <Star key={index} animation={{ animation }} /> : <Star key={index} />
      })}
    </div>
  )
}
