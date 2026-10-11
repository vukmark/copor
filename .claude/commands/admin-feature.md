# Add an Administration Feature

Use this command when adding a new backend-driven administration page — the kind that uses the Administration Page Builder on the frontend and exposes `/table` + `/form` endpoints on the client.

Ask for the entity name (e.g., `GroupCategory`) and route segment (e.g., `group-category`) if not provided.

---

## Database (`packages/core/server/src/client/Core/Database/`)

See `docs/dev_documentation/database_pattern.md` for the full `TableCreator` reference.

### 1. Write the migration — `migrations/YYYYMMDD_N_entity_name.ts`

```typescript
export async function up(db: Kysely<unknown>): Promise<void> {
    const table = new TableCreator<string>(db, 'my_entity');

    table.addId();
    table.addVarChar255('name');
    table.addPublishStatus();
    table.addText('description', true);  // true = nullable

    table.addCreatedAt();
    table.addModifiedAt();
    table.addCreatedBy();
    table.addModifiedBy();

    await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
    await db.schema.dropTable('my_entity').execute();
}
```

### 2. Run migration
```bash
cd apps/copor/server && npm run db:migrate
```

### 3. Update `packages/core/server/src/client/types/db.d.ts`

**Core table vs. module table.** A core table's interface goes in `packages/core/server/src/client/types/tables/<Name>.ts` and its key in the `DB` interface in `packages/core/server/src/client/types/db.d.ts` (shown below). A table that belongs to an optional module (its migration is in `packages/core/server/src/client/<Feature>/migrations/`) goes in `packages/core/server/src/client/<Feature>/types/<Name>.ts`, and its key in that module's `<Feature>Tables.ts`, which adds it to `DB` by module augmentation:

```typescript
declare module '@copor/core/client/types/db' {
    interface DB {
        tempMyEntity: TempMyEntityTable;
    }
}
```

Add the TypeScript interface and register it in the `DB` interface:
```typescript
export interface TempMyEntityTable {
    id: string;
    name: string;
    publishStatus: PublishStatus;
    description?: string;
    createdAt: Generated<Date>;
    modifiedAt: Generated<Date>;
    createdBy: Generated<string>;
    modifiedBy: Generated<string>;
}

// In the DB interface:
tempMyEntity: TempMyEntityTable;
```

> `CamelCasePlugin` is active — use camelCase in TypeScript, Kysely converts to snake_case automatically.

No seed file needs a manual edit — the dev database picks up the new table purely from running the migration against it.

---

## Permissions (`packages/core/server/src/domain/Core/Permission/`)

Permission keys are strings, `<module>.<name>`, stored as-is in the database (never rename one once data exists). An admin entity is usually core: use `CorePermission` / `corePermissionDefinitions` as below. If the entity belongs to an optional module, use that module's `packages/core/server/src/domain/<Feature>/<Feature>Permission.ts` and `<Feature>PermissionDefinitions.ts` instead, with the module's prefix (e.g. `news.`).

### 1. Add entries to `CorePermission.ts`

One value per operation plus the feature-view permission:

```typescript
canGetMyEntity = 'core.canGetMyEntity',
canGetMyEntityList = 'core.canGetMyEntityList',
canCreateMyEntity = 'core.canCreateMyEntity',
canUpdateMyEntity = 'core.canUpdateMyEntity',
canDeleteMyEntity = 'core.canDeleteMyEntity',
canViewAdministrationMyEntityFeature = 'core.canViewAdministrationMyEntityFeature',
```

> `canGetMyEntity` is needed even though there is no standalone `GET /:id` endpoint — the form controller uses it internally to load an existing record for editing.
> `canGetMyEntityList` is needed by the table controller's validator even though there is no standalone `POST /list` endpoint.

### 2. Add entries to `CorePermissionDefinitions.ts`

**Every value added to the enum must also appear here**, or `PermissionDependencyGraph.test.ts` fails ("every core permission has a definition in its own module"). Add at the end of the array:

```typescript
{
    key: CorePermission.canGetMyEntity,
    feature: CoreFeature.ADMINISTRATION_MY_ENTITY
},
{
    key: CorePermission.canGetMyEntityList,
    feature: CoreFeature.ADMINISTRATION_MY_ENTITY
},
{
    key: CorePermission.canCreateMyEntity,
    feature: CoreFeature.ADMINISTRATION_MY_ENTITY
},
{
    key: CorePermission.canUpdateMyEntity,
    feature: CoreFeature.ADMINISTRATION_MY_ENTITY
},
{
    key: CorePermission.canDeleteMyEntity,
    feature: CoreFeature.ADMINISTRATION_MY_ENTITY
},
{
    key: CorePermission.canViewAdministrationMyEntityFeature,
    feature: CoreFeature.ADMINISTRATION_MY_ENTITY
},
```

