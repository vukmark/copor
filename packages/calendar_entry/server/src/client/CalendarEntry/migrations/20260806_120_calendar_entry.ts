import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'calendar_entry');

	table.addId();
	table.addForeignKey('user_id', 'user');
	table.addEnum('type', CalendarEntryType);
	// datetime, not date: the write path converts the local wall-clock date to a UTC instant
	// (Berlin midnight becomes 22:00 the previous day), so a date column would truncate the time
	// and store the wrong day. The time component is what lets fromUtc() restore the right date.
	table.addDateTime('start_date');
	table.addDateTime('end_date');
	table.addText('description', true);
	table.addCreatedAt();
	table.addModifiedAt();
	table.addCreatedBy();
	table.addModifiedBy();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('calendar_entry').execute();
}
