import { useEditMode } from '../../hooks/useEditMode.js'
import { Play as PlayIcon } from '../../icons/Play.jsx'
import { Settings as SettingsIcon } from '../../icons/Settings.jsx'
import { useStore } from '../../store/useStore.js'
import { EditQuestionBox } from '../EditQuestionBox/EditQuestionBox.jsx'
import './editMode.css'

export function EditMode () {
  const { currentQuestionIndex } = useEditMode()

  return (
    <>
      <nav>
        <section>
          <div className='app-logo' />
        </section>
        <section>
          <QuizSettingsButton />
          <QuizPlayButton />
        </section>
      </nav>
      <TitleAndProgress
        currentQuestionIndex={currentQuestionIndex}
      />
      <EditQuestionBox
        currentQuestionIndex={currentQuestionIndex}
      />
    </>
  )
}

function TitleAndProgress ({ currentQuestionIndex }) {
  const { name: quizName, questions } = useStore(state => state.quiz)

  return (
    <div className='quiz-title-and-progress'>
      <h3>{quizName}</h3>
      <span>{`question ${currentQuestionIndex + 1} of ${questions.length}`}</span>
    </div>
  )
}

function QuizSettingsButton () {
  return (
    <button className='quiz-settings-btn'>
      <SettingsIcon />
    </button>
  )
}

function QuizPlayButton () {
  return (
    <button className='quiz-play-btn'>
      <PlayIcon />
    </button>
  )
}
