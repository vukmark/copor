# Users & Roles

## Purpose

Defines who exists in the system as a login-capable actor, and how a role
relates to what that actor can actually do. This is the entry point for
[permissions.md](./workflow/permissions.md) — read that doc for how
capabilities are actually decided per user.

## Roles

Every user has **exactly one role** (`user.roleId` → `role`). Roles are rows
in the `role` table, created and edited at **Administration → Roles**, so an
installation can have as many as it needs. Each role carries a `type` from
`RoleType` (`packages/core/server/src/domain/Core/enum/RoleType.ts`):

| Role type | Notes |
|---|---|
| `USER` | Regular account. Self-registered accounts always get the `USER` role (see [Registration.md](./modules/Registration.md)). |
| `ADMIN` | Administrator account. |

The baseline seed (`20260910_196_seed_baseline_user_admin_roles.ts`)
creates one role of each type, `User` and `Admin`, and **no permission
rows** — every permission resolves to `DENY` until it is granted.

Roles are **flat** — one role does not inherit from another. If two roles
should share a capability, it has to be granted to both explicitly (see
[permissions.md § Roles](./workflow/permissions.md#roles)).

## Important: capabilities are not fixed in code

**What a role can do is admin-configurable data**, not something hardcoded
per role. It lives in the `rolePermission` table and is edited at
**Administration → Permissions → Role Permission** (one `PermissionType` ×
one `Effect` × optional `Scope` per row).

**Consequence for this doc set:** do not hand-maintain a "role X can/cannot"
list here — it will silently go stale the moment an admin changes a
permission in the UI. Instead:

- Structural facts (which role types exist, what a role fundamentally
  represents) belong here.
- Per-capability rules belong in [permissions.md](./workflow/permissions.md)
  as *mechanism*, and in [decisions.md](./decisions.md) as *specific business
  decisions* (a decision, not a fact derivable from code).
- Per-module "who can do what" sections (see
  [modules/_TEMPLATE.md](./modules/_TEMPLATE.md)) should describe
  **intended/expected** access, and explicitly flag anywhere the code
  enforces access by checking `role.type` instead of a `PermissionType`.

## Known deviations from "role = flat permission set"

A few places branch on `role.type` directly instead of going through
`PermissionType`:

- **News visibility** (`KyselyGetContentItemListInteractorRepo`) — `ADMIN`
  roles see all news; other roles only see items mapped to their role.
- **User Group membership form** (`KyselyGetUserGroupUserListInteractorRepo`)
  — inactive users are hidden, but `ADMIN` users stay listed so saving the
  form doesn't silently drop them.
- **Self-registration** — new accounts get the `USER` role and no tenant.

**User Groups** (`packages/core/server/src/domain/UserGroup`) add a second, hierarchical
permission layer independent of role — see
[permissions.md § User Groups](./workflow/permissions.md#user-groups).
