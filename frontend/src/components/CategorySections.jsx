import PropTypes from 'prop-types'

function CategorySections({ categories }) {
  return (
    <section className="category-sections" aria-label="Category destinations">
      {categories.map((category) => (
        <article key={category.name} id={category.destination.replace('#', '')} className="category-card">
          <h3>{category.name}</h3>
          <p>
            This is a placeholder destination for the {category.name} section. Detailed items can be
            added in future iterations.
          </p>
        </article>
      ))}
    </section>
  )
}

CategorySections.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default CategorySections
