# Permissions Guide

## Overview

Permissions control **what a user can see and do** in the application — which sections of the menu appear, and which actions (create, view, edit, delete, etc.) are available inside them.

Permissions are configured by administrators from **Administration → Permissions**, and are built from three ideas working together:

1. **Roles** — a baseline set of permissions every user gets from their job function (e.g. a regular user role and an administrator role).
2. **User Groups** — an optional, hierarchical way to grant or restrict permissions for specific sets of users, on top of their role.
3. **Features & individual permissions** — the actual things being allowed or denied (e.g. "Create News", "Create To Do", "Access Administration – Users").

This guide explains how these pieces fit together, and — most importantly — how the system decides what a given user is actually allowed to do when a role and a user group disagree.

---

## The building blocks

### Roles

Every user has exactly **one role**. Roles are created at **Administration → Roles**, each with a type of `USER` or `ADMIN` (see [users.md](../users.md)). The role defines the user's **default permission set** — what they can do out of the box, before any group-level customization.

Roles are managed at **Administration → Permissions → Role Permission**:

- Pick a role from the dropdown.
- You'll see a table of **Features** (News, To Do, Administration – Users, etc.), each of which can be expanded to show its individual permissions.
- Each permission has an **Effect**: `Allow` or `Deny`.
- Some permissions also have a **Scope**, which only appears/applies when the Effect is `Allow` (see [Scopes](#scopes) below).
- Save to apply the change — it immediately affects **every user with that role**.

Roles are flat: one role does not inherit from another role. If two roles should share a permission, it has to be set on both.

### User Groups

User Groups are an **optional, organization-defined structure** you build yourself (e.g. by tenant, by department, by team) — found at **Administration → User Groups**. Unlike roles, groups can be nested: a group can have a parent group, which can have its own parent, and so on, forming a tree.

A user can belong to one or more groups. Group membership is independent of role — users with different roles can be in the same group.

Group *permissions* (as opposed to group *membership/structure*) are managed separately, at **Administration → Permissions → User Group Permission**:

- You first see the group tree (indented to show parent/child relationships).
- Selecting a group opens the same kind of Feature/permission table used for roles.
- Each permission's Effect can be set to `Allow`, `Deny`, **or `Inherit`**.

`Inherit` is the key difference from role permissions, and is explained next.

---

## Inheritance

Inheritance only applies to **User Groups** — roles do not have parents and therefore have nothing to inherit from (which is why the Role Permission screen only offers `Allow`/`Deny`).

When a new group is created, **every permission on it starts as `Inherit`**. This means: *"don't decide this permission at my level — ask my parent group instead."*

Resolution works like this, starting at the user's group and walking upward:

1. Look at the permission on the user's own group.
   - If it's explicitly set to `Allow` or `Deny`, that's the answer — stop here.
   - If it's `Inherit`, move up to the parent group and repeat.
2. Keep walking up the tree until you find a group that has explicitly set the permission (`Allow`/`Deny`), or you run out of ancestors.
3. If no group in the chain ever set the permission explicitly, the group layer has no opinion, and the role's setting is used instead (see [Precedence](#precedence-what-wins) below).

**Example:**

```
Company (root group)             → "Create News" = Allow
 └── Sales                        → "Create News" = Inherit
      └── Regional Team           → "Create News" = Inherit
```

A user in **Regional Team** is checked first at Regional Team (Inherit → keep going), then Sales (Inherit → keep going), then Company (Allow → done). The user can create news.

**Since 2026-08-04**, the User Group Permission screen shows what an `Inherit` row actually resolves to, right under the dropdown, so you don't have to manually walk the tree yourself:
- `→ Allow` / `→ Deny` — the nearest ancestor with an explicit setting.
- `→ Role default` — no group in this chain (including the group itself) ever set it explicitly; the outcome depends on the affected user's Role instead (see [Precedence](#precedence-what-wins)). This screen can't show a single resolved value here, since a group's members can span multiple different roles.

If an admin later sets **Sales → "Create News" = Deny**, every group under Sales (including Regional Team) is now denied, *unless* one of those subgroups explicitly overrides it back to `Allow`. This is how you can grant something broadly at the top of a tree and carve out exceptions lower down, or the reverse — restrict broadly and re-enable for a specific subgroup.

If a user belongs to **more than one group** at once and those groups disagree after resolving inheritance, `Deny` wins over `Allow` — i.e. if any of the user's groups (after walking its own chain) denies the permission, the user does not have it, even if another of their groups grants it. (Decided 2026-08-04, see [decisions.md](../decisions.md) — every permission defaults to Deny, so the more conservative outcome wins on conflict. This corrects an earlier version of this doc that said the opposite.)

---

## Precedence: what wins

A user's actual, "effective" permissions are the combination of their role and their group memberships. The system checks these layers **in order** and uses the first one that gives a definite answer (`Allow` or `Deny`):

1. **User Group permissions** — resolved through inheritance as described above.
2. **Role permissions** — used only if no group the user belongs to ever produced an explicit `Allow`/`Deny` for that permission.
3. **Denied by default** — if neither the group layer nor the role has ever addressed a permission, the user does not have it.

In short: **a User Group setting overrides the Role setting**, whenever the group (or one of its ancestors) has bothered to set it explicitly. If a group leaves everything on `Inherit` all the way up its chain, the role's setting is what applies. This lets you use roles for broad, job-based defaults, and user groups for exceptions or refinements — e.g. give all regular users the same baseline via their role, then use a "Contractors" group to deny a permission that other users have, without touching the role itself.

---

## Scopes

Some permissions aren't simply on/off — they also need to know **how much** the user can act on. These permissions show a **Scope** selector alongside the Effect, and it's only relevant when the Effect is `Allow` (denying a permission makes the scope irrelevant).

The scopes (`PermissionScope`, `packages/core/server/src/domain/Core/enum/PermissionScope.ts`), from narrowest to broadest, are: `Own` (only the user's own records), `Tenant` (records within the user's tenant), and `All` (every record in the system). Only permissions marked `requiresScope` in their definitions (`CorePermissionDefinitions.ts` or a module's `<Feature>PermissionDefinitions.ts`) use a scope.

If a permission's scope is set at multiple layers (for example, two groups a user belongs to both grant the same permission with different scopes), the **broadest scope wins**.

---

## Putting it together: a worked example

Say an installation wants:

- All **regular users** to be able to view only their own account information (a role-level default).
- **Support staff** — a subset of regular users, placed in a "Support" user group — to be able to view the account information of everyone in their tenant.

Setup:

1. On the regular user role, set "View user account information" → `Allow`, scope `Own`.
2. Create a **Support** user group (or a subgroup of an existing group tree).
3. On that group's permissions, set "View user account information" → `Allow`, scope `Tenant`.
4. Add the relevant users as members of the Support group.

Result: users not in the group keep the role's narrower `Own` scope. Users in Support get the group's broader scope instead, because the group's explicit setting takes precedence over the role.

---

## Quick reference

| | Roles | User Groups |
|---|---|---|
| Structure | Flat, no hierarchy | Tree — groups can have parent groups |
| Who has one | Every user has exactly one | Optional; a user can belong to several |
| Effect options | Allow / Deny | Allow / Deny / **Inherit** |
| Managed at | Administration → Permissions → Role Permission | Administration → Permissions → User Group Permission (structure itself is managed at Administration → User Groups) |
| Precedence | Fallback — used only when no group gives an explicit answer | Takes priority over the role when set explicitly |
