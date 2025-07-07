import { Menu, X, Home, User, FolderOpen, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/images/mylogo.png';
import { useState } from 'react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const menuItems = [
        { name: 'Home', icon: Home, description: 'Back to homepage' },
        { name: 'About', icon: User, description: 'Learn more about me' },
        { name: 'Projects', icon: FolderOpen, description: 'View my portfolio' },
        { name: 'Contact', icon: Mail, description: 'Get in touch' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-12 h-20 transition-all duration-300 glass-dark">
            <div className="flex items-center space-x-3 group h-full">
                <div className="w-20 h-20 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                    <img
                        src={logoImage}
                        alt="Khaylle Rosario Logo"
                        className="w-full h-full object-contain filter drop-shadow-lg"
                    />
                </div>
            </div>

            <div className="hidden md:flex space-x-0">
                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                    <Button
                        key={item}
                        variant="navbar"
                        size="lg"
                        className="relative group text-cream-100"
                    >
                        {item}
                        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-cream-300 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                    </Button>
                ))}
            </div>

            <Button
                variant="navbar"
                size="icon"
                className="md:hidden text-cream-50 hover:text-cream-100 hover:bg-burgundy-500/20"
                onClick={toggleMobileMenu}
            >
                {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <Menu className="w-6 h-6" />
                )}
            </Button>

            {/* Partial Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed left-0 right-0 top-20 z-50 md:hidden h-85">
                    <div
                         className="absolute inset-0 bg-gradient-to-b from-dark-800/100 from-60% via-dark-700/90 via-80% to-transparent to-100% backdrop-blur-sm"
                        onClick={closeMobileMenu}
                    >
                    </div>

                    {/* Menu Content */}
                    <div className="relative flex flex-col items-center p-12 pt-5">
                        {/* Menu Items */}
                        <div className="space-y-4 w-full max-w-sm flex-1 relative">
                            {menuItems.map((item, index) => {
                                const Icon = item.icon;
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
                                            className="w-full justify-start text-cream-100 hover:text-cream-50 hover:bg-burgundy-500/20 transition-all duration-300 group rounded-xl p-4 h-14 border border-cream-100/10 hover:border-burgundy-500/30 backdrop-blur-sm bg-cream-100/5"
                                            onClick={closeMobileMenu}
                                        >
                                            <Icon className="w-5 h-5 mr-3 text-burgundy-400 group-hover:text-burgundy-300 transition-colors duration-300" />
                                            <div className="flex-1 text-left">
                                                <div className="font-sans font-semibold text-base">{item.name}</div>
                                                <div className="text-cream-300/70 text-xs group-hover:text-cream-300 transition-colors duration-300 font-sans">{item.description}</div>
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