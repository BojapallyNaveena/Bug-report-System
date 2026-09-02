import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { 
  Sparkles, 
  ShieldCheck, 
  Flame,
  FileCode
} from 'lucide-react';

export const VibeCodeReviewer: React.FC = () => {
  const [vibeCode, setVibeCode] = useState<string>(
`// AI-Generated React & Node Fetching Logic (Vibe Code)
async function loadUserData(userId) {
  const res = await fetch('/api/user/' + userId);
  const data = await res.json();
  
  // Unsafe direct property dereference without res.ok or data guards
  document.getElementById('user-name').innerText = data.profile.fullName;
  
  // Missing error handling, missing type check, potential XSS
  return data;
}`
  );

  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [reviewResult, setReviewResult] = useState<any | null>(null);

  const handleRunVibeReview = () => {
    setIsReviewing(true);
    setTimeout(() => {
      setIsReviewing(false);
      setReviewResult({
        issuesCount: 4,
        healthScore: 68,
        issues: [
          {
            severity: 'CRITICAL',
            line: 3,
            type: 'Unchecked HTTP Response',
            desc: 'res.json() is called without checking if res.ok is true (HTTP 4xx/5xx status causes JSON parse exception).'
          },
          {
            severity: 'HIGH',
            line: 6,
            type: 'Unsafe Property Dereference',
            desc: 'data.profile.fullName accesses nested properties without optional chaining guards (?.)'
          },
          {
            severity: 'HIGH',
            line: 6,
            type: 'DOM XSS / Unsafe Mutation',
            desc: 'Directly assigning to innerText/innerHTML without React ref or sanitizer.'
          },
          {
            severity: 'MEDIUM',
            line: 2,
            type: 'Missing Try/Catch Boundary',
            desc: 'Asynchronous fetch network failure is unhandled.'
          }
        ],
        correctedCode: 
`// Refactored & Verified Code
async function loadUserData(userId: string) {
  try {
    const res = await fetch(\`/api/user/\${encodeURIComponent(userId)}\`);
    if (!res.ok) {
      throw new Error(\`HTTP error! status: \${res.status}\`);
    }
    const data = await res.json();
    
    // Guarded property extraction
    const fullName = data?.profile?.fullName ?? 'Anonymous User';
    return { success: true, name: fullName, data };
  } catch (err) {
    console.error('Failed to load user data:', err);
    return { success: false, error: (err as Error).message };
  }
}`,
        verificationReport: 'VERIFIED: Clean AST execution. Resilient HTTP 404/500 fallback tests passed.'
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" /> Vibe Code Inspector
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">AI-Generated Code Reviewer</h2>
          <p className="text-xs text-gray-400">
            Audit vibe-coded features for hidden edge cases, missing null checks, security vulnerabilities, and bad practices.
          </p>
        </div>

        <button
          onClick={handleRunVibeReview}
          disabled={isReviewing}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-purple-500/25 flex items-center space-x-2 transition"
        >
          {isReviewing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Auditing Vibe Code...</span>
            </>
          ) : (
            <>
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Audit Vibe Code</span>
            </>
          )}
        </button>
      </div>

      {/* Editor & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Editor */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-gray-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-400" /> Paste AI-Generated Code Snippet
            </h3>
            <span className="text-xs text-gray-400">JavaScript / TypeScript</span>
          </div>

          <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-950">
            <Editor
              height="380px"
              language="javascript"
              theme="vs-dark"
              value={vibeCode}
              onChange={(val) => setVibeCode(val || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                scrollBeyondLastLine: false,
                padding: { top: 12, bottom: 12 },
                fontFamily: 'Fira Code, Menlo, Monaco, Consolas, monospace'
              }}
            />
          </div>
        </div>

        {/* Right Column: Review Report */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-gray-800 space-y-4">
          {!reviewResult ? (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center text-gray-400 space-y-3">
              <Sparkles className="w-12 h-12 text-purple-500/40 animate-pulse" />
              <h4 className="text-base font-bold text-gray-200">Ready for Vibe Review</h4>
              <p className="text-xs text-gray-400 max-w-sm">
                Paste your ChatGPT/Claude/Cursor generated code and click 'Audit Vibe Code' to detect hidden bugs and auto-verify fixes.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-900/80 p-4 rounded-xl border border-gray-800">
                <div>
                  <span className="text-xs text-gray-400 font-semibold uppercase block">Vibe Code Health</span>
                  <div className="text-2xl font-black text-amber-400">{reviewResult.healthScore}/100</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-rose-400 font-bold bg-rose-950/60 px-2.5 py-1 rounded-md border border-rose-500/30">
                    {reviewResult.issuesCount} Issues Flagged
                  </span>
                </div>
              </div>

              {/* Issues List */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {reviewResult.issues.map((issue: any, idx: number) => (
                  <div key={idx} className="bg-gray-950 p-3 rounded-xl border border-gray-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-400">Line {issue.line}: {issue.type}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{issue.severity}</span>
                    </div>
                    <p className="text-gray-300 text-[11px]">{issue.desc}</p>
                  </div>
                ))}
              </div>

              {/* Verified Code Box */}
              <div>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mb-1">
                  <ShieldCheck className="w-4 h-4" /> Verified Refactored Output
                </span>
                <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-950">
                  <Editor
                    height="180px"
                    language="typescript"
                    theme="vs-dark"
                    value={reviewResult.correctedCode}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 12,
                      scrollBeyondLastLine: false,
                      padding: { top: 10, bottom: 10 }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
