import heroCoffeeShopImage from '../assets/hero-coffee-shop.jpg'

export const navigationActions = [
  { label: 'Login', destination: '/login', visible: true },
  { label: 'Register', destination: '/register', visible: true },
]

export const topNavLinks = [
  { label: 'Home', destination: '#top' },
  { label: 'Service', destination: '#service' },
  { label: 'About Us', destination: '#about' },
  { label: 'Contact', destination: '#contact' },
]

export const categoryLinks = [
  { name: 'Coffee', destination: '#coffee', order: 1 },
  { name: 'Juice', destination: '#juice', order: 2 },
  { name: 'Foods', destination: '#foods', order: 3 },
]

export const coffeeOptions = [
  { id: 'espresso', name: 'Espresso', priceDisplay: '$3.00', order: 1, available: true },
  { id: 'americano', name: 'Americano', priceDisplay: '$3.50', order: 2, available: true },
  { id: 'latte', name: 'Cafe Latte', priceDisplay: '$4.75', order: 3, available: true },
  { id: 'cappuccino', name: 'Cappuccino', priceDisplay: '$4.50', order: 4, available: true },
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
  coffeeOptionsPanel: {
    panelId: 'coffee-options-panel',
    title: 'Available Coffee Options',
    emptyMessage: 'No coffee options are available right now.',
    fallbackPriceLabel: 'Price unavailable',
    options: coffeeOptions,
  },
  footerInfo: {
    shopName: 'Morning Roast Coffee House',
    addressLine: '123 Bean Street, Brewtown, CA 90210',
    contactPhoneOrEmail: '(555) 123-4567 | hello@morningroast.example',
  },
}
