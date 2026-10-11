# Administration Pattern

This document covers the full backend pattern for administration entities: the domain layer (business logic) and the client layer (HTTP endpoints). For the frontend side, see [administration_page_builder.md](./administration_page_builder.md).

Use `ContractType` as the reference implementation throughout — it is the minimal clean example with no special cases.

---

## Permissions (`packages/core/server/src/domain/Core/Permission/`)

Every new entity needs permission entries in two files. Keys are strings, `<module>.<name>`, stored as-is in the database, so don't rename one once data exists. Admin entities are usually core (below); an entity that belongs to an optional module goes in that module's `packages/<package>/server/src/domain/<Feature>/<Feature>Permission.ts` / `<Feature>PermissionDefinitions.ts` with its prefix. Forgetting the second file fails `PermissionDependencyGraph.test.ts`.

### 1. `CorePermission.ts` — declare the enum values

Add a block at the end of the enum:

```typescript
canGetMyEntity = 'core.canGetMyEntity',
canGetMyEntityList = 'core.canGetMyEntityList',
canCreateMyEntity = 'core.canCreateMyEntity',
canUpdateMyEntity = 'core.canUpdateMyEntity',
canDeleteMyEntity = 'core.canDeleteMyEntity',
canViewAdministrationMyEntityFeature = 'core.canViewAdministrationMyEntityFeature',
```

### 2. `CorePermissionDefinitions.ts` — register each value

Every value in `CorePermission` must have a matching entry here. Add at the end of the array:

```typescript
{ key: CorePermission.canGetMyEntity,                          feature: CoreFeature.ADMINISTRATION_MY_ENTITY },
{ key: CorePermission.canGetMyEntityList,                      feature: CoreFeature.ADMINISTRATION_MY_ENTITY },
{ key: CorePermission.canCreateMyEntity,                       feature: CoreFeature.ADMINISTRATION_MY_ENTITY },
{ key: CorePermission.canUpdateMyEntity,                       feature: CoreFeature.ADMINISTRATION_MY_ENTITY },
{ key: CorePermission.canDeleteMyEntity,                       feature: CoreFeature.ADMINISTRATION_MY_ENTITY },
{ key: CorePermission.canViewAdministrationMyEntityFeature,    feature: CoreFeature.ADMINISTRATION_MY_ENTITY },
```

`CoreFeature.ADMINISTRATION_MY_ENTITY` must also exist in `packages/core/server/src/domain/FeatureList/enum/CoreFeature.ts` (value = the AppRoutes path, e.g. `'/administration/my-entity'`), with a definition in `CoreFeatureDefinitions.ts` naming its `viewPermission` and, for the dashboard, its `dashboardItem` (an optional module's feature goes in that module's `<Feature>Feature.ts` / `<Feature>FeatureDefinitions.ts`).

---

## Domain (`packages/core/server/src/domain/Components/<Entity>/`)

### DTOs — `interactor/dto/`

Two shapes per entity:

- **`GetEntityDTO`** — read shape returned by interactors; no `actorId`
- **`SaveEntityDTO`** — write shape used by create/update; includes `actorId`

Validator input shapes live separately in `validations/dto/` (e.g., `ValidateGetEntityDTO`, `ValidateCreateEntityDTO`).

```typescript
// GetContractTypeDTO
export interface GetContractTypeDTO {
    id: string;
    name: string;
    file: string;
    description?: string;
    publishStatus: PublishStatus;
}

// SaveContractTypeDTO
export interface SaveContractTypeDTO {
    id: string;
    name: string;
    file: string;
    description?: string;
    publishStatus: PublishStatus;
    actorId: string;
}
```

### Interactors — `interactor/`

All interactors are thin — just extend the correct base class with the right DTO:

