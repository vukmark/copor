# Contacts

Status: 🟢 Implemented — list + detail; no favorites or grouping

Owner: _(assign)_

Code: optional module `contacts` — `packages/contacts/server/src/domain/Contacts/`,
`packages/contacts/server/src/client/Contacts/` (`ContactsModule.ts`, `router/ContactsRouter.ts`),
`packages/contacts/flutter/lib/src/` (`config/contacts_module.dart`). Listed in
`apps/copor/server/src/modules.ts` and `frontend/lib/modules.dart`; remove both entries
to ship an app without it (checked 2026-10-09, see the plan).

## Purpose

An address book of the other users the actor is allowed to see, with a detail
view (contact info, vCard / QR export). The list query is core's user
picker (`ListVisibleUsers`, under `contacts.canGetContactList`); Cloud's
recipient picker uses the same query under its own permission, not this list
([Cloud.md](./Cloud.md)). No other module depends on Contacts.

Visibility is driven by the scope of the actor's `contacts.canGetContactList`
permission (`PermissionScope`), applied by core's `KyselyVisibleUsersHelper`.

## Available for Roles

- **USER / ADMIN** — whoever holds `contacts.canGetContactList` (depends on
  `contacts.canViewContactsFeature`) sees the list; the scope of that grant
  decides *whom* they see (see Business Rules). Contact details are gated
  separately by `contacts.canGetContactById`, the contact-information view by
  `contacts.canGetUserContactInformation` (depends on `canGetContactById`). See [permissions.md](../workflow/permissions.md).

## Data Shape (current)

```
POST /contacts/list
body:     { filterList: [{name: "SEARCH", values: ["jo do"]}], limit?: "20", offset?: "0" }
response: { items: ContactListItem[], limit: "20", offset: "0" }

ContactListItem { id, fullName, picture ("" when none), isActive }

GET /contacts/:id → ContactModel (name, email, address, phone
numbers, tenant address, role, isActive)

GET /contacts/:id/information → GetUserContactInformationViewModel
(not used by the app today)
```

## Expected Behavior

### Read

- `POST /contacts/list` — validated by `ValidateGetContactList`
  (`contacts.canGetContactList`), then listed by core's
  `KyselyListVisibleUsersRepo`:
  - the actor's own user is never in the list;
  - narrowed by the scope of the actor's `canGetContactList` grant;
  - `SEARCH` matches every whitespace-separated token against first or last
    name;
  - ordered by last name, first name;
  - paged by `limit`/`offset`, defaulting to `DEFAULT_LIST_LIMIT` (100) / 0;
    the response always echoes the window it used.
- `GET /contacts/:id` — per-contact detail, scoped per target user
  via `KyselyUserPermissionRepo`.

## Business Rules

- Scope → visible contacts (template default, 2026-10-04):
  - `OWN` — nobody (your own entry is excluded, and OWN only covers you);
  - `TENANT` — users with the same `user.tenant_id` as the actor (an `ADMIN`
    with TENANT sees everyone, as elsewhere in `KyselyScopeHelper`);
  - `ALL` — everyone.
- Inactive users are listed and flagged with `isActive: false` rather than
  hidden. (template default, 2026-10-04)

## Edge Cases

- **Resolved (2026-10-04):** a `USER` without a tenant and `TENANT` scope sees
  an empty list (the tenant subquery excludes `NULL`).
- **Still open:** no contact-specific privacy settings are applied to the
  list; `user_preferences` contact-privacy flags only affect what other screens
  show.

## Known Bugs

- None known.

## Traced (2026-10-04)

- Before this change the list endpoint wasn't routed, the Kysely repo picker
  pointed at the fake repo, and the "real" repo read a
  placeholder contact-list table that nothing filled. That table and its migration
  are gone; the list now reads `user` directly.

## Open Questions (for follow-up with client)

1. Should contacts be narrowed by shared user groups rather than tenant for
   `USER`s? Today only the permission scope decides.

## Test Cases

☐ Actor with `canGetContactList` scope `ALL` → every other user, paged
☐ Actor with scope `TENANT` → only users of the same tenant
☐ Actor with scope `OWN` → empty list
☐ `SEARCH` "jo do" → matches "John Doe", not "John Smith"
☐ No `limit`/`offset` in body → first 100, response echoes `limit: "100"`, `offset: "0"`
☐ Actor without `canGetContactList` → 403
