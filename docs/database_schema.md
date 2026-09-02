# CodeFix Database Schema (PostgreSQL + pgvector)

## 1. Entities & Relations

```
[ users ] ──1:N──> [ projects ] ──1:N──> [ bug_reports ] ──1:N──> [ analyses ]
    │                   │                                              │
    ├──1:N──> [ git_repos ]                                            ├──1:1──> [ fixes ]
    │                                                                  │
    └──1:N──> [ learning_progress ]                                    └──1:1──> [ verifications ]

[ rag_knowledge_embeddings ] (pgvector table for RAG indexing)
```

---

## 2. Table Specifications

### 2.1 `users`
| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PRIMARY KEY | Unique user identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| `password_hash` | VARCHAR(255) | NOT NULL | BCrypt hashed password |
| `full_name` | VARCHAR(100) | NOT NULL | User display name |
| `role` | VARCHAR(20) | NOT NULL | `STUDENT`, `DEVELOPER`, `ADMIN` |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Account creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last profile update |

### 2.2 `projects`
| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PRIMARY KEY | Unique project ID |
| `user_id` | UUID | FOREIGN KEY -> users(id) | Project owner |
| `name` | VARCHAR(100) | NOT NULL | Project title |
| `description` | TEXT | NULLABLE | Description |
| `tech_stack` | JSONB | NOT NULL | List of technologies (e.g. `["React", "Spring Boot", "PostgreSQL"]`) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Creation date |

### 2.3 `bug_reports`
| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PRIMARY KEY | Bug report ID |
| `user_id` | UUID | FOREIGN KEY -> users(id) | Submitter ID |
| `project_id` | UUID | FOREIGN KEY -> projects(id) | Associated project (optional) |
| `title` | VARCHAR(255) | NOT NULL | Bug summary |
| `category` | VARCHAR(50) | NOT NULL | `PROGRAMMING`, `API`, `LOG`, `DEPENDENCY`, `DATABASE`, `DOCKER` |
| `language` | VARCHAR(30) | NOT NULL | `JAVA`, `PYTHON`, `JAVASCRIPT`, `TYPESCRIPT`, `CPP`, `SQL` |
| `code_snippet` | TEXT | NULLABLE | Submitted source code |
| `error_log` | TEXT | NULLABLE | Submitted stack trace / error message |
| `status` | VARCHAR(30) | NOT NULL | `PENDING`, `ANALYZING`, `RESOLVED`, `FAILED` |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Submission timestamp |

### 2.4 `analyses`
| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PRIMARY KEY | Analysis result ID |
| `bug_report_id` | UUID | FOREIGN KEY -> bug_reports(id) | Associated bug report |
| `error_type` | VARCHAR(100) | NOT NULL | Detected exception / error type |
| `severity` | VARCHAR(20) | NOT NULL | `LOW`, `MEDIUM`, `HIGH`, `CRITICAL` |
| `root_cause` | TEXT | NOT NULL | FixMind root-cause explanation |
| `evidence` | JSONB | NOT NULL | Evidence array (line numbers, variables, trace) |
| `confidence` | FLOAT | NOT NULL | Confidence score (0.0 - 1.0) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Analysis timestamp |

### 2.5 `fixes`
| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PRIMARY KEY | Fix ID |
| `analysis_id` | UUID | FOREIGN KEY -> analyses(id) | Associated analysis |
| `suggested_code` | TEXT | NOT NULL | Corrected source code / config snippet |
| `explanation` | TEXT | NOT NULL | Human-readable explanation of fix |
| `is_verified` | BOOLEAN | DEFAULT FALSE | Whether verification check passed |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Generation timestamp |

### 2.6 `verifications`
| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PRIMARY KEY | Verification log ID |
| `fix_id` | UUID | FOREIGN KEY -> fixes(id) | Associated fix |
| `compilation_passed` | BOOLEAN | NOT NULL | AST/Compilation status |
| `tests_passed` | BOOLEAN | NOT NULL | Unit test execution status |
| `execution_output` | TEXT | NULLABLE | Terminal stdout/stderr from sandbox |
| `verified_at` | TIMESTAMP | DEFAULT NOW() | Verification timestamp |

### 2.7 `knowledge_vectors` (pgvector Extension)
| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | UUID | PRIMARY KEY | Knowledge chunk ID |
| `title` | VARCHAR(255) | NOT NULL | Source topic or error title |
| `content` | TEXT | NOT NULL | Text chunk content |
| `category` | VARCHAR(50) | NOT NULL | Tech stack / documentation area |
| `embedding` | VECTOR(384) | NOT NULL | Sentence-transformer embedding vector |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Vector indexing date |
