import { useState } from 'react'
import { useEditMode } from '../../hooks/useEditMode.js'
import { Play as PlayIcon } from '../../icons/Play.jsx'
import { Settings as SettingsIcon } from '../../icons/Settings.jsx'
import { Pencil as PencilIcon } from '../../icons/Pencil.jsx'
import { useStore } from '../../store/useStore.js'
import { EditQuestionBox } from '../EditQuestionBox/EditQuestionBox.jsx'
import './editMode.css'
import { EditableTextInput } from '../EditableTextInput/EditableTextInput.jsx'
import { Left as LeftIcon } from '../../icons/Left.jsx'
import { Right as RightIcon } from '../../icons/Rigth.jsx'

export function EditMode () {
  const {
    currentQuestionIndex,
    navigateQuestion,
    deleteQuestion
  } = useEditMode()

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
        deleteQuestion={deleteQuestion}
      />
      <QuestionNavigation
        currentQuestionIndex={currentQuestionIndex}
        navigateQuestion={navigateQuestion}
      />
    </>
  )
}

const TitleAndProgress = ({ currentQuestionIndex }) => {
  const { name: quizName, questions } = useStore(state => state.quiz)
  const setQuizName = useStore(state => state.setQuizName)
  const [isEditing, setIsEditing] = useState(false)

  const enterEditMode = () => {
    setIsEditing(true)
  }

  return (
    <div className='quiz-title-and-progress'>
      <div className='quiz-title'>
        {
        isEditing
          ? <EditableTextInput
              initialText={quizName}
              maxLength={25}
              setIsEditing={setIsEditing}
              handleTextChange={setQuizName}
            />
          : (
            <h3 onClick={enterEditMode}>
              {quizName}
              <PencilIcon />
            </h3>
            )
          }
      </div>
      <span className='quiz-progress'>
        {`Question ${currentQuestionIndex + 1} of ${questions.length}`}
      </span>
    </div>
  )
}

const QuizSettingsButton = () => {
  return (
    <button className='quiz-settings-btn'>
      <SettingsIcon />
    </button>
  )
}

const QuizPlayButton = () => {
  return (
    <button className='quiz-play-btn'>
      <PlayIcon />
    </button>
  )
}

const QuestionNavigation = ({ navigateQuestion, currentQuestionIndex }) => {
  return (
    <div className='edit-question-navigation'>
      <button
        className='left'
        onClick={() => navigateQuestion('left')}
        disabled={currentQuestionIndex === 0}
      >
        <LeftIcon />
      </button>
      <button
        className='right'
        onClick={() => navigateQuestion('right')}
        disabled={currentQuestionIndex >= 14}
      >
        <RightIcon />
      </button>
    </div>
  )
}
