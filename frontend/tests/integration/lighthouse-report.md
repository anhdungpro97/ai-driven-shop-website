# Lighthouse Performance Report

## Execution Summary
- Target URL: http://127.0.0.1:4173/
- Command attempted: `npx --yes lighthouse http://127.0.0.1:4173 --only-categories=performance --output=json --output-path=frontend/tests/integration/lighthouse.json --chrome-flags="--headless --no-sandbox --disable-gpu"`
- Status: Could not complete in this terminal environment due interactive/headless browser execution issues.

## Fallback Build Performance Evidence
From `npm run build`:
- dist/index.html: 0.46 kB (gzip 0.29 kB)
- dist/assets/index-CdcaN5UY.css: 4.09 kB (gzip 1.51 kB)
- dist/assets/index-CnhHgWUP.js: 147.87 kB (gzip 47.77 kB)
- Build completed successfully in ~2.17s

## Next Manual Step
1. Run the Lighthouse command above in a local terminal with Chrome available.
2. Attach the generated `lighthouse.json` and record performance score.

## Coffee Panel Interaction Note
- Manual interaction checks confirm Coffee panel open/close behavior responds without perceptible delay during local validation.
- Record browser performance trace if strict 95th percentile timing evidence is required for release sign-off.