Add the translations under `translationStringList.core` (and optionally `descriptions.core`) in `packages/core/server/src/client/Resources/locales/permission/{en,de}.json`.

> These steps are for a **core** admin feature. An optional module keeps all its strings in its own `packages/<module>/server/src/client/<Feature>/locales/<namespace>/{en,de}.json` (e.g. `permission/` with `translationStringList.<module>`), registered via `localesFolder` on its descriptor — never in `Resources/locales`.

### 3. Add the feature — `CoreFeature.ts` + `CoreFeatureDefinitions.ts` (`packages/core/server/src/domain/FeatureList/`)

A feature's value is the frontend route it unlocks. Add it to `packages/core/server/src/domain/FeatureList/enum/CoreFeature.ts` (module entity: the module's `<Feature>Feature.ts`):

```typescript
ADMINISTRATION_MY_ENTITY = '/administration/my-entity',
```

Then define it in `CoreFeatureDefinitions.ts` (module: `<Feature>FeatureDefinitions.ts`). `viewPermission` unlocks it in the user's feature list; `dashboardItem` puts it on the administration dashboard (server-driven — the frontend renders whatever the server sends):

```typescript
{
    key: CoreFeature.ADMINISTRATION_MY_ENTITY,
    viewPermission: CorePermission.canViewAdministrationMyEntityFeature,
    dashboardItem: {category: DashboardCategory.SYSTEM, icon: 'gear', titleKey: 'MY_ENTITIES', order: 100}
},
```

Add `titleKey` under `translationStringList` in `packages/core/server/src/client/Resources/locales/common/{en,de}.json`, and the feature name (keyed by route) in `locales/feature_flags/{en,de}.json`.

---

## Domain side (`packages/core/server/src/domain/Components/<Entity>/`)

### DTOs — `interactor/dto/`

- `GetEntityDTO` — read shape (no `actorId`)
- `SaveEntityDTO` — write shape (includes `actorId`)
- Validator DTOs live in `validations/dto/` (e.g., `ValidateGetEntityDTO`, `ValidateCreateEntityDTO`)

### Interactors — `interactor/`

All interactors are thin — just extend the correct base class with the right DTO:

| Operation | Base class | DTO |
|-----------|-----------|-----|
| Get list | `ListItemsUseCase<GetEntityDTO>` | — |
| Get single | `GetItemUseCase<GetEntityDTO>` | — |
| Create | `CreateUseCase<SaveEntityDTO>` | — |
| Update | `ExecuteUseCase<SaveEntityDTO, SaveItem<SaveEntityDTO>, void>` | needs `execute()` calling `this.repository.save(this.input)` |
| Delete | `ExecuteUseCase<...>` | similar to update |

### Repository interfaces — `repository/`

Type aliases over generic interfaces:
```typescript
export type GetEntityRepo = GetItem<GetEntityDTO>;
export type SaveEntityRepo = SaveItem<SaveEntityDTO>;
```
Validator storage repos (e.g., `ValidateGetEntityRepo`) are also defined here.

### Validators — `validations/`

The list validator extends `ValidationWithPermission<string>` (no storage repo). All others extend `ValidationWithPermissionAndRepo<ValidateDTO, StorageRepo>`. Each composes permission validators from `validations/permissions/`:

```typescript
// List — no storage
export class ValidateGetEntityList extends ValidationWithPermission<string> {
    public getValidators(): Validator[] {
        return [new ValidateCanGetEntityList(this.permissionRepo, this.input)];
    }
}

// Single — with storage (used by form internally)
export class ValidateGetEntity
    extends ValidationWithPermissionAndRepo<ValidateGetEntityDTO, ValidateGetEntityRepo> {
    public getValidators(): Validator[] {
        return [
            new ValidateCanGetEntity(this.permissionRepo, this.input.actorId),
            new ValidateEntity(this.storageRepo, this.input.entityId)
        ];
    }
}
```

### Loggers — `logger/`

List logger extends `NoDataLogger`. Single/write loggers extend `TypedLogger<LogData>` and declare a `LogData` interface:

```typescript
// List
export class LogGetEntityList extends NoDataLogger {
    getType(): string { return 'getEntityList'; }
}

// Single
export class LogGetEntity extends TypedLogger<LogDataForGetEntity> {
    getType(): string { return 'getEntity'; }
}
export interface LogDataForGetEntity { entityId: string; }
```

### Tests — `packages/core/server/src/domain/__tests__/<Entity>/`

One test file per interactor/validator/logger, mirroring the `packages/core/server/src/domain/Components/<Entity>/` shape (e.g. `ValidateGetEntity.test.ts`, `LogGetEntity.test.ts`). See an existing entity's `__tests__` folder for the pattern.

---

## Client side (`packages/core/server/src/client/Components/<Entity>/`)

