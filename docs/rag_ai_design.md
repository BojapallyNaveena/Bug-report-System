# FixMind AI Engine & RAG Pipeline Architecture

## 1. FixMind Overview

**FixMind** is the software intelligence engine inside CodeFix. It relies on Retrieval-Augmented Generation (RAG) combined with language-specific AST analysis and empirical verification engines.

```
 User Input (Code + Error + Log + Repo Context)
                    │
                    ▼
 ┌──────────────────────────────────────────────────┐
 │ Step 1: Static & AST Analyzer                    │
 │ - Parses syntax trees (Java, Python, JS, C++)    │
 │ - Extracts symbol tables, line ranges, stack     │
 └──────────────────┬───────────────────────────────┘
                    │
                    ▼
 ┌──────────────────────────────────────────────────┐
 │ Step 2: RAG Vector Knowledge Retrieval           │
 │ - Dense vector query on PostgreSQL (pgvector)    │
 │ - Technical Docs + Error Knowledge + Verified    │
 │   Fix Knowledge Base                             │
 └──────────────────┬───────────────────────────────┘
                    │
                    ▼
 ┌──────────────────────────────────────────────────┐
 │ Step 3: Root-Cause Reasoning Engine              │
 │ - Evaluates evidence & confidence score          │
 │ - Generates evidence-backed explanation          │
 └──────────────────┬───────────────────────────────┘
                    │
                    ▼
 ┌──────────────────────────────────────────────────┐
 │ Step 4: Fix Generation                           │
 │ - Formulates precise code / config edit          │
 └──────────────────┬───────────────────────────────┘
                    │
                    ▼
 ┌──────────────────────────────────────────────────┐
 │ Step 5: Sandbox Verification                     │
 │ - Executes AST parser & static analysis / test   │
 │ - Emits `Verified Fix` (Passed) or `Suggested`   │
 └──────────────────────────────────────────────────┘
```

---

## 2. RAG Knowledge Collections

FixMind indexes 3 core knowledge vector bases using `sentence-transformers/all-MiniLM-L6-v2` (384 dimensions):

1. **Technical Documentation**:
   - Official syntax, framework conventions, standard library API docs (Spring, React, FastAPI, PostgreSQL, Docker, Maven, npm).

2. **Error Knowledge Base**:
   - Machine-parseable database of common error codes, exception types (`NullPointerException`, `CORS header missing`, `SQLState 23505`, `npm ERR! ERESOLVE`, `Docker exit code 137`), root cause templates, and diagnostic steps.

3. **Verified Fix Knowledge Base**:
   - Historical records of problems, exact diff fixes, and verification logs.

---

## 3. Evidence Extraction & Confidence Scoring

FixMind rates diagnostic confidence on a scale of `0.0` to `1.0`:

- **Confirmed (0.90 - 1.0)**: AST trace directly matches line number and symbol failure in stack trace; verification passes.
- **Highly Probable (0.70 - 0.89)**: Error pattern matched in RAG knowledge base with clear code indicators; verification pending.
- **Possible (0.50 - 0.69)**: Multiple potential causes identified; further logs or repo context recommended.
