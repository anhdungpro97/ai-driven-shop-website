# Quickstart: Backend User Registration

**Feature**: `004-backend-user-registration`  
**Date**: 2026-03-31  
**Stack**: Python 3.12 · AWS Lambda · API Gateway · DynamoDB

---

## Prerequisites

- Python 3.12 installed
- AWS CLI configured (`aws configure`)
- AWS SAM CLI installed (`sam --version`)
- An AWS account with permissions to create Lambda, API Gateway, and DynamoDB resources

---

## Project Layout

```text
backend/
├── src/
│   ├── handler.py                    # Lambda entry point
│   ├── service/registration_service.py
│   ├── repository/user_repository.py
│   └── validation/registration_validation.py
├── requirements.txt
└── template.yaml                     # SAM template
```

---

## Setup

### 1. Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Review environment configuration

In `template.yaml`, environment variables are set under the Lambda function's `Environment` section:

```yaml
Environment:
  Variables:
    USERS_TABLE_NAME: Users
```

Change `Users` to match your DynamoDB table name if needed.

---

## Local Invocation (SAM) *(optional — skip to Deploy if not needed)*

> **Why local?** Lets you verify the Lambda handler works in seconds without a cloud deploy.
> Skip steps 3–4 entirely and go straight to **Deploy to AWS** if you prefer to test against the live endpoint.

### 3. Start DynamoDB Local (optional, for offline testing)

```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

Then create the table locally:

```bash
aws dynamodb create-table \
  --table-name Users \
  --attribute-definitions AttributeName=email,AttributeType=S \
  --key-schema AttributeName=email,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000
```

### 4. Invoke Lambda locally with SAM

Create a test event file `events/register-valid.json`:

```json
{
  "body": "{\"email\":\"alice@example.com\",\"password\":\"securepass123\",\"full_name\":\"Alice Smith\"}",
  "headers": { "content-type": "application/json" },
  "httpMethod": "POST"
}
```

Invoke:

```bash
sam local invoke RegisterFunction --event events/register-valid.json
```

Expected response:

```json
{
  "statusCode": 200,
  "body": "{\"id\":\"<uuid>\",\"email\":\"alice@example.com\"}"
}
```

---

## Deploy to AWS

### 5. Build and deploy

```bash
sam build
sam deploy --guided
```

Follow the prompts. SAM will create:
- DynamoDB `Users` table
- Lambda function (`RegisterFunction`)
- API Gateway HTTP API with `POST /register` route

### 6. Note the API endpoint

After `sam deploy` completes, the output includes:

```
Outputs:
  RegisterApiUrl: https://<id>.execute-api.<region>.amazonaws.com/register
```

---

## Manual Verification

Use `curl` or any HTTP client. Replace `<API_URL>` with the value from step 6.

### Step 7: Register a valid user (with full_name)

```bash
curl -s -X POST <API_URL> \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"securepass123","full_name":"Alice Smith"}'
```

Expected (HTTP 200):
```json
{"id":"<uuid>","email":"alice@example.com"}
```

### Step 8: Register a valid user (without full_name)

```bash
curl -s -X POST <API_URL> \
  -H "Content-Type: application/json" \
  -d '{"email":"bob@example.com","password":"password99"}'
```

Expected (HTTP 200):
```json
{"id":"<uuid>","email":"bob@example.com"}
```

### Step 9: Attempt duplicate registration

```bash
curl -s -X POST <API_URL> \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"anotherpassword"}'
```

Expected (HTTP 400):
```json
{"error_type":"duplicate_email","message":"An account with this email address already exists."}
```

### Step 10: Invalid email format

```bash
curl -s -X POST <API_URL> \
  -H "Content-Type: application/json" \
  -d '{"email":"not-an-email","password":"securepass123"}'
```

Expected (HTTP 400):
```json
{"error_type":"validation_error","message":"..."}
```

### Step 11: Password too short

```bash
curl -s -X POST <API_URL> \
  -H "Content-Type: application/json" \
  -d '{"email":"carol@example.com","password":"short"}'
```

Expected (HTTP 400):
```json
{"error_type":"validation_error","message":"Password must be at least 8 characters long."}
```

### Step 12: Missing required field

```bash
curl -s -X POST <API_URL> \
  -H "Content-Type: application/json" \
  -d '{"email":"dave@example.com"}'
```

Expected (HTTP 400):
```json
{"error_type":"missing_field","message":"The 'password' field is required."}
```

### Step 13: Email with leading/trailing whitespace (normalisation)

```bash
curl -s -X POST <API_URL> \
  -H "Content-Type: application/json" \
  -d '{"email":"  Eve@Example.com  ","password":"normalised99"}'
```

Expected (HTTP 200):
```json
{"id":"<uuid>","email":"eve@example.com"}
```
Note: stored email is `eve@example.com` (trimmed, lowercased).

### Step 14: Verify persisted record (US3)

Use the AWS CLI to confirm the stored record:

```bash
aws dynamodb get-item \
  --table-name Users \
  --key '{"email":{"S":"alice@example.com"}}'
```

Expected: item contains `user_id`, `email`, `hashed_password` (not plain text), `full_name`, `created_at`.

### Step 15: Confirm password not stored in plain text

In the DynamoDB output from Step 14, verify:
- `hashed_password` starts with `$2b$` (bcrypt prefix) — not the original password string.

---

## Acceptance Checklist

- [ ] Step 7: Valid registration returns `{id, email}` with HTTP 200
- [ ] Step 8: Registration without `full_name` succeeds
- [ ] Step 9: Duplicate email returns `duplicate_email` error with HTTP 400
- [ ] Step 10: Malformed email returns `validation_error` with HTTP 400
- [ ] Step 11: Short password returns `validation_error` with HTTP 400
- [ ] Step 12: Missing field returns `missing_field` error with HTTP 400
- [ ] Step 13: Whitespace email is normalised and stored as lowercase trimmed value
- [ ] Step 14: DynamoDB record contains all expected attributes
- [ ] Step 15: Stored `hashed_password` is not the plain-text password
