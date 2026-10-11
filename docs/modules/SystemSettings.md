# System Settings

Status: 🟢 Time Zone setting implemented and committed (`487c2e0`/`a484ea2`/`d0e97c9`) — reviewed

Owner: sasa

Code: `packages/core/server/src/domain/SystemSettings`, `packages/core/server/src/client/SystemSettings`, plus
`packages/core/server/src/domain/Core/Date/TimeTransformer.ts`, `packages/core/server/src/client/Core/Helpers/{AppTimeZoneStore,DateTransformer,TimeZoneList}.ts`,
`packages/core/server/src/client/Core/Form/drop_down/TimeZoneField.ts`.

## Purpose

File-based (not DB-backed) system-wide configuration, split into seven types
(`SystemSettingsType`: `global`, `smtp`, `smtp-test`, `display`, `workflow`,
`notifier`, `time-zone`), each persisted as its own JSON file under
`apps/copor/server/settings/*.json` (seeded from the matching
`*.json.dist` on first boot by `SetupGlobalConfigurationFiles`) and shown as
its own row/menu entry under `Administration > System`. This doc focuses on
the new `time-zone` type — the mechanism by which DiLu stops assuming
server-local time and instead runs on an admin-configured IANA time zone
for all local ⇄ UTC date/time conversion.

**Placement note:** the first pass of this work added a `timeZone` field
directly onto the existing `global` type's form (alongside `name`/
`postalCode`, under the "Master Data of the educational institution"
heading). That was caught in review as unintuitive — Time Zone is an
operational, instance-wide setting unrelated to the institution's name/
address — and moved out into its own top-level `TIME_ZONE` settings type
before merge. See [decisions.md](../decisions.md) (2026-08-21).

## Available for Roles

Access isn't per-settings-type — three permissions gate all seven types
uniformly:

- **`canGetSystemSettings`** — read a single settings type's form
  (`GET /system-settings/form/<type>`).
- **`canGetSystemSettingsList`** — read the table of settings types
  (`POST /system-settings/table`).
- **`canUpdateSystemSettings`** — update any settings type
  (`PATCH /system-settings/<type>`).

Default per-role seed data for these three permissions was not re-audited
as part of this change — see [permissions.md](../workflow/permissions.md)
for the general mechanism.

## Data Shape (current)

```
GetGlobalSystemSettingsDTO / SaveGlobalSystemSettingsDTO {
  name: string
  postalCode: string
}

GetTimeZoneSystemSettingsDTO / SaveTimeZoneSystemSettingsDTO {
  timeZone: string   // IANA zone id, e.g. "Europe/Berlin"
}

GetSMTPSystemSettingsDTO / SaveSMTPSystemSettingsDTO {
  smtpHost: string
  smtpPort: number
  smtpEmail: string
  smtpPassword: string
  smtpConnectionSecurity: SmtpConnectionSecurity   // enum keys: none | starttls | sslTls
  smtpAuthMethod: SmtpAuthMethod                   // enum keys: none | normalPassword
}
```

`global.json.dist` is back to `{"name": "", "postalCode": ""}`.
`time-zone.json.dist` (new seed template) ships
`{"timeZone": "Europe/Berlin"}`.

### SMTP connection security / authentication method (2026-08-29)

`smtpIsSecure: boolean` was replaced with two dropdowns matching a
mail-client-style setup dialog (Thunderbird/Outlook), per
[decisions.md](../decisions.md):

