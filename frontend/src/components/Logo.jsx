import React, { memo } from 'react';
import vintageSoccerBall from '../assets/vintage-soccer-ball.png';

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
        src={vintageSoccerBall} 
        alt="EasyCoach Logo" 
        className="h-8 w-8 object-contain"
      />
      <span className="ml-2 text-xl font-bold text-slate-800">EasyCoach</span>
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo; 