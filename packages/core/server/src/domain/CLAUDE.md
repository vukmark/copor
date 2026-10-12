# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This is the domain layer (business logic, no runtime dependency on the client layer) of `@copor/core` (`packages/core/server/src/domain/`). Module packages (`packages/<module>/server/src/domain/`) follow the same patterns. See the root `CLAUDE.md` for the overall layout, imports (`@copor/<package>/...`) and the git rules (the user does all commits and merges).

## Commands

Tests and typechecks run from the app, `apps/copor/server`: `npm run test` (jest project `domain` covers every package's `src/domain/__tests__`), `npx jest --selectProjects domain --testPathPattern="ContactAdmin"` for one test, `npm run typecheck`.

## Architecture

### Feature folder shape

Each `src/domain/<Feature>/` follows: `interactor/`, `repository/` (interface only — implementations live in the client layer), `validation/`, `logger/`, `exception/`. This mirrors the root CLAUDE.md's "Domain Layer" description exactly — this repo *is* that layer.

### The validate → execute → log pipeline

`Core/Factories/RunFactory.ts` is the concrete implementation of the chain `client`'s controllers wire up: `validator.validate()` → (if no errors) `useCase.execute()` → `logger.log()` (fire-and-forget, doesn't block the response). `run({skipValidation: true})` bypasses the validator entirely — used sparingly, grep for it before assuming validation always runs.

### Base UseCase types (`Core/Interactors/`)

Beyond the generic `ExecuteUseCase<Input, Repo, Response>` mentioned in the root CLAUDE.md, there are ready-made bases for common shapes: `CreateUseCase`, `DeleteUseCase`, `GetItemUseCase`, `ListItemsUseCase`, `ListItemsByIdUseCase`. Check these before hand-rolling a new interactor — most CRUD-shaped features fit one directly.

### Validators: check the shared library before writing a new one

`Core/Validations/Validators/` has 150+ small, reusable, single-purpose validators (`ValidateEmailAddress`, `ValidateRequiredString`, `ValidateListOfIds`, `ValidatePostalCode` + country variants, `ValidateCanGet<Entity>`/`ValidateCanUpdate<Entity>` permission-check validators, etc.). Feature validators in `<Feature>/validation/` compose these rather than reimplementing field-level checks — search here first for anything generic (required-field, format, entity-existence, permission-scope checks) before adding a new one. The composition base classes are `ValidationWithPermissionAndRepo`, `ValidationWithPermission`, `ValidationWithRepo` (`Core/Validations/`).

### Permission system

`Core/Permission/` holds the permission model primitives: `Permission.ts`, `PermissionType.ts` (the `<module>.<name>` string key type), `PermissionEffect.ts`, `CorePermission.ts` + `CorePermissionDefinitions.ts` (core's keys; each module has its own `<Feature>/<Feature>Permission.ts` + `<Feature>PermissionDefinitions.ts`), `PermissionRegistry.ts` (every registered definition — read this, never an enum, when you need all permissions), plus `PermissionDependencyGraph.ts`/`evaluateMissingPermissionDependencies.ts`/`validatePermissionDependencyChange.ts` for permission-dependency validation. The actual scope/precedence rules (DENY-wins-over-ALLOW, the user → user group → role → default DENY resolution order) are documented in the docs vault (`../docs/dev_documentation/permission_system.md`, `../docs/workflow/permissions.md`, `../docs/decisions.md`) — not derivable from this code alone, check there before changing permission behavior.

### Module boundaries

Each optional module is its own package (`packages/<module>/server`, `@copor/<module>`), with its domain code in `src/domain/<Feature>/`. It may import core and the `@copor` packages its `package.json` lists (its `dependsOn`); core imports no module. Shared code moves into core. The app's `test/client/Module/ModuleBoundaries.test.ts` enforces this for every package, and `npm run typecheck` inside a package fails on anything it doesn't declare.

### Features

A feature is the frontend route it unlocks (`Feature` type, e.g. `/vu-meet`). Core's are in `FeatureList/enum/CoreFeature.ts` + `FeatureList/CoreFeatureDefinitions.ts`, each module's in `<Feature>/<Feature>Feature.ts` + `<Feature>FeatureDefinitions.ts`. A definition names the `viewPermission` that unlocks it and, optionally, its side-menu (`menuItem`) and administration-dashboard (`dashboardItem`) entry. `FeatureList/FeatureRegistry.ts` holds the registered ones; the feature list and both menus are built from it.

### Tests

A package's `src/domain/__tests__/` mirrors its feature folders (`ts-jest`, run by the app's jest project `domain`; shared setup in the app's `test/domain/jest.setup.ts`, which registers the permissions, features and preferences of the modules the app includes, read from its `src/modules.ts` by `test/domain/helpers/allModuleDefinitions.ts`). Tests of the composed app (the route list, the merged translations) live in the app's `test/` and take the module set from `src/modules.ts` too, so they still pass when the app leaves a module out; a package's own tests must not depend on another module being included.
