# API Contract: Backend User Registration

**Feature**: `004-backend-user-registration`  
**Date**: 2026-03-31  
**Endpoint**: `POST /register`  
**Transport**: HTTPS (API Gateway HTTP API)  
**Wire Format**: JSON (`Content-Type: application/json`)

---

## Endpoint

```
POST /register
```

---

## Request

### Headers

| Header | Value | Required |
|---|---|---|
| `Content-Type` | `application/json` | Yes |

### Body

```json
{
  "email": "string (required)",
  "password": "string (required, min 8 chars)",
  "full_name": "string (optional)"
}
```

#### Field Rules

| Field | Type | Required | Constraints |
|---|---|---|---|
| `email` | string | Yes | Valid email format; leading/trailing whitespace trimmed and lowercased before validation |
| `password` | string | Yes | Minimum 8 characters; never logged or returned |
| `full_name` | string | No | No format constraint; whitespace-only treated as absent |

---

## Responses

### Success — HTTP 200 OK

Returned when a new user record is successfully created.

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com"
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | string (UUID v4) | System-generated unique identifier for the new user |
| `email` | string | Normalised email address that was registered |

> `full_name` and `created_at` are stored but never returned in this response.

---

### Failure — HTTP 400 Bad Request

Returned for all rejection cases. The `error_type` field distinguishes the specific failure.

```json
{
  "error_type": "string (enum)",
  "message": "string"
}
```

| Field | Type | Notes |
|---|---|---|
| `error_type` | string (enum) | Machine-readable failure category (see table below) |
| `message` | string | Human-readable description; safe for API consumers |

#### Error Type Enum

| `error_type` value | Trigger condition |
|---|---|
| `missing_field` | `email` or `password` is absent or null in the request body |
| `validation_error` | `email` fails format check, or `password` is shorter than 8 characters |
| `malformed_request` | Request body is missing, not valid JSON, or `Content-Type` is not `application/json` |
| `duplicate_email` | The submitted email already exists in storage |
| `internal_error` | Unhandled server-side exception (DynamoDB unreachable, unexpected error) |

---

## Rejection Guarantees

- A rejected request (any `error_type`) MUST leave no data in DynamoDB — no partial records, no PII trace.
- The `hashed_password` field MUST never appear in any response body on success or failure.
- The original plain-text `password` MUST never appear in any log output.

---

## Example Interactions

### Valid registration (with full_name)

**Request**
```json
POST /register
{
  "email": "  Alice@Example.com  ",
  "password": "securepass123",
  "full_name": "Alice Smith"
}
```

**Response (200)**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "alice@example.com"
}
```

---

### Valid registration (without full_name)

**Request**
```json
POST /register
{
  "email": "bob@example.com",
  "password": "password99"
}
```

**Response (200)**
```json
{
  "id": "7f3c9e2a-1b4d-4f6e-8a2c-3d5e7f9b1c4a",
  "email": "bob@example.com"
}
```

---

### Duplicate email

**Request**
```json
POST /register
{
  "email": "alice@example.com",
  "password": "anotherpassword"
}
```

**Response (400)**
```json
{
  "error_type": "duplicate_email",
  "message": "An account with this email address already exists."
}
```

---

### Password too short

**Request**
```json
POST /register
{
  "email": "carol@example.com",
  "password": "short"
}
```

**Response (400)**
```json
{
  "error_type": "validation_error",
  "message": "Password must be at least 8 characters long."
}
```

---

### Missing required field

**Request**
```json
POST /register
{
  "email": "dave@example.com"
}
```

**Response (400)**
```json
{
  "error_type": "missing_field",
  "message": "The 'password' field is required."
}
```

---

### Malformed request body

**Request**
```
POST /register
Content-Type: text/plain

not json at all
```

**Response (400)**
```json
{
  "error_type": "malformed_request",
  "message": "Request body must be valid JSON with Content-Type: application/json."
}
```
