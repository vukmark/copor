# Cloud (file sharing)

Status: 🟢 Implemented — Private, Public and User Group sharing.

Owner: _(assign)_

Code: `packages/cloud/server/src/domain/Cloud`, `packages/cloud/server/src/client/Cloud`,
`packages/cloud/flutter`

## Purpose

Cloud is the file area of the app. A file is uploaded once and made visible
to a set of people determined by its **sharing type**. The frontend renders
the result as a folder tree (`GetFileListForUser` builds it); there is no
real directory structure in storage — folders are derived from each file's
`path` string plus a fixed set of top-level buckets.

Sharing types (`packages/cloud/server/src/domain/Cloud/interactor/dto/SaveFileDTO.ts`):

| `SharingType` | Audience | Backing map table |
|---|---|---|
| `PRIVATE` | the uploader only | — (`cloud_file.created_by`) |
| `PUBLIC` | the file's uploader + the owner of the Public folder it sits in | `file_user_map` |
| `USER_GROUP` | members of one User Group | `file_user_group_map` |

`PUBLIC` is the individual (non-group) sharing type. It is **not**
world-readable despite the name. `file_user_map.user_id` is the **folder
owner** (recipient); `cloud_file.created_by` is the **file owner**
(uploader); the two can differ.

This module scopes against `Feature.CLOUD` and the permission types
`canViewCloudFeature`, `canGetFileListForUser`, `canGetFile`,
`canDeleteFile`, `canCreateUserGroupFile`, `canCreatePublicFile`. Related
but distinct: [VuMeet.md](./VuMeet.md) (chat file attachments — separate
`message` path, `canGetVuMeetFile`).

## Available for Roles

- **Every user** has a **Public** folder in *My Files*, alongside
  **Private**. Anyone may upload into their own Public folder
  (`POST /cloud/PUBLIC/*`) or into another user's Public folder
  (`POST /cloud/PUBLIC/USER/:userId/*` — in the app, the "Send file to a
  user" action, recipients picked from `POST /cloud/recipients`), gated by
  `canCreatePublicFile`. A file in a Public folder is visible only to its
  uploader and the folder owner; each can also delete it.
- **User Group members** see a folder per group under *Groups → USER_GROUP*
  and can upload into groups they belong to.

All create paths are additionally gated by `ValidateFileSize`. `PRIVATE`
has no dedicated create permission (file size only).

## Data Shape

```
SaveFileDTO {
  id: string
  overwrite?: boolean
  actorId: string                    // the uploader / file owner
  buffer: Buffer
  sharingType: SharingType
  name: string
  description?: string
  path: string                       // e.g. "sub/folder/" — drives the derived tree
  sharingParticipants: {
    userGroupId?: string
    userId?: string                  // PUBLIC: the folder owner (recipient)
  }
}

GetFileListDTO {                      // one row per visible file, flat
  id, sharingType, path, name
  creatorId, creatorFirstName, creatorLastName
  createdAt, size, description?
  groupId?, groupName?               // USER_GROUP
  targetUserId?, targetUserFirstName?, targetUserLastName?   // PUBLIC: folder owner
}

CloudNode = CloudFolderNode | CloudFileNode   // the built tree returned by GET /cloud
CloudFolderNode { type:'FOLDER', name, path, uploadEndpoint?, children: CloudNode[] }
CloudFileNode   { type:'FILE', id, name, path, size, createdAt, creator{...}, description? }
```

Folder tree shape (`GetFileListForUser.buildStructure`):

```
MY_FILES                       (always first)
├── PRIVATE
└── PUBLIC
GROUPS                          (only if it would have ≥1 child)
└── USER_GROUP
    └── (group name) …
```

## Expected Behavior

### Create

| Route | Controller | Saved as | Validation |
|---|---|---|---|
| `POST /cloud/PRIVATE/*` | `CreatePrivateFileController` | `PRIVATE` | file size only |
| `POST /cloud/PUBLIC/*` | `CreatePublicFileController` | `PUBLIC`, `userId = actorId` | `canCreatePublicFile` + file size |
| `POST /cloud/PUBLIC/USER/:userId/*` | `CreatePublicFileController` | `PUBLIC`, `userId` from path | `canCreatePublicFile` + `cloud.canGetShareRecipientList` + target visible to the actor (see Business Rules) + file size |
| `POST /cloud/USER_GROUP/:groupId/*` | `CreateUserGroupFileController` | `USER_GROUP` | `canCreateUserGroupFile` + group exists + actor in group + file size |

`CreatePublicFileController` runs **validate → interact → log first**, then
writes the blob (`CloudFileHelper.saveFile`), then fires the optional
`notifyReceivers` notification (`CloudNotificationHelper`, module
preference `cloud.userFolderNotifications`). The Private and User Group controllers write the
blob *before* validation (see Known Bugs).

### Delete

- `DELETE /cloud/:id` (`DeleteFileController`) and `DELETE /cloud/bulk`
  (`BulkDeleteFileController`).
- `KyselyDeleteFileValidatorPermissionRepo` decides per file:
  - `PUBLIC` → `created_by == actor` **or** actor is the Public folder
    owner (`file_user_map.user_id == actor`).
  - `USER_GROUP` → `created_by == actor` **or** actor is a member of the
    file's user group.
  - `PRIVATE` → the regular `canDeleteFile` permission check, with the file's
    `created_by` as the owner for scope resolution.

### Read

- `GET /cloud/` (`GetFileListController`) → `GetFileListForUser`, gated by
  `canGetFileListForUser`. Returns the whole built tree for the actor, built
  from three queries: the actor's Public folder (`file_user_map.user_id =
  actor`), the actor's user groups, and the actor's private files. It does
  **not** return files the actor uploaded into *someone else's* Public
  folder (see Open Questions).
- `GET /cloud/:id` (`GetFileController`) → `canGetFile` DENY
  short-circuits, then `KyselyGetFileValidatorPermissionRepo` allows the
  file if the actor is in its user group, owns it as a private file, or is
  the uploader/folder owner of a `PUBLIC` file.

## Business Rules

- The **Public** folder is **not** world-readable: a file in it is visible
  only to its uploader (`created_by`) and the folder owner
  (`file_user_map.user_id`).
- Folders are synthetic. `insertFile` walks `file.path` segments and
  lazily creates `CloudFolderNode`s; two files with the same path collapse
  into the same derived folder regardless of who uploaded them.
- `MY_FILES` is always the first root node; `GROUPS` only appears if it
  would contain at least one child.
- The "Send file to a user" recipient picker searches
  `POST /cloud/recipients` (core user picker, `ListVisibleUsers`), so it
  offers exactly the **active** users the actor's
  `cloud.canGetShareRecipientList` scope allows (OWN: nobody, TENANT: same
  tenant, ALL: everyone). That permission depends on `canCreatePublicFile`.
- The upload itself (`POST /cloud/PUBLIC/USER/:userId/*`, another user's
  folder) checks the same thing: `canCreatePublicFile`,
  `cloud.canGetShareRecipientList`, and that the target is a user the
  picker could list (core `ValidateUserIsVisible`, same scope query, active
  users only). An unknown, deactivated or out-of-scope target gets
  `InvalidUserException`.
- Uploads are limited to `CLOUD_MAX_FILE_SIZE_MB` (the module's
  `clientConfig.maxFileSize`, the same value the app shows), not core's
  `MAX_FILE_SIZE_MB`.
- Upload pushes respect two module preferences (default on, My Account →
  Notifications → Cloud): `cloud.groupFolderNotifications` for `USER_GROUP`
  files and `cloud.userFolderNotifications` for files sent into your Public
  folder.

## Known Bugs

- `CreatePrivateFileController` and `CreateUserGroupFileController` write
  the blob to disk before validation; a failed validation leaves an orphan
  blob.

## Open Questions

1. **"Shared by me" view.** A file I uploaded into *someone else's* Public
   folder appears nowhere in *my* tree (I can still `GET` it as creator).
2. **Notifications.** `CreatePublicFileController` sends the
   `notifyReceivers` notification only when the form field is set; whether
   cross-user uploads should *always* notify is not specced.
3. **Admin-configurable defaults.** The see/delete rules (uploader + folder
   owner) are hardcoded; a per-folder or per-role sharing-controls UI is
   not built.

## Test Cases

- ☐ `GET /cloud` → `MY_FILES` children are `['PRIVATE', 'PUBLIC']`.
- ☐ `canCreatePublicFile` DENY → create rejected.
- ☐ Upload to own Public folder → target-user existence not checked.
- ☐ Upload to another user's Public folder → target must exist, else
  `InvalidUserException`.
- ☐ User A `POST /cloud/PUBLIC/USER/:B/notes.pdf` → file in B's `PUBLIC`
  folder; not in A's.
- ☐ User C (not A, not B) → `GET /cloud/:fileId` → denied; `DELETE` →
  denied. A and B can each `GET` and `DELETE`.
- ☐ `USER_GROUP` file → a member of a *different* group cannot delete it.

## Change History

- **2026-08-30** — Public folder for every user; `POST /cloud/PUBLIC/USER/:userId/*`
  and the "Send file to a user" frontend flow; `canCreatePublicFile`
  permission.