import React from 'react';
import { 
  X, 
  BookOpen, 
  Bug, 
  ShieldCheck, 
  Coins, 
  FileText, 
  Sparkles, 
  GraduationCap, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';

interface DashboardUserGuideModalProps {
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export const DashboardUserGuideModal: React.FC<DashboardUserGuideModalProps> = ({
  onClose,
  onNavigate
}) => {
  const steps = [
    {
      num: 1,
      title: 'Universal Bug Analyzer',
      icon: Bug,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      desc: 'Paste your code and error stack traces across Java, Python, JS, TS, C++, or SQL.',
      howToUse: 'Go to "Universal Analyzer", select your language & bug category (e.g. Programming, API, Dependency), paste your code, and click "Analyze with FixMind AI Engine".'
    },
    {
      num: 2,
      title: 'FixMind AI Root Cause & Evidence',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      desc: 'FixMind performs AST static analysis and RAG knowledge retrieval to pinpoint exact evidence lines.',
      howToUse: 'Read the "Root Cause Analysis" section to see which line and variable failed. FixMind runs sandbox compilation and unit tests to verify the fix.'
    },
    {
      num: 3,
      title: 'Earn FixCoins Rewards',
      icon: Coins,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      desc: 'Every verified bug fix and completed challenge awards real FixCoins (FC).',
      howToUse: 'Earn +20 FC for verified bug fixes, +25 FC for coding challenges, +15 FC for debugging challenges, and +10 FC for tech tutor modules. Track balance on top navbar.'
    },
    {
      num: 4,
      title: 'Build ATS Resume (20 FC)',
      icon: FileText,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      desc: 'Transform verified CodeFix accomplishments into career evidence.',
      howToUse: 'Go to "Resume Builder" when you have >= 20 FC. Click "Build Resume". Once unlocked, you can edit, update templates (ATS, Modern, Student), and export PDF infinitely!'
    },
    {
      num: 5,
      title: 'Vibe Code Reviewer',
      icon: Sparkles,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      desc: 'Audit AI-generated code (ChatGPT, Cursor, Claude) for hidden edge cases.',
      howToUse: 'Go to "Vibe Review", paste your AI-generated snippet, and click "Audit Vibe Code" to detect unhandled HTTP errors, missing null guards, and security vulnerabilities.'
    },
    {
      num: 6,
      title: 'Tech Stack Tutor',
      icon: BookOpen,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      desc: 'Learn full-stack technology architecture and common failure gotchas.',
      howToUse: 'Click "Tech Tutor" to inspect Spring Boot, React, PostgreSQL, and Docker architecture specifications, inter-service protocols, and best practice code.'
    },
    {
      num: 7,
      title: 'Student Progressive Hint Mode',
      icon: GraduationCap,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      desc: 'Learn defensive programming step-by-step without instant answer spoilers.',
      howToUse: 'Go to "Student Mode", pick your level (Beginner/Intermediate), and unlock Hint 1 -> Hint 2 -> Root Cause -> Solution progressively.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel max-w-4xl w-full rounded-3xl border border-gray-800 p-8 space-y-6 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <HelpCircle className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">How to Use CodeFix & FixMind AI</h3>
              <p className="text-xs text-gray-400">Step-by-step guide to debugging, earning FixCoins, and building verified resumes</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800 space-y-3 hover:border-gray-700 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-2 rounded-xl ${step.bg}`}>
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <span className="font-bold text-white text-sm">Step {step.num}: {step.title}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">{step.desc}</p>

                <div className="bg-gray-950 p-3 rounded-xl border border-gray-800 text-[11px] text-gray-300">
                  <strong className="text-cyan-400 block mb-0.5">How to use:</strong>
                  {step.howToUse}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Call */}
        <div className="pt-2 flex justify-end space-x-3 border-t border-gray-800">
          <button
            onClick={() => {
              onClose();
              onNavigate('analyzer');
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs flex items-center space-x-2 transition"
          >
            <span>Start Analyzing Code</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
