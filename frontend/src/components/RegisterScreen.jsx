import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { getRegistrationErrors, isRegistrationFormValid } from '../utils/registrationValidation'

const INITIAL_VALUES = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const INITIAL_TOUCHED = {
  fullName: false,
  email: false,
  password: false,
  confirmPassword: false,
}

function RegisterScreen({ content, onCloseRequest, transitionState }) {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [touched, setTouched] = useState(INITIAL_TOUCHED)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const errors = useMemo(
    () => getRegistrationErrors(values, content.validationMessages),
    [values, content.validationMessages]
  )

  const canSubmit = useMemo(() => isRegistrationFormValid(errors), [errors])

  function handleChange(event) {
    const { name, value } = event.target
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleBlur(event) {
    const { name } = event.target
    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitAttempted(true)
  }

  function shouldShowError(name) {
    return (touched[name] || submitAttempted) && errors[name]
  }

  function handleClose() {
    setValues(INITIAL_VALUES)
    setTouched(INITIAL_TOUCHED)
    setSubmitAttempted(false)
    setPasswordVisible(false)
    setConfirmPasswordVisible(false)
    onCloseRequest()
  }

  const sectionClassName =
    transitionState === 'exit'
      ? 'register-screen register-screen--exit'
      : 'register-screen register-screen--enter'

  return (
    <section className={sectionClassName} aria-label="Registration screen">
      <div className="register-screen__card">
        <header className="register-screen__header">
          <button type="button" className="register-screen__close" onClick={handleClose}>
            {content.labels.closeRegister}
          </button>
          <p className="register-screen__kicker">{content.kicker}</p>
          <h2>{content.title}</h2>
          <p>{content.subtitle}</p>
        </header>

        <form className="register-form" noValidate onSubmit={handleSubmit}>
          <label className="register-form__field" htmlFor="fullName">
            <span>{content.labels.fullName}</span>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
              aria-invalid={Boolean(shouldShowError('fullName'))}
              aria-describedby="fullName-error"
            />
            {shouldShowError('fullName') ? (
              <small id="fullName-error" className="register-form__error" role="alert">
                {errors.fullName}
              </small>
            ) : null}
          </label>

          <label className="register-form__field" htmlFor="email">
            <span>{content.labels.email}</span>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              aria-invalid={Boolean(shouldShowError('email'))}
              aria-describedby="email-error"
            />
            {shouldShowError('email') ? (
              <small id="email-error" className="register-form__error" role="alert">
                {errors.email}
              </small>
            ) : null}
          </label>

          <label className="register-form__field" htmlFor="password">
            <span>{content.labels.password}</span>
            <div className="register-form__password-wrap">
              <input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
                aria-invalid={Boolean(shouldShowError('password'))}
                aria-describedby="password-error"
              />
              <button
                type="button"
                className="register-form__toggle"
                onClick={() => setPasswordVisible((current) => !current)}
                aria-label={passwordVisible ? content.labels.hidePassword : content.labels.showPassword}
              >
                {passwordVisible ? content.labels.hidePassword : content.labels.showPassword}
              </button>
            </div>
            {shouldShowError('password') ? (
              <small id="password-error" className="register-form__error" role="alert">
                {errors.password}
              </small>
            ) : null}
          </label>

          <label className="register-form__field" htmlFor="confirmPassword">
            <span>{content.labels.confirmPassword}</span>
            <div className="register-form__password-wrap">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={confirmPasswordVisible ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
                aria-invalid={Boolean(shouldShowError('confirmPassword'))}
                aria-describedby="confirmPassword-error"
              />
              <button
                type="button"
                className="register-form__toggle"
                onClick={() => setConfirmPasswordVisible((current) => !current)}
                aria-label={
                  confirmPasswordVisible ? content.labels.hidePassword : content.labels.showPassword
                }
              >
                {confirmPasswordVisible ? content.labels.hidePassword : content.labels.showPassword}
              </button>
            </div>
            {shouldShowError('confirmPassword') ? (
              <small id="confirmPassword-error" className="register-form__error" role="alert">
                {errors.confirmPassword}
              </small>
            ) : null}
          </label>

          <button type="submit" className="register-form__submit" disabled={!canSubmit}>
            {content.primaryActionLabel}
          </button>
        </form>
      </div>
    </section>
  )
}

RegisterScreen.propTypes = {
  content: PropTypes.shape({
    kicker: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    primaryActionLabel: PropTypes.string.isRequired,
    labels: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      confirmPassword: PropTypes.string.isRequired,
      showPassword: PropTypes.string.isRequired,
      hidePassword: PropTypes.string.isRequired,
      closeRegister: PropTypes.string.isRequired,
    }).isRequired,
    validationMessages: PropTypes.shape({
      fullNameRequired: PropTypes.string.isRequired,
      emailInvalid: PropTypes.string.isRequired,
      passwordWeak: PropTypes.string.isRequired,
      confirmRequired: PropTypes.string.isRequired,
      confirmMismatch: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onCloseRequest: PropTypes.func.isRequired,
  transitionState: PropTypes.oneOf(['enter', 'exit']).isRequired,
}

export default RegisterScreen
