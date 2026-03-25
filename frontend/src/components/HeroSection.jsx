import PropTypes from 'prop-types'
import { handleHeroImageError } from '../utils/imageFallback'

function HeroSection({ title, subtitle, imagePath, imageAlt }) {
  return (
    <section className="hero" aria-label="Coffee shop hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Main Landing</p>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <img
        className="hero__image"
        src={imagePath}
        alt={imageAlt}
        loading="eager"
        onError={handleHeroImageError}
      />
    </section>
  )
}

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
}

export default HeroSection
