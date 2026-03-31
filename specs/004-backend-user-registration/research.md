# Research: Backend User Registration

**Feature**: `004-backend-user-registration`  
**Date**: 2026-03-31  
**Status**: Complete — all NEEDS CLARIFICATION resolved

---

## Decision 1: Runtime Language

**Decision**: Python 3.12

**Rationale**: User-specified. Python 3.12 is a first-class AWS Lambda runtime with excellent `boto3` (DynamoDB SDK) support, a rich standard library (`uuid`, `re`, `hashlib`, `datetime`), and strong community tooling for serverless development. The `bcrypt` package for Python requires no native binary build step on Lambda (available as a Lambda layer or bundled wheel). AWS SAM natively supports Python Lambda packaging.

**Alternatives considered**:
- Node.js 20.x: Previously considered as default; rejected in favour of Python per user instruction.
- TypeScript/Python with Powertools: Adds observability utilities; deferred to a future iteration to keep this feature minimal.

---

## Decision 2: Password Hashing Algorithm

**Decision**: `bcrypt` (Python `bcrypt` package), rounds 12

**Rationale**: `bcrypt` is the de-facto standard password hashing library in the Python ecosystem, produces self-describing hash strings (`$2b$...`), and includes constant-time comparison via `bcrypt.checkpw()` which prevents timing attacks. Rounds 12 hashes in ~250ms on Lambda (512 MB), well within the p95 ≤ 500ms budget. The package ships as a pure-Python wheel compatible with the Lambda execution environment — no native build step required.

**Alternatives considered**:
- `argon2-cffi`: Stronger algorithm; requires a C extension which needs compilation for the Lambda runtime architecture (`linux/x86_64` or `arm64`), adding deployment complexity. Not justified for current scope.
- `hashlib.scrypt` (stdlib): Available without dependencies, but lacks the self-describing hash format and the established ecosystem adoption of `bcrypt` for this use case.
- Plain SHA-256 / MD5: Cryptographically unacceptable — not a password hashing function.

---

## Decision 3: Duplicate Email Detection Strategy

**Decision**: DynamoDB conditional `PutItem` with `attribute_not_exists(email)`

**Rationale**: A conditional write atomically checks for existence and writes in a single DynamoDB operation, eliminating the TOCTOU (time-of-check/time-of-use) race condition that a read-then-write pattern would introduce. Two concurrent registrations with the same email will result in exactly one success and one `ConditionalCheckFailedException`, satisfying Edge Case 3 in the spec.

**Alternatives considered**:
- `GetItem` then `PutItem` (read-before-write): Simpler code but introduces a race window where two simultaneous registrations can both pass the read check before either writes.
- Global Secondary Index on `email`: Unnecessary when `email` is already the Primary Key.

---

## Decision 4: Unique Identifier Generation

**Decision**: `uuid.uuid4()` (Python standard library)

**Rationale**: Built into Python's standard library, produces a Version 4 UUID, requires no external dependency, and is cryptographically secure. No additional package needed.

**Alternatives considered**:
- `ulid` package: Sortable by time; adds a dependency with no benefit for this access pattern (PK is email, not ID).
- DynamoDB auto-increment: Not a native DynamoDB feature; requires a counter table, adding complexity.

---

## Decision 5: Timestamp Format

**Decision**: ISO 8601 UTC string (e.g., `2026-03-31T12:00:00.000Z`)

**Rationale**: Universally parseable by all major languages and SDKs. Stored as a DynamoDB String attribute. Generated via `datetime.utcnow().isoformat() + 'Z'` in Python. Sortable as a string.

**Alternatives considered**:
- Unix epoch integer: Compact but less human-readable; no significant advantage for this use case.
- DynamoDB TTL number: Only relevant for expiry; not applicable here.

---

## Decision 6: Infrastructure Definition Tool

**Decision**: AWS SAM (`template.yaml` in `backend/`)

**Rationale**: SAM co-locates Lambda source code and infrastructure definition in one directory, keeps deployment straightforward (`sam deploy`), and supports local invocation (`sam local invoke`) for manual verification. SAM is the AWS-native IaC option with minimal configuration overhead for a single-Lambda feature.

**Alternatives considered**:
- Serverless Framework (`serverless.yml`): Comparable capability; an additional third-party dependency over AWS's own tooling without clear advantage.
- Raw CloudFormation: Verbose; SAM is a superset that reduces boilerplate significantly.
- Terraform: Appropriate for multi-service infrastructure; overkill for one Lambda + one table + one API route.

---

## Decision 7: Email Normalisation

**Decision**: Trim whitespace and lowercase the email before validation and storage

**Rationale**: Satisfies the edge case defined in the spec: "If the email contains leading or trailing whitespace, the system normalises it before validation and storage." Case-insensitive uniqueness (per Assumptions) is enforced by always storing a lowercased email, eliminating the need for a case-insensitive DynamoDB query.

**Alternatives considered**:
- Case-insensitive DynamoDB query: Not natively supported on String PK equality lookups without storing a normalised copy anyway.
- Reject emails with whitespace as invalid: More strict but creates confusion for users who copy-paste addresses with trailing spaces.

---

## Decision 8: Environment Configuration

**Decision**: Lambda environment variables for all deployment-specific values (`USERS_TABLE_NAME`, `AWS_REGION`); no hardcoded resource names

**Rationale**: SAM injects environment variables from `template.yaml` at deploy time, keeping source code portable across environments (dev, staging, prod) without code changes.

**Alternatives considered**:
- AWS SSM Parameter Store: Suitable for secrets; adds latency per cold start for non-secret config. Unnecessary for table name and region.
- Hardcoded values: Violates the spec's requirement for environment variable configuration.
