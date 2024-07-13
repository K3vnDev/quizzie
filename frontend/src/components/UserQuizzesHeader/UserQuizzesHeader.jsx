import './userQuizzesHeader.css'

export function UserQuizzesHeader ({ deleteMode, setDeleteMode, isLoading }) {
  return (
    <header className='user-quizzes-header'>
      {
        !deleteMode
          ? <YourQuizzesTitle
              isLoading={isLoading}
            />
          : <DeleteModeHeader
              setDeleteMode={setDeleteMode}
            />
      }
    </header>
  )
}

const DeleteModeHeader = ({ setDeleteMode }) => {
  const handleClick = () => setDeleteMode(false)

  return (
    <>
      <h3>Click on a quiz to delete...</h3>
      <button onClick={handleClick}>
        Cancel
      </button>
    </>
  )
}

const YourQuizzesTitle = ({ isLoading }) => {
  return isLoading
    ? <div className='your-quizzes-title loading' />
    : <h2 className='your-quizzes-title'>Your Quizzes</h2>
}
