import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Terminal, ArrowRight } from 'lucide-react';
import type { User, UserRole } from '../types';

interface AuthModalProps {
  onSuccess: (user: User, token: string) => void;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onSuccess, onClose }) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [email, setEmail] = useState('demo@codefix.io');
  const [password, setPassword] = useState('Password123!');
  const [fullName, setFullName] = useState('Jane Doe');
  const [role, setRole] = useState<UserRole>('DEVELOPER');
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
        throw new Error(data.detail || 'Authentication failed');
      }

      localStorage.setItem('codefix_token', data.token);
      localStorage.setItem('codefix_user', JSON.stringify(data.user));
      onSuccess(data.user, data.token);
    } catch (err: any) {
      setErrorMsg(err.message || 'Server error. Make sure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel max-w-md w-full rounded-3xl border border-gray-800 p-8 space-y-6 relative animate-in fade-in zoom-in-95 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-xl shadow-indigo-500/20">
            <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
              <Terminal className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            {mode === 'LOGIN' ? 'Welcome Back to CodeFix' : 'Create Your CodeFix Account'}
          </h2>
          <p className="text-xs text-gray-400">
            {mode === 'LOGIN' 
              ? 'Access real backend debugging, FixCoins wallet, and verified profile.' 
              : 'Sign up to earn +25 Welcome FixCoins & build verified career evidence.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-gray-900 border border-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setMode('LOGIN')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              mode === 'LOGIN' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('REGISTER')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              mode === 'REGISTER' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Register (+25 FC)
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-rose-950/80 border border-rose-500/40 p-3 rounded-xl text-xs text-rose-300 font-medium">
            {errorMsg}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'REGISTER' && (
            <div>
              <label className="text-xs font-semibold text-gray-400 block mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-gray-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {mode === 'REGISTER' && (
            <div>
              <label className="text-xs font-semibold text-gray-400 block mb-1">Account Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-200 focus:outline-none cursor-pointer"
              >
                <option value="DEVELOPER" className="bg-gray-900">Developer Mode</option>
                <option value="STUDENT" className="bg-gray-900">Student Mode</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white shadow-xl shadow-indigo-500/25 flex items-center justify-center space-x-2 transition"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'LOGIN' ? 'Sign In to Account' : 'Create Account (+25 FC)'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-gray-400">
          Demo Credentials: <code className="text-cyan-400">demo@codefix.io</code> / <code className="text-cyan-400">Password123!</code>
        </div>

      </div>
    </div>
  );
};
