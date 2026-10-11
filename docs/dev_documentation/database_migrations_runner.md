# Database Migrations — How the Runner Works

For the day-to-day "how do I write a migration" workflow (naming
convention, `TableCreator` method reference, the checklist) see
[database_pattern.md](./database_pattern.md) — this doc covers what that
one doesn't: how the migration **runner** actually resolves and executes
migrations.

---

## How `npm run db:migrate` actually works

Entry point: `apps/copor/server/src/runMigrations.ts`. It runs one Kysely `Migrator`
(with a `FileMigrationProvider`) per **migration set**, one after another:

1. **core** — `packages/core/server/src/client/Core/Database/migrations/`, tracked in
   `kysely_migration` / `kysely_migration_lock`.
2. **each module** listed in `apps/copor/server/src/modules.ts` that sets
   `migrationsFolder` (by convention `packages/<package>/server/src/client/<Feature>/migrations/`),
   in list order, tracked in its own `kysely_migration_<name>` /
   `kysely_migration_lock_<name>` tables.

Core always runs first, so a module migration may reference core tables.
It must never reference another module's tables (that module may not be
installed), and a core migration must never reference a module's table.
Everything below applies **per migration set**: ordering, tracking and the
"must sort after the last executed one" check are each set's own. The rest
is Kysely's built-in migration machinery, not custom code — worth knowing
because it means the constraints are Kysely's, not something this project
chose.

### Discovery and ordering

- Every `.ts` file in the migrations folder that exports an `up`/`down`
  pair is a migration. The **filename minus extension is the migration's
  identity** (`FileMigrationProvider`, in `kysely`'s own source).
- Migrations run in **plain string-sorted order** of that filename —
  nothing smarter than `Object.keys(migrations).sort()`. This is why the
  naming convention (`YYYYMMDD_N_description.ts`, see
  [database_pattern.md](./database_pattern.md#step-1--write-the-migration))
  matters: it's the *only* thing determining execution order. Fractional
  suffixes like `_1.5_` or `_9.3_` you'll see in older migrations are
  someone deliberately engineering where a file sorts relative to its
  neighbors — the sort is lexicographic, not numeric, so `_1.5_` sorts
  between `_1_` and `_2_` as a string, not as a decimal.

### Tracking — and the constraint this creates

Two tables, created automatically the first time migrations run:
`kysely_migration` (one row per executed migration, by name) and
`kysely_migration_lock`. On every run, the migrator:

1. Reads all migration files, sorted by name.
2. Reads which names are already in `kysely_migration`.
3. Runs whatever's left, in sorted order.

**Hard constraint, enforced by Kysely itself
(`Migrator.#ensureMigrationsInOrder`):** if a new migration's filename
sorts **before** a migration that's already been executed, the *next*
`db:migrate` run on any environment that already has that later migration
applied throws `"corrupted migrations: ... New migrations must always have
a name that comes alphabetically after the last executed migration"` and
**refuses to run anything**.

This isn't a style preference — it's a hard failure mode. Concretely: you
**cannot** fix a bug in an already-shipped migration by inserting a new,
earlier-dated migration file. The only two options, discovered the hard
way while fixing a real schema bug (missing primary keys on several tables —
see the Change History below):

1. **Edit the original migration's file content** (not its filename/name).
   Safe for already-migrated environments — Kysely tracks by name only,
   never re-reads or hashes content of an already-applied migration, so
   editing it has zero effect on any environment where it already ran. It
   only changes what a **fresh** `db:migrate` (a new environment, a wiped
   local DB) actually executes.
2. **Append a new migration at the end** (today's date, next number) that
   `ALTER`s the existing state to fix it — this is what actually reaches
   already-migrated environments (staging, production, any teammate's
   already-migrated local DB), since a new migration is the only thing
   Kysely will pick up as "pending" for them.

If you need both a fresh install *and* an already-migrated environment to
end up correct, you need **both**: fix the original file (for future fresh
installs) and add a new migration (for everyone already past that point).
Make the new one idempotent (check current state before acting) if there's
any chance it runs on both an already-fixed fresh install and an
old-and-broken already-migrated one — see
`20260803_112_add_missing_primary_key_to_user_extension_tables.ts` for a
real example (checks `information_schema.TABLE_CONSTRAINTS` before adding
a primary key, so it's a no-op on databases that got the fix from the
edited original file, and a real fix on databases that didn't).

### What actually gets skipped vs. run

Nothing here is transactional across migrations — the ordering guarantee
is "sorted, sequential, no skipping ahead," not "all-or-nothing." A failed
migration midway through `migrateToLatest()` stops the batch; whatever ran
before it stays applied (that's normal Kysely behavior, not something this
project alters).

---

## Change History

- **2026-08-04** — Initial version, written after discovering the
  migration-ordering constraint firsthand while fixing a real bug: several
  per-role user tables were missing a real primary key on `id`, which only
  surfaced as a foreign-key error on newer/stricter MySQL (those tables were
  later removed with the per-role user model).
