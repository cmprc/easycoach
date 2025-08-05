import { useState, useEffect, useMemo, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import PlayerDetailsModal from './components/PlayerDetailsModal';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Stats from './components/Stats';
import PlayersSection from './components/PlayersSection';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import ErrorDisplay from './components/ErrorDisplay';
import { useApi } from './hooks/useApi';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

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

  const handleToggleKeyboardShortcuts = useCallback(() => {
    setShowKeyboardShortcuts(!showKeyboardShortcuts);
  }, [showKeyboardShortcuts]);

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
      <ErrorDisplay onRetry={() => fetchPlayers(1, searchTerm)} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Header 
        onHomeClick={handleHomeClick}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onToggleKeyboardShortcuts={handleToggleKeyboardShortcuts}
      />

      <KeyboardShortcutsModal 
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Hero />

        <div className="mb-12 max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} placeholder="Search players by name..." />
        </div>

        <Stats stats={stats} />

        {loading && players.length === 0 ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" text="Loading players..." />
          </div>
        ) : (
          <PlayersSection 
            players={players}
            pagination={pagination}
            viewMode={viewMode}
            onPlayerClick={handlePlayerClick}
            onLoadMore={handleLoadMore}
            onPageChange={handlePageChange}
            infiniteLoading={infiniteLoading}
          />
        )}
      </main>

      <Footer />

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
