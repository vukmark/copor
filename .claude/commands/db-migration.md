# Database Migration

Use this when adding a new table or altering an existing one. Ask for the table name and columns needed if not provided.

For the full `TableCreator` method reference see `docs/dev_documentation/database_pattern.md`.

> `CamelCasePlugin` is active globally — always use camelCase in TypeScript, Kysely converts to snake_case automatically.

---

## New table — 3 steps

### 1. Migration file — `packages/core/server/src/client/Core/Database/migrations/YYYYMMDD_N_table_name.ts`

For a table that belongs to an optional module (one with a `<Feature>Module.ts`), put the file in the module's `packages/<module>/server/src/client/<Feature>/migrations/` instead. Module migrations run after core's, in their own `kysely_migration_<name>` table, and may reference core tables only, never another module's.

```typescript
import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

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

Always implement `down()`. Add audit columns (`createdAt`, `modifiedAt`, `createdBy`, `modifiedBy`) to every entity table.

### 2. Run it
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

```typescript
// Add the interface
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

// Register in the DB interface at the bottom of the file
export interface DB {
    // ...
    tempMyEntity: TempMyEntityTable;
}
```

No seed file needs a manual edit — the dev database picks up the new table purely from running the migration against it.

---

## Alter existing table

```typescript
import {Kysely, sql} from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
    await db.schema
        .alterTable('my_entity')
        .addColumn('is_active', sql.raw('tinyint(1)'), (col) => col.notNull().defaultTo(1))
        .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
    await db.schema
        .alterTable('my_entity')
        .dropColumn('is_active')
        .execute();
}
```

Then update the interface in `db.d.ts` — no seed file needs a manual edit.

---

## `TableCreator` quick reference

| Method | SQL output |
|--------|-----------|
| `addId()` | `id varchar(36) NOT NULL PRIMARY KEY` |
| `addVarChar255(col, isNull?)` | `varchar(255)` |
| `addVarChar(col, length, isNull?)` | `varchar(N)` |
| `addText(col, isNull?)` | `text` |
| `addLongText(col, isNull?)` | `longtext` |
| `addJsonLongText(col, isNull?)` | `longtext` + JSON check |
| `addInt(col, length, isNull?)` | `int(N)` |
| `addTinyInt(col, length?, isNull?)` | `tinyint(N)` |
| `addTinyIntWithDefault(col, default?, isNull?)` | `tinyint DEFAULT 0` |
| `addDecimal(col, precision, scale, isNull?)` | `decimal(P,S)` |
| `addDate(col, isNull?)` | `date` |
| `addDateTime(col, isNull?)` | `datetime` |
| `addTimeStamp(col)` | `timestamp DEFAULT CURRENT_TIMESTAMP` |
| `addPublishStatus()` | `enum('PUBLISHED','UNPUBLISHED','DRAFT') DEFAULT 'UNPUBLISHED'` |
| `addRoleType(isNull?)` | `enum('USER','ADMIN')` |
| `addEnumString(col, values[])` | custom `enum(...)` |
| `addForeignKey(col, targetTable, targetCol?)` | `varchar(36)` + FK `ON DELETE CASCADE` |
| `addMultiplePrimaryKeys(columns[])` | composite PK |
| `addCreatedAt/ModifiedAt/CreatedBy/ModifiedBy()` | audit columns |

---

## Checklist

- [ ] Migration file created with `up()` and `down()`
- [ ] `cd apps/copor/server && npm run db:migrate` run
- [ ] Interface added and registered in `DB` (`db.d.ts` for core, the module's `<Feature>Tables.ts` for a module table)
