import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colorAndIcon } from '../../services/colorAndIcon.jsx'
import { useStore } from '../../store/useStore.js'

export function MenuQuestion () {
  const navigate = useNavigate()
  const [buttonPressed, setButtonPressed] = useState(false)

  const answers = [
    {
      text: 'Play a demo quiz',
      callback: () => navigate('/play')
    },
    {
      text: 'Play an existing quiz',
      callback: () => {}
    },
    {
      text: 'Make my own quiz',
      callback: () => {}
    }
  ]

  return (
    <div className='menu-question-box'>
      <h2>What do you want to do?</h2>
      <section>
        {
          answers.map((ans, i) => (
            <MenuAnswer
              index={i} key={i}
              callback={ans.callback}
              buttonPressed={buttonPressed}
              setButtonPressed={setButtonPressed}
            >
              {ans.text}
            </MenuAnswer>
          )
          )
        }
      </section>
    </div>
  )
}

function MenuAnswer ({ children, callback, index, buttonPressed, setButtonPressed }) {
  const { color, icon } = colorAndIcon[index]
  const setTransitioning = useStore(state => state.setTransitioning)

  const handleClick = () => {
    setButtonPressed(true)
    setTransitioning(true)
    setTimeout(callback, 1000)
  }

  return (
    <button
      className='answer-box'
      onClick={handleClick}
      disabled={buttonPressed}
      style={{
        '--bg-color': color,
        '--bg-color-st': color + '80'
      }}
    >
      {icon}<span>{children}</span>
    </button>
  )
}
