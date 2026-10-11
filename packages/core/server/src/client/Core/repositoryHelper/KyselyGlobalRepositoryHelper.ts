import {db} from '@copor/core/client/AppDataSource';
import {sql} from 'kysely';

export class KyselyGlobalRepositoryHelper {
	public static async isInvalidRecord(table: string, id: string | undefined): Promise<boolean> {
		if (!id)
			return true;

		const queryString = `SELECT id FROM \`${this.toSnakeCase(table)}\` WHERE id = '${id}' LIMIT 1`;
		const compiledQuery = sql.raw(queryString).compile(db);
		const result = await db.executeQuery(compiledQuery);

		return result.rows.length === 0;
	}

	public static async getRecordById<T>(table: string, id: string): Promise<T | undefined> {
		const tableName = this.toSnakeCase(table);
		const queryString = `SELECT * FROM \`${tableName}\` WHERE id = '${id}' LIMIT 1`;
		const compiledQuery = sql.raw(queryString).compile(db);
		const result = await db.executeQuery(compiledQuery);

		return result.rows[0] as T | undefined;
	}


	private static toSnakeCase(str: string): string {
		return str.replace(/([A-Z])/g, '_$1').toLowerCase();
	}
}
