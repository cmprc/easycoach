import React, { memo } from 'react';
import logo from '../assets/logo.png';

const Logo = memo(({ onClick, className = "" }) => {
  return (
    <div 
      className={`flex items-center cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <img 
        src={logo} 
        alt="EasyCoach Logo" 
        className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 object-contain"
      />
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo; 