import { Add as AddIcon } from '../../icons/Add.jsx'
import { useStore } from '../../store/useStore.js'
import { EditableAnswer } from './EditableAnswer.jsx'
import { Pencil as PencilIcon } from '../../icons/Pencil.jsx'
import { More as MoreIcon } from '../../icons/More.jsx'
import './editQuestionBox.css'
import { useState } from 'react'
import { EditableText } from '../EditableText/EditableText.jsx'

export function EditQuestionBox ({ currentQuestionIndex }) {
  const { config, questions } = useStore(state => state.quiz)
  const { query, displayMode, answers } = questions[currentQuestionIndex]

  return (
    <div className='edit-question-box'>
      <header>
        <QuestionQuery
          questionIndex={currentQuestionIndex}
          query={query}
        />
        <QuestionOptions />
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
    </div>
  )
}

const AddAnswerButton = ({ questionIndex }) => {
  const addAnswer = useStore(state => state.addAnswer)

  const handleClick = () => {
    addAnswer(questionIndex)
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

const QuestionOptions = () => {
  return (
    <div className='edit-question-options'>
      <MoreIcon />
    </div>
  )
}

const QuestionQuery = ({ query, questionIndex }) => {
  const [isEditing, setIsEditing] = useState(false)
  const setQuestionQuery = useStore(state => state.setQuestionQuery)

  const handleTextChange = newText => {
    setQuestionQuery(newText, questionIndex)
  }

  if (isEditing) {
    return (
      <div className='question-query'>
        <EditableText
          initialText={query}
          setIsEditing={setIsEditing}
          handleTextChange={handleTextChange}
          maxLength={100}
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
