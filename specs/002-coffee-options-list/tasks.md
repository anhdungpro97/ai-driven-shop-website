# Tasks: Coffee Options Display

**Input**: Design documents from `/specs/002-coffee-options-list/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Automated tests are not explicitly requested; this plan includes lint/build and manual validation evidence tasks.

**Organization**: Tasks are grouped by user story to ensure each story can be implemented and validated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm baseline files and prepare feature validation scaffolding.

- [X] T001 Confirm feature quickstart entry points in specs/002-coffee-options-list/quickstart.md
- [X] T002 [P] Confirm Coffee trigger integration points in frontend/src/components/CategoryNav.jsx
- [X] T003 [P] Confirm app-level state orchestration points in frontend/src/App.jsx
- [X] T004 [P] Prepare integration evidence anchors in frontend/tests/integration/README.md
- [X] T005 [P] Confirm style token references used by landing page styles in frontend/src/styles/landing.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared structures required by all user stories.

**CRITICAL**: Complete this phase before starting user stories.

- [X] T006 Normalize coffee options schema fields in frontend/src/content/landingContent.js
- [X] T007 [P] Normalize price fallback resolver in frontend/src/utils/priceFallback.js
- [X] T008 Create or normalize Coffee options view shell in frontend/src/components/CoffeeOptionsPanel.jsx
- [X] T009 Integrate Coffee options open/close state in frontend/src/App.jsx
- [X] T010 [P] Wire Coffee trigger props for active/toggle state in frontend/src/components/CategoryNav.jsx
- [X] T011 [P] Add base full-screen Coffee view layout styles in frontend/src/styles/landing.css

**Checkpoint**: Foundation complete; user stories can now proceed.

---

## Phase 3: User Story 1 - Open Coffee Options (Priority: P1) 🎯 MVP

**Goal**: Activating the Coffee control opens and closes a visible full-screen options view.

**Independent Test Criteria**: Activate Coffee on landing page, confirm full-screen view opens with list context, then closes via toggle, close action, and Escape key.

- [X] T012 [US1] Implement full-screen view container and heading in frontend/src/components/CoffeeOptionsPanel.jsx
- [X] T013 [US1] Implement end-to-end toggle flow between trigger and view in frontend/src/App.jsx
- [X] T014 [US1] Implement close action and Escape-key close behavior in frontend/src/components/CoffeeOptionsPanel.jsx
- [X] T015 [P] [US1] Add Coffee trigger accessibility state attributes in frontend/src/components/CategoryNav.jsx
- [X] T016 [P] [US1] Add open and closed visual state styles in frontend/src/styles/landing.css
- [X] T017 [US1] Record manual toggle validation evidence in frontend/tests/integration/us4-coffee-options-toggle.md

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - See Name, Image, Price, and Order Action Clearly (Priority: P1)

**Goal**: Each coffee option row clearly presents name, image, price, and order button.

**Independent Test Criteria**: Open full-screen Coffee view and verify each row includes name, image, price, and order button with fallback price and empty-state behavior.

- [X] T018 [US2] Add per-option image and order-button content fields in frontend/src/content/landingContent.js
- [X] T019 [US2] Render name, image, price, and order button per row in frontend/src/components/CoffeeOptionsPanel.jsx
- [X] T020 [US2] Apply fallback price label behavior in frontend/src/components/CoffeeOptionsPanel.jsx
- [X] T021 [P] [US2] Add row alignment and media sizing styles in frontend/src/styles/landing.css
- [X] T022 [P] [US2] Implement empty-state rendering branch in frontend/src/components/CoffeeOptionsPanel.jsx
- [X] T023 [US2] Record item detail readability validation in frontend/tests/integration/us5-coffee-options-pricing.md

**Checkpoint**: User Story 2 is independently functional and testable.

---

## Phase 5: User Story 3 - Readable and Consistent Presentation (Priority: P2)

**Goal**: The full-screen Coffee view remains readable, visually consistent, and keyboard-friendly across viewport sizes.

**Independent Test Criteria**: Validate desktop and mobile readability, keyboard navigation visibility, and no clipping/overlap in full-screen state.

- [X] T024 [US3] Implement responsive full-screen Coffee view rules in frontend/src/styles/landing.css
- [X] T025 [US3] Refine typography, spacing, and contrast alignment in frontend/src/styles/landing.css
- [X] T026 [P] [US3] Improve keyboard focus order and focus ring behavior in frontend/src/components/CoffeeOptionsPanel.jsx
- [X] T027 [P] [US3] Improve trigger active/focus visual feedback in frontend/src/components/CategoryNav.jsx
- [X] T028 [US3] Record responsive readability validation in frontend/tests/integration/us6-coffee-options-readability.md
- [X] T029 [US3] Record open/close performance observations in frontend/tests/integration/lighthouse-report.md

**Checkpoint**: User Story 3 is independently functional and testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cross-story reconciliation and release validation.

- [X] T030 [P] Update final regression notes across stories in frontend/tests/integration/final-validation.md
- [X] T031 [P] Update integration index and evidence links in frontend/tests/integration/README.md
- [X] T032 Reconcile verification wording with implemented flow in specs/002-coffee-options-list/quickstart.md
- [X] T033 Reconcile contract language with implementation in specs/002-coffee-options-list/contracts/ui-contract.md
- [X] T034 Reconcile data model fields with implementation in specs/002-coffee-options-list/data-model.md
- [X] T035 Capture final lint/build evidence in frontend/tests/integration/lighthouse-report.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2.
- **Phase 4 (US2)**: Depends on US1 interaction baseline.
- **Phase 5 (US3)**: Depends on US1 and US2 behavior/content completeness.
- **Phase 6 (Polish)**: Depends on completion of all user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational phase.
- **US2 (P1)**: Depends on US1 open/close baseline and shared content model.
- **US3 (P2)**: Depends on US1 and US2 completed interaction/content rendering.

### User Story Completion Order

1. **US1 (P1)**
2. **US2 (P1)**
3. **US3 (P2)**

### User Story Dependency Graph

- US1 -> US2
- US1 -> US3
- US2 -> US3
- US1/US2/US3 -> Polish

---

## Parallel Execution Examples

### User Story 1

- T015 and T016 can run in parallel after T012-T014 start.

### User Story 2

- T021 and T022 can run in parallel after T018-T020 starts.

### User Story 3

- T026 and T027 can run in parallel after T024-T025 starts.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup).
2. Complete Phase 2 (Foundational).
3. Complete Phase 3 (US1).
4. Validate US1 independently before continuing.

### Incremental Delivery

1. Deliver US1 full-screen open/close journey.
2. Deliver US2 option row content and fallback behavior.
3. Deliver US3 responsive/readability/accessibility refinements.
4. Complete Polish phase and final validation evidence.
