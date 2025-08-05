import { memo, useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { X } from 'lucide-react';

const PlayerDetailsModal = memo(({ player, isOpen, onClose }) => {
  const { loading, error, getPlayerSessions } = useApi();
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && player) {
      loadPlayerSessions();
    }
  }, [isOpen, player]);

  const loadPlayerSessions = async () => {
    if (!player) return;
    
    setSessionsLoading(true);
    try {
      const data = await getPlayerSessions(player.id, 1, 10);
      setSessions(data.sessions || []);
    } catch (err) {
      console.error('Failed to load player sessions:', err);
    } finally {
      setSessionsLoading(false);
    }
  };

  if (!isOpen || !player) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl shadow-lg">
                {player.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">{player.name}</h2>
                <p className="text-sm sm:text-base text-slate-600 font-medium">{player.position}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">Player Statistics</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-slate-50/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-600 mb-2 sm:mb-3">Last 30 Days</h4>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs sm:text-sm text-slate-500">Total Distance</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-slate-900">125 km</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-500">Top Speed</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-slate-900">32 km/h</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-500">Sessions</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-slate-900">15</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-500">Avg Heart Rate</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-slate-900">165 bpm</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-600 mb-2 sm:mb-3">Performance Metrics</h4>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-slate-600">Pass Accuracy</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-slate-600">Shot Accuracy</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900">72%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-slate-600">Tackle Success</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">Recent Sessions</h3>
              
              {sessionsLoading ? (
                <div className="flex justify-center py-6 sm:py-8">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-slate-200 border-t-slate-600"></div>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {sessions.map((session) => (
                    <div key={session.id} className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">{session.session_type}</span>
                        <span className="text-xs text-slate-500">{session.date}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-slate-500">Distance</p>
                          <p className="font-semibold text-slate-900">{session.distance}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Duration</p>
                          <p className="font-semibold text-slate-900">{session.duration}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Speed</p>
                          <p className="font-semibold text-slate-900">{session.top_speed}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

PlayerDetailsModal.displayName = 'PlayerDetailsModal';

export default PlayerDetailsModal; 