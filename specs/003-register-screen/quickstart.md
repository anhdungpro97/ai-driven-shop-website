# Quickstart: Register Screen Flow

## Prerequisites
- Node.js 20+
- npm 10+

## Setup
1. Enter frontend workspace:
   - cd frontend
2. Install dependencies:
   - npm install

## Run Locally
1. Start development server:
   - npm run dev
2. Open local URL shown by Vite.

## Build and Validate
1. Lint project:
   - npm run lint
2. Build production assets:
   - npm run build

## Feature Verification Steps
1. Open landing page and locate Register action.
2. Activate Register and verify transition to registration screen.
3. Confirm form displays Full Name, Email, Password, and Confirm Password.
4. Enter invalid Email and confirm inline format error appears.
5. Enter Password shorter than 8 characters and confirm weak-password inline error appears.
6. Enter non-matching Confirm Password and confirm mismatch inline error appears.
7. Correct all invalid values and verify inline errors clear.
8. Confirm Register button remains disabled until all required fields are valid.
9. Confirm optional password visibility toggle changes text visibility without changing value.
10. Validate mobile viewport readability with no overlap or clipping.

## Acceptance Checklist
1. Register action transitions to dedicated registration screen.
2. Form hierarchy is clear and visually organized.
3. Inline validation appears and clears correctly for targeted error states.
4. Password is masked by default and supports visibility toggle.
5. Register button enablement strictly follows full-form validity.
6. Transition and validation interactions feel responsive and stable.

## Performance and UX Validation
1. Measure transition and validation feedback timing in browser dev tools.
2. Verify 95% of transition/validation interactions complete within 1 second.
3. Verify keyboard navigation across fields, toggles, and Register action.
4. Record manual validation notes under frontend/tests/integration/.
