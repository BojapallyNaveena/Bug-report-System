import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardOverview } from './components/DashboardOverview';
import { UniversalAnalyzer } from './components/UniversalAnalyzer';
import { AnalysisResultsView } from './components/AnalysisResultsView';
import { VibeCodeReviewer } from './components/VibeCodeReviewer';
import { TechTutorView } from './components/TechTutorView';
import { StudentLearningMode } from './components/StudentLearningMode';
import { GitHubProjectsView } from './components/GitHubProjectsView';
import { ResumeBuilderView } from './components/ResumeBuilderView';
import { FixCoinsHistoryModal } from './components/FixCoinsHistoryModal';
import { AuthModal } from './components/AuthModal';
import { LandingLoginPage } from './components/LandingLoginPage';
import type { UserRole, AnalysisResult, FixCoinWallet, FixCoinTransaction, Achievement, User, StreakInfo } from './types';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('STUDENT');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // User Auth State
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('codefix_user');
    if (saved) {
      setIsAuthenticated(true);
      return JSON.parse(saved);
    }
    setIsAuthenticated(false);
    return null;
  });

  // Streak Tracker State
  const [streak, setStreak] = useState<StreakInfo>({
    currentStreak: 7,
    longestStreak: 12,
    lastActiveDate: new Date().toISOString().split('T')[0],
    weeklyActivity: [true, true, true, true, true, true, true],
    streakBonusCoins: 5
  });

  // FixCoins State
  const [wallet, setWallet] = useState<FixCoinWallet>({
    balance: 25,
    totalEarned: 25,
    totalSpent: 0
  });

  const [transactions, setTransactions] = useState<FixCoinTransaction[]>([
    { id: 'tx-1', amount: 25, type: 'EARN', reason: 'Registration Welcome Bonus', timestamp: 'Today' }
  ]);

  const [achievements] = useState<Achievement[]>([
    { id: 'a1', name: 'Verified Fix Master', description: 'Verified 20+ bug fixes in sandbox', icon: 'ShieldCheck', rewardCoins: 50, isEarned: true },
    { id: 'a2', name: 'RAG Specialist', description: 'Used FixMind RAG for project diagnosis', icon: 'Sparkles', rewardCoins: 25, isEarned: true },
    { id: 'a3', name: 'Stack Tutor Graduate', description: 'Completed 5 technology modules', icon: 'BookOpen', rewardCoins: 30, isEarned: true }
  ]);

  const fetchWalletAndHistory = async () => {
    const token = localStorage.getItem('codefix_token') || 'token-demo-key';
    try {
      const [walletRes, historyRes] = await Promise.all([
        fetch('http://localhost:8000/api/fixcoins/wallet', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('http://localhost:8000/api/fixcoins/history', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (walletRes.ok) {
        const wData = await walletRes.json();
        setWallet(wData);
      }
      if (historyRes.ok) {
        const hData = await historyRes.json();
        if (hData.length > 0) setTransactions(hData);
      }
    } catch (e) {
      console.warn('Backend sync warning:', e);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWalletAndHistory();
    }
  }, [user]);

  const handleAuthSuccess = (loggedUser: User) => {
    const updatedUser: User = {
      ...loggedUser,
      githubUsername: 'BojapallyNaveena',
      githubUrl: 'https://github.com/BojapallyNaveena'
    };
    setUser(updatedUser);
    setUserRole(updatedUser.role || 'STUDENT');
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setActiveTab('dashboard');
    fetchWalletAndHistory();
  };

  const handleEnterGuestMode = () => {
    const guestUser: User = {
      id: 'user-demo-100',
      email: 'student@computer.edu',
      fullName: 'Bojapally Naveena (CS)',
      role: 'STUDENT',
      githubUsername: 'BojapallyNaveena',
      githubUrl: 'https://github.com/BojapallyNaveena'
    };
    setUser(guestUser);
    setUserRole('STUDENT');
    setIsAuthenticated(true);
    setActiveTab('dashboard');
    fetchWalletAndHistory();
  };

  const handleLogout = () => {
    localStorage.removeItem('codefix_token');
    localStorage.removeItem('codefix_user');
    setUser(null);
    setIsAuthenticated(false);
    setWallet({ balance: 0, totalEarned: 0, totalSpent: 0 });
    setTransactions([]);
  };

  const handleClaimStreakBonus = () => {
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + 5,
      totalEarned: prev.totalEarned + 5
    }));

    setTransactions(prev => [
      {
        id: 'tx-' + Math.random().toString(36).substring(2, 8),
        amount: 5,
        type: 'EARN',
        reason: '🔥 Daily Debugging Streak Bonus (+5 FC)',
        timestamp: 'Just now'
      },
      ...prev
    ]);

    setStreak(prev => ({
      ...prev,
      streakBonusCoins: 0
    }));
  };

  const handleAwardCoins = (amount: number, reason: string) => {
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + amount,
      totalEarned: prev.totalEarned + amount
    }));

    setTransactions(prev => [
      {
        id: 'tx-' + Math.random().toString(36).substring(2, 8),
        amount,
        type: 'EARN',
        reason,
        timestamp: 'Just now'
      },
      ...prev
    ]);
  };

  const handleDeductCoins = (amount: number, reason: string): boolean => {
    if (wallet.balance < amount) return false;

    setWallet(prev => ({
      ...prev,
      balance: prev.balance - amount,
      totalSpent: prev.totalSpent + amount
    }));

    setTransactions(prev => [
      {
        id: 'tx-' + Math.random().toString(36).substring(2, 8),
        amount: -amount,
        type: 'SPEND',
        reason,
        timestamp: 'Just now'
      },
      ...prev
    ]);

    return true;
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setCurrentResult(result);
    setActiveTab('results');
    fetchWalletAndHistory();
  };

  const handleResetAnalysis = () => {
    setCurrentResult(null);
    setActiveTab('analyzer');
  };

  // FIRST SCREEN: Show Login Page if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <LandingLoginPage
        onAuthSuccess={handleAuthSuccess}
        onEnterGuestMode={handleEnterGuestMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab === 'results' ? 'analyzer' : activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'results') setCurrentResult(null);
        }}
        userRole={userRole}
        setUserRole={setUserRole}
        wallet={wallet}
        user={user}
        onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {activeTab === 'dashboard' && (
          <DashboardOverview
            onNavigate={(tab) => setActiveTab(tab)}
            wallet={wallet}
            streak={streak}
            onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
            onClaimStreakBonus={handleClaimStreakBonus}
          />
        )}

        {activeTab === 'analyzer' && (
          <UniversalAnalyzer
            onAnalysisComplete={handleAnalysisComplete}
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
          />
        )}

        {activeTab === 'results' && currentResult && (
          <AnalysisResultsView
            result={currentResult}
            onReset={handleResetAnalysis}
          />
        )}

        {activeTab === 'vibe' && (
          <VibeCodeReviewer />
        )}

        {activeTab === 'tutor' && (
          <TechTutorView />
        )}

        {activeTab === 'student' && (
          <StudentLearningMode onAwardCoins={handleAwardCoins} />
        )}

        {activeTab === 'resume' && (
          <ResumeBuilderView
            wallet={wallet}
            onDeductCoins={handleDeductCoins}
            onNavigateToAnalyzer={() => setActiveTab('analyzer')}
          />
        )}

        {activeTab === 'github' && (
          <GitHubProjectsView streak={streak} />
        )}

      </main>

      {/* FixCoins History Modal */}
      {isHistoryModalOpen && (
        <FixCoinsHistoryModal
          wallet={wallet}
          transactions={transactions}
          achievements={achievements}
          onClose={() => setIsHistoryModalOpen(false)}
        />
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          onSuccess={handleAuthSuccess}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-gray-900 py-6 text-center text-xs text-gray-500 glass-panel">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="font-bold text-gray-400">CodeFix SaaS Ecosystem</span> — Connected GitHub: <a href="https://github.com/BojapallyNaveena" target="_blank" rel="noreferrer" className="text-cyan-400 font-semibold underline">@BojapallyNaveena</a>
          </div>
          <div>
            «Build with AI. Understand with FixMind. Verify with CodeFix.» | «Learn. Fix. Verify. Earn.»
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
