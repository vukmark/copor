# Decisions

Log of product/business decisions that aren't derivable from code — mainly
so that "the boss changed their mind" has a paper trail. It keeps only
entries that still bind live code (2026-10-02 (4)). Append newest at the
bottom, above the `<!-- newest entries go here -->` marker. Cross-reference
the relevant module doc under `modules/` where applicable.

Format:

```
## YYYY-MM-DD

Decision: <what was decided>
Requested by: <who>
Reason: <why>
Affects: <module doc(s)>
Status: Accepted | Reverted | Superseded by <date>
```

## 2026-08-04

Decision: When a user belongs to multiple User Groups and their resolved
permissions disagree for the same permission (one group's chain resolves to
`ALLOW`, another's to `DENY`), **`DENY` wins over `ALLOW`**.
Requested by: Management (relayed via volkov)
Reason: Matches the existing live implementation
(`KyselyPermissionHelper.resolvePermission`, `packages/core/server/src/client/Core/Helpers/KyselyPermissionHelper.ts`,
used to resolve a user's effective permission across all their User
Groups) already built this way by the backend lead. Adopting the code's
existing behavior as the source of truth, on the reasoning that every
permission defaults to `DENY`, so the more conservative outcome winning on
conflict is the correct fit for that model — rather than rewriting working
code to match a doc that had it backwards.
Affects: [permissions.md](./workflow/permissions.md) (Inheritance section
— previously documented "Allow wins over Deny," now corrected to match);
[permission_system.md](./dev_documentation/permission_system.md). Does
**not** settle which direction the *scope* tie-break should go (broadest
vs. narrowest) — that's a different question and remains undecided.
Status: Accepted

## 2026-08-20 (9)

Decision: `News` (table `news`) and `ContentItem` (table `content_item`) are
not equivalent, despite `ContentItem` having its own `NEWS` content type.
`News` was built first as a narrow, purpose-built feature; `ContentItem`
came later as a generalization ("Content Item (News, T&C etc.)") meant to
eventually absorb News and other content types, but the move away from
`News` was never completed. `News` is the correct home for real news
content. Do not add further `content_item` rows of type
`TERMS_AND_CONDITIONS`: that type is singleton-seeded and
`KyselyGetTermsAndConditionsRepo` fetches it with `.executeTakeFirst()` and
no other filter, so extra rows make it ambiguous which one is served.
Requested by: volkov
Reason: Traced via git history rather than guessed, while deciding where
news content belongs.
Affects: `packages/news/server/src/client/News`, `packages/core/server/src/client/ContentItem`.
Status: Accepted

## 2026-08-21

Decision: VuMeet keeps exactly one chat/message model going forward —
`chat`/`chat_user_map` (backed by the `PrivateChat`/
`PrivateMessage` code, despite the "private" naming — it's already an
N-member entity distinguished only by an `isPrivate` flag). The separate
`GroupChat`/`GroupMessage` feature trees (own tables, own controllers,
own routes) are deleted rather than built out, since the frontend never
called any `/vu-meet/group-*` endpoint and `StartGroupCall` was never
wired server-side (no route, no real repo). Two dead `PrivateChat`
sub-features that still pointed at the older, superseded dyadic
`private_chat` table (plain `CreatePrivateChat`, plain `GetPrivateChat` —
the frontend only ever calls the get-or-create `.../private-chat/user`
endpoint) were deleted too, along with several orphaned duplicate Kysely
repos left over from an earlier, incomplete migration onto `chat`.
The one thing kept from `GroupChat`: `ValidateStartGroupCall` and its
repository interface, since `HandleCallActionController` (then
`HandlePrivateCallActionController`) actually
uses them today for the "more than 2 members" branch of call validation —
that repo's `KYSELY` slot had been silently pointed at the always-passing
`Fake` implementation in production (a real, unnoticed membership-check
gap), now replaced with a real implementation against `chat_user_map`.
Requested by: volkov (initial ask was "delete PrivateChat, keep
GroupChat" — reversed after research showed the opposite was true; see
chat transcript for the four research passes that established this).
Reason: The initial premise assumed `GroupChat` was live and `PrivateChat`
was the redundant legacy path; full tracing of what the frontend actually
calls and which Kysely repo each `DBEnv.KYSELY` slot resolves to showed
the reverse. Consolidating on the code path that's actually wired and
tested in production, rather than the one matching the more "obviously
correct" name.
Affects: [VuMeet.md](./modules/VuMeet.md).
Status: Accepted, implemented

## 2026-08-21 (2)

Decision: The application time zone becomes an admin-configurable system
setting (`timeZone`, an IANA zone identifier, e.g. `Europe/Berlin`) instead
of a hardcoded constant. Default value is `Europe/Berlin` ("Germany" —
Central European Time / Central European Summer Time), which via the IANA
tz database already switches CET ⇄ CEST automatically twice a year; no
separate DST logic was added. All local ⇄ UTC date/time conversion for DB
reads/writes goes through this setting (see
[database_pattern.md](./dev_documentation/database_pattern.md) for the
shared conversion utilities `TimeTransformer`/`DateTransformer`).
It lives under its own top-level `TIME_ZONE` System Settings type/menu
entry (`Administration > System > Time Zone`), not folded into the
existing `GLOBAL` type's "Master Data of the educational institution"
form — Time Zone is an operational/instance-wide setting unrelated to the
institution's name/postal code, so bundling it there was confusing
(caught in review before merge; the first pass had briefly added it to
`GLOBAL`).
Requested by: sasa
Reason: The instance previously ran on whatever time zone the server
happened to be configured with, which is wrong for a product whose
deployments are Germany-based but aren't guaranteed to stay on a German
server.
Affects: [modules/SystemSettings.md](./modules/SystemSettings.md)
Status: Accepted

## 2026-08-23

Decision: `MessageContentType.FILE` is the real, live message type for chat
attachments — not dead/aspirational, and not something `PICTURE` should be
kept alongside as an active alternative. Traced the frontend's actual send
path (`conversation_view.dart` → `vu_meet_message_repository_impl.dart`):
every attachment (image, document, or unsupported file) sent via the media
picker hardcodes `type: "FILE"`; no current code path ever sends `PICTURE`.
The DB migration for `private_message.type` had never been updated to allow
`FILE` (`20260202_4.2_private_message.ts` only had `'TEXT' | 'PICTURE' |
'CALL_EVENT'`), so every attachment send was failing at the DB constraint
level in production.
Requested by: Aleksandar Volkov
Reason: found while writing `docs/modules/VuMeet.md`'s spec-in-progress —
this was flagged as an open question (is `FILE` meant to replace `PICTURE`?)
and resolved by tracing the actual frontend send path rather than guessing.
Affects: [VuMeet.md](./modules/VuMeet.md) §1.1, §10 (gap #11), §11 (question #1)
Fix: `packages/core/server/src/client/Core/Database/migrations/20260823_155_private_message_file_type.ts`
alters the column to `enum('TEXT','PICTURE','CALL_EVENT','FILE')`, keeping
`PICTURE` for existing rows/back-compat since nothing writes it going forward.
Status: Accepted

## 2026-08-23 (2)

Decision: Rename `private_message` → `message` to match its sibling
`chat`, and follow through at the class/folder/route layer in `domain`,
`client`, and `frontend`. The table name predated the unified `chat`
model — it was originally paired with the now-deleted dyadic `private_chat`
table (see the 2026-08-21 entry above) — and wasn't renamed along with
`chat` when that consolidation happened. `PrivateChat`'s own
naming (still sitting on `chat`) is explicitly left as-is; that
inconsistency is deferred, not fixed here.
Requested by: Aleksandar Volkov
Reason: raised while discussing table naming inconsistencies found in `docs/modules/VuMeet.md` — decided to fix the one specific
mismatch (`private_message`) now rather than the broader convention.
Affects: [VuMeet.md](./modules/VuMeet.md) §1.1, Change History
Fix: `packages/vu_meet/server/src/client/VuMeet/migrations/20260826_170_private_message_to_message.ts`
renames the table; `domain`'s `VuMeet/PrivateMessage/` → `VuMeet/Message/`
(e.g. `CreatePrivateMessage` → `CreateMessage`, permission enum members
`canCreatePrivateMessage`/`canGetPrivateMessageList`/`canMarkPrivateMessagesSeen`
→ `canCreateMessage`/`canGetMessageList`/`canMarkMessagesSeen`, numeric
values unchanged so no permission-data migration needed); `client`'s mirror
folder renamed the same way, plus the HTTP route `/vu-meet/private-message/...`
→ `/vu-meet/message/...`; `frontend`'s two Retrofit remote sources
(`vu_meet_message_remote_source.dart`, `private_message_list_remote_source.dart`)
updated to match and regenerated via `build_runner`.
Status: Accepted

## 2026-08-25 (3)

Decision: Per-attachment access on ToDo attachments is enforced by a
dedicated business validator delegating to a Kysely `isForbidden*Access`
repo check (`ValidateCanAccessToDoForAttachment`/
`ValidateCanAccessAttachmentForToDo` → `ToDoKyselyHelper.isForbiddenToDoAccess`),
on top of flat role permissions — not via `PermissionScope`, and not
`ToDoComment`'s flat-permission-only model (which has no per-resource check
at all).
Requested by: boledelija98 (client)
Reason: Files are more sensitive than a comment; the "flat permission +
dedicated access check" shape was the existing, already-shipped precedent
for attaching files to a record, so reusing it keeps file-attach features
consistent with each other.
Affects: [ToDo.md](./modules/ToDo.md)
Status: Accepted

## 2026-08-29 (3)

Decision: SMTP settings' single `smtpIsSecure` boolean is replaced with two
explicit dropdowns — `smtpConnectionSecurity` (`None` / `STARTTLS` /
`SSL/TLS`) and `smtpAuthMethod` (`No Authentication` / `Normal Password`) —
matching the mail-client-style dialog the client referenced. For existing
`smtp.json` files on disk that still only have the old boolean (read via
`SystemSettingsFactory`), the one-time normalization maps `true → SSL/TLS`
(unambiguous) and `false → STARTTLS` (chosen over `None`, since it's closer
to nodemailer's previous opportunistic-STARTTLS behavior for `secure: false`
and is strictly more secure than silently falling back to plaintext).
`smtpAuthMethod` for pre-existing files defaults to `Normal Password`,
matching current behavior (auth was always basic user/pass). Authentication
methods beyond "No Authentication"/"Normal Password" (e.g. OAuth2) were
explicitly scoped out — supporting those would require a much larger
feature (token storage, provider-specific flows), not just a dropdown
option.
Requested by: boledelija98 (client)
Reason: client asked to match a Thunderbird-style "Connection security" /
"Authentication method" SMTP setup dialog; the existing boolean couldn't
express STARTTLS vs. implicit TLS vs. no security, nor an unauthenticated
relay.
Affects: [SystemSettings.md](./modules/SystemSettings.md)
Status: Accepted

## 2026-10-02 (2)

Decision: While no deployed databases exist, baseline migrations may be
edited in place instead of adding follow-up migrations; local dev DBs are
recreated after such an edit. External links live in one `AppLinks` class
(`packages/core/flutter/lib/src/utils/constants.dart`, `example.com`
placeholders), the e-mail signature and registration link use `example.com`,
and the terms-of-use documents are a placeholder outline.
Requested by: User
Reason: Keep the migration baseline small while nothing is deployed; every
app supplies its own links and legal texts.
Affects: server migrations, core Flutter; `README.md`.
Status: Accepted.

## 2026-10-02 (3)

Decision: Identifiers and external services are placeholders each app
replaces:
- **App ID is `com.example.copor`** (Android namespace/applicationId and
  Kotlin package, iOS/macOS bundle IDs, fastlane, native file-saver method
  channel); display name is Copor.
- **Firebase configs hold dummy values**; each app runs
  `flutterfire configure` against its own project.
- **The schema comes from Kysely migrations only** — no SQL dumps or
  dump-based tooling.
- External hosts (Jitsi, API URL, git host, deploy target) are
  `example.com` placeholders; the local DB name is `copor`.
Requested by: User
Reason: The platform must not ship another organisation's identifiers,
credentials-adjacent config or data dumps.
Affects: server, frontend, `tools/`; `README.md`.
Status: Accepted.

## 2026-10-02 (4)

Decision: The `docs/` vault documents only live code: docs for removed
features are deleted rather than kept as history, and the decision log
keeps only entries that still bind live code. Module and dev docs use the
USER/ADMIN role model, with Country/ContractType as worked examples.
Requested by: User
Reason: The vault is the source of truth for decisions and behavior;
entries about code that no longer exists mislead anyone building on it.
Affects: `docs/`, `README.md`.
Status: Accepted.

## 2026-10-03

Decision: Only generic concepts stay in the data model:
- **User fields**: account and personal-data DTOs hold generic fields only
  (no domain-specific extras).
- **Push-notification preferences**: only the toggles of features that
  exist.
- **Contacts**: one role-free list; `ContactModel.role` is the backend's role
  string.
Kept on purpose: the "base tenant" concept (generic multi-tenant root).
Requested by: User
Reason: The platform is meant as a general starting point for new apps;
domain-specific fields and examples mislead anyone building on it.
Affects: [Contacts.md](./modules/Contacts.md), [Cloud.md](./modules/Cloud.md).
Status: Accepted.

## 2026-10-04

Decision: The contact list is served from the `user` table and scoped by the
actor's `contacts.canGetContactList` permission: `OWN` → nobody, `TENANT` →
same tenant (ADMIN unrestricted), `ALL` → everyone. The actor is never
listed; inactive users are listed and flagged, not hidden.
Requested by: User
Reason: Reusing the permission scope keeps "who can I see" in one
admin-configurable place instead of a contacts-specific rule.
Affects: [Contacts.md](./modules/Contacts.md), [Cloud.md](./modules/Cloud.md)
Status: Accepted.

## 2026-10-05

Decision: Self-registration: anyone can sign up with name, e-mail, username
and password; the account is a `USER` with **no tenant**, inactive until the
6-digit code e-mailed to them is entered. It is controlled by the global
setting `allowSelfRegistration`, **off by default**. There are no
admin-issued registration codes.
Requested by: User
Reason: The template needs a generic signup, not admin-issued per-role codes.
Affects: [Registration.md](./modules/Registration.md), [users.md](./users.md)
Status: Accepted.

## 2026-10-08

Decision: Permission keys are `<module>.<name>` strings (`core.canGetUserList`,
`vu_meet.canGetChatInfo`), not numbers. Each module owns its own enum and
definitions list; core collects the registered ones in `PermissionRegistry`.
The `permission_type` columns (and `permission_dependencies`) are
`varchar(100)`.
Requested by: User
Reason: with numbers every module and every app repo would have to avoid
everyone else's values; a prefix makes collisions impossible, a module's rows
can be removed by prefix, and stored rows are readable. Trade-off: a key is
the stored value, so renaming a permission or a module name later needs a
data migration — keys are permanent once data exists.
Affects: [permission_system.md](./dev_documentation/permission_system.md).
Status: Accepted.

## 2026-10-08 (2)

Decision: (1) The Desk badge count is 0 until it has a defined meaning.
(2) ToDo declares `dependsOn: ['vu_meet', 'cloud']` (its page shows the chat
list and opens attachments in Cloud's file viewer) and Calendar declares
`dependsOn: ['todo']` (its "new ToDo" action), instead of making those parts
optional.
Requested by: User
Reason: decoupling is only worth it once an app needs ToDo without
VuMeet/Cloud.
Affects: [ToDo.md](./modules/ToDo.md); the module descriptors.
Status: Accepted.

## 2026-10-08 (3)

Decision: ContentItem and Contract are core, not optional modules: every app
gets the legal texts the `/info` pages serve (terms, impressum) and the
contract checks at login and tenant registration. They keep their module
descriptors (routes, migrations, `content_item.`/`contract.` permission keys)
but are listed in core's `client/Core/Module/coreModules.ts`, not in the
app's `src/modules.ts`. VuMeet declares `dependsOn: ['ai_context_item']` — its
AI bot answers FAQs from AiContextItem's table — instead of an optional FAQ
hook.
Requested by: User
Reason: splitting them would need login and info-page hooks for features
every app has anyway.
Affects: `coreModules.ts`, `modules.ts`, `VuMeetModule.ts`.
Status: Accepted.

## 2026-10-09

Decision: Core vs. optional. Core: login, registration, user + account
information, role, permission, user group (the permission system reads it),
tenant, system settings, notifications, WebSocket transport, Tag (shared by
ToDo and Cloud, core owns `tagDeleted`), the reference data (country, state,
region, region-city, address, language, native language, public refdata),
Search (it hosts the modules' sections), ContentItem and Contract
(2026-10-08 (3)) and the infrastructure (log, email outbox, documents, image,
avatar, logo, phone number, feature list, dashboard menu, filter, info pages;
frontend forms, table, simple list, media picker, preferences, deletion
requests). Everything else is an optional module, including **Contacts**
(API, permissions and the Flutter address book) and **Help** (About, Tools,
app installation). Picking users is a core building block: core owns the
"users the actor may see" query (scope taken from a permission the caller
names) and a Flutter user-picker model + widget, but no route; each module
exposes its own thin route under its own permission (`/cloud/recipients`,
`/vu-meet/contacts`).
Requested by: User
Reason: an app should be able to ship file sharing or chat without an
address book; one shared visibility query keeps modules from drifting into
different (possibly leaking) rules for who sees whom, while each module still
controls access through its own permission.
Affects: [Contacts.md](./modules/Contacts.md), [Cloud.md](./modules/Cloud.md),
[VuMeet.md](./modules/VuMeet.md).
Status: Accepted.

## 2026-10-09 (2)

Decision: The changelog is app content on the server: Markdown files in
`apps/copor/server/changelog/<version>.md`, served by the Help module on
public routes (`GET /help/changelog`, `GET /help/changelog/<version|latest>`)
for About, the app installation page and the login page's install button.
Dated development notes (`docs/progress/`) are not part of the app.
Requested by: User
Reason: the changelog is the app's content, not Help module code — on the
server it can change (new download links) without an app release, and the
shared Help package carries no app-specific files.
Affects: [Help.md](./modules/Help.md).
Status: Accepted.

## 2026-10-09 (4)

Decision: Icons are Phosphor Icons (MIT), not Font Awesome. The weights in
use (Thin — the app's look — Light, Regular, Fill) are bundled in
`packages/copor_theme/lib/fonts/phosphor/` with their LICENSE;
`phosphor_icons.dart` exposes them as `PhosphorIconsThin.x` …
`PhosphorIconsFill.x` and `DTIcons` maps semantic names onto them. The
`phosphor_flutter` package is not used (its icon class extends `IconData`,
which current Flutter makes `final`).
Requested by: User
Reason: the repo is public; Font Awesome Pro's license doesn't allow
redistributing its font files.
Affects: `packages/copor_theme`, frontend.
Status: Accepted.

## 2026-10-10

Decision: User preferences that belong to a module are module preferences:
declared on the module's descriptor (`<module>.<name>`, default), stored by
core in `user_module_preference` (only changed values), returned and saved as
`modulePreferences` with the user's preferences, and shown in My Account by
the module (`preferenceSections`). Only toggles that do something exist
(Cloud's group-folder and user-folder push opt-outs, VuMeet's chat-message
push). Module upload limits are in each module's `clientConfig`; core reports
its own image limit (`maxImageSize`, `MAX_MEDIA_SIZE_MB`), and VuMeet and
Cloud enforce the limit they report (`VU_MEET_MAX_FILE_SIZE_MB`,
`CLOUD_MAX_FILE_SIZE_MB`).
Requested by: User
Reason: core must not carry module columns, and a toggle that does nothing
misleads users.
Affects: [VuMeet.md](./modules/VuMeet.md), [Cloud.md](./modules/Cloud.md).
Status: Accepted.

## 2026-10-11

Decision: Copor has its own look: the orange-blade logo (in-app logo, app
icons, web splash, server wordmark), a palette built from it — primary
`#C2410C`, accent `#F2713C` (the logo's orange), slate `#475569`, warm stone
neutrals, with lighter oranges in dark mode — the Inter font (OFL, bundled)
and 14 px corners. The logo's strokes follow the theme's text colour so it
works on light and dark backgrounds.
Requested by: User
Reason: before going public, the template should not look like the app it
was derived from (blue + magenta, Roboto, a neutral "V" placeholder).
Affects: `packages/copor_theme`, core Flutter (`AppLogoSvg`, avatar
palette), frontend (assets, fonts, web splash, icons), server logo images and
avatar palette; `README.md`.
Status: Accepted.

## 2026-10-11 (2)

Decision: The platform is named **Copor** (packages `@copor/*` and
`copor_*`, CLI `copor`, app `apps/copor`, repository `copor` on the VukMark
GitHub account). **VukMark** is the company that makes it: it appears only
as the author — the About copyright line and the README's "By VukMark" — and
the orange-blade logo is shared. The template's default database name is
`copor`.
Requested by: User
Reason: VukMark is the company's name; the public product, and the apps
built on it, need their own name so the company brand stays separate.
Affects: every package, the app, `tools/`, docs; `README.md`.
Status: Accepted.

<!-- newest entries go here -->
