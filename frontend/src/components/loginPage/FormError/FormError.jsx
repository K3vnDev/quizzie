import './formError.css'

export function FormError ({ errorMessage, errorOpacity }) {
  const className = `form-error ${errorOpacity}`

  return (
    <div className={className}>
      {errorMessage}.
    </div>
  )
}
