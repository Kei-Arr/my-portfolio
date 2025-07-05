import { Download, User, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/images/hero.png';
import logoImage from '@/assets/images/mylogo.png';
import './hero-animations.css';
import './kurye-font.css';

const STYLES = {
  navbar: {
    backgroundColor: 'rgba(139, 58, 58, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(246, 240, 240, 0.1)',
  },
  navButton: '#EAE4D5',
  gradient: {
    from: '#FFD7C4',
    to: '#EAE4D5',
  },
  buttons: {
    primary: {
      bg: 'linear-gradient(135deg, #A94A4A 0%, #8B3A3A 100%)', // Your brand color gradient
      text: '#F6F0F0',
      shadow: '0 8px 32px rgba(169, 74, 74, 0.4)',
    },
    secondary: {
      bg: 'rgba(33, 36, 42, 0.8)', 
      text: '#F6F0F0',
      border: `1px solid rgba(234, 228, 213, 0.3)`, 
      shadow: '0 8px 32px rgba(33, 36, 42, 0.4)',
    },
  },
  accent: '#A94A4A', 
  textLight: '#F6F0F0', 
  textAccent: '#FFD7C4', 
} as const;


const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-12 h-20 transition-all duration-300"
      style={STYLES.navbar}
    >
      <Logo />
      <DesktopNavigation />
      <MobileMenuButton />
    </nav>
  );
};

const Logo = () => (
  <div className="flex items-center space-x-3 group h-full">
    <div className="w-20 h-20 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
      <img
        src={logoImage}
        alt="Khaylle Rosario Logo"
        className="w-full h-full object-contain filter drop-shadow-lg"
      />
    </div>
  </div>
);


const DesktopNavigation = () => (
  <div className="hidden md:flex space-x-0">
    {['Home', 'About', 'Projects', 'Contact'].map((item) => (
      <Button
        key={item}
        variant="navbar"
        size="xl"
        className="relative group"
        style={{
          color: STYLES.navButton,
        }}
      >
        {item}
        <span
          className="absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full group-hover:left-0"
          style={{ backgroundColor: STYLES.accent }}
        ></span>
      </Button>
    ))}
  </div>
);

const MobileMenuButton = () => (
  <Button
    variant="navbar"
    size="icon"
    className="md:hidden"
    style={{ color: STYLES.textLight }}
  >
    <Menu className="w-6 h-6" />
  </Button>
);

const HeroContent = () => (
  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
    <div className="text-center space-y-10 max-w-5xl mx-auto">
      <HeroText />
      <CallToActionButtons />
    </div>
  </div>
);


const HeroText = () => (
  <div className="space-y-8">
    <div className="space-y-6">
      <p
        className="text-xl md:text-2xl font-light tracking-wide animate-fade-in"
        style={{ color: STYLES.textLight }}
      >
        Hi, I'm
      </p>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-slide-up">
        <span
          className="text-transparent bg-clip-text block"
          style={{
            backgroundImage: `linear-gradient(135deg, ${STYLES.gradient.from} 0%, ${STYLES.gradient.to} 100%)`,
            WebkitBackgroundClip: 'text',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            fontFamily: "'Kurye Light Italic', serif",
            fontWeight: 300,
          }}
        >
          Khaylle Rosario
        </span>
      </h1>
      <div
        className="w-24 h-1 mx-auto rounded-full"
        style={{ backgroundColor: STYLES.accent }}
      ></div>
    </div>

    <p
      className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto font-light tracking-wide animate-fade-in-delayed"
      style={{ color: STYLES.textLight }}
    >
      Full Stack Developer who brings{' '}

      <span
        className="font-medium"
        style={{ color: STYLES.textAccent }}
      >
        ideas to life{' '}
      </span>
      and{' '}
      <span
        className="font-medium"
        style={{ color: STYLES.textAccent }}
      >
        crafts end-to-end solutions
      </span>{' '}
      that make a{' '}
      <span
        className="font-medium"
        style={{ color: STYLES.textAccent }}
      >
        meaningful impact.
      </span>
    </p>
  </div>
);

const CallToActionButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12 animate-fade-in-delayed">
      <Button
        size="lg"
        className="group relative px-10 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden"
        style={{
          background: STYLES.buttons.primary.bg,
          boxShadow: STYLES.buttons.primary.shadow,
          color: STYLES.buttons.primary.text,
        }}
      >
        <span className="relative z-10 flex items-center">
          <Download className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:translate-y-[-2px]" />
          Download CV
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Button>

      <Button
        size="lg"
        className="group relative px-10 py-4 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 border-2 backdrop-blur-sm overflow-hidden"
        style={{
          backgroundColor: STYLES.buttons.secondary.bg,
          boxShadow: STYLES.buttons.secondary.shadow,
          color: STYLES.buttons.secondary.text,
          borderColor: 'rgba(234, 228, 213, 0.3)', 
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(234, 228, 213, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(234, 228, 213, 0.3)';
        }}
      >
        <span className="relative z-10 flex items-center">
          <User className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-12" />
          Get to know me
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Button>
    </div>
  );
};


const ScrollIndicator = () => (
  <div
    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 animate-float"
    style={{ color: `${STYLES.textLight}cc` }} 
  >
    <div className="flex flex-col items-center space-y-3 cursor-pointer group">
      <span className="text-sm font-light tracking-wider uppercase">Scroll down</span>
      <div className="flex flex-col space-y-1">
        <ChevronDown className="w-5 h-5 animate-bounce" />
        <ChevronDown className="w-5 h-5 animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
    </div>
  </div>
);


const HeroBackground = () => (
  <>
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
    
    <div
      className="absolute inset-0"
      style={{ backgroundColor: 'rgba(33, 36, 42, 0.7)' }} 
    ></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

 
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-pulse"
        style={{ backgroundColor: `${STYLES.accent}30` }} 
      ></div>
      <div
        className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full animate-ping"
        style={{ backgroundColor: `${STYLES.textAccent}40` }} 
      ></div>
      <div
        className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full animate-pulse"
        style={{
          backgroundColor: `${STYLES.gradient.to}30`, 
          animationDelay: '1s'
        }}
      ></div>
    </div>
  </>
);

// Main Hero Section Component
const HeroSection = () => {
  return (
    <section className="min-h-screen w-full relative overflow-hidden">
      <HeroBackground />
      <Navbar />
      <HeroContent />
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;