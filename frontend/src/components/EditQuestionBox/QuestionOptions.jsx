import { More as MoreIcon } from '../../icons/More.jsx'
import { Delete as DeleteIcon } from '../../icons/Delete.jsx'
import { Grid as GridIcon } from '../../icons/Grid.jsx'
import { List as ListIcon } from '../../icons/List.jsx'
import { useStore } from '../../store/useStore.js'

export function QuestionOptions ({ questionIndex, deleteQuestion }) {
  const { questions } = useStore(state => state.quiz)
  const { displayMode } = questions[questionIndex]

  return (
    <div className='edit-question-options'>
      <button className='more-btn'>
        <MoreIcon />
      </button>
      <ChangeButton
        displayMode={displayMode}
        questionIndex={questionIndex}
      />
      <DeleteButton
        deleteQuestion={deleteQuestion}
      />
    </div>
  )
}

const ChangeButton = ({ displayMode, questionIndex }) => {
  const toggleQuestionDisplayMode = useStore(state => state.toggleQuestionDisplayMode)

  const handleClick = () => {
    toggleQuestionDisplayMode(questionIndex)
  }

  return (
    <button
      className='change-btn'
      onClick={handleClick}
    >
      {
        displayMode === 'list'
          ? <GridIcon />
          : <ListIcon />
      }
    </button>
  )
}

const DeleteButton = ({ deleteQuestion }) => {
  const { questions } = useStore(state => state.quiz)
  return (
    <button
      className='delete-btn'
      onClick={deleteQuestion}
      disabled={questions.length === 1}
    >
      <DeleteIcon />
    </button>
  )
}
