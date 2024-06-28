import { Delete as DeleteIcon } from '../../icons/Delete.jsx'
import { Edit as EditIcon } from '../../icons/Edit.jsx'
import { Checkbox as CheckboxIcon } from '../../icons/Checkbox.jsx'
import { useStore } from '../../store/useStore.js'

export function EditAnswerMenu ({ setEditingText, questionIndex, answerIndex }) {
  return (
    <div className='edit-answer-menu'>
      <EditModeButton setEditingText={setEditingText} />
      <MakeCorrectButton
        questionIndex={questionIndex}
        answerIndex={answerIndex}
      />
      <DeleteButton
        questionIndex={questionIndex}
        answerIndex={answerIndex}
      />
    </div>
  )
}

const EditModeButton = ({ setEditingText }) => {
  const handleClick = () => {
    setEditingText(true)
  }

  return (
    <button onClick={handleClick}>
      <EditIcon m='Edit Text' />
    </button>
  )
}

const MakeCorrectButton = ({ questionIndex, answerIndex }) => {
  const setCorrectAnswer = useStore(state => state.setCorrectAnswer)

  const handleClick = () => {
    setCorrectAnswer(questionIndex, answerIndex)
  }

  return (
    <button onClick={handleClick}>
      <CheckboxIcon m='Mark as Correct' />
    </button>
  )
}

const DeleteButton = ({ questionIndex, answerIndex }) => {
  const deleteAnswer = useStore(state => state.deleteAnswer)

  const handleClick = () => {
    deleteAnswer(questionIndex, answerIndex)
  }

  return (
    <button onClick={handleClick}>
      <DeleteIcon m='Delete' />
    </button>
  )
}
