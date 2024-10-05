import { useEffect, useState } from 'react'
import { useStore } from '../../../store/useStore.js'
import './quizName.css'
import { Pencil as PencilIcon } from '../../../icons/Pencil'
import { EditableText } from '../EditableText/EditableText'

export const QuizName = () => {
  const { name: quizName } = useStore(state => state.quiz)
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
    <div className='quiz-name'>
      {isEditing ? (
        <EditableText
          initialText={quizName}
          maxLength={20}
          setIsEditing={setIsEditing}
          handleTextChange={setQuizName}
          selectOn={['My New Quiz']}
        />
      ) : (
        <>
          <h3 onClick={enterEditMode}>{quizName}</h3>
          <PencilIcon />
        </>
      )}
    </div>
  )
}
