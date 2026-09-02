import React, { useState } from 'react';
import { 
  GraduationCap, 
  Lightbulb, 
  Lock, 
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Coins
} from 'lucide-react';

interface StudentLearningModeProps {
  onAwardCoins?: (amount: number, reason: string) => void;
}

export const StudentLearningMode: React.FC<StudentLearningModeProps> = ({ onAwardCoins }) => {
  const [level, setLevel] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('BEGINNER');
  const [unlockedHintIndex, setUnlockedHintIndex] = useState<number>(0);

  // Challenges Dictionary by Level
  const problems = {
    BEGINNER: {
      title: 'Python IndexError in List Traversal',
      language: 'Python',
      initialCode: `numbers = [10, 20, 30, 40]

# Intent: Print each element in numbers list
for i in range(len(numbers) + 1):
    print(numbers[i])`,
      error: `IndexError: list index out of range at line 5`,
      hints: [
        {
          title: 'Hint 1: Check List Boundaries',
          content: 'Look closely at the length of `numbers` (4 items). Python list indices range from 0 to 3.'
        },
        {
          title: 'Hint 2: Range Upper Bound',
          content: 'The expression `range(len(numbers) + 1)` produces 0, 1, 2, 3, 4. Index 4 causes an out-of-bounds error!'
        },
        {
          title: 'Full Root Cause & Solution',
          content: 'Remove the `+ 1` from `range(len(numbers))`, or use Python idiomatic `for num in numbers:` directly.'
        }
      ],
      correctedCode: `numbers = [10, 20, 30, 40]

# Idiomatic Python iteration (No index out-of-bound risk)
for num in numbers:
    print(num)`,
      validateFix: (code: string) => {
        return (!code.includes('+ 1') && (code.includes('range(len(numbers))') || code.includes('range(4)'))) ||
               code.includes('for num in numbers:') ||
               code.includes('for n in numbers:');
      },
      successOutput: `10\n20\n30\n40\n\n🎉 SUCCESS: Code compiled cleanly! 4 items printed with 0 out-of-bound errors.`,
      failOutput: `Traceback (most recent call last):\n  File "main.py", line 5, in <module>\n    print(numbers[i])\nIndexError: list index out of range`
    },

    INTERMEDIATE: {
      title: 'Java NullPointerException in Spring Boot Controller',
      language: 'Java / Spring Boot',
      initialCode: `package com.codefix.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    // Missing dependency injection annotation
    private StudentService studentService;

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable String id) {
        return studentService.findById(id);
    }
}`,
      error: `java.lang.NullPointerException: Cannot invoke "StudentService.findById(String)" because "this.studentService" is null at StudentController.java:14`,
      hints: [
        {
          title: 'Hint 1: Dependency Lifecycle',
          content: 'The `studentService` field is declared, but it is never instantiated with `new` nor injected by Spring IoC container.'
        },
        {
          title: 'Hint 2: Spring Annotations',
          content: 'In Spring Boot, add `@Autowired` directly above `private StudentService studentService;` so Spring injects the bean automatically.'
        },
        {
          title: 'Full Root Cause & Solution',
          content: 'Annotate the field with `@Autowired` or use constructor injection: `public StudentController(StudentService service) { this.studentService = service; }`.'
        }
      ],
      correctedCode: `package com.codefix.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired // Spring Dependency Injection Enabled
    private StudentService studentService;

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable String id) {
        return studentService.findById(id);
    }
}`,
      validateFix: (code: string) => {
        return code.includes('@Autowired') || 
               code.includes('StudentService studentService = new StudentService()') ||
               code.includes('public StudentController');
      },
      successOutput: `[INFO] Spring IoC Container initialized.\n[INFO] Injecting bean 'studentService' into StudentController.\n[TEST] GET /api/students/101 -> 200 OK { id: "101", name: "Jane Doe" }\n\n🎉 SUCCESS: NullPointerException resolved! Spring IoC dependency injected cleanly.`,
      failOutput: `[ERROR] GET /api/students/101 HTTP/1.1 -> 500 Internal Server Error\njava.lang.NullPointerException: Cannot invoke "StudentService.findById(String)" because "this.studentService" is null`
    },

    ADVANCED: {
      title: 'React Unhandled Async Promise Rejection & Pending State',
      language: 'JavaScript / React',
      initialCode: `import React, { useState, useEffect } from 'react';

export function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Bug: Missing async/await and missing res.ok check
    const response = fetch('/api/user/me');
    const data = response.json();
    setUser(data);
  }, []);

  return <div>Welcome, {user.name}</div>;
}`,
      error: `TypeError: response.json is not a function (response is a Promise <pending>) at UserProfile.jsx:9`,
      hints: [
        {
          title: 'Hint 1: Promises vs Synchronous Values',
          content: '`fetch()` returns a `Promise`, not the HTTP response immediately! You must `await` the fetch call.'
        },
        {
          title: 'Hint 2: Unpacking JSON Response',
          content: '`response.json()` is ALSO an asynchronous method that returns a Promise. Wrap the fetch inside an `async` function inside `useEffect`.'
        },
        {
          title: 'Full Root Cause & Solution',
          content: 'Define an `async function loadUser()` inside `useEffect`, `await fetch()`, check `if (res.ok)`, `await res.json()`, and handle non-null initial state rendering.'
        }
      ],
      correctedCode: `import React, { useState, useEffect } from 'react';

export function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch('/api/user/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    }
    loadUser();
  }, []);

  if (!user) return <div>Loading user profile...</div>;
  return <div>Welcome, {user.name}</div>;
}`,
      validateFix: (code: string) => {
        return (code.includes('await fetch') || code.includes('.then(')) &&
               (code.includes('await response.json()') || code.includes('await res.json()') || code.includes('res.json().then'));
      },
      successOutput: `[VITE] Hot Module Replacement enabled.\n[REACT TEST] Mounting UserProfile component...\n[FETCH] GET /api/user/me -> 200 OK { name: "Alex Student" }\n[STATE UPDATE] UserProfile rendered: "Welcome, Alex Student"\n\n🎉 SUCCESS: Unhandled Promise Rejection fixed! Async/await and response handling verified.`,
      failOutput: `[REACT UNCAUGHT EXCEPTION] TypeError: response.json is not a function (response is a Promise <pending>)\n    at UserProfile (UserProfile.jsx:9:24)`
    }
  };

  const currentProblem = problems[level];
  const [userCode, setUserCode] = useState<string>(currentProblem.initialCode);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<{
    success: boolean;
    output: string;
    error?: string;
  } | null>(null);

  // Switch level handler
  const handleLevelSwitch = (newLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED') => {
    setLevel(newLevel);
    setUnlockedHintIndex(0);
    setUserCode(problems[newLevel].initialCode);
    setExecutionResult(null);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setExecutionResult(null);

    setTimeout(() => {
      setIsExecuting(false);
      const isFixed = currentProblem.validateFix(userCode);

      if (isFixed) {
        setExecutionResult({
          success: true,
          output: currentProblem.successOutput
        });

        if (onAwardCoins) {
          onAwardCoins(25, `Completed ${level} Level Debugging Challenge (+25 FC)`);
        }
      } else {
        setExecutionResult({
          success: false,
          output: currentProblem.failOutput,
          error: 'Bug still detected! Unlock hints on the right to resolve the issue.'
        });
      }
    }, 600);
  };

  const handleResetCode = () => {
    setUserCode(currentProblem.initialCode);
    setExecutionResult(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Level Selector */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 gradient-border-glow">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" /> Interactive Student Mode
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">Guided Debugging Tutor & Level Challenges</h2>
          <p className="text-xs text-gray-400">
            Select a difficulty level (Beginner, Intermediate, Advanced), edit the code in the sandbox, use hints, and click "Run & Test Code" to earn +25 FixCoins!
          </p>
        </div>

        {/* Level Controls */}
        <div className="flex items-center space-x-1 bg-gray-900 border border-gray-800 p-1.5 rounded-xl">
          {(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleLevelSwitch(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                level === lvl ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-gray-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Challenge & Sandbox Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Code Editor & Sandbox Execution */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{level} LEVEL CHALLENGE</span>
                <span className="text-[10px] bg-gray-900 text-cyan-300 border border-gray-800 px-2 py-0.5 rounded font-mono">
                  {currentProblem.language}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">{currentProblem.title}</h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleResetCode}
                className="px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800 text-xs font-bold text-gray-300 flex items-center space-x-1 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={handleRunCode}
                disabled={isExecuting}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 transition"
              >
                {isExecuting ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Run & Test Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Initial Exception Card */}
          <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-xl">
            <span className="text-[11px] font-bold text-rose-400 uppercase block mb-1">Target Error to Resolve:</span>
            <pre className="text-xs font-mono text-rose-300 whitespace-pre-wrap">{currentProblem.error}</pre>
          </div>

          {/* Code Textarea Editor */}
          <div>
            <label className="text-xs text-gray-400 font-medium block mb-1">
              ✏️ Edit Code to Fix the Bug:
            </label>
            <textarea
              rows={11}
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full bg-gray-950 p-4 rounded-xl border border-gray-800 font-mono text-xs text-cyan-300 focus:border-indigo-500 focus:outline-none resize-y leading-relaxed shadow-inner"
              placeholder="Edit code here to fix the issue..."
            />
          </div>

          {/* Execution Terminal Output */}
          {executionResult && (
            <div className={`p-4 rounded-xl border space-y-2 text-xs font-mono transition ${
              executionResult.success 
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' 
                : 'bg-rose-950/60 border-rose-500/50 text-rose-300'
            }`}>
              <div className="flex items-center justify-between font-bold font-sans">
                <span className="flex items-center gap-1.5">
                  {executionResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
                  {executionResult.success ? 'Sandbox Execution Passed!' : 'Execution Exception Detected'}
                </span>
                {executionResult.success && (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[11px] font-black flex items-center gap-1">
                    <Coins className="w-3 h-3 text-amber-400" /> +25 FC Earned!
                  </span>
                )}
              </div>

              <pre className="whitespace-pre-wrap">{executionResult.output}</pre>

              {executionResult.error && (
                <p className="text-[11px] font-sans font-medium text-rose-200 mt-1">
                  💡 Tip: {executionResult.error}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Progressive Hint Stepper */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" /> Progressive Hint System
            </h3>
            <span className="text-xs font-medium text-gray-400">
              Hint {unlockedHintIndex + 1} of {currentProblem.hints.length}
            </span>
          </div>

          <div className="space-y-3">
            {currentProblem.hints.map((hint, idx) => {
              const isUnlocked = idx <= unlockedHintIndex;
              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border transition ${
                    isUnlocked 
                      ? 'bg-gray-900/80 border-indigo-500/40 text-gray-200' 
                      : 'bg-gray-950/40 border-gray-800 text-gray-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      {isUnlocked ? <Lightbulb className="w-4 h-4 text-amber-400" /> : <Lock className="w-4 h-4 text-gray-500" />}
                      {hint.title}
                    </span>
                    {isUnlocked && (
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                        Unlocked
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-300 mt-1">
                    {isUnlocked ? hint.content : 'Unlock the previous hint first to reveal this guidance.'}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stepper Buttons */}
          <div className="pt-2 flex items-center space-x-3">
            {unlockedHintIndex < currentProblem.hints.length - 1 && (
              <button
                onClick={() => setUnlockedHintIndex(prev => prev + 1)}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition"
              >
                <span>Unlock Next Hint ({unlockedHintIndex + 2})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {unlockedHintIndex >= currentProblem.hints.length - 1 && (
              <div className="w-full space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">Verified Corrected Solution Reference:</span>
                <pre className="bg-gray-950 p-3.5 rounded-xl border border-emerald-500/40 text-xs font-mono text-emerald-300 whitespace-pre-wrap overflow-x-auto">
                  {currentProblem.correctedCode}
                </pre>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
