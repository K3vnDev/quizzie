import { Timer as TimerIcon } from '../../../icons/Timer.jsx'
import { Question as QuestionIcon } from '../../../icons/Question.jsx'
import { UserQuizOptionsMenu } from '../UserQuizOptionsMenu/UserQuizOptionsMenu.jsx'
import { useEffect, useRef, useState } from 'react'
import './userQuiz.css'
import { UserQuizDeleteMenu } from '../UserQuizDeleteMenu/UserQuizDeleteMenu.jsx'

export function UserQuiz({ quizzes, index, deleteMode, setUserData }) {
  const quiz = quizzes[index]
  const [showingDeleteMenu, setShowingDeleteMenu] = useState(false)
  const { id, name, previewColor, config, questions } = quiz
  const userQuizRef = useRef()

  useEffect(() => {
    const handleMouseLeave = () => {
      setShowingDeleteMenu(false)
    }

    userQuizRef.current.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      if (userQuizRef.current) {
        userQuizRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  const className = deleteMode ? 'user-quiz delete-mode' : 'user-quiz'

  const handleClick = e => {
    e.stopPropagation()
    if (deleteMode) setShowingDeleteMenu(true)
  }

  return (
    <div
      className={className}
      style={{ '--bg-color': previewColor }}
      onClick={handleClick}
      ref={userQuizRef}
    >
      <h4>{name}</h4>
      <section>
        <div>
          <TimerIcon />
          <span>{config.answerTime}s</span>
        </div>
        <div>
          <QuestionIcon />
          <span>{questions.length}</span>
        </div>
      </section>
      {deleteMode ? (
        <UserQuizDeleteMenu
          setUserData={setUserData}
          showingDeleteMenu={showingDeleteMenu}
          setShowingDeleteMenu={setShowingDeleteMenu}
          quizId={id}
          quizzes={quizzes}
        />
      ) : (
        <UserQuizOptionsMenu quiz={quiz} />
      )}
    </div>
  )
}
