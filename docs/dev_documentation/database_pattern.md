# Database Pattern

The project uses MySQL with [Kysely](https://kysely.dev/) as the query builder. A `CamelCasePlugin` is configured globally, meaning all column and table names are written in **camelCase in TypeScript** and automatically converted to **snake_case in SQL**.

This doc covers how to write a migration. For how the migration *runner* resolves/orders/tracks them (and the hard ordering constraint that follows from it), see [database_migrations_runner.md](./database_migrations_runner.md).

---

## Naming conventions

| Layer | Convention | Example |
|-------|-----------|---------|
| MySQL table | `snake_case` | `tag` |
| MySQL column | `snake_case` | `publish_status` |
| Kysely `DB` key | `camelCase` | `tag` |
| TypeScript column | `camelCase` | `publishStatus` |
| TypeScript interface | `PascalCase` + suffix | `TagTable` |

The `CamelCasePlugin` in `packages/core/server/src/client/AppDataSource.ts` handles the conversion automatically — you never write snake_case in TypeScript.

### Table names

Plain snake_case nouns without prefixes (`tag`, `private_to_do`, `chat`,
`user`, `cloud_file`); the Kysely key in the `DB` interface is the camelCase
form (`privateToDo`) and the row type is `<Name>Table` or `<Name>`.

## Adding a new table

### Step 1 — Write the migration

Create a new file in `packages/core/server/src/client/Core/Database/migrations/` (core table) or in the owning module's `packages/<package>/server/src/client/<Feature>/migrations/` (table of an optional module, see `migrationsFolder` in its `<Feature>Module.ts`) following the naming convention:

```
YYYYMMDD_N_table_name.ts
```

Use `TableCreator` to define the columns:

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

Always implement `down()` — it drops the table, enabling rollback.

### Step 2 — Alter an existing table (instead of creating)

For adding a column to an existing table:

```typescript
export async function up(db: Kysely<unknown>): Promise<void> {
    await db.schema
        .alterTable('tenant')
        .addColumn('is_notification_enabled', sql.raw('tinyint(1)'), (col) => col.notNull().defaultTo(1))
        .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
    await db.schema
        .alterTable('tenant')
        .dropColumn('is_notification_enabled')
        .execute();
}
```

### Step 3 — Run the migration

```bash
cd client && npm run db:migrate
```

### Step 4 — Update `db.d.ts`

**Core table vs. module table.** A core table's interface goes in `packages/core/server/src/client/types/tables/<Name>.ts` and its key in the `DB` interface in `packages/core/server/src/client/types/db.d.ts` (shown below). A table that belongs to an optional module (its migration is in `packages/<package>/server/src/client/<Feature>/migrations/`) goes in `packages/<package>/server/src/client/<Feature>/types/<Name>.ts`, and its key in that module's `<Feature>Tables.ts`, which adds it to `DB` by module augmentation:

```typescript
declare module '@copor/core/client/types/db' {
    interface DB {
        myEntity: MyEntityTable;
    }
}
```

Add the TypeScript interface and register it in the `DB` interface at the bottom of `packages/core/server/src/client/types/db.d.ts`:

```typescript
// 1. Define the interface
export interface MyEntityTable {
    id: string;
    name: string;
    publishStatus: PublishStatus;
    description?: string;
    createdAt: Generated<Date>;
    modifiedAt: Generated<Date>;
    createdBy: Generated<string>;
    modifiedBy: Generated<string>;
}

// 2. Register in DB interface
export interface DB {
    // ...existing entries...
    myEntity: MyEntityTable;
}
```

> `db.d.ts` is manually maintained — it is **not** auto-generated on every migration. Update it by hand (or draft it with `npx kysely-codegen`, which is not a project dependency).

No seed file needs a manual edit: the development database picks up schema changes purely by running the migrations against it (`cd apps/copor/server && npm run db:migrate`) — never hand-edit a dump's `CREATE TABLE`/`INSERT` statements.

---

## `TableCreator` method reference

All methods are in `packages/core/server/src/client/Core/Database/TableCreator.ts`.

### IDs and keys

| Method | SQL type | Notes |
|--------|---------|-------|
| `addId()` | `varchar(36) NOT NULL PRIMARY KEY` | Always the first column |
| `addMultiplePrimaryKeys(columns)` | composite PK | For join/map tables |
| `addForeignKey(col, targetTable, targetCol?)` | `varchar(36)` + FK constraint | `ON DELETE CASCADE`; `targetCol` defaults to `id` |

### Text columns

| Method | SQL type | Nullable param |
|--------|---------|---------------|
| `addVarChar255(col, isNull?)` | `varchar(255)` | `false` by default |
| `addVarChar(col, length, isNull?)` | `varchar(N)` | |
| `addVarCharWithDefaultStringValue(col, length?, value?)` | `varchar(N) DEFAULT ''` | |
| `addName()` | `varchar(255) NOT NULL` | Shorthand for `name` column |
| `addText(col, isNull?)` | `text` | |
| `addLongText(col, isNull?)` | `longtext` | |
| `addJsonLongText(col, isNull?)` | `longtext` + JSON check constraint | For JSON columns |

### Numeric columns

| Method | SQL type | Notes |
|--------|---------|-------|
| `addInt(col, length, isNull?)` | `int(N)` | |
| `addTinyInt(col, length?, isNull?)` | `tinyint(N)` | Default length 1 |
| `addTinyIntWithDefault(col, default?, isNull?, length?)` | `tinyint(N) DEFAULT 0` | Use for booleans |
| `addDecimal(col, precision, scale, isNull?)` | `decimal(P,S)` | |

### Date / time columns

| Method | SQL type |
|--------|---------|
| `addDate(col, isNull?)` | `date` |
| `addDateTime(col, isNull?)` | `datetime` |
| `addDateTimeWithAutoUpdate(col)` | `datetime DEFAULT current_timestamp ON UPDATE current_timestamp` |
| `addTimeStamp(col)` | `timestamp DEFAULT CURRENT_TIMESTAMP` |
| `addNullableTimestamp(col)` | `timestamp DEFAULT NULL` |

### Audit columns (always add these to entity tables)

| Method | Column |
|--------|--------|
| `addCreatedAt()` | `created_at timestamp` |
| `addModifiedAt()` | `modified_at timestamp` |
| `addCreatedBy()` | `created_by varchar(255)` |
| `addModifiedBy()` | `modified_by varchar(255)` |

### Enum columns

| Method | SQL type |
|--------|---------|
| `addPublishStatus()` | `enum('PUBLISHED','UNPUBLISHED','DRAFT') DEFAULT 'UNPUBLISHED'` |
| `addRoleType(isNull?)` | `enum('USER','ADMIN')` |
| `addPhoneNumberType()` | `enum('PHONE_HOME','PHONE_MOBILE',...)` |
| `addEnumString(col, values[])` | Custom `enum(...)` from a string array |

---

## Kysely query patterns

The `CamelCasePlugin` means you always use camelCase in queries:

```typescript
// SELECT
const results = await db
    .selectFrom('myEntity')               // camelCase key from DB interface
    .select(['id', 'name', 'publishStatus'])  // camelCase columns
    .where('publishStatus', '=', 'PUBLISHED')
    .orderBy('name', 'asc')
    .limit(20)
    .offset(0)
    .execute();

// INSERT
await db
    .insertInto('myEntity')
    .values({ id, name, publishStatus, createdBy: actorId, modifiedBy: actorId })
    .execute();

// UPDATE
await db
    .updateTable('myEntity')
    .set({ name, publishStatus, modifiedBy: actorId })
    .where('id', '=', id)
    .execute();

// DELETE
await db
    .deleteFrom('myEntity')
    .where('id', '=', id)
    .execute();
```

---

## Checklist

- [ ] Migration file created in `packages/core/server/src/client/Core/Database/migrations/` (core) or `packages/<package>/server/src/client/<Feature>/migrations/` (module) with `up()` and `down()`; a module migration references core tables only
- [ ] Migration run: `cd client && npm run db:migrate`
- [ ] TypeScript interface added (`packages/core/server/src/client/types/tables/`, or the module's `types/`)
- [ ] New key registered in `DB` (`db.d.ts`, or the module's `<Feature>Tables.ts`)
