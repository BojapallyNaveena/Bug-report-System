import React from 'react';
import { Flame, Calendar, Award, ExternalLink } from 'lucide-react';
import type { StreakInfo } from '../types';

interface StreakTrackerCardProps {
  streak: StreakInfo;
  onClaimDailyBonus: () => void;
}

export const StreakTrackerCard: React.FC<StreakTrackerCardProps> = ({ 
  streak,
  onClaimDailyBonus 
}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const GITHUB_URL = 'https://github.com/BojapallyNaveena';

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4 relative overflow-hidden bg-gradient-to-br from-amber-950/20 via-gray-900/60 to-gray-950">
      
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30">
            <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              🔥 {streak.currentStreak} Day Learning Streak
            </h3>
            <p className="text-xs text-amber-300/80 font-medium">Daily Debugging & Code Review streak</p>
          </div>
        </div>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-bold text-gray-300 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-xl hover:border-gray-700 flex items-center gap-1 transition"
        >
          <span>@BojapallyNaveena</span>
          <ExternalLink className="w-3 h-3 text-cyan-400" />
        </a>
      </div>

      {/* Weekly Activity Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Activity Matrix
          </span>
          <span className="text-amber-400 font-bold">Longest: {streak.longestStreak} Days</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            const isActive = streak.weeklyActivity[idx];
            return (
              <div 
                key={day}
                className={`p-2 rounded-xl text-center border transition ${
                  isActive 
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/10' 
                    : 'bg-gray-950/60 border-gray-800/80 text-gray-500'
                }`}
              >
                <div className="text-[10px] uppercase font-bold">{day}</div>
                <div className="text-xs mt-1 font-black">
                  {isActive ? '🔥' : '•'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Claim Daily Streak Bonus */}
      <div className="bg-amber-950/40 border border-amber-500/30 p-3.5 rounded-xl flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-amber-200 font-medium">Daily Streak Bonus Available</span>
        </div>

        <button
          onClick={onClaimDailyBonus}
          className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-950 font-bold text-xs shadow-md hover:opacity-95 transition"
        >
          Claim +5 FC
        </button>
      </div>

    </div>
  );
};
