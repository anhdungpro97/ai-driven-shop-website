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
  {
    id: 'espresso',
    name: 'Espresso',
    imagePath: heroCoffeeShopImage,
    imageAlt: 'Espresso coffee served in a small ceramic cup',
    priceDisplay: '$3.00',
    orderButtonLabel: 'Order Espresso',
    order: 1,
    available: true,
  },
  {
    id: 'americano',
    name: 'Americano',
    imagePath: heroCoffeeShopImage,
    imageAlt: 'Americano coffee in a clear glass mug',
    priceDisplay: '$3.50',
    orderButtonLabel: 'Order Americano',
    order: 2,
    available: true,
  },
  {
    id: 'latte',
    name: 'Cafe Latte',
    imagePath: heroCoffeeShopImage,
    imageAlt: 'Cafe latte with milk foam art in a wide cup',
    priceDisplay: '$4.75',
    orderButtonLabel: 'Order Cafe Latte',
    order: 3,
    available: true,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    imagePath: heroCoffeeShopImage,
    imageAlt: 'Cappuccino topped with frothy milk',
    priceDisplay: '$4.50',
    orderButtonLabel: 'Order Cappuccino',
    order: 4,
    available: true,
  },
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
  registerScreen: {
    kicker: 'Create Your Account',
    title: 'Register',
    subtitle: 'Fill in your details to continue with Morning Roast.',
    primaryActionLabel: 'Register',
    labels: {
      fullName: 'Full Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      showPassword: 'Show',
      hidePassword: 'Hide',
    },
    validationMessages: {
      fullNameRequired: 'Full name is required.',
      emailInvalid: 'Please enter a valid email address.',
      passwordWeak: 'Password must be at least 8 characters.',
      confirmRequired: 'Please confirm your password.',
      confirmMismatch: 'Passwords do not match.',
    },
  },
  footerInfo: {
    shopName: 'Morning Roast Coffee House',
    addressLine: '123 Bean Street, Brewtown, CA 90210',
    contactPhoneOrEmail: '(555) 123-4567 | hello@morningroast.example',
  },
}
