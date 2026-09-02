import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Award, 
  FolderPlus, 
  GitBranch, 
  Globe, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

interface AddProjectOrAwardModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AddProjectOrAwardModal: React.FC<AddProjectOrAwardModalProps> = ({ 
  onClose, 
  onSuccess 
}) => {
  const [activeTab, setActiveTab] = useState<'PROJECT' | 'ACHIEVEMENT'>('PROJECT');

  // Project state
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectTech, setProjectTech] = useState('');
  const [projectGithub, setProjectGithub] = useState('');
  const [projectLive, setProjectLive] = useState('');

  // Achievement state
  const [achTitle, setAchTitle] = useState('');
  const [achIssuer, setAchIssuer] = useState('');
  const [achDesc, setAchDesc] = useState('');
  const [achType, setAchType] = useState('AWARD');
  const [achDate, setAchDate] = useState('2026');

  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg(null);
    setErrMsg(null);

    const token = localStorage.getItem('codefix_token') || '';
    try {
      const res = await fetch('http://localhost:8000/api/user/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: projectTitle,
          description: projectDesc,
          technologies: projectTech,
          githubUrl: projectGithub,
          liveUrl: projectLive
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to add project');

      setMsg('🎉 Project added successfully to your profile & SQLite database (+15 FC)!');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrMsg(err.message || 'Server error adding project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg(null);
    setErrMsg(null);

    const token = localStorage.getItem('codefix_token') || '';
    try {
      const res = await fetch('http://localhost:8000/api/user/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: achTitle,
          issuer: achIssuer,
          description: achDesc,
          type: achType,
          dateAwarded: achDate
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to add achievement');

      setMsg('🎉 Award/Achievement saved to your verified credentials (+10 FC)!');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrMsg(err.message || 'Server error adding achievement');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel max-w-xl w-full rounded-3xl border border-gray-800 p-7 space-y-6 relative animate-in fade-in zoom-in-95 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Add Project or Achievement</h3>
              <p className="text-xs text-gray-400">Record your portfolio work & verified honors in SQLite</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-900 border border-gray-800 p-1 rounded-xl">
          <button
            onClick={() => { setActiveTab('PROJECT'); setMsg(null); setErrMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center space-x-1.5 ${
              activeTab === 'PROJECT' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>Add Custom Project (+15 FC)</span>
          </button>
          <button
            onClick={() => { setActiveTab('ACHIEVEMENT'); setMsg(null); setErrMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center space-x-1.5 ${
              activeTab === 'ACHIEVEMENT' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Add Award / Honor (+10 FC)</span>
          </button>
        </div>

        {msg && (
          <div className="bg-emerald-950/80 border border-emerald-500/50 p-3.5 rounded-xl text-xs text-emerald-300 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{msg}</span>
          </div>
        )}

        {errMsg && (
          <div className="bg-rose-950/80 border border-rose-500/50 p-3 rounded-xl text-xs text-rose-300 font-bold">
            ❌ {errMsg}
          </div>
        )}

        {/* Form 1: Add Custom Project */}
        {activeTab === 'PROJECT' && (
          <form onSubmit={handleAddProject} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-gray-300 block mb-1">Project Title</label>
              <input
                type="text"
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="e.g. AI-Powered Code Bug Fixer"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-300 block mb-1">Technologies & Tech Stack</label>
              <input
                type="text"
                required
                value={projectTech}
                onChange={(e) => setProjectTech(e.target.value)}
                placeholder="e.g. React, Spring Boot, PostgreSQL, Docker, Python"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-300 block mb-1">Project Summary / Key Highlights</label>
              <textarea
                rows={3}
                required
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                placeholder="Describe features, key achievements, and code architecture..."
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-gray-300 flex items-center gap-1 mb-1">
                  <GitBranch className="w-3.5 h-3.5 text-gray-400" /> GitHub Repo Link
                </label>
                <input
                  type="url"
                  value={projectGithub}
                  onChange={(e) => setProjectGithub(e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 flex items-center gap-1 mb-1">
                  <Globe className="w-3.5 h-3.5 text-gray-400" /> Live Demo URL
                </label>
                <input
                  type="url"
                  value={projectLive}
                  onChange={(e) => setProjectLive(e.target.value)}
                  placeholder="https://my-app.vercel.app"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white shadow-xl shadow-indigo-500/20 flex items-center justify-center space-x-2 transition"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Save Project to Portfolio (+15 FC)</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Form 2: Add Custom Achievement / Award */}
        {activeTab === 'ACHIEVEMENT' && (
          <form onSubmit={handleAddAchievement} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-gray-300 block mb-1">Award / Achievement Title</label>
              <input
                type="text"
                required
                value={achTitle}
                onChange={(e) => setAchTitle(e.target.value)}
                placeholder="e.g. 1st Place National Hackathon Winner"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-gray-300 block mb-1">Issuing Organization / College</label>
                <input
                  type="text"
                  required
                  value={achIssuer}
                  onChange={(e) => setAchIssuer(e.target.value)}
                  placeholder="e.g. Computer Science Dept / IEEE"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Year / Date Awarded</label>
                <input
                  type="text"
                  required
                  value={achDate}
                  onChange={(e) => setAchDate(e.target.value)}
                  placeholder="e.g. 2026"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-300 block mb-1">Category Type</label>
              <select
                value={achType}
                onChange={(e) => setAchType(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-200 focus:outline-none cursor-pointer"
              >
                <option value="AWARD" className="bg-gray-900">Award / Competition Winner</option>
                <option value="CERTIFICATION" className="bg-gray-900">Professional Certification</option>
                <option value="ACADEMIC" className="bg-gray-900">Academic Honor / Dean's List</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-300 block mb-1">Description / Key Criteria</label>
              <textarea
                rows={3}
                required
                value={achDesc}
                onChange={(e) => setAchDesc(e.target.value)}
                placeholder="Describe what was accomplished to earn this recognition..."
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white shadow-xl shadow-indigo-500/20 flex items-center justify-center space-x-2 transition"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Save Achievement to Profile (+10 FC)</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
