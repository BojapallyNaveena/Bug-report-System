import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Database, 
  Globe, 
  Terminal, 
  ShieldAlert, 
  ChevronRight,
  Code2
} from 'lucide-react';

export const TechTutorView: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string>('SPRING');

  const stackDetails: Record<string, any> = {
    SPRING: {
      name: 'Spring Boot 3 (Java 21)',
      layer: 'Backend Framework',
      icon: Layers,
      color: 'text-emerald-400',
      description: 'Enterprise backend framework managing REST APIs, JPA ORM entities, and Spring Security JWT authentication.',
      communication: 'Communicates with PostgreSQL database over JDBC/Hibernate and exposes JSON APIs to React frontend.',
      commonBugs: [
        'NullPointerException when @Autowired injection is omitted on service fields.',
        'LazyInitializationException when accessing unfetched Hibernate entity relations outside transaction scope.',
        'CORS policy blocks when @CrossOrigin header annotations are missing on RestController endpoints.'
      ],
      codeExample: 
`@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;

    // Constructor Injection (Best Practice)
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }
}`
    },
    REACT: {
      name: 'React 18 + TypeScript (Vite)',
      layer: 'Frontend Single Page Application',
      icon: Globe,
      color: 'text-cyan-400',
      description: 'Single-page user interface leveraging state management, Monaco Editor integration, and Tailwind CSS glassmorphism.',
      communication: 'Executes HTTP REST fetch calls to Spring Boot API gateway at port 8080 with JWT Authorization headers.',
      commonBugs: [
        'Infinite re-render loops caused by missing dependency array in useEffect hook.',
        'TypeError when dereferencing nested asynchronous API response properties prior to load resolution.',
        'Stale closures holding old state values inside event handlers.'
      ],
      codeExample: 
`// Optional Chaining & Nullish Guard (Best Practice)
const userFullName = data?.user?.profile?.fullName ?? 'Default User';`
    },
    POSTGRES: {
      name: 'PostgreSQL 16 + pgvector',
      layer: 'Relational & Vector Database',
      icon: Database,
      color: 'text-indigo-400',
      description: 'ACID-compliant relational database storing users, projects, and bug reports, with pgvector extension powering RAG embeddings.',
      communication: 'Persists application entity tables and responds to vector similarity queries from FixMind AI engine.',
      commonBugs: [
        'Deadlock exception caused by conflicting transaction lock acquire ordering.',
        'PostgreSQL connection pool exhaustion when connections are not properly closed.',
        'Vector dimension mismatch (e.g., 384-dim embedding inserted into 1536-dim vector column).'
      ],
      codeExample: 
`SELECT id, content, 1 - (embedding <=> '[0.012, 0.045, ...]') AS similarity 
FROM knowledge_vectors 
ORDER BY embedding <=> '[0.012, 0.045, ...]' LIMIT 5;`
    },
    DOCKER: {
      name: 'Docker Container Sandbox',
      layer: 'Verification & Execution Environment',
      icon: Terminal,
      color: 'text-purple-400',
      description: 'Isolated container environment evaluating student & developer code fixes safely without host vulnerability.',
      communication: 'Controlled execution via isolated Docker runtime socket with CPU/memory resource limits.',
      commonBugs: [
        'Container exit code 137 triggered by out-of-memory (OOM) memory ceiling breaches.',
        'Host port binding conflicts when port 8080 or 5432 is already bound by host background processes.',
        'Permission denied on mounting guest volume paths.'
      ],
      codeExample: 
`# Secure Sandbox Execution Constraints
docker run --read-only --cpus=0.5 --memory=256m --network=none sandbox_env`
    }
  };

  const currentTech = stackDetails[selectedTech];
  const Icon = currentTech.icon;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-indigo-400" /> Technology Tutor Module
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">Full-Stack Tech Stack Architecture</h2>
          <p className="text-xs text-gray-400">
            Learn how each technology in your stack operates, communicates, and how to debug standard failure modes.
          </p>
        </div>
      </div>

      {/* Tech Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.keys(stackDetails).map((key) => {
          const item = stackDetails[key];
          const ItemIcon = item.icon;
          const isSel = selectedTech === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedTech(key)}
              className={`p-4 rounded-xl border flex items-center space-x-3 text-left transition ${
                isSel
                  ? 'bg-gray-900 border-indigo-500/80 shadow-lg shadow-indigo-500/10'
                  : 'bg-gray-950/60 border-gray-800 hover:border-gray-700'
              }`}
            >
              <ItemIcon className={`w-6 h-6 ${item.color}`} />
              <div>
                <div className="text-sm font-bold text-white">{key}</div>
                <div className="text-[11px] text-gray-400">{item.layer}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Spec Display */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-6">
        <div className="flex items-center space-x-3 border-b border-gray-800 pb-4">
          <Icon className={`w-8 h-8 ${currentTech.color}`} />
          <div>
            <h3 className="text-xl font-bold text-white">{currentTech.name}</h3>
            <span className="text-xs font-semibold text-gray-400">{currentTech.layer}</span>
          </div>
        </div>

        {/* Overview & Inter-Service Communication */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 space-y-1.5">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Module Purpose</h4>
            <p className="text-xs text-gray-300 leading-relaxed">{currentTech.description}</p>
          </div>

          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 space-y-1.5">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Inter-Service Communication</h4>
            <p className="text-xs text-gray-300 leading-relaxed">{currentTech.communication}</p>
          </div>
        </div>

        {/* Common Bugs & Defensive Strategies */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" /> Common Failure Traps & Debugging Rules
          </h4>

          <div className="space-y-2">
            {currentTech.commonBugs.map((bug: string, idx: number) => (
              <div key={idx} className="bg-gray-950 p-3 rounded-xl border border-gray-800 text-xs text-gray-300 flex items-start space-x-2.5">
                <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{bug}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practice Code Snippet */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Code2 className="w-4 h-4" /> Recommended Pattern & Best Practice Code
          </h4>
          <pre className="bg-gray-950 p-4 rounded-xl border border-gray-800 text-xs font-mono text-emerald-300 overflow-x-auto">
            {currentTech.codeExample}
          </pre>
        </div>

      </div>

    </div>
  );
};
