import { Download, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Balancer from 'react-wrap-balancer';
import { useLenis } from 'lenis/react';
import { urlFor} from '@/lib/sanity';

interface HeroProps {
  data: {
    greeting: string;
    name: string;
    title: string;
    description: string;
    highlightedWords: string[];
    backgroundImage?: any;
    cvFile?: any;
    downloadButtonText: string;
    aboutButtonText: string;
    scrollIndicatorText: string;
  };
}

const HeroContent: React.FC<HeroProps> = ({ data }) => {
    const lenis = useLenis();

    const scrollToAbout = () => {
        if (lenis) {
            lenis.scrollTo('#about', {
                offset: -60,
                duration: 1.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                immediate: false,
                lock: true
            });
        } else {
            // Fallback to native scrolling
            const element = document.getElementById('about');
            if (element) {
                const elementTop = element.offsetTop;
                window.scrollTo({
                    top: elementTop - 60,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Function to highlight words in description
    const highlightWords = (text: string, wordsToHighlight: string[]) => {
        if (!wordsToHighlight || wordsToHighlight.length === 0) {
            return text;
        }

        let highlightedText = text;
        wordsToHighlight.forEach((word) => {
            const regex = new RegExp(`(${word})`, 'gi');
            highlightedText = highlightedText.replace(
                regex,
                '<span class="font-medium text-cream-100">$1</span>'
            );
        });

        return highlightedText;
    };

    const backgroundImageUrl = data.backgroundImage 
        ? urlFor(data.backgroundImage).url()
        : '';

    const cvFileUrl = data.cvFile 
        ? data.cvFile.asset.url
        : '';

    return (
        <div className="relative min-h-screen">
            {/* Hero Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
                }}
            />

            <div className="absolute inset-0 bg-dark-800/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-burgundy-500/30 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-cream-200/40 animate-ping"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-cream-100/30 animate-pulse animate-delay-1000"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
                <div className="text-center space-y-10 max-w-5xl mx-auto reveal-up">
                    <div className="space-y-8">
                        <div className="space-y-6 reveal-up">
                            <p className="text-xl md:text-2xl font-light tracking-wide animate-fade-in text-cream-50 reveal-up">
                                {data.greeting}
                            </p>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight animate-slide-up reveal-up">
                                <div className="text-transparent bg-clip-text bg-gradient-to-r from-burgundy-400 to-cream-200 font-light font-kurye-italic drop-shadow-lg">
                                    {data.name}
                                </div>
                            </h1>
                            <div className="w-24 h-1 mx-auto rounded-full bg-burgundy-500 reveal-up"></div>
                        </div>

                        <p className="text-xl md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto font-light tracking-wide animate-fade-in-delayed text-cream-50 reveal-up">
                            <Balancer>
                                <span>{data.title} who </span>
                                <span 
                                    dangerouslySetInnerHTML={{
                                        __html: highlightWords(data.description, data.highlightedWords)
                                    }}
                                />
                            </Balancer>
                        </p>
                    </div>

                    {/* Call to action buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-0 animate-fade-in-delayed reveal-up">
                        <Button
                            size="lg"
                            className="group relative px-10 py-4 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden bg-primary-gradient shadow-burgundy text-cream-50"
                            onClick={() => cvFileUrl && window.open(cvFileUrl, '_blank')}
                        >
                            <span className="relative z-10 flex items-center">
                                <Download className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:translate-y-[-2px]" />
                                {data.downloadButtonText}
                            </span>
                            <div className="absolute inset-0 bg-glass-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Button>

                        <Button
                            size="lg"
                            className="group relative px-10 py-4 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 border-2 border-cream-100/30 hover:border-cream-100/50 backdrop-blur-sm overflow-hidden bg-dark-800/80 shadow-dark text-cream-50"
                            onClick={scrollToAbout}
                        >
                            <span className="relative z-10 flex items-center">
                                <User className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-12" />
                                {data.aboutButtonText}
                            </span>
                            <div className="absolute inset-0 bg-glass-shimmer-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-300 reveal-up"></div>
                        </Button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 z-10">
                    <div
                        className="flex flex-col items-center cursor-pointer group mt-8 sm:mt-0 hover:text-gray-300 transition-colors duration-300"
                        onClick={scrollToAbout}
                    >
                        <span className="text-xs sm:text-sm font-light tracking-wider uppercase">
                            {data.scrollIndicatorText}
                        </span>
                        <div className="flex flex-col space-y-1">
                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" style={{ animationDelay: '0.5s' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroContent;