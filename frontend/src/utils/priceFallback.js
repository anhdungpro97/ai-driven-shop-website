export function resolveCoffeePrice(priceDisplay, fallbackPriceLabel) {
  const normalized = typeof priceDisplay === 'string' ? priceDisplay.trim() : ''
  return normalized.length > 0 ? normalized : fallbackPriceLabel
}
