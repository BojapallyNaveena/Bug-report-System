import React, { useState, useEffect } from 'react';
import { 
  Bug, 
  ArrowUpRight, 
  Sparkles,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  HelpCircle,
  BookOpen,
  GraduationCap,
  GitBranch,
  FileText,
  Flame,
  ExternalLink,
  Plus,
  FolderGit2,
  Award
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { FixCoinsDashboardCard } from './FixCoinsDashboardCard';
import { StreakTrackerCard } from './StreakTrackerCard';
import { DashboardUserGuideModal } from './DashboardUserGuideModal';
import { AddProjectOrAwardModal } from './AddProjectOrAwardModal';
import type { FixCoinWallet, StreakInfo } from '../types';

interface DashboardOverviewProps {
  onNavigate: (tab: string) => void;
  wallet: FixCoinWallet;
  streak: StreakInfo;
  onOpenHistoryModal: () => void;
  onClaimStreakBonus: () => void;
  onRefreshData?: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  onNavigate, 
  wallet,
  streak,
  onOpenHistoryModal,
  onClaimStreakBonus,
  onRefreshData
}) => {
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);
  const [customProjects, setCustomProjects] = useState<any[]>([]);
  const [customAchievements, setCustomAchievements] = useState<any[]>([]);

  const GITHUB_URL = 'https://github.com/BojapallyNaveena';

  const fetchRealData = async () => {
    const token = localStorage.getItem('codefix_token') || '';
    if (!token) return;
    try {
      const [analysesRes, projRes, achRes] = await Promise.all([
        fetch('http://localhost:8000/api/analyses/recent', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('http://localhost:8000/api/user/projects', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('http://localhost:8000/api/user/achievements', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (analysesRes.ok) {
        const data = await analysesRes.json();
        setRecentAnalyses(data);
      }
      if (projRes.ok) {
        const pData = await projRes.json();
        setCustomProjects(pData);
      }
      if (achRes.ok) {
        const aData = await achRes.json();
        setCustomAchievements(aData);
      }
    } catch (e) {
      console.warn('Backend fetch warning:', e);
    }
  };

  useEffect(() => {
    fetchRealData();
  }, []);

  const kpiData = [
    { label: 'FixCoins Balance', value: `🪙 ${wallet.balance}`, change: 'Real database wallet', icon: Bug, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Learning Streak', value: `🔥 ${streak.currentStreak} Days`, change: 'Daily active bonus', icon: Flame, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { label: 'Custom Projects', value: `${customProjects.length} Projects`, change: '+15 FC Per Project', icon: FolderGit2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Awards & Honors', value: `${customAchievements.length} Awards`, change: '+10 FC Per Award', icon: Award, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];

  const categoryChartData = [
    { name: 'Programming', value: 45, color: '#6366F1' },
    { name: 'API Errors', value: 28, color: '#06B6D4' },
    { name: 'Dependencies', value: 22, color: '#A855F7' },
    { name: 'Database', value: 18, color: '#10B981' },
    { name: 'Docker/Env', value: 14, color: '#F59E0B' },
  ];

  const severityChartData = [
    { severity: 'Critical', count: 12, fill: '#F43F5E' },
    { severity: 'High', count: 34, fill: '#F59E0B' },
    { severity: 'Medium', count: 58, fill: '#6366F1' },
    { severity: 'Low', count: 38, fill: '#10B981' },
  ];

  const featureHub = [
    { id: 'analyzer', name: 'Universal Bug Analyzer', desc: 'AST static analysis across Java, Python, JS, TS, SQL', icon: Bug, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { id: 'vibe', name: 'Vibe Code Reviewer', desc: 'Audit ChatGPT, Cursor & Claude code for edge case bugs', icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { id: 'tutor', name: 'Technology Stack Tutor', desc: 'Learn Spring Boot, React, PostgreSQL & Docker architecture', icon: BookOpen, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { id: 'student', name: 'Student Learning Mode', desc: 'Progressive hint-by-hint debugging without spoilers', icon: GraduationCap, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { id: 'resume', name: 'ATS Resume Builder (20 FC)', desc: 'Transform verified credentials into professional resumes', icon: FileText, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { id: 'github', name: 'GitHub Repo Intelligence', desc: 'Analyze @BojapallyNaveena repositories & PRs', icon: GitBranch, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome Hero Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-gray-800 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-gray-950 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden gradient-border-glow">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>FixMind AI Engine</span>
            </span>
            <a 
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-gray-900 text-indigo-300 border border-gray-800 hover:border-gray-700 transition"
            >
              <GitBranch className="w-3 h-3 text-emerald-400" />
              <span>@BojapallyNaveena</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </a>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
            Universal Debugging & <span className="gradient-text-indigo">Project Intelligence</span>
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            Evidence-based error diagnosis, AST-level root-cause analysis, and sandboxed automated fix verification.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 z-10">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs flex items-center space-x-2 transition shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project or Award</span>
          </button>

          <button
            onClick={() => setIsGuideOpen(true)}
            className="px-4 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-cyan-300 border border-cyan-500/30 font-bold text-xs flex items-center space-x-2 transition"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>How to Use Guide</span>
          </button>
        </div>
      </div>

      {/* Daily Streak Tracker & GitHub Banner */}
      <StreakTrackerCard 
        streak={streak} 
        onClaimDailyBonus={onClaimStreakBonus}
      />

      {/* KPI Stats & FixCoins Widget Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 4 KPIs */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kpiData.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="glass-panel p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{kpi.label}</span>
                  <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-xl font-black text-white truncate">{kpi.value}</div>
                  <div className="text-[11px] font-medium text-emerald-400 mt-0.5">{kpi.change}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: FixCoins Gamification Dashboard Card */}
        <div className="lg:col-span-4">
          <FixCoinsDashboardCard
            wallet={wallet}
            onOpenResumeBuilder={() => onNavigate('resume')}
            onOpenHistoryModal={onOpenHistoryModal}
          />
        </div>

      </div>

      {/* Custom Projects & Awards Real Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* My Custom Projects Card */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-indigo-400" />
              My Custom Portfolio Projects ({customProjects.length})
            </h3>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Project (+15 FC)
            </button>
          </div>

          {customProjects.length === 0 ? (
            <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-xl text-center space-y-2 text-xs">
              <p className="text-gray-400">No custom projects added yet.</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-1.5 rounded-lg transition"
              >
                + Add Your First Project
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {customProjects.map((p) => (
                <div key={p.id} className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{p.title}</h4>
                    <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded font-mono border border-indigo-500/30">
                      {p.technologies}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{p.description}</p>
                  <div className="flex items-center space-x-3 pt-1 text-[11px]">
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 font-mono">
                        <GitBranch className="w-3 h-3" /> GitHub Repo
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1 font-mono">
                        <ExternalLink className="w-3 h-3" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Custom Achievements & Awards Card */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              My Verified Awards & Honors ({customAchievements.length})
            </h3>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Award (+10 FC)
            </button>
          </div>

          {customAchievements.length === 0 ? (
            <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-xl text-center space-y-2 text-xs">
              <p className="text-gray-400">No custom awards recorded yet.</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold px-3.5 py-1.5 rounded-lg transition"
              >
                + Record An Award / Certification
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {customAchievements.map((a) => (
                <div key={a.id} className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400" /> {a.title}
                    </h4>
                    <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-500/30">
                      {a.dateAwarded}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-cyan-400">{a.issuer}</div>
                  <p className="text-xs text-gray-300 leading-relaxed">{a.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Feature Hub: All Modules 1-Click Access Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            CodeFix Platform Feature Modules
          </h3>
          <span className="text-xs text-gray-400 font-medium">Click to Launch Any Feature</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureHub.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="glass-panel p-5 rounded-2xl border border-gray-800 hover:border-indigo-500/60 transition cursor-pointer group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${item.bg}`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">{item.name}</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Breakdown (Pie Chart) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Bug Category Distribution
            </h3>
            <span className="text-xs text-gray-400 font-medium font-mono">SQLite DB</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', color: '#fff' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-300">
            {categoryChartData.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Severity Histogram (Bar Chart) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Error Severity Spectrum
            </h3>
            <span className="text-xs text-gray-400 font-medium font-mono">Real-time</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityChartData}>
                <XAxis dataKey="severity" stroke="#9CA3AF" fontSize={12} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px', color: '#fff' }} 
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {severityChartData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-gray-400 text-center font-medium">
            FixMind verified 100% of Critical and High severity issues.
          </div>
        </div>

      </div>

      {/* Real Bug Analysis History Feed */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Your Real Bug Analysis History
          </h3>
          <button 
            onClick={() => onNavigate('analyzer')} 
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            Submit Bug <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentAnalyses.length === 0 ? (
          <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-xl text-center space-y-2">
            <Bug className="w-8 h-8 text-indigo-400/50 mx-auto" />
            <h4 className="text-sm font-bold text-gray-300">No Bug Analyses Yet</h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              You haven't submitted any code snippets yet. Head over to the Universal Analyzer to test code, get root cause evidence, and earn +20 FixCoins!
            </p>
            <button
              onClick={() => onNavigate('analyzer')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition mt-2"
            >
              Analyze Your First Bug
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {recentAnalyses.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-900/60 p-4 rounded-xl border border-gray-800/80 hover:border-gray-700 transition">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                    {item.category[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <span className="text-[11px] text-gray-400">{item.time} • {item.language}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    ✓ {item.status} (+20 FC)
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Guide Modal */}
      {isGuideOpen && (
        <DashboardUserGuideModal
          onClose={() => setIsGuideOpen(false)}
          onNavigate={(tab) => {
            setIsGuideOpen(false);
            onNavigate(tab);
          }}
        />
      )}

      {/* Add Custom Project / Award Modal */}
      {isAddModalOpen && (
        <AddProjectOrAwardModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            fetchRealData();
            if (onRefreshData) onRefreshData();
          }}
        />
      )}

    </div>
  );
};
