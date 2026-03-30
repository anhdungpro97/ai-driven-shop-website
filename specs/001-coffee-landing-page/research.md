# Research: Coffee Shop Landing Page

## Decision 1: Frontend scaffold approach
- Decision: Use ReactJS with Vite for the frontend project shell.
- Rationale: Vite provides fast startup/build for a small frontend feature and fits JavaScript + React requirements.
- Alternatives considered:
  - Create React App: slower build/start and legacy default tooling.
  - Plain HTML/CSS/JS without React: rejected because requested stack explicitly includes ReactJS.

## Decision 2: Styling strategy
- Decision: Use plain CSS with a token file (colors, spacing, typography) and page-level stylesheet.
- Rationale: Meets requirement for HTML/CSS/JavaScript and keeps styling explicit, lightweight, and easy to maintain.
- Alternatives considered:
  - CSS-in-JS: unnecessary complexity for a single landing page.
  - Utility framework (e.g., Tailwind): adds dependency overhead for limited scope.

## Decision 3: Hero image handling
- Decision: Use a local general coffee shop hero asset with fallback UI text when image fails to load.
- Rationale: Ensures stable rendering and graceful degradation for edge cases in the spec.
- Alternatives considered:
  - Remote CDN image only: risk of runtime dependency and load failures.
  - CSS-only decorative hero: does not satisfy requirement to display a general image.

## Decision 4: Navigation behavior
- Decision: Place Login/Register in top navigation and present category links as explicit actions for Coffee, Juice, Foods.
- Rationale: Meets visibility requirements and improves discoverability across desktop/mobile.
- Alternatives considered:
  - Hide account actions in menu drawer by default: weaker visibility requirement compliance.
  - Category cards only in body section: acceptable but less immediate than nav-level links.

## Decision 5: Testing and verification approach
- Decision: Use Vitest + React Testing Library for component behavior and a manual responsive/performance QA checklist.
- Rationale: Frontend-only scope benefits from quick component tests plus practical visual checks.
- Alternatives considered:
  - End-to-end tooling only (Playwright/Cypress): overkill for initial landing page scope.
  - Manual testing only: insufficient repeatability for key acceptance checks.

## Decision 6: Performance verification
- Decision: Validate page load/interaction budgets using Lighthouse and browser performance traces in representative desktop/mobile viewports.
- Rationale: Provides measurable and repeatable checks aligned with constitution performance gate.
- Alternatives considered:
  - No explicit measurement: violates constitution requirement for performance budgets.
  - Synthetic-only API metrics: not applicable to frontend-only static page scope.

## Decision 7: Large page background image strategy
- Decision: Use the required background image path /public/background_image.png with a readability-preserving overlay and fallback gradient.
- Rationale: Satisfies the explicit path requirement in the specification while preserving text contrast and resilience if image loading fails.
- Alternatives considered:
  - No overlay: rejected due readability risk for header/body/footer text.
  - External hosted background image: rejected due runtime availability and caching uncertainty.

## Decision 8: Top navigation and control readability
- Decision: Provide top navigation links (Home, Service, About Us, Contact) and keep top controls visually distinct over the image background.
- Rationale: Aligns with updated UX direction and improves discoverability while maintaining readable interaction affordances.
- Alternatives considered:
  - Account actions only: rejected because the updated feature now requires explicit top links.
  - Fully transparent controls without contrast treatment: rejected due readability and accessibility risk over variable image backgrounds.
