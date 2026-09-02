# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# CodeFix
**AI-Powered Software Debugging, Learning & Project Intelligence Platform**

- **AI Engine:** FixMind
- **AI Architecture:** Retrieval-Augmented Generation (RAG) + Specialized Software Analysis + Fix Verification
- **Document Version:** 1.0
- **Status:** Product Definition
- **Target Users:** Students, Developers, Vibe Coders, Software Teams

---

## 1. Product Overview

CodeFix is a full-stack SaaS platform designed to help students and software developers identify, understand, troubleshoot, and resolve different types of software development problems.

Unlike a conventional chatbot that simply generates an answer, CodeFix combines:

- Static code analysis
- Runtime/error analysis
- API analysis
- Log analysis
- Dependency analysis
- Database analysis
- Project analysis
- Git/GitHub integration
- RAG-based technical knowledge retrieval
- AI-assisted root-cause analysis
- Fix generation
- Automated fix verification
- Technology-stack learning
- Vibe-code review

The AI intelligence layer of the platform is called **FixMind**.

FixMind uses RAG to retrieve relevant technical documentation, error knowledge, project context, and previously verified solutions before generating explanations or fixes.

The system focuses on evidence-based diagnosis rather than simply generating AI responses.

---

## 2. Product Vision

Build a universal software troubleshooting and learning platform where a user can provide code, errors, logs, APIs, project files, screenshots, dependencies, or a GitHub repository and receive:

1. Error identification
2. Error categorization
3. Root-cause analysis
4. Evidence supporting the diagnosis
5. Simple explanation
6. Suggested solution
7. Corrected code/configuration where applicable
8. Automated verification wherever possible
9. Learning explanation
10. Related documentation and resources

**Tagline:**  
*«Build with AI. Understand with FixMind. Verify with CodeFix.»*

---

## 3. Problem Statement

Students and developers frequently encounter problems such as:

- Programming errors
- Compilation errors
- Runtime exceptions
- Logical errors
- API failures
- Database errors
- Dependency conflicts
- Installation failures
- Configuration problems
- Authentication failures
- Docker/container problems
- Git errors
- Deployment problems
- Performance issues
- Security issues

Existing AI coding assistants can often provide possible solutions, but their responses may:

- Lack project context
- Provide incorrect fixes
- Generate unverified solutions
- Fail to explain the actual root cause
- Not analyze complete project structures
- Not verify whether the suggested fix actually works
- Not provide structured learning support

CodeFix addresses this by combining specialized software analyzers, project context, RAG, AI reasoning, and fix verification.

---

## 4. Target Users

### 4.1 Students
- Submit programming errors
- Understand errors in simple language
- Receive hints
- Learn technologies
- Practice debugging
- Get corrected code
- Track common mistakes
- Analyze their projects

### 4.2 Developers
- Debug applications
- Analyze logs
- Analyze APIs
- Review repositories
- Detect dependency problems
- Review pull requests
- Analyze commits
- Find potential security issues
- Validate fixes

### 4.3 Vibe Coders
- Analyze generated code
- Identify errors
- Detect bad practices
- Explain problems
- Suggest improvements
- Verify corrections
- Explain the technologies used

### 4.4 Development Teams
- Repository analysis
- Bug tracking
- Code review
- Project health analysis
- Security checks
- Dependency monitoring
- Pull request analysis

---

## 5. Core Product Modules

1. Authentication
2. Dashboard
3. Universal Bug Analyzer
4. Root Cause Analysis Engine
5. FixMind RAG AI
6. Fix Generation
7. Fix Verification
8. Technology Stack Tutor
9. Vibe Code Reviewer
10. Git/GitHub Integration
11. Project Analyzer
12. Bug History
13. Analytics
14. User Settings
15. SaaS Usage Management

---

## 6. Universal Bug Analysis

The system supports different categories of software problems.

### 6.1 Programming Errors
Support:
- Syntax errors
- Compilation errors
- Runtime errors
- Logical errors
- Type errors
- Null reference errors
- Array/index errors
- Memory-related errors
- Exception handling errors

