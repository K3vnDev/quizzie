import { Add as AddIcon } from '../../../icons/Add.jsx'
import { Pencil as PencilIcon } from '../../../icons/Pencil.jsx'
import { useStore } from '../../../store/useStore.js'
import { useEffect, useState } from 'react'
import './editQuestionBox.css'
import { QuestionWarningMessage } from '../QuestionWarningMessage/QuestionWarningMessage.jsx'
import { EditableAnswer } from '../EditableAnswer/EditableAnswer.jsx'
import { QuestionOptions } from '../QuestionOptions/QuestionOptions.jsx'
import { EditableTextArea } from '../EditableText/EditableText.jsx'

export function EditQuestionBox ({ currentQuestionIndex, deleteQuestion }) {
  const { config, questions } = useStore(state => state.quiz)
  const { query, displayMode, answers } = questions[currentQuestionIndex]

  return (
    <div className='edit-question-box'>
      <header>
        <QuestionQuery
          questionIndex={currentQuestionIndex}
          answers={answers}
          query={query}
        />
        <QuestionOptions
          questionIndex={currentQuestionIndex}
          deleteQuestion={deleteQuestion}
        />
      </header>
      <section className={`answers ${displayMode}`}>
        {
          answers.map((answer, i) => (
            <EditableAnswer
              answer={answer}
              answerIndex={i} key={i}
              showIcons={config.showIcons}
              questionIndex={currentQuestionIndex}
            />
          ))
        }
        {
          answers.length < 4 &&
            <AddAnswerButton questionIndex={currentQuestionIndex} />
        }
      </section>
      <QuestionWarningMessage answers={answers} />
    </div>
  )
}

const AddAnswerButton = ({ questionIndex }) => {
  const createNewAnswer = useStore(state => state.createNewAnswer)

  const handleClick = () => {
    createNewAnswer(questionIndex)
  }

  return (
    <button
      className='add-answer-btn'
      onClick={handleClick}
    >
      <AddIcon />
    </button>
  )
}

const QuestionQuery = ({ query, questionIndex, answers }) => {
  const [isEditing, setIsEditing] = useState(false)
  const setQuestionQuery = useStore(state => state.setQuestionQuery)

  const handleTextChange = newText => {
    setQuestionQuery(newText, questionIndex)
  }

  useEffect(() => {
    if (!isEditing && query === '') {
      setQuestionQuery('my question', questionIndex)
    }
  }, [isEditing])

  if (isEditing) {
    return (
      <div className='question-query'>
        <EditableTextArea
          initialText={query}
          setIsEditing={setIsEditing}
          handleTextChange={handleTextChange}
          selectOn={['my question']}
          maxLength={50}
        />
      </div>
    )
  }

  return (
    <div
      className='question-query'
      onClick={() => setIsEditing(true)}
    >
      <span>{query}</span>
      <PencilIcon />
    </div>
  )
}
