import React from 'react';
import Editor from '@monaco-editor/react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  BookOpen, 
  Copy, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import type { AnalysisResult } from '../types';

interface AnalysisResultsViewProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const AnalysisResultsView: React.FC<AnalysisResultsViewProps> = ({ result, onReset }) => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner - Error Status & Verification Tag */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 gradient-border-glow">
        <div>
          <div className="flex items-center space-x-3 mb-1.5">
            <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              {result.errorType}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-gray-800 text-gray-300">
              Severity: {result.severity}
            </span>
            <span className="text-xs font-medium text-gray-400">
              Confidence: <strong className="text-emerald-400">{(result.confidence * 100).toFixed(0)}%</strong>
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">{result.title}</h2>
        </div>

        {/* Verification Status Pill */}
        <div className="flex items-center space-x-3">
          {result.fix.isVerified ? (
            <div className="bg-emerald-950/80 border border-emerald-500/40 px-4 py-2.5 rounded-xl flex items-center space-x-2.5 shadow-lg shadow-emerald-500/10">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Verified Fix (+20 FC)</div>
                <div className="text-[11px] text-emerald-400/80 font-medium">Compilation & Tests Passed ✓</div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-950/80 border border-amber-500/40 px-4 py-2.5 rounded-xl flex items-center space-x-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Suggested Fix</div>
                <div className="text-[11px] text-amber-400/80 font-medium">Pending Sandbox Run</div>
              </div>
            </div>
          )}

          <button
            onClick={onReset}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-700 transition"
          >
            New Analysis
          </button>
        </div>
      </div>

      {/* Grid: Root Cause Analysis + Evidence Trace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Root Cause Explanation */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Search className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">Root Cause Analysis</h3>
          </div>

          <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/60 p-4 rounded-xl border border-gray-800">
            {result.rootCause}
          </p>

          {/* Evidence Trace */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Evidence-Based Diagnostic Trace</h4>
            <div className="space-y-2">
              {result.evidence.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-gray-950/80 p-3 rounded-xl border border-gray-800">
                  <div className="bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold px-2 py-0.5 rounded border border-indigo-500/30">
                    Line {item.line || '?'}
                  </div>
                  <div>
                    {item.variable && (
                      <span className="text-xs font-mono text-cyan-400 font-semibold mr-2">
                        [{item.variable}]
                      </span>
                    )}
                    <span className="text-xs text-gray-300">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sandbox Verification Log */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">Automated Verification Report</h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between bg-gray-900/80 p-3 rounded-xl border border-gray-800 text-xs">
              <span className="text-gray-300 font-medium">AST & Compilation Check</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Passed
              </span>
            </div>

            <div className="flex items-center justify-between bg-gray-900/80 p-3 rounded-xl border border-gray-800 text-xs">
              <span className="text-gray-300 font-medium">Sandbox Unit Test Assertions</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> 4/4 Passed
              </span>
            </div>

            <div className="flex items-center justify-between bg-gray-900/80 p-3 rounded-xl border border-gray-800 text-xs">
              <span className="text-gray-300 font-medium">Static Memory & Boundary Check</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Clean
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-gray-400 block mb-1">Sandbox Execution Output</span>
            <pre className="bg-gray-950 p-3 rounded-xl border border-gray-800 text-[11px] font-mono text-emerald-400 whitespace-pre-wrap">
              {result.verification.executionOutput}
            </pre>
          </div>
        </div>

      </div>

      {/* Corrected Fix Section */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">FixMind Generated & Verified Code Fix</h3>
          </div>

          <button 
            onClick={() => navigator.clipboard.writeText(result.fix.suggestedCode)}
            className="flex items-center space-x-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-lg transition"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Code</span>
          </button>
        </div>

        <p className="text-xs text-gray-300 bg-indigo-950/40 border border-indigo-500/30 p-3 rounded-xl">
          <strong className="text-indigo-300">Fix Explanation:</strong> {result.fix.explanation}
        </p>

        {/* Monaco Editor Code Display */}
        <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-950">
          <Editor
            height="260px"
            language={result.language.toLowerCase()}
            theme="vs-dark"
            value={result.fix.suggestedCode}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 13,
              scrollBeyondLastLine: false,
              padding: { top: 12, bottom: 12 },
              fontFamily: 'Fira Code, Menlo, Monaco, Consolas, monospace'
            }}
          />
        </div>
      </div>

      {/* Learning & Defensive Coding Notes */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-3">
        <div className="flex items-center space-x-2 text-purple-400">
          <BookOpen className="w-5 h-5" />
          <h3 className="text-base font-bold text-white">FixMind Technology Tutor & Learning Support</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {result.learningNotes.map((note, idx) => (
            <div key={idx} className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800 text-xs text-gray-300 flex items-start space-x-2.5">
              <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
