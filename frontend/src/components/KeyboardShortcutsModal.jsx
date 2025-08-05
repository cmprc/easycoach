import React, { memo } from 'react';
import { X } from 'lucide-react';

const KeyboardShortcutsModal = memo(({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
          </button>
        </div>
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
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
  );
});

KeyboardShortcutsModal.displayName = 'KeyboardShortcutsModal';

export default KeyboardShortcutsModal; 