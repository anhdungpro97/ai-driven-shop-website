# US9 Validation - Inline Field Validation Behavior

## Steps
1. Open registration screen.
2. Enter invalid email and blur field.
3. Confirm email inline error appears next to Email input.
4. Enter password shorter than 8 characters and blur field.
5. Confirm weak-password inline error appears.
6. Enter non-matching Confirm Password and blur field.
7. Confirm mismatch inline error appears.
8. Correct each invalid value.
9. Confirm corresponding inline error messages clear after correction.

## Result
- Inline validation messages are field-specific and appear in the correct location.
- Email, weak-password, and mismatch errors behave as expected.
- Errors clear as soon as values become valid.
