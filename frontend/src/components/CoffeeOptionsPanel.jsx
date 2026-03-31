import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { resolveCoffeePrice } from '../utils/priceFallback'

function CoffeeOptionsPanel({
  panelId,
  title,
  options,
  emptyMessage,
  fallbackPriceLabel,
  isOpen,
  onRequestClose,
}) {
  const visibleOptions = options
    .filter((option) => option.available)
    .sort((left, right) => left.order - right.order)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        onRequestClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onRequestClose])

  if (!isOpen) {
    return null
  }

  return (
    <section id={panelId} className="coffee-panel" aria-label="Coffee options" role="region">
      <div className="coffee-panel__content">
        <div className="coffee-panel__header">
          <h3>{title}</h3>
          <button
            type="button"
            className="coffee-panel__close"
            aria-label="Close coffee options"
            onClick={onRequestClose}
          >
            Close
          </button>
        </div>

        {visibleOptions.length === 0 ? (
          <p className="coffee-panel__empty">{emptyMessage}</p>
        ) : (
          <ul className="coffee-panel__list">
            {visibleOptions.map((option) => (
              <li key={option.id} className="coffee-panel__row">
                <img src={option.imagePath} alt={option.imageAlt} className="coffee-panel__image" />
                <div className="coffee-panel__meta">
                  <span className="coffee-panel__name">{option.name}</span>
                  <strong className="coffee-panel__price">
                    {resolveCoffeePrice(option.priceDisplay, fallbackPriceLabel)}
                  </strong>
                </div>
                <button type="button" className="coffee-panel__order-btn">
                  {option.orderButtonLabel}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

CoffeeOptionsPanel.propTypes = {
  panelId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
      imageAlt: PropTypes.string.isRequired,
      priceDisplay: PropTypes.string,
      orderButtonLabel: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
      available: PropTypes.bool.isRequired,
    })
  ).isRequired,
  emptyMessage: PropTypes.string.isRequired,
  fallbackPriceLabel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

export default CoffeeOptionsPanel
