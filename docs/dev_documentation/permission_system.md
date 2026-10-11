# Permission System — Implementation Reference

For the product/admin-facing explanation (what an admin configures, how
`Inherit` behaves in the UI) see [permissions.md](../workflow/permissions.md).
This doc is the developer-facing counterpart: which files implement
resolution, how the cache works, and — most importantly — **the one rule
that has caused most of the real bugs found in this system so far.**

---

## The one rule

> **Any write that changes what a permission resolves to for a user (or a
> set of users) must invalidate their permission cache.**

Permissions aren't computed live on every request — they're precomputed
into a cache table (`userPermissionCache`) and read from there. If a write
changes a `role_permission`, `user_group_permission`, `user_permission`,
`user_group_user_map`, or a user's `role_id`, and doesn't also invalidate the
cache for every affected user, that user keeps their **old** effective
permissions until something else happens to trigger a rebuild. This has been
the single largest source of confirmed bugs in this system.

How to invalidate, from `KyselyUserPermissionCacheHelper.ts`:

```typescript
// Force a rebuild on next read (cheap, deferred) — use this after any
// write, in the same transaction if possible, once you know which user
// ids are affected.
await KyselyUserPermissionCacheHelper.deleteCacheForUsers(userIds, trx);

// Eagerly recompute right now — rarely needed; deleteCacheForUsers plus
// the lazy rebuild-on-miss (below) is enough for almost every case.
await KyselyUserPermissionCacheHelper.rebuildUser(userId);
```

`deleteCacheForUsers` is the one used by the existing write paths
(`KyselySetPermissionListToRoleInteractorRepo`,
`KyselySetPermissionListToUserGroupInteractorRepo`,
`KyselySetPermissionListToUserInteractorRepo`,
`KyselySetUserGroupUserListInteractorRepo`) — look up
the affected user ids **before** the delete/update happens if you're
deleting the thing the permission was attached to, so you still have the
ids afterward.

**If you're adding a new feature that writes to any of these tables**, add
cache invalidation before shipping — the four repos above are the only write
paths that currently do it.

---

## How a permission actually resolves

Entry point: `KyselyPermissionHelper.getPermission(userId, permissionType)`
(`packages/core/server/src/client/Core/Helpers/KyselyPermissionHelper.ts`) — reads the cache,
and on a cache miss calls `KyselyUserPermissionCacheHelper.rebuildUser`
before reading again. This is why cache invalidation alone (without an
eager rebuild) is sufficient: the next read pays the rebuild cost once,
then the cache is warm again.

The cache itself is built by `KyselyUserPermissionCacheHelper.doRebuildUser`
(`packages/core/server/src/client/Core/Helpers/KyselyUserPermissionCacheHelper.ts`), which pulls
three sources in parallel and combines them:

1. **Direct user permission** (`userPermission` table) — an explicit
   grant/deny on one specific user, no inheritance involved.
2. **User Group permissions** — resolved through the group's ancestor
   chain (see below), then combined across all of the user's groups.
3. **Role permission** (`rolePermission` table) — the final fallback.

**Level order:** first definite result wins, checked in the order above
(user → userGroup → role → default DENY). This is
implemented directly in `buildPermissionCacheRows`
(`KyselyUserPermissionCacheHelper.ts`) — it's the one function that
actually runs; there is a separate, unused `resolveAcrossLevels`/
`calculatePermission` pair in `KyselyPermissionHelper.ts` implementing a
**different** semantic ("DENY at any level always wins") that has zero
callers anywhere in the codebase. Don't call it, don't extend it — it's
dead code with contradictory semantics, not yet deleted.

### User Group inheritance (the `Inherit` walk-up)

Implemented via `userGroupClosure` — a full **closure table** (every
group's row set covers *all* ancestors up to the root, not just the direct
parent; populated on group creation in
`KyselyCreateUserGroupInteractorRepo.insertInheritedClosureList`). This
means "find the nearest ancestor with an explicit value" is always a single
query, no recursion:

```typescript
db.selectFrom('userGroupClosure as ugc')
  .innerJoin('userGroupPermission as ugp', 'ugp.userGroupId', 'ugc.ancestorId')
  .select(['ugp.permissionType', 'ugp.scope', 'ugp.effect'])
  .where('ugc.descendantId', '=', /* the group in question */)
  .where('ugp.effect', '!=', PermissionEffect.INHERIT)
  .orderBy('ugc.depth', 'asc')
  // first row (lowest depth) per permissionType wins
```

This exact pattern appears twice, independently:
- Per-user, single-permission-type: `KyselyPermissionHelper.getUserGroupPermissionList`
  (private, called in a loop per permission type from the now-dead
  `calculatePermission` — not part of the live cache-build path).