| Operation | Base class | Notes |
|-----------|-----------|-------|
| Get list | `ListItemsUseCase<GetEntityDTO>` | empty body |
| Get single | `GetItemUseCase<GetEntityDTO>` | empty body |
| Create | `CreateUseCase<SaveEntityDTO>` | empty body |
| Update | `ExecuteUseCase<SaveEntityDTO, SaveItem<SaveEntityDTO>, void>` | implement `execute()` calling `this.repository.save(this.input)` |
| Delete | similar to Update | implement `execute()` calling `this.repository.delete(this.input)` |

```typescript
export class GetContractTypeList extends ListItemsUseCase<GetContractTypeDTO> {}
export class GetContractType extends GetItemUseCase<GetContractTypeDTO> {}
export class CreateContractType extends CreateUseCase<SaveContractTypeDTO> {}

export class UpdateContractType extends ExecuteUseCase<SaveContractTypeDTO, SaveContractTypeRepo, void> {
    public async execute(): Promise<void> {
        await this.repository.save(this.input);
    }
}
```

### Repository interfaces — `repository/`

Type aliases over generic core interfaces. The client's fake/kysely repos implement these.

```typescript
export type GetContractTypeRepo = GetItem<GetContractTypeDTO>;
export type SaveContractTypeRepo = SaveItem<SaveContractTypeDTO>;
```

Validator storage repos (existence checks) are also defined here:
```typescript
// ValidateGetContractTypeRepo — used to check entity exists before fetching
export type ValidateGetContractTypeRepo = IsInvalidContractTypeRepo;
```

### Validators — `validations/`

Two base classes depending on whether a storage check is needed:

- **`ValidationWithPermission<string>`** — list endpoints; only checks permissions, no entity lookup
- **`ValidationWithPermissionAndRepo<ValidateDTO, StorageRepo>`** — single/write endpoints; checks permissions + entity existence

Each validator composes individual permission validators from `validations/permissions/`.

```typescript
// List — no storage repo
export class ValidateGetContractTypeList extends ValidationWithPermission<string> {
    public getValidators(): Validator[] {
        return [new ValidateCanGetContractTypeList(this.permissionRepo, this.input)];
    }
}

// Single — with storage repo
export class ValidateGetContractType
    extends ValidationWithPermissionAndRepo<ValidateGetContractTypeDTO, ValidateGetContractTypeRepo> {
    public getValidators(): Validator[] {
        return [
            new ValidateCanGetContractType(this.permissionRepo, this.input.actorId),
            new ValidateContractType(this.storageRepo, this.input.contractType) // existence check
        ];
    }
}
```

Validator DTOs:
```typescript
export interface ValidateGetContractTypeDTO {
    actorId: string;
    contractType: string;   // the entity id
}
```

### Loggers — `logger/`

- **`NoDataLogger`** — for list operations; no per-request data to log
- **`TypedLogger<LogData>`** — for single/write operations; declare a `LogData` interface with the relevant IDs

```typescript
// List
export class LogGetContractTypeList extends NoDataLogger {
    getType(): string { return 'getContractTypeList'; }
}

// Single
export class LogGetContractType extends TypedLogger<LogDataForGetContractType> {
    getType(): string { return 'getContractType'; }
}
export interface LogDataForGetContractType {
    contractTypeId: string;
}
```

`getType()` returns a camelCase string that identifies the log entry type in the database.

---

## Client (`packages/core/server/src/client/Components/<Entity>/`)

Use `ContractType` as the reference implementation — it is the minimal clean example with no special cases.

---

## Overview

| Endpoint | Method | Controller base | Presenter base |
|----------|--------|----------------|----------------|
| `/entity/table` | POST | `PaginatedTableBaseController` | `PaginatedTablePresenter` |
| `/entity/form` | GET | `FormBaseController` | `FormPresenter` |
| `/entity/form/:id` | GET | same controller, same route | same presenter |

The form controller handles both create (no `:id` → returns default empty values) and edit (`:id` → fetches entity) through the same class.

---

## Table

### Controller

Extends `PaginatedTableBaseController<EntityDTO>`. Always follows this structure — only the types and repo pickers change.

