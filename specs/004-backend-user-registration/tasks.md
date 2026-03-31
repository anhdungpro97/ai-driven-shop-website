# Tasks: Backend User Registration

**Input**: Design documents from `/specs/004-backend-user-registration/`
**Prerequisites**: plan.md ✓ · spec.md ✓ · research.md ✓ · data-model.md ✓ · contracts/api-contract.md ✓ · quickstart.md ✓

**Tests**: No test tasks generated — tests are explicitly out of scope per user clarification (dedicated test spec to follow).

**Stack**: Python 3.12 · AWS Lambda · API Gateway (HTTP API) · DynamoDB · AWS SAM

---

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Parallelizable (different files, no incomplete dependencies)
- **[Story]**: User story label (US1, US2, US3) — Setup and Foundational phases have no story label
- No test tasks included (out of scope for this feature)

---

## Phase 1: Setup

**Purpose**: Project initialization — creates the `backend/` directory structure and installs dependencies.

- [X] T001 Create `backend/` project structure: `src/`, `src/service/`, `src/repository/`, `src/validation/`, `events/` directories
- [X] T002 Create `backend/requirements.txt` with `boto3`, `bcrypt`, and `python-dotenv` dependencies
- [X] T003 [P] Create `backend/template.yaml` (AWS SAM) — declare `RegisterFunction` (Python 3.12), `POST /register` API Gateway route, `Users` DynamoDB table (PK: `email`, PAY_PER_REQUEST), and `USERS_TABLE_NAME` environment variable
- [X] T004 [P] Configure `flake8` linting: create `backend/.flake8` with `max-line-length = 120` and `exclude = .aws-sam`

**Checkpoint**: `backend/` structure ready, `sam build` can resolve dependencies, linting is runnable.

---

## Phase 2: Foundational

**Purpose**: Shared infrastructure that ALL user stories depend on — must be complete before any story work begins.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T005 Create `backend/src/validation/registration_validation.py` — implement `validate_request(body: dict) -> tuple[bool, str, str]` that checks for missing fields (`missing_field`), email format (`validation_error`), and password minimum length of 8 characters (`validation_error`); also trims and lowercases email
- [ ] T006 [P] Create `backend/src/repository/user_repository.py` — implement `put_user(item: dict) -> None` using DynamoDB conditional `PutItem` with `attribute_not_exists(email)`; raise `ConditionalCheckFailedException` on duplicate; read table name from `USERS_TABLE_NAME` env var
- [ ] T007 [P] Create `backend/src/service/registration_service.py` — implement `register_user(email: str, password: str, full_name: str) -> dict` that calls validation, hashes password with `bcrypt` (rounds=12), generates `uuid.uuid4()` as `user_id`, sets `created_at` via `datetime.utcnow().isoformat() + 'Z'`, calls repository, and returns `{id, email}`
- [ ] T008 Create `backend/src/handler.py` — implement `lambda_handler(event, context)` that parses JSON body (catches malformed JSON → `malformed_request`), calls service, and formats HTTP responses: `200` on success, `400` on all errors; passwords and hashed values MUST NOT appear in any log output

**Checkpoint**: All four modules exist and are importable. `sam local invoke` can be run against a test event.

---

## Phase 3: User Story 1 — Register a New User with Valid Data (Priority: P1) 🎯 MVP

**Goal**: A valid `POST /register` request with unique email and sufficient password creates a user record and returns `{id, email}`.

**Independent Verification** *(quickstart.md steps 7–8)*: Send a valid request with and without `full_name`; confirm HTTP 200 and `{id, email}` response; confirm DynamoDB record via `aws dynamodb get-item`.

