# Docs MOC

Map of Content for this docs vault — the entry point for finding anything,
and the place new specs should get linked into as they're added. Obsidian's
graph/backlinks view builds on top of these links, so keep this current when
adding or renaming a file.

New module/behavior specs: copy [_TEMPLATE.md](./modules/_TEMPLATE.md) into
`modules/` and link it under [Modules](#modules) below.

## Modules

Feature specs — one file per entity/feature, following
[_TEMPLATE.md](./modules/_TEMPLATE.md).

- [VuMeet.md](./modules/VuMeet.md) — VuMeet (chat/messaging) full behavior
  spec: chats, messages, typing, seen status, calls (private + group),
  notifications, WebSocket events. Written as a code-trace seed with a large
  open-questions list — not yet a finished "build to this" doc.
- [SystemSettings.md](./modules/SystemSettings.md) — file-based admin
  settings; the top-level `TIME_ZONE` settings type and the
  `TimeTransformer`/`AppTimeZoneStore` mechanism that makes every DB
  read/write respect it.
- [ToDo.md](./modules/ToDo.md) — personal (`PRIVATE`) to-dos with tags,
  comments, alarms and owner-only file attachments.
- [Cloud.md](./modules/Cloud.md) — Cloud file sharing: the `PRIVATE` /
  `PUBLIC` / `USER_GROUP` sharing types, how the folder tree is derived, and
  who can read/delete what.
- [Registration.md](./modules/Registration.md) — public self-registration:
  opt-in setting, e-mail verification code, USER without tenant.
- [Contacts.md](./modules/Contacts.md) — optional `contacts` module: the
  contact list (core user picker under `contacts.canGetContactList`) and
  contact details.
- [Help.md](./modules/Help.md) — optional `help` module: help dashboard,
  About (changelog served by the server), Tools and the public app
  installation page.

## Development progress

- [progress/](./progress/README.md) — dated development notes.

## Plans

- [open_tasks.md](./plans/open_tasks.md) — what is still to do on the
  platform (next steps, cleanup, known bugs tracked in module specs).

## Cross-cutting concerns

- [users.md](./users.md) — roles (`USER`/`ADMIN` types), the baseline seed,
  and why per-role capability tables don't belong in these docs (they're
  admin-configured data, not code).
- [decisions.md](./decisions.md) — product/business decision log.
- [cron_jobs.md](./cron_jobs.md) — callable endpoints meant for a host-level
  scheduler: the email outbox (`/email/send`), currently the only trigger
  that delivers queued email. Not scheduled anywhere yet.

## Dev documentation

Backend/frontend implementation patterns — how to build a new feature that
fits the existing architecture.

- [database_pattern.md](./dev_documentation/database_pattern.md) — Kysely/
  MySQL migration conventions, `TableCreator` reference. Migration runner
  internals (ordering constraint, tracking): [database_migrations_runner.md](./dev_documentation/database_migrations_runner.md).
- [database_migrations_runner.md](./dev_documentation/database_migrations_runner.md) —
  how `npm run db:migrate` resolves/orders/tracks migrations and the
  can't-insert-before-an-executed-migration constraint.
- [permission_system.md](./dev_documentation/permission_system.md) —
  how permission resolution actually works in code: the cache, the
  cache-invalidation obligation on every permission-affecting write,
  User Group inheritance internals. Developer counterpart to
  [permissions.md](./workflow/permissions.md).
- [administration_client_pattern.md](./dev_documentation/administration_client_pattern.md) —
  backend pattern (domain + client layers) for admin CRUD entities, worked
  through `ContractType`. Frontend side:
  [administration_page_builder.md](./dev_documentation/administration_page_builder.md).
- [administration_page_builder.md](./dev_documentation/administration_page_builder.md) —
  Flutter admin page builder abstraction (namespaces, routes, dashboard
  wiring). Backend side: [administration_client_pattern.md](./dev_documentation/administration_client_pattern.md).
- [dynamic_forms_end_to_end.md](./dev_documentation/dynamic_forms_end_to_end.md) —
  full form flow, backend → frontend. Field-by-field reference:
  [dynamic_forms_field_reference.md](./dev_documentation/dynamic_forms_field_reference.md).
- [dynamic_forms_field_reference.md](./dev_documentation/dynamic_forms_field_reference.md) —
  every form field type and how to add a new one. End-to-end flow:
  [dynamic_forms_end_to_end.md](./dev_documentation/dynamic_forms_end_to_end.md).
- [filter_pattern.md](./dev_documentation/filter_pattern.md) — table
  search/sort/filter pattern, worked through `Country`; pairs with
  [administration_client_pattern.md](./dev_documentation/administration_client_pattern.md)
  for the table endpoint itself.

## Workflow / product docs

User-facing behavior descriptions — lighter weight than module specs, no
code references expected.

- [permissions.md](./workflow/permissions.md) — how roles, user groups, and
  scopes combine to decide what a user can do. Entry point:
  [users.md](./users.md).
- [feature_flags.md](./workflow/feature_flags.md) — feature toggle system,
  frontend + backend + admin UI.
- [to_do.md](./workflow/to_do.md) — personal to-dos, tags and colors.
- [wai-aria/wai_aria.md](./workflow/wai-aria/wai_aria.md) — TalkBack/
  screen-reader navigation basics.

## Vault housekeeping log

- **2026-10-02:** pruned to live code — docs for removed features, a dated
  status report, an old permission audit and a per-page accessibility matrix
  were removed; the decision log keeps only entries that still bind live code
  (see [decisions.md](./decisions.md), 2026-10-02 (4)).
