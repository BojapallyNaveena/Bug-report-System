# CodeFix Technical System Architecture

## 1. System Overview

CodeFix is an AI-powered software debugging, learning, and project intelligence platform. The architecture separates concerns into distinct, specialized services:

```
                            [ Web Browser / Client ]
                                        │
                                        ▼ (HTTPS / REST)
                             ┌─────────────────────┐
                             │  React + TS Frontend│
                             │ (Vite + Tailwind +  │
                             │   Monaco Editor)    │
                             └──────────┬──────────┘
                                        │ (JWT Bearer Auth)
                                        ▼
                             ┌─────────────────────┐
                             │  Spring Boot Backend│
                             │     API Gateway     │
                             │ (Security, JPA, Auth│
                             │ Project Orchestrator)│
                             └─────┬───────────┬───┘
                                   │           │
           ┌───────────────────────┘           └───────────────────────┐
           ▼                                                           ▼
┌────────────────────┐                                       ┌───────────────────┐
│ PostgreSQL         │                                       │ Python FastAPI    │
│ + pgvector         │                                       │ FixMind AI Engine │
│ (Relational Data & │                                       │ (RAG, Analyzers,  │
│ Embeddings)        │                                       │ Root Cause, Fix)  │
└────────────────────┘                                       └─────────┬─────────┘
                                                                       │
                                                                       ▼
                                                             ┌───────────────────┐
                                                             │ Docker Sandbox    │
                                                             │ Verification Env  │
                                                             └───────────────────┘
```

---

## 2. Core Service Components

### 2.1 Web Frontend (`/frontend`)
- **Framework**: React 18 with TypeScript & Vite
- **Styling**: Tailwind CSS + custom glassmorphic components + Lucide Icons
- **Interactive Code Editor**: Monaco Editor (`@monaco-editor/react`)
- **Charts & Visualization**: Recharts
- **State & Data Fetching**: React Query (TanStack Query) + Context API / Zustand

### 2.2 Core Backend Gateway (`/backend`)
- **Framework**: Java 21 + Spring Boot 3
- **Security**: Spring Security + JWT Authentication + Role-Based Access Control (Student, Developer, Admin)
- **Data Access**: Spring Data JPA + Hibernate + PostgreSQL
- **Responsibilities**:
  - Authentication, User session management
  - Project management & GitHub OAuth integration
  - Analysis request orchestration and bug report lifecycle
  - Subscription & usage quota management

### 2.3 FixMind AI & RAG Engine (`/ai-service`)
- **Framework**: Python 3.11 + FastAPI
- **RAG System**: LlamaIndex + LangChain + HuggingFace `sentence-transformers`
- **Vector Search**: PostgreSQL `pgvector`
- **Analyzers**:
  - Code Analyzer (AST parsing with Python `ast`, Java `javalang`, JS/TS `esprima`)
  - Log Analyzer (Regex regex pattern matchers for stack traces)
  - API Analyzer (HTTP response & curl inspector)
  - Dependency Analyzer (npm, Maven, Gradle, PyPI lock file parser)
- **Fix Generator & Root Cause Reasoning**: RAG-prompted structural LLM pipeline

### 2.4 Secure Sandbox Verification Engine
- **Technology**: Isolated Docker containers with CPU/Memory limits, read-only root FS, process caps, timeout handlers.
- **Languages Supported**: Java, Python, JavaScript, TypeScript, C, C++, SQL.

---

## 3. Communication Protocols

- **Client <-> Backend API**: HTTPS / REST JSON APIs with JWT in `Authorization: Bearer <token>`
- **Backend API <-> AI Engine**: Internal HTTP REST JSON endpoints (`/api/v1/ai/...`)
- **AI Engine <-> Sandbox**: Docker Engine API over unix socket / HTTP.
