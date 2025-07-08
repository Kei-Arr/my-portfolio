import { Menu, X, Home, User, FolderOpen, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/images/mylogo.png';
import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';

const Navbar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const lenis = useLenis();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Navigation function using Lenis
    const scrollToSection = (sectionId: string) => {
        if (lenis) {
            lenis.scrollTo(`#${sectionId}`, {
                offset: -10,
                duration: 2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                immediate: false,
                lock: true
            });
        } else {

            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        closeMobileMenu();
    };

    // Track active section based on scroll position
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const sections = ['home', 'about', 'projects', 'contact'];
                    const scrollPosition = window.scrollY + 150; // Offset for navbar height

                    let currentSection = 'home'; // Default to home

                    for (const section of sections) {
                        const element = document.getElementById(section);
                        if (element) {
                            const offsetTop = element.offsetTop;

                            // If we've scrolled past the start of this section, it becomes active
                            if (scrollPosition >= offsetTop) {
                                currentSection = section;
                            }
                        }
                    }

                    setActiveSection(currentSection);
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Initial call
        handleScroll();

        // Listen to scroll events with passive option for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { name: 'Home', icon: Home, description: 'Back to homepage', sectionId: 'home' },
        { name: 'About', icon: User, description: 'Learn more about me', sectionId: 'about' },
        { name: 'Projects', icon: FolderOpen, description: 'View my portfolio', sectionId: 'projects' },
        { name: 'Contact', icon: Mail, description: 'Get in touch', sectionId: 'contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-12 h-20 transition-all duration-300 glass-dark">
            <div className="flex items-center space-x-3 group h-full">
                <div
                    className="w-20 h-20 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                    onClick={() => scrollToSection('home')}
                >
                    <img
                        src={logoImage}
                        alt="Khaylle Rosario Logo"
                        className="w-full h-full object-contain filter drop-shadow-lg"
                    />
                </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-0">
                {menuItems.map((item) => (
                    <Button
                        key={item.name}
                        variant="navbar"
                        size="lg"
                        className={`relative group cursor-pointer transition-all duration-300 !outline-none focus:outline-none ${activeSection === item.sectionId
                            ? 'text-cream-50'
                            : 'text-cream-100 hover:text-cream-50'
                            }`}
                        onClick={() => scrollToSection(item.sectionId)}
                    >
                        {item.name}
                        <span className={`absolute bottom-0 h-0.5 bg-cream-300 transition-all duration-75 ${activeSection === item.sectionId
                            ? 'w-full left-0'
                            : 'w-0 left-1/2 group-hover:w-full group-hover:left-0'
                            }`}></span>
                    </Button>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
                variant="navbar"
                size="icon"
                className="md:hidden text-cream-50 hover:text-cream-100 hover:bg-burgundy-500/20 !outline-none focus:outline-none"
                onClick={toggleMobileMenu}
            >
                {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <Menu className="w-6 h-6" />
                )}
            </Button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed left-0 right-0 top-20 z-50 md:hidden h-85">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-dark-800/100 from-60% via-dark-700/90 via-80% to-transparent to-100% backdrop-blur-sm"
                        onClick={closeMobileMenu}
                    >
                    </div>

                    <div className="relative flex flex-col items-center p-12 pt-5">
                        <div className="space-y-4 w-full max-w-sm flex-1 relative">
                            {menuItems.map((item, index) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.sectionId;

                                return (
                                    <div
                                        key={item.name}
                                        className="animate-slide-up"
                                        style={{
                                            animationDelay: `${0.2 + index * 0.1}s`,
                                            animationFillMode: 'both'
                                        }}
                                    >
                                        <Button
                                            variant="destructive"
                                            size="lg"
                                            className={`w-full justify-start transition-all duration-300 group rounded-xl p-4 h-14 border backdrop-blur-sm ${isActive
                                                ? 'text-cream-50 bg-burgundy-500/30 border-burgundy-500/50'
                                                : 'text-cream-100 hover:text-cream-50 hover:bg-burgundy-500/20 border-cream-100/10 hover:border-burgundy-500/30 bg-cream-100/5'
                                                }`}
                                            onClick={() => scrollToSection(item.sectionId)}
                                        >
                                            <Icon className={`w-5 h-5 mr-3 transition-colors duration-300 ${isActive
                                                ? 'text-burgundy-300'
                                                : 'text-burgundy-400 group-hover:text-burgundy-300'
                                                }`} />
                                            <div className="flex-1 text-left">
                                                <div className="font-sans font-semibold text-base">{item.name}</div>
                                                <div className={`text-xs transition-colors duration-300 font-sans ${isActive
                                                    ? 'text-cream-300'
                                                    : 'text-cream-300/70 group-hover:text-cream-300'
                                                    }`}>{item.description}</div>
                                            </div>
                                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;