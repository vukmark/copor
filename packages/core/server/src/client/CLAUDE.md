# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This is the client layer (Express.js backend) of `@copor/core` (`packages/core/server/src/client/`). Module packages (`packages/<module>/server/src/client/`) follow the same patterns. See the root `CLAUDE.md` for the overall layout, imports (`@copor/<package>/...`) and the git rules (the user does all commits and merges).

## Commands

Run from the app, `apps/copor/server` (it owns `.env`, settings and runtime data, and its jest config runs every package's tests):

```bash
npm run dev              # tsx watch — development server
npm run build             # self-contained dist/ (see the root CLAUDE.md, Production build)
npm run test               # jest (projects: domain, client)
npm run db:migrate         # run DB migrations (src/runMigrations.ts)
```

Run a single test: `npx jest --testPathPattern="ControllerName"` (or any substring of the test file path).

## Architecture

### Request flow

The app's `src/index.ts` wires up core's `App` (`Core/App.ts`), loads env vars via dotenv (validated against `requiredEnvVariables.ts` — every var listed there must be set or startup throws), and builds `MainRouter` (`Core/MainRouter.ts`), which registers the core routers and then the routes of every module listed in the app's `src/modules.ts` (each optional feature has a `<Feature>Module.ts` `CoporModule` descriptor; `registerModules` in `index.ts` validates the list — duplicate names, missing `dependsOn` — and registers module permissions, features, event subscribers and filter lists before the router is built; module translations are merged once i18n is ready, and only then does the server listen). Each request passes through `JwtAuthenticationMiddleware` → feature router → controller → `ErrorHandlerInstance` (`Core/ErrorMiddleware`) → `GlobalResponseImpl` (uniform response shape).

### Modules (`Core/Module/`)

Optional features are modules: each is its own package (`packages/<module>/server`, npm name `@copor/<module>`) with a `<Feature>/<Feature>Module.ts` `CoporModule` descriptor, listed in the app's `src/modules.ts`. Core never imports a module; it reads the registered list (`Core/Module/ModuleRegistry.ts`, set by `registerModules`). A package imports only itself, core and the `@copor` packages in its `package.json`; the app's `test/client/Module/ModuleBoundaries.test.ts` enforces that, plus that each descriptor's `dependsOn` is among its package's dependencies, and `npm run typecheck` inside a package fails on anything it doesn't declare. Two descriptors are core and always included — ContentItem and Contract, in `Core/Module/coreModules.ts`; `allModules` (core's, then the app's) is composed in the app's `src/modules.ts`; `index.ts` registers it and `runMigrations.ts` migrates it. Descriptor fields:

- `name` — prefix of the module's permission keys and suffix of its migration tracking table (`kysely_migration_<name>`); never rename once data exists.
- `dependsOn` — other modules it needs (`validateModules` rejects a missing one).
- `routes` — `{path, router}` pairs, registered by `MainRouter` after core's.
- `migrationsFolder` — `<Feature>/migrations/`, run after core's by `runMigrations.ts`.
- `permissions` / `features` — the module's definitions from domain (`<Feature>PermissionDefinitions`, `<Feature>FeatureDefinitions`), registered by `registerModules` at startup.
- `eventSubscribers` — reactions to events core announces (`Core/Module/ModuleEvents.ts`, e.g. `tagDeleted`). When a core write must clean up or update module data, add an event to `ModuleEventMap`, `await emitModuleEvent(...)` in core, and subscribe in the module — don't query the module's tables from core.
- `filterLists` — `{[page]: (actorId) => Promise<SetFilterDTO[]>}` served at `GET /filter/:page` (`Core/Module/ModuleFilterLists.ts`). Core answers its own `FilterablePages` and falls back to these; a page key may not repeat a core page or another module's. Keys are the existing wire values (`TODO`, `CONTRACT_TYPE`), not `<name>.`-prefixed, because the frontend requests them by that path.
- `onServerStart` — runs once at startup, after the WebSocket server is up (`Core/App.ts`; VuMeet's stale-call sweep).
- `notificationCounters` — `(userId) => Promise<Record<string, number>>`; `GET /notification/count` merges every module's (VuMeet adds `vuMeet`), and the frontend reads a missing key as 0.
- `localesFolder` — `<Feature>/locales/`, laid out like core's `Resources/locales` (`<namespace>/<lang>.json`): the module's own namespace (`vu_meet`) and its keys in shared ones (`common`, `error`, `log_type`, `permission`, `feature_flags`, `search`, …). `Core/Module/ModuleLocales.ts` deep-merges them into core's namespaces at startup (after `i18nReady`, before the server listens), so `GET /locale/:ns` and server-side `t()` see one namespace; a key core or another module already defines stops startup. A module's strings — its exceptions, log types, permissions, feature flags, menu/dashboard label keys, push texts — go here, never into `Resources/locales`.
- `preferences` — per-user on/off settings (`ModulePreferenceDefinitionDTO`: `key` `<name>.<setting>`, `default`), defined in domain (`<Feature>PreferenceDefinitions.ts`). Core stores only changed values in `user_module_preference` and returns every registered one as `modulePreferences` from `GET /user-preferences`; `PATCH` accepts a partial `modulePreferences` map (unknown keys → `InvalidModulePreferenceException`). To honour one, ask `KyselyModulePreferencesHelper.usersWithPreferenceOff(key, userIds)` (Cloud's push recipients, VuMeet's message push). Never add module columns to `user_preferences`.
- `clientConfig` — `(appContext) => Record<string, unknown>`: settings the app needs from the module (VuMeet's and Cloud's `maxFileSize`), returned as `moduleConfig.<name>` from `GET /user-preferences`. A module that advertises an upload limit must enforce that same value (its `MulterFileMiddleware` limit and validator — see `Cloud/CloudConfig.ts`).

User pickers: core has no route that lists users for picking. A module that needs one subclasses `ListVisibleUsers` (domain, `User/VisibleUsers/`) with its own scoped permission and `ListVisibleUsersController` (`User/VisibleUsers/`) with that interactor, a validator and a log type, and routes it itself (Cloud's `POST /cloud/recipients`). The query applies the actor's scope for that permission, so each module decides who may pick whom without its own user query; set `activeOnly = true` on the interactor to leave out deactivated users (VuMeet). To check a picked user on a write, use core's `ValidateUserIsVisible` with the same permission (Cloud's upload does).

Core's `Core/WebSocket/WebSocketHelper.ts` is transport only (connections, online status, `sendMessageWithPayload`); a module sends its own events through `sendMessageWithPayload` (VuMeet's `VuMeetWebSocket`, Cloud's `CLOUD_NOTIFICATION`) and declares the event names itself, not in core's `WebSocketEvent`.

Table types: a module's live in `<Feature>/types/` and its `<Feature>Tables.ts` adds them to `DB` by module augmentation. Nothing imports those files, so every type checker must load them: the app's tsconfig includes every package, a module package's own tsconfig includes the `*Tables.ts` of the packages it depends on, and `ts-node` (`npm run db:migrate`) needs `"ts-node": {"files": true}` in the app's `tsconfig.json` — without it the module tables are missing from `DB` and the migration run fails to compile.

### Dependency injection: `ContainerInstance`

Controllers don't `new` up their dependencies directly — they go through `this.container` (`Core/ContainerInstance.ts`), which exposes `getRepository`, `getValidator`, `getInteractor`-style helpers, and two repo-picker paths:

- `getNewRepoPicker` → `NewRepositoryPicker<T>` (`Core/RepositoryPicker.ts`) — selects the repo implementation by **`DB_ENV`** (`FAKE` / `KYSELY`). **This is the current pattern** — use it for all new features (see root CLAUDE.md's RepoPicker example).
- `getRepoPicker` → the older `RepositoryPicker<T>` — selects by **`NODE_ENV`** (`DEVELOPMENT` → fake, `PRODUCTION` → looks up `DB_ENV`). Legacy; still used by some existing repos but don't pattern new code off it.

### Permissions

`Core/PermissionValidatorRepo/` holds the permission-checking repo (`FakePermissionValidatorRepo` / `KyselyPermissionValidatorRepo`, picked via `PermissionValidatorRepoPicker`). The permission definitions themselves are registered once at startup by `registerModules(enabledModules)` in `index.ts` (`Core/Module/registerModules.ts`: core's plus each listed module's `permissions` and `features`, then a check that every `dependsOn`, view permission and permission feature resolves); tests register those of the app's modules via the app's `test/client/jest.setup.ts`. The permission model itself (scopes, DENY-wins-over-ALLOW precedence, cache invalidation) is documented in the root docs vault (`../docs/dev_documentation/permission_system.md`, `../docs/workflow/permissions.md`), not in code comments — check there before changing permission behavior.

### Env / config

`.env` is the app's, found from the working directory (`Core/Helpers/EnvFile.ts`; the app's scripts run in `apps/<app>/server`), and expanded via `dotenv-expand`, so vars can reference each other. `requiredEnvVariables.ts` is the source of truth for what must be set — includes DB connection (`DB_ENV`, `DB_HOST`/`PORT`/`USER`/`PASS`/`NAME`), JWT (`PRIVATE_KEY`, `TOKEN_EXPIRE_TIME`), Firebase (`FIREBASE_ADMIN_KEY_FILE`), and file/media upload limits and paths.

### Tests

A package's `src/client/__test__/tests/` mirrors its feature folders; core's `src/client/__test__/testHelper/` has `Controller.helper.ts`, `Router.helper.ts`, `App.helper.ts`, and `Mocks.ts` for building test fixtures around controllers/routers without hitting a real server or DB. Each package checks its module's permission and feature enums against the definitions its descriptor registers with `testModuleDefinitions` (`testHelper/ModuleDefinitions.helper.ts`), in `tests/<Feature>/<Feature>Module.test.ts` (core's three in `tests/Module/CoreModuleDefinitions.test.ts`) — call it there for a new module.
