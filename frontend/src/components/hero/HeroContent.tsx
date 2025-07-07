import { Download, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroContent = () => (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
        <div className="text-center space-y-10 max-w-5xl mx-auto">
            <div className="space-y-8">
                <div className="space-y-6">
                    <p className="text-xl md:text-2xl font-light tracking-wide animate-fade-in text-cream-50">
                        Hi, I'm
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight animate-slide-up">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-burgundy-400 to-cream-200 block font-light font-kurye drop-shadow-lg">
                            Khaylle Rosario
                        </span>
                    </h1>
                    <div className="w-24 h-1 mx-auto rounded-full bg-burgundy-500"></div>
                </div>

                <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto font-light tracking-wide animate-fade-in-delayed text-cream-50">
                    Full Stack Developer who brings{' '}
                    <span className="font-medium text-cream-100">
                        ideas to life{' '}
                    </span>
                    and{' '}
                    <span className="font-medium text-cream-100">
                        crafts end-to-end solutions
                    </span>{' '}
                    that make a{' '}
                    <span className="font-medium text-cream-100">
                        meaningful impact.
                    </span>
                </p>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12 animate-fade-in-delayed">
                <Button
                    size="lg"
                    className="group relative px-10 py-4 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden bg-primary-gradient shadow-burgundy text-cream-50"
                >
                    <span className="relative z-10 flex items-center">
                        <Download className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:translate-y-[-2px]" />
                        Download CV
                    </span>
                    <div className="absolute inset-0 bg-glass-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>

                <Button
                    size="lg"
                    className="group relative px-10 py-4 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 border-2 border-cream-100/30 hover:border-cream-100/50 backdrop-blur-sm overflow-hidden bg-dark-800/80 shadow-dark text-cream-50"
                >
                    <span className="relative z-10 flex items-center">
                        <User className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-12" />
                        Get to know me
                    </span>
                    <div className="absolute inset-0 bg-glass-shimmer-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
            </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 z-10">
            <div className="flex flex-col items-center space-y-2 cursor-pointer group mt-8 sm:mt-0">
                <span className="text-xs sm:text-sm font-light tracking-wider uppercase">Scroll down</span>
                <div className="flex flex-col space-y-1">
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
            </div>
        </div>
    </div>
);

export default HeroContent; 