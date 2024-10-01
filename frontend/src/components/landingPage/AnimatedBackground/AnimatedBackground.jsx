import { useEffect, useRef, useState } from 'react'
import { Check as CheckIcon } from '../../../icons/Check.jsx'
import { QuestionMark as QuestionMarkIcon } from '../../../icons/QuestionMark.jsx'
import { Timer as TimerIcon } from '../../../icons/Timer.jsx'
import { XMark as XMarkIcon } from '../../../icons/XMark.jsx'
import { randomRange } from '../../../services/randomRange.js'
import './animatedBackground.css'
import { useAvoidAnimationReset } from '../../../hooks/useAvoidAnimationReset.js'

export const AnimatedBackground = () => {
  const [elements, setElements] = useState([])
  const interval = useRef(0)

  useAvoidAnimationReset('.animated-background .element')

  const frequence = 2000
  const [minTime, maxTime] = [14, 20]
  const [minScale, maxScale] = [0.7, 1.2]
  const [minColor, maxColor] = [0.02, 0.05]
  const maxRotation = 25
  const yRange = 55

  const generateId = () => {
    const id = Math.random()
    const alreadyExists = elements.find(el => el.id === id)
    return alreadyExists ? generateId() : id
  }

  const createNewElement = () => {
    const time = randomRange(minTime, maxTime, false)
    const diff = (100 - yRange) / 2
    const top = randomRange(diff, 100 - diff, false)
    const id = generateId()
    const scale = randomRange(minScale, maxScale, false)
    const rotation = randomRange(-maxRotation, maxRotation, false)
    const color = randomRange(minColor, maxColor, false)
    const type = randomRange(0, 4)

    setTimeout(
      () =>
        setElements(el => {
          const newElements = [...el]
          const index = newElements.findIndex(el => el.id === id)
          newElements.splice(index, 1)
          return newElements
        }),
      time * 1000 + 500
    )
    return { scale, rotation, color, type, id, time, top }
  }

  const addNewElement = () => {
    setElements(el => [...el, createNewElement()])
  }

  useEffect(() => {
    addNewElement()
    interval.current = setInterval(addNewElement, frequence)
    return () => clearInterval(interval.current)
  }, [])

  return (
    <div className='animated-background'>
      {elements.map(({ time, id, type, top, rotation, scale, color }) => (
        <div
          className='element'
          key={id}
          style={{
            '--time': `${time}s`,
            '--top': `${top}vh`,
            '--rot': `${rotation}deg`,
            '--scale': scale,
            '--color': `rgb(255 255 255 / ${color})`
          }}
        >
          <Element type={type} />
        </div>
      ))}
    </div>
  )
}

const Element = ({ type }) =>
  // biome-ignore lint/correctness/useJsxKeyInIterable: <>
  [<QuestionMarkIcon />, <XMarkIcon />, <TimerIcon />, <CheckIcon />][type]
