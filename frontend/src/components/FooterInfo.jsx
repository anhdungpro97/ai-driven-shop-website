import PropTypes from 'prop-types'

function FooterInfo({ info }) {
  return (
    <footer className="footer-info" aria-label="Shop information footer">
      <h4>{info.shopName}</h4>
      <p>{info.addressLine}</p>
      <p>{info.contactPhoneOrEmail}</p>
    </footer>
  )
}

FooterInfo.propTypes = {
  info: PropTypes.shape({
    shopName: PropTypes.string.isRequired,
    addressLine: PropTypes.string.isRequired,
    contactPhoneOrEmail: PropTypes.string.isRequired,
  }).isRequired,
}

export default FooterInfo
