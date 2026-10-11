# VuMeet — Behavior Specification

Status: 🟡 Documenting current behavior — this is a **spec-in-progress**, seeded
from a full code trace (2026-08-21). It is not yet a "build to this" spec —
every `Open Question` below needs an answer from you before it becomes one.
Treat this as the shared source of truth we edit together, not a finished
document.

Owner: _(assign)_

Code: `packages/vu_meet/server/src/domain/VuMeet`, `packages/vu_meet/server/src/client/VuMeet`, `packages/core/server/src/client/Core/WebSocket`,
`packages/core/server/src/client/Core/Helpers/{NotificationHelper,PushNotificationHelper}.ts`,
`packages/vu_meet/server/src/client/VuMeet/Core/CallRoster`, `packages/vu_meet/flutter`,
`packages/core/flutter/lib/src/utils/push_notification`, `packages/vu_meet/flutter/lib/src/config/callkit_service.dart`.
The former separate `GroupChat`/`GroupMessage` code was deleted 2026-08-21
in favour of the unified chat model (see
[decisions.md](../decisions.md#2026-08-21)).

Supersedes the frontend's own `VU_MEET_USECASES.md`, which is now stale in
several places (references deleted `/vu-meet/group-*` endpoints and the
deleted `SendGroupChatTypingStatus` feature) — that file should eventually
be deleted once this doc is confirmed to cover everything it did.

---

## 0. How to read this doc

Every subsystem below follows roughly: **what it is → current behavior,
traced from code → edge cases → open questions**. Three tags used throughout:

- **Traced** — a fact confirmed by reading the actual code, with a file:line
  citation. Not a guess.
- **Known gap** — code that's there but incomplete, unwired, misleading, or
  inconsistent — a bug or a stub, not a design decision.
- **Open question** — something the code doesn't answer, or that depends on
  a product decision only you can make. This is where I need your input
  before this becomes a real spec.

---

## 1. The Chat Entity

### 1.1 Data model (current, live)

```
chat:
  id, name, picture, is_private (bool), last_message, last_message_sent_time,
  last_message_sent_by → user

chat_user_map:
  chat_id → chat, user_id → user      (membership, no role/admin concept)

message:
  id, content, type (TEXT | PICTURE | CALL_EVENT | FILE), seen (tinyint),
  extension, chat_id → chat, sender_id → user

message_seen:
  message_id → message, user_id → user   (per-user read receipts)
```

**Traced (2026-08-21):** despite the table/model names ("private chat",
"private message"), this is a single unified chat entity for both 1:1 and
multi-member conversations — `is_private` is just a flag, not a different
table or code path. A "group chat" is a `chat` row with 3+ members and
`is_private = false`; a "private chat" is the same row shape with exactly 2
members and `is_private = true`. There is no admin/owner concept on a chat —
every member has equal standing (`docs/decisions.md#2026-08-21`,
`KyselyGetChatInfoInteractorRepo.ts`).

**Confirmed 2026-08-23 (Traced, migration + live DB check):** the old
per-model `group_chat`/`group_chat_member`/`group_message`/
`group_message_seen_by`/`private_chat` tables aren't just dead code — they no
longer exist in the schema at all. `packages/core/server/src/client/Core/Database/migrations/20260821_154_drop_dead_vu_meet_tables.ts`
drops all five, and this has actually run (verified against a live dev DB:
`SHOW TABLES` returns only `chat`/`chat_user_map` under the
chat/message domain). There is no residual DB-level group/private
distinction anywhere — `is_private` on `chat` is the only place it's
represented.

**Fixed (2026-08-23):** the `MessageContentType.FILE` enum value
(`packages/vu_meet/server/src/domain/VuMeet/Core/enum/MessageContentType.ts`) existed but the DB migration
for `private_message.type` only allowed `'TEXT' | 'PICTURE' | 'CALL_EVENT'`
(`20260202_4.2_private_message.ts`) — inserting a message with `type: FILE`
failed at the DB constraint level. Traced the frontend's actual send path
(`conversation_view.dart:103-138` → `vu_meet_message_repository_impl.dart:155`):
the media-picker attachment flow (images, documents, and unsupported files
alike) hardcodes `type: "FILE"` on every send — `PICTURE` is never sent by
any current code path, so this wasn't a rare edge case, it was the *only*
path the live attachment UI used, and every attachment send was failing.
Resolved by `packages/core/server/src/client/Core/Database/migrations/20260823_155_private_message_file_type.ts`,
which alters the column to `enum('TEXT','PICTURE','CALL_EVENT','FILE')`
(`PICTURE` kept for existing rows/back-compat, nothing writes it today).
`db.d.ts`/`PrivateMessage.ts` and `bin/db/mala_baza.sql` already assumed
`FILE` was valid, so only the migration itself was stale.

**Renamed (2026-08-23):** `private_message` → `message`, matching its
sibling `chat` (see [decisions.md](../decisions.md), 2026-08-23 (2)). The name predated
the unified `chat` model — it was originally paired with the deleted
dyadic `private_chat` table — and wasn't renamed along with `chat`. The class/folder layer followed suit in both `domain` and
`client` (`VuMeet/PrivateMessage/` → `VuMeet/Message/`, e.g.
`CreatePrivateMessageController` → `CreateMessageController`), and the HTTP
route moved from `/vu-meet/private-message/...` to `/vu-meet/message/...`
(frontend's Retrofit clients updated to match). `PrivateChat`'s own naming
(still sitting on `chat`) was left untouched at the time — that
inconsistency was deliberately deferred. **Resolved 2026-08-25:** the
deferred `PrivateChat` → `Chat` rename was done too — see the dedicated
write-up after this paragraph. All references to `private_message`/`PrivateMessage`
below have been updated to reflect the new name; the `20260202_4.2_...` and
`20260823_155_...` migration filenames themselves are historical and
correctly still say `private_message`, since migrations are immutable
records of what the schema looked like at the time they ran.

**Resolved 2026-08-25: the deferred `PrivateChat` → `Chat` rename.** Went
through with dropping "Private" from the naming across all three repos,
since there's no separate "group chat" entity to distinguish it from
anymore — matching the `PrivateMessage` → `Message` precedent above.
Scope, per an explicit decision to go all the way rather than code-only:

- **`domain`:** `VuMeet/PrivateChat/` → `VuMeet/Chat/` (all ~38 files);
  `PermissionType.canCreatePrivateChat`/`canGetPrivateChat`/
  `canGetPrivateChatWithUser`/`canSearchMessagesInPrivateChat` →
  `canCreateChat`/`canGetChat`/`canGetChatWithUser`/`canSearchMessagesInChat`;
  every `*PrivateChat*`-named class/interface/DTO renamed to drop
  "Private" (e.g. `ValidateGetPrivateChatWithUser` →
  `ValidateGetChatWithUser`, `GetPrivateChatWithUserRepo` →
  `GetChatWithUserRepo`). **Two validators couldn't take the obvious
  target name** — `ValidatePrivateChat`/`ValidateIsUserInPrivateChat`
  would have collided with a pre-existing (but, until this pass, entirely
  unused) `ValidateChat`/`ValidateIsUserInChat` pair under
  `Core/Validations/Validators/`, built for a `SendTypingStatus` validator
  that was never wired into its controller. Renamed to
  `ValidateChatExists`/`ValidateIsChatMember` instead and left
  `ValidateChat`/`ValidateIsUserInChat` as the (now legitimately used, see
  below) generic pair. A third collision — `SearchMessagesInPrivateChatDTO`
  → `SearchMessagesInChatDTO` — hit an already-orphaned, zero-importer
  `SearchMessagesInChatDTO.ts`; deleted the dead file, no functional
  impact.
- **`client`:** mirrored the domain rename 1:1 (`VuMeet/PrivateChat/` →
  `VuMeet/Chat/`, `VuMeet/Message/SearchMessagesInPrivateChat/` →
  `.../SearchMessagesInChat/`, `VuMeet/Core/SendPrivateChatTypingStatus/`
  → `.../SendChatTypingStatus/`, `PrivateChatKyselyHelper` →
  `ChatKyselyHelper`, `RouterPrivateChat.ts`'s `PrivateChatRouter` class
  → `ChatRouter`, file renamed to `ChatRouter.ts` to match — this
  file/class mismatch predated the rename and got straightened out while
  touching the file anyway). **Route prefix changed:**
  `/vu-meet/private-chat/...` → `/vu-meet/chat/...` (`VuMeetRouter.ts`) — a
  breaking API change; frontend updated to match (below), no
  backward-compat shim added. Permission/log-type locale JSON keys
  (`src/Resources/locales/permission/`, `.../log_type/`) renamed to match
  the new `PermissionType`/log-action strings, both key and (English/
  German) label text.
- **Found and fixed along the way, not originally in scope:** the
  `ValidateSendTypingStatus` validator (`packages/core/server/src/domain/WebSocket/`) existed
  but was never wired into `SendPrivateChatTypingStatusController` — the
  live `/vu-meet/private-chat/typing-status` endpoint ran with **zero
  validation** (no permission check, no chat-membership check; any
  authenticated user could send a typing status for any chat ID). Fixed by
  wiring the validator in (new `KyselyValidateSendTypingStatusRepo`/
  `FakeValidateSendTypingStatusRepo`/`ValidateSendTypingStatusRepoPicker`,
  reusing `ChatKyselyHelper`'s existing membership-check queries), which is
  also what made `ValidateChat`/`ValidateIsUserInChat` legitimately live
  rather than dead code — see the collision note above. Also fixed an
  unrelated, genuinely broken import discovered during this pass:
  `SaveAccountDeletionRequestedNotificationRepoPicker.ts` pointed at
  `@client/VuMeet/PrivateMessage/CreatePrivateMessage/repo/fake/FakeSaveNotificationRepo`,
  a path that stopped existing after the `PrivateMessage` → `Message`
  rename above and was never caught (nothing imported the broken module at
  build time in a way `tsc` flagged until this session's other changes
  started exercising nearby code) — repointed to the already-existing
  generic `Components/Notification/repo/fake/FakeSaveNotificationRepo`.
- **`frontend`:** all `/vu-meet/private-chat/...` route strings (4 remote
  data source files + their generated `.g.dart` mirrors — 10 literals) →
  `/vu-meet/chat/...`. The `PrivateChatBloc`/`PrivateChatEvent`/
  `PrivateChatState`/`CreatePrivateChat` family
  (in a people module that has since been removed, backing a quick-DM
  action) → `ChatBloc`/`ChatEvent`/`ChatState`/
  `CreateChat`, folder renamed to `bloc/chat/`. Admin log-viewer
  translation getters in `log_type_translation.dart` renamed to match the
  backend's renamed log-action strings (`createPrivateChat` →
  `createChat`, etc.) — no call sites found for these specific getters,
  possibly already-dead code, not investigated further.
- **Normalized in the same pass, a distinct but related field-naming
  inconsistency:** `GetChatInfoDTO.isPrivate` vs. `GetUserChatDTO`/several
  other DTOs' `isPrivateChat` were two different names for the exact same
  "is this a 2-person chat" boolean. Unified on `isPrivate` everywhere —
  `domain` (`GetUserChatDTO`), `client` (`GetUserChatListPresenter`,
  `KyselyGetUserChatListInteractorRepo`,
  `KyselyGetSearchAllMessagesListInteractorRepo`, the WebSocket
  unread-count repo — including dropping a couple of now-redundant SQL
  `... as isPrivate` aliases where the source and target names became
  identical), and `frontend` (~15 files: `chat_list_model.dart`,
  `message_model.dart`, `chat_display_name.dart`, and others). This one
  **wasn't just cosmetic** — the frontend's `json_serializable` models
  have no `@JsonKey` override, so the Dart field name doubles as the
  expected JSON key; leaving `isPrivateChat` there after the backend's
  `isPrivate` rename would have silently broken deserialization.
- **Verification:** `tsc --noEmit` clean in both `domain` and `client`
  (confirmed the sole pre-existing unrelated error — the broken import
  above — is gone, not just unaffected). Domain: all 66 tests across
  `VuMeet`/`WebSocket` pass; a full-repo domain test run surfaced 76
  pre-existing, unrelated failures (confirmed via a sample — a stale test
  fixture missing a field added to `ScopedPermission` at some point — none
  touch anything in this rename's path). `frontend`: `dart analyze` clean
  (0 errors/warnings) across the touched modules. Not run: client's own
  jest suite (broadly broken pre-existing — see known gap; unrelated to
  this change, confirmed earlier this session via `git stash`) and
  frontend's widget/integration tests (none exist for this feature).
  **Not manually exercised in a running app** — same caveat as other
  fixes this session.
- **Explicitly left alone:** `PrivateCall`-named identifiers
  (`canStartPrivateCall`, `HandlePrivateCallAction`, `ValidateStartPrivateCall`
  — a *different*, still-meaningful private-vs-group distinction for
  *calls*, unrelated to the chat-entity naming being cleaned up here,
  even though these files physically live under the renamed `Chat/`
  folder); the already-known `PrivateMessage`-named leftovers flagged
  during the earlier rename (`CreatePrivateMessageReqBodyDTO.ts` and a
  handful of still-`Private`-prefixed locale keys) — not touched, out of
  scope for this pass; `GroupChat`-named `PermissionType` members
  (`canCreateGroupChat`, `canGetGroupChat`, `canUpdateGroupChat`,
  `canSearchMessagesInGroupChat`, `canMarkGroupChatMessagesSeen`) — appear
  to be dead leftovers from the pre-consolidation architecture (like the
  dropped `group_chat`/`group_message` tables in §2.4), not verified
  further, not renamed.

### 1.2 Create / get-or-create a chat

- **Endpoint:** `POST /vu-meet/chat/user` — despite the URL, this is
  the *only* chat-creation path used by the frontend (create_chat_screen.dart
  always calls this, whether the user picked one contact or several — see
  `docs/decisions.md#2026-08-21`).
- **Dedup rule (Traced, `KyselyGetChatWithUserInteractorRepo` →
  now `KyselyGetChatWithUserInteractorRepo.ts`):** before creating, it
  searches for an *existing* `chat` whose member set is **exactly**
  equal (same users, same count) to the requested set (including the actor).
  If found, that chat's id is returned instead of creating a new one — you
  cannot have two 2-person chats between the same pair of users, and you
  cannot have two identically-membered group chats either.
- `is_private` is computed as `users.length < 3` at creation time (i.e. the
  actor + 1 other = private; actor + 2 or more others = group).
  **Resolved 2026-08-23 (Traced, `KyselyUpdateChatInteractorRepo.ts:13`):**
  `UpdateChat` recomputes `isPrivate: saveDTO.userList.length < 3` on *every*
  update, using the same rule as creation — a 2-person private chat that
  gets a 3rd member added via `UpdateChat` automatically flips to a group
  chat (`is_private = false`) on that same request. There's no separate
  "convert to group" action; membership itself is a full replace (existing
  `chat_user_map` rows deleted, full new list re-inserted), matching
  §1.3's "client resends the entire member list" behavior. **This is
  symmetric, not add-only:** removing a member from a 3-person group chat
  (3→2) flips `is_private` back to `true` via the exact same length check —
  it's a plain recompute on whatever the final count is, not a one-way
  "promotion." **Edge case, fixed 2026-08-25 (see §1.4):** removing members
  down to just the actor (`userList` sent empty, then the repo's
  `userList.push(actorId)` would have made the final list `[actorId]`,
  length 1, evaluating `1 < 3 → true`) used to flag a single-member chat as
  private, which §1.4's "other member" lookup (`WHERE userId != actorId`)
  couldn't resolve a name for. Now blocked before it reaches that point:
  `ValidateUpdateChat` rejects any update that would leave a chat with fewer
  than 2 members (`InvalidChatMemberCountException`), and the equivalent
  create path is blocked the same way, so this state can no longer be
  produced at all.
- No group **name** is required or auto-generated at creation for a group
  chat in this flow (`name` isn't part of `KyselyGetChatWithUserInteractorRepo`'s
  insert beyond whatever the frontend passed as `chatName`, which for a
  private 1:1 chat is presumably blank since 1:1 chats display the *other
  user's* name instead — see 1.4).

**Resolved 2026-08-24 (Traced, frontend):** a blank group name **cannot**
currently be created through the app's standard "New Group" flow —
`create_chat_screen.dart:90-122`'s `groupName` field is a `DTInputField`
with `required: translation.PLEASE_ENTER_GROUP_NAME`, wired to a real
`FormField<String>` validator (`dt_input_field.dart:293`:
`value.trim().isEmpty` → blocks) that `groupFormKey.currentState!.validate()`
checks before `createChat()` is dispatched — an empty/whitespace-only name
shows an inline error and the request is never sent.
`edit_group_modal.dart` (the add/remove-members modal) has **no rename
field at all** today, so it can neither introduce nor fix a blank name.

**Fixed 2026-08-24 (both defense-in-depth layers implemented):**

- **Server-side rejection:** `ValidateGetChatWithUser` (create) and
  `ValidateUpdateChat` (rename) now both run a new `ValidateGroupChatName`
  validator (`packages/vu_meet/server/src/domain/VuMeet/Chat/validations/validator/ValidateGroupChatName.ts`),
  throwing `EmptyGroupChatNameException` when the chat will have 3+ members
  and the name is blank/whitespace-only. Applies to both create
  (`ValidateGetChatWithUserDTO` gained `users`/`groupName` fields,
  wired from `GetChatWithUserController`) and rename/re-member
  (`ValidateUpdateChatDTO` gained `userList`/`name`, already available via
  `UpdateChatController`'s existing `SaveChatDTO` spread). Member count is
  computed as `list.length + 1` at validation time, since both repos
  (`KyselyGetChatWithUserInteractorRepo`,
  `KyselyUpdateChatInteractorRepo`) push the actor into the list *after*
  validation runs, not before. Covered by new tests in
  `ValidateGetChatWithUser.test.ts` / `ValidateUpdateChat.test.ts`.
- **Frontend defensive fallback:** a shared `chatDisplayName()` helper
  (`packages/vu_meet/flutter/lib/src/helpers/chat_display_name.dart`) returns
  a translated "Group" placeholder (`UNNAMED_GROUP_CHAT`, added to both
  `en.json`/`de.json` locale files and `VuMeetPageTranslation`) whenever a
  non-private chat's name is blank. Wired into all three render sites —
  `chat_list_item.dart`, `chat_container.dart`'s `_ConversationAppBar`, and
  `chat_info.dart`'s `ChatInfoView` — replacing their previous raw
  `chat.name` bindings. `translation` is threaded down to `ChatListItem`
  and `_ConversationAppBar`, which didn't previously receive it.

### 1.3 Update a chat (rename, add/remove members)

- **Endpoint:** `PATCH /vu-meet/chat/` (`UpdateChatController.ts`).
- **No dedicated add/remove-member endpoint** — same pattern as the deleted
  GroupChat feature had: the client is expected to resend the *entire*
  desired member list, and the update presumably replaces membership
  wholesale (not yet traced in this pass — needs
  `KyselyUpdateChatInteractorRepo.ts`).
- **Confirmed 2026-08-24 (Traced, `ValidateCanUpdateChat.ts` + live dev DB):**
  the deleted `GroupChat` feature's gap is carried over unchanged.
  `ValidateCanUpdateChat` (`packages/vu_meet/server/src/domain/VuMeet/Chat/validations/validator/ValidateCanUpdateChat.ts`)
  is a bare `PermissionValidator` for `PermissionType.canUpdateChat` — no
  membership check against `chat_user_map`, no ownership check of any
  kind. `ValidateUpdateChat.getValidators()` composes only this permission
  check plus (as of today, §1.2) `ValidateGroupChatName` — still nothing
  that verifies the actor is actually a member of the chat being updated.
  **So yes: anyone holding `canUpdateChat` can rename or re-member *any*
  chat in the system, not just ones they belong to.**
- **Confirmed 2026-08-24 (live dev DB, `role_permission` table,
  `permission_type = 349`, `scope = 'ALL'`):** `canUpdateChat` is currently
  `ALLOW` only for the super-admin role; every other seeded role was
  explicit `DENY`. (The template's baseline seed now grants no permissions
  at all — see [users.md](../users.md).) So `VU_MEET_USECASES.md`'s claim was accurate as of this check.
  This makes the gap low-severity *today* — only Super Admins can trigger
  it — but two things keep it live: (1) the permission's `scope` column is
  `ALL`, not a chat-scoped value (unlike some other permissions in this
  system that support `OWN`/`TENANT`) — there's no scope value that
  *would* express "only your own chats" even if an admin wanted to grant
  this more broadly; (2) this is admin-configured data (root `CLAUDE.md`),
  so a future role grant is one settings change away, with no code-level
  safety net behind it.

**Fixed 2026-08-25 (decision: membership required for everyone, no
exceptions, including Super Admin):** `ValidateUpdateChat.getValidators()`
now also runs `ValidateIsUserInChat` (`packages/vu_meet/server/src/domain/VuMeet/Core/validations/ValidateIsUserInChat.ts` —
already used by `ValidateStartPrivateCall` for the same shape of check,
despite the "Private" in its name it works for group chats too since it
only checks `chat_user_map` rows), throwing `UserNotInChatException`
if the actor isn't a member of the chat being updated. `ValidateUpdateChatRepo`
widened to also require `IsUserNotInChatRepo`;
`KyselyUpdateChatValidatorStorageRepo` delegates to the existing
`ChatKyselyHelper.isUserNotInChat`. `ValidateUpdateChatDTO`
gained an `id` field (the chat id) to make the check possible — already
available via `UpdateChatController`'s `SaveChatDTO` spread, no controller
change needed. Covered by a new test in `ValidateUpdateChat.test.ts`. This
means the permission grant (`canUpdateChat`) is no longer sufficient on its
own to update an arbitrary chat — membership is now mandatory regardless
of who holds the permission, closing the gap even if the grant is ever
widened beyond Super Admin.

**Correction, found 2026-08-25 (later the same day):** the fix above never
actually took effect in production. `KyselyUpdateChatValidatorStorageRepo`
was written correctly, but `UpdateChatValidatorStorageRepoPicker` mapped
**both** `DBEnv.FAKE` and `DBEnv.KYSELY` to the always-passing
`FakeUpdateChatValidatorStorageRepo` — so the new `ValidateIsUserInChat`
check ran, but against a repo that always answers "user is a member,"
regardless of the real data. This was found during an app-wide sweep
triggered by the `HandleCallActionController` rename (§5.1) turning up the
same picker-wiring bug there. Fixed by wiring the already-existing, already-
correct `KyselyUpdateChatValidatorStorageRepo` into the picker for
`DBEnv.KYSELY`. See known gap #36.

### 1.4 Chat display name / picture resolution

**Traced (`KyselyGetUserChatListInteractorRepo.ts:126-138`,
`KyselyGetChatInfoInteractorRepo.ts`):**

| | Private chat (`isPrivate = true`) | Group chat (`isPrivate = false`) |
|---|---|---|
| Display name | The **other member's** full name (`user.firstName`/`user.lastName`) | `chat.name` (the group's own name field) |
| Picture | The other member's profile picture | `chat.picture` |

- **Resolved 2026-08-25 (decision: enforce it):** the "other member" lookup
  for a private chat joins `chat_user_map` filtered to `userId !=
  actorId`. For a genuinely 2-person chat this is unambiguous, and it turns
  out no *upper*-bound gap actually existed: `is_private` is always
  recomputed as `userList.length < 3` on every write (§1.2), so a chat can
  never end up flagged private with 3+ real members — the ceiling was
  already self-enforcing. The one real gap was the *floor*: nothing stopped
  a request from producing a 1-member chat (all other members removed via
  `UpdateChat`, or an empty `users` list on create), which `is_private`'s
  `< 3` check still happily flags `true` even though the "other member"
  join then has zero rows to match (§1.2's single-member edge case, OQ#28).
  Fixed by a new `ValidateChatMemberCount` validator
  (`packages/vu_meet/server/src/domain/VuMeet/Chat/validations/validator/ValidateChatMemberCount.ts`,
  `MIN_CHAT_MEMBER_COUNT = 2`), wired into both `ValidateGetChatWithUser`
  and `ValidateUpdateChat` alongside the existing `ValidateGroupChatName`
  check, throwing `InvalidChatMemberCountException` (new,
  `packages/core/server/src/domain/Core/Exceptions/invalid/`) whenever the resulting member count
  (including the actor) would be fewer than 2. This makes a "chat with just
  yourself" impossible to create through either write path, which in turn
  makes the `is_private = true` ⇒ exactly-2-members invariant fully
  guaranteed rather than merely usually-true. Covered by new tests in
  `ValidateGetChatWithUser.test.ts` / `ValidateUpdateChat.test.ts`.
  Also added the missing `EmptyGroupChatNameException` translation entry
  (en/de `locales/error/*.json`) while touching this file — it was thrown
  correctly by the 2026-08-24 fix but had no translation, so it would have
  rendered as a raw exception name instead of a user-facing message; spotted
  incidentally, not part of this fix's own scope.

### 1.5 No uniqueness guarantee on chat membership

**Fixed 2026-08-23:** `chat_user_map` had no primary key or unique
constraint on `(chat_id, user_id)` — nothing at the DB level stopped the
same user being inserted twice into the same chat's membership. Resolved by
`packages/vu_meet/server/src/client/VuMeet/migrations/20260826_171_chat_user_map_unique_constraint.ts`,
which adds a unique constraint on `(chat_id, user_id)` (dedupes any existing
duplicate rows first, defensively — none existed in dev, all 6 live rows
survived untouched). Manually verified: a duplicate insert now fails with
MySQL `ERROR 1062 Duplicate entry ... for key
'chat_user_map_chat_id_user_id_unique'` instead of silently succeeding.

**Follow-on, fixed 2026-08-25, two layers:**

1. **Application-level dedup validation (the common case).** Neither
   `ValidateGetChatWithUser` nor `ValidateUpdateChat` checked the
   incoming user-id list for duplicates before it reached the DB — a
   request with a repeated id (or one that already contains the actor,
   who then gets pushed in again by the repo's
   `userList.push(actorId)`/`users.push(actorId)`) would sail through
   validation and hit the unique constraint as a raw DB error. Fixed by a
   new `ValidateNoDuplicateChatMembers` validator
   (`packages/vu_meet/server/src/domain/VuMeet/Chat/validations/validator/ValidateNoDuplicateChatMembers.ts`),
   checking the exact final member list (incoming ids + actor — the same
   set the repo layer inserts) via a `Set` size comparison, wired into both
   validators alongside `ValidateChatMemberCount`. Throws the new
   `DuplicateChatMemberException` (`packages/core/server/src/domain/Core/Exceptions/invalid/`).
2. **DB constraint violation (the genuine race case).** For the case this
   *doesn't* catch — two near-simultaneous requests each independently
   passing dedup validation before either one commits — the insert call
   sites in both `KyselyGetChatWithUserInteractorRepo.load()` and
   `KyselyUpdateChatInteractorRepo.save()` now wrap the
   `chatUserMap` insert in a try/catch, detect a MySQL
   `ER_DUP_ENTRY` (`packages/core/server/src/client/Core/Database/isDuplicateEntryError.ts`),
   and rethrow the same `DuplicateChatMemberException` instead of letting
   the raw driver error propagate. Mapped to HTTP 409 in
   `ErrorFormatterInstance`'s `ErrorToHttpStatusCode`
   (previously unmapped errors fell back to a generic 400 with the raw,
   untranslated driver message in the body — not actually the "raw
   unhandled" 500 originally suspected here, but not a clean message
   either). en/de translations added.

Previously (before today's fix) this was flagged low priority since the
constraint's whole job was to make the race vanishingly rare, not something
users trigger in normal use — the concern was purely about not letting it
be mistaken for "handled" just because the data couldn't get corrupted
anymore. Closing the dedup-validation gap also removes the far more likely
trigger (a malformed or malicious request with a repeated id), leaving only
the true race condition behind the DB catch.

The write-path investigation that led here, for reference — checked both
write paths for an application-layer guard instead: neither
`ValidateGetChatWithUser` (create/get-or-create,
`packages/vu_meet/server/src/domain/VuMeet/Chat/validations/`) nor `ValidateUpdateChat` ran
any uniqueness check on the incoming user-id list — each only did a
permission check. **(No longer true — see the fix above, 2026-08-25: both
now run `ValidateNoDuplicateChatMembers`.)**

**Today's frontend avoids triggering this, but only by accident of UI
design, not by any enforced contract:**
- `create_chat_screen.dart` and `edit_group_modal.dart`'s contact pickers
  both use toggle-based selection (`selectedUsers.any((u) => u.id ==
  user.id)`) that structurally prevents picking the same contact twice.
- For `UpdateChat` specifically: the frontend explicitly filters the actor
  *out* of the selected-contacts list before sending (`chat_info.dart:288`,
  `m.id != currentUserId`), and `KyselyUpdateChatInteractorRepo.save()` adds
  exactly one instance of the actor back in
  (`saveDTO.userList.push(saveDTO.actorId)`) — so the two sides don't double
  up. (Traced this specifically because it looked at first like it would
  always duplicate the actor — it doesn't, given the frontend's contract of
  excluding self.)

**Why this matters despite no current reproduction path:** nothing stops a
duplicate at the API boundary itself. `UpdateChat`'s delete-then-reinsert
pattern is self-healing — a duplicate can't survive a second call — but the
*create* path (`KyselyGetChatWithUserInteractorRepo.load`) does a
single one-time `INSERT` with no self-correction, so a duplicate created
there would be permanent until manually cleaned up. Any future UI bug, a
different client (a web build, an internal API tool), or simply a malformed
request would silently wedge one in. Downstream, a literal duplicate
`(chat_id, user_id)` row would compound §1.4's already-documented risk
(arbitrary "other member" match) and could double-count that user in
unread-count subqueries (§8) or the group-call `numberOfOtherParticipants`
tally (§5.4) — none of which defensively dedupes membership rows today.

**Resolved 2026-08-23:** went with the DB-level unique constraint (see fix
above) rather than interactor-side dedup, since it's authoritative
regardless of caller and protects against a hypothetical second writer,
which dedup-before-insert wouldn't. **Resolved further 2026-08-25:** added
the interactor-side dedup validation anyway — not as a substitute for the
DB constraint, but because it gives a clean, translated 4xx for the common
"duplicate id in the request" case instead of a raw driver error, while the
DB constraint remains the backstop for the genuine concurrent-write race.
See the fix write-up above.

### 1.6 Get chat info — missing membership check, no-op existence check

**Found 2026-08-25**, during the same app-wide sweep that caught §1.3's
picker-wiring bug: `GET` chat info (`GetChatInfoController.ts`, backing
`ValidateGetChatInfo`) had two stacked problems, both now fixed:

1. `ValidateGetChatInfo.getValidators()` only ever checked permission
   (`ValidateCanGetChatInfo`) and chat existence (`ValidateChat`) — **no
   membership check at all**, unlike every other chat-scoped
   action in this module (`ValidateUpdateChat`, `ValidateStartPrivateCall`,
   etc. all check `ValidateIsChatMember`/`ValidateIsUserInChat`).
2. The existence check itself was a no-op in production anyway:
   `GetChatInfoValidatorStorageRepoPicker` mapped both `DBEnv.FAKE` and
   `DBEnv.KYSELY` to the same always-`false` fake, and — worse than
   §1.3's case — the file literally named `KyselyGetChatInfoValidatorStorageRepo.ts`
   was itself just a hand-written stub (`return Promise.resolve(false)`,
   no DB query at all), not a case of a correct implementation existing but
   not being wired in.

**Net effect before the fix:** any authenticated user with `canGetChatInfo`
could fetch full chat info — display name, picture, and the entire member
list with names — for **any chat ID**, whether it existed or not, whether
they were a member or not.

**Fixed 2026-08-25:** widened `ValidateGetChatInfoRepo` to also require
`IsUserNotInChatRepo`; added `ValidateIsChatMember` to
`ValidateGetChatInfo.getValidators()`, matching the pattern used
everywhere else. Wrote a real `KyselyGetChatInfoValidatorStorageRepo`
(delegates to `ChatKyselyHelper.isInvalidChat`/`isUserNotInChat`, same
helper reused throughout this module) and wired it into the picker for
`DBEnv.KYSELY`. `ValidateGetChatInfoDTO` already carried both `actorId`
and `chatId` — no controller change needed. Added test coverage in
`ValidateGetChatInfo.test.ts` (existence-check and membership-check
rejection cases, plus a happy-path case — the file previously only tested
the permission check). Domain's VuMeet test suite: 35/35 suites, 64/64
tests passing. `tsc --noEmit` clean on `client`. See known gap #37.

---

## 2. Messages

### 2.1 Send a text message

- **Endpoint:** `POST /vu-meet/message/` (`CreateMessageController.ts`).
- On save, the controller (Traced, `CreateMessageController.ts`):
  1. Saves the message row.
  2. Sends a **WebSocket** `NEW_MESSAGE_NOTIFICATION` to all other chat
     members (always, unconditionally, platform-agnostic — this is why an
     open tab/app with a live socket "just works" regardless of push
     health; see `docs/decisions.md` push-notification root-cause writeup
     from this same session).
  3. Sends a **push notification** via `NotificationHelper`/`PushNotificationHelper`
     to all other members' registered device tokens.
- **Resolved 2026-08-25 (was: does message content get any server-side
  sanitization/length limit?):** it had none. `ValidateCreateMessage`
  (`packages/vu_meet/server/src/domain/VuMeet/Message/validations/`) ran permission and
  chat-membership checks but never inspected `content` at all — no
  empty-content rejection (unlike `ContentItem`/`ToDoComment`, which
  already reuse the generic `ValidateEmptyContent` validator for their own
  free-text fields), no length cap, no sanitization. This wasn't
  VuMeet-specific — no sanitization/length-limit validator existed
  *anywhere* in the codebase for any feature. **Sanitization risk
  assessed as low despite the gap:** the frontend renders message content
  via a plain Flutter `Text()` widget
  (`text_message_bubble.dart`) — no markdown/HTML parsing — so there's no
  stored-XSS path from unsanitized content; the actual product gap was
  purely the missing empty/length checks. **Fixed:** `ValidateCreateMessage`
  now also runs `ValidateEmptyContent` (reused, throws the existing
  `EmptyContentException`) and a new generic `ValidateMaxLength` validator
  (`packages/core/server/src/domain/Core/Validations/Validators/ValidateMaxLength.ts`, reusable
  for any string field) with a 5000-character cap defined as
  `MAX_MESSAGE_CONTENT_LENGTH` in `ValidateCreateMessage.ts`, throwing the
  new `ContentTooLongException`. **Applies uniformly to all message types,
  including file/picture messages** — verified this is safe: the frontend
  sends the file's name as `content` for file sends
  (`conversation_view.dart`: `content: file.name`), never an empty string,
  so the empty-content check doesn't collide with file uploads. Translated
  (en/de). Domain tests added and passing. General sanitization/length
  validation being absent project-wide (not just for VuMeet) is a broader
  convention question, not something addressed here.

### 2.2 Send a file/image message

- Same endpoint, multipart. `VuMeetFileHelper.ts` + `FileHelper`/`FileMetadataDTO`
  handle storage (not yet traced in depth this pass).
- Attachments are limited to `VU_MEET_MAX_FILE_SIZE_MB` (multer + validator),
  the value the app is shown as the module's `clientConfig.maxFileSize` — not
  core's `MAX_FILE_SIZE_MB`.
- **Confirmed and fixed 2026-08-25 (was: inherited known gap, unverified —
  file download possibly `SUPER_ADMIN`-only):** queried the live
  `role_permission` table directly (not just doc text, per root
  `CLAUDE.md`'s guidance that permission grants are admin-configured data).
  `canGetVuMeetFile` (permission type `347`,
  `packages/core/server/src/domain/Core/Permission/PermissionType.ts:343`) was seeded
  Super-Admin-`ALLOW` / explicit-`DENY` for all 6 other roles in
  `20260713_032_seed_role_permission.ts` — confirmed still the live state.
  Every other VuMeet permission (`canCreateMessage`, `canGetChat`)
  is broadly allowed to all roles, so this was a real, unintentional
  asymmetry: **any non-admin user could send/receive a file in chat but
  not download/view it.** Fixed by a new migration
  (`packages/core/server/src/client/Core/Database/migrations/20260825_160_grant_vu_meet_file_download_all_roles.ts`)
  granting `ALLOW` to the 6 previously-denied roles, following the same
  pattern as `20260820_152_reenable_todo_feature_for_all_roles.ts`. Ran
  against the dev DB and verified all 7 roles now `ALLOW`; also manually
  verified the `down()` migration correctly reverts to the original
  Super-Admin-only state before restoring the fix.
- **Resolved 2026-08-25 (was: is 10MB the intended limit, is the rejection
  message clear?):** the live `MAX_FILE_SIZE_MB` env var (`.env`/`.dist.env`)
  is actually **1**, not the 10 assumed by this question — the `10`
  is only a code-level fallback (`KyselyCreateMessageValidatorStorageRepo.ts`)
  that never applies since the var is set. Left the value itself alone (a
  product/ops config choice, not something to change without being asked)
  but found and fixed a real bug in how a size rejection surfaces:
  - `MessageRouter.ts` wires `MulterFileMiddleware.single(...)`, which
    enforces the same `MAX_FILE_SIZE_MB` limit at the multipart-parsing
    layer — **before** the request ever reaches
    `ValidateCreateMessage`/`ValidateFileSize`. For a genuinely oversized
    file, multer's own `LIMIT_FILE_SIZE` error always fires first (same
    threshold), so the domain-level `InvalidFileSizeException` path was
    effectively dead code for this endpoint in practice.
  - Neither `InvalidFileSizeException` nor multer's raw error had an
    `ErrorToHttpStatusCode` entry, so both fell back to a generic 400 —
    and `InvalidFileSizeException` had no translation at all (empty
    message body). The frontend's dedicated "file too large" dialog
    (`conversation_view.dart`) only triggers on HTTP **413**, so a real
    server-side rejection showed as an unclear generic failure instead of
    that dialog.
  - **Fixed both layers:** added `'InvalidFileSizeException': 413` to
    `ErrorToHttpStatusCode` (`ErrorFormatterInstance.ts`) with en/de
    translations, and normalized multer's raw `LIMIT_FILE_SIZE` error into
    `InvalidFileSizeException` in the global Express error handler
    (`App.ts`) before it reaches the formatter — so the one real path
    (multer's own limit) now produces the same clean, translated 413 the
    frontend's dialog logic already expects.
  - Not covered by an automated test: the client repo's jest suite is
    broadly broken pre-existing (module resolution for `@domain/*` in
    `jest.config.js`, unrelated to this fix, confirmed via `git stash`) —
    verified via `tsc` and manual code review instead.
- **Found and fixed 2026-08-25 (you reported it):** a file/picture
  message's "last message" preview — both the chat list row and the
  `NEW_MESSAGE_NOTIFICATION` push/WS payload — showed the raw filename
  instead of a generic label. Root cause: `chat` only ever cached the
  last message's raw `content`, never its `type`, so
  `MessageContentFormatter.formatContent()` (shared by the chat-list and
  notification preview code paths) had no way to know a "message" was
  actually a filename. Added a `last_message_type` column
  (migration `20260825_166_chat_last_message_type.ts`, backfilled
  existing rows to `TEXT`), set it alongside `last_message` in
  `KyselyCreateMessageInteractorRepo.save()`, and added a `type` field to
  `formatContent`'s input that returns a translated "Sent a file" label
  for `FILE`/`PICTURE` content instead of the raw filename. **Deliberately
  did not** apply this inside the actual in-chat message list
  (`GetMessageListPresenter.ts`) — `messageContent` there is used
  directly as the real filename to fetch/render the attachment
  (`image_message_bubble.dart`), so that call site
  now explicitly bypasses the new substitution the same way it already
  did for `CALL_EVENT`. `tsc --noEmit` clean; migration run and verified
  against the dev DB. Not covered by an automated test (no test coverage
  existed for any of the three files touched). See known gap #41.

### 2.3 Message list / pagination

- **Endpoint:** `POST /vu-meet/message/list` (paged by
  `beforeDate`/`afterDate` — `GetMessageInputDTO`, relocated this session to
  `packages/vu_meet/server/src/domain/VuMeet/Message/interactor/dto/GetMessageInputDTO.ts`).
- **Resolved 2026-08-25 (was: page size / infinite-scroll open question):**
  - **Page size is 20** (`packages/core/server/src/client/Global/Preferences.ts`'s
    `getVuMeetMessageLimit()`, a `return 20` — named accessor, but the
    value itself is a hardcoded literal, not env/config-driven), applied
    via `.limit(Preferences.getVuMeetMessageLimit())` in
    `KyselyGetMessageListInteractorRepo.ts`.
  - **Seamless infinite scroll, no visible "load more" button.**
    `message_feed.dart` wraps a `reverse: true` `ListView.builder` in a
    `NotificationListener<ScrollNotification>` that dispatches
    `GetOlderVuMeetMessages()` once scroll position gets within 50px of
    the end. A small inline spinner (`DTRingLoader.inline()`) appears as
    the last list item while `state.isLoadingOlder`.
  - **Only `beforeDate` is ever actually sent — `afterDate` is plumbed
    end-to-end (DTO → repo interface → Kysely query) but dead in
    practice.** `VuMeetMessageBloc` has three call sites:
    initial chat load and the websocket-triggered "new message" refetch
    both call with no dates (re-fetch the latest page), and
    "load older" calls with `beforeDate` only. Nothing ever populates
    `afterDate`. Pagination is exclusively backward (older messages);
    "catch up after being offline" is handled by refetching the newest
    page rather than by an `afterDate`-based forward fetch. Not flagged as
    a bug — just noting the parameter is unused so it doesn't get mistaken
    for load-bearing.

### 2.4 Search

- **Global search** (`GET /vu-meet/search`, all chats) — **Known gap, found
  and fixed this session:** the query previously joined against the dead
  legacy `private_chat`/`group_chat`/`group_message` tables and returned
  **zero results for every real chat** created through the live flow
  (`KyselyGetSearchAllMessagesListInteractorRepo.ts`, rewritten 2026-08-21 —
  see `docs/decisions.md#2026-08-21`). This is now fixed but **has not been
  manually tested end-to-end in a running app** — flagging as unverified,
  not just "fixed in theory." **More precisely (2026-08-25): the backend
  fix can't currently be exercised through the app at all** — see below,
  the frontend doesn't call this endpoint (or the per-chat one) anywhere.
- **Resolved 2026-08-25 (was: does a per-chat search endpoint still exist
  post-consolidation? is `group-message/search` now a broken frontend call
  site?):** `POST /vu-meet/message/search` → `SearchMessagesInChatController`
  is registered and correctly mounted
  (`packages/vu_meet/server/src/client/VuMeet/Message/router/MessageRouter.ts`). `group-message`
  does not appear anywhere in `client` — not as a live route, not as
  orphaned dead code; it's simply gone, consistent with `GroupMessage`
  having been deleted. **No broken call site exists, but only because the
  frontend never calls either search endpoint at all** — grepped the whole
  frontend tree for `VuMeet/search`, `message/search`,
  `SearchMessagesInChat`, `group-message`: zero hits.
  `vu_meet_message_remote_source.dart` has no `search` method. The only
  "search" UI in the whole feature is the chat-info panel's "Search"
  button, already documented in §9.2 as one of several visibly-present,
  wired-to-nothing controls (`onTap: null`) — there's no separate
  "search this chat" or "search all chats" screen anywhere in the
  frontend. So: **search is not a regression from the consolidation, it's
  simply unimplemented in the UI** — both server endpoints (global and
  per-chat) are sitting unused. See §9.2 for the open question on whether
  this and the other stubbed chat-info controls are planned work or
  should be hidden.

---

## 3. Typing Status

### 3.1 Current behavior (Traced)

- **Client → server:** `MessageInput` (`message_input.dart`) debounces:
  on every keystroke, if not already "typing," fires `onTypingStatusChanged(true)`
  immediately; a 2-second inactivity timer then fires `onTypingStatusChanged(false)`.
  Clearing the input field also immediately stops typing. This is a **pure
  client-side timer** — there is no server-driven typing-timeout; if the
  client's timer never fires (app killed mid-type, network drop), the
  recipient could see a stuck "typing…" indicator forever until the next
  real event corrects it.
- **Endpoint:** `POST /vu-meet/chat/typing-status`
  (`SendChatTypingStatusController` — the deleted
  `SendGroupChatTypingStatus`'s dead twin used to exist at
  `/vu-meet/group-chat/typing-status`; group chats use this same
  endpoint post-consolidation, since it's chat-id-scoped, not
  private-vs-group-scoped).
- **Resolved 2026-08-25 (was: does typing-status delivery actually reach
  every group-chat member, or is it a 1:1 leftover?):** **server-side
  delivery is correct, no bug here.** `KyselySendChatTypingStatusRepo.send()`
  queries every row in `chat_user_map` for the chat (no `LIMIT`, no
  singular `otherUserId`-style field) and loops over all of them, sending
  to each member except the actor. This is a separate implementation from
  `NEW_MESSAGE_NOTIFICATION`'s "get other participants" repo — not shared
  code — but functionally equivalent: both correctly enumerate every other
  member. `webSocketHelper.sendTypingStatusMessage` itself already takes a
  recipient-ID array, i.e. it was always broadcast-capable.
- **Delivery:** WebSocket `TYPING_STATUS` event
  (`webSocketHelper.sendTypingStatusMessage`), consumed by
  `VuMeetMessageBloc._handleTypingStatus`.
- **Traced 2026-08-25 (was: handler not yet traced in depth):**
  `_handleTypingStatus` reads `chatId`, `typingStatus`, and `userName` from
  the payload — **notably, it never reads `userId`** — and dispatches an
  update that unconditionally overwrites `VuMeetMessageState.typingStatusModel`,
  a single nullable field, regardless of which chat the event is for. There's
  no check against the currently-selected chat at the state-update layer
  (unlike `_handleNewMessageNotification`, which does check) — filtering by
  chat happens only downstream, in the `TypingIndicator` widget's render
  condition (`state.typingStatusModel?.chatId == chatId`). This is
  currently harmless (a background chat's typing event gets silently
  overwritten and simply never rendered, since the open chat's widget
  re-checks `chatId`), but it means the bloc itself has no notion of
  "typing state per chat," only "the single most recent typing event
  received, chat-filtered at render time."
- **Display:** `TypingIndicator` widget shows `"{userName} {TYPING}"` in
  italic, bold, primary-color text, only when `state.typingStatusModel?.chatId == chatId`.
  For a **group chat**, this model only tracks a single `userName` — **known
  gap, confirmed structural, not just a display choice:** since neither the
  bloc's state shape nor the payload it reads (`userId` isn't even parsed)
  tracks *which* member is typing beyond a name string, if two members of
  the same group chat type simultaneously, the second person's event
  simply clobbers the first's — there is no "and 2 others" aggregation and
  no way to add it without first threading `userId` through and changing
  `typingStatusModel` from a single slot to something keyed per-sender.
  **Still needs a product decision** (unchanged from before this session's
  trace, now with the exact mechanism confirmed): is "N people typing"
  support in scope, or is "last person to type wins" acceptable? Not
  implemented here since it's a design/product call, not a bug.

### 3.2 The requested animation (implemented 2026-08-25)

You asked for: *"an animation that is a smooth transition between typing
indicator and new message appearing."*

**Design decisions made 2026-08-25** (this had no prior spec — the three
open questions below were resolved by asking, not inferred):
1. **Crossfade**, not morph — the indicator fades out while the incoming
   bubble fades in; no shape continuity/stretching.
2. **Only animates when a message arrives while the typing indicator is
   actively showing** — i.e. `NEW_MESSAGE_NOTIFICATION` for the open chat
   arriving before the sender's 2s inactivity timeout (or explicit
   stopped-typing-on-send) would have cleared it. A plain timeout with no
   following message still disappears instantly, no special animation.
3. **Both** the open conversation view *and* the chat list — the chat list
   previously had zero typing awareness at all (`ChatListBloc` didn't
   subscribe to `TYPING_STATUS`, only `TYPING_STATUS`-blind events);
   wiring that in was new plumbing, not just an animation.

**Implementation:**
- **Conversation view crossfade:** `VuMeetMessageState` gained
  `justArrivedMessageId` (which message, if any, just replaced a live
  typing indicator) alongside the existing `typingStatusModel`.
  `VuMeetMessageBloc._handleNewMessageNotification` now checks whether the
  typing indicator was active for this chat at the moment the notification
  arrives; if so, `GetNewVuMeetMessage` carries `animateFromTyping: true`,
  and `_onGetNewMessage` sets `justArrivedMessageId` to the newest
  message's id while clearing `typingStatusModel` in the same emit.
  `TypingIndicator` fades out over `typingToMessageCrossfadeDuration`
  (250ms, a shared constant) only while `justArrivedMessageId != null`
  (instant `Duration.zero` otherwise, preserving the plain-timeout case).
  `MessageFeed` fades in the specific arriving bubble
  (`TweenAnimationBuilder<double>`, same 250ms) when its id matches
  `justArrivedMessageId`. A new `ClearJustArrivedMessage` event
  (dispatched from a `BlocListener` in `ConversationView`, ~300ms after
  the flag is set) resets the one-shot flag so a later, unrelated
  typing-stop in the same chat goes back to instant disappearance.
- **Chat list "typing…" preview:** `ChatListBloc` now also subscribes to
  `TYPING_STATUS` (previously only `CHAT_LIST_UPDATED` /
  `REMOVED_FROM_GROUP_CHAT` / `NEW_MESSAGE_NOTIFICATION`), maintaining a
  local `Map<chatId, userName>` in `ChatListState.typingByChatId` —
  updated directly from the WebSocket event, no REST round-trip (unlike
  the existing `NEW_MESSAGE_NOTIFICATION` handling, which does trigger a
  refetch — typing fires far more often per keystroke-adjacent activity,
  so a local map update keeps it responsive without hammering the
  backend). `chat_list.dart` swaps in `translation.TYPING` for
  `lastMessage` when a chat has an active entry, following the same
  `chat.copyWith(lastMessage: ...)` pattern already used for the
  empty-group-name fallback. `ChatListItem` renders this preview in
  italic/primary-color/semi-bold, matching `TypingIndicator`'s existing
  visual language, via a new optional `isTyping` param.
- **Verification:** `dart analyze` clean (0 errors, 0 warnings) across the
  whole app; `flutter build web --release` compiles successfully. **Not
  interactively verified** — confirming the actual crossfade timing/feel
  needs two simultaneous logged-in sessions (one typing, one receiving)
  against a live backend, which wasn't set up this pass. Same caveat as
  other frontend-touching work this session: static verification only.

---

## 4. Seen / Read Status

### 4.1 Current behavior (Traced)

- **Mark as seen:** `GET /vu-meet/chat/mark-seen/:chatId`
  (`MarkChatMessagesSeenController`), live-wired to
  `KyselyMarkChatMessagesSeenInteractorRepo.ts` (renamed this session
  from `KyselyMarkChatMessagesSeenInteractorRepo`). **Traced in full
  2026-08-25 — does two separate things, only one of which feeds `isSeen`:**
  1. `INSERT INTO message_seen ... WHERE chat_id = ? AND sender_id != ?`
     (one row per message per user who's seen it, correctly excluding the
     opener's own messages, `ON CONFLICT DO NOTHING`). This table is
     genuinely per-recipient — but **nothing reads it for `isSeen`**; its
     only readers today are unread-*count* queries
     (`KyselyCountUnreadNotificationsInteractorRepo`,
     `KyselyGetUnreadMessageCountForUserInteractorRepo`,
     `KyselyGetUserChatListInteractorRepo`), not the message list.
  2. `UPDATE message SET seen = true WHERE chat_id = ? AND sender_id
     != ? AND seen = false` — a **single shared boolean per message**, not
     per-recipient, with **no branching on chat size anywhere** in this
     query or in `KyselyGetMessageListInteractorRepo`. This is what
     `GetMessageListPresenter` actually reports as `isSeen`
     (`Boolean(message.seen)`).
- **Display, 1:1 chat:** `MessageSeenStatus` renders a double-checkmark icon
  — filled/primary-colored when `isSeen`, dim/secondary when not, invisible
  (`Colors.transparent`) while `isSending`. No "sent but not delivered yet"
  intermediate state is visually distinguished from "sent and delivered but
  not seen."
- **Resolved 2026-08-25 (decision: binary is the intended model, not
  built):** asked whether the sent/delivered/seen three-state distinction
  (WhatsApp single-tick/double-tick/blue-tick) should be built. **No** —
  there's no delivery-receipt signal server-side today (no "delivered"
  event distinct from "sent"), so this would mean new backend
  infrastructure, not a frontend-only tweak. Left as-is; not implemented.
- **Corrected 2026-08-25, was "Known gap" (hardcoded English strings
  bypassing translation) — turned out to be dead code, not a live bug, now
  deleted.** The text-based `SeenStatus` widget
  (`messageBubbleModel.getSeenStatus()` → `interpretSeenStatus(bool)` →
  literal `"Seen"`/`"Not seen"`) was never constructed anywhere in the
  app — the only seen-status indicator actually rendered is the
  icon-based `MessageSeenStatus` above, which has no text at all. Checked
  before assuming "unused → safe to delete": `MessageModel` (the class
  `SeenStatus` depended on) had zero other callers either — its whole
  reason to exist was this dead widget. Deleted `seen_status.dart`,
  `message_model.dart`, and the now-unused `interpretSeenStatus()`
  (`packages/core/flutter/lib/src/utils/helper_functions.dart`). No translation gap
  ever reached a real user; the doc previously overstated this as a live
  i18n bug.
- **Fixed 2026-08-25 — group-chat `isSeen` is actively misleading, not just
  imprecise, so it's now hidden entirely for group chats.** Per the
  full trace above: because `message.seen` is one shared boolean per
  message, the moment **any single** recipient opens a group chat, the
  `UPDATE` marks *every* message the sender sent as `seen = true` — for
  everyone, permanently — regardless of the other recipients. Concretely,
  in a 5-person chat (1 sender + 4 recipients), if just 1 of the 4 opens
  the chat, the sender's double-checkmark flips to "seen" even though 3 of
  4 recipients never have. This is worse than "can't show partial state"
  — it actively reports full-group seen off a single opener. **Decision:
  disable the seen-status indicator for group chats for now**, rather than
  build correct per-recipient tracking immediately (`message_seen`
  already has the right per-user data, but wiring it into the message-list
  query and redesigning the UI for "seen by N of M" is real feature work,
  not a quick fix — left for later). Implemented in
  `MessageItemContainer` (`packages/vu_meet/flutter/lib/src/presentation/components/message/`):
  `showSeenStatus` now also requires `isPrivate`. **Found and fixed the
  same bug's second occurrence while there:** the `MessageSeenStatus`
  rendered inside the "timestamp visible" branch wasn't gated on
  `showSeenStatus` at all — it rendered unconditionally regardless of
  `isOwn`/`isLatestMessage` (and would still have leaked the misleading
  group-chat indicator through whenever a message's timestamp was tapped
  visible, undermining the fix above if left alone). Now both render sites
  share the one `showSeenStatus` check. Per-member group seen-status
  ("seen by 3 of 5", or by name) — the actual long-term fix — remains
  explicitly out of scope for this pass: it needs the message-list query
  to return a seen-by set instead of a boolean, plus new frontend UI. The
  dead `interpretSeenStatus` branch that used to hint at this (a
  `seen is List<String>` case, unreachable since
  `VuMeetMessageItemModel.isSeen` is a plain `bool`) is gone along with
  the rest of that dead code (see above) — if this gets built later, it
  starts from `message_seen`'s existing per-user rows, not from
  resurrecting that branch.

### 4.2 Edge cases — open

- ~~What happens to `isSeen` when a message is sent to a group and *some*
  but not all members have opened the chat? Does the sender's own bubble
  show "seen" as soon as *any one* member has seen it, or only when *all*
  have?~~ **Resolved 2026-08-25:** *any one* — `isSeen` flips true the
  moment a single recipient opens the chat, group-wide, permanently. Now
  moot for the UI: the seen-status indicator is hidden entirely for group
  chats as of this session (see §4.1). The underlying backend behavior is
  unchanged (`message.seen` still flips on any-one-opens) — only the
  frontend indicator was disabled, since the real fix (per-recipient
  tracking) is separate, deferred work.
- ~~Does opening a chat mark **all** unread messages as seen, or only the
  ones currently visible in the viewport (relevant for very long unread
  backlogs)?~~ **Resolved:** all of them — `MarkChatMessagesSeenController`
  takes only a `chatId`, no message-id range; it's an all-or-nothing "mark
  everything in this chat seen" operation regardless of scroll position.
  Standard chat-app behavior, not flagged as a gap.

---

## 5. Calls

This is the most complex subsystem and the one you called out as broken.
Documenting current (post-fix, this session) behavior in full.

### 5.1 Unified private/group call model

**Renamed 2026-08-25:** `HandlePrivateCallActionController` →
`HandleCallActionController` (folder `HandlePrivateCallAction` →
`HandleCallAction`, plus its DTO/repo-picker/fake/Kysely siblings) — the
"Private" in the old name was stale, left over from before the
`PrivateChat`→`Chat` rename earlier this session (§1); the controller has
always handled both private *and* group calls, as this section describes.
`ValidateStartPrivateCall`/`canStartPrivateCall`/`ValidateStartPrivateCallRepo`
were deliberately left alone — those really are private-call-specific
(used only for the `isPrivate` branch), a different, still-meaningful
distinction from the controller's own name.

**Found and fixed while renaming — a real production bug, same pattern as
the group-call one already fixed this session:**
`HandleCallActionValidatorStorageRepoPicker` (the private-call branch's
validator storage repo) mapped **both** `DBEnv.FAKE` and `DBEnv.KYSELY` to
the same always-passing fake (`isInvalidChat`/`isUserNotInChat` both
hardcoded to return `false`) — meaning `ValidateStartPrivateCall`'s
`ValidateChatExists`/`ValidateIsChatMember` checks were a complete no-op
in production. Any authenticated user could start/act on a "private call"
against **any chat ID**, including ones that don't exist or that they're
not a member of. Added `KyselyHandleCallActionValidatorStorageRepo`
(reusing `ChatKyselyHelper.isInvalidChat`/`isUserNotInChat`, the same
pattern as `KyselyStartGroupCallValidatorStorageRepo`) and wired it in for
`DBEnv.KYSELY`. `tsc --noEmit` clean. See known gap #35.

Also renamed `DeclineCall/dto/HandlePrivateCallActionReqBodyDTO.ts` →
`DeclineCallReqBodyDTO.ts` (it exported `DeclineCallReqBodyDTO`, not
anything call-action-related — a stale filename from the same era).

**Also moved 2026-08-25 (same stale-location issue, different shape):**
you asked why `StartGroupCallValidatorStorageRepoPicker` still lived
under `VuMeet/GroupChat/` when the `GroupChat` feature itself was deleted
earlier this session and everything unified onto `Chat`. Unlike
`HandlePrivateCallAction`, the class names here (`ValidateStartGroupCall`,
`StartGroupCallValidatorStorageRepoPicker`, etc.) are accurate — this
really is the group-call-only branch, distinct from
`ValidateStartPrivateCall` — so only the *location* was stale, not the
names. Moved (on both `domain` and `client`, `git mv`, no renaming):
`packages/vu_meet/server/src/domain/VuMeet/GroupChat/{validations,repository}` →
`packages/vu_meet/server/src/domain/VuMeet/Chat/{validations,repository}`;
`packages/vu_meet/server/src/domain/__tests__/VuMeet/GroupChat/` →
`packages/vu_meet/server/src/domain/__tests__/VuMeet/Chat/`; `packages/vu_meet/server/src/client/VuMeet/GroupChat/StartGroupCall/`
→ `packages/vu_meet/server/src/client/VuMeet/Chat/StartGroupCall/`. The old `VuMeet/GroupChat`
folders no longer exist in either repo. Updated all import paths (plain
path substitution, no identifiers changed) and `docs/modules/group-chat.md`'s
own reference to the new location. `tsc --noEmit` clean on `client`;
domain's VuMeet test suite: 35/35 suites, 64/64 tests passing (including
`ValidateStartGroupCall.test.ts` at its new path).

**Found and moved, same pass:** you spotted a second leftover —
`packages/vu_meet/server/src/domain/VuMeet/GroupMessage/repository/` still held
`IsInvalidGroupChatRepo.ts`/`IsUserNotInGroupChatRepo.ts`, the two repo
interfaces `ValidateStartGroupCallRepo` extends (used, in turn, by the
generic `ValidateGroupChat`/`ValidateIsUserInGroupChat` validators in
`Core/Validations/Validators/` — those two stay put, they're correctly
placed generic validators, not feature-folder leftovers). Moved both
interfaces into `packages/vu_meet/server/src/domain/VuMeet/Chat/repository/` alongside
`ValidateStartGroupCallRepo.ts`; updated the 3 importing files. The old
`VuMeet/GroupMessage` folder no longer exists. `tsc --noEmit` clean on
`client`; domain VuMeet suite 35/35 suites, 64/64 tests passing.

**Resolved further, same conversation (decision: unify, they were genuine
duplicates, not just correctly-placed generic validators as first
assumed):** on closer look, `ValidateGroupChat`/`ValidateIsUserInGroupChat`
turned out to be byte-for-byte functional duplicates of
`ValidateChat`/`ValidateIsChatMember` — same exceptions
(`InvalidChatException`/`UserNotInChatException`), same logic, differing
only in method names (`isInvalidGroupChat` vs `isInvalidChat`, etc.) left
over from when group chats were a separate entity. `ValidateStartGroupCall`
now uses the shared `ValidateChat`/`ValidateIsChatMember` validators and
`ValidateStartPrivateCallRepo` interface directly — the same ones
`ValidateStartPrivateCall` already used. **Deleted entirely:**
`ValidateStartGroupCallRepo.ts`, `IsInvalidGroupChatRepo.ts`,
`IsUserNotInGroupChatRepo.ts`, `ValidateGroupChat.ts`,
`ValidateIsUserInGroupChat.ts`. Client-side `FakeStartGroupCallValidatorStorageRepo`/
`KyselyStartGroupCallValidatorStorageRepo`/`StartGroupCallValidatorStorageRepoPicker`
kept (still a distinct DI wiring point used by `DeclineCallController`
and `HandleCallActionController`'s group branch) but retyped to implement
`ValidateStartPrivateCallRepo`'s `isInvalidChat`/`isUserNotInChat` instead
of the deleted group-specific method names —
`KyselyStartGroupCallValidatorStorageRepo` already forwarded to the same
`ChatKyselyHelper` methods either way, so this is a pure rename, no
behavior change. Updated `ValidateStartGroupCall.test.ts` accordingly and
added a membership-check test case (previously untested). `tsc --noEmit`
clean on `client`; domain VuMeet suite 35/35 suites, 65/65 tests passing.
See known gap #39.

**Traced (`HandleCallActionController.ts`):** despite living under
`Chat/`, this single controller handles **both** 1:1 and group calls,
branching on `chatInfo.isPrivate`:

- `POST /vu-meet/chat/call` — one endpoint for `START_CALL`,
  `CALL_ACCEPTED`, `END_CALL`, `TIMEOUT_CALL` (all via one `CallAction`
  enum body field). **`DECLINE_CALL` is handled by a *separate* controller**
  (`DeclineCallController.ts`, `POST /vu-meet/chat/decline-call`).
  **Resolved 2026-08-25 (decision: keep the separate controller, fix the
  missing validation):** asked whether to fold `DECLINE_CALL` into the
  shared `HandleCallActionController` switch or keep it separate.
  Kept separate — decline has its own escalation logic
  (`numberOfDeclinedCalls` from the request body decides "declined" vs.
  "terminate", which doesn't map cleanly onto `HandleCallActionController`'s
  action-keyed `getNotificationData()`) and merging would mean reshaping
  `DeclineCallReqBodyDTO` plus the frontend call site for a
  cosmetic-inconsistency fix, in an already call-flow area with several
  acknowledged fragile edges this session. **The actual bug — no
  permission or membership check at all on the decline endpoint — is
  fixed independently of that decision:** `DeclineCallController` now runs
  the exact same `ValidateStartPrivateCall`/`ValidateStartGroupCall` check
  as its sibling, gated on `chatInfo.isPrivate`.
- **Found and fixed while adding that validation, 2026-08-25 — a more
  serious pre-existing bug in the sibling controller itself:**
  `HandleCallActionController.getResponse()` called
  `this.next(validationResult)` on a validation failure but had **no
  `return` afterward** — since `this.next` is just Express's plain
  `NextFunction` (confirmed in `BaseController`), calling it doesn't halt
  execution. The function kept running regardless: sending the push
  notification, the WebSocket call broadcast, saving the call-event
  message, and updating the group-call roster — then attempting a
  *second* `response.send()` on top of whatever the error middleware
  already sent. **Net effect: every validation check on this endpoint
  (permission denied, not a chat member) was silently non-blocking** — the
  call action's side effects fired to every other participant regardless.
  Added the missing `return;` in both this controller and the new
  `DeclineCallController` code (written correctly from the start, not
  copied with the bug).
- For a **private** call: validated via `ValidateStartPrivateCall`
  (membership + permission check against `chat`/`chat_user_map`
  via `ChatKyselyHelper`).
- For a **group** call (`chatInfo.isPrivate == false`): validated via
  `ValidateStartGroupCall` — this domain validator was **kept alive this
  session** specifically because it's actually used here (everything else
  under the old `GroupChat` tree was dead and deleted). Its storage repo
  (`StartGroupCallValidatorStorageRepoPicker`) was, until this session,
  wired to an **always-passing fake** in production
  (`FakeStartGroupCallValidatorStorageRepo` — `isInvalidGroupChat` and
  `isUserNotInGroupChat` both hardcoded to return `false`) — meaning group
  call membership/existence validation was a silent no-op in production
  until fixed this session (now backed by
  `KyselyStartGroupCallValidatorStorageRepo`, reusing the same
  `chat`/`chat_user_map` checks as private chat).

### 5.2 Signaling delivery — dual channel

**Traced:** every call action dispatches over **both** channels,
unconditionally, for the same event:

1. **Push** — `NotificationHelper.sendVuMeetCallPushNotification(tokenList, notificationData)`,
   which ultimately calls `PushNotificationHelper.send()` (Firebase Admin
   SDK). This channel was completely broken for every platform because the
   backend's `FIREBASE_ADMIN_KEY_FILE` pointed at Firebase project
   `vukmark-63f3e` while the Flutter app (per
   `frontend/android/app/google-services.json`) is registered under a
   different project, `vukmark-349aa` — apparently created when the app's
   package name was changed. FCM tokens are project-scoped, so every send
   failed. **Resolved 2026-08-25:** `FIREBASE_ADMIN_KEY_FILE` in
   `apps/copor/server/.env` and `apps/copor/server/.dist.env` now points at a
   `vukmark-349aa` service-account key; the key file itself is gitignored
   (`*firebase-adminsdk*.json` in the root `.gitignore`), not committed.
2. **WebSocket** — `webSocketHelper.sendVuMeetCallNotification(otherUsersInChat, chatInfo.isPrivate, notificationData)`,
   event name `PRIVATE_CALL` or `GROUP_CALL` depending on `isPrivate`.
   Received by `NotificationService.initCallSignaling()`
   (`packages/core/flutter/lib/src/utils/push_notification/notification_service.dart`),
   wired at app startup (`main.dart` → `initialisePushNotifications()`), so
   it's live app-wide, not scoped to the VuMeet module screen.

Both payloads are **structurally identical** (`SendVuMeetCallPushNotificationDTO`)
— the frontend parses a call event the same way regardless of which channel
delivered it (comment in `HandleCallActionController.ts` confirms
this is deliberate redundancy, not two different event shapes).

**The practical implication (now resolved):** since WebSocket delivery only
works while the app has a live socket connection (foregrounded, or
backgrounded-but-still-connected depending on OS), and push was broken,
calls to a backgrounded/killed app likely didn't work at all — this was
presumably part of what you experienced as "doesn't receive a call." The
WebSocket channel is *not* a substitute for push when the app isn't running;
native call UI (CallKit/Telecom, see 5.5) can only be triggered by push in
that state. With the credential fix above, push should now reach backgrounded
and killed apps as intended.

**Verified 2026-08-25 against a live device:** server logs confirm
`Firebase push result: { targetedDeviceCount: 2, deliveredDeviceCount: 2,
failedDeviceCount: 0, failureCodes: [] }` for a real call push — delivery
now works end-to-end.

**New gap found during verification (fixed 2026-08-25):** the push
*arrived*, but handling it inside `firebaseMessagingBackgroundHandler`
(`frontend/lib/main.dart`) triggered `AuthenticationTokenNotFound` errors
server-side. That handler is a separate Dart isolate spun up per-push; it
calls `di.init()` to rebuild the DI container but never re-ran
`addInterceptors(di.getIt<Dio>())` the way `main()` does on normal startup.
So any HTTP call made from that isolate (`CallKitService`/`CallBloc`
reconciling the incoming call) went out on a bare `Dio` instance with no
`TokenInterceptor`/`ServerUrlInterceptor` attached — no `Authorization`
header at all. Fixed by adding the same `addInterceptors(...)` call right
after `di.init()` in the background handler. See known gap #25.

**Related fix (fixed 2026-08-25):** while chasing the above, found
`JwtAuthenticationMiddleware.authenticate` mapped every missing-token
request to `HttpStatusCode.INTERNAL_SERVER` (500) instead of `UNAUTHORIZED`
(401) — inconsistent with `handleTokenError`, which already correctly uses
401 for expired/invalid tokens. Fixed to 401. See known gap #26.

### 5.3 Call action semantics

| `CallAction` | Meaning | Who sends it | Push `type` | In-chat message content |
|---|---|---|---|---|
| `START_CALL` | Caller initiates | Caller | `incoming_call` | *(none saved — see below)* |
| `CALL_ACCEPTED` | Callee answers | Callee | `call_accepted` | `CALL_ACCEPTED` |
| `END_CALL` | Either side hangs up after connecting | Whoever ends it | `end_call` | `END_CALL` |
| `TIMEOUT_CALL` | Ring timed out (30s) with no answer, or caller manually cancels while still ringing | Caller (`CallBloc.callTimeoutDuration`) | `timeout_call` | `TIMEOUT_CALL` |
| `DECLINE_CALL` | Callee explicitly declines | Callee | `decline_call` or `terminate_call` (see 5.4) | `DECLINE_CALL` |

**Traced (`HandleCallActionController.getResponse()`):**
`if (action !== START_CALL) { saveMessage(); sendNewMessageNotification(); }`
— **no in-chat "call started" message is ever saved.** The chat only records
what happened *after* the fact (accepted / ended / timed out / declined),
never the initial ring.

**Resolved 2026-08-25 (decision: keep current behavior, delete dead code):**
intentional — the chat should only record outcomes, not every outbound call
attempt (avoids clutter from unanswered/cancelled calls). Removed the
unreachable `case 'START_CALL':` branch from `CallEventNotification`
(frontend) that could never fire, since no message with content
`START_CALL` is ever created server-side.

While removing it, found the branch had been merged with a live case —
`case 'CALL_ACCEPTED': case 'START_CALL': return '${senderName}
${CALL_STARTED_NOTIFICATION}'` — meaning an **accepted call's in-chat
message was incorrectly labeled "`{name} started a call`" instead of "Call
accepted."** The correct translation key (`CALL_ACCEPTED`, "Call
accepted"/"Anruf angenommen") already existed but was never referenced
anywhere in the UI. Fixed `CallEventNotification` to use it for the
`CALL_ACCEPTED` case; deleted the now-fully-dead `CALL_STARTED_NOTIFICATION`
translation key (getter + both locale files). See known gap #27.

**Noted, not fixed (separate, pre-existing, lower-priority dead code):**
`CallActionType.toTranslationKey()` (`make_video_call_req_body_dto.dart`)
and the `START_CALL`/`END_CALL`/`DECLINE_CALL`/`TIMEOUT_CALL` getters on
`VuMeetPageTranslation` are never called/referenced anywhere in the app —
broader unused-code cleanup, out of scope for this specific fix.

### 5.4 The decline/terminate distinction (group calls)

**Traced (`DeclineCallController.getNotificationData`):** the server tracks
a running "how many people have declined" tally, **passed back and forth
client↔server on every decline** (`numberOfDeclinedCalls` request field,
sourced from `DeclinedCallsCubit`'s last-known value, itself updated from
the server's own broadcast — see `notification_service.dart:202`). On each
decline: `count = request.numberOfDeclinedCalls + 1`; if
`count >= numberOfOtherParticipants`, everyone remaining gets a
`terminate_call` push/WS event (the call is fully over); otherwise
everyone gets a `decline_call` event (informational — "so-and-so declined,
call continues for the rest").

- For a **private (1:1)** call, `numberOfOtherParticipants` is always 1, so
  the very first decline always terminates — the group-tally logic was
  (and remains) a no-op for 1:1, just always-terminate. No roster entry is
  ever created for private calls (`HandleCallActionController` only
  calls `updateGroupCallRoster` for `!chatInfo.isPrivate`), so this path is
  unaffected by the fix below.

**Resolved 2026-08-25 (decision: make it authoritative via
`CallRosterRegistry`):** the client-echoed `numberOfDeclinedCalls` counter
had a real race — two group-call participants declining at *exactly* the
same moment could both compute `count = N + 1` from the same stale `N`
(each request read the client's own last-known count independently, not a
server-side atomic counter), under-counting declines and potentially never
reaching the terminate threshold — a "ghost" call that never formally ends
for the remaining participants.

`CallRosterRegistry.markDeclined()` already tracked per-participant status
(RINGING/JOINED/DECLINED/LEFT/NO_ANSWER) for the *same* call, entirely
unused for this decision — it was a parallel, redundant mechanism next to
the client-echoed tally. `DeclineCallController` now calls
`callRosterRegistry.markDeclined()` first (for group calls only) and
derives the decline/terminate decision from the returned `RosterEntry`
instead of trusting the request body:

- `RosterEntry.participants.size === 0` (registry already deleted the
  roster because no one is left RINGING/JOINED — see
  `CallRosterRegistry.isDone`/`mutate`) → `terminate_call`.
- No entry at all (roster already cleared by a concurrent update) →
  also treated as `terminate_call` — fail toward ending the call rather
  than risking a ghost call.
- Otherwise → `decline_call`, with `numberOfDeclinedCalls` now *computed*
  from the roster's own `DECLINED` count rather than echoed from the
  client.

The request body's `numberOfDeclinedCalls` field
(`DeclineCallReqBodyDTO`) is no longer read by the controller at all —
**left in place as a vestigial, unused field** rather than changing the
request contract; the frontend (`DeclinedCallsCubit`) still sends it. Not
covered by an automated test — the calls module as a whole has no test
coverage yet, only the manual scenarios in §12. See known gap #28.

### 5.5 Frontend call state machine & UI

**Traced (`call_bloc.dart`, `call_state.dart` — states not fully enumerated
in this pass, inferring from usage):** `CallInitial`, `CallOutgoing`,
`CallConnected`, `CallFinished`, `CallFailure` are the states referenced
across the call UI files. Screens:

- **Outgoing** (`presentation/pages/outgoing_call/outgoing_call_page.dart`)
  — shown while `CallOutgoing`/ringing. Shows "Calling…", a cancel button
  (fires `TIMEOUT_CALL` with `isManualCancel: true`), and on
  `CallOutgoing`→`CallFailure` (declined/no-answer) offers a "Call Again"
  retry.
- **Incoming** (`presentation/components/call/incoming_call_screen.dart`,
  `IncomingCallOverlay`) — pushed onto the **root navigator** (not
  chat-scoped) whenever a `CallNotificationModel` arrives with
  `type == 'incoming_call'` while the app is in a state where
  `NotificationService`/`CallKitService` decides to show it (foreground vs.
  background handling differs — see 5.6). Answer/Decline buttons.
- **Fixed this session:** neither screen used to actually call
  `TalkieJitsi(...).join()` on connect — both just navigated to the plain
  chat screen, relying on a user noticing a small "Return to Call" pill and
  manually tapping it to actually start the Jitsi session. **This was very
  likely the entirety of the "doesn't receive a call" / "call doesn't
  work" symptom** — signaling (ring, accept) worked, but the actual A/V
  session never auto-started. Both screens now call the shared
  `returnToCall()` helper on connect, which drives the real Jitsi join; the
  Jitsi SDK's own `conferenceJoined` event then navigates to the chat once
  truly connected (not before). **This fix has not yet been manually
  verified in a live two-device test** — flagging as fixed-in-code,
  unverified-in-practice.
- **Group call UI:** `GroupCallRosterCubit` tracks live roster state via the
  `GROUP_CALL_ROSTER_UPDATED` WS event; `GroupCallMissingMembersPill` (a
  **red/error-styled** `DTInfoChip.error`) shows in the group chat header
  during an active call when at least one member declined, left, or never
  answered — tapping shows a tooltip listing who. **Confirmed 2026-08-25:
  this is the red status you saw** — see §9.1, open question #21, now
  resolved.

**Verification status (as of this doc):** the Jitsi auto-join fix (both
call screens now call `returnToCall()` on connect instead of relying on a
manual "Return to Call" pill tap — described above) has **not yet been
tested against a live two-device call**. The push/signaling verification
done 2026-08-25 (§5.2) confirmed delivery reaches the device, but not
whether the A/V session itself now auto-starts. Still flagged as
fixed-in-code, unverified-in-practice — see §12 test cases.

### 5.6 Foreground vs. background delivery (mobile)

> **iOS gap (2026-10-10):** the VoIP push path that would make iOS ring like
> Android (`ApnsVoipSender`, `ios_voip` tokens) exists only on the server and
> is not wired in — see known gap #42 in §10.

**Fully traced 2026-08-25** (`notification_service.dart`'s `handleMessage`/
`handleCallData`, `main.dart`'s `firebaseMessagingBackgroundHandler`,
`callkit_service.dart`):

- **Foreground, WebSocket connected:** `NotificationService.initCallSignaling()`
  listens for `PRIVATE_CALL`/`GROUP_CALL` WS events and routes them through
  the same `handleCallData()` used for push — `IncomingCallOverlay.show()`
  for an incoming call, `CallAnsweredReceived`/`CallDeclinedReceived`
  events for the other actions. This is transport-independent by design
  (see the doc comment on `handleCallData`): the payload shape is identical
  whether it arrived via WS or FCM.
- **Foreground, push path (`FirebaseMessaging.onMessage`):**
  `handleMessage()` calls `handleCallData()` first — same overlay/bloc
  routing. For a call, this only actually fires anything if WS *didn't*
  already handle it, since both listeners are live simultaneously; in
  practice the WS listener wins the race almost always when connected
  (arrives via a persistent socket, no push round-trip). For a normal
  chat-message push, there's an explicit skip: if the WebSocket is
  connected (`WebSocketConnected`/`WebSocketMessageReceived`) or the chat
  is already open (`activeChatId == chatId`), no local notification is
  shown — avoids double-notifying on top of the live in-app update.
- **Background/terminated:** `firebaseMessagingBackgroundHandler`
  (`main.dart`) → `CallKitService.showCallNotification()` — native OS call
  UI (Android Telecom / iOS CallKit), so the phone actually rings like a
  real call even with the app closed. `CallKitService` also handles the
  native Accept/Decline taps (`_handleCallKitEvent`) and reconciles a
  missed `onEvent` on cold start (`_reconcileMissedAccept`, for when the
  native Accept tap's `BroadcastReceiver` fires before the Flutter engine
  has finished booting).
- **Found and fixed 2026-08-25 (open question #20):** on at least one
  Android emulator image used this session, `flutter_callkit_incoming`'s
  plugin registration threw `UnsupportedOperationException: System does
  not support feature android.software.telecom` (the same error appeared
  in the very first log shared this session) — some devices/emulators lack
  telecom support entirely. `showCallNotification()` had **no
  try/catch**, so on such a device the call to
  `FlutterCallkitIncoming.showCallkitIncoming()` would throw unhandled
  inside the background isolate — the incoming call would silently never
  ring, with no fallback and no visibility into the failure. **Decision
  (asked): add a fallback local notification.** `main.dart` now wraps the
  `showCallNotification()` call in try/catch; on failure, shows a plain
  `flutter_local_notifications` alert ("Incoming call" / "`{name}` is
  calling", reusing the same avatar-resolution helper as the existing
  missed-call notification) so an incoming call is never completely
  silent, even without native telecom support. `dart analyze` clean; not
  yet exercised on a real telecom-less device (would need one to trigger
  the fallback path).

---

## 6. Push Notifications (non-call)

- **Chat-message pushes can be switched off** per user with the module
  preference `vu_meet.messagePushNotifications` (default on; My Account →
  Notifications → VuMeet → "Chat messages"). Off skips the message push;
  incoming calls still ring. Known gap #43: the push reaches only one other
  member of the chat.

Covered in depth earlier this session — summarizing for this doc's
completeness:

- **Root cause of "mobile doesn't receive, web does":** backend Firebase
  Admin SDK credentials (`FIREBASE_ADMIN_KEY_FILE`) pointed at Firebase
  project `vukmark-63f3e`; the Flutter app is built against a *different*
  project, `vukmark-349aa` (apparently created when the app's package name
  changed). FCM tokens are project-scoped, so every send failed, for every
  platform, always — web only ever "worked" because open tabs get live chat
  updates over WebSocket, not push. **Resolved and verified 2026-08-25:**
  swapped `FIREBASE_ADMIN_KEY_FILE` to a `vukmark-349aa` service-account key
  in both `apps/copor/server/.env` and `apps/copor/server/.dist.env` — see §5.2 for the
  same fix's detail. Verified against a live device: server logs show
  `targetedDeviceCount: 2, deliveredDeviceCount: 2, failedDeviceCount: 0`
  for a real send.
- Token registration, platform branching (android/apns/webpush config), and
  the mobile background handler were all traced and found correct — the
  fix is purely a credentials/config change, not application code.

---

## 7. WebSocket Realtime Event Catalog

**Traced, full list (`packages/core/server/src/client/Core/WebSocket/WebSocketHelper.ts`):**

| Event | Payload | Fired when | Frontend handler |
|---|---|---|---|
| `NEW_MESSAGE_NOTIFICATION` | `GetUnreadMessageCountForUserDTO` (unread count + last-message summary fields) | Any message saved (text/file/call-event) | `VuMeetMessageBloc._handleNewMessageNotification` (refetches the open chat's messages if it's the active chat) **and** `ChatListBloc` (refetches the chat list, builds a `DSNotification` and adds it to the app's notification bell/inbox — see below) |
| `TYPING_STATUS` | `TypingStatusMessageDTO` | Typing start/stop | `VuMeetMessageBloc._handleTypingStatus` (open conversation) and `ChatListBloc` (chat-list row preview) |
| `CHAT_LIST_UPDATED` | `ChatListUpdatedMessageDTO` | Chat created, or member added to existing chat | **Traced 2026-08-25:** `ChatListBloc._onWebSocketMessage` — refetches the full chat list (`GetChatList`) |
| `REMOVED_FROM_GROUP_CHAT` | `RemovedFromGroupChatMessageDTO` | A member is removed from a group's member list on update | **Traced 2026-08-25:** `ChatListBloc._onWebSocketMessage` — dispatches `MemberRemovedFromGroup(chatId, chatName)` |
| `PRIVATE_CALL` / `GROUP_CALL` | Same shape as the call push payload | Any call action (start/accept/end/timeout/decline/terminate) | `NotificationService.initCallSignaling()` |
| `GROUP_CALL_ROSTER_UPDATED` | `GroupCallRosterDTO` | Any roster-affecting call action in a group call | `GroupCallRosterCubit` |
| `NUMBER_OF_UNREAD_MESSAGES` | `number` | Sent to a single user (not broadcast), on `MarkChatMessagesSeenController` (opening/reading a chat) | **Traced and wired up 2026-08-25** (was previously unhandled — see below) — `ChatListBloc._onWebSocketMessage` now triggers `NotificationCounterDispatcher.notificationCounter.getNotificationsCount()` |
| `CLOUD_NOTIFICATION` | `Record<string,string>` | *(not VuMeet — Cloud module, noted for completeness since it shares the same socket)* | — |
| `NEW_TODO` | `NewToDoMessageDTO` | *(not VuMeet — ToDo module)* | — |

**Corrected 2026-08-25 — the "picture field mismatch" gap was stale/wrong
for production:** the doc previously claimed `lastMessageChatPicture` is
never sent, based on the DTO interface only declaring
`lastMessageChatPictureName`/`lastMessageChatPictureExtension`. Tracing the
actual repo implementations: **the live Kysely repo**
(`KyselyGetUnreadMessageCountForUserInteractorRepo.prepareDataForResponse`)
**does** additionally set a resolved `lastMessageChatPicture` URL
(`ImageHelper.getProfileImageUrlOrEmptyString(...)`) on the returned
object — an extra runtime property not declared on the TS interface, but
still present and serialized by `JSON.stringify` when sent over the
socket, so production is unaffected. Only
`FakeGetUnreadMessageCountForUserInteractorRepo` (the `DB_ENV=FAKE` dev
fixture) omits it — a dev-fixture gap, not a production bug. Left as-is
(fixture data was never meant to be realistic).

That picture value feeds `MessageData.toDSNotification()`, which **is**
live, user-visible code — `ChatListBloc` builds a `DSNotification` from
every `NEW_MESSAGE_NOTIFICATION` and adds it to the app's notification
bell/inbox (`AppScaffoldCubit.addNotification`/`addToInbox`). This is a
different, real consumer from the one originally suspected below.

**Resolved 2026-08-25 (decision: delete):** the `NewMessageNotification`
widget (and its sole child, `MessageContentInNotification`) — a chat-list-
style "toast" component — was never actually instantiated anywhere in the
app; `VuMeetMessageBloc._handleNewMessageNotification` only refetches
messages for the open chat, it never builds this widget. Deleted both
files as confirmed-dead UI, consistent with how the dead `SeenStatus`
widget was handled in §4.1. `dart analyze` clean.

**Resolved 2026-08-25 (decision: wire it up):** `NUMBER_OF_UNREAD_MESSAGES`
had zero frontend listeners. On the *same* device the unread badge already
updates correctly via a direct REST call
(`NotificationCounterDispatcher...getNotificationsCount()`) right after
marking a chat seen, so this event's only real value is live badge sync to
a user's *other* logged-in devices. Added a handler in `ChatListBloc`
that calls the same `getNotificationsCount()` dispatcher on this event —
matches the existing re-fetch-rather-than-trust-payload pattern used
elsewhere in this bloc. Not covered by an automated test (no WebSocket
event tests exist for this bloc). See known gap #30.

**Resolved 2026-08-25 (connection lifecycle, traced):** `ChatListBloc`
explicitly resyncs on reconnect — a `WebSocketConnected` state triggers a
full `GetChatList` refetch. **Typing status and the group-call roster do
not** — `VuMeetMessageBloc`'s typing handling and `GroupCallRosterCubit`
are both purely event-driven with no `WebSocketConnected` case, so if the
socket drops mid-"typing" or mid-call, that state stays exactly as it was
at disconnect until the next explicit event happens to arrive (which may
never come, e.g. if the other party also lost connection while typing).
See known gap #31.

---

## 8. Chat List

**Traced (`KyselyGetUserChatListInteractorRepo.ts`, `chat_list_item.dart`):**

- Ordered by `last_message_sent_time` descending.
- **Resolved 2026-08-25 (decision: should show for both parties) —
  visibility rule removed:** a chat previously only appeared in the list if
  `is_private = false` **OR** it had a non-empty `last_message` **OR** the
  current user was the one who sent the last message — hiding a
  freshly-created empty 1:1 chat from the *other* party until something
  had actually been sent, while still showing it to whoever created it.
  Confirmed this was an unwanted filter, not intended UX: a chat someone
  deliberately creates to message later should be visible to both parties
  immediately, even empty. Removed the `WHERE` clause entirely from
  `KyselyGetUserChatListInteractorRepo.list()` (the `FakeGetUserChatListInteractorRepo`
  never implemented this filter, so only the Kysely repo needed the
  change). `tsc --noEmit` clean; no test coverage existed for this repo
  before or after. See known gap #32, open question #30.

**Resolved 2026-08-25 (decision: delete):** `NumberOfUnseenMessages` (a
separate, differently-styled unread-count circle superseded by `DTBadge`,
never instantiated anywhere) confirmed dead and deleted. See known gap #9.
- Search (the chat-list search box, distinct from global message search in
  §2.4) matches against the chat's own `name` field OR any member's
  role-resolved full name — so searching a group chat by a member's name
  who *isn't* the group's display name still surfaces it.
- Unread badge: `DTBadge` (primary-container colored — not literally red by
  design; see §9.1 for the "what's red" investigation). Unseen count comes
  from a correlated subquery counting `message` rows in the chat
  with `senderId != me` and no matching `message_seen` row.

---

### 8.1 Contact list (whom you can pick)

`POST /vu-meet/contacts` (`filterList` with `SEARCH`, `limit`, `offset`) feeds
the create-chat screen, the edit-group modal and add-members in chat info.
It runs on core's user picker (`GetVuMeetContactList extends
ListVisibleUsers`, `activeOnly = true`):

- only **active** users, never the actor;
- narrowed by the scope of `vu_meet.canGetVuMeetContactList`
  (`requiresScope`; OWN: nobody, TENANT: same tenant, ALL: everyone);
- `SEARCH` matches every whitespace-separated token against first or last
  name; ordered by last name, first name;
- items are `{id, fullName, picture, isActive}`.

**Members are checked on writes**, so a hand-made request can't add users
the picker never shows:

- `POST` get-or-create chat (`ValidateGetChatWithUser`): every requested
  user goes through core's `ValidateUserIsVisible` under
  `vu_meet.canGetVuMeetContactList` — including when the chat already
  exists and is only being reopened.
- `PATCH` chat (`ValidateUpdateChat`): only users **added** by the update
  are checked (`ValidateAddedChatMemberIsVisible`). Members already in the
  chat stay even if they've left the actor's scope since, so renaming a
  group or removing someone never fails because of them.
- Like the list, the check is active-only: a deactivated user can't be
  added (both use `KyselyVisibleUsersHelper` with `activeOnly`).
- A rejected user is reported as `InvalidUserException`, same as an unknown
  one (doesn't reveal who exists).

The frontend uses core's `UserPickerList` through `VuMeetContactPicker`
(`presentation/components/vu_meet_contact_picker.dart`, VuMeet's tile) in the
create-chat screen (plain: tap starts a chat; group mode: selectable) and the
edit-group modal (selectable, with the selected-users row). The list is not
cached offline.

## 9. Things You Flagged That Need More Investigation

### 9.1 "The red status in the chat header"

**Resolved 2026-08-25 (confirmed by you):** it's `GroupCallMissingMembersPill`
(§5.5) — the red/error `DTInfoChip` that appears in a *group* chat's header
while a group call is active and at least one member declined, left, or
never answered. The other two candidates considered (a stub in the chat
info panel, §9.2; a stray `DSBanner.error` from the call permission-request
flow) are ruled out.

### 9.2 Chat info panel — stubbed features

**Traced (`chat_info.dart`):** the chat info side panel renders a full UI
for several features that are **visibly present but wired to nothing**:

- "Profile" action button — `onTap: null` (button appears disabled)
- "Mute" action button — `onTap: null`
- "Search" action button — `onTap: null`
- "View pinned messages" list tile — `onPressed: () {}` (no-op, but tile
  itself shows `enabled: true` — looks clickable, does nothing)
- "Customize chat" section — `enabled: false`, empty body
- "Media" / "Files" list tiles — `enabled: false`
- "Privacy & support" section — `enabled: false`, empty body

**Open question, high priority:** is this scaffolding for features you
intend to build (in which case this doc should turn each of these into its
own spec section with expected behavior), or UI that shipped ahead of the
backend and should be hidden/removed until it's real? Right now a user can
see and (for some of these) tap controls that visibly do nothing, which
reads as broken rather than "not yet built."

### 9.3 The "End-to-end encrypted" badge

**Traced (`chat_info.dart:92-106`):** every chat's info panel
unconditionally displays a badge reading **"End-to-end encrypted"** with a
lock icon. **This does not appear to be true.** Every piece of the backend
I traced this session and in earlier work stores message content as plain
text in the `message.content` column, readable directly via any
Kysely query — there is no client-side encryption keypair, no encrypted
blob storage, nothing resembling E2E encryption anywhere in the message
send/store/retrieve path (`KyselyCreateMessageInteractorRepo.ts`,
etc. — all plain `insertInto('message').values({content: ...})`).

**Resolved 2026-08-25 (decision: remove now, scope real encryption
separately):** confirmed no encryption exists anywhere in the codebase (no
keypairs, no crypto libraries beyond unrelated PDF-generator vendor code).
Discussed what real E2E encryption would actually require for this app —
per-user keypairs, group-chat key distribution, **multi-device support**
(the same user is already logged in on more than one device today, which
is the hardest part of real-world E2E), losing/redesigning server-side
message search (§2.4) since the server could no longer read content,
push-notification previews, and no retroactive encryption of existing
plaintext history — concluded this is a multi-week project deserving its
own design doc, not something to fold into this spec pass. Removed the
badge (`chat_info.dart`'s `DTEntityHeader.large` chips) immediately rather
than continue showing a false security claim in the meantime; real E2E
encryption is tracked as future work, out of scope here. `dart analyze`
clean (also removed the now-unused `dc`/`CoporColors` local that only the
badge referenced). See known gap #1.

### 9.4 AI Bot

Out of the core scope of this pass (calls/notifications/statuses/typing),
but part of the module — noting for completeness. `POST /vu-meet/bot`,
`CreateAiBotMessageController.ts`, DeepSeek-backed. **Full feature scope
(what this endpoint should require) still TBD, tracked separately** — see
open question #24.

**Found and fixed 2026-08-25 — worse than initially documented:** this
wasn't just "no permission check for authenticated users" — `/vu-meet/bot`
(`POST`) was in **both** the backend's `JwtAuthenticationMiddleware`
excluded-endpoints list and the frontend's `PublicRoutes` list, meaning
the endpoint required **no authentication at all**: any caller, logged in
or not, could invoke the DeepSeek-backed bot. Removed the exclusion from
both `JwtAuthenticationMiddleware.ts` (backend) and `public_routes.dart`
(frontend, so the app's `TokenInterceptor` now actually attaches the auth
token on this route instead of skipping it) — the endpoint now requires a
valid JWT like virtually everything else in the app. **Deliberately did
not** add a role/permission-scoped grant on top of plain authentication —
that's a product decision blocked on the still-TBD scope question below
(e.g. should every role have bot access, or only certain roles/plans?).
`tsc --noEmit` and `dart analyze` clean. See known gap #34.

---

## 10. Known Bugs & Gaps — Consolidated

For quick scanning; each links back to its full write-up above.

| # | Gap | Section | Severity guess |
|---|---|---|---|
| 1 | ~~"End-to-end encrypted" badge shown but not true~~ — **fixed 2026-08-25 (badge removed; real E2E encryption scoped as separate future work)** | §9.3 | Was high — user-facing false security claim |
| 2 | ~~Chat file download `SUPER_ADMIN`-only~~ — **confirmed true, fixed 2026-08-25** | §2.2 | Was high — blocked every non-admin user from viewing received files |
| 3 | ~~Group call decline/terminate tally is client-echoed, race-prone~~ — **fixed 2026-08-25 (now derived from `CallRosterRegistry`, server-authoritative)** | §5.4 | Was medium — group calls specifically |
| 4 | Typing/seen status structurally can't represent multiple concurrent typers or partial group seen-state | §3.1, §4.1 | Medium — group chats specifically |
| 5 | Chat info panel has multiple visibly-present, non-functional controls | §9.2 | Medium — looks broken to users |
| 6 | ~~Seen-status text hardcoded in English, bypasses translation~~ — **corrected 2026-08-25: was dead code, not a live bug; deleted** | §4.1 | Was Low-medium as documented — actually zero, since `SeenStatus` was never rendered |
| 7 | ~~`START_CALL` never produces an in-chat message; `CallEventNotification`'s handling for it is dead code~~ — **resolved 2026-08-25 (decision: intentional, dead code deleted)** | §5.3 | Was low |
| 8 | ~~`NewMessageNotification`/`MessageData` picture field never populates (key mismatch)~~ — **corrected 2026-08-25: was stale/wrong for production** — the live Kysely repo already sends a resolved picture URL; only the `DB_ENV=FAKE` dev fixture omits it. The dead `NewMessageNotification` widget itself was deleted as unrelated cleanup | §7 | Was low as documented — actually zero in production |
| 9 | ~~`NumberOfUnseenMessages` widget is dead code (superseded by `DTBadge`)~~ — **fixed 2026-08-25 (deleted)** | §8 | Was low — cleanup only |
| 10 | `DTAvatar.withActivity` (online/offline presence dot) is fully built but never used anywhere | §9.1 | Low — unused feature, or intentionally deferred |
| 11 | ~~`MessageContentType.FILE` enum value has no matching DB column value~~ — **fixed 2026-08-23** | §1.1 | Was high: every attachment send used this exact path and was failing |
| 12 | ~~No DB or app-layer uniqueness guard on `chat_user_map (chat_id, user_id)`~~ — **fixed 2026-08-23** | §1.5 | Was high if it ever fired — `create` path couldn't self-heal a duplicate |
| 13 | ~~`UpdateChat` (`canUpdateChat`) has no membership check~~ — **fixed 2026-08-25** | §1.3 | Was medium — no code-level safety net if the grant ever widened beyond Super Admin |
| 14 | ~~No guard against creating/reducing a chat to a single member (`is_private` flagged `true` with no "other member" to resolve)~~ — **fixed 2026-08-25** | §1.4 | Was low-medium — display-layer breakage, not a security gap |
| 15 | ~~Duplicate-id requests to `GetChatWithUser`/`UpdateChat` hit the DB unique constraint as a raw, untranslated error instead of a clean validation message~~ — **fixed 2026-08-25** | §1.5 | Was low — constraint already prevented data corruption, this was purely error-message quality |
| 16 | ~~`ValidateCreateMessage` never checked message `content` at all — no empty-content rejection, no length limit~~ — **fixed 2026-08-25** | §2.1 | Was low — no stored-XSS path (plain-text rendering), but empty/unbounded messages could be sent |
| 17 | ~~Oversized file uploads: multer's own limit fired before the domain validator, and neither path had a translated message or the 413 status the frontend's dialog expects~~ — **fixed 2026-08-25** | §2.2 | Was low-medium — confusing error UX, not a security or data-integrity gap |
| 18 | ~~`SendPrivateChatTypingStatusController` never ran `ValidateSendTypingStatus` — no permission or chat-membership check on the typing-status endpoint~~ — **found and fixed 2026-08-25** | §1.1 | Was medium — any authenticated user could send a typing status for any chat ID |
| 19 | ~~`SaveAccountDeletionRequestedNotificationRepoPicker.ts` imported a module path that no longer existed post-`PrivateMessage`→`Message` rename~~ — **found and fixed 2026-08-25** | §1.1 | Was low — broken import, but nothing in the normal request path exercised it, so it went uncaught |
| 20 | ~~Group-chat `isSeen` flips true group-wide the moment any single recipient opens the chat, but the UI showed it as if the whole group had seen it~~ — **found and fixed 2026-08-25 (indicator hidden for group chats, not the underlying tracking)** | §4.1 | Was medium — actively misleading, not just imprecise |
| 21 | ~~`MessageItemContainer`'s timestamp-visible render path showed the seen-status checkmark unconditionally, ignoring `isOwn`/`isLatestMessage` entirely~~ — **found and fixed 2026-08-25** | §4.1 | Was low-medium — would have leaked the group-chat indicator back in via a tapped timestamp even after gap #20's fix |
| 22 | ~~`DeclineCallController` had no permission or membership check at all — any authenticated user could decline/terminate a call in a chat they weren't a member of~~ — **found and fixed 2026-08-25** | §5.1 | Was medium-high — cross-chat call disruption by any authenticated user |
| 23 | ~~`HandleCallActionController`'s own validation was non-blocking (missing `return` after `this.next(validationResult)`) — every call action's side effects fired regardless of a validation failure~~ — **found and fixed 2026-08-25** | §5.1 | Was high — validation existed but did nothing |
| 24 | ~~Backend `FIREBASE_ADMIN_KEY_FILE` pointed at Firebase project `vukmark-63f3e` while the Flutter app is registered under `vukmark-349aa` — every push send failed, for every platform~~ — **fixed and verified against a live device 2026-08-25** | §5.2, §6 | Was high — no push delivery at all for backgrounded/killed apps |
| 25 | ~~`firebaseMessagingBackgroundHandler` rebuilt the DI container per-push but never re-attached Dio interceptors, so `CallKitService`/`CallBloc` calls made from that isolate sent no auth token~~ — **found and fixed 2026-08-25** | §5.2 | Was medium-high — call accept/decline reconciliation silently failed auth when triggered from a backgrounded/killed-app push |
| 26 | ~~`JwtAuthenticationMiddleware` returned 500 (`INTERNAL_SERVER`) instead of 401 for a missing auth token~~ — **found and fixed 2026-08-25** | §5.2 | Was low — misleading status code, not a security gap (request was still rejected) |
| 27 | ~~An accepted call's in-chat message showed "`{name} started a call`" instead of "Call accepted" — the `CALL_ACCEPTED` case shared a switch branch with the dead `START_CALL` case, and the correct `CALL_ACCEPTED` translation key existed but was never used~~ — **found and fixed 2026-08-25** | §5.3 | Was low-medium — confusing but not incorrect functionally, purely a mislabeled UI text |
| 28 | `DeclineCallReqBodyDTO.numberOfDeclinedCalls` is now unread by the server (superseded by the `CallRosterRegistry`-derived count) but still sent by the frontend — vestigial field, left in place to avoid a request-contract change | §5.4 | Low — dead field, no functional effect |
| 29 | ~~`showCallNotification()` had no try/catch — native CallKit/Telecom registration failure (confirmed on at least one emulator) would throw unhandled in the background isolate, silently dropping the incoming-call alert entirely~~ — **found and fixed 2026-08-25** | §5.6 | Was medium — silent total call-notification failure on unsupported devices, no fallback |
| 30 | ~~`NUMBER_OF_UNREAD_MESSAGES` WebSocket event had zero frontend listeners — no multi-device unread-badge sync~~ — **found and fixed 2026-08-25** | §7 | Was low-medium — cross-device UX gap, not incorrect on the originating device |
| 31 | Typing status and the group-call roster have no reconnect resync — if the WebSocket drops mid-"typing" or mid-call, that client-side state stays exactly as it was at disconnect until (if ever) the next explicit event arrives. `ChatListBloc` is the one exception, explicitly refetching the full chat list on `WebSocketConnected` | §7 | Medium — could show stale/wrong typing or call-roster state indefinitely after a flaky connection |
| 32 | ~~A freshly-created empty 1:1 chat was invisible in the chat list to everyone except whoever sent (or, for the creator, is about to send) the last message~~ — **found and fixed 2026-08-25** | §8 | Was medium — a chat someone deliberately created to message later simply didn't appear for the other party until the first message was sent |
| 34 | ~~`POST /vu-meet/bot` required no authentication at all (excluded in both the backend's `JwtAuthenticationMiddleware` and the frontend's `PublicRoutes`) — any caller, logged in or not, could invoke the DeepSeek-backed AI bot~~ — **found and fixed 2026-08-25 (now requires a valid JWT; role/permission scoping still TBD pending open question #24)** | §9.4 | Was high — unauthenticated access to an LLM-backed endpoint |
| 35 | ~~`HandleCallActionValidatorStorageRepoPicker` (private-call branch) mapped both `DBEnv.FAKE` and `DBEnv.KYSELY` to an always-passing fake — `ValidateStartPrivateCall`'s chat-exists/is-member checks were a no-op in production, same pattern as the group-call gap already fixed this session~~ — **found and fixed 2026-08-25** | §5.1 | Was high — any authenticated user could start/act on a private call against any chat ID, valid or not, member or not |
| 36 | ~~`UpdateChatValidatorStorageRepoPicker` mapped both `DBEnv.FAKE` and `DBEnv.KYSELY` to the always-passing fake, even though a correct `KyselyUpdateChatValidatorStorageRepo` already existed — §1.3's membership-check fix earlier this session never actually took effect in production because of this~~ — **found and fixed 2026-08-25** | §1.3 | Was high — the membership check added earlier today was silently a no-op in production until this fix |
| 37 | ~~`GetChatInfoController` had no membership check at all, and its existence check was a hand-written stub even in the file named "Kysely" — any authenticated user could fetch full chat info (name, picture, member list) for any chat ID~~ — **found and fixed 2026-08-25** | §1.6 | Was high — information disclosure of chat membership/details to any authenticated user, for any chat |
| 38 | App-wide: **40 `*ValidatorStorageRepoPicker`s across the entire client codebase** (not just VuMeet) have the same `DBEnv.FAKE`==`DBEnv.KYSELY` always-passing-fake shape found and fixed 3 times in this module. Found via a repo-wide scan 2026-08-25, **not fixed** — spans Permission, registration and CRUD, ToDo, User profile/preferences, NotificationToken, and more. Out of scope for this doc; tracked here only because the pattern was discovered while auditing VuMeet | *(app-wide, not VuMeet-specific)* | Unknown per-instance — needs individual triage; several look like genuine authz bypasses, not just missing audit logs |
| 39 | ~~`ValidateGroupChat`/`ValidateIsUserInGroupChat` (+ their repo interfaces) were byte-for-byte functional duplicates of `ValidateChat`/`ValidateIsChatMember`, left over from when group chats were a separate entity~~ — **found and fixed 2026-08-25 (deleted, `ValidateStartGroupCall` now reuses the shared validators)** | §5.1 | Was low — code-quality duplication, no behavior difference |
| 40 | ~~On mobile, opening chat info (or a call/call-summary sub-route) immediately showed the chat list instead — `SelectedChatCubit._onRouteChanged` compared the GoRouter path template with exact equality (`route != '/vu-meet/:id'`), so any sub-route of a chat (`/vu-meet/:id/info`, `/call`, `/call-summary`) looked identical to "left the chat" and cleared the selection, flipping `VuMeetLayoutBuilder`'s mobile `hasChatOpen` check~~ — **found (you reported it) and fixed 2026-08-25 (pre-existing bug, not from this session's earlier changes — `startsWith` instead of exact equality)** | §8 | Was medium — chat info unusable on mobile, calls likely affected too but not reported |
| 41 | ~~A file/picture message's "last message" preview (chat list row and push/WS notification) showed the raw filename instead of a generic label — `chat` never cached the message's type, only its raw content~~ — **found (you reported it) and fixed 2026-08-25 (new `last_message_type` column, `MessageContentFormatter` now substitutes "Sent a file" for FILE/PICTURE previews)** | §2.2 | Was low-medium — confusing/unprofessional-looking preview text, not a functional break |
| 42 | iOS calls don't ring when the app is backgrounded/killed: the VoIP push path is built on the server but wired at neither end. `ApnsVoipSender` (`packages/vu_meet/server/src/client/VuMeet/Core/Call/ApnsVoipSender.ts`, direct HTTP/2 APNs push with `apns-push-type: voip`) is imported by nothing — core's `PushNotificationHelper` handles only `WEB`/`IOS` tokens (the `IOS_VOIP` branch was likely lost when VuMeet became a module, since core may not import a module); the app never registers a PushKit VoIP token, so no `ios_voip` row (`notification_token.type`, migration 167) is ever saved; the `APNS_VOIP_KEY_ID`/`TEAM_ID`/`AUTH_KEY`/`BUNDLE_ID` env vars are not in `.dist.env` and the APNs Auth Key may not exist in the Apple Developer account. Kept on purpose (2026-10-10) to be finished: a module hook for delivering `IOS_VOIP` tokens (so core keeps not importing VuMeet), PushKit token registration + CallKit report in the iOS app, the APNs key + env vars. `Info.plist` already declares the `voip` background mode — Apple may reject a build that declares it without using PushKit | §5.6 | Medium — iOS callee gets at best a plain notification, no ringing call screen |
| 43 | A chat-message push goes only to `otherUsersInChat[0]` (`CreateMessageController.createNotification`), so in a group chat just one other member gets it | §6 | Medium — group members miss message pushes |

---

## 11. Open Questions — Consolidated

Pulling every `Open question` from above into one list for easier
back-and-forth:

1. ~~Is `MessageContentType.FILE` meant to replace `PICTURE`, or unused/future?~~
   **Resolved 2026-08-23:** it's the only type the live attachment flow ever
   sends; `PICTURE` is vestigial. Fixed via migration `155`, see §1.1.
2. ~~Does `is_private` get recomputed if a 3rd member is added to a 2-person
   chat, or does it stay stuck at `true`?~~ **Resolved 2026-08-23:** yes,
   recomputed on every `UpdateChat` call. See §1.2.
3. ~~What should a group chat's display name be if created with an empty
   name?~~ **Resolved 2026-08-24:** blocked client-side in the create-group
   form; now also rejected server-side (`ValidateGroupChatName`, both
   create and rename paths), and the three render sites fall back to a
   translated "Group" placeholder if a blank name ever reaches them
   anyway. See §1.2.
4. ~~Does `UpdateChat` have the same missing-membership-check gap the old
   `GroupChat`'s update had?~~ **Resolved 2026-08-25:** confirmed, then
   fixed. Decision: membership required for everyone updating a chat, no
   exceptions (including Super Admin) — `ValidateUpdateChat` now runs
   `ValidateIsUserInChat` independent of the `canUpdateChat`
   permission grant. See §1.3.
5. ~~Should there be a guarantee that `is_private = true` chats always have
   exactly 2 members?~~ **Resolved 2026-08-25:** yes, enforced. The upper
   bound was already self-enforcing (`is_private` is always recomputed from
   the live member count — see resolved OQ#2); the floor (a 1-member chat)
   is now blocked by `ValidateChatMemberCount` on both create and update.
   See §1.4.
6. ~~Is there a message length limit / content sanitization on send?~~
   **Resolved 2026-08-25:** there was neither. Added empty-content
   rejection (reusing `ValidateEmptyContent`) and a 5000-character cap
   (new `ValidateMaxLength`) to `ValidateCreateMessage`. Sanitization
   deemed unnecessary — plain-text `Text()` rendering means no stored-XSS
   path. See §2.1.
7. ~~Confirm current `canGetVuMeetFile` permission grants — is file download
   still admin-only?~~ **Resolved 2026-08-25:** yes, confirmed via live DB —
   and fixed. See §2.2, known gap #2.
8. ~~Is 10MB the intended production file-size limit? Is the rejection error
   clear to the user?~~ **Resolved 2026-08-25:** the live limit is actually
   1MB, left as-is (product/ops config, not changed). The rejection error
   was not clear — fixed the missing translation and wrong HTTP status
   (400 instead of 413) for both the domain validator and multer's own
   upload-size limit, which fires first in practice. See §2.2, known
   gap #17.
9. ~~What's the message list page size, and is "load more" visible or
   seamless infinite scroll?~~ **Resolved 2026-08-25:** 20
   (`Preferences.getVuMeetMessageLimit()`), seamless infinite scroll
   (scroll-position-triggered, no button). See §2.3.
10. ~~Does a per-chat message search endpoint still exist for group chats
    post-consolidation, and does the frontend call it correctly?~~
    **Resolved 2026-08-25:** yes, `POST /vu-meet/message/search` exists and
    is correctly mounted; `group-message/search` is fully gone (not
    orphaned, not broken — never registered post-consolidation). The
    frontend calls neither this nor the global search endpoint anywhere —
    search is unimplemented in the UI, not a regression. See §2.4, §9.2.
11. ~~Does group-chat typing status actually reach every member, or was it
    only ever built/tested for exactly one other participant?~~
    **Resolved 2026-08-25:** it reaches everyone — server-side delivery
    correctly enumerates all `chat_user_map` rows for the chat, no
    1:1 assumption. See §3.1.
12. Is "N people typing" support needed, or is "last person to type wins"
    acceptable for group chats? (Confirmed 2026-08-25: this is a real,
    structural single-slot limitation in `VuMeetMessageBloc` — not just a
    display simplification — and `userId` isn't even parsed from the
    payload today. Still an open product decision, not fixed. See §3.1.)
13. ~~**The typing→message animation** — full design questions in §3.2
    (morph vs. crossfade, exact trigger moment, chat-list preview too or
    just the open conversation).~~ **Resolved and implemented 2026-08-25:**
    crossfade (not morph), only when a message arrives while typing is
    actively showing, both the open conversation and the chat list. See
    §3.2. Not interactively verified in a running app.
14. ~~Is a sent/delivered/seen three-state distinction wanted, or is
    seen/not-seen the full intended model?~~ **Resolved 2026-08-25:**
    binary is the intended model — no delivery-receipt signal exists
    server-side to build a third state from. See §4.1.
15. ~~Is per-member group seen-status ("seen by 3 of 5") in scope?~~
    **Resolved 2026-08-25:** not in scope for now, explicitly deferred —
    real feature work spanning the message-list query and new UI. As a
    stopgap, the misleading group-chat seen indicator is now hidden
    entirely rather than left showing a wrong answer. See §4.1.
16. ~~For a group message, does the sender's bubble show "seen" on first
    viewer or only once everyone's seen it?~~ **Resolved 2026-08-25:** on
    first viewer — `message.seen` is a single shared boolean, flipped
    by whichever recipient opens the chat first, group-wide. The indicator
    is now hidden for group chats rather than show this. See §4.1.
17. ~~Does opening a chat mark literally everything unread as seen, or only
    what's scrolled into view?~~ **Resolved (already traced, formalizing
    2026-08-25):** everything — `MarkChatMessagesSeenController` takes
    only a `chatId`, no message-id range or viewport info; it's an
    all-or-nothing "mark everything in this chat seen" operation
    regardless of scroll position. Not flagged as a bug — this is
    standard chat-app behavior (open the conversation, everything in it is
    now "read"), just documenting it's confirmed rather than assumed. See
    §4.2.
18. ~~Why does `DECLINE_CALL` get its own controller/endpoint instead of
    joining the shared `HandleCallActionController` action switch?~~
    **Resolved 2026-08-25 (decision: keep it separate):** decline's
    escalation logic (`numberOfDeclinedCalls` → "declined" vs. "terminate")
    doesn't map cleanly onto the shared action-keyed switch, and merging
    would mean an API-contract change for a cosmetic-consistency win. The
    real bug this was masking (no validation at all on the decline
    endpoint) is fixed independently. See §5.1, known gaps #22/#23.
19. ~~Should the group-call decline/terminate tally be replaced by an
    authoritative server-side check against `CallRosterRegistry` instead of
    a client-echoed counter?~~ **Resolved 2026-08-25 (decision: yes):**
    `DeclineCallController` now derives the decision from
    `callRosterRegistry.markDeclined()`'s returned entry instead of the
    client-supplied `numberOfDeclinedCalls`. See §5.4, known gaps #3/#28.
20. ~~Should the app degrade gracefully when native CallKit/Telecom
    registration fails (e.g. unsupported emulator/device), or is that
    purely a test-environment concern?~~ **Resolved 2026-08-25 (decision:
    yes, add a fallback):** `firebaseMessagingBackgroundHandler` now falls
    back to a local notification if `CallKitService.showCallNotification()`
    throws. See §5.6, known gap #29.
21. ~~What is the red header status you saw?~~ **Resolved 2026-08-25
    (confirmed):** `GroupCallMissingMembersPill`. See §9.1, §5.5.
22. Chat info panel: are the stubbed controls (Profile/Mute/Search/pinned
    messages/Customize/Media/Files/Privacy) things to build next, or things
    to hide until built?
23. ~~Is the "End-to-end encrypted" badge true?~~ **Resolved 2026-08-25
    (decision: remove now):** confirmed false, no encryption exists.
    Badge removed; real E2E encryption scoped as a separate future
    project (multi-week — multi-device key distribution and losing
    server-side search are the biggest blockers), not part of this spec
    effort. See §9.3, known gap #1.
24. Is the AI Bot in scope for this spec effort? **Partially resolved
    2026-08-25:** the unauthenticated-access security gap is fixed
    regardless (decision: asked) — see §9.4, known gap #34. Full feature
    scope (intended audience, role/permission-scoped access beyond plain
    authentication, whether it belongs in this doc at all) remains open.
25. ~~What's the reconnection/resync behavior for typing status, call
    roster, etc. when the WebSocket drops and reconnects?~~ **Resolved
    2026-08-25 (traced):** `ChatListBloc` resyncs (full `GetChatList`
    refetch) on `WebSocketConnected`; typing status and the group-call
    roster have no such resync — both stay stale until the next explicit
    event. See §7, known gap #31.
26. ~~Is the `NewMessageNotification` in-app banner actually shown anywhere
    currently, or is it unreached code?~~ **Resolved 2026-08-25 (decision:
    delete):** confirmed unreached; deleted along with its sole child
    widget. See §7, known gap #8.
27. ~~Should `chat_user_map (chat_id, user_id)` get a DB-level unique
    constraint, or is dedup-on-insert at the interactor level acceptable?~~
    **Resolved 2026-08-23:** DB-level unique constraint added. See §1.5.
28. ~~What does the frontend show for a chat reduced down to just the actor
    (e.g. removed every other member via `UpdateChat`)?~~ **Resolved
    2026-08-25:** moot — this state can no longer be produced.
    `ValidateChatMemberCount` now rejects any create/update that would leave
    a chat with fewer than 2 members, so the frontend never has to render
    it. See §1.4.
29. ~~Is it intentional that `START_CALL` never produces an in-chat
    message, leaving `CallEventNotification`'s handling for it as dead
    code?~~ **Resolved 2026-08-25 (decision: yes, intentional):** the chat
    should only record call outcomes, not every ring attempt. Dead code
    deleted; a real mislabeling bug found in the same branch (accepted
    calls showing "started a call") fixed alongside it. See §5.3, known
    gap #27.
30. ~~What is the chat-list visibility rule (only show an empty 1:1 chat to
    whoever sent the last message) protecting against — intended UX or an
    accidental filter?~~ **Resolved 2026-08-25 (decision: accidental,
    fixed):** confirmed unwanted — a chat someone deliberately creates to
    message later should be visible to both parties immediately, even
    empty. Removed the filter. See §8, known gap #32.
31. Should two different groups of identical membership ever be allowed to
    coexist (e.g. "Family" and "Trip Planning" with the same 4 people), or
    should creating one dedup to the other the same way 1:1 chats do? See
    §12 test cases.
32. Two devices, same user logged in on both: does an incoming call ring on
    both, and does answering on one correctly stop it ringing on the
    other? Untraced this session. See §12 test cases.

---

## 12. Test Cases (seed list — expand as behavior gets confirmed)

☐ Create a 1:1 chat with a user you already have a chat with → returns the
existing chat, doesn't create a duplicate
☐ Create a group chat with the exact same member set as an existing group
→ returns the existing group (confirm this dedup is actually desired for
groups, not just 1:1 — see §11, open question #31)
☐ Send a message while recipient's app is fully killed, push credentials
fixed → native call-style push notification arrives, opens to the chat
(§5.2, §6 — **delivery itself verified 2026-08-25**: server logs confirm
`deliveredDeviceCount: 2, failedDeviceCount: 0` for a real send; opening
to the chat on tap is still not manually confirmed)
☐ Start a group call, one member declines, two accept → remaining members
see the decline as informational, call continues
☐ Start a private call, callee declines → call terminates immediately for
both sides
☐ Start a call, callee never answers for 30s → both sides see "no answer" /
missed-call state, in-chat message reflects it correctly for both
directions (§5.3's `isOwn`-based label swap)
☐ Two devices, same user logged in on both → does a call ring on both, and
does answering on one correctly stop it ringing on the other? (Untraced —
see §11, open question #32)
☐ Type in a group chat, another member also starts typing → verify current
"last typer wins" behavior matches what's documented in §3.1 before
building the new animation on top of it
☐ Craft a create-chat (and separately an update-chat) request with a
duplicate user ID in the member list, or with the actor already present in
the list (bypassing the UI's toggle-based picker, e.g. via a raw API call)
→ confirm it's rejected with a translated `DuplicateChatMemberException`
(409) rather than a raw DB error or silently duplicated membership (§1.5 —
DB constraint added 2026-08-23, dedup validation + clean DB-error mapping
added 2026-08-25)
☐ Remove every other member from a group chat via `UpdateChat`, leaving only
the actor → confirm the request is now rejected with
`InvalidChatMemberCountException` rather than succeeding with a
zero-"other-member" private chat (§1.2, §1.4 — fixed 2026-08-25)
☐ Create a chat with an empty `users` list (bypassing the UI, e.g. a raw API
call) → confirm it's rejected with `InvalidChatMemberCountException` instead
of creating a chat containing only the actor (§1.4 — fixed 2026-08-25)
☐ Send a message with `content: ''` or whitespace-only content → confirm
it's rejected with `EmptyContentException` instead of saving an empty
message (§2.1 — fixed 2026-08-25)
☐ Send a message with content over 5000 characters → confirm it's rejected
with `ContentTooLongException`; send one at exactly 5000 → confirm it
succeeds (§2.1 — fixed 2026-08-25)
☐ Send a file/image message (no caption feature exists — content is the
file name) → confirm the new empty-content/length checks don't collide
with normal file sends (§2.1 — fixed 2026-08-25, verified via frontend
call-site trace, not yet manually exercised in a running app)
☐ Log in as a non-admin role and download a file/image received in a chat
→ confirm it now succeeds instead of a `ForbiddenAccessException` (§2.2 —
fixed 2026-08-25, DB verified but not yet exercised through a running app)
☐ Send a file over the 1MB `MAX_FILE_SIZE_MB` limit through the real app
(not a raw API call) → confirm the frontend's "file too large" dialog
actually appears (HTTP 413, translated message) instead of a generic
failure (§2.2 — fixed 2026-08-25, not yet manually exercised end-to-end)
☐ Fresh app build after the `/vu-meet/private-chat/...` → `/vu-meet/chat/...`
route rename → confirm chat list, opening a chat, sending a message,
typing status, mark-seen, and video calls all still work end-to-end (§1.1
— fixed 2026-08-25, verified via `tsc`/`dart analyze` only, not run in a
live app)
☐ Send a typing status for a chat you are NOT a member of (raw API call,
bypassing the UI) → confirm it's now rejected instead of silently
succeeding (§1.1, known gap #18 — fixed 2026-08-25)
☐ Two logged-in sessions, one open chat between them: user A types, user B
has the chat open → confirm the typing indicator shows for B, then A sends
→ confirm the indicator crossfades into the new message bubble over ~250ms
rather than an instant swap (§3.2 — implemented 2026-08-25, not yet
interactively verified)
☐ Same setup, but user A lets the 2s inactivity timeout fire without
sending → confirm the indicator disappears instantly, with no crossfade
(§3.2 — the "only animate when a message follows live typing" condition)
☐ User A types in a chat while user B is on the chat list screen (not that
chat open) → confirm B's chat list row shows "typing…" in place of the
last-message preview, styled like the in-chat typing indicator, and reverts
correctly when A stops typing or sends (§3.2 — implemented 2026-08-25, not
yet interactively verified)
☐ Send a message in a group chat (3+ members) → confirm no seen-status
checkmark appears on the sender's bubble at all, including after tapping
the message to reveal its timestamp (§4.1, known gaps #20/#21 — fixed
2026-08-25); separately confirm a 1:1 chat's checkmark still behaves as
before (unaffected by the `isPrivate` gate)
☐ Call a chat you're NOT a member of via raw API calls to
`POST /vu-meet/chat/call` and `POST /vu-meet/chat/decline-call` → confirm
both are now rejected instead of ringing/declining a call for chat
members who never authorized it (§5.1, known gaps #22/#23 — fixed
2026-08-25)
☐ Trigger a genuine validation failure on a normal (in-app) call action
(e.g. revoke `canStartPrivateCall` for a test role, then try to call) →
confirm the OTHER participant's device does NOT ring/receive the call
notification — this is the "missing `return`" bug (#23); previously the
notification fired regardless of the validation result
☐ Group call, two members decline at effectively the same moment (or as
close as manually reproducible) → confirm the call still correctly
terminates for everyone, rather than under-counting and leaving a ghost
call (§5.4, known gaps #3/#28 — fixed 2026-08-25, race condition itself
not reproducible by hand, so unverified beyond code review)
☐ On a device/emulator where `flutter_callkit_incoming` fails to register
(e.g. `android.software.telecom` unsupported) receive an incoming call
push → confirm the fallback local notification ("Incoming call" /
"`{name}` is calling") appears instead of complete silence (§5.6, known
gap #29 — fixed 2026-08-25, not yet exercised against a real
telecom-less device)
☐ Mark a chat's messages as seen on one device while logged in on a second
device with the same account → confirm the second device's unread badge
updates live without needing its own action (§7, known gap #30 — fixed
2026-08-25, not yet manually exercised)
☐ Create a new 1:1 chat (via "get or create") without sending a message →
confirm it now appears immediately in the *other* party's chat list, not
just the creator's (§8, known gaps #30/#32 — fixed 2026-08-25)
☐ Open any chat's info panel → confirm the "End-to-end encrypted" badge is
gone (§9.3, known gap #1 — fixed 2026-08-25)
☐ Call `POST /vu-meet/bot` with no `Authorization` header (raw API call) →
confirm it's now rejected (401) instead of returning a bot reply to an
unauthenticated caller; separately confirm the in-app AI bot feature (if
exposed anywhere in the UI) still works normally for a logged-in user
(§9.4, known gap #34 — fixed 2026-08-25, not yet manually exercised)

---

## Change History

- **2026-08-25** — Fixed known gap #41 (§2.2): you reported that a
  file/picture message's "last message" preview (chat list row, push/WS
  notification) showed the raw filename instead of something generic.
  Root cause: `chat` cached only the last message's raw `content`,
  never its `type`, so `MessageContentFormatter` had no way to tell a
  filename apart from real text. Added `last_message_type` (migration
  `20260825_166_chat_last_message_type.ts`, backfilled to `TEXT`),
  set it in `KyselyCreateMessageInteractorRepo.save()` alongside
  `last_message`, and added a `type` field to `formatContent()` that
  substitutes a translated "Sent a file" label for `FILE`/`PICTURE`.
  Explicitly excluded the actual in-chat message list
  (`GetMessageListPresenter.ts`) from this substitution — its
  `messageContent` is used as the real filename to fetch/render the
  attachment, so it now bypasses the substitution the same way it already
  did for `CALL_EVENT`. Ran the migration against the dev DB and verified
  the column and default. `tsc --noEmit` clean; no automated test existed
  for any of the three files touched.
- **2026-08-25** — Fixed known gap #40 (§8): you reported that opening chat
  info on mobile immediately bounced back to the chat list. Traced to
  `SelectedChatCubit._onRouteChanged` (`selected_chat_cubit.dart`)
  comparing the GoRouter path template with exact equality
  (`route != '/vu-meet/:id'`) instead of checking whether it was still a
  sub-route of the open chat — navigating to `/vu-meet/:id/info` (or
  `/call`, `/call-summary`) looked identical to "left the chat" and
  cleared `SelectedChatCubit`'s state, which flips `VuMeetLayoutBuilder`'s
  mobile-only `hasChatOpen` check and swaps the rendered content back to
  the chat list. Changed the comparison to `startsWith` so chat sub-routes
  are correctly recognized as still being "in" that chat. Confirmed
  pre-existing — none of the files involved were touched by this
  session's earlier work. `dart analyze` clean; no test coverage existed
  for this cubit before or after.
- **2026-08-25** — Fixed known gap #35, renamed `HandlePrivateCallActionController`
  → `HandleCallActionController` (§5.1). You asked why the controller was
  named "Private" when it handles both private and group calls — traced it
  to stale naming left over from the earlier `PrivateChat`→`Chat` rename
  this session; the controller genuinely always handled both. Renamed the
  class, its folder (`HandlePrivateCallAction` → `HandleCallAction`), and
  its DTO/fake/Kysely/repo-picker siblings; also renamed
  `DeclineCall/dto/HandlePrivateCallActionReqBodyDTO.ts` →
  `DeclineCallReqBodyDTO.ts` (same stale-naming pattern, exported
  `DeclineCallReqBodyDTO` all along). Deliberately left
  `ValidateStartPrivateCall`/`canStartPrivateCall`/
  `ValidateStartPrivateCallRepo` alone — genuinely private-call-specific.
  While renaming, found a real production bug of the same shape as the
  group-call one already fixed this session:
  `HandleCallActionValidatorStorageRepoPicker` mapped both `DBEnv.FAKE`
  and `DBEnv.KYSELY` to an always-passing fake repo, making private-call
  chat-exists/membership validation a no-op in production. Added
  `KyselyHandleCallActionValidatorStorageRepo` (reusing
  `ChatKyselyHelper.isInvalidChat`/`isUserNotInChat`) and wired it in for
  `DBEnv.KYSELY`. Updated `docs/modules/group-chat.md`'s references to the
  new class name too (left `docs/decisions.md` alone — historical log
  entries aren't rewritten). `tsc --noEmit` clean; no test coverage
  existed for this controller before or after.
- **2026-08-25** — Moved `StartGroupCall`'s validator/repository/picker/
  fake/Kysely files (§5.1) out of the leftover `VuMeet/GroupChat/` folder
  on both `domain` and `client` into `VuMeet/Chat/`, matching where
  everything else in the unified `Chat` model already lives. You noticed
  the stale location while reviewing the `HandleCallAction` rename. No
  class/identifier renames this time — `ValidateStartGroupCall` etc. are
  accurately named for the group-call-only branch, only their folder was
  stale. Updated `docs/modules/group-chat.md`'s own path reference.
  `tsc --noEmit` clean on `client`; domain VuMeet suite 35/35 suites,
  64/64 tests passing.
- **2026-08-25** — Moved a second leftover you spotted: `packages/vu_meet/server/src/domain/VuMeet/GroupMessage/repository/`
  still held `IsInvalidGroupChatRepo.ts`/`IsUserNotInGroupChatRepo.ts`
  (the interfaces `ValidateStartGroupCallRepo` extends) into
  `packages/vu_meet/server/src/domain/VuMeet/Chat/repository/`; updated the 3 importing files.
  Left the generic `ValidateGroupChat`/`ValidateIsUserInGroupChat`
  validators in `Core/Validations/Validators/` alone — correctly placed,
  not feature-folder leftovers. `VuMeet/GroupChat`/`VuMeet/GroupMessage`
  no longer exist anywhere in either repo. `tsc --noEmit` clean on
  `client`; domain VuMeet suite 35/35 suites, 64/64 tests passing.
- **2026-08-25** — Fixed known gap #39 (§5.1): on a closer look than the
  entry above, `ValidateGroupChat`/`ValidateIsUserInGroupChat` turned out
  to be genuine functional duplicates of `ValidateChat`/`ValidateIsChatMember`
  (same exceptions, same logic, only the repo method names differed),
  not just correctly-placed generic validators as first assumed. Decision
  (asked): unify them. `ValidateStartGroupCall` now uses
  `ValidateChat`/`ValidateIsChatMember` and `ValidateStartPrivateCallRepo`
  directly, same as `ValidateStartPrivateCall`. Deleted
  `ValidateStartGroupCallRepo.ts`, `IsInvalidGroupChatRepo.ts`,
  `IsUserNotInGroupChatRepo.ts`, `ValidateGroupChat.ts`,
  `ValidateIsUserInGroupChat.ts`. Kept the client-side
  `FakeStartGroupCallValidatorStorageRepo`/`KyselyStartGroupCallValidatorStorageRepo`/
  `StartGroupCallValidatorStorageRepoPicker` trio as a distinct DI wiring
  point, but retyped to `ValidateStartPrivateCallRepo`'s `isInvalidChat`/
  `isUserNotInChat` — `KyselyStartGroupCallValidatorStorageRepo` already
  forwarded to the same `ChatKyselyHelper` methods, so this is a pure
  rename with no behavior change. Updated `ValidateStartGroupCall.test.ts`
  and added a previously-missing membership-check test case. `tsc --noEmit`
  clean on `client`; domain VuMeet suite 35/35 suites, 65/65 tests passing.
- **2026-08-25** — Fixed known gaps #36 and #37 (§1.3, §1.6), following up
  on the `HandleCallActionController` rename finding. Scanned every
  `*ValidatorStorageRepoPicker`/`*ValidatorRepoPicker` in the **entire**
  client codebase for the `DBEnv.FAKE`==`DBEnv.KYSELY` always-passing-fake
  shape — found it 40 times app-wide (logged as known gap #38, out of
  scope here, not fixed). Narrowed to VuMeet and fixed the two real ones:
  (1) `UpdateChatValidatorStorageRepoPicker` — a correct
  `KyselyUpdateChatValidatorStorageRepo` already existed but was never
  wired in, meaning §1.3's membership-check fix from earlier today never
  actually took effect in production; wired it in. (2)
  `GetChatInfoController` had no membership check at all, and its
  "Kysely" existence-check file was itself an unfinished hardcoded stub;
  added `ValidateIsChatMember` to `ValidateGetChatInfo`, wrote a real
  `KyselyGetChatInfoValidatorStorageRepo`, and wired it in. Added test
  cases to `ValidateGetChatInfo.test.ts` (previously only tested the
  permission check). Domain VuMeet suite: 35/35 suites, 64/64 tests
  passing; `tsc --noEmit` clean on `client`.
- **2026-08-25** — Fixed known gap #24 (§5.2, §6): backend
  `FIREBASE_ADMIN_KEY_FILE` pointed at Firebase project `vukmark-63f3e`
  while the Flutter app is registered under a
  different project, `vukmark-349aa` — apparently created when the app's
  package name was changed at some point, leaving the backend credential
  pointed at the stale project. Every push send failed, for every
  platform, with web only appearing to work because open tabs get live
  updates over WebSocket instead. Swapped in a `vukmark-349aa`
  service-account key (`apps/copor/server/.env` and `apps/copor/server/.dist.env`); the
  key file itself lives outside git (root `.gitignore` now excludes
  `*firebase-adminsdk*.json`, since nothing previously ignored that path).
  Verified against a live device: server logs show
  `targetedDeviceCount: 2, deliveredDeviceCount: 2, failedDeviceCount: 0`.
- **2026-08-25** — Fixed known gap #25 (§5.2): during live-device
  verification of the push fix above, the push arrived but triggered
  `AuthenticationTokenNotFound` server errors. Cause:
  `firebaseMessagingBackgroundHandler` (`frontend/lib/main.dart`) rebuilds
  the DI container per-push (`di.init()`) but never re-ran
  `addInterceptors(di.getIt<Dio>())` — that only happens once in `main()`,
  which doesn't run in the background isolate. Any HTTP call from that
  isolate (`CallKitService`/`CallBloc` reconciling the incoming call) had
  no `TokenInterceptor` attached and sent no `Authorization` header. Fixed
  by calling `addInterceptors(...)` right after `di.init()` in the
  background handler. This is also the likely explanation for an earlier
  "request cancelled until hot restart" symptom — hot restart re-runs
  `main()` and wires the interceptors correctly, masking the background-
  isolate gap.
- **2026-08-25** — Fixed known gap #26 (§5.2): while investigating the
  above, found `JwtAuthenticationMiddleware.authenticate` returned
  `HttpStatusCode.INTERNAL_SERVER` (500) for a missing auth token instead
  of 401, inconsistent with `handleTokenError`'s existing 401 for
  expired/invalid tokens. Changed to `HttpStatusCode.UNAUTHORIZED`.
- **2026-08-25** — Resolved open question #29, closed known gap #7 (§5.3).
  Decision (asked): `START_CALL` intentionally produces no in-chat message
  (record outcomes only, not every ring attempt). Deleted the unreachable
  `case 'START_CALL':` branch from `CallEventNotification`. Found and fixed
  known gap #27 while doing so: that branch was merged with the live
  `CALL_ACCEPTED` case, so an accepted call's in-chat message incorrectly
  read "`{name} started a call`" instead of "Call accepted" — the correct
  `CALL_ACCEPTED` translation key existed but was never wired up. Fixed the
  label and deleted the now-fully-dead `CALL_STARTED_NOTIFICATION`
  translation key (getter in `vu_meet_translation.dart` + both `en.json`/
  `de.json` locale entries). Noted but did not touch a separate, broader
  dead-code area (`CallActionType.toTranslationKey()` and several unused
  `VuMeetPageTranslation` call-action getters) — out of scope for this fix.
- **2026-08-25** — Fixed known gap #3, resolved open question #19 (§5.4).
  Decision (asked): made the group-call decline/terminate threshold
  authoritative via `CallRosterRegistry` instead of the client-echoed
  `numberOfDeclinedCalls` counter, which had a real race (two simultaneous
  declines could both read the same stale count). `DeclineCallController`
  now calls `callRosterRegistry.markDeclined()` first and decides
  decline-vs-terminate from the returned `RosterEntry`: an empty
  `participants` map (registry already determined no one is left
  RINGING/JOINED) or a missing entry both terminate the call; otherwise the
  reported `numberOfDeclinedCalls` is computed from the roster's own
  `DECLINED` count. Private (1:1) calls are unaffected — no roster entry
  ever existed for them, and a single decline always terminated already.
  Left `DeclineCallReqBodyDTO.numberOfDeclinedCalls` in place as an unread,
  vestigial field rather than changing the request contract (known gap
  #28) — the frontend still sends it. `tsc --noEmit` clean; no automated
  test added (calls module has no test coverage yet).
- **2026-08-25** — Resolved open question #21 (§9.1, §5.5): confirmed
  (asked) that the red header status you saw is
  `GroupCallMissingMembersPill`, shown in a group chat's header during an
  active call when a member declined/left/didn't answer. No code change —
  documentation only. Also confirmed (asked) that the Jitsi auto-join fix
  (§5.5, "Fixed this session" — `returnToCall()` on connect instead of a
  manual pill tap) has **not yet been tested against a live two-device
  call**; left documented as fixed-in-code, unverified-in-practice.
- **2026-08-25** — Fixed known gap #29, resolved open question #20 (§5.6).
  Fully traced foreground/background call delivery for the first time
  (`notification_service.dart`, `main.dart`'s
  `firebaseMessagingBackgroundHandler`, `callkit_service.dart`). Found that
  `CallKitService.showCallNotification()` had no try/catch — on a device
  where native CallKit/Telecom registration fails (confirmed via
  `UnsupportedOperationException: android.software.telecom` on at least
  one emulator this session, same error as the very first log shared
  today), the call would throw unhandled in the background isolate and the
  incoming-call notification would silently never appear. Decision
  (asked): add a fallback. `firebaseMessagingBackgroundHandler` now wraps
  the call in try/catch and shows a plain local notification ("Incoming
  call" / "`{name}` is calling") on failure, reusing the existing
  avatar-resolution helper. `dart analyze` clean; not exercised against a
  real telecom-less device.
- **2026-08-25** — §7 pass: traced the previously-unhandled `WebSocketHelper`
  event handlers (`CHAT_LIST_UPDATED`, `REMOVED_FROM_GROUP_CHAT` — both
  handled correctly in `ChatListBloc`). Corrected known gap #8: the
  "picture field mismatch" was stale — the live Kysely repo already sends
  a resolved `lastMessageChatPicture` URL (an extra runtime property not
  declared on the TS interface but still serialized), only the
  `DB_ENV=FAKE` dev fixture omits it, so production was never affected.
  While tracing it, found `MessageData.toDSNotification()` (fed by that
  same field) is real, live code — feeds the app's notification
  bell/inbox via `ChatListBloc` — a different consumer than the one
  originally suspected. Resolved open question #26 (decision: delete):
  confirmed `NewMessageNotification`/`MessageContentInNotification` are
  genuinely unreached and deleted both files. Fixed known gap #30
  (decision: wire it up): `NUMBER_OF_UNREAD_MESSAGES` had zero frontend
  listeners; added a `ChatListBloc` handler calling the existing
  `getNotificationsCount()` dispatcher, enabling live multi-device
  unread-badge sync. Resolved open question #25 (traced): `ChatListBloc`
  resyncs on `WebSocketConnected`, typing status and the group-call roster
  do not — logged as known gap #31, not fixed (larger resync-design work,
  left for a separate pass). `dart analyze` clean; no automated test
  added (no WebSocket-event tests exist for these blocs).
- **2026-08-25** — Fixed known gap #32, resolved open question #30 (§8).
  Decision (asked): a freshly-created empty 1:1 chat was invisible in the
  chat list to everyone except whoever sent (or is about to send) the last
  message — confirmed this was an accidental filter, not intended UX.
  Removed the `WHERE (isPrivate = false OR lastMessage != '' OR
  lastMessageSentBy = userId)` clause from
  `KyselyGetUserChatListInteractorRepo.list()` entirely; the fake repo
  never implemented this filter so needed no change. `tsc --noEmit`
  clean; no test coverage existed for this repo before or after. Also
  fixed known gap #9 (decision, asked: delete): `NumberOfUnseenMessages`
  confirmed dead (superseded by `DTBadge`, never instantiated) and
  deleted. `dart analyze` clean.
- **2026-08-25** — Fixed known gap #1, resolved open question #23 (§9.3).
  Confirmed no encryption exists anywhere in the codebase. Discussed the
  real scope of building actual E2E encryption (per-user keypairs,
  group-chat key distribution, multi-device support — already a live
  concern, since this user is logged in on more than one device today —
  losing/redesigning server-side message search, push-notification
  previews, no retroactive encryption of existing history): concluded
  it's multi-week project work deserving its own design doc, not part of
  this spec pass. Decision (asked): remove the badge now rather than
  continue showing a false security claim while that work is scoped
  separately. Removed the "End-to-end encrypted" chip from
  `chat_info.dart`'s `DTEntityHeader.large`; also removed the `dc`/
  `CoporColors` local variable that only the badge used. `dart analyze`
  clean.
- **2026-08-25** — Fixed known gap #34 (§9.4). Tracing turned up a worse
  gap than originally documented: `POST /vu-meet/bot` wasn't just missing a
  permission check for authenticated users — it required **no
  authentication at all**, excluded in both the backend's
  `JwtAuthenticationMiddleware` and the frontend's `PublicRoutes`.
  Decision (asked): fix the auth gap now, leave the feature's full scope
  (role/permission-scoped access, whether it belongs in this doc) for
  later. Removed the exclusion from both `JwtAuthenticationMiddleware.ts`
  and `public_routes.dart` (the latter so the frontend's `TokenInterceptor`
  actually attaches the auth token on this route instead of skipping it) —
  the endpoint now requires a valid JWT like the rest of the app.
  Deliberately left it at plain-authentication only, no role scoping,
  since that's blocked on the still-open scope question. `tsc --noEmit`
  and `dart analyze` clean.
- **2026-08-25** — Final consistency pass over §§10-12: fixed a dangling
  cross-reference in known gap #9 (referenced a #33 that was never
  created). Promoted two open questions that had been sitting inline in
  §12's test-case seed list without ever being added to the §11
  consolidated list — group-membership dedup for groups (now #31) and
  untraced multi-device call ringing (now #32) — and pointed §12's prose
  at them instead of duplicating the question text. Added test cases for
  the session's later fixes that didn't have one yet: the decline/
  terminate race fix (§5.4), the CallKit fallback notification (§5.6),
  live multi-device unread-badge sync (§7), the empty-chat visibility fix
  (§8), the removed E2E badge (§9.3), and the AI Bot auth fix (§9.4).
  Updated the push-delivery test case to reflect the live-device
  verification already done this session. Documentation only, no code
  changes.
- **2026-08-25** — Fixed known gaps #22/#23, resolved open question #18
  (§5.1). Decision (asked): keep `DeclineCallController` as its own
  controller rather than merging into the shared
  `HandleCallActionController` action switch — decline's
  escalation logic doesn't map onto that structure without an API-contract
  change for what was otherwise a cosmetic inconsistency. Added the
  missing `ValidateStartPrivateCall`/`ValidateStartGroupCall` check to
  `DeclineCallController` (previously zero validation at all — any
  authenticated user could decline/terminate a call in a chat they weren't
  a member of). While adding it, found a more serious pre-existing bug in
  the sibling controller being mirrored: `HandleCallActionController`
  called `this.next(validationResult)` on failure but never `return`ed,
  so — since `this.next` is just Express's `NextFunction`, confirmed via
  `BaseController` — execution continued regardless, meaning every
  validation check on that endpoint was silently non-blocking (the call
  action's push/WebSocket/message/roster side effects fired to other
  participants even on a permission or membership failure). Fixed both
  controllers together. `tsc` clean.
- **2026-08-25** — §4.2: formally closed out open question #17 — already
  traced, no ambiguity or decision needed. Opening a chat marks
  everything in it seen regardless of scroll position (no viewport-based
  partial marking). No code changes; §4.2 has no remaining open items.
- **2026-08-25** — Fixed known gaps #20/#21, resolved open questions #15
  (further) and #16 (§4.1, §4.2): traced `isSeen` in full — it's a single
  shared `message.seen` boolean, flipped by whichever group-chat
  recipient opens the chat first, with no per-recipient concept at all
  (the genuinely per-user `message_seen` table exists but is only
  read by unread-*count* queries, never by the message list). This means
  the seen checkmark previously reported "seen" for an entire group the
  moment any single member looked — actively misleading, not just
  imprecise. Decision: hide the seen-status indicator entirely for group
  chats for now (`MessageItemContainer`'s `showSeenStatus` now requires
  `isPrivate`), rather than build correct per-recipient tracking
  immediately (real feature work, left for later — starts from
  `message_seen`'s existing data). Also fixed a second render path in
  the same file that showed the checkmark unconditionally, which would
  have undermined the fix by leaking it back in whenever a message's
  timestamp was tapped visible. `dart analyze` clean.
- **2026-08-25** — §4.1: corrected known gap #6 — the "hardcoded English
  seen-status text" was never a live bug, since `SeenStatus`
  (`packages/vu_meet/flutter/lib/src/presentation/components/message/`),
  `MessageModel` (`data/model/vu_meet_message/message_model.dart`), and
  `interpretSeenStatus()` (`utils/helper_functions.dart`) were all dead
  code — nothing in the app ever constructed `SeenStatus`; the only live
  seen-status indicator is the icon-based `MessageSeenStatus`. Deleted all
  three. Also resolved open questions #14 and #15 by asking: binary
  seen-status is the intended model (no 3-state build — no
  delivery-receipt signal exists server-side to build a third state
  from), and per-member group seen-status stays explicitly out of scope
  for now (real feature work, not green-lit this pass). `dart analyze`
  clean after the deletion.
- **2026-08-25** — Implemented the typing→message crossfade animation
  (§3.2, open question #13), a genuine feature request rather than a bug
  fix. Design decisions (asked, not inferred): crossfade not morph; only
  triggers when a message arrives while the indicator is actively showing
  (a plain 2s timeout still disappears instantly); applies to both the
  open conversation and the chat list. Added `justArrivedMessageId` to
  `VuMeetMessageState` and a `ClearJustArrivedMessage` one-shot event to
  drive the conversation-view crossfade (`TypingIndicator` fades out,
  `MessageFeed` fades the arriving bubble in, both over a shared 250ms
  constant). Wired `ChatListBloc` to subscribe to `TYPING_STATUS` for the
  first time (previously chat-list-blind to typing entirely) and added a
  local `typingByChatId` map updated directly from the WebSocket event
  (no REST round-trip, unlike the existing new-message refetch pattern —
  typing fires too often for that). Verified via `dart analyze` (clean)
  and `flutter build web --release` (succeeds); not interactively
  verified — needs two simultaneous live sessions to confirm the actual
  crossfade feel, not set up this pass.
- **2026-08-25** — Resolved open question #11, deepened #12 (§3.1): traced
  typing-status delivery and the frontend handler. Server-side broadcast
  to all group-chat members is correct (`KyselySendChatTypingStatusRepo`
  loops every `chat_user_map` row, no 1:1 assumption) — no bug. The
  multi-typer limitation (OQ#12, known gap #4) is confirmed structural,
  not just a display simplification: `_handleTypingStatus` never even
  parses `userId` from the payload, and `VuMeetMessageState.typingStatusModel`
  is a single slot with no per-chat check at the state-update layer
  (filtering happens only in the `TypingIndicator` widget's render
  condition). Still an open product decision, not fixed — building
  per-sender tracking wasn't asked for and is a design call, not a bug
  fix. Documentation only — no code changes.
- **2026-08-25** — Resolved open question #10 (§2.4): confirmed
  `POST /vu-meet/message/search` (per-chat) exists and is correctly
  mounted, and `group-message/search` isn't broken/orphaned — it's simply
  gone, consistent with `GroupMessage`'s deletion. Bigger finding along
  the way: the frontend doesn't call *either* search endpoint anywhere —
  the earlier global-search backend fix (§2.4, 2026-08-21) is currently
  unreachable through the app, and the chat-info panel's "Search" button
  is a known no-op stub (§9.2). Not a regression, just unimplemented UI.
  Documentation only — no code changes.
- **2026-08-25** — Resolved open question #9 (§2.3): traced message list
  pagination — page size 20 (`Preferences.getVuMeetMessageLimit()`),
  seamless scroll-triggered infinite scroll (no "load more" button), and
  confirmed `afterDate` is plumbed end-to-end but never actually sent by
  any frontend call site (dead in practice, not a bug). Documentation only
  — no code changes.
- **2026-08-25** — Completed the `PrivateChat` → `Chat` rename that was
  deliberately deferred during the earlier `PrivateMessage` → `Message`
  rename (§1.1), across all three repos (`domain`, `client`, `frontend`),
  including a breaking API route change (`/vu-meet/private-chat/...` →
  `/vu-meet/chat/...`) with the frontend updated to match. Found and fixed
  two unrelated issues while touching this code: `ValidateSendTypingStatus`
  was never wired into `SendPrivateChatTypingStatusController`, leaving the
  typing-status endpoint with no permission or membership check (known gap
  #18); and a broken import in
  `SaveAccountDeletionRequestedNotificationRepoPicker.ts` left over from
  the earlier `PrivateMessage` rename (known gap #19). Also normalized the
  unrelated `isPrivateChat`/`isPrivate` DTO field-naming inconsistency to
  `isPrivate` everywhere, since the frontend's JSON deserialization relies
  on the field name matching the wire key. Full write-up in §1.1. Domain
  tests pass (66/66 in VuMeet/WebSocket); `tsc` clean in domain and
  client; `dart analyze` clean in frontend. Not manually exercised in a
  running app.
- **2026-08-25** — Fixed known gaps #2 and #17 (§2.2), resolved open
  questions #7 and #8:
  - **#2 (`canGetVuMeetFile` permission):** confirmed via the live DB (not
    just doc text) that permission `347` was seeded Super-Admin-`ALLOW` /
    everyone-else-`DENY` (`20260713_032_seed_role_permission.ts`), while
    every other VuMeet permission is broadly granted — a real,
    unintentional gap blocking every non-admin user from downloading files
    they receive in chat. Fixed with a new migration
    (`20260825_160_grant_vu_meet_file_download_all_roles.ts`, same pattern
    as `20260820_152_reenable_todo_feature_for_all_roles.ts`) granting
    `ALLOW` to the 6 previously-denied roles. Ran and manually verified
    against the dev DB, including the `down()` reversal.
  - **#17 (file-size rejection UX):** found the 10MB assumed in the open
    question was wrong — live `MAX_FILE_SIZE_MB` is 1; left that value
    alone (config, not a bug). The actual bug: multer's own upload-size
    limit fires before `ValidateFileSize` ever runs (same threshold,
    always wins), and neither multer's raw error nor
    `InvalidFileSizeException` had an `ErrorToHttpStatusCode` entry or
    translation — both fell back to an untranslated 400, while the
    frontend's dedicated dialog only triggers on 413. Fixed by mapping
    `InvalidFileSizeException` → 413 with en/de translations, and
    normalizing multer's `LIMIT_FILE_SIZE` error into
    `InvalidFileSizeException` in the global Express error handler
    (`App.ts`) so the path that actually fires in production also gets
    the clean 413. Not covered by an automated test — the client repo's
    jest suite is broadly broken pre-existing (unrelated `@domain/*`
    module-resolution gap in `jest.config.js`, confirmed via `git stash`);
    verified via `tsc` and manual review instead.
- **2026-08-25** — Fixed known gap #16 (§2.1): `ValidateCreateMessage`
  never inspected message `content` — no empty-content rejection, no length
  limit, and (project-wide, not VuMeet-specific) no sanitization validator
  existed anywhere in the codebase. Added `ValidateEmptyContent` (reused
  from `ContentItem`/`ToDoComment`'s existing pattern) and a new generic
  `ValidateMaxLength` (`packages/core/server/src/domain/Core/Validations/Validators/`) with a
  5000-character cap, throwing the new `ContentTooLongException`. Decision:
  skip sanitization — frontend renders content via a plain `Text()` widget
  with no markup parsing, so there's no stored-XSS path the missing
  sanitization would have exposed; the 5000-char limit was a product
  decision (chosen over 2000/10000 alternatives), not derived from
  existing UI copy or precedent. Verified the fix doesn't collide with
  file/picture sends, which populate `content` with the file name, not an
  empty string. Domain tests added and passing; client typecheck clean
  (one pre-existing, unrelated module-resolution error confirmed via
  `git stash` before touching anything). Translated (en/de).
- **2026-08-25** — Fixed known gap #15 (§1.5): the DB unique constraint on
  `chat_user_map (chat_id, user_id)` (added 2026-08-23) had no
  application-level counterpart, so a duplicate-id request surfaced as a
  raw, untranslated MySQL error. Two-layer fix: (1) new
  `ValidateNoDuplicateChatMembers` validator wired into both
  `ValidateGetChatWithUser` and `ValidateUpdateChat`, checking the
  exact final member list (input ids + actor) for duplicates before the
  request reaches the DB; (2) both Kysely repo insert sites
  (`KyselyGetChatWithUserInteractorRepo.load`,
  `KyselyUpdateChatInteractorRepo.save`) now catch a MySQL `ER_DUP_ENTRY`
  via a new `isDuplicateEntryError` helper and rethrow the domain-level
  `DuplicateChatMemberException`, mapped to HTTP 409 in
  `ErrorFormatterInstance` and translated (en/de). Decision: keep both
  layers — dedup validation handles the common malformed-request case
  cleanly, the DB-error catch remains the backstop for the genuine
  concurrent-write race that validation alone can't prevent. Domain tests
  added and passing.
- **2026-08-25** — Fixed known gap #14 / open questions #5 and #28 (§1.4):
  added `ValidateChatMemberCount` (`MIN_CHAT_MEMBER_COUNT = 2`), wired into
  both `ValidateGetChatWithUser` and `ValidateUpdateChat`, throwing
  the new `InvalidChatMemberCountException` whenever a create/update would
  leave a chat (including the actor) with fewer than 2 members. Decision:
  enforce the invariant rather than defensively handle it on the read side.
  Confirmed the upper bound (`is_private` chats never exceeding 2 members)
  was already self-enforcing via the existing recompute-on-every-write
  logic (OQ#2) — only the 1-member floor needed a new guard. Also added the
  `EmptyGroupChatNameException` translation entry that was missing from
  both `locales/error/en.json`/`de.json` since the 2026-08-24 fix (spotted
  while adding the new exception's own entries, not otherwise in scope).
  Domain tests added and passing.
- **2026-08-25** — Fixed known gap #13 / open question #4 (§1.3):
  `ValidateUpdateChat` now runs `ValidateIsUserInChat`, requiring the
  actor to be a member of the chat regardless of `canUpdateChat` permission
  scope. Decision: no exceptions, including Super Admin. Domain tests
  added and passing.
- **2026-08-24** — Confirmed known gap #13 / open question #4 (§1.3):
  `ValidateCanUpdateChat` has no membership check, only a permission check.
  Live dev DB confirms `canUpdateChat` (`permission_type = 349`) is
  currently `ALLOW` for Super Admin only, `DENY` for every other role,
  `scope = 'ALL'` (not chat-scoped). Not fixed — needs a product decision
  on whether to add a membership check before implementing.
- **2026-08-24** — Fully resolved open question #3 (blank group-name
  display, §1.2): added server-side rejection (`ValidateGroupChatName` in
  both `ValidateGetChatWithUser` and `ValidateUpdateChat`) and a
  frontend defensive fallback (`chatDisplayName()` helper, translated
  "Group" placeholder wired into the three render sites). Domain tests
  added and passing.
- **2026-08-24** — Narrowed open question #3 (blank group-name display,
  §1.2): traced `create_chat_screen.dart`'s form validation and confirmed
  the standard "New Group" flow already blocks empty names client-side, and
  `edit_group_modal.dart` has no rename field to reintroduce one. Remaining
  open: server-side validation and defensive UI fallback, in case a blank
  name ever reaches the DB via another path.
- **2026-08-23** — Found and fixed known gap #12 / open question #27: no DB
  or application-layer uniqueness guard on `chat_user_map (chat_id,
  user_id)`. Traced both write paths (`GetChatWithUser`,
  `UpdateChat`) — neither validated it; today's frontend had only avoided
  triggering it by accident of UI design (toggle-based contact pickers, and
  `UpdateChat`'s exclude-then-re-add pattern for the actor). Fixed via
  migration `157`, adding a unique constraint on `(chat_id, user_id)`
  (verified: duplicate insert now fails with MySQL 1062 instead of
  succeeding silently). See §1.5.
- **2026-08-23** — Renamed `private_message` → `message` (matching
  `chat`), and the class/folder/route layer to match (`VuMeet/PrivateMessage/`
  → `VuMeet/Message/` in both `domain` and `client`; `/vu-meet/private-message/...`
  → `/vu-meet/message/...`, including `frontend`'s Retrofit clients). See
  [decisions.md](../decisions.md), 2026-08-23 (2).
- **2026-08-23** — Resolved open question #2 (`UpdateChat` recomputes
  `is_private` on every call, §1.2) and confirmed the old group/private
  tables are fully dropped from the schema, not just deprecated (§1.1).
- **2026-08-23** — Fixed known gap #11 / open question #1: `private_message.type`
  DB enum didn't include `FILE`, even though it was the only type the live
  attachment-send flow ever used — every attachment send was failing at the
  DB layer. See [decisions.md#2026-08-23](../decisions.md#2026-08-23).
- **2026-08-21** — Initial version, written as a full-code-trace seed for a
  collaborative spec-writing session with the client. Supersedes the stale
  parts of `VU_MEET_USECASES.md`. Many sections are intentionally
  incomplete/open — this is the start of the process, not the end.
