export type Language = 'JAVA' | 'PYTHON' | 'JAVASCRIPT' | 'TYPESCRIPT' | 'CPP' | 'SQL';
export type BugCategory = 'PROGRAMMING' | 'API' | 'LOG' | 'DEPENDENCY' | 'DATABASE' | 'DOCKER';
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type UserRole = 'STUDENT' | 'DEVELOPER' | 'ADMIN';
export type ResumeTemplate = 'ATS_FRIENDLY' | 'MODERN_PRO' | 'GRADUATE';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  githubUsername?: string;
  githubUrl?: string;
}

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  weeklyActivity: boolean[]; // 7 days Mon-Sun
  streakBonusCoins: number;
}

export interface EvidenceItem {
  line?: number;
  variable?: string;
  description: string;
}

export interface FixDetail {
  id: string;
  suggestedCode: string;
  explanation: string;
  isVerified: boolean;
}

export interface VerificationDetail {
  compilationPassed: boolean;
  testsPassed: boolean;
  executionOutput: string;
}

export interface AnalysisResult {
  id: string;
  bugReportId: string;
  title: string;
  category: BugCategory;
  language: Language;
  errorType: string;
  severity: Severity;
  rootCause: string;
  evidence: EvidenceItem[];
  confidence: number;
  fix: FixDetail;
  verification: VerificationDetail;
  learningNotes: string[];
  createdAt: string;
}

export interface ProjectHealth {
  id: string;
  name: string;
  techStack: string[];
  overallHealthScore: number;
  codeQuality: number;
  securityScore: number;
  dependencyScore: number;
  testCoverage: number;
  openIssuesCount: number;
}

export interface FixCoinWallet {
  balance: number;
  totalEarned: number;
  totalSpent: number;
}

export interface FixCoinTransaction {
  id: string;
  amount: number;
  type: 'EARN' | 'SPEND';
  reason: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rewardCoins: number;
  isEarned: boolean;
  earnedAt?: string;
}

export interface ResumePersonal {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface ResumeEducation {
  degree: string;
  college: string;
  graduationYear: string;
  cgpa: string;
}

export interface ResumeProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  isVerified: boolean;
}

export interface ResumeExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  bulletPoints: string[];
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  template: ResumeTemplate;
  personalInfo: ResumePersonal;
  summary: string;
  education: ResumeEducation[];
  skills: string[];
  verifiedSkills: string[];
  projects: ResumeProject[];
  experience: ResumeExperience[];
  certifications: string[];
  achievements: string[];
  languages: string[];
  createdAt: string;
  updatedAt: string;
}
