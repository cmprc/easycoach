import React, { memo } from 'react';
import PlayerCard from './PlayerCard';
import InfiniteScroll from './InfiniteScroll';
import Pagination from './Pagination';

const PlayersSection = memo(({ 
  players, 
  pagination, 
  viewMode, 
  onPlayerClick, 
  onLoadMore, 
  onPageChange, 
  infiniteLoading 
}) => {
  if (players.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No players found</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          No players available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">
          Players ({pagination.total} total)
        </h3>
        <div className="text-sm text-slate-500">
          {viewMode === 'pagination' ? (
            `Page ${pagination.current_page} of ${pagination.total_pages}`
          ) : (
            `${players.length} loaded`
          )}
        </div>
      </div>
      
      {viewMode === 'infinite' ? (
        <InfiniteScroll
          onLoadMore={onLoadMore}
          hasMore={pagination.has_next_page}
          loading={infiniteLoading}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onClick={onPlayerClick}
              />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onClick={onPlayerClick}
            />
          ))}
        </div>
      )}

      {viewMode === 'pagination' && (
        <div className="mt-12">
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            onPageChange={onPageChange}
            hasNextPage={pagination.has_next_page}
            hasPrevPage={pagination.has_prev_page}
          />
        </div>
      )}
    </div>
  );
});

PlayersSection.displayName = 'PlayersSection';

export default PlayersSection; 