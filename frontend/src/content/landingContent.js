import heroCoffeeShopImage from '../assets/hero-coffee-shop.jpg'

export const navigationActions = [
  { label: 'Login', destination: '/login', visible: true },
  { label: 'Logout', destination: '/logout', visible: true },
]

export const topNavLinks = [
  { label: 'Home', destination: '#top' },
  { label: 'Service', destination: '#service' },
  { label: 'About Us', destination: '#about' },
  { label: 'Contact', destination: '#contact' },
]

export const categoryLinks = [
  { name: 'Coffee', destination: '#coffee', order: 1 },
  { name: 'Drinks', destination: '#drinks', order: 2 },
  { name: 'Foods', destination: '#foods', order: 3 },
]

export const landingPageContent = {
  id: 'coffee-landing-main',
  backgroundImagePath: '/background_image.png',
  backgroundFallbackStyle: 'linear-gradient(130deg, #3d2617, #554337)',
  heroTitle: 'Coffees',
  heroSubtitle: 'www.morningroast.example',
  heroImagePath: heroCoffeeShopImage,
  heroImageAlt: 'Warm coffee shop interior with brewed coffee and pastries',
  categories: categoryLinks,
  footerInfo: {
    shopName: 'Morning Roast Coffee House',
    addressLine: '123 Bean Street, Brewtown, CA 90210',
    contactPhoneOrEmail: '(555) 123-4567 | hello@morningroast.example',
  },
}
