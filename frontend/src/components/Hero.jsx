import React, { memo } from 'react';

const Hero = memo(() => {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
        Professional Football Players
      </h2>
      <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4 sm:px-0">
        Discover and manage your team's talent with our comprehensive player database. 
        Search, filter, and explore detailed player statistics.
      </p>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero; 