import React, { useState } from 'react';
import { 
  Coins, 
  Sparkles, 
  ShieldCheck, 
  Edit3, 
  Layout, 
  Trophy, 
  User as UserIcon,
  Printer,
  Plus,
  Trash2,
  FolderGit2,
  CheckCircle2
} from 'lucide-react';
import type { FixCoinWallet, ResumeTemplate } from '../types';

interface ResumeBuilderViewProps {
  wallet: FixCoinWallet;
  onDeductCoins: (amount: number, reason: string) => boolean;
  onNavigateToAnalyzer: () => void;
}

interface ResumeProject {
  id: string;
  name: string;
  tech: string;
  desc: string;
  github: string;
  isVerified: boolean;
}

interface ResumeAchievement {
  id: string;
  title: string;
  issuer: string;
  desc: string;
}

export const ResumeBuilderView: React.FC<ResumeBuilderViewProps> = ({
  wallet,
  onDeductCoins
}) => {
  const RESUME_COST = 20;
  const [hasBuiltResume, setHasBuiltResume] = useState<boolean>(true);
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>('ATS_FRIENDLY');
  const [isAiOptimizing, setIsAiOptimizing] = useState<boolean>(false);

  // Personal Info State
  const [personal, setPersonal] = useState({
    fullName: 'Naveena Bojapally',
    email: 'naveena@codefix.io',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/bojapallynaveena',
    github: 'github.com/BojapallyNaveena',
    portfolio: 'bojapallynaveena.dev'
  });

  // Summary State
  const [summary, setSummary] = useState(
    'Results-driven Software Engineer with verified expertise in Java (Spring Boot), React, and PostgreSQL. Proven track record of debugging complex enterprise runtime errors, optimizing static AST trees, and authoring sandboxed unit test suites.'
  );

  // Skills State
  const [skills, setSkills] = useState<string>(
    'Java 21, Spring Boot, React 18, TypeScript, Python, PostgreSQL, Docker, REST APIs, Git/GitHub'
  );

  // Editable Projects List State
  const [projects, setProjects] = useState<ResumeProject[]>([
    {
      id: 'p1',
      name: 'CodeFix Debugging Engine',
      tech: 'Java, Spring Boot, Python, FastAPI',
      desc: 'Architected automated root-cause analysis engine running sandboxed AST verification for Java & TypeScript projects.',
      github: 'github.com/BojapallyNaveena/codefix-ai',
      isVerified: true
    },
    {
      id: 'p2',
      name: 'GitHub Profile README & Portfolio Showcase',
      tech: 'React, TypeScript, Tailwind CSS',
      desc: 'Built personal GitHub developer showcase with interactive project analytics and automated build verification.',
      github: 'github.com/BojapallyNaveena/my-readme',
      isVerified: true
    }
  ]);

  // Form State for Adding New Project
  const [newProjName, setNewProjName] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjGithub, setNewProjGithub] = useState('');
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);

  // Editable Achievements & Awards List State
  const [achievements, setAchievements] = useState<ResumeAchievement[]>([
    {
      id: 'a1',
      title: 'Verified Fix Master & RAG Specialist',
      issuer: 'CodeFix AI Engine',
      desc: 'Verified 35+ complex debugging challenges with 100% sandbox compilation score.'
    },
    {
      id: 'a2',
      title: '1st Place National Hackathon Winner',
      issuer: 'Computer Science Department / IEEE',
      desc: 'Designed full-stack automated diagnostic system using React and Spring Boot.'
    }
  ]);

  // Form State for Adding New Achievement/Award
  const [newAchTitle, setNewAchTitle] = useState('');
  const [newAchIssuer, setNewAchIssuer] = useState('');
  const [newAchDesc, setNewAchDesc] = useState('');
  const [showAddAchForm, setShowAddAchForm] = useState(false);

  const handleBuildResume = () => {
    if (wallet.balance < RESUME_COST) {
      alert(`Insufficient FixCoins. You need ${RESUME_COST - wallet.balance} more FixCoins.`);
      return;
    }

    const success = onDeductCoins(RESUME_COST, 'Resume Build');
    if (success) {
      setHasBuiltResume(true);
    }
  };

  const handleAiOptimizeSummary = () => {
    setIsAiOptimizing(true);
    setTimeout(() => {
      setIsAiOptimizing(false);
      setSummary(
        `Verified Full-Stack Engineer specializing in Spring Boot, React, and automated AST diagnostics. Demonstrated 100% test verification rate across 35+ verified CodeFix debugging challenges and production PostgreSQL database designs.`
      );
    }, 1200);
  };

  // Add New Project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName || !newProjDesc) return;

    const newEntry: ResumeProject = {
      id: 'p-' + Math.random().toString(36).substring(2, 7),
      name: newProjName,
      tech: newProjTech || 'Full Stack',
      desc: newProjDesc,
      github: newProjGithub || 'github.com/BojapallyNaveena',
      isVerified: true
    };

    setProjects([...projects, newEntry]);
    setNewProjName('');
    setNewProjTech('');
    setNewProjDesc('');
    setNewProjGithub('');
    setShowAddProjectForm(false);
  };

  // Delete Project
  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  // Update Project Field
  const handleUpdateProject = (id: string, field: keyof ResumeProject, value: any) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  // Add New Achievement / Award
  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAchTitle || !newAchDesc) return;

    const newEntry: ResumeAchievement = {
      id: 'a-' + Math.random().toString(36).substring(2, 7),
      title: newAchTitle,
      issuer: newAchIssuer || 'Awarding Organization',
      desc: newAchDesc
    };

    setAchievements([...achievements, newEntry]);
    setNewAchTitle('');
    setNewAchIssuer('');
    setNewAchDesc('');
    setShowAddAchForm(false);
  };

  // Delete Achievement / Award
  const handleDeleteAchievement = (id: string) => {
    setAchievements(achievements.filter(a => a.id !== id));
  };

  // Update Achievement Field
  const handleUpdateAchievement = (id: string, field: keyof ResumeAchievement, value: any) => {
    setAchievements(achievements.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: FixCoins Status & Unlock State */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 gradient-border-glow">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-amber-400" /> Resume Builder
            </span>
            <span className="text-xs font-semibold text-gray-400">
              Cost: <strong className="text-amber-400">🪙 20 FC</strong>
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">CodeFix Career & Resume Generator</h2>
          <p className="text-xs text-gray-400">
            Edit your projects, achievements, skills, and awards directly to generate ATS-friendly professional resumes.
          </p>
        </div>

        {/* Action / Balance Pill */}
        <div className="flex items-center space-x-3">
          <div className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl text-right">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Your Balance</span>
            <span className="text-lg font-black text-amber-400">🪙 {wallet.balance} FC</span>
          </div>

          {!hasBuiltResume ? (
            <button
              onClick={handleBuildResume}
              disabled={wallet.balance < RESUME_COST}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition ${
                wallet.balance >= RESUME_COST
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-95 text-gray-950 shadow-lg shadow-amber-500/20'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Build My Resume (20 FC)</span>
            </button>
          ) : (
            <div className="bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Unlocked (Unlimited Edits)</span>
            </div>
          )}
        </div>
      </div>

      {/* Editing Rule Notice */}
      <div className="bg-indigo-950/40 border border-indigo-500/30 p-3.5 rounded-xl text-xs text-indigo-200 flex items-center justify-between">
        <span>
          💡 <strong>Unlimited Resume Edits Unlocked:</strong> Add or edit projects, awards, and skills anytime. The printable resume updates live in real time!
        </span>
        <button onClick={handlePrint} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0">
          <Printer className="w-3.5 h-3.5" /> Export PDF
        </button>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Form Editors */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Template Switcher */}
          <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layout className="w-4 h-4 text-cyan-400" /> Select Resume Template
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'ATS_FRIENDLY', name: 'ATS-Friendly' },
                { id: 'MODERN_PRO', name: 'Modern Pro' },
                { id: 'GRADUATE', name: 'Student / Grad' }
              ].map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id as ResumeTemplate)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition ${
                    selectedTemplate === tmpl.id
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20'
                      : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {tmpl.name}
                </button>
              ))}
            </div>
          </div>

          {/* Personal Info */}
          <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-indigo-400" /> Personal Details
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-gray-400 font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={personal.fullName}
                  onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-white focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-gray-400 font-semibold block mb-1">Email</label>
                <input
                  type="text"
                  value={personal.email}
                  onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-white focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-gray-400 font-semibold block mb-1">GitHub Profile</label>
                <input
                  type="text"
                  value={personal.github}
                  onChange={(e) => setPersonal({ ...personal, github: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-white focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-gray-400 font-semibold block mb-1">Location</label>
                <input
                  type="text"
                  value={personal.location}
                  onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-white focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary + AI Polish */}
          <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-purple-400" /> Professional Summary
              </h3>
              <button
                onClick={handleAiOptimizeSummary}
                disabled={isAiOptimizing}
                className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-lg font-semibold flex items-center gap-1 hover:bg-purple-500/30 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>{isAiOptimizing ? 'FixMind Polish...' : 'AI Polish'}</span>
              </button>
            </div>

            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-xs text-gray-200 focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Skills */}
          <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Technical Skills
            </h3>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Comma-separated skills..."
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-xs text-gray-200 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* INTERACTIVE PROJECTS EDITOR */}
          <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-indigo-400" /> Edit Portfolio Projects ({projects.length})
              </h3>
              <button
                onClick={() => setShowAddProjectForm(!showAddProjectForm)}
                className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddProjectForm ? 'Close Form' : 'Add Project'}</span>
              </button>
            </div>

            {/* Form to Add New Project */}
            {showAddProjectForm && (
              <form onSubmit={handleAddProject} className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-3 text-xs">
                <div className="font-bold text-indigo-300">➕ Add New Project</div>
                <div>
                  <label className="text-gray-400 font-semibold block mb-1">Project Name</label>
                  <input
                    type="text"
                    required
                    value={newProjName}
                    onChange={(e) => setNewProjName(e.target.value)}
                    placeholder="e.g. CodeFix AI Debugger"
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-white focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-semibold block mb-1">Technologies Used</label>
                  <input
                    type="text"
                    value={newProjTech}
                    onChange={(e) => setNewProjTech(e.target.value)}
                    placeholder="e.g. Java, Spring Boot, React, PostgreSQL"
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-white focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-semibold block mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newProjDesc}
                    onChange={(e) => setNewProjDesc(e.target.value)}
                    placeholder="Describe what was built and key achievements..."
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-white focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-semibold block mb-1">GitHub Link</label>
                  <input
                    type="text"
                    value={newProjGithub}
                    onChange={(e) => setNewProjGithub(e.target.value)}
                    placeholder="github.com/BojapallyNaveena/my-project"
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-white focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow"
                >
                  Save Project to Resume
                </button>
              </form>
            )}

            {/* List & Edit Existing Projects */}
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => handleUpdateProject(p.id, 'name', e.target.value)}
                      className="bg-transparent font-bold text-white border-b border-gray-700 focus:border-indigo-500 focus:outline-none w-2/3"
                    />
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="text-gray-500 hover:text-rose-400 transition"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 block font-semibold">Technologies</label>
                    <input
                      type="text"
                      value={p.tech}
                      onChange={(e) => handleUpdateProject(p.id, 'tech', e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded p-1.5 text-cyan-300 font-mono focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 block font-semibold">Description</label>
                    <textarea
                      rows={2}
                      value={p.desc}
                      onChange={(e) => handleUpdateProject(p.id, 'desc', e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded p-1.5 text-gray-200 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 block font-semibold">GitHub Link</label>
                    <input
                      type="text"
                      value={p.github}
                      onChange={(e) => handleUpdateProject(p.id, 'github', e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded p-1.5 text-gray-400 focus:border-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INTERACTIVE ACHIEVEMENTS & AWARDS EDITOR */}
          <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" /> Edit Achievements & Awards ({achievements.length})
              </h3>
              <button
                onClick={() => setShowAddAchForm(!showAddAchForm)}
                className="text-xs bg-amber-500 hover:bg-amber-400 text-gray-950 px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddAchForm ? 'Close Form' : 'Add Award'}</span>
              </button>
            </div>

            {/* Form to Add New Achievement */}
            {showAddAchForm && (
              <form onSubmit={handleAddAchievement} className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-3 text-xs">
                <div className="font-bold text-amber-400">🏆 Add New Award / Certification</div>
                <div>
                  <label className="text-gray-400 font-semibold block mb-1">Award / Honor Title</label>
                  <input
                    type="text"
                    required
                    value={newAchTitle}
                    onChange={(e) => setNewAchTitle(e.target.value)}
                    placeholder="e.g. 1st Place National Hackathon Winner"
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-white focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-semibold block mb-1">Issuer / Organization</label>
                  <input
                    type="text"
                    value={newAchIssuer}
                    onChange={(e) => setNewAchIssuer(e.target.value)}
                    placeholder="e.g. Computer Science Dept / IEEE"
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-white focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-semibold block mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newAchDesc}
                    onChange={(e) => setNewAchDesc(e.target.value)}
                    placeholder="Describe what was accomplished to earn this..."
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 text-white focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-950 font-bold text-xs shadow"
                >
                  Save Award to Resume
                </button>
              </form>
            )}

            {/* List & Edit Existing Achievements */}
            <div className="space-y-3">
              {achievements.map((a) => (
                <div key={a.id} className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={a.title}
                      onChange={(e) => handleUpdateAchievement(a.id, 'title', e.target.value)}
                      className="bg-transparent font-bold text-amber-300 border-b border-gray-700 focus:border-amber-500 focus:outline-none w-2/3"
                    />
                    <button
                      onClick={() => handleDeleteAchievement(a.id)}
                      className="text-gray-500 hover:text-rose-400 transition"
                      title="Delete Award"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 block font-semibold">Issuer / Organization</label>
                    <input
                      type="text"
                      value={a.issuer}
                      onChange={(e) => handleUpdateAchievement(a.id, 'issuer', e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded p-1.5 text-cyan-300 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 block font-semibold">Description</label>
                    <textarea
                      rows={2}
                      value={a.desc}
                      onChange={(e) => handleUpdateAchievement(a.id, 'desc', e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded p-1.5 text-gray-200 focus:border-amber-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Live Printable Resume Sheet */}
        <div className="lg:col-span-6">
          <div className="sticky top-20">
            <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl space-y-6 font-sans border border-gray-200" id="resume-document">
              
              {/* Header */}
              <div className="border-b border-gray-300 pb-4 text-center">
                <h1 className="text-2xl font-bold uppercase tracking-wide text-gray-900">{personal.fullName}</h1>
                <div className="text-xs text-gray-600 space-x-3 mt-1 font-medium">
                  <span>{personal.email}</span>
                  <span>•</span>
                  <span>{personal.location}</span>
                  <span>•</span>
                  <span>{personal.github}</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
                  Professional Summary
                </h2>
                <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
              </div>

              {/* Technical Skills */}
              <div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
                  Technical Skills & Verification
                </h2>
                <div className="text-xs text-gray-800 leading-relaxed">
                  <strong>Languages & Frameworks:</strong> {skills}
                </div>
              </div>

              {/* Verified Software Projects */}
              <div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
                  Key Software Projects
                </h2>
                <div className="space-y-3">
                  {projects.map((p) => (
                    <div key={p.id} className="text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-gray-900">
                        <span>{p.name} [{p.tech}]</span>
                        <span className="text-[10px] text-emerald-700 font-semibold">Verified ✓</span>
                      </div>
                      <p className="text-gray-700 text-[11px] leading-relaxed">{p.desc}</p>
                      {p.github && <div className="text-[10px] text-gray-500 font-mono">{p.github}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Achievements & Awards */}
              <div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
                  Verified Achievements & Awards
                </h2>
                <div className="space-y-2">
                  {achievements.map((a) => (
                    <div key={a.id} className="text-xs space-y-0.5">
                      <div className="flex items-center justify-between font-bold text-gray-900">
                        <span>🏆 {a.title}</span>
                        <span className="text-[10px] text-indigo-700 font-semibold">{a.issuer}</span>
                      </div>
                      <p className="text-gray-700 text-[11px]">{a.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
