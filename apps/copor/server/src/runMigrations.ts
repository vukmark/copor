import {envFilePath} from '@copor/core/client/Core/Helpers/EnvFile';
import {coreMigrationsFolder} from '@copor/core/client/Core/Database/coreMigrationsFolder';
import * as path from 'path';
import {createPool} from 'mysql2';
import {promises as fs} from 'fs';
import {
	FileMigrationProvider,
	Kysely,
	Migrator,
	MysqlDialect
} from 'kysely';
import dotenv from 'dotenv';
import {resolve} from 'path';
import dotenvExpand from 'dotenv-expand';
import {allModules} from './modules';
import {validateModules} from '@copor/core/client/Core/Module/validateModules';

const env = dotenv.config({path: envFilePath()});

dotenvExpand.expand(env);

if (!env.parsed)
	throw new Error('No config provided!');

const config = env.parsed;

interface MigrationSet {
	name: string,
	folder: string,
	table: string,
	lockTable: string,
}

async function runMigrationSet(db: Kysely<unknown>, migrationSet: MigrationSet) {
	const migrator = new Migrator({
		db,
		provider: new FileMigrationProvider({
			fs,
			path,
			migrationFolder: migrationSet.folder
		}),
		migrationTableName: migrationSet.table,
		migrationLockTableName: migrationSet.lockTable
	});

	const {error, results} = await migrator.migrateToLatest();

	results?.forEach((it) => {
		if (it.status === 'Success') {
			console.log(`[${migrationSet.name}] migration "${it.migrationName}" was executed successfully`);
		} else if (it.status === 'Error') {
			console.error(`[${migrationSet.name}] failed to execute migration "${it.migrationName}"`);
		}
	});

	if (error) {
		console.error(`[${migrationSet.name}] failed to migrate`);
		console.error(error);
		process.exit(1);
	}
}

async function migrateToLatest() {
	const db = new Kysely<unknown>({
		dialect: new MysqlDialect({
			pool: createPool({
				database: config.DB_NAME,
				host: config.DB_HOST === 'localhost' ? '127.0.0.1' : config.DB_HOST,
				user: config.DB_USER,
				password: config.DB_PASS,
				port: Number(config.DB_PORT) || 3306,
				connectionLimit: 10,
				connectTimeout: 10000,
				dateStrings: false,
				timezone: 'Z'
			})
		})
	});

	validateModules(allModules);

	// Core first: module migrations may reference core tables. Each module
	// keeps its own tracking tables so it can be added or removed on its own.
	const migrationSets: MigrationSet[] = [
		{
			name: 'core',
			folder: coreMigrationsFolder,
			table: 'kysely_migration',
			lockTable: 'kysely_migration_lock'
		},
		... allModules
			.filter((module) => module.migrationsFolder)
			.map((module) => ({
				name: module.name,
				folder: module.migrationsFolder!,
				table: `kysely_migration_${module.name}`,
				lockTable: `kysely_migration_lock_${module.name}`
			}))
	];

	for (const migrationSet of migrationSets) {
		await runMigrationSet(db, migrationSet);
	}

	await db.destroy();
}

migrateToLatest()
	.then(() => {
		console.log('Migration process finished.');
		process.exit(0);
	})
	.catch((err) => {
		console.error('Migration failed:');
		console.error(err);
		process.exit(1);
	});