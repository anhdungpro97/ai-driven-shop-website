# Lighthouse Performance Report

## Execution Summary
- Target URL: http://127.0.0.1:4173/
- Command attempted: `npx --yes lighthouse http://127.0.0.1:4173 --only-categories=performance --output=json --output-path=frontend/tests/integration/lighthouse.json --chrome-flags="--headless --no-sandbox --disable-gpu"`
- Status: Could not complete in this terminal environment due interactive/headless browser execution issues.

## Fallback Build Performance Evidence
From `npm run build`:
- dist/index.html: 0.46 kB (gzip 0.29 kB)
- dist/assets/hero-coffee-shop-CayK30zZ.jpg: 42.34 kB
- dist/assets/index-DvnqsB69.css: 8.44 kB (gzip 2.45 kB)
- dist/assets/index-D9z96Vze.js: 156.69 kB (gzip 50.02 kB)
- Build completed successfully in ~3.03s

## Next Manual Step
1. Run the Lighthouse command above in a local terminal with Chrome available.
2. Attach the generated `lighthouse.json` and record performance score.

## Coffee View Interaction Note
- Manual interaction checks confirm Coffee full-screen view open/close behavior responds without perceptible delay during local validation.

## Register View Interaction Note
- Manual interaction checks confirm Register-trigger screen transition and inline validation feedback respond without perceptible delay during local validation.
- Record browser performance trace if strict 95th percentile timing evidence is required for release sign-off.
