import React, { memo } from 'react';

const ErrorDisplay = memo(({ onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-sm sm:max-w-md w-full bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">Connection Error</h2>
        <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
          Unable to connect to the server. Please check your connection and try again.
        </p>
        <button
          onClick={onRetry}
          className="bg-slate-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-slate-800 transition-all duration-200 font-medium text-sm sm:text-base"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
});

ErrorDisplay.displayName = 'ErrorDisplay';

export default ErrorDisplay; 