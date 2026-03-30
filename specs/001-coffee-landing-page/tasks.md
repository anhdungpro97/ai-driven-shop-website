# Tasks: Coffee Shop Landing Page

**Input**: Design documents from `/specs/001-coffee-landing-page/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: The feature specification does not explicitly request automated test creation, so this task list uses story-level manual validation tasks.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm project scaffolding, tooling, and static assets for implementation.

- [X] T001 Verify project scripts and dependencies in frontend/package.json
- [X] T002 [P] Verify required static assets in frontend/public/background_image.png and frontend/src/assets/hero-coffee-shop.jpg
- [X] T003 [P] Define shared design tokens in frontend/src/styles/tokens.css
- [X] T004 [P] Establish integration validation index in frontend/tests/integration/README.md
- [X] T005 Create or update baseline app styles entry in frontend/src/App.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement shared app shell and data structures required by all user stories.

**CRITICAL**: Complete this phase before user story work.

- [X] T006 Build application entry wiring in frontend/src/main.jsx
- [X] T007 Build shared app shell composition in frontend/src/App.jsx
- [X] T008 [P] Define shared landing content schema in frontend/src/content/landingContent.js
- [X] T009 [P] Implement image fallback utility in frontend/src/utils/imageFallback.js
- [X] T010 [P] Establish responsive base layout styles in frontend/src/styles/landing.css

**Checkpoint**: Foundational work complete; user stories can proceed.

---

## Phase 3: User Story 1 - View the Main Landing Page (Priority: P1) 🎯 MVP

**Goal**: Visitors see hero content, large page background image, and footer shop details at first load.

**Independent Test Criteria**: On desktop and mobile, hero and footer render correctly, background image path uses `/public/background_image.png`, and fallback behavior keeps text readable when image load fails.

- [X] T011 [US1] Implement hero section rendering with fallback behavior in frontend/src/components/HeroSection.jsx
- [X] T012 [US1] Implement footer information rendering in frontend/src/components/FooterInfo.jsx
- [X] T013 [US1] Set hero, footer, and background content values in frontend/src/content/landingContent.js
- [X] T014 [US1] Integrate hero and footer blocks in frontend/src/App.jsx
- [X] T015 [P] [US1] Implement full-page background readability and fallback styles in frontend/src/styles/landing.css
- [X] T016 [US1] Document manual validation steps and results in frontend/tests/integration/us1-landing-content.md

**Checkpoint**: User Story 1 is independently functional and verifiable.

---

## Phase 4: User Story 2 - See Account Action Buttons (Priority: P2)

**Goal**: Visitors can clearly find and use Login/Register controls across responsive layouts.

**Independent Test Criteria**: Login/Register controls are visible, clearly labeled, keyboard-focusable, and usable on desktop/mobile.

- [X] T017 [US2] Implement Login/Register controls in frontend/src/components/HeaderNav.jsx
- [X] T018 [US2] Define Login/Register action data in frontend/src/content/landingContent.js
- [X] T019 [US2] Integrate account controls into header layout in frontend/src/App.jsx
- [X] T020 [P] [US2] Implement account control readability and focus styles in frontend/src/styles/landing.css
- [X] T021 [US2] Document manual validation for account controls in frontend/tests/integration/us2-account-actions.md

**Checkpoint**: User Story 2 is independently functional and verifiable.

---

## Phase 5: User Story 4 - Use Top Navigation Links (Priority: P2)

**Goal**: Visitors can view and navigate Home, Service, About Us, and Contact links in the top bar.

**Independent Test Criteria**: All top links are visible, readable over the background image, and keyboard-focusable on desktop/mobile.

- [X] T022 [US4] Implement top navigation link rendering in frontend/src/components/HeaderNav.jsx
- [X] T023 [US4] Define top navigation link data in frontend/src/content/landingContent.js
- [X] T024 [US4] Integrate top navigation links in frontend/src/App.jsx
- [X] T025 [P] [US4] Implement top-link contrast and focus styles in frontend/src/styles/landing.css
- [X] T026 [US4] Document manual validation for top navigation links in frontend/tests/integration/final-validation.md

**Checkpoint**: User Story 4 is independently functional and verifiable.

---

## Phase 6: User Story 3 - Access Menu Categories (Priority: P3)

**Goal**: Visitors can access Coffee/Juice/Foods category controls and reach destination sections.

**Independent Test Criteria**: Category controls are visible and navigate to readable destination sections on desktop/mobile.

- [X] T027 [US3] Implement category navigation controls in frontend/src/components/CategoryNav.jsx
- [X] T028 [US3] Implement category destination sections in frontend/src/components/CategorySections.jsx
- [X] T029 [US3] Define category data for Coffee/Juice/Foods in frontend/src/content/landingContent.js
- [X] T030 [US3] Integrate category components in frontend/src/App.jsx
- [X] T031 [P] [US3] Implement category control and section styles in frontend/src/styles/landing.css
- [X] T032 [US3] Document manual validation for category navigation in frontend/tests/integration/us3-category-navigation.md

**Checkpoint**: User Story 3 is independently functional and verifiable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Finalize release-level validation artifacts and cross-story checks.

- [X] T033 [P] Update implementation and validation guide in specs/001-coffee-landing-page/quickstart.md
- [X] T034 Record performance verification evidence in frontend/tests/integration/lighthouse-report.md
- [X] T035 Document final responsive/accessibility regression results in frontend/tests/integration/final-validation.md
- [X] T036 Verify release readiness checklist completion in specs/001-coffee-landing-page/checklists/release-readiness.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all story phases.
- **Phases 3-6 (User Stories)**: Depend on Phase 2 completion.
- **Phase 7 (Polish)**: Depends on completion of all user story phases.

### User Story Completion Order

1. **US1 (P1)**
2. **US2 (P2)**
3. **US4 (P2)**
4. **US3 (P3)**

### User Story Dependency Graph

- US1 -> Polish
- US2 -> Polish
- US4 -> Polish
- US3 -> Polish

All user stories remain independently testable after foundational work.

---

## Parallel Execution Examples

### User Story 1

- T011 in frontend/src/components/HeroSection.jsx
- T012 in frontend/src/components/FooterInfo.jsx
- T015 in frontend/src/styles/landing.css

### User Story 2

- T018 in frontend/src/content/landingContent.js
- T020 in frontend/src/styles/landing.css

### User Story 4

- T023 in frontend/src/content/landingContent.js
- T025 in frontend/src/styles/landing.css

### User Story 3

- T027 in frontend/src/components/CategoryNav.jsx
- T028 in frontend/src/components/CategorySections.jsx
- T031 in frontend/src/styles/landing.css

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup).
2. Complete Phase 2 (Foundational).
3. Complete Phase 3 (US1).
4. Validate US1 independently before proceeding.

### Incremental Delivery

1. Deliver US1.
2. Deliver US2.
3. Deliver US4.
4. Deliver US3.
5. Execute Polish phase and release checks.
