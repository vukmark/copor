import {db} from '@copor/core/client/AppDataSource';
import {sql} from 'kysely';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class KyselyFKReferenceCheckRepoHelper implements EntityHasForeignKeyReferencesRepo {
	private readonly referencedTable: string;
	private readonly schema: string = process.env.DB_NAME!;

	constructor(referencedTable: string, schema: string = process.env.DB_NAME!) {
		this.schema = schema;
		this.referencedTable = this.camelToSnake(referencedTable);
	}

	public async entityHasReferences(id: string): Promise<{tableName: string} | false> {
		if (!id) {
			return false;
		}

		const rawResult = await sql<{
			tableName: string;
			columnName: string;
		}>`
            SELECT TABLE_NAME AS tableName, COLUMN_NAME AS columnName
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE REFERENCED_TABLE_SCHEMA = ${this.schema}
              AND REFERENCED_TABLE_NAME = ${this.referencedTable}
              AND TABLE_NAME IS NOT NULL
              AND COLUMN_NAME IS NOT NULL
              AND LENGTH(TABLE_NAME) > 0
              AND LENGTH(COLUMN_NAME) > 0
              AND CONSTRAINT_NAME IS NOT NULL
              AND TABLE_SCHEMA = ${this.schema}
              AND TABLE_NAME != 'user_group_closure'
              AND TABLE_NAME != 'user_group_permission'
              AND TABLE_NAME != 'role_permission'
        `.execute(db);

		for (const row of rawResult.rows) {
			const table = row.tableName;
			const column = row.columnName;

			if (!table || !column) {
				console.warn('⚠️ Skipping invalid FK reference row:', row);
				continue;
			}

			try {
				const result = await sql<{count: number}>`
					  SELECT COUNT(*) as count
					  FROM ${sql.ref(table)}
					  WHERE ${sql.ref(column)} = ${sql.val(id)}
					`.execute(db);


				if (result.rows[0]?.count > 0) {
					return {tableName: table};
				}
			} catch (err) {
				console.error(`❌ Failed to check ${table}.${column}:`, err);
			}
		}

		return false;
	}

	private camelToSnake(name: string): string {
		return name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
	}
}