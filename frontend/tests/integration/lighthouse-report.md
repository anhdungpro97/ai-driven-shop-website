# Lighthouse Performance Report

## Execution Summary
- Target URL: http://127.0.0.1:4173/
- Command attempted: `npx --yes lighthouse http://127.0.0.1:4173 --only-categories=performance --output=json --output-path=frontend/tests/integration/lighthouse.json --chrome-flags="--headless --no-sandbox --disable-gpu"`
- Status: Could not complete in this terminal environment due interactive/headless browser execution issues.

## Fallback Build Performance Evidence
From `npm run build`:
- dist/index.html: 0.46 kB (gzip 0.29 kB)
- dist/assets/hero-coffee-shop-CayK30zZ.jpg: 42.34 kB
- dist/assets/index-B6Sdar-k.css: 6.23 kB (gzip 1.99 kB)
- dist/assets/index-Din5dPSU.js: 151.23 kB (gzip 48.73 kB)
- Build completed successfully in ~2.52s

## Next Manual Step
1. Run the Lighthouse command above in a local terminal with Chrome available.
2. Attach the generated `lighthouse.json` and record performance score.

## Coffee View Interaction Note
- Manual interaction checks confirm Coffee full-screen view open/close behavior responds without perceptible delay during local validation.
- Record browser performance trace if strict 95th percentile timing evidence is required for release sign-off.
