import { memo } from 'react';
import { List, ChevronDown } from 'lucide-react';

const ViewToggle = memo(({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center space-x-1 sm:space-x-2 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-1 border border-slate-200/50 shadow-sm">
      <button
        onClick={() => onViewModeChange('pagination')}
        className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
          viewMode === 'pagination'
            ? 'bg-slate-900 text-white shadow-lg'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`}
      >
        <div className="flex items-center space-x-1 sm:space-x-2">
          <List className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Pages</span>
          <span className="sm:hidden">P</span>
        </div>
      </button>
      
      <button
        onClick={() => onViewModeChange('infinite')}
        className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
          viewMode === 'infinite'
            ? 'bg-slate-900 text-white shadow-lg'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`}
      >
        <div className="flex items-center space-x-1 sm:space-x-2">
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Infinite</span>
          <span className="sm:hidden">I</span>
        </div>
      </button>
    </div>
  );
});

ViewToggle.displayName = 'ViewToggle';

export default ViewToggle; 