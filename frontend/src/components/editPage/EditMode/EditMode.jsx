import { useEffect, useState } from 'react'
import { Pencil as PencilIcon } from '../../../icons/Pencil.jsx'
import { useStore } from '../../../store/useStore.js'
import { useEditMode } from '../../../hooks/useEditMode.js'
import { TransitionRound } from '../../root/TransitionRound/TransitionRound.jsx'
import { EditModeButtonsHeader } from '../EditModeButtonsHeader/EditModeButtonsHeader.jsx'
import { EditQuestionBox } from '../EditQuestionBox/EditQuestionBox.jsx'
import { QuestionNavigationPoints } from '../QuestionNavigationPoints/QuestionNavigationPoints.jsx'
import { EditableTextInput } from '../EditableText/EditableText.jsx'
import { EditQuizSettings } from '../EditQuizSettings/EditQuizSettings.jsx'
import { QuestionNavigationArrows } from '../QuestionNavigationArrows/QuestionNavigationArrows.jsx'

export function EditMode () {
  const {
    currentQuestionIndex,
    navigateQuestion,
    deleteQuestion
  } = useEditMode()

  return (
    <>
      <EditModeButtonsHeader />

      <TitleAndProgress
        questionIndex={currentQuestionIndex}
      />
      <EditQuestionBox
        currentQuestionIndex={currentQuestionIndex}
        deleteQuestion={deleteQuestion}
      />
      <QuestionNavigationArrows
        questionIndex={currentQuestionIndex}
        navigateQuestion={navigateQuestion}
      />
      <QuestionNavigationPoints
        questionIndex={currentQuestionIndex}
        navigateQuestion={navigateQuestion}
      />
      <EditQuizSettings />
      <TransitionRound />
    </>
  )
}

const TitleAndProgress = ({ questionIndex }) => {
  const { name: quizName, questions } = useStore(state => state.quiz)
  const setQuizName = useStore(state => state.setQuizName)
  const [isEditing, setIsEditing] = useState(false)

  const enterEditMode = () => {
    setIsEditing(true)
  }

  useEffect(() => {
    if (!isEditing && quizName === '') {
      setQuizName('My New Quiz')
    }
  }, [isEditing])

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
              selectOn={['My New Quiz']}
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
        {`Question ${questionIndex + 1} of ${questions.length}`}
      </span>
    </div>
  )
}
