const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export function getRegistrationErrors(values, messages) {
  const fullName = normalizeText(values.fullName)
  const email = normalizeText(values.email)
  const password = typeof values.password === 'string' ? values.password : ''
  const confirmPassword = typeof values.confirmPassword === 'string' ? values.confirmPassword : ''

  return {
    fullName: fullName.length > 0 ? '' : messages.fullNameRequired,
    email: EMAIL_REGEX.test(email) ? '' : messages.emailInvalid,
    password: password.length >= 8 ? '' : messages.passwordWeak,
    confirmPassword:
      confirmPassword.length === 0
        ? messages.confirmRequired
        : confirmPassword === password
          ? ''
          : messages.confirmMismatch,
  }
}

export function isRegistrationFormValid(errors) {
  return Object.values(errors).every((message) => message.length === 0)
}
