# ToDo

Status: 🟢 Implemented — personal (`PRIVATE`) to-dos with tags, comments,
alarms and file attachments. Trash/untrash, assign-users and per-user
settings exist as domain scaffolding only (see Known Gaps).

Owner: _(assign)_

Code: `packages/todo/server/src/domain/ToDo/*`, `packages/todo/server/src/client/ToDo/*`

## Purpose

Per-user task list. `ToDoType` (`packages/todo/server/src/domain/ToDo/enum/ToDoType.ts`) has a
single value, **`PRIVATE`** — a user's own personal to-do, visible only to
its owner (`privateToDo.actorId`). The controllers still read a `type`
field from the request and the routes still carry it (`/todo/:id/:type`),
so further types can be added by branching on it.

Sub-resources hang off a to-do by its id:

- **Tags** — `toDoTagMap`.
- **Comments** — `toDoComment` (`/todo/comment`).
- **Alarms** — `alarm`, keyed by `alarmableId`/`alarmableType`
  (`/todo/alarm`).
- **Attachments** — files on disk via `ToDoFileHelper`
  (`packages/todo/server/src/client/ToDo/ToDoFileHelper.ts`), metadata in `toDoAttachment`,
  returned as `attachmentList` on both the single-todo get and the
  `get-all-for-user` list.

## Available for Roles

Access is permission-driven (see [permissions.md](../workflow/permissions.md)),
not hardcoded per role. The private to-do permissions
(`canGetPrivateToDo`, `canUpdatePrivateToDo`, `canDeletePrivateToDo`, …)
take a scope (`requiresScope: true` in `PermissionDefinition.ts`);
`canGetAllToDosForUser` gates the list.

Attachment permissions (`canCreateAttachmentForToDo`,
`canGetAttachmentForToDo`, `canDeleteAttachmentForToDo`) are flat role
gates — the per-attachment ownership check is a business validator, not a
scope (see Business Rules).

## Expected Behavior

### To-dos

| Route | Purpose |
|---|---|
| `POST /todo` | Create |
| `PATCH /todo` | Update |
| `GET /todo/:id/:type` | Get one |
| `DELETE /todo/:id/:type` | Delete |
| `POST /todo/get-all-for-user` | The caller's own to-dos, flat list |

### Attachments

- `POST /todo/attachment/:todoId` (multipart, field `file`) — size capped by
  `TODO_MAX_FILE_SIZE_MB` via `MulterFileMiddleware`. Validators: the to-do
  must exist (`ValidateTodoItem`) and the caller must own it
  (`ValidateCanAccessToDoForAttachment`).
- `GET /todo/attachment/:id` — streams the file back
  (`Content-Disposition: attachment`), after an existence check and the same
  ownership check resolved from the attachment's `toDoId`.
- `DELETE /todo/attachment/:id` — deletes the DB row and the on-disk file
  (`ToDoFileHelper.deleteFile`), same checks.

## Business Rules

- A private to-do is only ever accessible to its owner.
- **Attachments** are owner-only: enforced by
  `ValidateCanAccessToDoForAttachment`/`ValidateCanAccessAttachmentForToDo`
  → `ToDoKyselyHelper.isForbiddenToDoAccess`, which compares
  `privateToDo.actorId` to the caller and treats an unknown to-do id as
  forbidden.

## Known Gaps

- **Create/update storage checks are no-ops in production**: both
  `CreatePrivateToDoValidatorStorageRepoPicker` and
  `UpdatePrivateToDoValidatorStorageRepoPicker` map `DBEnv.KYSELY` to the
  *fake* repos, which always answer "valid" — so a to-do's tag is never
  checked to exist (create and update), and update never checks that the
  to-do itself exists. (The never-used Kysely storage repos were removed
  2026-10-10; a real implementation needs writing.)
- **Domain-only scaffolding** in `packages/todo/server/src/domain/ToDo/ToDoItem/`: trash/untrash,
  empty trash, assign users, alert hours and per-user settings have
  interactors and validators but no client repos or routes.
- `AlarmableType.GROUP_TODO` is a leftover enum value with no to-do type
  behind it (only referenced by fake repos).

## Test Cases

☐ Owner uploads a file to their own to-do → succeeds; a different user
  attempts the same → rejected.
☐ Upload exceeding `TODO_MAX_FILE_SIZE_MB` → rejected by multer before
  reaching the controller.
☐ Download and delete an attachment as the owner → succeeds; as anyone
  else → rejected on both.
☐ `GET /todo/:id/PRIVATE` includes `attachmentList` with the uploaded
  file's `id`/`name`/`size`.

## Change History

- **2026-08-25** — Wired up file attachments (previously dead domain
  scaffolding with two bugs, both fixed): new `toDoAttachment` table and
  `canGetAttachmentForToDo` permission.