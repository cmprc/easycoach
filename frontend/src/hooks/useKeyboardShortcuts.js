import { useEffect } from 'react';

export const useKeyboardShortcuts = ({ 
  onSearch, 
  onViewModeChange, 
  viewMode,
  onCloseModal,
  isModalOpen 
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) {
          searchInput.focus();
        }
      }

      if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
        event.preventDefault();
        onViewModeChange(viewMode === 'pagination' ? 'infinite' : 'pagination');
      }

      if (event.key === 'Escape' && isModalOpen) {
        event.preventDefault();
        onCloseModal();
      }

      if (!isModalOpen) {
        const playerCards = document.querySelectorAll('[data-player-card]');
        const currentIndex = Array.from(playerCards).findIndex(card => 
          card === document.activeElement
        );

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          event.preventDefault();
          const nextIndex = (currentIndex + 1) % playerCards.length;
          playerCards[nextIndex]?.focus();
        }

        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          event.preventDefault();
          const prevIndex = currentIndex <= 0 ? playerCards.length - 1 : currentIndex - 1;
          playerCards[prevIndex]?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSearch, onViewModeChange, viewMode, onCloseModal, isModalOpen]);
}; 