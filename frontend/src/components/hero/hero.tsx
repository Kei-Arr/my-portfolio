import './hero-animations.css';
import { Navbar, HeroContent, HeroBackground } from '.';

const HeroSection = () => {
  return (
    <section className="min-h-screen w-full relative overflow-hidden">
      <HeroBackground />
      <Navbar />
      <HeroContent />
    </section>
  );
};

export default HeroSection;