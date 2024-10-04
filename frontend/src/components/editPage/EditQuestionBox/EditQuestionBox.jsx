import { useEffect, useState } from 'react'
import { Add as AddIcon } from '../../../icons/Add.jsx'
import { Pencil as PencilIcon } from '../../../icons/Pencil.jsx'
import { useStore } from '../../../store/useStore.js'
import './editQuestionBox.css'
import { EditableAnswer } from '../EditableAnswer/EditableAnswer.jsx'
import { EditableText } from '../EditableText/EditableText.jsx'
import { QuestionOptions } from '../QuestionOptions/QuestionOptions.jsx'
import { QuestionWarningMessage } from '../QuestionWarningMessage/QuestionWarningMessage.jsx'

export function EditQuestionBox({ currentQuestionIndex, deleteQuestion }) {
  const questions = useStore(state => state.quiz.questions)
  const { query, displayMode, answers } = questions[currentQuestionIndex]
  const transitioning = useStore(state => state.transitioning)

  const className = `edit-question-box ${transitioning ? 'disabled' : ''}`

  return (
    <div className={className}>
      <header>
        <QuestionQuery questionIndex={currentQuestionIndex} query={query} />
        <QuestionOptions questionIndex={currentQuestionIndex} deleteQuestion={deleteQuestion} />
      </header>
      <section className={`answers ${displayMode}`}>
        {answers.map((answer, i) => (
          <EditableAnswer
            answer={answer}
            answerIndex={i}
            key={i}
            questionIndex={currentQuestionIndex}
          />
        ))}
        {answers.length < 4 && <AddAnswerButton questionIndex={currentQuestionIndex} />}
      </section>
      <QuestionWarningMessage answers={answers} />
    </div>
  )
}

const AddAnswerButton = ({ questionIndex }) => {
  const createNewAnswer = useStore(state => state.createNewAnswer)
  const transitioning = useStore(state => state.transitioning)

  const handleClick = () => {
    createNewAnswer(questionIndex)
  }

  return (
    <button className='add-answer-btn' onClick={handleClick} disabled={transitioning}>
      <AddIcon />
    </button>
  )
}

const QuestionQuery = ({ query, questionIndex }) => {
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
        <EditableText
          initialText={query}
          setIsEditing={setIsEditing}
          handleTextChange={handleTextChange}
          selectOn={['my question']}
          displayAsTextArea
          maxLength={50}
        />
      </div>
    )
  }

  return (
    <div className='question-query' onClick={() => setIsEditing(true)}>
      <span>{query}</span>
      <PencilIcon />
    </div>
  )
}
