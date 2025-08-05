import { useEffect, useCallback, useRef } from 'react';

const InfiniteScroll = ({ 
  onLoadMore, 
  hasMore, 
  loading, 
  children 
}) => {
  const observerRef = useRef();
  const loadingRef = useRef();

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, onLoadMore]);

  return (
    <div>
      {children}
      
      {hasMore && (
        <div 
          ref={loadingRef}
          className="flex justify-center py-8"
        >
          {loading ? (
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-slate-200 border-t-slate-600"></div>
              <span className="text-slate-600 font-medium">Loading more players...</span>
            </div>
          ) : (
            <div className="h-20 w-full bg-transparent"></div>
          )}
        </div>
      )}
      
      {!hasMore && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-slate-500">
            <div className="w-16 h-px bg-slate-200"></div>
            <span className="text-sm font-medium">End of players</span>
            <div className="w-16 h-px bg-slate-200"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll; 