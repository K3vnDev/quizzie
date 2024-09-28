import { useEffect } from 'react'
import { useStore } from '../../../store/useStore'
import { useShuffle } from '../../../hooks/useShuffle'
import { colorAndIcon } from '../../../services/colorAndIcon'
import './playQuestionBox.css'
import { useWidth } from '../../../hooks/useWidth'

export function PlayQuestionBox({ question, setResponse }) {
  const { query, answers, displayMode: defaultDisplayMode } = question
  const isShowingQuestion = useStore(state => state.isShowingQuestion)
  const isUnloadingQuestion = useStore(state => state.isUnloadingQuestion)
  const setDisabledButtons = useStore(state => state.setDisabledButtons)
  const addResult = useStore(state => state.addResult)
  const { shuffleAnswers, shuffleAnswerColors } = useStore(state => state.quiz.config)
  const [answersToShow] = useShuffle(answers, shuffleAnswers, answers)
  const [colorsAndIconsToShow] = useShuffle(colorAndIcon, shuffleAnswerColors, answers)
  const { clientWidth } = useWidth(1100)

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDisabledButtons(false)
    }, 750)
    return () => clearTimeout(timeOutId)
  })

  const handleResponse = (isCorrect, index) => {
    setResponse(isCorrect)
    addResult({
      questionQuery: query,
      answers: (() => {
        const newAnswers = structuredClone(answersToShow)
        newAnswers[index] = {
          ...answersToShow[index],
          chosen: true
        }
        return newAnswers
      })()
    })
  }

  const displayMode = (() => {
    if (clientWidth > 1100) return defaultDisplayMode

    const checkShortAnswers = maxLength => {
      return answers.every(answer => answer.text.length <= maxLength)
    }
    if (checkShortAnswers(16) && clientWidth >= 750) {
      return defaultDisplayMode
    }
    if (checkShortAnswers(8) && clientWidth >= 600) {
      return defaultDisplayMode
    }
    return checkShortAnswers(4) ? defaultDisplayMode : 'list'
  })()

  if (!isShowingQuestion) return

  const className = isUnloadingQuestion ? 'play-question-box unloading' : 'play-question-box'

  return (
    <div className={className}>
      <h2>{query}</h2>
      <section className={'answers ' + displayMode}>
        {answersToShow.map((answer, i) => (
          <PlayAnswerButton
            answer={answer}
            index={i}
            colorAndIcon={colorsAndIconsToShow[i]}
            key={i}
            handleResponse={handleResponse}
          />
        ))}
      </section>
    </div>
  )
}

function PlayAnswerButton({ answer, index, handleResponse, colorAndIcon }) {
  const disabledButtons = useStore(state => state.disabledButtons)
  const setDisabledButtons = useStore(state => state.setDisabledButtons)
  const { showIcons } = useStore(state => state.quiz.config)

  const { color, icon } = colorAndIcon
  const { text, isCorrect } = answer
  const delay = index * 0.15 + 0.3
  const style = {
    '--bg-color': color,
    '--bg-color-st': color + '80',
    animation: `answer-box-appear .4s ease ${delay}s backwards`
  }

  const handleClick = () => {
    setDisabledButtons(true)
    handleResponse(isCorrect, index)
  }

  return (
    <button className='answer-box' style={style} onClick={handleClick} disabled={disabledButtons}>
      {showIcons && icon}
      <span>{text}</span>
    </button>
  )
}
