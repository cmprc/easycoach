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
        className="h-8 w-48 object-contain"
      />
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo; 