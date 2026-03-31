# US8 Validation - Register Form Validity and Action State

## Steps
1. Open registration screen from Register action.
2. Verify primary Register button is disabled initially.
3. Enter valid Full Name.
4. Enter valid Email format.
5. Enter Password with 8 or more characters.
6. Enter matching Confirm Password.
7. Confirm Register button becomes enabled only when all fields are valid.
8. Clear one valid field and confirm Register button returns to disabled state.
9. Use password visibility toggle and confirm text visibility changes without value loss.

## Result
- Register button remains disabled until all required fields satisfy validation.
- Register button enables only when full form is valid.
- Password visibility toggle works without mutating field values.
