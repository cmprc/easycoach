import { memo } from 'react';

const LoadingSpinner = memo(({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "h-3 w-3 sm:h-4 sm:w-4",
    md: "h-4 w-4 sm:h-6 sm:w-6", 
    lg: "h-6 w-6 sm:h-8 sm:w-8",
    xl: "h-8 w-8 sm:h-12 sm:w-12"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
      <div className={`animate-spin rounded-full border-2 border-slate-200 border-t-slate-600 ${sizeClasses[size]}`}></div>
      {text && (
        <p className="text-sm sm:text-base text-slate-600 font-medium">{text}</p>
      )}
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner; 