# US1 Validation - Landing Content

## Steps
1. Start app with `npm run dev`.
2. Open the landing page in desktop and mobile emulation.
3. Verify a large coffee shop background image is visible behind page content.
4. Verify the configured background source resolves to `/public/background_image.png`.
5. Verify hero section shows image and fallback works when image is unavailable.
6. Verify fallback page background style appears when background image is unavailable.
7. Verify footer shows shop name, address, and contact details.

## Result
- Large background image requirement is implemented and visible on desktop/mobile.
- Background image path requirement `/public/background_image.png` is satisfied.
- Hero and footer requirements are implemented and visible in the page layout.
- Fallback behavior is implemented for hero image loading errors and page background image fallback.
