# Quickstart: Coffee Options Display

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
2. Open the local URL shown by Vite.

## Build and Validate
1. Lint project:
   - npm run lint
2. Build production assets:
   - npm run build

## Feature Verification Steps
1. Open landing page and activate Coffee control.
2. Confirm coffee options panel appears and shows item name + price rows.
3. Confirm panel closes when toggled/closed.
4. Confirm empty-state message appears when options list is empty.
5. Confirm fallback price label appears for option rows with missing price.
6. Confirm readable layout and aligned name/price display on desktop and mobile.
7. Confirm keyboard users can open and close the panel (including Escape key close).

## Acceptance Checklist
1. Coffee trigger opens and closes options panel reliably.
2. Each visible coffee item displays both name and price.
3. Name and price values are easy to scan and visually aligned.
4. Panel styling matches current landing page visual language.
5. Empty and fallback states are explicitly visible when applicable.
6. Open/close interaction is responsive and free of console errors.

## Performance and UX Validation
1. Measure open/close interaction in browser dev tools.
2. Verify 95% of interactions complete within 1 second.
3. Verify no clipping/overlap at mobile breakpoints.
4. Record manual validation notes in frontend/tests/integration/us4-coffee-options-toggle.md, frontend/tests/integration/us5-coffee-options-pricing.md, and frontend/tests/integration/us6-coffee-options-readability.md.