- [ ] T009 [US1] Wire `registration_service.register_user` into `handler.lambda_handler` — success path: call service, return `{"statusCode": 200, "body": json.dumps({"id": ..., "email": ...})}` in `backend/src/handler.py`
- [ ] T010 [P] [US1] Implement email normalisation in `backend/src/validation/registration_validation.py` — `email.strip().lower()` applied before format check and returned as normalised value
- [ ] T011 [P] [US1] Implement `full_name` normalisation in `backend/src/validation/registration_validation.py` — whitespace-only `full_name` stored as empty string `""`
- [ ] T012 [US1] Implement password hashing in `backend/src/service/registration_service.py` — `bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12)).decode()` stored as `hashed_password`; plain-text password discarded after hashing, never stored or logged
- [ ] T013 [US1] Implement DynamoDB conditional `PutItem` in `backend/src/repository/user_repository.py` — item: `{email, user_id, hashed_password, full_name, created_at}`; condition: `attribute_not_exists(email)`
- [ ] T014 [US1] Create sample event file `backend/events/register-valid.json` with valid email, password ≥ 8 chars, and full_name for local SAM invocation
- [ ] T015 [US1] Verify US1 manually via `sam local invoke RegisterFunction --event events/register-valid.json` and confirm HTTP 200 + `{id, email}` body (quickstart.md step 7)

**Checkpoint**: US1 fully functional. `{id, email}` returned on success. Password stored as bcrypt hash. US1 independently deliverable.

---

## Phase 4: User Story 2 — Reject Registration with Invalid or Duplicate Data (Priority: P1)

**Goal**: Every invalid or duplicate registration attempt returns HTTP 400 with a distinct `error_type`; no record is created.

**Independent Verification** *(quickstart.md steps 9–12)*: Send requests with duplicate email, bad email format, short password, missing field; confirm all return HTTP 400 with correct `error_type`; confirm no new DynamoDB record created.

- [ ] T016 [US2] Implement missing-field detection in `backend/src/validation/registration_validation.py` — return `("missing_field", "The '{field}' field is required.")` when `email` or `password` is absent or null
- [ ] T017 [US2] Implement email format validation in `backend/src/validation/registration_validation.py` — use `re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', email)` after normalisation; return `("validation_error", "Invalid email format.")`
- [ ] T018 [US2] Implement password length validation in `backend/src/validation/registration_validation.py` — return `("validation_error", "Password must be at least 8 characters long.")` when `len(password) < 8`
- [ ] T019 [US2] Implement malformed request handling in `backend/src/handler.py` — catch `json.JSONDecodeError` and missing `Content-Type: application/json`; return `{"statusCode": 400, "body": json.dumps({"error_type": "malformed_request", "message": "..."})}`
- [ ] T020 [US2] Implement duplicate email handling in `backend/src/handler.py` / `backend/src/service/registration_service.py` — catch `ConditionalCheckFailedException` from repository; return `{"statusCode": 400, "body": json.dumps({"error_type": "duplicate_email", "message": "An account with this email address already exists."})}`
- [ ] T021 [US2] Implement internal error handling in `backend/src/handler.py` — catch all unhandled exceptions; return `{"statusCode": 400, "body": json.dumps({"error_type": "internal_error", "message": "An unexpected error occurred."})}` — exception detail MUST be logged but NOT returned in response body
- [ ] T022 [US2] Create sample event files for each rejection scenario in `backend/events/`: `register-duplicate.json`, `register-bad-email.json`, `register-short-password.json`, `register-missing-field.json`, `register-malformed.json`
- [ ] T023 [US2] Verify US2 manually via `sam local invoke` for each rejection event (quickstart.md steps 9–12); confirm HTTP 400 + correct `error_type` per scenario

**Checkpoint**: US2 fully functional. All 5 error types returned correctly. No partial records written on any rejection.

---

## Phase 5: User Story 3 — Data Durability and Retrieval (Priority: P2)

**Goal**: A user record persisted by US1 can be retrieved from DynamoDB with all expected attributes; `hashed_password` is not the plain-text password.

**Independent Verification** *(quickstart.md steps 14–15)*: After US1 registration, run `aws dynamodb get-item` for the registered email; confirm `user_id`, `email`, `full_name`, `created_at` present; confirm `hashed_password` starts with `$2b$`.

