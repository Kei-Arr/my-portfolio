const NavbarSkeleton = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 lg:px-12 h-20 transition-all duration-500 glass-dark-top">
            {/* Logo skeleton */}
            <div className="flex items-center space-x-3 group h-full">
                <div className="w-20 h-20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-burgundy-500/30 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Desktop Menu skeleton */}
            <div className="hidden md:flex space-x-8">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="h-6 w-16 bg-cream-100/20 rounded animate-pulse"
                    ></div>
                ))}
            </div>

            {/* Mobile Menu Button skeleton */}
            <div className="md:hidden">
                <div className="w-10 h-10 bg-cream-100/20 rounded animate-pulse"></div>
            </div>
        </nav>
    );
};

export default NavbarSkeleton; 