- `SmtpConnectionSecurity` (`none` / `starttls` / `sslTls`; enum *values*
  are translation keys like `'SMTP_CONNECTION_SECURITY_SSL_TLS'`, same
  convention as `PublishStatus`), rendered as a `SmtpConnectionSecurityField`
  dropdown in `GetSMTPSystemSettingsFormPresenter`. `Emailer.getTransporter()`
  maps this to nodemailer options: `sslTls → {secure: true}`,
  `starttls → {secure: false, requireTLS: true}` (fails if the server
  doesn't support STARTTLS, rather than silently falling back),
  `none → {secure: false, ignoreTLS: true}` (plaintext, no TLS attempted).
- `SmtpAuthMethod` (`none` / `normalPassword`), rendered as
  `SmtpAuthMethodField`. `none` omits the nodemailer `auth` object entirely
  (unauthenticated relay); `normalPassword` sends `{user: smtpEmail, pass:
  smtpPassword}` as before.
- Both fields are validated server-side as a plain enum-membership check
  (`ValidateSmtpConnectionSecurity`/`ValidateSmtpAuthMethod` in
  `packages/core/server/src/domain/SystemSettings/validation/validator/`), wired into the shared
  `ValidateUpdateSystemSettings` via the same optional-field pattern
  `timeZone` uses (`UpdateSMTPSystemSettingsController` passes both fields
  into the validator input; the validator only runs the check when the
  field is present).
- **Backward compatibility for on-disk `smtp.json` files that predate this
  change:** `SystemSettingsFactory.getSMTP()` (and `getSettings()` for
  `SystemSettingsType.SMTP`, which now delegates to `getSMTP()`) normalizes
  missing fields on read: `smtpIsSecure: true → sslTls`,
  `smtpIsSecure: false → starttls` (not `none` — chosen as closer to
  nodemailer's old opportunistic-STARTTLS behavior and strictly more
  secure), and a missing `smtpAuthMethod` always defaults to
  `normalPassword` (matching prior always-basic-auth behavior). This is an
  in-memory normalization only — it does not rewrite the JSON file on disk;
  the file gets the new shape once an admin saves the form again.
- Scope explicitly excludes OAuth2/Kerberos/other auth methods a
  Thunderbird-style dialog might otherwise imply — those need real
  provider-specific flows and token storage, not just another dropdown
  option.

## Expected Behavior

### Read

- `GET /system-settings/form/time-zone` →
  `GetTimeZoneSystemSettingsFormPresenter` renders a header
  (`TIME_ZONE_SETTINGS`) plus `timeZone` as a `TimeZoneField` — a generic
  `FormFieldType.DROPDOWN` field whose option list comes from
  `TimeZoneList.get()`, which is just `Intl.supportedValuesOf('timeZone')`
  mapped to `{id, name}` pairs (every IANA zone the Node runtime knows
  about, not a hand-maintained list).
- `POST /system-settings/table` lists `TIME_ZONE` as its own row (label key
  `translationStringList.TIME_ZONE` in the `system_settings` locale
  namespace), same as `GLOBAL`/`DISPLAY`/`WORKFLOW`/`NOTIFIER`/`SMTP`. This
  list is **hardcoded per type, not enum-driven** — both
  `FakeGetSystemSettingsListInteractorRepo` and
  `KyselyGetSystemSettingsListInteractorRepo` needed a new array entry
  added by hand; a new `SystemSettingsType` does not automatically appear
  in the table.

### Update

- `PATCH /system-settings/time-zone` →
  `UpdateTimeZoneSystemSettingsController` validates the submitted
  `timeZone` via `ValidateUpdateSystemSettings`'s existing generic
  `timeZone?: string` branch (`ValidateSystemSetting` →
  `IsInvalidSystemSettingsRepo.isInvalidSystemSettings`), backed by
  `KyselyUpdateTimeZoneSystemSettingsValidatorStorageRepo`, which checks the
  string against `Intl.supportedValuesOf('timeZone')`. (This validator
  storage repo — and the Intl check itself — is what briefly lived under
  `UpdateGlobalSystemSettings/` in the first pass; it moved wholesale to
  `UpdateTimeZoneSystemSettings/` along with the field. `Global`'s update
  path no longer has any custom storage-repo validation, matching
  `Display`/`Workflow`/`Notifier`'s plain generic
  `UpdateSystemSettingsValidatorStorageRepoPicker`, which always returns
  `false`.)
- On successful save, `KyselyUpdateSystemSettingsInteractorRepo.save()`
  updates `AppTimeZoneStore` **live**, in the same request, when
  `saveDTO.type === SystemSettingsType.TIME_ZONE` — no server restart
  needed for the new zone to take effect on subsequent requests.

## Business Rules

- Default time zone is `Europe/Berlin` ("Germany" — Central European
  Time / Central European Summer Time). No separate DST-switching logic was
  written; `Europe/Berlin` is a real IANA zone, so the CET ⇄ CEST switch
  twice a year is handled entirely by the tz database the Node runtime
  ships with. (Requested by sasa, decision logged
  [2026-08-21 in decisions.md](../decisions.md).)
- The zone is a single, global, instance-wide setting — not per-tenant,
  per-user, or per-request.
- Time Zone is its own `Administration > System` menu entry, not a field on
  any other settings form (see Placement note above).

## Traced (2026-08-21)

- **How every DB read/write picks up the configured zone:** `domain`'s
  `TimeTransformer` (an abstract base class subclassed directly by dozens
  of Kysely repos across the codebase — a mixin-style pattern, not
  constructor-injected) used to hardcode `const APP_LOCAL_TIMEZONE =
  'Europe/Berlin'`. It now reads the zone through a static
  `timeZoneProvider: () => string` hook (default: `'Europe/Berlin'`),
  settable once via `TimeTransformer.setTimeZoneProvider(...)`. Because the
  provider is a `static`, **every existing `TimeTransformer` subclass
  picks up the configured zone automatically** — no per-repo changes were
  needed, which is the structural reason this works for "every write/read"
  rather than just the SystemSettings feature itself. This mechanism is
  entirely independent of *which* `SystemSettingsType` feeds it — moving
  the field from `GLOBAL` to `TIME_ZONE` only changed who calls
  `AppTimeZoneStore.set(...)`, not how the value propagates from there.
- **Where the provider gets wired:** `packages/core/server/src/client/Core/Helpers/AppTimeZoneStore.ts`
  is a plain in-memory `{get(), set()}` singleton. Importing this module
  has the side effect of calling
  `TimeTransformer.setTimeZoneProvider(() => AppTimeZoneStore.get())` —
  registering the client's store as domain's provider. `client`'s own
  separate (pre-existing, duplicate) free-function date helpers in
  `Core/Helpers/DateTransformer.ts` were updated in parallel to read
  `AppTimeZoneStore.get()` directly, since they don't go through
  `TimeTransformer` at all — this is pre-existing duplication between the
  two layers, not introduced by this change, but both needed fixing by
  hand since they don't share an implementation.
- **Boot sequence:** `SetupGlobalConfigurationFiles.createFilesIfNotExists()`
  (called from `apps/copor/server/src/index.ts` before the app starts serving) now
  also seeds `time-zone.json` from `time-zone.json.dist` if missing
  (`createTimeZoneIfNotExists()`), then reads the persisted
  `time-zone.json`'s `timeZone` and calls `AppTimeZoneStore.set(...)` — so
  the configured zone is active from the first request, not just after the
  first settings save.
- **Other hardcoded-zone call sites found and fixed:** the PDF generator
  repos of the time called `date-fns-tz`'s `formatInTimeZone` with a
  hardcoded `'Europe/Berlin'` literal (those documents were later removed
  with the template cleanup). Today `date-fns-tz` is only used by
  `TimeTransformer` (domain) and `DateTransformer` (client), both of which
  read `AppTimeZoneStore.get()`.
- **Known limitation, not a regression:** `FakeUpdateSystemSettingsInteractorRepo.save()`
  (used when `DB_ENV=FAKE`) is a no-op, matching how Fake repos already
  behave for every other settings type — so in FAKE mode, saving a new
  time zone has no live effect. This is the existing Fake-repo pattern,
  not something newly broken by this change.
- **Dead code removed as part of this change:** an entire legacy
  `packages/core/server/src/domain/Core/global/SimpleDateAndTime/` module (~15 files: formatters,
  ISO8601 converters, a separate `DateTimeStringTimeZoneCorrection`
  interactor, etc., plus their tests) was deleted. Confirmed via grep
  across both `domain` and `client` that nothing referenced any of the
  specific deleted files — this was unused code, not a regression. (Do
  **not** confuse this with `SimpleDateAndTime/entity/{SimpleDate,SimpleTime,SimpleDateTime}`
  and `GetCurrentUTCDateRepo`/`CurrentUTCDate` in the same parent
  directory — those are still live and still referenced elsewhere, and
  were intentionally left alone.)

## Known Bugs

- Pre-existing, **not caused by this change** (confirmed by stashing the
  time-zone diff and re-running on a clean `sasa/tz`): several
  `SystemSettings` domain tests already fail —
  `LogUpdateSystemSettings.test.ts` / `LogGetSystemSettings.test.ts` assert
  `actionType: 'updateSystemSettings'` / `'getSystemSettings'` but the
  logger actually produces `'updateSMTPSystemSettings'` /
  `'getSMTPSystemSettings'`, and `GetSystemSettingsList.test.ts` /
  `UpdateSMTPSystemSettings.test.ts` have type errors against
  `SystemSettingsListDTO`/`UpdateSystemSettingsRepo`'s generics. Worth a
  separate fix, out of scope for the time-zone work.
- Also pre-existing, unrelated: `LogUpdateDisplaySystemSettings.getType()`
  returns `'updateGlobalSystemSettings'` instead of
  `'updateDisplaySystemSettings'` (copy-paste bug). Noted here so it isn't
  mistaken for something this change introduced; not fixed as part of this
  work.

## Open Questions (for follow-up)

1. **Who holds `canUpdateSystemSettings` by default?** Nobody: the
   baseline seed (`20260910_196_seed_baseline_user_admin_roles.ts`) creates
   only the `User` and `Admin` roles and no permission rows, so the
   permission resolves to the default `DENY` until an admin grants it. A
   User Group can still grant it to specific members at runtime (see
   [permissions.md](../workflow/permissions.md)) — that's live DB
   configuration, not something in git.

## Test Cases

☐ Admin opens Administration > System > Time Zone → sees a dropdown populated from `Intl.supportedValuesOf('timeZone')`, defaulting to `Europe/Berlin`, on its own menu entry (not under Global)
☐ Admin opens Administration > System > Global → sees only Name and Postal code, no Time Zone field
☐ Admin saves a new time zone (e.g. `America/New_York`) → subsequent DB writes/reads through any `TimeTransformer` subclass convert against the new zone immediately, no restart
☐ Admin submits an invalid string (not in `Intl.supportedValuesOf('timeZone')`) → rejected via `InvalidSystemSettingsException`
☐ Server restarts → `time-zone.json`'s persisted `timeZone` is loaded into `AppTimeZoneStore` before the app serves any request
☐ `DB_ENV=FAKE` → saving a new time zone has no live effect (known limitation, matches existing Fake-repo behavior for all settings types)

## Change History

- **2026-08-21 (2)** — Moved the time zone setting out of `GLOBAL` into its
  own top-level `TIME_ZONE` `SystemSettingsType`/menu entry (own
  Get/Update controllers, form presenter, JSON settings file, validator
  storage repo), after review flagged the original placement — bundled
  under Global's "Master Data of the educational institution" form — as
  unintuitive. `Global` reverted to just `name`/`postalCode` with no custom
  validation, matching `Display`/`Workflow`/`Notifier`'s plain generic
  validator storage repo.
- **2026-08-21** — Initial documentation. Added `timeZone` to Global System
  Settings; default `Europe/Berlin` (CET/CEST, automatic DST switch via
  IANA tz database, no custom logic). `TimeTransformer` (domain) and
  `AppTimeZoneStore` (client) are the mechanism by which every existing
  DB-facing repo picks up the configured zone without per-repo changes. See
  [decisions.md](../decisions.md) for the product decision.
