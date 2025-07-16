

// Skeleton Loading Component
const HeroSkeleton = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background skeleton - matches hero background */}
      <div className="absolute inset-0 bg-dark-800 animate-pulse"></div>

      {/* Gradient overlays - matches hero */}
      <div className="absolute inset-0 bg-dark-800/70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

      {/* Floating particles skeleton - matches hero colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-burgundy-500/30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-cream-200/40 animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-cream-100/30 animate-pulse"></div>
      </div>

      {/* Content skeleton */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
        <div className="text-center space-y-10 max-w-5xl mx-auto">

          {/* Greeting skeleton */}
          <div className="space-y-8">
            <div className="flex justify-center">
              <div className="h-6 md:h-8 w-32 md:w-40 bg-cream-50/20 rounded-lg animate-pulse"></div>
            </div>

            {/* Name skeleton - matches the large italic name */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="h-20 md:h-28 lg:h-32 w-80 md:w-[500px] lg:w-[600px] bg-gradient-to-r from-burgundy-400/30 via-cream-200/30 to-burgundy-400/30 rounded-2xl animate-pulse"></div>
              </div>

              {/* Divider skeleton - matches burgundy divider */}
              <div className="flex justify-center">
                <div className="w-24 h-1 bg-burgundy-500/50 rounded-full animate-pulse"></div>
              </div>
            </div>


            <div className="space-y-3 max-w-4xl mx-auto">
              <div className="flex justify-center">
                <div className="h-6 md:h-7 w-full max-w-3xl bg-cream-50/15 rounded-lg animate-pulse"></div>
              </div>
              <div className="flex justify-center">
                <div className="h-6 md:h-7 w-full max-w-2xl bg-cream-50/15 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Buttons skeleton - matches actual button styles */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-0">
            {/* Download CV button skeleton - matches burgundy gradient */}
            <div className="h-10 w-48 bg-gradient-to-r from-burgundy-500/50 to-burgundy-600/50 rounded-full animate-pulse shadow-burgundy/20"></div>

            {/* Get to know me button skeleton - matches dark with border */}
            <div className="h-10 w-44 bg-dark-800/60 border-2 border-cream-100/20 rounded-full animate-pulse backdrop-blur-sm"></div>
          </div>
        </div>


      </div>


    </div>
  );
};

export default HeroSkeleton;