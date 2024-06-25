import Stars from '../Stars/Stars.jsx'
import { useStore } from '../../store/useStore.js'
import { Checkbox } from '../../icons/Checkbox.jsx'
import { Cross } from '../../icons/Cross.jsx'
import './results.css'
import { randomElement } from '../../services/randomElement.js'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Home } from '../../icons/Home.jsx'
import { PlayAgain } from '../../icons/PlayAgain.jsx'
import useReset from '../../hooks/useReset.js'
import { useNavigate } from 'react-router-dom'
import { TransitionRound } from '../TransitionRound/TransitionRound.jsx'
import { waitForSeconds } from '../../services/waitForSeconds.js'
import { useResults } from '../../hooks/useResults.js'

export default function Results () {
  const results = useStore(state => state.results)
  const {
    questionBoxClassName,
    numberOfStars,
    isQuestionCorrect,
    score
  } = useResults({ results })

  return (
    <>
      <h2 className='results-title'>
        Your Results
      </h2>
      <div className='results-box'>
        <Stars n={numberOfStars} />
        <ScoreMessage score={score} />
        <div className={questionBoxClassName}>
          {
            results.map((question, index) => (
              <QuestionResultBox
                key={index}
                isQuestionCorrect={isQuestionCorrect}
                question={question}
                index={index}
              />
            ))
          }
        </div>
        <section className='buttons'>
          <HomeButton />
          <PlayAgainButton />
        </section>
      </div>
      <TransitionRound />
    </>
  )
}

function QuestionResultBox ({ question, isQuestionCorrect, index }) {
  const { color, icon } = isQuestionCorrect(question)
    ? { color: '#00B15C', icon: <Checkbox /> }
    : { color: '#C12323', icon: <Cross /> }

  const delay = index * 0.15 + 0.4

  return (
    <div
      className='result-question'
      style={{
        '--result-color': color,
        '--result-color-st': color + '2f',
        animation: `result-question-appear .3s ease ${delay}s both`
      }}
    >
      <span>Question {index + 1}</span>
      <div className='result-icon'>{icon}</div>
    </div>
  )
}

function ScoreMessage ({ score }) {
  const message = (() => {
    if (score <= 30) {
      return randomElement(
        'Better luck next time!', 'Keep trying!', 'Practice makes perfect!', 'Try again!', 'Next time will be better!'
      )
    }
    if (score <= 60) {
      return randomElement(
        'Good start!', 'Nice try!', 'Not bad!', 'Almost there!', "You're getting there!", 'Good attempt!'
      )
    }
    if (score <= 90) {
      return randomElement(
        'Great job!', 'Well done!', 'Almost perfect!', 'Impressive!', 'Really good!'
      )
    }
    return randomElement(
      'Amazing!', 'Outstanding!', "You're a star!", 'You nailed it!', 'You rock!'
    )
  })()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (score >= 60) confetti()
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <p className='score-message'>
      Your Score is <span>{score}%</span>, {message}
    </p>
  )
}

function HomeButton () {
  const navigate = useNavigate()
  const disabledButtons = useStore(state => state.disabledButtons)

  const handleClick = () => {
    navigate('/')
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabledButtons}
    >
      <Home />
    </button>
  )
}

function PlayAgainButton () {
  const { resetPlayMode } = useReset()
  const [setTransitioning, disabledButtons, setDisabledButtons] = useStore(
    state => [
      state.setTransitioning,
      state.disabledButtons,
      state.setDisabledButtons
    ]
  )

  const handleClick = async () => {
    setTransitioning(true)
    setDisabledButtons(true)
    await waitForSeconds(1)
    resetPlayMode()
  }

  useEffect(() => {
    setDisabledButtons(false)
    return () => setDisabledButtons(false)
  }, [])

  return (
    <button
      onClick={handleClick}
      disabled={disabledButtons}
    >
      <PlayAgain />
    </button>
  )
}
