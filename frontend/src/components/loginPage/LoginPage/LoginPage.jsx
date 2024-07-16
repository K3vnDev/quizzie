import './loginPage.css'
import '../../../index.css'
import { useLogin } from '../../../hooks/useLogin'
import { useRouteClassName } from '../../../hooks/useRouteClassName.js'
import { AppLogo } from '../../root/AppLogo/AppLogo.jsx'
import { FormInput } from '../FormInput/FormInput.jsx'
import { FormCurtain } from '../FormCurtain/FormCurtain.jsx'
import { FormSubmitButton } from '../FormSubmitButton/FormSubmitButton.jsx'
import { useError } from '../../../hooks/useError.js'
import { FormError } from '../FormError/FormError.jsx'
import { useNavigate } from 'react-router-dom'

export function LoginPage () {
  const { login, signUp, showing, setShowing, fetching } = useLogin()
  useRouteClassName('login')

  const dispatchAnimEvent = inputName => {
    const animEvent = new CustomEvent('animateinput', { detail: { inputName } })
    document.dispatchEvent(animEvent)
  }

  return (
    <>
      <main>
        <LoginForm
          login={login}
          showing={showing}
          fetching={fetching}
          dispatchAnimEvent={dispatchAnimEvent}
        />
        <SignUpForm
          signUp={signUp}
          showing={showing}
          fetching={fetching}
          dispatchAnimEvent={dispatchAnimEvent}
        />
        <FormCurtain
          showing={showing}
          setShowing={setShowing}
        />
      </main>
      <AppLogo />
    </>
  )
}

const LoginForm = ({ login, showing, fetching, dispatchAnimEvent }) => {
  const { errorMessage, showError, errorOpacity } = useError()
  const navigate = useNavigate()

  const validateData = (user, pass) => {
    if (!user) {
      showError('Please enter an username')
      dispatchAnimEvent('Username')
      return false
    }
    if (!pass) {
      showError('Please enter a password')
      dispatchAnimEvent('Password')
      return false
    }
    if (user.length < 3) {
      showError('Username must be at least 3 characters long')
      dispatchAnimEvent('Username')
      return false
    }
    if (pass.length < 5) {
      showError('Password must be at least 5 characters long')
      dispatchAnimEvent('Password')
      return false
    }
    return true
  }

  const handleLogin = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get('Username')
    const password = formData.get('Password')

    if (!validateData(username, password)) return
    const { status, message } = await login(username, password)

    if (!status) {
      showError('Couldn\'t login, try again later')
    } else if (status === 'error') {
      showError(message)
      dispatchAnimEvent('')
    } else {
      navigate('/dashboard')
      dispatchAnimEvent('')
    }
  }

  const className = showing === 'login'
    ? 'login-wrapper showing'
    : 'login-wrapper not-showing'

  return (
    <form
      className={className}
      onSubmit={handleLogin}
    >
      <h3>Welcome back!</h3>
      <FormInput m='Username' />
      <FormInput password m='Password' />
      <FormSubmitButton
        label='Login'
        fetching={fetching}
      />
      <FormError
        errorMessage={errorMessage}
        errorOpacity={errorOpacity}
      />
    </form>
  )
}

const SignUpForm = ({ signUp, showing, fetching, dispatchAnimEvent }) => {
  const { errorMessage, showError, errorOpacity } = useError()
  const navigate = useNavigate()

  const validateData = (user, pass, confirmPass) => {
    if (!user) {
      showError('Please enter an username')
      dispatchAnimEvent('Username')
      return false
    }
    if (user.length < 3) {
      showError('Username must be at least 3 characters long')
      dispatchAnimEvent('Username')
      return false
    }
    if (pass !== confirmPass) {
      showError('Passwords do not match')
      dispatchAnimEvent('Password')
      dispatchAnimEvent('Confirm Password')
      return false
    }
    if (!pass) {
      showError('Please enter a password')
      dispatchAnimEvent('Password')
      dispatchAnimEvent('Confirm Password')
      return false
    }
    if (pass.length < 5) {
      showError('Password must be at least 5 characters long')
      dispatchAnimEvent('Password')
      dispatchAnimEvent('Confirm Password')
      return false
    }
    return true
  }

  const handleSignUp = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get('Username')
    const password = formData.get('Password')
    const confirmPass = formData.get('Confirm Password')

    if (!validateData(username, password, confirmPass)) return
    const { status, message } = await signUp(username, password)

    if (!status) {
      showError('Couldn\'t login, try again later')
      dispatchAnimEvent('')
    } else if (status === 'error') {
      showError(message)
      dispatchAnimEvent('')
    } else {
      navigate('/dashboard')
    }
  }

  const className = showing === 'sign-up'
    ? 'login-wrapper showing'
    : 'login-wrapper not-showing'

  return (
    <form
      className={className}
      onSubmit={handleSignUp}
    >
      <h3>Join Quizzie!</h3>
      <FormInput m='Username' />
      <FormInput password m='Password' />
      <FormInput password m='Confirm Password' />
      <FormSubmitButton
        label='Sign Up'
        fetching={fetching}
      />
      <FormError
        errorMessage={errorMessage}
        errorOpacity={errorOpacity}
      />
    </form>
  )
}
