# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

An npm-workspace monorepo of **packages** (reusable, versioned together) and
**apps** (thin hosts that pick packages):

| Path | Purpose |
|------|---------|
| `packages/core/server/` | `@copor/core` — core server: `src/domain/` (business logic: interactors, validators, repository interfaces, loggers, DTOs) and `src/client/` (Express.js: controllers, routers, repository implementations) |
| `packages/<module>/server/` | `@copor/<module>` — an optional module's server side (`news`, `vu_meet`, `cloud`, `todo`, `checklist`, `calendar_entry`, `contacts`, `help`, `ai_context_item`), same `src/domain` + `src/client` layout |
| `apps/copor/server/` | The Copor server app: composition root (`src/index.ts`, `src/modules.ts`, `src/runMigrations.ts`), `.env`, `settings/`, `changelog/`, `assets/`, `MediaFiles/`, app-level tests (`test/`) and the jest config that runs every package's tests |
| `packages/core/flutter/` | `copor_core` — core Flutter package: app shell, routing, DI, shared data/components, core pages and core features (`lib/src/modules/`) |
| `packages/<module>/flutter/` | `copor_<module>` — an optional module's Flutter side |
| `frontend/` | The Copor Flutter app (mobile/web, talks to the server via REST/WebSocket): composition root (`lib/main.dart`, `lib/modules.dart`), `lib/firebase_options.dart`, platform folders, assets, all Flutter tests |
| `packages/copor_theme`, `packages/copor_scaffold*` | Shared Flutter design-system packages |
| `tools/` | The `copor` command (`tools/copor/`: generate, build/deploy, run, setup, db, version), its helpers and the generator templates; source `tools/copor_env.sh` to use it |

