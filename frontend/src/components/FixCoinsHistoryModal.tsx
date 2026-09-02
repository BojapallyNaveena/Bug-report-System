import React from 'react';
import { X, Coins, Trophy, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { FixCoinWallet, FixCoinTransaction, Achievement } from '../types';

interface FixCoinsHistoryModalProps {
  wallet: FixCoinWallet;
  transactions: FixCoinTransaction[];
  achievements: Achievement[];
  onClose: () => void;
}

export const FixCoinsHistoryModal: React.FC<FixCoinsHistoryModalProps> = ({
  wallet,
  transactions,
  achievements,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-panel max-w-2xl w-full rounded-2xl border border-gray-800 p-6 space-y-6 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">FixCoins Transaction History</h3>
              <p className="text-xs text-gray-400">Platform reward ledger & verified achievements</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-900/80 p-3.5 rounded-xl border border-gray-800 text-center">
            <span className="text-xs text-gray-400 font-medium block">Current Balance</span>
            <span className="text-xl font-black text-amber-400">🪙 {wallet.balance}</span>
          </div>

          <div className="bg-gray-900/80 p-3.5 rounded-xl border border-gray-800 text-center">
            <span className="text-xs text-gray-400 font-medium block">Total Earned</span>
            <span className="text-xl font-black text-emerald-400">+{wallet.totalEarned} FC</span>
          </div>

          <div className="bg-gray-900/80 p-3.5 rounded-xl border border-gray-800 text-center">
            <span className="text-xs text-gray-400 font-medium block">Total Spent</span>
            <span className="text-xl font-black text-rose-400">-{wallet.totalSpent} FC</span>
          </div>
        </div>

        {/* Earning Rules Info Box */}
        <div className="bg-amber-950/40 border border-amber-500/30 p-3.5 rounded-xl text-xs text-amber-200 space-y-1">
          <span className="font-bold block">How to earn FixCoins:</span>
          <div className="grid grid-cols-2 gap-1 text-[11px] text-amber-300/80">
            <span>• Verified Bug Fix: +20 FC</span>
            <span>• Coding Challenge: +25 FC</span>
            <span>• Debugging Challenge: +15 FC</span>
            <span>• Tech Learning Module: +10 FC</span>
          </div>
        </div>

        {/* Transaction History List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Transactions</h4>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between bg-gray-950 p-3.5 rounded-xl border border-gray-800 text-xs">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${tx.type === 'EARN' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {tx.type === 'EARN' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="font-bold text-white block">{tx.reason}</span>
                    <span className="text-[10px] text-gray-400">{tx.timestamp}</span>
                  </div>
                </div>

                <span className={`font-black text-sm ${tx.type === 'EARN' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {tx.amount > 0 ? `+${tx.amount}` : tx.amount} FC
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Earned Achievements */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" /> Verified Achievements
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {achievements.map((ach) => (
              <div key={ach.id} className="bg-gray-900/60 p-3 rounded-xl border border-gray-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">{ach.name}</span>
                  <span className="text-[10px] text-gray-400">{ach.description}</span>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  +{ach.rewardCoins} FC
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
