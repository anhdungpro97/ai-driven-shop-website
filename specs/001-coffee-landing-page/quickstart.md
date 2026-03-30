# Quickstart: Coffee Shop Landing Page

## Prerequisites
- Node.js 20+
- npm 10+

## Setup
1. Create frontend app scaffold (if not already present):
   - npm create vite@5.5.2 frontend -- --template react
2. Install dependencies:
   - cd frontend
   - npm install

## Run Locally
1. Start development server:
   - npm run dev
2. Open the local URL shown by Vite.

## Build and Preview
1. Build production assets:
   - npm run build
2. Preview production build:
   - npm run preview

## Lint and Verification
1. Run lint checks:
   - npm run lint
2. Review validation notes:
   - frontend/tests/integration/us1-landing-content.md
   - frontend/tests/integration/us2-account-actions.md
   - frontend/tests/integration/us3-category-navigation.md
   - frontend/tests/integration/final-validation.md
3. Review performance report:
   - frontend/tests/integration/lighthouse-report.md

## Implementation Checklist
1. Landing page uses /public/background_image.png as the large coffee shop background image with readable text overlay.
2. Header/top nav contains visible Home, Service, About Us, and Contact links.
3. Header/top nav contains visible Login and Register actions.
4. Hero section displays a general coffee shop image and fallback behavior.
5. Category controls show Coffee, Juice, and Foods.
6. Footer shows shop name, address, and contact details.
7. Layout works for desktop and mobile viewports.

## Test/Validation
1. Unit/component checks (Vitest + React Testing Library):
   - Verify required elements render.
   - Verify category links and account actions are visible.
2. Manual responsive checks:
   - Validate desktop and mobile layouts.
   - Validate large background image visibility and readability at both breakpoints.
   - Validate fallback background when the background image is unavailable.
   - Validate top navigation links (Home, Service, About Us, Contact) are visible and keyboard reachable.
   - Validate keyboard navigation for header/category controls.
3. Performance checks:
   - Run Lighthouse on landing page and verify:
     - Visual completeness <= 3 seconds in 95% of runs.
     - Interaction readiness <= 2 seconds.