A package's `package.json` lists the `@copor/*` packages it may import
(core, plus a module's `dependsOn`); the app depends on the packages it
includes. Core depends on no other package. The Flutter side mirrors this with
`pubspec.yaml` path dependencies (`copor_core`, `copor_<module>`).

## Git Repository

One git repository for everything (`tools/`, `packages/`, `apps/`,
`frontend/`, `docs/`).

**The user makes all commits, merges, branch switches and rebases.** Claude
edits files and runs tests, then reports what changed (suggesting a commit
message if useful); read-only git (`status`, `diff`, `log`) is fine.

## Commands

Install once at the repo root: `npm install` (links the workspaces).

### Server (run from `apps/copor/server`)
```bash
npm run dev           # Development server (tsx watch)
npm run test          # Every package's tests (jest projects: domain, client)
npm run typecheck     # tsc over the app and all its packages
npm run build         # self-contained dist/ (see Production build)
npm run db:migrate    # Core migrations, then each module's
```

Typecheck one package on its own (catches imports it doesn't declare):
`cd packages/<pkg>/server && npm run typecheck`.

### Run a single test
```bash
cd apps/copor/server && npx jest --testPathPattern="ContactAdmin"
```

### Code generation (`copor`, after sourcing `tools/copor_env.sh`)
```bash
copor generate dom_cli_crud -n Entity_Name -p todo    # domain + client CRUD into packages/todo/server (default -p core)
copor generate domain_create -n Entity_Name           # one layer/operation: {domain,client}_{create,get,get_list,update,delete}
copor generate frontend_bloc -m todo -n Entity_Name   # bloc + data layer into a module package (or a core feature folder, e.g. -m forms)
```
Templates are in `tools/generators/templates`; the server ones are core's
ContractType (the reference CRUD entity) reduced to `id` + `name`, so keep them
in step when that pattern changes. Validators use the package's permission
enum (`CorePermission`, or the module's `<Feature>Permission`). The generator
prints what is left to do: the table (`db-migration` skill) and the five
permissions — then it typechecks and its tests pass — plus registering the
router (`*_crud` generates it) and the log_type/error translations.

### Production build
`npm run build` writes a self-contained `dist/`: compiled app + packages, the
module `locales/` (`bin/copyBuildAssets.js`) and a `package.json`/lock pinning
every runtime dependency (`bin/writeDistPackage.js`). Run it with
`cd dist && npm ci --omit=dev`, then start
`dist/apps/copor/server/src/index.js` with `apps/copor/server` as the
working directory (`.env`, `settings/`, `changelog/`, `assets/`). The deploy
scripts (`copor build production_*`, `tools/helpers/deploy_server.sh`) do
exactly that.

## Imports

Every import between files names its package: `@copor/<package>/domain/...`
or `@copor/<package>/client/...` (e.g.
`@copor/core/client/Core/BaseController`); relative imports only stay inside
a package. The mapping is `tsconfig.base.json` (`paths`, one entry per
package) and the app's jest `moduleNameMapper`.

## Architecture: Domain Layer

Each domain feature lives under `packages/<package>/server/src/domain/<FeatureName>/` and contains:

- **Interactor** — extends `ExecuteUseCase<Input, Repo, Response>`, calls repository methods
- **Repository interface** — defines what the interactor needs (e.g., `save()`, `findById()`)
- **Validator** — extends `ValidationWithPermissionAndRepo<DTO, StorageRepo>`, composes individual validators (permission checks, storage checks)
- **Logger** — extends `TypedLogger<LogData>`, declares `getType()` string
- **DTOs** — plain interfaces for input/output/save shapes

## Architecture: Client Layer

Each feature under `packages/<package>/server/src/client/<FeatureName>/` contains:

- **Controller** — extends `BaseController` or `UpdateBaseController<ReqBodyDTO>`, wires up validator + interactor + logger via `this.container`
- **Router** — extends `BaseRouter`, registers HTTP methods mapping paths to controllers
- **ReqBodyDTO** — interface for the typed request body
- **`repo/fake/`** — fake in-memory implementations (used when `DB_ENV=FAKE`)
- **`repo/kysely/`** — real Kysely/MySQL implementations
- **`repo/repoPicker/`** — extends `NewRepositoryPicker<T>`, selects the repo based on `DB_ENV`

Core routers are registered in core's `client/Core/MainRouter.ts`. Optional features are modules: each package has a `<Feature>Module.ts` descriptor (`CoporModule` from core's `client/Core/Module/`) listing its routers, and the app's `src/modules.ts` lists the modules it includes. `MainRouter` registers the routes of every listed module, so core never imports a module's router by name.

## Controller Pattern

Every controller follows this structure:

```typescript
export class UpdateFooController extends UpdateBaseController<FooReqBodyDTO> {
    protected getValidator(): Validator { /* permission + storage repo */ }
    protected getInteractor()           { /* domain interactor + input */ }
    protected getLogger()               { /* logger + log data from request.body */ }
}
```

The base class chains these as: **validate → execute → log** via `RunFactory`.

## RepoPicker (Dependency Injection)

```typescript
export class FooRepoPicker extends NewRepositoryPicker<FooRepo> {
    protected getRepositoryList(): Record<string, new(appContext: AppContext) => FooRepo> {
        return {
            [DBEnv.FAKE]: FakeFooRepo,
            [DBEnv.KYSELY]: KyselyFooRepo,
        };
    }
}
```

The active implementation is selected at runtime by `DB_ENV`.

## Settings Architecture

`SystemSettings` uses a file-based settings store (the app's `settings/*.json`, templates `*.json.dist`) with three types: `global`, `smtp`, `display`. Each type has its own Get and Update controller pair. Shared interactors (`GetSystemSettings`, `UpdateSystemSettings`) are generic over the settings DTO type. The `SystemSettingsType` enum drives which settings file is read/written.

## Database

- MySQL via [Kysely](https://kysely.dev/) query builder
- Migrations: core's `client/Core/Database/migrations/` and each module's `client/<Feature>/migrations/` (per module, run after core in their own `kysely_migration_<name>` table)
- Table types: core in `client/types/tables/` + `DB` in `client/types/db.d.ts`; a module's in `client/<Feature>/types/`, added to `DB` by the module's `<Feature>Tables.ts` (module augmentation)
- `DB_ENV` env var switches between `FAKE` and `KYSELY`

## Environment Configuration

Env files are distributed as `*.dist.env` templates checked into git (e.g. `apps/copor/server/.dist.env`). The real, gitignored config file is the same name with `.dist` removed (e.g. `apps/copor/server/.env`) and is created locally by copying the `.dist` file 1:1, then filling in real values. If code references a `*.env` file that doesn't exist but a `*.dist.env` sibling does, create the real file by copying the template rather than treating the missing file as a blocker — only the actual secret values (credentials, keys) need to come from a human.

## Development Workflow

The `docs/` vault (entry point: `docs/MOC.md`) is the source of truth for anything that isn't derivable from code alone — product decisions, per-entity behavior specs, cross-cutting audits. Treat it as part of the change, not an afterthought:

**Before implementing:**
- Check `docs/decisions.md` and, via `docs/MOC.md`, whether a `docs/modules/<Entity>.md` spec already exists for the entity/feature being touched. A prior decision or documented edge case should shape the implementation, not get overridden by it.

**While implementing:**
- New or changed API endpoint → add/update the corresponding `__HTTPRequest__/<Entity>.http` file (see `admin-feature` skill for the request-chaining pattern with `client.global.set`).
- New domain logic (interactor, validator, permission rule) → add tests under the package's `src/domain/__tests__/<Feature>/`, mirroring the feature's folder shape.
- New entity/module, or a meaningful behavior change to an existing one → create or update `docs/modules/<Entity>.md` from `docs/modules/_TEMPLATE.md`, and link it under `docs/MOC.md` if new.

**After implementing:**
- A genuine product/business decision (not just an implementation detail) → log it in `docs/decisions.md` with the `Format:` block at the top of that file, newest entry at the bottom (`<!-- newest entries go here -->` marker).
- A new or changed convention (backend pattern, frontend module structure, naming) → update the relevant convention doc (this file, `packages/core/server/src/client/CLAUDE.md`, `packages/core/server/src/domain/CLAUDE.md`, `frontend/CLAUDE.md`, or `packages/core/flutter/lib/src/modules/FRONTEND_MODULE_CONVENTIONS.md`) rather than letting the convention live only in the new code.
- Renamed or added a doc file → update its listing/links in `docs/MOC.md`.

The `new-feature`, `admin-feature`, `db-migration`, and `public-route` skills already bake the mechanical parts of this (exact file paths, boilerplate) into their steps — use them rather than reproducing this checklist by hand for the entity types they cover.