```typescript
export class GetContractTypeTableController extends PaginatedTableBaseController<GetContractTypeDTO> {
    protected getPresenter(response: GetContractTypeDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
        return this.container.getPresenter(GetContractTypeTablePresenter, response, this.container.appContext, paginationParams);
    }

    protected getValidator(): Validator {
        return this.container.getValidator(
            ValidateGetContractTypeList,
            this.actorId,
            this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
            undefined  // table validators never need a storage repo
        );
    }

    protected getInteractor(): UseCase<GetContractTypeDTO[]> {
        return this.container.getInteractor(
            GetContractTypeList,
            this.container.getNewRepoPicker(GetContractTypeListInteractorRepoPicker),
            {
                filters: this.request.body.filterList,
                offset: this.request.body.offset,
                limit: this.request.body.limit
            }
        );
    }

    protected getLogger(): LogAction {
        return this.container.getLogger(
            LogGetContractTypeList,
            this.container.getNewRepoPicker(GetContractTypeListLoggerRepoPicker),
            new CreateLogDetails(this.actorId),
            undefined
        );
    }
}
```

### Presenter

Extends `PaginatedTablePresenter<EntityDTO>`. Defines column headers, row cells, and row actions.

```typescript
export class GetContractTypeTablePresenter extends PaginatedTablePresenter<GetContractTypeDTO> {
    protected getHeader(): ColumnHeaderDTO[] {
        i18next.setDefaultNamespace('contract_type');
        return [
            {name: i18next.t('translationStringList.CONTRACT_TYPE'), sortKey: 'SORT_BY_NAME', defaultSortDir: 'asc'},
            {name: i18next.t('translationStringList.DESCRIPTION')},
            {name: i18next.t('translationStringList.PUBLISH_STATUS'), fixedWidth: 110},
            {name: i18next.t('translationStringList.ACTIONS'), fixedWidth: 110, alignment: Alignment.right}
        ];
    }

    protected getRowCells(contractType: GetContractTypeDTO): TableCell[] {
        return [
            new TextCell(contractType.name),
            new TextCell(contractType.description ?? ''),
            new PublishStatusCell(contractType.publishStatus),
            new ActionCell(this.getActions(), contractType.id)
        ];
    }

    protected getActions(): RowAction[] {
        i18next.setDefaultNamespace('contract_type');
        return [
            new EditAction('contract-type'),
            new RemoveAction('contract-type')
        ];
    }
}
```

**Available cell types:** `TextCell`, `ActionCell`, `PublishStatusCell`, `IsCheckedCell`

**`ColumnHeaderDTO` options:**
- `sortKey` — backend sort key string; omit if column is not sortable
- `defaultSortDir` — `'asc'` or `'desc'`
- `fixedWidth` — pixel width; use for short fixed-content columns (status, actions)
- `alignment` — e.g. `Alignment.right` for the actions column

> **Critical:** The namespace string passed to `EditAction` and `RemoveAction` (e.g., `'contract-type'`) must exactly match the route segment registered in `MainRouter.ts`. The frontend uses it to build edit/delete URLs.

---

## Form

### Controller

Extends `FormBaseController<EntityDTO, GetFormViewModel>`. The base class automatically handles the create/edit split — call `getDefaultFormValues()` for the no-id case, runs validate→execute→log for the id case.

