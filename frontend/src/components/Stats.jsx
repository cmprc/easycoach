import React, { memo } from 'react';
import { Users } from 'lucide-react';

const Stats = memo(({ stats }) => {
  if (!stats) return null;

  return (
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
  );
});

Stats.displayName = 'Stats';

export default Stats; 