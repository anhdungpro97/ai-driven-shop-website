import PropTypes from 'prop-types'

function CategoryNav({ categories, coffeePanelId, coffeePanelOpen, onCoffeeToggle }) {
  return (
    <nav className="category-nav" aria-label="Menu categories">
      {categories.map((category) => (
        category.name === 'Coffee' ? (
          <button
            key={category.name}
            type="button"
            className={`category-chip ${coffeePanelOpen ? 'category-chip--active' : ''}`}
            aria-expanded={coffeePanelOpen}
            aria-controls={coffeePanelId}
            onClick={onCoffeeToggle}
          >
            {category.name}
          </button>
        ) : (
          <a key={category.name} className="category-chip" href={category.destination}>
            {category.name}
          </a>
        )
      ))}
    </nav>
  )
}

CategoryNav.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    })
  ).isRequired,
  coffeePanelId: PropTypes.string.isRequired,
  coffeePanelOpen: PropTypes.bool.isRequired,
  onCoffeeToggle: PropTypes.func.isRequired,
}

export default CategoryNav
