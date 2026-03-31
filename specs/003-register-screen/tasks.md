# Tasks: Register Screen Flow

**Input**: Design documents from `/specs/003-register-screen/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Automated tests are not explicitly requested; this plan includes lint/build and manual integration validation tasks.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm baseline frontend files and prepare feature validation scaffolding.

- [X] T001 Confirm Register trigger source and header action wiring in frontend/src/components/HeaderNav.jsx
- [X] T002 [P] Confirm app shell composition and state orchestration points in frontend/src/App.jsx
- [X] T003 [P] Confirm landing content action metadata in frontend/src/content/landingContent.js
- [X] T004 [P] Create integration validation index entry for feature 003 in frontend/tests/integration/README.md
- [X] T005 [P] Confirm reusable style tokens and baseline layout references in frontend/src/styles/landing.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared registration flow structures required before story implementation.

**CRITICAL**: Complete this phase before user story work.

- [X] T006 Create registration screen content schema in frontend/src/content/landingContent.js
- [X] T007 [P] Create form validation helper utilities in frontend/src/utils/registrationValidation.js
- [X] T008 Create registration screen component shell in frontend/src/components/RegisterScreen.jsx
- [X] T009 Integrate view-state switch (landing/registration) in frontend/src/App.jsx
- [X] T010 [P] Add Register trigger callback props from app state into frontend/src/components/HeaderNav.jsx
- [X] T011 [P] Add base registration screen layout and transition classes in frontend/src/styles/landing.css

**Checkpoint**: Foundation complete; user stories can now proceed.

---

## Phase 3: User Story 1 - Open Registration Screen (Priority: P1) 🎯 MVP

**Goal**: Tapping Register transitions from landing to a dedicated registration screen with clear form hierarchy.

**Independent Test**: Open landing page, tap Register, and verify smooth transition to registration screen with all required fields visible.

- [X] T012 [US1] Implement registration view container and heading hierarchy in frontend/src/components/RegisterScreen.jsx
- [X] T013 [US1] Implement Register-trigger transition flow in frontend/src/App.jsx
- [X] T014 [US1] Wire Register action handler to open registration view in frontend/src/components/HeaderNav.jsx
- [X] T015 [P] [US1] Add transition animation and registration screen entrance styles in frontend/src/styles/landing.css
- [X] T016 [P] [US1] Add responsive registration layout rules for mobile viewports in frontend/src/styles/landing.css
- [X] T017 [US1] Record manual transition and hierarchy validation notes in frontend/tests/integration/us7-register-screen-transition.md

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Complete Valid Registration Form (Priority: P1)

**Goal**: Visitors can fill valid form data, use password visibility toggle, and enable Register only when the form is valid.

**Independent Test**: Enter valid Full Name, Email, Password (>=8 chars), and matching Confirm Password, then verify Register button enables.

- [X] T018 [US2] Implement Full Name, Email, Password, and Confirm Password controlled inputs in frontend/src/components/RegisterScreen.jsx
- [X] T019 [US2] Implement aggregate form-validity computation and Register button disable/enable state in frontend/src/components/RegisterScreen.jsx
- [X] T020 [US2] Implement password visibility toggle behavior in frontend/src/components/RegisterScreen.jsx
- [X] T021 [P] [US2] Implement password minimum-length rule (8 chars) using helper validation in frontend/src/utils/registrationValidation.js
- [X] T022 [P] [US2] Add form control and primary action visual hierarchy styles in frontend/src/styles/landing.css
- [X] T023 [US2] Record manual valid-form and button-state validation notes in frontend/tests/integration/us8-register-form-validity.md

**Checkpoint**: User Story 2 is independently functional and testable.

---

## Phase 5: User Story 3 - Receive Inline Validation Guidance (Priority: P2)

**Goal**: Visitors receive immediate field-level inline guidance for invalid email, weak password, and mismatched confirm password.

**Independent Test**: Enter invalid values and verify field-specific inline errors appear and clear when values become valid.

- [X] T024 [US3] Implement inline error rendering near each form input in frontend/src/components/RegisterScreen.jsx
- [X] T025 [US3] Implement email-format and confirm-password-match validation messages in frontend/src/utils/registrationValidation.js
- [X] T026 [US3] Implement touched-field validation timing (blur, then on-change) in frontend/src/components/RegisterScreen.jsx
- [X] T027 [P] [US3] Add inline error typography, spacing, and contrast styles in frontend/src/styles/landing.css
- [X] T028 [P] [US3] Add keyboard focus visibility and accessible helper/error semantics in frontend/src/components/RegisterScreen.jsx
- [X] T029 [US3] Record manual inline-validation behavior notes in frontend/tests/integration/us9-register-inline-validation.md

**Checkpoint**: User Story 3 is independently functional and testable.

---

## Phase 6: User Story 4 - Close Registration Screen (Priority: P2)

**Goal**: Visitors can close the registration screen and return to the initial page with smooth transition behavior.

**Independent Test**: Open the registration screen, activate close control, and verify return to the initial page with no registration panel remaining visible.

- [X] T036 [US4] Add registration close control and click handling in frontend/src/components/RegisterScreen.jsx
- [X] T037 [US4] Implement registration-to-landing close transition flow in frontend/src/App.jsx
- [X] T038 [P] [US4] Add close-control placement and interaction styles in frontend/src/styles/landing.css
- [X] T039 [P] [US4] Add close-flow state cleanup behavior in frontend/src/components/RegisterScreen.jsx
- [X] T040 [US4] Record manual close-flow validation notes in frontend/tests/integration/us10-register-screen-close.md
- [X] T041 [US4] Update integration validation index with US10 coverage in frontend/tests/integration/README.md

**Checkpoint**: User Story 4 is independently functional and testable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final cross-story reconciliation and release validation.

- [X] T030 [P] Reconcile quickstart validation wording with implemented behavior in specs/003-register-screen/quickstart.md
- [X] T031 [P] Reconcile UI contract wording with implemented controls and states in specs/003-register-screen/contracts/ui-contract.md
- [X] T032 [P] Reconcile data model fields/states with implementation in specs/003-register-screen/data-model.md
- [X] T033 Update integration validation index with US7-US10 references in frontend/tests/integration/README.md
- [X] T034 Capture final regression notes for feature 003 in frontend/tests/integration/final-validation.md
- [X] T035 Capture lint/build performance evidence for feature 003 in frontend/tests/integration/lighthouse-report.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Setup; blocks all user stories.
- **Phase 3 (US1)**: Depends on Foundational completion.
- **Phase 4 (US2)**: Depends on US1 registration screen availability.
- **Phase 5 (US3)**: Depends on US2 form-state and validation baseline.
- **Phase 6 (US4)**: Depends on US1 registration screen availability.
- **Phase 7 (Polish)**: Depends on completion of all user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational; no dependencies on other user stories.
- **US2 (P1)**: Depends on US1 registration screen context.
- **US3 (P2)**: Depends on US2 input and form-validity behavior.
- **US4 (P2)**: Depends on US1 registration screen availability and transition framework.

### User Story Completion Order

1. **US1 (P1)**
2. **US2 (P1)**
3. **US3 (P2)**
4. **US4 (P2)**

### User Story Dependency Graph

- US1 -> US2
- US2 -> US3
- US1 -> US4
- US1/US2/US3/US4 -> Polish

---

## Parallel Execution Examples

### User Story 1

- T015 and T016 can run in parallel after T012-T014 starts.

### User Story 2

- T021 and T022 can run in parallel after T018-T020 starts.

### User Story 3

- T027 and T028 can run in parallel after T024-T026 starts.

### User Story 4

- T038 and T039 can run in parallel after T036-T037 starts.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup).
2. Complete Phase 2 (Foundational).
3. Complete Phase 3 (US1).
4. Validate US1 independently before continuing.

### Incremental Delivery

1. Deliver US1 transition and registration-screen hierarchy.
2. Deliver US2 valid-form completion and button enablement.
3. Deliver US3 inline validation guidance and accessibility behavior.
4. Deliver US4 close-screen return behavior.
5. Complete Polish phase and final validation evidence.
