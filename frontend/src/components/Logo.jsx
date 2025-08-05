import { memo } from 'react';

const Logo = memo(({ className = "w-8 h-8" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="15" fill="white" stroke="#1e293b" strokeWidth="1"/>
      
      <path d="M16 8 L 20 12 L 24 16 L 20 20 L 16 24 L 12 20 L 8 16 L 12 12 Z" fill="#1e293b"/>
      <path d="M16 6 L 22 10 L 26 16 L 22 22 L 16 26 L 10 22 L 6 16 L 10 10 Z" fill="white"/>
      <path d="M16 10 L 18 12 L 20 16 L 18 20 L 16 22 L 14 20 L 12 16 L 14 12 Z" fill="#1e293b"/>
      
      <path d="M8 8 L 12 12 L 16 16 L 12 20 L 8 16 L 4 12 L 8 8 Z" fill="#1e293b"/>
      <path d="M24 8 L 28 12 L 24 16 L 20 12 L 24 8 Z" fill="#1e293b"/>
      <path d="M8 24 L 12 28 L 16 24 L 12 20 L 8 24 Z" fill="#1e293b"/>
      <path d="M24 24 L 28 28 L 24 24 L 20 28 L 24 24 Z" fill="#1e293b"/>
      
      <circle cx="16" cy="16" r="2" fill="white"/>
      <circle cx="16" cy="16" r="1" fill="#1e293b"/>
    </svg>
  );
});

Logo.displayName = 'Logo';

export default Logo; 