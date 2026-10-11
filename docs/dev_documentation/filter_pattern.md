# Filter Pattern

Filters power the search, sort, and value-selection controls on administration table pages. The backend defines which filters are available for each page; the frontend renders them and sends the user's selections back with every table request.

Use `Country` as the reference implementation.

---

## How it works

1. Frontend requests the filter list for a page: `GET /filter/:page` (public, no auth required)
2. Backend returns `SetFilterDTO[]` — filter definitions (labels, types, available values)
3. User interacts with filters; frontend sends selections as `filterList: GetFilterDTO[]` in the `POST /entity/table` body
4. The list repo reads `filterList` and applies each filter to the Kysely query

---

## Domain (`packages/core/server/src/domain/Core/`)

All filter types and DTOs are shared across the whole codebase — they live in `packages/core/server/src/domain/Core/`, not per-entity.

### `FilterablePages` enum — `enum/FilterablePages.ts`

One entry per filterable page. The value is the key the frontend sends to `GET /filter/:page`.

```typescript
export enum FilterablePages {
    GROUP_CATEGORY = 'GROUP_CATEGORY',
    // ...
}
```

> Must match the `filterKey` constant in `administration_filter_keys.dart` on the frontend.

### `FilterType` enum — `enum/FilterType.ts`

| Value | Renders as |
|-------|-----------|
| `SEARCH` | Text search input |
| `SORT` | Sort direction selector |
| `IN` | Multi-select checkbox/dropdown |

### `FilterNameValues` enum — `enum/FilterNameValues.ts`

All possible filter field names. Add a new entry here if no existing value fits:

```typescript
export enum FilterNameValues {
    SEARCH = 'SEARCH',
    SORT_BY_NAME = 'SORT_BY_NAME',
    PUBLISH_STATUS = 'PUBLISH_STATUS',
    // ...
}
```

### DTOs

- **`SetFilterDTO`** — sent from server to frontend; defines a filter
  ```typescript
  interface SetFilterDTO {
      name: FilterName;       // { value: string, translation: string }
      type: FilterType;
      values?: FilterName[];  // only for IN type — the selectable options
  }
  ```

- **`GetFilterDTO`** — sent from frontend to server with each table request; carries the user's selections
  ```typescript
  interface GetFilterDTO {
      name: string;
      values?: string[];
  }
  ```

---

## Client (`packages/<package>/server/src/client/`)

### 1. FilterListHelper — `Components/<Entity>/repositoryHelper/<Entity>FilterListHelper.ts`

A static class that defines which filters are available for the entity. Returns `SetFilterDTO[]`.

```typescript
export class CountryFilterListHelper {
    public static getCountryFilterList(): SetFilterDTO[] {
        return [
            {
                name: FilterListHelper.getFilterName(FilterNameValues.SEARCH),
                type: FilterType.SEARCH
            },
            {
                name: FilterListHelper.getFilterName(FilterNameValues.SORT_BY_NAME),
                type: FilterType.SORT
            },
            {
                name: FilterListHelper.getFilterName(FilterNameValues.PUBLISH_STATUS),
                type: FilterType.IN,
                values: FilterListHelper.enumToFilterNameArray(PublishStatus)
            }
        ];
    }
}
```

**`FilterListHelper` utilities** (from `packages/core/server/src/client/Core/Helpers/FilterListHelper.ts`):
- `FilterListHelper.getFilterName(FilterNameValues.X)` — returns a `FilterName` with value + i18n translation
- `FilterListHelper.enumToFilterNameArray(SomeEnum)` — converts an enum to an array of `FilterName` objects; use for `IN` type filters

### 2. Register in KyselyGetFilterListInteractorRepo — `Filter/GetFilterList/repo/kysely/KyselyGetFilterListInteractorRepo.ts`

Add a `case` to the central switch statement:

```typescript
case FilterablePages.COUNTRY:
    return Promise.resolve(CountryFilterListHelper.getCountryFilterList());
```

Also import the new helper at the top of the file.

> The `FakeGetFilterListInteractorRepo` does not need updating — it returns a static stub regardless of page.

### 3. Apply filters in the list repo — `GetEntityList/repo/kysely/KyselyGetEntityListInteractorRepo.ts`

The list repo receives `filterList: GetFilterDTO[]` and applies each filter to the Kysely query using `FilterHelper`:

```typescript
private applyFilters(
    filterList: GetFilterDTO[],
    dbQuery: SelectQueryBuilder<DB, 'country', QueryDTO>,
    limit?: string,
    offset?: string
) {
    for (const filter of filterList) {
        switch (filter.name) {
            case FilterNameValues.SEARCH as string:
                dbQuery = FilterHelper.addSearchFilter(dbQuery, filter, 'name');
                break;
            case FilterNameValues.SORT_BY_NAME as string:
                dbQuery = FilterHelper.addSortFilter(dbQuery, filter, 'name');
                break;
            case FilterNameValues.PUBLISH_STATUS as string:
                dbQuery = FilterHelper.addInFilter(dbQuery, 'publishStatus', filter.values!);
                break;
        }
    }
    // always apply a default sort and pagination last
    dbQuery = dbQuery.orderBy('name', 'asc');
    if (limit && offset) {
        dbQuery = dbQuery.limit(parseInt(limit, 10)).offset(parseInt(offset, 10));
    }
    return dbQuery;
}
```

**`FilterHelper` methods** (from `packages/core/server/src/client/Core/Helpers/FilterHelper.ts`):

| Method | SQL equivalent | Use for |
|--------|---------------|---------|
| `addSearchFilter(query, filter, column)` | `WHERE column LIKE '%value%'` | Text search |
| `addSortFilter(query, filter, column)` | `ORDER BY column asc\|desc` | Sorting |
| `addInFilter(query, column, values)` | `WHERE column IN (...)` | Enum/status filtering |
| `addDueDateFilter(query, filter, column)` | `WHERE column BETWEEN date1 AND date2` | Date range filtering |

---

## Checklist

- [ ] **`FilterablePages` entry** added in `packages/core/server/src/domain/Core/enum/FilterablePages.ts`
- [ ] **`FilterNameValues` entries** added if any new filter field names are needed
- [ ] **`<Entity>FilterListHelper`** created in `packages/<package>/server/src/client/.../repositoryHelper/`
- [ ] **`KyselyGetFilterListInteractorRepo`** updated with new `case` and import
- [ ] **`applyFilters()`** implemented in `KyselyGetEntityListInteractorRepo`
- [ ] **`filterKey`** in `administration_filter_keys.dart` matches the `FilterablePages` enum value exactly
