# Registration (self-registration)

Status: 🟢 Implemented — off by default; e-mail verification only (no captcha)

Owner: _(assign)_

Code: `packages/core/server/src/domain/Registration/`, `packages/core/server/src/client/Registration/`,
`packages/core/flutter/lib/src/modules/login/registration/`

## Purpose

Lets people create their own account from the login page. The account is a
plain `USER` with **no tenant**; it stays inactive until the user proves they
own the e-mail address with a 6-digit code. An administrator can later assign a
tenant, user groups or another role in the user administration.

Whether signup is offered at all is a global system setting
(`allowSelfRegistration`, **off by default**).

## Available for Roles

- **Anonymous** — all four endpoints are public (no JWT). They are listed in
  `JwtAuthenticationMiddleware.excludedEndpoints` and
  `packages/core/flutter/lib/src/network/public_routes.dart`; keep both in sync.
- **ADMIN** — switches self-registration on/off in System settings → Global
  ("Allow self-registration"), which needs the system-settings permissions.

## Data Shape (current)

```
GET  /registration/status       → { enabled: boolean }
POST /registration              { firstName, lastName, email, userName, password } → 201 { email }
POST /registration/verify       { email, code } → 200
POST /registration/resend-code  { email } → 200

registration_verification (
  id, auth_user_id → auth_user, code_hash (bcrypt), expires_at,
  used tinyint, failed_attempts tinyint, created_at
)
```

## Expected Behavior

### Create (`POST /registration`)

- Rejected with `RegistrationDisabledException` (HTTP 403) when the setting is
  off — and *only* that error, so a closed instance can't be probed for
  existing e-mails/usernames.
- Otherwise validates all fields at once: first/last name required, valid
  e-mail not already used by any account, username 3–50 of
  `[A-Za-z0-9._-]` and not taken, password against the password policy
  (System settings → Password).
- Creates `auth_user` + `user` (role `USER`, `tenant_id` NULL,
  `is_active` 0) and default preferences in one transaction, stores a hashed
  code valid for 30 minutes, then e-mails the code.

### Verify (`POST /registration/verify`)

- Off → `RegistrationDisabledException`, and the code is not checked (so it
  doesn't count as an attempt).
- Matches the latest unused, unexpired code of a *pending* account with that
  e-mail; wrong codes increment `failed_attempts`, and after 5 the code is
  retired (ask for a new one).
- Success activates the user and retires all its codes; the user can log in.

### Resend (`POST /registration/resend-code`)

- Off → `RegistrationDisabledException`.
- Otherwise always 200. If a pending account exists and no code was issued in
  the last 60 s, retires the old code and e-mails a new one.

### Read (`GET /registration/status`)

- `{enabled}` from the global settings; unreadable settings count as off.
  The login page shows "Create account" only when `enabled` is true.

## Business Rules

- Self-registered accounts are `USER`s without a tenant (decided 2026-10-05).
- E-mail ownership is proven with an e-mailed 6-digit code before the account
  can log in (decided 2026-10-05).
- Self-registration is opt-in per installation via the global setting
  (decided 2026-10-05).
- A *pending* account = inactive **and** has at least one verification code.
  Accounts an admin deactivated never have codes, so this flow can't reactivate
  them.

## Edge Cases

- **Resolved (2026-10-05):** e-mail sending fails → the account still exists
  and the request succeeds; the failure is logged server-side and the user can
  use "Send a new code".
- **Resolved (2026-10-05):** signup with an e-mail/username that is taken →
  field error (`EmailAlreadyInUseException` / `AuthUsernameAlreadyInUseException`).
  This does reveal that an e-mail is registered — accepted trade-off for clear
  feedback while signup is on.
- **Still open:** a pending account that is never verified keeps its e-mail and
  username reserved; there is no cleanup job yet.
- **Still open:** no captcha or per-IP limit beyond the global
  `publicLimiter` on public endpoints.

## Known Bugs

- None known.

## Traced (2026-10-05)

- Replaces the earlier code-based activation (admin-issued registration
  codes per role, redeemed via `/registration-code/by-role/{code}`); its
  admin page, endpoints, permissions, `registration_code` table and the
  `ROLE_DROPDOWN` form field went with it.

## Open Questions (for follow-up with client)

1. Should unverified accounts be deleted after some time (cron job)?
2. Should admins be notified about new self-registrations?

## Test Cases

☐ Setting off → login page shows no "Create account"; `POST /registration` → 403
☐ Setting on → signup with valid data → 201, e-mail with code arrives, account inactive
☐ Wrong code 5× → code retired; resend → new code works
☐ Correct code → account active, login works with the chosen username
☐ Taken e-mail / username, weak password → corresponding field errors
☐ Resend twice within 60 s → only one new e-mail
