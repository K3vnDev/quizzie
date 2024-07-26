import { useEffect } from 'react'
import { useDebounce } from '../../../hooks/useDebounce'
import { useStore } from '../../../store/useStore'
import { SettingsCheckbox } from '../SettingsCheckbox/SettingsCheckbox'
import { SettingsInput } from '../SettingsInput/SettingsInput'
import { SettingsRange } from '../SettingsRange/SettingsRange'
import './editQuizSettings.css'

export function EditQuizSettings () {
  const isDisplaying = useStore(state => state.isDisplayingQuizSettings)
  const setIsDisplaying = useStore(state => state.setIsDisplayingQuizSettings)
  const debouncedIsDisplaying = useDebounce(isDisplaying, 200)

  useEffect(() => {
    const handleClick = e => {
      e.stopPropagation()
      const { className } = e.target
      if (typeof className !== 'string') return

      if (
        className.includes('quiz-settings-wrapper') ||
        className.includes('okay-btn')
      ) {
        setIsDisplaying(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const mode = isDisplaying
    ? 'visible'
    : 'hidden'

  const display = isDisplaying || debouncedIsDisplaying
    ? 'flex'
    : 'none'

  return (
    <div
      className={`edit-quiz-settings-wrapper ${mode}`}
      style={{ display }}
    >
      <main className={`edit-quiz-settings ${mode}`}>
        <h2>Quiz Settings</h2>

        <Shuffle />
        <ShowIcons />
        <AnswerTime />

        <button className='okay-btn'>Okay</button>
      </main>
    </div>
  )
}

const Shuffle = () => {
  const { shuffleQuestions, shuffleAnswers, shuffleAnswerColors } = useStore(state => state.quiz.config)
  const setShuffleQuestions = useStore(state => state.setShuffleQuestions)
  const setShuffleAnswers = useStore(state => state.setShuffleAnswers)
  const setShuffleAnswerColors = useStore(state => state.setShuffleAnswerColors)

  return (
    <section>
      <h5>Shuffle:</h5>
      <div>
        <h4>Questions</h4>
        <SettingsCheckbox
          value={shuffleQuestions}
          action={setShuffleQuestions}
        />
      </div>
      <div>
        <h4>Answers</h4>
        <SettingsCheckbox
          value={shuffleAnswers}
          action={setShuffleAnswers}
        />
      </div>
      <div>
        <h4>Answer colors</h4>
        <SettingsCheckbox
          value={shuffleAnswerColors}
          action={setShuffleAnswerColors}
        />
      </div>
    </section>
  )
}

const ShowIcons = () => {
  const { showIcons } = useStore(state => state.quiz.config)
  const setShowIcons = useStore(state => state.setShowIcons)

  return (
    <div>
      <h4>Show Icons</h4>
      <SettingsCheckbox
        value={showIcons}
        action={setShowIcons}
      />
    </div>
  )
}

const AnswerTime = () => {
  const { answerTime } = useStore(state => state.quiz.config)
  const setAnswerTime = useStore(state => state.setAnswerTime)

  return (
    <section>
      <div>
        <h4>Answer time</h4>
        <SettingsInput
          value={answerTime}
          action={setAnswerTime}
        />
      </div>
      <SettingsRange
        value={answerTime}
        action={setAnswerTime}
      />
    </section>
  )
}