- Per-group, batched across all permission types: the effective-value
  helper added 2026-08-04 in
  `KyselyGetUserGroupPermissionListInteractorRepo.getEffectiveAncestorPermissions`,
  used to power the "what does Inherit actually resolve to" indicator on
  the User Group Permission screen (see
  [permissions.md § Inheritance](../workflow/permissions.md#inheritance)).

**Cross-group resolution:** when a user belongs to multiple groups and
their individually-resolved results disagree, **DENY wins over ALLOW** —
`KyselyPermissionHelper.resolvePermission`, decided 2026-08-04 (see
[decisions.md](../decisions.md)), matches the pre-existing live
implementation. This was previously mis-documented as "Allow wins" in
`permissions.md`; the doc has since been corrected to match the code, not
the other way around.

**Scope tie-break** (when the winning effect ties across multiple entries):
currently the **broadest** scope wins, not narrowest. Unlike the effect
tie-break above, this direction is **not** a settled decision — it may be
the wrong default. Don't treat "broadest wins" as intentional/final the way you can treat
"DENY wins" — it hasn't been through the same decision process.

---

## Permission keys and the registry

A permission is a string key `<module>.<name>` (`core.canGetUserList`,
`vu_meet.canGetChatInfo`), stored as-is in every `permission_type` column
(`varchar(100)`). Core's keys are in `CorePermission` +
`corePermissionDefinitions` (`packages/core/server/src/domain/Core/Permission/`); each module has
its own `<Feature>Permission` + `<Feature>PermissionDefinitions` in
`packages/<package>/server/src/domain/<Feature>/`. `PermissionRegistry` holds core's definitions plus
those of every module in `apps/copor/server/src/modules.ts`, registered at startup by
`registerModules` (descriptor field `permissions`). Anything that needs "all
permissions" (cache build, admin lists, dependency graph) reads the registry,
never an enum.

Rules: a module's keys must start with its `name`; a permission may depend
only on core's or on a module listed in its module's `dependsOn` (startup
fails otherwise); never rename a key once data exists — it is the stored
value. Translations are nested by module:
`translationStringList.<module>.<name>` in `locales/permission/*.json`.

## Key files

| Concern | File |
|---|---|
| Permission keys + definitions | `packages/core/server/src/domain/Core/Permission/CorePermission*.ts`, `packages/<package>/server/src/domain/<Feature>/<Feature>Permission*.ts` |
| Registry (all registered permissions) | `packages/core/server/src/domain/Core/Permission/PermissionRegistry.ts`; filled by `packages/core/server/src/client/Core/Module/registerModules.ts` |
| Cache read + eager rebuild trigger | `packages/core/server/src/client/Core/Helpers/KyselyPermissionHelper.ts` |
| Cache build (the live resolution logic) | `packages/core/server/src/client/Core/Helpers/KyselyUserPermissionCacheHelper.ts` |
| Cache invalidation (`deleteCacheForUsers`) | same file — call this from any write path that affects permissions |
| Dead cross-level resolver (do not use) | `KyselyPermissionHelper.resolveAcrossLevels` / `.calculatePermission` |
| User Group ancestor closure table | `packages/core/server/src/client/Core/Database/migrations/20260709_068_user_group_closure.ts`; populated in `KyselyCreateUserGroupInteractorRepo.ts` |
| User Group permission CRUD | `packages/core/server/src/client/Components/Permission/{Get,Set}UserGroupPermissionList/` |
| Effective-value resolution for the Inherit UI indicator | `packages/core/server/src/client/Components/Permission/GetUserGroupPermissionList/repo/kysely/KyselyGetUserGroupPermissionListInteractorRepo.ts` |
| Tenant scope checks (`isInTenant`, `isInSameTenant`) | `KyselyPermissionHelper.ts`, used by `Core/Repository/ContextualRepository/` |

---

## Checklist — adding or changing a permission-affecting write path

- [ ] Does this write change `userPermission`, `rolePermission`,
      `userGroupPermission`, `userGroupUserMap`, or a user's `role_id`?
- [ ] If yes: look up every affected user id **before** the write (in the
      same transaction, if the write deletes the thing the permission was
      attached to).
- [ ] Call `KyselyUserPermissionCacheHelper.deleteCacheForUsers(userIds, trx)`
      after the write.
- [ ] If the write affects many users at once (a role or a group), make
      sure you're fanning out to *all* of them, not just one — see
      `KyselySetPermissionListToRoleInteractorRepo` and
      `KyselySetPermissionListToUserGroupInteractorRepo` for the pattern.
- [ ] If you're touching `resolvePermission` or `buildPermissionCacheRows`,
      re-read the Level order / Scope tie-break sections above first — the
      effect tie-break (DENY wins) is a settled decision, the scope
      tie-break (broadest wins) is not.

---

## Change History

- **2026-08-04** — Initial version: DENY-wins-over-ALLOW cross-group policy
  and the Inherit effective-value UI indicator.