Initial language support:
- Java
- Python
- JavaScript
- TypeScript
- C
- C++
- SQL

---

## 7. API Analysis

Users can provide HTTP method, URL, Request headers/body, Response status/headers/body, Error message, API logs.

Identifies:
- 400, 401, 403, 404, 409, 422, 429, 500 errors
- Authentication/Authorization problems
- CORS problems
- Invalid request formats
- Incorrect endpoints
- Token problems
- Timeout problems

---

## 8. Installation & Dependency Analysis

Supports package/build systems: npm, pip, Maven, Gradle.  
Detects dependency/version conflicts, missing packages, build failures, environment/PATH problems, missing runtime, configuration errors.

---

## 9. Database Error Analysis

Supports PostgreSQL & MySQL connection failures, auth failures, SQL syntax errors, missing tables/columns, constraint violations, query errors, transaction problems.

---

## 10. Docker & Deployment Analysis

Analyzes Dockerfile, docker-compose, container/build logs, environment configurations, deployment logs.

---

## 11. Git & GitHub Integration

OAuth connection, repository selection, branch/commit/pull request analysis across source code, configuration, tests, dependencies, and docs.

---

## 12. GitHub Project Analysis & Health Report

Generates health report across Code Quality, Security, Dependencies, Testing, Configuration, and Documentation.

---

## 13. Pull Request & Commit Analysis

Structured review of files changed, severity ratings (Critical, Warnings, Suggestions), line-by-line evidence and fixes.

---

## 14. FixMind AI Engine & RAG

- Uses RAG (Retrieval-Augmented Generation)
- Project context retrieval
- Technical documentation & Error knowledge base
- Verified fix knowledge base
- Contextual reasoning for precise root-cause analysis

---

## 15. Root Cause Analysis & Evidence-Based Diagnosis

- Distinguishes Confirmed, Highly Probable, and Possible root causes.
- Provides evidence (e.g., array length vs requested index, variable dereference trace).

---

## 16. Fix Generation & Fix Verification

- Generates corrected code, configuration changes, dependency fixes, API corrections, SQL updates, commands.
- Attempts verification through compilation, static analysis, unit tests, and sandboxed controlled execution.
- Distinguishes **Verified Fix** (Passed verification) vs **Suggested Fix** (Unverified).

---

## 17. Secure Code Execution (Sandbox)

- Sandbox container isolation
- CPU/Memory limits, Execution timeouts, Network/Filesystem isolation
- No access to host system or production secrets.

---

## 18. Vibe Coding Assistant & Technology Stack Tutor

- Dedicated support for AI-generated code (vibe coding).
- Explains technologies in projects (frontend, backend, database, devops) and how they communicate.

---

## 19. Student Learning Mode

- Interactive hint system (Hint 1, Hint 2, Explanation, Solution).
- Beginner, Intermediate, Advanced levels.

---

## 20. Dashboard & UI/UX

- SaaS-quality responsive dashboard.
- React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion + Monaco Editor + Recharts.

---

## 21. Tech Stack Summary

| Layer | Technology |
| --- | --- |
| **Frontend** | React + TypeScript (Vite), Tailwind CSS, shadcn/ui, Framer Motion, Monaco Editor, Recharts |
| **Backend** | Java + Spring Boot, Spring Security, JWT, Spring Data JPA / Hibernate |
| **AI Service** | Python + FastAPI, LlamaIndex, PyTorch, scikit-learn, sentence-transformers |
| **Vector DB / Storage** | PostgreSQL with pgvector, Redis, S3-compatible Object Storage |
| **Sandbox / Infra** | Docker, Git/GitHub API |

---

## 22. Implementation Directives

1. Master PRD is the single source of truth.
2. Modular architecture built phase by phase.
3. Verification-first approach: Always distinguish verified solutions from suggestions.
4. Isolated secure sandbox execution.
5. Strict secret management & API security.
