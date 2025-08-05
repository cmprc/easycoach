import { memo } from 'react';
import { ChevronRight } from 'lucide-react';

const PlayerCard = memo(({ player, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(player);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${player.name}`}
      data-player-card
      className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200/50 hover:border-slate-300/50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg">
              {player.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition-colors truncate">
                {player.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">{player.position}</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              #{player.id}
            </span>
          </div>
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500 font-medium">Joined</span>
            <span className="text-slate-700 font-semibold">
              {new Date(player.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500 font-medium">Status</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active
            </span>
          </div>
        </div>
        
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Click to view details</span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </div>
  );
});

PlayerCard.displayName = 'PlayerCard';

export default PlayerCard; 