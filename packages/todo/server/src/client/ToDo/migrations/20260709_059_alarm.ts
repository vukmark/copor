import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'alarm');

	table.addId();
	table.addVarChar255('alarmable_id');
	table.addTinyInt('alarmable_type', 1);
	table.addTimeStamp('alarm_time');
	table.addTinyInt('repeat_frequency', 1);
	table.addTinyInt('alarm_status', 1);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('alarm').execute();
}
