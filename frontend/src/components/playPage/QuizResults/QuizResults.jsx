import './quizResults.css'
import { useStore } from '../../../store/useStore'
import { useResults } from '../../../hooks/useResults'
import { Stars } from '../Stars/Stars'
import { EditButton } from '../../root/EditButton/EditButton'
import { TransitionRound } from '../../root/TransitionRound/TransitionRound'
import { Checkbox as CheckboxIcon } from '../../../icons/Checkbox'
import { Cross as CrossIcon } from '../../../icons/Cross'
import { Home as HomeIcon } from '../../../icons/Home'
import { PlayAgain as PlayAgainIcon } from '../../../icons/PlayAgain'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { useNavigate } from 'react-router-dom'
import { waitForSeconds } from '../../../services/waitForSeconds'
import { useReset } from '../../../hooks/useReset'
import { randomElement } from '../../../services/randomElement'

export function QuizResults () {
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
          <EditButton onMenu />
          <PlayAgainButton />
        </section>
      </div>
      <TransitionRound />
    </>
  )
}

function QuestionResultBox ({ question, isQuestionCorrect, index }) {
  const { questions } = useStore(state => state.quiz)
  const { color, icon } = isQuestionCorrect(question)
    ? { color: '#00B15C', icon: <CheckboxIcon /> }
    : { color: '#C12323', icon: <CrossIcon /> }

  const lengthFactor = (1 - (questions.length / 15)) / 3 + 0.07
  const delay = index * lengthFactor + 0.4

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
  const transitioning = useStore(state => state.transitioning)

  const handleClick = () => {
    navigate('/')
  }

  return (
    <button
      onClick={handleClick}
      disabled={transitioning}
    >
      <HomeIcon />
    </button>
  )
}

function PlayAgainButton () {
  const resetState = useReset()
  const setTransitioning = useStore(state => state.setTransitioning)
  const transitioning = useStore(state => state.transitioning)

  const handleClick = async () => {
    setTransitioning(true)
    await waitForSeconds(1)
    resetState()
  }

  return (
    <button
      onClick={handleClick}
      disabled={transitioning}
    >
      <PlayAgainIcon />
    </button>
  )
}
