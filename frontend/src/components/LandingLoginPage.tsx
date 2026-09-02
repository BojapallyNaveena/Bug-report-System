import React, { useState } from 'react';
import { 
  Terminal, 
  Cpu, 
  Lock, 
  Mail, 
  User as UserIcon, 
  ArrowRight
} from 'lucide-react';
import type { User, UserRole } from '../types';

interface LandingLoginPageProps {
  onAuthSuccess: (user: User, token: string) => void;
  onEnterGuestMode: () => void;
}

export const LandingLoginPage: React.FC<LandingLoginPageProps> = ({
  onAuthSuccess,
  onEnterGuestMode
}) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    const endpoint = mode === 'LOGIN' ? '/api/auth/login' : '/api/auth/register';
    const body = mode === 'LOGIN' 
      ? { email, password }
      : { email, password, fullName, role };

    try {
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Authentication failed. Please check credentials.');
      }

      localStorage.setItem('codefix_token', data.token);
      localStorage.setItem('codefix_user', JSON.stringify(data.user));
      onAuthSuccess(data.user, data.token);
    } catch (err: any) {
      setErrorMsg(err.message || 'Incorrect credentials or server unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-100 flex flex-col justify-between relative font-sans selection:bg-purple-500 selection:text-white"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(7, 10, 18, 0.15), rgba(7, 10, 18, 0.25)), url('/login-bg.jpg')" }}
    >
      
      {/* Top Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-500 p-0.5 shadow-xl shadow-purple-500/40">
            <div className="w-full h-full bg-gray-950/90 rounded-[10px] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">CodeFix</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-purple-950/80 text-purple-200 border border-purple-400/50 px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md">
                <Cpu className="w-3 h-3 text-cyan-400" /> FixMind AI
              </span>
            </div>
            <p className="text-[11px] text-gray-200 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">Software Debugging & Learning Intelligence</p>
          </div>
        </div>

        <button
          onClick={onEnterGuestMode}
          className="bg-purple-950/80 hover:bg-purple-900 text-purple-100 border border-purple-400/50 text-xs font-semibold px-4 py-2 rounded-xl backdrop-blur-md transition shadow-lg"
        >
          Explore Demo Mode
        </button>
      </header>

      {/* Main Grid: Student Boy image is in the center, so we position Login Card on the RIGHT */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center">
        
        {/* Left Column: Empty space so the Student Boy image is 100% visible */}
        <div className="lg:col-span-7 hidden lg:block" />

        {/* Right Column: Glassmorphic Login / Register Box */}
        <div className="lg:col-span-5 w-full">
          <div className="glass-panel p-8 rounded-3xl border border-purple-400/40 space-y-6 w-full backdrop-blur-2xl bg-gray-950/80 shadow-2xl gradient-border-glow">
            
            {/* Form Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-500 p-0.5 shadow-xl shadow-purple-500/40">
                <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-cyan-400" />
                </div>
              </div>

              <h2 className="text-2xl font-black text-white tracking-tight">
                {mode === 'LOGIN' ? 'Welcome Back to CodeFix' : 'CS Student / Developer Sign Up'}
              </h2>
              <p className="text-xs text-gray-300">
                {mode === 'LOGIN' 
                  ? 'Sign in to access your verified dashboard & wallet' 
                  : 'Create account to earn +25 Welcome FixCoins'}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-gray-900/90 border border-purple-500/30 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => { setMode('LOGIN'); setErrorMsg(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  mode === 'LOGIN' 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('REGISTER'); setErrorMsg(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  mode === 'REGISTER' 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Register (+25 FC)
              </button>
            </div>

            {/* Red Error Alert Box */}
            {errorMsg && (
              <div className="bg-rose-950/90 border border-rose-500/80 p-3.5 rounded-xl text-xs text-rose-200 font-semibold shadow-lg">
                ❌ {errorMsg}
              </div>
            )}

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {mode === 'REGISTER' && (
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Student"
                      className="w-full bg-gray-950/90 border border-purple-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Student / Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@student.edu"
                    className="w-full bg-gray-950/90 border border-purple-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-gray-950/90 border border-purple-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Background Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-gray-950/90 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-200 focus:outline-none cursor-pointer"
                >
                  <option value="STUDENT" className="bg-gray-900">Student (CS / Engineering)</option>
                  <option value="DEVELOPER" className="bg-gray-900">Developer / Vibe Coder</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 text-white shadow-xl shadow-purple-500/30 flex items-center justify-center space-x-2 transition"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'LOGIN' ? 'Sign In & Open Dashboard' : 'Register & Get +25 FC'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onEnterGuestMode}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline"
              >
                Or Open Guest Demo Dashboard Directly
              </button>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-900/40 py-4 text-center text-xs text-gray-200 backdrop-blur-md bg-gray-950/40">
        «Build with AI. Understand with FixMind. Verify with CodeFix.» | Connected GitHub: <a href="https://github.com/BojapallyNaveena" target="_blank" rel="noreferrer" className="text-cyan-400 font-semibold underline">@BojapallyNaveena</a>
      </footer>

    </div>
  );
};
