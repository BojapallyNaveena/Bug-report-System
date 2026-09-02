# CodeFix REST API Specification

## 1. Authentication Endpoints (`/api/auth`)

### `POST /api/auth/register`
**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "fullName": "Jane Doe",
  "role": "DEVELOPER"
}
```
**Response (201 Created)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": "uuid-v4",
    "email": "user@example.com",
    "fullName": "Jane Doe",
    "role": "DEVELOPER"
  }
}
```

### `POST /api/auth/login`
**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```
**Response (200 OK)**: Token & user object.

### `GET /api/users/me`
Header: `Authorization: Bearer <token>`
Returns current authenticated user context.

---

## 2. Bug Analysis Endpoints (`/api/analyses`)

### `POST /api/analyses/analyze`
**Request Body**:
```json
{
  "title": "NullPointer in StudentController",
  "category": "PROGRAMMING",
  "language": "JAVA",
  "codeSnippet": "public class StudentController { ... }",
  "errorLog": "java.lang.NullPointerException: Cannot invoke getStudentName()",
  "projectId": "optional-uuid"
}
```
**Response (200 OK)**:
```json
{
  "id": "analysis-uuid",
  "bugReportId": "report-uuid",
  "errorType": "NullPointerException",
  "severity": "HIGH",
  "rootCause": "Variable 'studentService' is declared but not initialized/injected at line 14.",
  "evidence": [
    {
      "line": 14,
      "variable": "studentService",
      "issue": "Dereferenced while null"
    }
  ],
  "confidence": 0.95,
  "fix": {
    "id": "fix-uuid",
    "suggestedCode": "@Autowired\nprivate StudentService studentService;",
    "explanation": "Add Spring @Autowired annotation to properly inject the dependency.",
    "isVerified": true
  },
  "verification": {
    "compilationPassed": true,
    "testsPassed": true,
    "executionOutput": "BUILD SUCCESS - 3/3 Tests Passed"
  }
}
```

### `GET /api/analyses`
Returns paginated list of user's past bug analyses with filtering by language, category, and verification status.

---

## 3. GitHub & Project Intelligence Endpoints (`/api/projects`, `/api/github`)

### `GET /api/projects`
Retrieves user projects & health reports.

### `POST /api/github/connect`
Initiates OAuth connection flow with GitHub.

### `POST /api/github/analyze-repo`
Analyzes a connected repository to produce Project Health metrics (Code Quality, Security, Dependencies, Testing, Configuration, Documentation).

---

## 4. Technology Tutor Endpoints (`/api/tutor`)

### `POST /api/tutor/explain-stack`
**Request Body**:
```json
{
  "projectId": "uuid"
}
```
**Response (200 OK)**: Detailed overview of project tech stack, component interactions, basic syntax references, and debugging best practices.
