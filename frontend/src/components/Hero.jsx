import React, { memo } from 'react';

const Hero = memo(() => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
        Professional Football Players
      </h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        Discover and manage your team's talent with our comprehensive player database. 
        Search, filter, and explore detailed player statistics.
      </p>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero; 