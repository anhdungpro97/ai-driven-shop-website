import HeaderNav from './components/HeaderNav'
import HeroSection from './components/HeroSection'
import CategoryNav from './components/CategoryNav'
import CategorySections from './components/CategorySections'
import FooterInfo from './components/FooterInfo'
import { landingPageContent, navigationActions, topNavLinks } from './content/landingContent'

function App() {
  const appBackgroundStyle = {
    '--page-bg-image': `url(${landingPageContent.backgroundImagePath})`,
    '--page-bg-fallback': landingPageContent.backgroundFallbackStyle,
  }

  return (
    <div className="app-shell" style={appBackgroundStyle}>
      <HeaderNav actions={navigationActions} links={topNavLinks} />
      <main>
        <HeroSection
          title={landingPageContent.heroTitle}
          subtitle={landingPageContent.heroSubtitle}
          imagePath={landingPageContent.heroImagePath}
          imageAlt={landingPageContent.heroImageAlt}
        />
        <CategoryNav categories={landingPageContent.categories} />
        <CategorySections categories={landingPageContent.categories} />
      </main>
      <FooterInfo info={landingPageContent.footerInfo} />
    </div>
  )
}

export default App
