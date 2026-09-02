import React, { useState } from 'react';
import { 
  Terminal, 
  Cpu, 
  LayoutDashboard, 
  Bug, 
  Sparkles, 
  BookOpen, 
  GitBranch, 
  GraduationCap, 
  User as UserIcon,
  Coins,
  FileText,
  LogOut,
  LogIn,
  Menu,
  X
} from 'lucide-react';
import type { UserRole, FixCoinWallet, User } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  wallet: FixCoinWallet;
  user: User | null;
  onOpenHistoryModal: () => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  userRole,
  setUserRole,
  wallet,
  user,
  onOpenHistoryModal,
  onOpenAuthModal,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analyzer', label: 'Universal Analyzer', icon: Bug },
    { id: 'vibe', label: 'Vibe Review', icon: Sparkles },
    { id: 'tutor', label: 'Tech Tutor', icon: BookOpen },
    { id: 'student', label: 'Student Mode', icon: GraduationCap },
    { id: 'resume', label: 'Resume Builder', icon: FileText },
    { id: 'github', label: 'GitHub Projects', icon: GitBranch },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-gray-800/80 px-4 sm:px-6 py-3.5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/20 shrink-0">
            <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white">CodeFix</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full hidden sm:flex items-center gap-1">
                <Cpu className="w-3 h-3 text-cyan-400" /> FixMind AI
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium hidden lg:block">Build with AI. Verify with CodeFix.</p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-1 bg-gray-900/60 p-1.5 rounded-xl border border-gray-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* FixCoins Counter & Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* FixCoins Widget Header Pill */}
          <button
            onClick={onOpenHistoryModal}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-950/80 to-gray-900 border border-amber-500/40 px-3 py-1.5 rounded-xl hover:border-amber-500 transition cursor-pointer"
          >
            <Coins className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
            <span className="text-xs font-black text-amber-400">🪙 {wallet.balance} FC</span>
          </button>

          {/* User Role Selector */}
          <div className="hidden sm:flex items-center space-x-2 bg-gray-900 border border-gray-800 rounded-xl px-2.5 py-1.5">
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="bg-transparent text-[11px] font-bold text-gray-300 focus:outline-none cursor-pointer"
            >
              <option value="STUDENT" className="bg-gray-900">Student</option>
              <option value="DEVELOPER" className="bg-gray-900">Dev</option>
            </select>
          </div>

          {/* User Auth Controls */}
          {user ? (
            <div className="hidden sm:flex items-center space-x-2 bg-gray-900 border border-gray-800 rounded-xl px-3 py-1.5">
              <UserIcon className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="text-xs font-bold text-white truncate max-w-[90px]">{user.fullName}</span>
              <button 
                onClick={onLogout} 
                title="Logout" 
                className="text-gray-400 hover:text-rose-400 ml-1 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1.5 transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Toggle Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-gray-800 space-y-1 animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          {user && (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onLogout();
              }}
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out ({user.fullName})</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
