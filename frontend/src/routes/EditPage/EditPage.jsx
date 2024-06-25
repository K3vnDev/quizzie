import { EditMode } from '../../components/EditMode/EditMode'
import { useEditQuiz } from '../../hooks/useEditQuiz'
import useRouteClassName from '../../hooks/useRouteClassName'
import './editPage.css'

export default function EditPage () {
  const { isLoading } = useEditQuiz()
  useRouteClassName('edit')

  if (isLoading) return

  return (
    <EditMode />
  )
}
