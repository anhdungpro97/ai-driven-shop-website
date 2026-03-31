# Data Model: Register Screen Flow

## Entity: RegistrationFormField
- Purpose: Represents one input field in the registration form and its local validation state.
- Fields:
  - key (string, required): one of fullName, email, password, confirmPassword.
  - value (string, required): current user-entered value.
  - normalizedValue (string, optional): trimmed/normalized value used for validation checks.
  - touched (boolean, required): indicates whether user has interacted with field.
  - valid (boolean, required): current validation result for this field.
  - errorMessage (string, optional): inline message shown when invalid.
- Validation rules:
  - fullName is invalid when blank or whitespace-only.
  - email is invalid when not in accepted email format.
  - password is invalid when length is less than 8 characters.
  - confirmPassword is invalid when it does not match password.

## Entity: RegistrationFormState
- Purpose: Aggregates form values and validity for action enablement.
- Fields:
  - fields (RegistrationFormField[], required): all required form field states.
  - isFormValid (boolean, required): true only when all required fields are valid.
  - canSubmit (boolean, required): mirrors isFormValid for Register button enabled state.
  - submitAttempted (boolean, required): indicates if submit was attempted for global validation pass.
- Validation rules:
  - canSubmit MUST be false when any required field is invalid.
  - isFormValid MUST re-compute after each relevant field interaction.

## Entity: PasswordVisibilityState
- Purpose: Tracks visibility behavior for password-related fields.
- Fields:
  - passwordVisible (boolean, required): controls masked/visible display for Password field.
  - confirmPasswordVisible (boolean, optional): controls masked/visible display for Confirm Password field when supported.
- Validation rules:
  - default state is masked (passwordVisible=false).
  - toggling visibility MUST NOT alter field value.

## Entity: RegistrationViewState
- Purpose: Represents current UI screen mode and transition status.
- Fields:
  - activeScreen (string, required): landing or registration.
  - transitionInProgress (boolean, required): indicates whether screen transition animation is active.
  - transitionName (string, optional): identifier for transition animation variant.
  - closeActionAvailable (boolean, required): indicates whether a close control is available while registration screen is active.
- Validation rules:
  - activeScreen transitions landing -> registration when Register action is activated.
  - activeScreen transitions registration -> landing when close action is activated.
  - transitionInProgress resolves to false after animation completes.
  - closeActionAvailable MUST be true when activeScreen is registration.

## State Transitions
- landing -> registration when Register action is activated.
- registration -> landing when close action is activated.
- registration fields untouched -> touched after first interaction.
- invalid field -> valid when correction satisfies field rule.
- canSubmit false -> true only when all required fields are valid.
