import React, { memo } from 'react';
import { Zap } from 'lucide-react';
import Logo from './Logo';
import ViewToggle from './ViewToggle';

const Header = memo(({ 
  onHomeClick, 
  viewMode, 
  onViewModeChange, 
  onToggleKeyboardShortcuts 
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Logo onClick={onHomeClick} />
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ViewToggle 
              viewMode={viewMode} 
              onViewModeChange={onViewModeChange} 
            />
            <button
              onClick={onToggleKeyboardShortcuts}
              className="p-2 text-slate-500 hover:text-slate-700 transition-colors"
              title="Keyboard shortcuts"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header; 