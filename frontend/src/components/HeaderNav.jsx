import PropTypes from 'prop-types'

function HeaderNav({ actions, links }) {
  return (
    <header className="header-nav" role="banner">
      <div className="header-nav__brand">
        <p className="brand-kicker">Hanover and Tyke</p>
      </div>

      <nav aria-label="Primary links" className="header-nav__links">
        {links.map((link) => (
          <a key={link.label} className="top-link" href={link.destination}>
            {link.label}
          </a>
        ))}
      </nav>

      <nav aria-label="Account actions" className="header-nav__actions">
        {actions
          .filter((action) => action.visible)
          .map((action) => (
            <a key={action.label} className="nav-btn" href={action.destination}>
              {action.label}
            </a>
          ))}
        <button className="menu-btn" type="button" aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  )
}

HeaderNav.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
    })
  ).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      visible: PropTypes.bool.isRequired,
    })
  ).isRequired,
}

export default HeaderNav
