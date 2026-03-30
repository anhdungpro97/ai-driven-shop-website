# Data Model: Coffee Shop Landing Page

## Entity: LandingPageContent
- Purpose: Represents top-level content blocks for the landing page.
- Fields:
  - id (string, required): unique key for page content set.
  - backgroundImagePath (string, required): fixed public asset path /public/background_image.png for the large page background image.
  - backgroundFallbackStyle (string, required): fallback background token/gradient value used when image fails.
  - heroTitle (string, required, 1-120 chars)
  - heroSubtitle (string, optional, 0-240 chars)
  - heroImagePath (string, required): relative asset path for hero image.
  - heroImageAlt (string, required, 5-140 chars)
  - topNavLinks (TopNavLink[], required, min 4)
  - categories (CategoryLink[], required, min 3)
  - footerInfo (ShopInfo, required)
- Validation rules:
  - topNavLinks must include labels Home, Service, About Us, Contact exactly once each.
  - categories must include names Coffee, Juice, Foods exactly once each.
  - backgroundImagePath must equal /public/background_image.png and resolve at runtime.
  - backgroundFallbackStyle must keep text readable when background image is unavailable.
  - heroImagePath must resolve to an existing frontend asset at build time.

## Entity: NavigationAction
- Purpose: Represents account-related header actions.
- Fields:
  - label (enum, required): Login | Register
  - destination (string, required): route or URL target.
  - visible (boolean, required): must be true on initial render.
- Validation rules:
  - both Login and Register actions must be present.
  - visible must be true for both actions on desktop/mobile layouts.

## Entity: TopNavLink
- Purpose: Represents main top navigation entry points in the header area.
- Fields:
  - label (enum, required): Home | Service | About Us | Contact
  - destination (string, required): route or in-page anchor target.
- Validation rules:
  - unique label across records.
  - destination must be non-empty and keyboard-focusable when rendered as a link.

## Entity: CategoryLink
- Purpose: Represents menu category entry points.
- Fields:
  - name (enum, required): Coffee | Juice | Foods
  - destination (string, required)
  - order (integer, required, min 1)
- Validation rules:
  - unique name across records.
  - destination must be non-empty and routable.

## Entity: ShopInfo
- Purpose: Represents required footer business information.
- Fields:
  - shopName (string, required, 1-80 chars)
  - addressLine (string, required, 1-160 chars)
  - contactPhoneOrEmail (string, required, 3-120 chars)
- Validation rules:
  - all fields must be non-empty.
  - content must remain readable in mobile viewport without overlap.

## View State Model
- pageStatus (enum): loading | ready | degraded
- State transitions:
  - loading -> ready when background, hero, and required sections render.
  - loading -> degraded when background or hero image fails but fallback content is shown.
  - degraded -> ready only after successful asset recovery/reload.