### 1. Table — `GetEntityTable/`

**Controller** extends `PaginatedTableBaseController<GetEntityDTO>`:
- `getPresenter(response, paginationParams)` → `GetEntityTablePresenter`
- `getValidator()` → `ValidateGetEntityList`, `PermissionValidatorRepoPicker`, `undefined`
- `getInteractor()` → `GetEntityList`, `GetEntityListInteractorRepoPicker`, `{ filters, offset, limit }` from `request.body`
- `getLogger()` → `LogGetEntityList`, `GetEntityListLoggerRepoPicker`, `new CreateLogDetails(actorId)`, `undefined`

> The Table controller is the only place that uses `GetEntityList` — there is no separate `POST /list` endpoint in the base feature. The `GetEntityList` interactor and its repos live inside `GetEntityTable/` rather than a dedicated `GetEntityList/` directory.

**Presenter** extends `PaginatedTablePresenter<GetEntityDTO>`:
- `getHeader()` → `ColumnHeaderDTO[]` with translation keys from `i18next` under the entity namespace
- `getRowCells(dto)` → `TableCell[]` — use `TextCell`, `PublishStatusCell`, `IsCheckedCell`, `ActionCell`
- `getActions()` → `[new EditAction('route-segment'), new RemoveAction('route-segment')]`

> The string in `EditAction` / `RemoveAction` must exactly match the route segment in `MainRouter.ts`.

### 2. Form — `GetEntityForm/`

> For the full list of available field types see `docs/dev_documentation/dynamic_forms_field_reference.md`.
> To add a brand new field type not yet in the system use `/new-form-field`.

The Form directory owns its own `repo/` subdirectory (fake, kysely, repoPicker) for loading the existing record in edit mode. There is no separate `GetEntity/` directory.

**Controller** extends `FormBaseController<GetEntityDTO, GetFormViewModel>` (default export):
- `getPresenter(response)` → `GetEntityFormPresenter`
- `getDefaultFormValues()` → empty `GetEntityDTO` with all fields as empty strings / defaults
- `getValidator(id)` → `ValidateGetEntity`, `PermissionValidatorRepoPicker`, `GetEntityValidatorStorageRepoPicker` (from `GetEntityForm/repo/repoPicker/`)
- `getLogger(id)` → `LogGetEntity`, `GetEntityLoggerRepoPicker` (from `GetEntityForm/repo/repoPicker/`), `new CreateLogDetails(actorId)`, `{ entityId: id }`
- `getInteractor(id)` → `GetEntity`, `GetEntityInteractorRepoPicker` (from `GetEntityForm/repo/repoPicker/`), `id`

**Presenter** extends `FormPresenter<GetEntityDTO>`:
- `getEndpoint()` → `'/route-segment'` (must match `MainRouter.ts`)
- `getFormFields()` → `FormField[]`

Available field types: `NameField`, `TextField`, `DescriptionField`, `EmailField`, `PublishStatusField`, `YesNoDropDownField`, `DropDownField<T>`, `SearchableDropdownField`

Custom fields extend the base field class and implement `getLabel()`, `getName()`, and optionally `getRequiredMessage()` (+ `implements RequiredField`).

If the form needs related data (dropdowns from other entities), extend `BaseController` and implement `getResponse()` manually. See `GetStateFormController` (loads the country list) as reference.

### 3. Router — `router/EntityRouter.ts`

```typescript
this.post('/table', GetEntityTableController);
this.get('/form', GetEntityFormController);       // create
this.get('/form/:id', GetEntityFormController);   // edit
this.post('/', CreateEntityController);
this.patch('/', UpdateEntityController);
this.delete('/:id', DeleteEntityController);
```

Register in `packages/core/server/src/client/Core/MainRouter.ts` (core), or add it to the owning module's `<Feature>Module.ts` routes if the entity belongs to an optional module.

> No `GET /:id` or `POST /list` routes in the base feature. The form loads existing records internally via `GetEntity` without exposing a public endpoint for it.

### 4. Add feature name translations — `packages/core/server/src/client/Resources/locales/common/`

Add the list title, add title, and edit title keys to both `en.json` and `de.json`, near other entries of the same domain:

```json
"MY_ENTITY": "My Entities",
"ADD_MY_ENTITY": "Add My Entity",
"EDIT_MY_ENTITY": "Edit My Entity",
```

### 5. Create HTTP request file — `__HTTPRequest__/MyEntity.http`

Use this pattern so the Create response ID is captured and reused by subsequent requests:

