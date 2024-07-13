import { useEditQuiz } from '../../../hooks/useEditQuiz'
import { useRouteClassName } from '../../../hooks/useRouteClassName'
import { EditMode } from '../EditMode/EditMode.jsx'
import '../../../index.css'
import './editPage.css'

export function EditPage () {
  const { isLoading } = useEditQuiz()
  useRouteClassName('edit')

  return !isLoading
    ? <EditMode />
    : <></>
}
