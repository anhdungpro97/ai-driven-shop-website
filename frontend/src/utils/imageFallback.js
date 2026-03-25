const FALLBACK_ALT = 'Coffee shop image placeholder'
const FALLBACK_LABEL = 'Image unavailable'

export function handleHeroImageError(event) {
  const target = event.currentTarget
  target.onerror = null
  target.src =
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720"><rect width="1200" height="720" fill="#c89c67"/><text x="600" y="360" text-anchor="middle" font-family="Verdana" font-size="42" fill="#2f2218">${FALLBACK_LABEL}</text></svg>`
    )
  target.alt = FALLBACK_ALT
}