- [ ] T024 [P] [US3] Implement `get_user_by_email(email: str) -> dict | None` in `backend/src/repository/user_repository.py` — DynamoDB `GetItem` by `email` PK; returns item dict or `None` if not found (supports US3 verification and future login feature)
- [ ] T025 [US3] Verify US3 manually: register a user (US1 verified), run `aws dynamodb get-item --table-name Users --key '{"email":{"S":"alice@example.com"}}'`; confirm all 5 attributes present; confirm `hashed_password` starts with `$2b$` (quickstart.md steps 14–15)

**Checkpoint**: US3 independently verifiable. Data durability confirmed. `get_user_by_email` available for future login feature.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Operational readiness, structured logging, and SAM deployment validation.

- [ ] T026 [P] Add structured logging to `backend/src/handler.py` — `print()` JSON log on every outcome: `{"event": "registration_success", "email": "..."}`, `{"event": "registration_rejected", "error_type": "..."}`, `{"event": "registration_error", "error": "..."}` — passwords and `hashed_password` MUST NOT appear in any log entry
- [ ] T027 [P] Validate `backend/template.yaml` SAM template — confirm `Runtime: python3.12`, correct `Handler`, `CodeUri: src/`, DynamoDB table resource with `BillingMode: PAY_PER_REQUEST`, and `Outputs` section with API URL
- [ ] T028 Run `flake8 backend/src/` and resolve all linting violations
- [ ] T029 Run `sam build` from `backend/` and confirm zero errors; run `sam deploy --guided` to AWS and confirm stack deploys successfully
- [ ] T030 Run complete quickstart.md acceptance checklist (steps 7–15) against the deployed AWS endpoint; mark all 9 items checked

---

## Dependencies

```
Phase 1 (Setup)
  └─► Phase 2 (Foundational)
        ├─► Phase 3 (US1 — P1) ──► Phase 5 (US3 — P2)
        └─► Phase 4 (US2 — P1) ──► Phase 5 (US3 — P2)
              └─► Phase 6 (Polish)
```

**User Story completion order**:
1. US1 (P1) — core success path; MVP slice
2. US2 (P1) — rejection path; ships with US1 (endpoint is not shippable without it)
3. US3 (P2) — data durability verification; independent of US2; enables future login feature

**Phase 3 and Phase 4 are both P1 and should be delivered together as the MVP.**

---

## Parallel Execution Examples

### Phase 2 (after T005 is complete)
```
T006 (user_repository.py) ─┐
T007 (registration_service.py) ─┤  ► T008 (handler.py — wires all together)
```

### Phase 3 (after Phase 2)
```
T010 (email normalisation) ─┐
T011 (full_name normalisation) ─┤  ► T009 (handler success wire-up)
T012 (password hashing) ────┘
T013 (DynamoDB PutItem) ────┘
```

### Phase 4 (after Phase 2, parallel with Phase 3)
```
T016 (missing field) ────┐
T017 (email format) ─────┤
T018 (password length) ──┤  ► T020 (duplicate) ► T021 (internal error handler)
T019 (malformed body) ───┘
```

### Phase 6 (after Phases 3–5)
```
T026 (structured logging) ─┐
T027 (SAM template validate) ─┤  ► T028 (lint) ► T029 (build + deploy) ► T030 (acceptance checklist)
```

---

## Implementation Strategy

**MVP Scope**: Phase 1 + Phase 2 + Phase 3 + Phase 4 (US1 + US2 together = shippable registration endpoint)

- Phase 3 and Phase 4 are P1 and co-dependent — neither is shippable alone
- Phase 5 (US3) adds retrieval capability needed by future login/verification features; can follow MVP
- Phase 6 finalizes operational readiness before production deploy

**Suggested delivery increments**:
1. Increment 1 (MVP): T001–T023 — full registration endpoint with all 5 error types
2. Increment 2: T024–T025 — data retrieval method for US3
3. Increment 3: T026–T030 — polish, logging, deploy, acceptance sign-off
