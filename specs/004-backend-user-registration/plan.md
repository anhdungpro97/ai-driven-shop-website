# Implementation Plan: Backend User Registration

**Branch**: `004-backend-user-registration` | **Date**: 2026-03-31 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/004-backend-user-registration/spec.md`

## Summary

Implement a serverless user registration endpoint on AWS. A `POST /register` request accepted by API Gateway is forwarded to a Lambda function that validates input, detects duplicate emails via a conditional DynamoDB write, hashes the password before storage, persists the user record, and returns a JSON response: `{id, email}` on success or `{error_type, message}` on failure. All compute on AWS Lambda (Python 3.12); all persistence on DynamoDB (`Users` table, PK: `email`).

## Technical Context

**Language/Version**: Python 3.12 (LTS; first-class AWS Lambda runtime; strong DynamoDB SDK support via `boto3`)  
**Primary Dependencies**: `boto3` (AWS SDK — DynamoDB), `bcrypt` (password hashing), `python-dotenv` (local env vars); all standard-library modules used for UUID and email validation  
**Storage**: DynamoDB — single `Users` table, PK `email`, no secondary indexes required for this feature  
**Testing**: Out of scope for this feature per user clarification; defined in a dedicated test spec  
**Target Platform**: AWS — Lambda (Python 3.12 runtime), API Gateway (HTTP API), DynamoDB  
**Project Type**: Serverless web service (single endpoint)  
**Performance Goals**: p95 registration response ≤ 500ms (SC-005); warm Lambda + DynamoDB conditional PutItem target ≤ 200ms; bcrypt rounds 12 (~250ms hashing on Lambda)  
**Constraints**: Python Lambda cold start adds 300–600ms on first invocation; DynamoDB conditional write used to prevent TOCTOU race on duplicate-email check; passwords must never appear in logs  
**Scale/Scope**: 1 API Gateway route, 1 Lambda function, 1 DynamoDB table, ~4 source files

## Constitution Check

*GATE: Pre-Phase 0 check — PASS. Post-Phase 1 re-check — PASS (see below).*

| Gate | Status | Notes |
|---|---|---|
| **Quality Gate** | PASS | `flake8` + `pylint` linting enforced; code review required before merge; no known critical defects; explicit error handling in handler and service layer; 4 focused source files each with a single responsibility |
| **UX Gate** | PASS (API) | No UI surface; API contract clarity is the "UX" for consumers — every 400 response returns a distinct `error_type` + human-readable `message`; all 5 failure categories defined in `contracts/api-contract.md` |
| **Performance Gate** | PASS | p95 ≤ 500ms (SC-005); warm path analysis: bcrypt rounds 12 (~250ms) + DynamoDB conditional PutItem (~10ms) + Lambda warm overhead (~30ms) ≈ 290ms warm; cold start risk documented; provisioned concurrency available if needed |
| **Verification Gate** | EXCEPTION | Tests are explicitly out of scope per user clarification; defined in a dedicated test spec. Mitigation: `quickstart.md` steps 7–15 cover all acceptance scenarios with curl commands |
| **Operational Gate** | PASS | Lambda emits structured log on every outcome (success / duplicate / validation error / internal error); passwords and hashed values never logged; DynamoDB conditional write is atomic — no partial writes, no rollback needed |

**Verification Gate Exception**:
- Owner: user (explicit instruction 2026-03-31)
- Expiry: when dedicated test spec (`005-*` or as named by user) is delivered
- Mitigation: `quickstart.md` provides manual curl-based verification steps for all acceptance scenarios (steps 7–15)

**Post-Phase 1 Re-check (2026-03-31)**:
- All gates remain PASS after design artifacts generated
- No new violations introduced by `data-model.md`, `contracts/api-contract.md`, or `quickstart.md`
- Conditional PutItem strategy (Decision 3 in research.md) resolves the concurrent-duplicate edge case without additional gate exceptions

## Project Structure

### Documentation (this feature)

```text
specs/004-backend-user-registration/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── api-contract.md  # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks — not created by /speckit.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── handler.py                       # Lambda entry point — parses event, calls service, formats response
│   ├── service/
│   │   └── registration_service.py      # Business logic — validate, check duplicate, hash, persist
│   ├── repository/
│   │   └── user_repository.py           # DynamoDB access — conditional PutItem, GetItem
│   └── validation/
│       └── registration_validation.py   # Input validation — email format, password length, required fields
├── requirements.txt
└── template.yaml                        # AWS SAM template — API Gateway + Lambda + DynamoDB table
```

**Structure Decision**: Single `backend/` project using AWS SAM (`template.yaml`) for infrastructure definition. No separate `infra/` directory since SAM co-locates Lambda code and infrastructure. Four source files map directly to the four responsibility layers: entry, business logic, data access, input validation.
