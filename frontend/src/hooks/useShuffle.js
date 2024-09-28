import { useEffect, useState } from 'react'

export function useShuffle(originalArray, condition, valueToLook) {
  const [shuffledArray, setShuffledArray] = useState(originalArray)

  const shuffleArray = array => {
    for (let i = 0; i < array.length; i++) {
      const randomIndex = Math.floor(Math.random() * array.length)
      if (randomIndex === i) break

      const temp = array[randomIndex]
      array[randomIndex] = array[i]
      array[i] = temp
    }
    return array
  }

  useEffect(() => {
    setShuffledArray(condition ? shuffleArray([...originalArray]) : originalArray)
  }, [valueToLook])

  return [shuffledArray]
}
