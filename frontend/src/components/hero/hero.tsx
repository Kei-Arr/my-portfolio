import './hero.css';
import { Navbar, HeroContent, HeroBackground } from '.';

function HeroSection() {
  return (
    <section id="home" className="min-h-screen w-full relative overflow-hidden">
      <Navbar />
      <HeroBackground />
      <HeroContent />
    </section>
  );
}

export default HeroSection;