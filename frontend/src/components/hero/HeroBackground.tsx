import heroImage from '@/assets/images/hero.png';

const HeroBackground = () => (
    <>
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${heroImage})`,
            }}
        />

        <div className="absolute inset-0 bg-dark-800/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-burgundy-500/30 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-cream-200/40 animate-ping"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-cream-100/30 animate-pulse animate-delay-1000"></div>
        </div>
    </>
);

export default HeroBackground;