import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch(term);
      setIsLoading(false);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    setIsLoading(true);
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none z-10">
        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" strokeWidth={2.5} />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-14 bg-white/80 backdrop-blur-sm border-2 border-slate-200/50 rounded-xl sm:rounded-2xl text-sm sm:text-base text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
      />
      {isLoading && (
        <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-slate-200 border-t-slate-600"></div>
        </div>
      )}
    </div>
  );
};

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default SearchBar; 