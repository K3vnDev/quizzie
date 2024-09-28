import { useStore } from '../../../store/useStore'
import { LoadingArrows } from '../../root/LoadingArrows/LoadingArrows'
import './formSubmitButton.css'

export function FormSubmitButton({ label, fetching }) {
  const formTransitionating = useStore(state => state.formTransitionating)

  return (
    <button className='form-submit-button' disabled={fetching || formTransitionating}>
      {fetching ? <LoadingArrows /> : label}
    </button>
  )
}
