# Tasks: Coffee Shop Landing Page

**Input**: Design documents from `/specs/001-coffee-landing-page/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Automated test authoring is not explicitly requested in the feature specification; this task set includes manual validation tasks per story.

**Organization**: Tasks are grouped by user story for independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Every task description includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm and prepare frontend scaffolding, assets, and base styling files.

- [X] T001 Verify frontend scripts and dependencies in frontend/package.json
- [X] T002 [P] Ensure required hero/background assets exist in frontend/src/assets/hero-coffee-shop.jpg and frontend/public/background_image.png
- [X] T003 [P] Define shared design tokens in frontend/src/styles/tokens.css
- [X] T004 [P] Initialize integration validation index in frontend/tests/integration/README.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build core app composition and shared content structures used by all stories.

**CRITICAL**: Complete this phase before starting user story implementation.

- [X] T005 Create app entry wiring in frontend/src/main.jsx
- [X] T006 Create base app shell structure in frontend/src/App.jsx
- [X] T007 [P] Model shared landing content structure in frontend/src/content/landingContent.js
- [X] T008 [P] Implement hero image fallback utility in frontend/src/utils/imageFallback.js
- [X] T009 [P] Implement baseline global/responsive styles in frontend/src/styles/landing.css

**Checkpoint**: Foundation complete; user stories can proceed independently.

---

## Phase 3: User Story 1 - View the Main Landing Page (Priority: P1)

**Goal**: Visitors immediately see hero content, large background image from `/public/background_image.png`, and footer shop details.

**Independent Test Criteria**: On desktop and mobile, hero and footer render correctly, background image is sourced from `/public/background_image.png`, and fallback behavior keeps content readable when images fail.

- [X] T010 [US1] Implement hero section rendering and image fallback handling in frontend/src/components/HeroSection.jsx
- [X] T011 [US1] Implement footer information block in frontend/src/components/FooterInfo.jsx
- [X] T012 [US1] Set background image path and hero/footer content values in frontend/src/content/landingContent.js
- [X] T013 [US1] Integrate hero and footer sections into app shell in frontend/src/App.jsx
- [X] T014 [P] [US1] Implement full-page background image overlay/fallback readability styles in frontend/src/styles/landing.css
- [X] T015 [US1] Record manual validation for landing content and background path in frontend/tests/integration/us1-landing-content.md

**Checkpoint**: User Story 1 is independently functional and verifiable.

---

## Phase 4: User Story 2 - See Account Action Buttons (Priority: P2)

**Goal**: Visitors can clearly see and use Login/Logout controls across responsive layouts.

**Independent Test Criteria**: Login/Logout are visible, clearly labeled, keyboard-focusable, and usable on desktop/mobile.

- [X] T016 [US2] Implement Login/Logout action controls in header component in frontend/src/components/HeaderNav.jsx
- [X] T017 [US2] Define account action entries in shared content model in frontend/src/content/landingContent.js
- [X] T018 [US2] Integrate account actions into app shell header in frontend/src/App.jsx
- [X] T019 [P] [US2] Apply account-action focus/readability responsive styling in frontend/src/styles/landing.css
- [X] T020 [US2] Record manual validation for account actions in frontend/tests/integration/us2-account-actions.md

**Checkpoint**: User Story 2 is independently functional and verifiable.

---

## Phase 5: User Story 4 - Use Top Navigation Links (Priority: P2)

**Goal**: Visitors see and can navigate Home, Service, About Us, and Contact links in the top bar.

**Independent Test Criteria**: All four links are visible, readable over background image, and keyboard-focusable on desktop/mobile.

- [X] T021 [US4] Implement top navigation link rendering in header component in frontend/src/components/HeaderNav.jsx
- [X] T022 [US4] Define top navigation link data in frontend/src/content/landingContent.js
- [X] T023 [US4] Integrate top navigation links into app shell header in frontend/src/App.jsx
- [X] T024 [P] [US4] Implement link contrast/focus states over image background in frontend/src/styles/landing.css
- [X] T025 [US4] Record manual validation for top navigation links in frontend/tests/integration/final-validation.md

**Checkpoint**: User Story 4 is independently functional and verifiable.

---

## Phase 6: User Story 3 - Access Menu Categories (Priority: P3)

**Goal**: Visitors can access Coffee/Drinks/Foods category controls and reach destination sections.

**Independent Test Criteria**: Category controls are visible and navigate to readable destination sections on desktop/mobile.

- [X] T026 [US3] Implement category navigation component in frontend/src/components/CategoryNav.jsx
- [X] T027 [US3] Implement category destination sections in frontend/src/components/CategorySections.jsx
- [X] T028 [US3] Define category destination data in frontend/src/content/landingContent.js
- [X] T029 [US3] Integrate category components into app shell in frontend/src/App.jsx
- [X] T030 [P] [US3] Implement category navigation and section styling in frontend/src/styles/landing.css
- [X] T031 [US3] Record manual validation for category navigation in frontend/tests/integration/us3-category-navigation.md

**Checkpoint**: User Story 3 is independently functional and verifiable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Finalize docs, performance evidence, accessibility checks, and release readiness.

- [X] T032 [P] Update implementation and verification steps in specs/001-coffee-landing-page/quickstart.md
- [X] T033 Document performance verification evidence in frontend/tests/integration/lighthouse-report.md
- [X] T034 Perform final responsive/accessibility regression documentation in frontend/tests/integration/final-validation.md
- [X] T035 Verify release readiness checklist completion in specs/001-coffee-landing-page/checklists/release-readiness.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all story phases.
- **Phases 3-6 (User Stories)**: Depend on Phase 2 completion.
- **Phase 7 (Polish)**: Depends on completion of all user story phases.

### User Story Completion Order

1. **US1 (P1)**
2. **US2 (P2)**
3. **US4 (P2)**
4. **US3 (P3)**

### Story Dependency Graph

- US1 -> Polish
- US2 -> Polish
- US4 -> Polish
- US3 -> Polish

All user stories remain independently testable after foundational work.

---

## Parallel Execution Examples

### User Story 1

- [X] T010 [US1] Implement hero section rendering and image fallback handling in frontend/src/components/HeroSection.jsx
- [X] T011 [US1] Implement footer information block in frontend/src/components/FooterInfo.jsx
- [X] T014 [P] [US1] Implement full-page background image overlay/fallback readability styles in frontend/src/styles/landing.css

### User Story 2

- [X] T017 [US2] Define account action entries in shared content model in frontend/src/content/landingContent.js
- [X] T019 [P] [US2] Apply account-action focus/readability responsive styling in frontend/src/styles/landing.css

### User Story 4

- [X] T022 [US4] Define top navigation link data in frontend/src/content/landingContent.js
- [X] T024 [P] [US4] Implement link contrast/focus states over image background in frontend/src/styles/landing.css

### User Story 3

- [X] T026 [US3] Implement category navigation component in frontend/src/components/CategoryNav.jsx
- [X] T027 [US3] Implement category destination sections in frontend/src/components/CategorySections.jsx
- [X] T030 [P] [US3] Implement category navigation and section styling in frontend/src/styles/landing.css

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate US1 independently before progressing.

### Incremental Delivery

1. Deliver US1.
2. Deliver US2.
3. Deliver US4.
4. Deliver US3.
5. Execute Polish phase and release checks.
