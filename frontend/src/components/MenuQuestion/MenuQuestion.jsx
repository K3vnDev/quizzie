import { useNavigate } from 'react-router-dom'
import { colorAndIcon } from '../../services/colorAndIcon.jsx'
import { useStore } from '../../store/useStore.js'
import { demoQuiz } from '../../store/quizzes/demoQuiz.js'
import { validateQuiz } from '../../services/validateQuiz.js'
import { templateQuiz } from '../../store/quizzes/templateQuiz.js'
import { useTransition } from '../../hooks/useTransition.js'

export function MenuQuestion () {
  const setQuiz = useStore(state => state.setQuiz)
  const navigate = useNavigate()
  const { makeTransition } = useTransition()

  const handleMakeMyOwnQuiz = () => {
    const quizFromStorage = JSON.parse(
      window.localStorage.getItem('localQuiz')
    )
    if (quizFromStorage) {
      const { success } = validateQuiz(quizFromStorage)
      setQuiz(
        success
          ? quizFromStorage
          : templateQuiz
      )
    } else {
      setQuiz(templateQuiz)
    }
    navigate('/edit')
  }

  const answers = [
    {
      text: 'Play a demo quiz',
      callback: () => {
        setQuiz(demoQuiz)
        makeTransition('/play')
      }
    },
    {
      text: 'Play an existing quiz',
      callback: () => navigate('/browse')
    },
    {
      text: 'Make my own quiz',
      callback: handleMakeMyOwnQuiz
    }
  ]

  return (
    <div className='menu-question-box'>
      <h2>What do you want to do?</h2>
      <section>
        {
          answers.map((ans, i) => (
            <MenuAnswer
              index={i} key={i}
              callback={ans.callback}
            >
              {ans.text}
            </MenuAnswer>
          )
          )
        }
      </section>
    </div>
  )
}

function MenuAnswer ({ children, callback, index }) {
  const { color, icon } = colorAndIcon[index]
  const transitioning = useStore(state => state.transitioning)

  return (
    <button
      className='answer-box'
      onClick={callback}
      disabled={transitioning}
      style={{
        '--bg-color': color,
        '--bg-color-st': color + '80'
      }}
    >
      {icon}<span>{children}</span>
    </button>
  )
}
