import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  GitPullRequest, 
  ExternalLink,
  Flame,
  Star,
  GitFork,
  RefreshCw,
  FolderGit2
} from 'lucide-react';
import type { StreakInfo } from '../types';

interface GitHubProjectsViewProps {
  streak: StreakInfo;
}

interface RepoItem {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  html_url: string;
  default_branch: string;
  health: number;
}

export const GitHubProjectsView: React.FC<GitHubProjectsViewProps> = ({ streak }) => {
  const GITHUB_USERNAME = 'BojapallyNaveena';
  const GITHUB_PROFILE_URL = 'https://github.com/BojapallyNaveena';

  const defaultRepos: RepoItem[] = [
    {
      id: 1,
      name: 'my-readme',
      full_name: 'BojapallyNaveena/my-readme',
      description: 'Personal GitHub Profile README & Portfolio Showcase for Naveena Bojapally',
      stars: 24,
      forks: 8,
      language: 'Markdown / HTML',
      html_url: 'https://github.com/BojapallyNaveena/my-readme',
      default_branch: 'main',
      health: 98
    },
    {
      id: 2,
      name: 'codefix-ai',
      full_name: 'BojapallyNaveena/codefix-ai',
      description: 'RAG Software Debugging Engine & FixMind Automated Verification Platform',
      stars: 58,
      forks: 14,
      language: 'TypeScript / Python',
      html_url: 'https://github.com/BojapallyNaveena',
      default_branch: 'main',
      health: 96
    },
    {
      id: 3,
      name: 'spring-boot-demo',
      full_name: 'BojapallyNaveena/spring-boot-demo',
      description: 'Enterprise Spring Boot 3 REST API & PostgreSQL Microservice Architecture',
      stars: 32,
      forks: 9,
      language: 'Java / SQL',
      html_url: 'https://github.com/BojapallyNaveena',
      default_branch: 'main',
      health: 94
    }
  ];

  const [repos, setRepos] = useState<RepoItem[]>(defaultRepos);
  const [selectedRepo, setSelectedRepo] = useState<RepoItem>(defaultRepos[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<{
    name: string;
    bio: string;
    public_repos: number;
    followers: number;
    avatar_url: string;
  }>({
    name: 'Naveena Bojapally',
    bio: 'Software Engineer & CS Student',
    public_repos: 5,
    followers: 18,
    avatar_url: `https://github.com/${GITHUB_USERNAME}.png`
  });

  // Fetch real GitHub repositories from GitHub public API
  const fetchGitHubRepos = async () => {
    setIsLoading(true);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`)
      ]);

      if (userRes.ok) {
        const uData = await userRes.json();
        setUserProfile({
          name: uData.name || 'Naveena Bojapally',
          bio: uData.bio || 'Software Developer & CS Student',
          public_repos: uData.public_repos || 5,
          followers: uData.followers || 18,
          avatar_url: uData.avatar_url || `https://github.com/${GITHUB_USERNAME}.png`
        });
      }

      if (reposRes.ok) {
        const rData = await reposRes.json();
        if (Array.isArray(rData) && rData.length > 0) {
          const mapped: RepoItem[] = rData.map((r: any, idx: number) => ({
            id: r.id,
            name: r.name,
            full_name: r.full_name,
            description: r.description || 'GitHub Repository project by @BojapallyNaveena',
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            language: r.language || 'Code',
            html_url: r.html_url || GITHUB_PROFILE_URL,
            default_branch: r.default_branch || 'main',
            health: 98 - (idx * 2)
          }));
          setRepos(mapped);
          setSelectedRepo(mapped[0]);
        }
      }
    } catch (e) {
      console.warn('GitHub API fetch fallback:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const prAnalysis = {
    id: 42,
    title: `PR #42: Add Security Filters & JWT Auth in ${selectedRepo.name}`,
    filesChanged: 8,
    issues: [
      {
        severity: 'CRITICAL',
        file: 'SecurityConfig.java',
        line: 38,
        problem: 'JWT expiration validation timestamp check missing',
        evidence: 'Claims payload extracted without verifyExpiration() assertion',
        fix: 'Add claims.getExpiration().before(new Date()) assertion in JwtTokenProvider.java'
      },
      {
        severity: 'WARNING',
        file: 'package.json / pom.xml',
        line: 24,
        problem: 'Outdated dependency version',
        evidence: 'Library version requires security patch update',
        fix: 'Upgrade dependency to latest LTS release'
      }
    ]
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Connected GitHub User Card */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 gradient-border-glow">
        <div className="flex items-center space-x-4">
          <img
            src={userProfile.avatar_url}
            alt={GITHUB_USERNAME}
            className="w-16 h-16 rounded-2xl border-2 border-indigo-500/40 shadow-xl object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-black text-white font-mono">{userProfile.name}</h2>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-indigo-500/30 transition font-bold"
              >
                <span>@{GITHUB_USERNAME}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs text-gray-300 mt-0.5 font-medium">
              {userProfile.bio} • {userProfile.public_repos} Public Repositories
            </p>
          </div>
        </div>

        {/* Streak & Sync Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-gradient-to-r from-amber-950/80 to-gray-900 border border-amber-500/40 px-4 py-2 rounded-xl flex items-center space-x-2.5 shadow-lg">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            <div>
              <div className="text-xs font-black text-amber-400">🔥 {streak.currentStreak} Day Debugging Streak</div>
              <div className="text-[11px] text-amber-300/80 font-medium">+5 FixCoins Daily Bonus</div>
            </div>
          </div>

          <button
            onClick={fetchGitHubRepos}
            disabled={isLoading}
            className="bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 text-xs font-bold px-3 py-2.5 rounded-xl flex items-center space-x-1.5 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync Repos</span>
          </button>
        </div>
      </div>

      {/* Repo Selector & Active Project Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Authorized Repositories List */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-gray-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-indigo-400" />
              @BojapallyNaveena Projects
            </h3>
            <span className="text-xs text-indigo-400 font-bold">{repos.length} Repos</span>
          </div>
          
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {repos.map((repo) => {
              const isSelected = selectedRepo.id === repo.id;
              return (
                <div
                  key={repo.id}
                  onClick={() => setSelectedRepo(repo)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-indigo-950/70 border-indigo-500/80 text-white shadow-lg shadow-indigo-500/10'
                      : 'bg-gray-900/40 border-gray-800 text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono truncate max-w-[170px]">{repo.full_name}</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                      Health {repo.health}%
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">{repo.description}</p>

                  <div className="text-[11px] text-gray-400 mt-2 flex items-center justify-between font-mono">
                    <span className="text-cyan-400 font-semibold">{repo.language}</span>
                    <div className="flex items-center space-x-3 text-amber-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <GitFork className="w-3 h-3 text-gray-500" /> {repo.forks}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-cyan-300 font-bold text-xs flex items-center justify-center space-x-2 transition"
            >
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span>Open @BojapallyNaveena on GitHub</span>
            </a>
          </div>
        </div>

        {/* Right Column: Selected Repository Health Scorecard */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-gray-800 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div>
              <span className="text-xs text-gray-400 font-semibold uppercase block">Active Repository Analysis</span>
              <div className="flex items-center space-x-2 mt-0.5">
                <h3 className="text-xl font-black text-white font-mono">{selectedRepo.full_name}</h3>
                <a
                  href={selectedRepo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white"
                  title="View on GitHub"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="text-right">
              <span className="text-3xl font-black gradient-text-indigo">{selectedRepo.health}/100</span>
              <span className="text-[11px] text-emerald-400 block font-medium">Overall Health: Grade A+</span>
            </div>
          </div>

          {/* Project Details Banner */}
          <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-2">
            <p className="text-xs text-gray-300 leading-relaxed">{selectedRepo.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400 pt-1">
              <span>Language: <strong className="text-cyan-300">{selectedRepo.language}</strong></span>
              <span>Branch: <strong className="text-indigo-300">{selectedRepo.default_branch}</strong></span>
              <span>Stars: <strong className="text-amber-400">{selectedRepo.stars}</strong></span>
              <span>Forks: <strong className="text-emerald-400">{selectedRepo.forks}</strong></span>
            </div>
          </div>

          {/* Scorecard Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800">
              <span className="text-gray-400 font-medium block">Code Quality</span>
              <span className="text-base font-bold text-emerald-400">98%</span>
            </div>
            <div className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800">
              <span className="text-gray-400 font-medium block">Security Audit</span>
              <span className="text-base font-bold text-emerald-400">100%</span>
            </div>
            <div className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800">
              <span className="text-gray-400 font-medium block">Dependencies</span>
              <span className="text-base font-bold text-emerald-400">95%</span>
            </div>
            <div className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800">
              <span className="text-gray-400 font-medium block">Test Coverage</span>
              <span className="text-base font-bold text-emerald-400">94%</span>
            </div>
            <div className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800">
              <span className="text-gray-400 font-medium block">Configuration</span>
              <span className="text-base font-bold text-emerald-400">100%</span>
            </div>
            <div className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800">
              <span className="text-gray-400 font-medium block">Documentation</span>
              <span className="text-base font-bold text-emerald-400">100%</span>
            </div>
          </div>

          {/* Automated Pull Request Review */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <GitPullRequest className="w-4 h-4 text-purple-400" /> Automated Pull Request Review
            </h4>

            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{prAnalysis.title}</span>
                <span className="text-gray-400 font-medium">{prAnalysis.filesChanged} Files Changed</span>
              </div>

              <div className="space-y-2">
                {prAnalysis.issues.map((issue, idx) => (
                  <div key={idx} className="bg-gray-900/80 p-3.5 rounded-xl border border-gray-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-rose-400">[{issue.severity}] {issue.file} (Line {issue.line})</span>
                      <span className="text-gray-400 text-[11px]">{issue.problem}</span>
                    </div>
                    <div className="text-gray-300 text-[11px]">
                      <strong className="text-indigo-400">Evidence:</strong> {issue.evidence}
                    </div>
                    <div className="text-emerald-400 text-[11px]">
                      <strong className="text-emerald-300">Fix Recommendation:</strong> {issue.fix}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