```typescript
export class GetContractTypeFormController extends FormBaseController<GetContractTypeDTO, GetFormViewModel> {
    protected getPresenter(response: GetContractTypeDTO): Presenter<GetFormViewModel> {
        return this.container.getPresenter(GetContractTypeFormPresenter, response);
    }

    protected getDefaultFormValues(): GetContractTypeDTO {
        return {
            id: '',
            name: '',
            file: '',
            description: '',
            publishStatus: PublishStatus.unpublished
        };
    }

    protected getValidator(id: string) {
        const c = this.container;
        const validatorInput: ValidateGetContractTypeDTO = {actorId: this.actorId, contractType: id};

        return c.getValidator(
            ValidateGetContractType,
            validatorInput,
            c.getNewRepoPicker(PermissionValidatorRepoPicker),
            c.getNewRepoPicker(GetContractTypeValidatorStorageRepoPicker)
        );
    }

    protected getLogger(id: string) {
        return this.container.getLogger(
            LogGetContractType,
            this.container.getNewRepoPicker(GetContractTypeLoggerRepoPicker),
            new CreateLogDetails(this.actorId),
            {contractTypeId: id}
        );
    }

    protected getInteractor(id: string) {
        return this.container.getInteractor(
            GetContractType,
            this.container.getNewRepoPicker(GetContractTypeInteractorRepoPicker),
            id
        );
    }
}
```

> Note: a few older form controllers in the codebase use a **default export**; new ones should use a named export like the rest of the controllers.

### Presenter

Extends `FormPresenter<EntityDTO>`. Defines the submit endpoint and the list of form fields.

```typescript
export class GetContractTypeFormPresenter extends FormPresenter<GetContractTypeDTO> {
    protected getEndpoint(): string {
        return '/contract-type';  // must match the route segment in MainRouter.ts
    }

    protected getFormFields(): FormField[] {
        return [
            new NameField(this.input.name),
            new DescriptionField(this.input.description ?? ''),
            new RequiredContractTypeFileField(this.input.file),
            new PublishStatusField(this.input.publishStatus)
        ];
    }
}
```

**Available field types:**

| Class | Use for |
|-------|---------|
| `NameField` | Primary name field |
| `TextField` | Generic text input |
| `DescriptionField` | Multi-line description |
| `EmailField` | Email with format validation |
| `GeneralEmailField` | Email without strict validation |
| `LatitudeField` / `LongitudeField` | Coordinates |
| `PublishStatusField` | Publish status dropdown |
| `YesNoDropDownField` | Boolean dropdown |
| `DropDownField<T>` | Generic dropdown |
| `SearchableDropdownField` | Searchable dropdown (for large lists) |

**Custom fields** — extend the appropriate base class and implement `getLabel()`, `getName()`, and optionally `getRequiredMessage()` (implement `RequiredField` interface):

```typescript
class RequiredContractTypeFileField extends TextField implements RequiredField {
    getRequiredMessage(): string { return 'CONTRACT_TYPE_FILE_IS_REQUIRED'; }
    protected getLabel(): string { return 'FILE'; }
    protected getName(): string { return 'file'; }
}

class TenantField extends DropDownField<string> implements RequiredField {
    getRequiredMessage(): string { return 'TENANT_IS_REQUIRED'; }
    protected getLabel(): string { return 'TENANT'; }
    protected getName(): string { return 'tenantId'; }
}
```

---

## Router

Register both table and form endpoints alongside the standard CRUD routes:

```typescript
export class ContractTypeRouter extends BaseRouter {
    protected initializeRoutes(): void {
        this.post('/table', GetContractTypeTableController);
        this.get('/form', GetContractTypeFormController);       // create case
        this.get('/form/:id', GetContractTypeFormController);   // edit case
        this.post('/', CreateContractTypeController);
        this.patch('/', UpdateContractTypeController);
        this.delete('/:id', DeleteContractTypeController);
        this.get('/:id', GetContractTypeController);
        this.post('/list', GetContractTypeListController);
    }
}
```

Register the router in `packages/core/server/src/client/Core/MainRouter.ts`.

---

## When the form needs extra data

If the form requires related data (e.g., a dropdown populated from another entity), the form controller becomes more complex — it must fetch all dependencies before building the presenter. See `GetRegionCityFormController` (`packages/core/server/src/client/Components/RegionCity/GetRegionCityForm/`) as an example, which fetches the parent Region alongside the region-city data.

In this case the controller extends `BaseController` directly and implements `getResponse()` manually instead of using `FormBaseController`.
