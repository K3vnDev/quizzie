import { useEditMode } from '../../../hooks/useEditMode.js'
import { useWidth } from '../../../hooks/useWidth.js'
import { TransitionRound } from '../../root/TransitionRound/TransitionRound.jsx'
import { EditModeButtonsHeader } from '../EditModeButtonsHeader/EditModeButtonsHeader.jsx'
import { EditQuestionBox } from '../EditQuestionBox/EditQuestionBox.jsx'
import { EditQuizSettings } from '../EditQuizSettings/EditQuizSettings.jsx'
import { QuestionNavigationArrows } from '../QuestionNavigationArrows/QuestionNavigationArrows.jsx'
import { QuestionNavigationPoints } from '../QuestionNavigationPoints/QuestionNavigationPoints.jsx'
import { QuestionProgress } from '../QuestionProgress/QuestionProgress.jsx'
import { QuizName } from '../QuizName/QuizName.jsx'

export function EditMode() {
  const { currentQuestionIndex, navigateQuestion, deleteQuestion } = useEditMode()
  const { onMinWidth } = useWidth(1100)

  return (
    <>
      <EditModeButtonsHeader />

      <QuizTitleAndProgress
        currentQuestionIndex={currentQuestionIndex}
        onMinWidth={onMinWidth}
        navigateQuestion={navigateQuestion}
      />

      <EditQuestionBox
        currentQuestionIndex={currentQuestionIndex}
        deleteQuestion={deleteQuestion}
      />
      {onMinWidth && (
        <QuestionNavigationArrows
          questionIndex={currentQuestionIndex}
          navigateQuestion={navigateQuestion}
        />
      )}
      <QuestionNavigationPoints
        questionIndex={currentQuestionIndex}
        navigateQuestion={navigateQuestion}
      />
      <EditQuizSettings />
      <TransitionRound />
    </>
  )
}

const QuizTitleAndProgress = ({ currentQuestionIndex, navigateQuestion, onMinWidth }) => {
  if (onMinWidth) {
    return (
      <div className='quiz-title-and-progress'>
        <QuizName />
        <QuestionProgress questionIndex={currentQuestionIndex} />
      </div>
    )
  }

  return (
    <div className='quiz-title-and-progress'>
      <QuizName />
      <QuestionNavigationArrows
        questionIndex={currentQuestionIndex}
        navigateQuestion={navigateQuestion}
      >
        <QuestionProgress questionIndex={currentQuestionIndex} />
      </QuestionNavigationArrows>
    </div>
  )
}
