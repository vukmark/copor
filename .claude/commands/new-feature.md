Add a full-stack feature across domain, client, and frontend. Ask for the feature name if not provided, and whether it is core or belongs to an optional module.

**Where it goes.** A core feature lives in core: `packages/core/server/src/{domain,client}/<FeatureName>/` and `packages/core/flutter/lib/src/modules/<feature_name>/`. A feature of an optional module lives in that module's packages: `packages/<module>/server/src/{domain,client}/<FeatureName>/` and `packages/<module>/flutter/lib/src/` (`<module>` = the module's name: `todo`, `vu_meet`, …). A new optional module gets both packages (copy the shape of `packages/news/`), an entry in `apps/copor/server/src/modules.ts` + the app's `package.json`, and in `frontend/lib/modules.dart` + `frontend/pubspec.yaml`. Imports between packages use `@copor/<package>/{domain,client}/…` / `package:copor_<package>/…`. The paths below show core; swap in the module's package for a module feature.

The server skeleton can be generated: `copor generate dom_cli_crud -n <Feature_Name> [-p <package>]` (it prints the remaining steps: table, permissions, router registration, translations).

### 1. Domain — `packages/core/server/src/domain/<FeatureName>/`
- `<FeatureName>Interactor.ts` — extends `ExecuteUseCase`
- `I<FeatureName>Repo.ts` — repository interface
- `<FeatureName>Validator.ts` — extends `ValidationWithPermissionAndRepo`
- `<FeatureName>Logger.ts` — extends `TypedLogger`
- `dto/` — input/output/save DTOs

### 2. Client — `packages/core/server/src/client/<FeatureName>/`
- `<FeatureName>Controller.ts` — extends `BaseController` or `UpdateBaseController`
- `router/<FeatureName>Router.ts` — extends `BaseRouter`
- `dto/<FeatureName>ReqBodyDTO.ts`
- `repo/fake/Fake<FeatureName>Repo.ts`
- `repo/kysely/Kysely<FeatureName>Repo.ts`
- `repo/repoPicker/<FeatureName>RepoPicker.ts`
- Optional feature: add `<FeatureName>Module.ts` (a `CoporModule` with its routes) and list it in `apps/copor/server/src/modules.ts`. Core feature: register the router in `packages/core/server/src/client/Core/MainRouter.ts`

### 3. Frontend — `packages/core/flutter/lib/src/modules/<feature_name>/`
- `config/<feature>_route.dart` — GoRouter `StatefulShellBranch`
- `presentation/<feature>_page.dart` — main page widget
- `data/data_source/<feature>_remote_source.dart` — HTTP calls to backend
- Add the route constant to `packages/core/flutter/lib/src/config/router/routes.dart` (core) or the module's own `<module>_routes.dart`
- Optional module: its `lib/src/config/<module>_module.dart` (a `CoporModule`: `routeBranches`, `registerDependencies`, `pageScaffold`, …) wires it in; the module is listed in `frontend/lib/modules.dart`. Core feature: register the route in `packages/core/flutter/lib/src/config/router/app_router.dart`
- Follow `packages/core/flutter/lib/src/modules/FRONTEND_MODULE_CONVENTIONS.md` for the full folder/layer/naming shape — the above is only the minimum skeleton.

### 4. Tests — `packages/core/server/src/domain/__tests__/<FeatureName>/` (module: `packages/<module>/server/src/domain/__tests__/`)

Mirror the feature's `interactor/`, `validation/`, `logger/` shape with one test file per class. See `docs/dev_documentation/` and existing features (e.g. `ContactAdmin`) for the pattern.

### 5. HTTP requests — `__HTTPRequest__/<FeatureName>.http`

One request per endpoint, chained via `client.global.set` for IDs created mid-file. See `admin-feature` skill for the full pattern (login import, Create capturing `id`, Update/Get/Delete reusing it).

### 6. Module doc — `docs/modules/<FeatureName>.md`

Copy `docs/modules/_TEMPLATE.md`, fill in Purpose/Roles/Data Shape/Expected Behavior, and link it under `docs/MOC.md`'s Modules section. Skip only if the feature is a trivial variant of an already-documented entity — link to that entity's doc instead of duplicating.
