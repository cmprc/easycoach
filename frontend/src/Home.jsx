import { useState, useEffect, useMemo, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import PlayerCard from './components/PlayerCard';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import InfiniteScroll from './components/InfiniteScroll';
import PlayerDetailsModal from './components/PlayerDetailsModal';
import ViewToggle from './components/ViewToggle';
import Logo from './components/Logo';
import { useApi } from './hooks/useApi';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Zap, Users, ChevronRight, X, ArrowRight, ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';

const Home = () => {
  const [players, setPlayers] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
    has_next_page: false,
    has_prev_page: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('pagination');
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  const { loading, error, getPlayers } = useApi();

  const fetchPlayers = useCallback(async (page = 1, search = '', append = false) => {
    try {
      const data = await getPlayers(page, pagination.per_page, search);
      
      if (append && viewMode === 'infinite') {
        setPlayers(prev => [...prev, ...(data.players || [])]);
      } else {
        setPlayers(data.players || []);
      }
      
      setPagination(data.pagination || {});
    } catch (err) {
      console.error('Failed to fetch players:', err);
    }
  }, [getPlayers, pagination.per_page, viewMode]);

  useEffect(() => {
    fetchPlayers(1, searchTerm);
  }, [fetchPlayers, searchTerm]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setPagination(prev => ({ ...prev, current_page: 1 }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setPagination(prev => ({ ...prev, current_page: page }));
    fetchPlayers(page, searchTerm);
  }, [fetchPlayers, searchTerm]);

  const handleLoadMore = useCallback(async () => {
    if (infiniteLoading || !pagination.has_next_page) return;
    
    setInfiniteLoading(true);
    try {
      await fetchPlayers(pagination.current_page + 1, searchTerm, true);
      setPagination(prev => ({ 
        ...prev, 
        current_page: prev.current_page + 1 
      }));
    } catch (error) {
      console.error('Load more error:', error);
    } finally {
      setInfiniteLoading(false);
    }
  }, [fetchPlayers, searchTerm, pagination.has_next_page, pagination.current_page, infiniteLoading]);

  const handlePlayerClick = useCallback((player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  }, []);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
    setPlayers([]);
    setPagination(prev => ({ ...prev, current_page: 1 }));
    fetchPlayers(1, searchTerm);
  }, [fetchPlayers, searchTerm]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  }, []);

  const handleHomeClick = useCallback(() => {
    setSearchTerm('');
    setViewMode('pagination');
    setPlayers([]);
    setPagination(prev => ({ ...prev, current_page: 1 }));
    fetchPlayers(1, '');
  }, [fetchPlayers]);

  useKeyboardShortcuts({
    onSearch: handleSearch,
    onViewModeChange: handleViewModeChange,
    viewMode,
    onCloseModal: handleCloseModal,
    isModalOpen
  });

  const stats = useMemo(() => {
    if (!players.length) return null;

    const totalPlayers = players.length;
    const namesWithA = players.filter(p => p.name.toLowerCase().includes('a')).length;
    const namesWithE = players.filter(p => p.name.toLowerCase().includes('e')).length;
    const namesWithI = players.filter(p => p.name.toLowerCase().includes('i')).length;

    return {
      totalPlayers,
      namesWithA,
      namesWithE,
      namesWithI,
    };
  }, [players]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Connection Error</h2>
          <p className="text-slate-600 mb-6">
            Unable to connect to the server. Please check your connection and try again.
          </p>
          <button
            onClick={() => fetchPlayers(1, searchTerm)}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all duration-200 font-medium"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button 
              onClick={handleHomeClick}
              className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
            >
              <Logo className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">EasyCoach</h1>
                <p className="text-sm text-slate-500 font-medium">Player Management</p>
              </div>
            </button>
            <div className="flex items-center space-x-4">
              <ViewToggle 
                viewMode={viewMode} 
                onViewModeChange={handleViewModeChange} 
              />
              <button
                onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
                className="p-2 text-slate-500 hover:text-slate-700 transition-colors"
                title="Keyboard shortcuts"
              >
                <Zap className="w-5 h-5" />
              </button>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Optimized
            </span>
            </div>
          </div>
        </div>
      </header>

      {showKeyboardShortcuts && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Keyboard Shortcuts</h2>
              <button
                onClick={() => setShowKeyboardShortcuts(false)}
                className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Focus Search</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Ctrl/Cmd + K</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Toggle View Mode</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Ctrl/Cmd + V</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Close Modal</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Escape</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Navigate Players</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Arrow Keys</kbd>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Professional Football Players
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover and manage your team's talent with our comprehensive player database. 
            Search, filter, and explore detailed player statistics.
          </p>
        </div>

        <div className="mb-12 max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} placeholder="Search players by name..." />
        </div>

        {stats && (
          <div className="mb-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Players</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.totalPlayers}</p>
                  </div>
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-slate-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Names with 'A'</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.namesWithA}</p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <span className="text-emerald-600 font-bold text-sm">A</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Names with 'E'</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.namesWithE}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">E</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Names with 'I'</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.namesWithI}</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">I</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && players.length === 0 ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" text="Loading players..." />
          </div>
        ) : (
          <>
            {players.length > 0 ? (
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
                    onLoadMore={handleLoadMore}
                    hasMore={pagination.has_next_page}
                    loading={infiniteLoading}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {players.map((player) => (
                        <PlayerCard
                          key={player.id}
                          player={player}
                          onClick={handlePlayerClick}
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
                        onClick={handlePlayerClick}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No players found</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  {searchTerm ? `No players match "${searchTerm}". Try a different search term.` : 'No players available at the moment.'}
                </p>
              </div>
            )}

            {viewMode === 'pagination' && (
              <div className="mt-12">
                <Pagination
                  currentPage={pagination.current_page}
                  totalPages={pagination.total_pages}
                  onPageChange={handlePageChange}
                  hasNextPage={pagination.has_next_page}
                  hasPrevPage={pagination.has_prev_page}
                />
              </div>
            )}
          </>
        )}
      </main>

      <footer className="mt-20 py-8 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-slate-500">
              © 2024 EasyCoach. Professional football management platform.
            </p>
          </div>
        </div>
      </footer>

      <PlayerDetailsModal
        player={selectedPlayer}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

const HomeWithErrorBoundary = () => (
  <ErrorBoundary>
    <Home />
  </ErrorBoundary>
);

export default HomeWithErrorBoundary;
