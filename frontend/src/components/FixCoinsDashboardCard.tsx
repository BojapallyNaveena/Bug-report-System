import React from 'react';
import { Coins, FileText, ShieldCheck, Trophy } from 'lucide-react';
import type { FixCoinWallet } from '../types';

interface FixCoinsDashboardCardProps {
  wallet: FixCoinWallet;
  onOpenResumeBuilder: () => void;
  onOpenHistoryModal: () => void;
}

export const FixCoinsDashboardCard: React.FC<FixCoinsDashboardCardProps> = ({
  wallet,
  onOpenResumeBuilder,
  onOpenHistoryModal
}) => {
  const RESUME_COST = 20;
  const canBuildResume = wallet.balance >= RESUME_COST;
  const progressPercent = Math.min(100, (wallet.balance / RESUME_COST) * 100);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-amber-950/30 via-gray-950 to-gray-950 flex flex-col justify-between space-y-4 relative overflow-hidden gradient-border-glow">
      
      {/* Top Title & Coin Counter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">FixCoins Balance</h3>
            <span className="text-[11px] text-gray-400 font-medium">Earn by debugging & verifying fixes</span>
          </div>
        </div>

        <button
          onClick={onOpenHistoryModal}
          className="text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg transition"
        >
          History
        </button>
      </div>

      {/* Balance Big Display */}
      <div className="flex items-baseline space-x-2">
        <span className="text-4xl font-black text-amber-400">🪙 {wallet.balance}</span>
        <span className="text-xs text-gray-400 font-semibold uppercase">FixCoins (FC)</span>
      </div>

      {/* Resume Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-gray-300">Resume Build Progress</span>
          <span className="text-amber-400">🪙 {wallet.balance} / {RESUME_COST} FC</span>
        </div>

        <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-800">
          <div 
            className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="text-[11px] text-gray-400">
          {canBuildResume ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Ready! You can build your resume now for 20 FC.
            </span>
          ) : (
            <span>Need {RESUME_COST - wallet.balance} more FixCoins for your next resume.</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex items-center space-x-3">
        <button
          onClick={onOpenResumeBuilder}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition ${
            canBuildResume
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-95 text-gray-950 shadow-lg shadow-amber-500/20'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Build Resume (20 FC)</span>
        </button>

        <button
          onClick={onOpenHistoryModal}
          className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 transition"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
        </button>
      </div>

    </div>
  );
};
