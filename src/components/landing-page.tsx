import { HeroSection } from './hero-section';
import { DemoSection } from './demo-section';
import { FeaturesSection } from './features-section';
import { FooterSection } from './footer-section';

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      <DemoSection />
      <FeaturesSection />
      <FooterSection />
    </div>
  );
}; 