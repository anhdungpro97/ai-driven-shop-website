import { useState } from 'react'
import HeaderNav from './components/HeaderNav'
import HeroSection from './components/HeroSection'
import CategoryNav from './components/CategoryNav'
import CoffeeOptionsPanel from './components/CoffeeOptionsPanel'
import RegisterScreen from './components/RegisterScreen'
import CategorySections from './components/CategorySections'
import FooterInfo from './components/FooterInfo'
import { landingPageContent, navigationActions, topNavLinks } from './content/landingContent'

function App() {
  const [coffeePanelOpen, setCoffeePanelOpen] = useState(false)
  const [activeScreen, setActiveScreen] = useState('landing')

  const appBackgroundStyle = {
    '--page-bg-image': `url(${landingPageContent.backgroundImagePath})`,
    '--page-bg-fallback': landingPageContent.backgroundFallbackStyle,
  }

  const { coffeeOptionsPanel } = landingPageContent
  const { registerScreen } = landingPageContent

  function toggleCoffeePanel() {
    setCoffeePanelOpen((previous) => !previous)
  }

  function closeCoffeePanel() {
    setCoffeePanelOpen(false)
  }

  function openRegisterScreen() {
    setCoffeePanelOpen(false)
    setActiveScreen('registration')
  }

  return (
    <div className="app-shell" style={appBackgroundStyle}>
      <HeaderNav actions={navigationActions} links={topNavLinks} onRegisterActivate={openRegisterScreen} />
      <main>
        {activeScreen === 'registration' ? (
          <RegisterScreen content={registerScreen} />
        ) : (
          <>
            <HeroSection
              title={landingPageContent.heroTitle}
              subtitle={landingPageContent.heroSubtitle}
              imagePath={landingPageContent.heroImagePath}
              imageAlt={landingPageContent.heroImageAlt}
            />
            <CategoryNav
              categories={landingPageContent.categories}
              coffeePanelId={coffeeOptionsPanel.panelId}
              coffeePanelOpen={coffeePanelOpen}
              onCoffeeToggle={toggleCoffeePanel}
            />
            <CoffeeOptionsPanel
              panelId={coffeeOptionsPanel.panelId}
              title={coffeeOptionsPanel.title}
              options={coffeeOptionsPanel.options}
              emptyMessage={coffeeOptionsPanel.emptyMessage}
              fallbackPriceLabel={coffeeOptionsPanel.fallbackPriceLabel}
              isOpen={coffeePanelOpen}
              onRequestClose={closeCoffeePanel}
            />
            <CategorySections categories={landingPageContent.categories} />
          </>
        )}
      </main>
      <FooterInfo info={landingPageContent.footerInfo} />
    </div>
  )
}

export default App
