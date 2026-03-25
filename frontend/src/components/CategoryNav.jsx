import PropTypes from 'prop-types'

function CategoryNav({ categories }) {
  return (
    <nav className="category-nav" aria-label="Menu categories">
      {categories.map((category) => (
        <a key={category.name} className="category-chip" href={category.destination}>
          {category.name}
        </a>
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
}

export default CategoryNav