```http
import login.http
run login.http

### Create My Entity
POST {{host}}/my-entity
Content-Type: application/json
Authorization: Bearer {{auth_token}}
x-Version: {{x-version}}

{
  "name": "Example"
}
> {% client.global.set("id", response.body); %}

### Update My Entity
PATCH {{host}}/my-entity
Content-Type: application/json
Authorization: Bearer {{auth_token}}
x-Version: {{x-version}}

{
  "id": "{{id}}",
  "name": "Updated Name"
}

### Get create My Entity form
GET {{host}}/my-entity/form
Content-Type: application/json
Authorization: Bearer {{auth_token}}
x-Version: {{x-version}}

### Get update My Entity form
GET {{host}}/my-entity/form/{{id}}
Content-Type: application/json
Authorization: Bearer {{auth_token}}
x-Version: {{x-version}}

### Get My Entity table
POST {{host}}/my-entity/table
Content-Type: application/json
Authorization: Bearer {{auth_token}}
x-Version: {{x-version}}

{
  "filterList": [
    {
      "name": "SEARCH",
      "values": [""]
    }
  ],
  "limit": "10",
  "offset": "0"
}

### Delete My Entity
DELETE {{host}}/my-entity/{{id}}
Content-Type: application/json
Authorization: Bearer {{auth_token}}
x-Version: {{x-version}}
```

> `> {% client.global.set("id", response.body); %}` captures the ID returned by Create so Get/Update/Delete/form requests can reuse `{{id}}` without manual copy-paste.

### 6. Register i18n namespace — `packages/core/server/src/client/i18n.ts`

Add the snake_case namespace to the `ns` array, or translations will silently fall back to the raw key string at runtime:

```typescript
'my_entity',
```

---

## Filter pattern (`domain` + `client`)

See `docs/dev_documentation/filter_pattern.md` for full detail. Summary:

### Domain
- Add entry to `FilterablePages` enum → `packages/core/server/src/domain/Core/enum/FilterablePages.ts` (value must match `filterKey` in `administration_filter_keys.dart`)
- Add any new field names to `FilterNameValues` enum → `packages/core/server/src/domain/Core/enum/FilterNameValues.ts`

### Client
1. Create `<Entity>FilterListHelper` → `repositoryHelper/<Entity>FilterListHelper.ts`
   - Returns `SetFilterDTO[]` using `FilterListHelper.getFilterName(FilterNameValues.X)` for each filter
   - Use `FilterType.SEARCH`, `FilterType.SORT`, or `FilterType.IN`
   - For `IN` type: pass `values: FilterListHelper.enumToFilterNameArray(SomeEnum)`

2. Register in the central switch → `Filter/GetFilterList/repo/kysely/KyselyGetFilterListInteractorRepo.ts`
   ```typescript
   case FilterablePages.MY_ENTITY:
       return Promise.resolve(MyEntityFilterListHelper.getMyEntityFilterList());
   ```

3. Implement `applyFilters()` in `KyselyGetEntityListInteractorRepo`:
   - Loop `filterList`, switch on `filter.name`, apply `FilterHelper` methods:
     - `FilterHelper.addSearchFilter(query, filter, 'column')` — LIKE search
     - `FilterHelper.addSortFilter(query, filter, 'column')` — ORDER BY
     - `FilterHelper.addInFilter(query, 'column', filter.values!)` — WHERE IN
   - Always end with a default `orderBy` and `limit`/`offset` application

---

## Frontend side

See `docs/dev_documentation/administration_page_builder.md` for the full frontend checklist. Summary:

1. Add namespace constant → `administration_namespaces.dart`
2. Add filter key constant → `administration_filter_keys.dart`
3. Add `_configs` entry (filterKey, route, title) → `administration_namespaces.dart`
4. Add route constant → `AppRoutes` in `routes.dart`
5. Add translation keys (title, edit title, create title) → locale JSON files
6. Create page class extending `AdministrationPageBuilder` → `administration_page_builder.dart`
7. Add instance to `administrationPageList` → `administration_dashboard_route.dart`
8. Dashboard entry: `dashboardItem` on the feature definition (server side, see Permissions step 3) — no frontend dashboard edit
9. Feature entry (value = AppRoutes path string) → `CoreFeature.ts` + `CoreFeatureDefinitions.ts` (or the module's), see Permissions step 3
10. Enable flag for required roles via Feature Flags admin page

---

## Docs

Copy `docs/modules/_TEMPLATE.md` to `docs/modules/<Entity>.md`, fill in Purpose/Roles/Data Shape/Expected Behavior, and link it under `docs/MOC.md`'s Modules section. If this feature was driven by a product decision worth recording (e.g. a non-obvious permission default, a scoping choice), log it in `docs/decisions.md` too.

---

## Reference implementations

- **Minimal base feature:** `packages/core/server/src/client/Components/ContractType/` — Create, Update, Delete, Get, Form, List, Table
- **Form with related data:** `packages/core/server/src/client/Components/State/GetStateForm/`
- **Custom sub-page:** `packages/core/server/src/client/Components` + `LogPage` on frontend
