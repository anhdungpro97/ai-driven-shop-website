# Data Model: Coffee Options Display

## Entity: CoffeeOption
- Purpose: Represents one coffee choice shown in the Coffee options full-screen view.
- Fields:
  - id (string, required): unique key for stable rendering.
  - name (string, required, 1-80 chars): display name for the coffee item.
  - imagePath (string, required): image source for the coffee item.
  - imageAlt (string, required): accessible alternate text for the coffee image.
  - priceDisplay (string, required): formatted price string (for example "$4.50").
  - orderButtonLabel (string, required): label text for per-item order action.
  - order (integer, required, min 1): deterministic display order.
  - available (boolean, required): controls whether an option is shown.
- Validation rules:
  - name must be non-empty and readable in full-screen row layout.
  - imagePath must resolve to a displayable asset.
  - orderButtonLabel must be non-empty and action-oriented.
  - priceDisplay must be non-empty; fallback label used if missing.
  - order values must be unique across visible items.

## Entity: CoffeeOptionsPanelState
- Purpose: Represents UI interaction state for the Coffee options full-screen view.
- Fields:
  - isOpen (boolean, required): indicates whether full-screen view is visible.
  - triggerLabel (string, required): identifies the trigger control ("Coffee").
  - visibleItemCount (integer, required, min 0): number of options currently shown.
- Validation rules:
  - isOpen toggles predictably when Coffee trigger is activated.
  - visibleItemCount equals count of available options rendered.

## Entity: CoffeeOptionsViewModel
- Purpose: Binds view state and option rows for rendering.
- Fields:
  - title (string, required): full-screen heading text.
  - options (CoffeeOption[], required): sorted list of visible coffee options.
  - emptyMessage (string, required): message shown when options list is empty.
  - fallbackPriceLabel (string, required): label shown when option price is unavailable.
- Validation rules:
  - options sorted by order ascending.
  - emptyMessage appears only when options is empty.
  - fallbackPriceLabel appears only for options with missing/invalid priceDisplay.

## View State Transitions
- closed -> open when user activates Coffee trigger.
- open -> closed when user re-activates Coffee trigger, uses view close action, or presses Escape.
- open (with items) -> open (empty state) when no available options exist.
